import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Comp} from "@/app/components/Canvas/components/type";

// 定义状态的类型
interface ComponentState {
    components: Comp[];                    // 画布上所有组件的数组
    selectedComponentId: string | null;    // 当前选中组件的ID，可能为null
}

// 初始状态
const initialState: ComponentState = {
    components: [],
    selectedComponentId: null
};

// 创建 Redux slice
const componentSlice = createSlice({
    name: "comp",
    initialState,
    reducers: {
        // 设置组件列表（用于批量设置）
        setComponents: (state: ComponentState, action: PayloadAction<Comp[]>) => {
            state.components = action.payload;
        },
        
        // 添加新组件到画布
        addComponent: (state: ComponentState, action: PayloadAction<Comp>) => {
            state.components.push(action.payload);
        },
        
        // 清空所有组件
        clearComponents: (state: ComponentState) => {
            state.components = [];
            state.selectedComponentId = null;
        },
        
        // 设置选中的组件ID
        setSelectComponentId: (state: ComponentState, action: PayloadAction<string | null>) => {
            state.selectedComponentId = action.payload;
        },
        
        // 更新指定组件的属性
        updateComponent: (state: ComponentState, action: PayloadAction<Comp>) => {
            const index = state.components.findIndex(c => c.id === action.payload.id);
            if (index !== -1) {
                state.components[index] = action.payload;
            }
        },
        swapComponent : (state: ComponentState, action: PayloadAction<{oldIndex: number, newIndex: number}>) => {
            const {oldIndex, newIndex} = action.payload;
            [state.components[oldIndex], state.components[newIndex]] = [state.components[newIndex], state.components[oldIndex]];
        },
        removeComponent: (state: ComponentState, action: PayloadAction<string>) => {
            state.components = state.components.filter((c) => c.id !== action.payload);
            state.selectedComponentId = null;
        },
    },
});

// 导出 actions 和 reducer
export const { setComponents, addComponent, clearComponents, setSelectComponentId, updateComponent, swapComponent, removeComponent } = componentSlice.actions;
export default componentSlice.reducer;
