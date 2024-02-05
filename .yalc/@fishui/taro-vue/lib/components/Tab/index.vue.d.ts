declare const _sfc_main: import("vue").DefineComponent<{
    tabList: {
        type: ArrayConstructor;
        required: true;
    };
    modelValue: {
        type: NumberConstructor;
        required: true;
    };
    scrollable: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    id: {
        type: StringConstructor;
        required: false;
        default: string;
    };
}, {
    props: any;
    emit: (e: 'update:modelValue', index: number) => void;
    _: {
        containerWidth: number;
        containerLeft: number;
        tabItems: {
            width: number;
            left: number;
        }[];
        rerenderList: boolean;
    };
    state: {
        lineWidth: number;
        lineTranX: number;
        scrollLeft: number;
        firstInit: boolean;
    };
    handleClick: (index: number) => Promise<void>;
    getLayout: () => void;
    init: () => void;
    tabListChange: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    tabList: {
        type: ArrayConstructor;
        required: true;
    };
    modelValue: {
        type: NumberConstructor;
        required: true;
    };
    scrollable: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    id: {
        type: StringConstructor;
        required: false;
        default: string;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    id: string;
    scrollable: boolean;
}>;
export default _sfc_main;
