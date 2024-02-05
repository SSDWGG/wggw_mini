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
    itemWidth: number;
    itemHeight: number;
    isDragging: boolean;
    previousMove: string;
    windowHeight: number;
    left: number;
    top: number;
    bottom: number;
    scrollTop: number;
    ready: boolean;
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
        scrollTop: number;
    };
    _baseData: IInnerData;
    wrapHeight: import("vue").ComputedRef<number>;
    getOffsetX: (index: number) => number;
    getOffsetY: (index: number) => number;
    getIndex: (x: number, y: number) => number;
    sort: (sourceIndex: number, targetIndex: number) => void;
    onLongPress: (event: ITouchEvent, originIndex: number) => void;
    onTouchStart: () => void;
    startMove: () => void;
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
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    onDragstart?: ((...args: any[]) => any) | undefined;
    onDragend?: ((...args: any[]) => any) | undefined;
}, {
    id: string;
    columns: number;
    itemHeight: number;
    vibrate: boolean;
}>;
export default _sfc_main;
