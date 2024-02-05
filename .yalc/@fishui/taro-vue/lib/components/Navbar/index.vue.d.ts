declare const _sfc_main: import("vue").DefineComponent<{
    title: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    backIcon: {
        type: StringConstructor;
        required: false;
        default: any;
    };
    color: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    backgroundColor: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    fixed: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    height: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    hideBack: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    goback: {
        type: FunctionConstructor;
        required: false;
    };
}, {
    props: any;
    statusBarHeight: number | undefined;
    slots: Readonly<{
        [name: string]: import("vue").Slot | undefined;
    }>;
    handleBack: (e: any) => void;
    height: import("vue").ComputedRef<string | 0>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    title: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    backIcon: {
        type: StringConstructor;
        required: false;
        default: any;
    };
    color: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    backgroundColor: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    fixed: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    height: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    hideBack: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    goback: {
        type: FunctionConstructor;
        required: false;
    };
}>>, {
    fixed: boolean;
    title: string;
    backIcon: string;
    color: string;
    backgroundColor: string;
    height: number;
    hideBack: boolean;
}>;
export default _sfc_main;
