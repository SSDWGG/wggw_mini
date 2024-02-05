import { defineComponent, useSlots, computed, resolveComponent, openBlock, createElementBlock, createElementVNode, normalizeClass, normalizeStyle, unref, createBlock, withCtx, renderSlot, createCommentVNode, toDisplayString } from "vue";
import Taro from "@tarojs/taro";
import { g as getSizeToPx } from "../utils.9b8ff9e1.js";
const iconPath = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAApJJREFUaEPtmVmO1DAQhn8HhieugIQrfRceENDd0zPsF0DcBvEMM8AATyD25Sqx3ULcYRapU8hSIoVMko6TOIs0/RjZzv/VX0lXVQQm/hMT148LgKEd9OYAEd0E8JyZd4IgeKqU+uAD1gsAEe0CeAtgJxH9V2t9bRIAUsqVEOIoI97qVlrr2egBpJR7Qog3OfFnQRDciqLo16gBSsSfMvOeMeazD/H2zE6eASnlfhL5yxmh3sV3AjCbzfbjOLZp8594ACut9RdfkU/PbeVAGIZ3mfl1gfhdrfVX3+JbORCG4T1mfjWk+MYAFeKXWutvfUS+cQoR0X0Ah7nInwCwadOreGcHysQLIZZKqe99Rt7ZASJ6AOAgH/khxdd2wIpn5kMhxKVMlE+EEAul1I8hIl/bASJ6yMwHYxS/1QEp5SMAL/PigyCYR1H0c8jIb3WgRPxxHMeL9Xo9CvGlDkgpHwN4kYv8MTPPjTFeqsqmbp4rJWxts9lsjgrE3zHG/G56I1/7zgEQ0R8A2e7JRn6U4gtTiIgMgOtje12WOVjkwBLA+4I/rMHf+UUQheX0GEuG2g6kC6cCUdnQjKlsdnYg3VDRdfVe+9d+BvILx9A6NnYg3VjRvPfW/zZ2IN1YNj5JurFemvg8hPNUomyA1dcYpTWAPaBk/nk6BISzA5l0Khri9jKNy7rQGMAeUjBGt5d7hWgFUAFxxswrn0PdrR2ZS/1ORLYAfJcfqyeT6U8uZ7mube1ApnYaBKIzAAsShuGCmW0pnn5aspftB47bvoYAnQJkIGw6XUndYWZtjAld06PO+s4BEoh54kQKMZ2PfJna6UYcx88AXBVCPFFKfawTUdc1XhxwFdFm/QVAm+h1sXfyDvwDmUo+QDLH3GkAAAAASUVORK5CYII=";
const _hoisted_1 = { class: "fish-navbar" };
const _hoisted_2 = {
  key: 0,
  class: "fish-navbar__header-left"
};
const _hoisted_3 = ["src"];
const _hoisted_4 = { class: "fish-navbar__header-wrap" };
const _hoisted_5 = { class: "fish-navbar__placeholder" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    title: { default: "" },
    backIcon: { default: iconPath },
    color: { default: "#222222" },
    backgroundColor: { default: "#FFFFFF" },
    fixed: { type: Boolean, default: true },
    height: { default: 44 },
    hideBack: { type: Boolean, default: false },
    goback: null
  },
  setup(__props) {
    const props = __props;
    const { statusBarHeight } = Taro.getSystemInfoSync();
    const slots = useSlots();
    const handleBack = (e) => {
      if (typeof props.goback === "function") {
        props.goback(e);
      } else {
        Taro.navigateBack();
      }
    };
    const height = computed(() => getSizeToPx(props.height));
    return (_ctx, _cache) => {
      const _component_block = resolveComponent("block");
      return openBlock(), createElementBlock("view", _hoisted_1, [
        createElementVNode("view", {
          class: normalizeClass({ "fish-navbar__fixed": props.fixed }),
          style: normalizeStyle({ backgroundColor: props.backgroundColor })
        }, [
          createElementVNode("view", {
            style: normalizeStyle({ height: `${unref(statusBarHeight)}px` })
          }, null, 4),
          unref(height) !== 0 ? (openBlock(), createElementBlock("view", {
            key: 0,
            class: "fish-navbar__header",
            style: normalizeStyle({ height: unref(height), backgroundColor: props.backgroundColor })
          }, [
            !props.hideBack ? (openBlock(), createElementBlock("view", _hoisted_2, [
              !unref(slots).left ? (openBlock(), createElementBlock("view", {
                key: 0,
                class: "fish-navbar__goback",
                onTap: handleBack
              }, [
                createElementVNode("image", {
                  src: props.backIcon,
                  class: "fish-navbar__icon"
                }, null, 8, _hoisted_3)
              ], 32)) : (openBlock(), createBlock(_component_block, { key: 1 }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "left")
                ]),
                _: 3
              }))
            ])) : createCommentVNode("", true),
            createElementVNode("view", _hoisted_4, [
              !unref(slots).title ? (openBlock(), createElementBlock("text", {
                key: 0,
                style: normalizeStyle({ color: props.color })
              }, toDisplayString(props.title), 5)) : (openBlock(), createBlock(_component_block, { key: 1 }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "title")
                ]),
                _: 3
              }))
            ])
          ], 4)) : createCommentVNode("", true)
        ], 6),
        createElementVNode("view", _hoisted_5, [
          createElementVNode("view", {
            style: normalizeStyle({ height: `${unref(statusBarHeight)}px` })
          }, null, 4),
          createElementVNode("view", {
            style: normalizeStyle({ height: unref(height) })
          }, null, 4)
        ])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
