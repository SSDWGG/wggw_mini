import { defineComponent, useSlots, computed, reactive, watch, openBlock, createElementBlock, createElementVNode, normalizeClass, normalizeStyle, unref, createBlock, resolveDynamicComponent, h, Fragment } from "vue";
import Taro from "@tarojs/taro";
import { e as execSelectQuery } from "../utils.9b8ff9e1.js";
const _hoisted_1 = ["id", "catch-move"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    id: { default: "fish-swiper" },
    current: { default: 0 },
    duration: { default: 500 },
    catchMove: { type: Boolean, default: true },
    vertical: { type: Boolean, default: true },
    slidesPerView: { default: 1 },
    debounce: { default: 500 },
    width: null,
    height: null
  },
  emits: ["change", "transitionend"],
  setup(__props, { emit }) {
    const props = __props;
    const slots = useSlots();
    const slides = computed(() => {
      if (typeof slots.default !== "function")
        return [];
      const fragmentRoot = slots.default();
      const _slides = [];
      if (Array.isArray(fragmentRoot[0].children)) {
        fragmentRoot[0].children.forEach((vnode) => {
          if (vnode.type && vnode.type.name === "SwiperSlide") {
            _slides.push(vnode);
          }
        });
      }
      return _slides;
    });
    const state = reactive({
      currentIndex: props.current || 0,
      translateX: 0,
      translateY: 0,
      width: 0,
      height: 0,
      isMoving: false,
      from: Math.max(props.current - props.slidesPerView, 0),
      to: props.current + props.slidesPerView
    });
    const _ = {
      startX: 0,
      startY: 0,
      startTouchTime: 0,
      lastTouchTime: 0
    };
    const doNotAnimate = () => {
      state.isMoving = true;
      setTimeout(() => {
        state.isMoving = false;
      }, props.duration);
    };
    const reset = () => {
      _.startX = 0;
      _.startY = 0;
      _.startTouchTime = 0;
      _.lastTouchTime = Date.now();
      state.isMoving = false;
    };
    const moveTo = (index) => {
      const maxLen = slides.value.length;
      let targetIndex = index;
      if (targetIndex < 0)
        targetIndex = 0;
      if (targetIndex >= maxLen)
        targetIndex = maxLen - 1;
      if (props.vertical) {
        state.translateY = -targetIndex * state.height;
      } else {
        state.translateX = -targetIndex * state.width;
      }
      if (state.currentIndex !== targetIndex) {
        state.currentIndex = targetIndex;
        state.from = Math.max(targetIndex - props.slidesPerView, 0);
        state.to = Math.min(targetIndex + props.slidesPerView, maxLen - 1);
        if (targetIndex !== props.current) {
          emit("change", targetIndex);
        }
      }
    };
    const onTransitionEnd = (e) => {
      emit("transitionend", e);
    };
    const onTouchStart = (event) => {
      if (props.catchMove)
        event.stopPropagation();
      if (Date.now() - _.lastTouchTime < props.debounce) {
        return;
      }
      const iTouch = event.touches[0];
      if (!iTouch)
        return;
      _.startX = iTouch.pageX;
      _.startY = iTouch.pageY;
      _.startTouchTime = Date.now();
      state.isMoving = true;
    };
    const onTouchMove = (event) => {
      const iTouch = event.touches[0];
      if (!iTouch || !state.isMoving)
        return;
      const offsetX = iTouch.pageX - _.startX;
      const offsetY = iTouch.pageY - _.startY;
      if (props.vertical) {
        if (state.currentIndex === 0 && offsetY > 0)
          return;
        if (state.currentIndex === slides.value.length - 1 && offsetY < 0)
          return;
        const currentTranY = -state.currentIndex * state.height;
        state.translateY = offsetY + currentTranY;
      } else {
        const currentTranX = -state.currentIndex * state.width;
        state.translateX = offsetX + currentTranX;
      }
    };
    const onTouchEnd = (event) => {
      if (!state.isMoving)
        return;
      const iTouch = event.changedTouches[0];
      if (!iTouch)
        return;
      if (props.vertical) {
        const offsetY = iTouch.pageY - _.startY;
        const speed = offsetY / (Date.now() - _.startTouchTime);
        const isShouldMove = Math.abs(speed) > 0.3 || Math.abs(offsetY) > state.height / 2;
        if (isShouldMove) {
          moveTo(offsetY > 0 ? state.currentIndex - 1 : state.currentIndex + 1);
        } else {
          moveTo(state.currentIndex);
        }
      }
      reset();
    };
    const initSize = (width, height) => {
      doNotAnimate();
      state.width = width;
      state.height = height;
      if (props.vertical) {
        state.translateY = -props.current * height;
      } else {
        state.translateX = -props.current * width;
      }
    };
    Taro.useReady(() => {
      if (props.width && props.height) {
        initSize(props.width, props.height);
      } else {
        execSelectQuery(Taro.createSelectorQuery().select(`#${props.id}`).boundingClientRect()).then((res) => {
          initSize(res.width, res.height);
        });
      }
    });
    const renderSlides = () => {
      const itemStyle = {};
      if (props.vertical) {
        itemStyle.top = `${state.from * state.height}px`;
        if (state.height !== 0)
          itemStyle.height = `${state.height}px`;
      } else {
        itemStyle.left = `${state.from * state.width}px`;
        if (state.width !== 0)
          itemStyle.width = `${state.width}px`;
      }
      return h(Fragment, {}, slides.value.filter((_item, index) => index >= state.from && index <= state.to).map((slide, index) => {
        if (!slide.props)
          slide.props = { key: String(index) };
        if (!slide.props.style)
          slide.props.style = {};
        slide.props.style = { ...slide.props.style, ...itemStyle, ...{ top: `${state.from * state.height}px` } };
        return h(slide.type, { ...slide.props }, slide.children);
      }));
    };
    watch(() => props.current, (newCurrent, preCurrent) => {
      if (newCurrent === state.currentIndex)
        return;
      if (Math.abs(newCurrent - preCurrent) > props.slidesPerView) {
        doNotAnimate();
      }
      moveTo(newCurrent);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        id: props.id,
        "catch-move": props.catchMove,
        class: "fish-swiper",
        onTouchstart: onTouchStart,
        onTouchmove: onTouchMove,
        onTouchend: onTouchEnd,
        onTouchcancel: onTouchEnd
      }, [
        createElementVNode("view", {
          class: normalizeClass({
            "fish-swiper__container": true,
            "fish-swiper__vertical": props.vertical
          }),
          style: normalizeStyle({
            transitionDuration: `${state.isMoving ? 0 : props.duration}ms`,
            transform: `translateX(${state.translateX}px) translateY(${state.translateY}px)`,
            [props.vertical ? "height" : "width"]: props.vertical ? `${state.height * unref(slides).length}px` : `${state.width * unref(slides).length}px`
          }),
          onTransitionend: onTransitionEnd
        }, [
          (openBlock(), createBlock(resolveDynamicComponent(renderSlides)))
        ], 38)
      ], 40, _hoisted_1);
    };
  }
});
export {
  _sfc_main as default
};
