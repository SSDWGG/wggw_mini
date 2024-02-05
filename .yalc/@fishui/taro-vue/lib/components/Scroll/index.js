import { createVNode, defineComponent, reactive, resolveComponent, openBlock, createBlock, withCtx, createElementVNode, normalizeClass, normalizeStyle, unref, toDisplayString, createCommentVNode, createElementBlock, renderSlot, withDirectives, vShow } from "vue";
import { useReady, createSelectorQuery } from "@tarojs/taro";
import { e as execSelectQuery } from "../utils.9b8ff9e1.js";
const LoadingIcon = () => createVNode("view", {
  "class": "fish-loading"
}, [createVNode("view", {
  "class": "fish-loading__item"
}, null), createVNode("view", {
  "class": "fish-loading__item"
}, null), createVNode("view", {
  "class": "fish-loading__item"
}, null), createVNode("view", {
  "class": "fish-loading__item"
}, null), createVNode("view", {
  "class": "fish-loading__item"
}, null), createVNode("view", {
  "class": "fish-loading__item"
}, null), createVNode("view", {
  "class": "fish-loading__item"
}, null), createVNode("view", {
  "class": "fish-loading__item"
}, null), createVNode("view", {
  "class": "fish-loading__item"
}, null), createVNode("view", {
  "class": "fish-loading__item"
}, null), createVNode("view", {
  "class": "fish-loading__item"
}, null), createVNode("view", {
  "class": "fish-loading__item"
}, null)]);
const ArrowIcon = () => createVNode("view", {
  "class": "fish-arrow"
}, [createVNode("view", {
  "class": "fish-arrow__line"
}, null)]);
const _hoisted_1 = /* @__PURE__ */ createElementVNode("text", { class: "fish-scroll__refresher-text" }, "\u52A0\u8F7D\u4E2D...", -1);
const _hoisted_2 = { class: "fish-scroll__refresher-text" };
const _hoisted_3 = { class: "fish-scroll__loadmore" };
const _hoisted_4 = /* @__PURE__ */ createElementVNode("text", { class: "fish-scroll__refresher-text" }, "\u52A0\u8F7D\u4E2D...", -1);
const _hoisted_5 = {
  key: 1,
  class: "fish-scroll__loadmore"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    id: { default: "fish-scroll" },
    threshold: { default: 60 },
    refresherEnabled: { type: Boolean, default: true },
    refresherBackground: { default: "#eeeeee" },
    refresherThreshold: { default: 80 },
    refresh: { type: Function, default: () => new Promise((resolve) => {
      setTimeout(resolve, 1e3);
    }) },
    loadmore: { type: Function, default: () => new Promise((resolve) => {
      setTimeout(resolve, 1e3);
    }) },
    showSuccess: { type: Boolean, default: true },
    successText: { default: "\u5237\u65B0\u6210\u529F" },
    hasmore: { type: Boolean, default: true },
    loadallText: { default: "\u5DF2\u7ECF\u52A0\u8F7D\u5168\u90E8" }
  },
  emits: ["scroll"],
  setup(__props, { expose, emit }) {
    const props = __props;
    const state = reactive({
      refreshStatus: 0,
      isMoreLoading: false,
      flush: false
    });
    let _scrollHeight = 0;
    let _timer = null;
    const dummyRequest = (ms) => new Promise((resolve) => {
      setTimeout(resolve, typeof ms === "number" ? ms : 1e3);
    });
    const onRefresherPulling = (e) => {
      if (state.refreshStatus > 1)
        return;
      const status = e.detail.dy > props.refresherThreshold ? 1 : 0;
      if (state.refreshStatus !== status) {
        state.refreshStatus = status;
      }
    };
    const onScrollToLower = async () => {
      if (!props.hasmore)
        return;
      if (state.isMoreLoading)
        return;
      state.isMoreLoading = true;
      await Promise.all([props.loadmore(), dummyRequest(100)]);
      state.isMoreLoading = false;
    };
    const reset = () => {
      state.refreshStatus = 0;
    };
    const onRefresherRefresh = async (e) => {
      if (state.refreshStatus === 2)
        return;
      if (!e || e.type !== "refresherrefresh") {
        state.flush = true;
      }
      state.refreshStatus = 2;
      await Promise.all([props.refresh(), dummyRequest(100)]);
      if (state.flush)
        state.flush = false;
      clearTimeout(_timer);
      if (props.showSuccess) {
        state.refreshStatus = 3;
        _timer = setTimeout(() => {
          state.refreshStatus = 4;
          _timer = setTimeout(() => {
            state.refreshStatus = 5;
            _timer = setTimeout(reset, 500 + 20);
          }, 1600);
        }, 0);
      } else {
        _timer = setTimeout(reset, 100);
      }
    };
    const onRefresherRestore = () => {
    };
    const onRefresherAbort = () => {
    };
    const tryScrollToLower = ({ detail: { scrollTop, scrollHeight } }) => {
      if (_scrollHeight === 0)
        return;
      const largerThreshold = _scrollHeight * 3 / 4;
      const originScrollHeight = scrollTop + _scrollHeight + props.threshold;
      const largerScrollHeight = scrollTop + _scrollHeight + largerThreshold;
      if (largerScrollHeight >= scrollHeight && originScrollHeight < scrollHeight) {
        onScrollToLower();
      }
    };
    const onScroll = (e) => {
      emit("scroll", e);
      tryScrollToLower(e);
    };
    expose({
      refresh: onRefresherRefresh
    });
    useReady(() => {
      execSelectQuery(createSelectorQuery().select(`#${props.id}`).boundingClientRect()).then((res) => {
        _scrollHeight = res.height;
      });
    });
    return (_ctx, _cache) => {
      const _component_block = resolveComponent("block");
      const _component_scroll_view = resolveComponent("scroll-view");
      return openBlock(), createBlock(_component_scroll_view, {
        id: props.id,
        class: "fish-scroll",
        "refresher-default-style": "none",
        "enable-passive": true,
        "scroll-x": false,
        "scroll-y": true,
        "lower-threshold": props.threshold,
        "scroll-with-animation": "",
        "enable-flex": "",
        "refresher-enabled": props.refresherEnabled,
        "refresher-threshold": props.refresherThreshold,
        "refresher-background": props.refresherBackground,
        "refresher-triggered": state.refreshStatus === 2,
        onScrolltolower: onScrollToLower,
        onRefresherpulling: onRefresherPulling,
        onRefresherrefresh: onRefresherRefresh,
        onRefresherrestore: onRefresherRestore,
        onRefresherabort: onRefresherAbort,
        onScroll
      }, {
        default: withCtx(() => [
          createElementVNode("view", {
            class: normalizeClass({ "fish-scroll__refresher": true, "fish-scroll__refresher-flush": state.flush }),
            style: normalizeStyle({ height: props.refresherThreshold + "px", top: -props.refresherThreshold + "px" })
          }, [
            state.refreshStatus === 2 ? (openBlock(), createBlock(_component_block, { key: 0 }, {
              default: withCtx(() => [
                createVNode(unref(LoadingIcon)),
                _hoisted_1
              ]),
              _: 1
            })) : state.refreshStatus < 2 ? (openBlock(), createBlock(_component_block, { key: 1 }, {
              default: withCtx(() => [
                createVNode(unref(ArrowIcon), {
                  class: normalizeClass({ "rotate": state.refreshStatus === 1 })
                }, null, 8, ["class"]),
                createElementVNode("text", _hoisted_2, toDisplayString(state.refreshStatus === 1 ? "\u91CA\u653E\u5237\u65B0" : "\u4E0B\u62C9\u5237\u65B0"), 1)
              ]),
              _: 1
            })) : createCommentVNode("", true)
          ], 6),
          props.showSuccess && state.refreshStatus >= 3 ? (openBlock(), createElementBlock("view", {
            key: 0,
            class: normalizeClass({
              "fish-scroll__success": true,
              "fish-scroll__success-show": state.refreshStatus >= 4,
              "fish-scroll__success-hide": state.refreshStatus === 5
            }),
            style: normalizeStyle({ height: props.refresherThreshold + "px" })
          }, [
            createElementVNode("view", {
              class: normalizeClass({
                "fish-scroll__success-bar": true,
                "fish-scroll__success-bar-show": state.refreshStatus >= 4
              })
            }, toDisplayString(props.successText), 3)
          ], 6)) : createCommentVNode("", true),
          renderSlot(_ctx.$slots, "default"),
          withDirectives(createElementVNode("view", _hoisted_3, [
            createVNode(unref(LoadingIcon)),
            _hoisted_4
          ], 512), [
            [vShow, state.isMoreLoading]
          ]),
          !props.hasmore && !state.isMoreLoading ? (openBlock(), createElementBlock("view", _hoisted_5, toDisplayString(props.loadallText), 1)) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["id", "lower-threshold", "refresher-enabled", "refresher-threshold", "refresher-background", "refresher-triggered"]);
    };
  }
});
export {
  _sfc_main as default
};
