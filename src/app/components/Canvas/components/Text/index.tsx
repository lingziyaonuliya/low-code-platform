"use client"
import React from "react";
import {TextPropCompProp} from "@/app/components/Canvas/components/Text/TextPropCompProp";
import {Typography} from "antd";
import {useAppDispatch} from "@/store/hooks";
import {setSelectComponentId} from "@/store/componentSlice";

const {Text} = Typography

const TextComp: React.FC<TextPropCompProp> = ({text, level = 3, isCenter , id = null}) => {
    const dispatch = useAppDispatch()
    const getFontSize = (level: number) => {
        if(level === 1) return "24px"
        if(level === 2) return "20px"
        if(level === 3) return "16px"
        return "14px"
    }
    function handleClick() {
        dispatch(setSelectComponentId(id))
    }

    return (
        <div 
            className={`cursor-pointer hover:bg-gray-100 ${isCenter ? "text-center" : "text-left"}`} 
            onClick={handleClick}
        >
            <Text style={{fontSize: getFontSize(level), marginBottom: "0px"}}>
                {text}
            </Text>
        </div>
    )
}

export default TextComp