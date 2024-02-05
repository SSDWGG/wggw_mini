import type { VNode } from 'vue';
import type { BaseEventOrig } from '@tarojs/components';
interface IUtils {
    startX: number;
    startY: number;
    startTouchTime: number;
    lastTouchTime: number;
}
declare const _sfc_main: import("vue").DefineComponent<{
    id: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    current: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    duration: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    catchMove: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    vertical: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    slidesPerView: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    debounce: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    width: {
        type: NumberConstructor;
        required: false;
    };
    height: {
        type: NumberConstructor;
        required: false;
    };
}, {
    props: any;
    emit: {
        (e: 'change', index: number): void;
        (e: 'transitionend', event: BaseEventOrig<{
            elapsedTime: number;
        }>): void;
    };
    slots: Readonly<{
        [name: string]: import("vue").Slot | undefined;
    }>;
    slides: import("vue").ComputedRef<VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>[]>;
    state: {
        currentIndex: number;
        translateX: number;
        translateY: number;
        width: number;
        height: number;
        isMoving: boolean;
        from: number;
        to: number;
    };
    _: IUtils;
    doNotAnimate: () => void;
    reset: () => void;
    moveTo: (index: number) => void;
    onTransitionEnd: (e: any) => void;
    onTouchStart: (event: TouchEvent) => void;
    onTouchMove: (event: TouchEvent) => void;
    onTouchEnd: (event: TouchEvent) => void;
    initSize: (width: number, height: number) => void;
    renderSlides: () => VNode;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("change" | "transitionend")[], "change" | "transitionend", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    id: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    current: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    duration: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    catchMove: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    vertical: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    slidesPerView: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    debounce: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    width: {
        type: NumberConstructor;
        required: false;
    };
    height: {
        type: NumberConstructor;
        required: false;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    onTransitionend?: ((...args: any[]) => any) | undefined;
}, {
    id: string;
    current: number;
    duration: number;
    catchMove: boolean;
    vertical: boolean;
    slidesPerView: number;
    debounce: number;
}>;
export default _sfc_main;
