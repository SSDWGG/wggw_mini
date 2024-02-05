import { defineComponent, openBlock, createElementBlock, normalizeClass, renderSlot } from "vue";
const __default__ = { name: "SwiperSlide" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: {
    current: null,
    index: null
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("view", {
        class: normalizeClass({
          "fish-swiper__slide": true,
          "fish-swiper__slide-active": props.current !== void 0 && props.index === props.current
        })
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2);
    };
  }
});
export {
  _sfc_main as default
};
