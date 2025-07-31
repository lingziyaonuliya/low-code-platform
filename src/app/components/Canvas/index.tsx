"use client"
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {Comp} from "@/app/components/Canvas/components/type";
import TextComp from "@/app/components/Canvas/components/Text";
import {useEffect, useRef} from "react";
import {clearComponents, swapComponent} from "@/store/componentSlice";
import ImageComp from "@/app/components/Canvas/components/Image";
import ButtonComp from "@/app/components/Canvas/components/Button";
import InputComp from "@/app/components/Canvas/components/Input";
import CardComp from "@/app/components/Canvas/components/Card";
import SortableContainer from "@/app/components/DragSort/SortableContainer";
import SortableItem from "@/app/components/DragSort/SortableItem";

export default function Canvas() {
    const dispatch = useAppDispatch();
    const {components} = useAppSelector((state) => state.comp.present); 
    useEffect(() => {
        dispatch(clearComponents())
    }, [dispatch]);

    function getComp(comp: Comp) {
        switch (comp.type) {
            case "text":
                return <TextComp {...comp}/>
            case "image":
                return <ImageComp {...comp}/>
            case "button":
                return <ButtonComp {...comp}/>
            case "input":
                return <InputComp  {...comp}/>
            case "card":
                return <CardComp {...comp}/>
        }
        return <div>null</div>
    }

    function handleDragEnd(oldIndex: number, newIndex: number) {
        // Swap the component
        dispatch(swapComponent({oldIndex, newIndex}))
    }

    return (
        <SortableContainer items={components} onDragEnd={handleDragEnd}>
            <div className="flex-2 p-4 bg-white h-[calc(100vh-96px)] mx-2 my-2 rounded">
                <div className="text-2xl font-bold">Canvas</div>
                <div className={"flex flex-col gap-2 mt-5"}>
                    {components.map(comp => <div key={comp.id}>
                        <SortableItem id={comp.id} key={comp.id}>
                            {getComp(comp)}
                        </SortableItem>
                    </div>)}
                </div>
            </div>
        </SortableContainer>
    );
}