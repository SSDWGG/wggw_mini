import type { ScrollViewProps, BaseEventOrig } from '@tarojs/components';
declare type IRefreshEvent = BaseEventOrig<{
    dy: number;
}>;
declare const _sfc_main: import("vue").DefineComponent<{
    id: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    threshold: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    refresherEnabled: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    refresherBackground: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    refresherThreshold: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    refresh: {
        type: FunctionConstructor;
        required: false;
        default: () => Promise<unknown>;
    };
    loadmore: {
        type: FunctionConstructor;
        required: false;
        default: () => Promise<unknown>;
    };
    showSuccess: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    successText: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    hasmore: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    loadallText: {
        type: StringConstructor;
        required: false;
        default: string;
    };
}, {
    props: any;
    emit: (e: 'scroll', event: BaseEventOrig<ScrollViewProps.onScrollDetail>) => void;
    state: {
        refreshStatus: 0 | 1 | 2 | 3 | 4 | 5;
        isMoreLoading: boolean;
        flush: boolean;
    };
    _scrollHeight: number;
    _timer: any;
    dummyRequest: (ms?: number) => Promise<unknown>;
    onRefresherPulling: (e: IRefreshEvent) => void;
    onScrollToLower: () => Promise<void>;
    reset: () => void;
    onRefresherRefresh: (e?: IRefreshEvent) => Promise<void>;
    onRefresherRestore: () => void;
    onRefresherAbort: () => void;
    tryScrollToLower: ({ detail: { scrollTop, scrollHeight } }: {
        detail: {
            scrollTop: any;
            scrollHeight: any;
        };
    }) => void;
    onScroll: (e: any) => void;
    readonly LoadingIcon: () => JSX.Element;
    readonly ArrowIcon: () => JSX.Element;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "scroll"[], "scroll", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    id: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    threshold: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    refresherEnabled: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    refresherBackground: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    refresherThreshold: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    refresh: {
        type: FunctionConstructor;
        required: false;
        default: () => Promise<unknown>;
    };
    loadmore: {
        type: FunctionConstructor;
        required: false;
        default: () => Promise<unknown>;
    };
    showSuccess: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    successText: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    hasmore: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    loadallText: {
        type: StringConstructor;
        required: false;
        default: string;
    };
}>> & {
    onScroll?: ((...args: any[]) => any) | undefined;
}, {
    id: string;
    threshold: number;
    refresherEnabled: boolean;
    refresherBackground: string;
    refresherThreshold: number;
    refresh: Function;
    loadmore: Function;
    showSuccess: boolean;
    successText: string;
    hasmore: boolean;
    loadallText: string;
}>;
export default _sfc_main;
