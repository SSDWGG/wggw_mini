import { ITouchEvent } from '@tarojs/components/types';
interface IPropsListItem {
    [p: string]: any;
    fixed?: boolean;
}
interface IInnerData {
    current: number;
    distanceX: number;
    distanceY: number;
    identifier: number;
    containerLeft: number;
    containerTop: number;
    itemWidth: number;
    itemHeight: number;
    isDragging: boolean;
    previousMove: string;
}
declare const _sfc_main: import("vue").DefineComponent<{
    listData: {
        type: ArrayConstructor;
        required: true;
    };
    id: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    columns: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    itemHeight: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    vibrate: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    transition: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    trigger: {
        type: StringConstructor;
        required: false;
        default: string;
    };
}, {
    props: any;
    emit: {
        (e: 'change', list: IPropsListItem[]): void;
        (e: 'dragstart' | 'dragend', event: ITouchEvent): void;
    };
    state: {
        selected: number;
        translateX: number;
        translateY: number;
        listData: {
            data: {
                [x: string]: any;
                fixed?: boolean | undefined;
            };
            fixed: boolean;
            index: number;
            sortIndex: number;
            tranX: string;
            tranY: string;
        }[];
    };
    _baseData: IInnerData;
    wrapHeight: import("vue").ComputedRef<number>;
    getOffsetX: (index: number) => number;
    getOffsetY: (index: number) => number;
    getIndex: (x: number, y: number) => number;
    sort: (sourceIndex: number, targetIndex: number) => void;
    onDragStart: (event: ITouchEvent, originIndex: any) => void;
    onLongPress: (event: ITouchEvent, index: number) => void;
    onTouchStart: (event: TouchEvent, index: number) => void;
    onTouchMove: (event: TouchEvent) => void;
    reset: () => void;
    onTouchEnd: (event: TouchEvent) => void;
    render: (init?: 'init' | any) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("change" | "dragstart" | "dragend")[], "change" | "dragstart" | "dragend", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    listData: {
        type: ArrayConstructor;
        required: true;
    };
    id: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    columns: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    itemHeight: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    vibrate: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    transition: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    trigger: {
        type: StringConstructor;
        required: false;
        default: string;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    onDragstart?: ((...args: any[]) => any) | undefined;
    onDragend?: ((...args: any[]) => any) | undefined;
}, {
    id: string;
    columns: number;
    itemHeight: number;
    vibrate: boolean;
    transition: boolean;
    trigger: string;
}>;
export default _sfc_main;
