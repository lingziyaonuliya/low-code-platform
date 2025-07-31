"use client"
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import TextPropComp from "@/app/components/Canvas/components/Text/TextPropComp";
import {TextPropCompProp} from "@/app/components/Canvas/components/Text/TextPropCompProp";
import {removeComponent, updateComponent} from "@/store/componentSlice";
import {Comp} from "@/app/components/Canvas/components/type";
import ImagePropComp from "@/app/components/Canvas/components/Image/ImagePropComp";
import ButtonPropComp from "@/app/components/Canvas/components/Button/ButtonPropComp";
import InputPropComp from "@/app/components/Canvas/components/Input/InputPropComp";
import CardPropComp from "@/app/components/Canvas/components/Card/CardPropComp";
import {Button} from "antd";

export default function PropertyPanel() {
    const dispatch = useAppDispatch();
    const {selectedComponentId, components} = useAppSelector((state) => state.comp.present);
    if(selectedComponentId === null) {
        return <div className={"flex-1 p-4 bg-white h-[calc(100vh-96px)] mx-2 my-2 rounded"}>
            <div className="text-2xl font-bold mb-4">Property</div>
            <div>No Component Selected</div>
        </div>
    }
    const selectedComponent = components.find(c => c.id === selectedComponentId);
    function handleCompChange(values: TextPropCompProp) {
        if (selectedComponent && selectedComponentId) {
            dispatch(updateComponent({
                ...selectedComponent,
                ...values,
                id: selectedComponentId
            }))
        }
    }

    function getComp(selectedComponent: Comp | undefined) {
        if (selectedComponent !== undefined) {
            switch (selectedComponent.type) {
                case "text":
                    return <TextPropComp {...selectedComponent} onChange={handleCompChange}/>
                case "image":
                    return <ImagePropComp {...selectedComponent} onChange={handleCompChange}/>
                case "button":
                    return <ButtonPropComp {...selectedComponent} onChange={handleCompChange}/>
                case "input":
                    return <InputPropComp {...selectedComponent} onChange={handleCompChange}/>
                case "card":
                    return <CardPropComp {...selectedComponent} onChange={handleCompChange}/>
            }
        }
        return <div>div</div>
    }

    function handleDelete() {
        dispatch(removeComponent(selectedComponentId!))
    }

    return (
        <div className="flex-1 p-4 bg-white h-[calc(100vh-96px)] mx-2 my-2 rounded">
            <div className="text-2xl font-bold">Property</div>
            <div>
                {getComp(selectedComponent)}
                <Button type={"primary"} danger onClick={handleDelete}>Delete</Button>
            </div>
        </div>
    );
}