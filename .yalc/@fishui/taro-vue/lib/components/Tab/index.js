import { defineComponent, reactive, watch, resolveComponent, openBlock, createElementBlock, createVNode, normalizeClass, withCtx, createElementVNode, Fragment, renderList, toDisplayString, normalizeStyle } from "vue";
import { useReady, createSelectorQuery } from "@tarojs/taro";
import { e as execSelectQuery } from "../utils.9b8ff9e1.js";
const _hoisted_1 = { class: "fish-tabs" };
const _hoisted_2 = { class: "fish-tabs__header" };
const _hoisted_3 = ["onTap"];
const _hoisted_4 = { class: "fish-tabs__item-text" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    tabList: null,
    modelValue: null,
    scrollable: { type: Boolean, default: false },
    id: { default: "fish-tabs" }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit }) {
    const props = __props;
    const _ = {
      containerWidth: 375,
      containerLeft: 0,
      tabItems: [],
      rerenderList: false
    };
    const state = reactive({
      lineWidth: 0,
      lineTranX: 0,
      scrollLeft: 0,
      firstInit: true
    });
    const handleClick = async (index) => {
      const targetTab = props.tabList[index];
      if (targetTab.disabled)
        return;
      if (typeof targetTab.validate === "function") {
        const isValid = await targetTab.validate(index);
        if (!isValid)
          return;
      }
      emit("update:modelValue", index);
    };
    const getLayout = () => {
      const item = _.tabItems[props.modelValue];
      if (!item)
        return;
      state.lineWidth = item.width;
      state.lineTranX = item.left - _.containerLeft;
      if (props.scrollable) {
        if (_.rerenderList) {
          state.scrollLeft = state.scrollLeft + 1e-3;
          _.rerenderList = false;
        } else {
          state.scrollLeft = Math.max(item.left - _.containerLeft - (_.containerWidth - item.width) / 2, 0);
        }
      }
    };
    const init = () => {
      if (!props.tabList || props.tabList.length === 0)
        return;
      Promise.all([
        execSelectQuery(createSelectorQuery().select(`#${props.id}`).boundingClientRect()),
        execSelectQuery(createSelectorQuery().selectAll(`#${props.id} .fish-tabs__item-text`).boundingClientRect())
      ]).then(([_container, _items]) => {
        const container = _container;
        const items = _items;
        _.containerWidth = container.width;
        _.containerLeft = container.left;
        if (_.rerenderList) {
          const previousFirstItem = _.tabItems[0];
          if (!previousFirstItem) {
            _.tabItems = items;
            _.rerenderList = false;
          } else {
            const distanceLeft = items[0].left - previousFirstItem.left;
            _.tabItems = items.map((v) => ({ ...v, left: v.left - distanceLeft }));
          }
        } else {
          _.tabItems = items;
        }
        getLayout();
        if (state.firstInit) {
          setTimeout(() => state.firstInit = false, 300);
        }
      });
    };
    const tabListChange = () => {
      _.rerenderList = true;
      setTimeout(init, Math.min(props.tabList.length * 2 + 16, 300));
    };
    useReady(init);
    watch(() => props.modelValue, getLayout);
    watch(() => props.tabList, tabListChange, { deep: true });
    return (_ctx, _cache) => {
      const _component_scroll_view = resolveComponent("scroll-view");
      return openBlock(), createElementBlock("view", _hoisted_1, [
        createVNode(_component_scroll_view, {
          id: props.id,
          class: normalizeClass({
            "fish-tabs__scroll-view": true,
            "fish-tabs__scrollable": props.scrollable
          }),
          "scroll-y": false,
          "scroll-x": props.scrollable,
          "scroll-with-animation": props.scrollable,
          "scroll-animation-duration": 300,
          "scroll-left": state.scrollLeft
        }, {
          default: withCtx(() => [
            createElementVNode("view", _hoisted_2, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(props.tabList, (item, index) => {
                return openBlock(), createElementBlock("view", {
                  key: index,
                  class: normalizeClass({
                    "fish-tabs__item": true,
                    "fish-tabs__item--active": props.modelValue === index
                  }),
                  onTap: () => handleClick(index)
                }, [
                  createElementVNode("view", _hoisted_4, toDisplayString(item.title), 1)
                ], 42, _hoisted_3);
              }), 128)),
              createElementVNode("view", {
                class: "fish-tabs__item-underline",
                style: normalizeStyle({
                  width: `${state.lineWidth}px`,
                  transform: `translateX(${state.lineTranX}px)`,
                  transition: `${state.firstInit ? "unset" : ""}`
                })
              }, null, 4)
            ])
          ]),
          _: 1
        }, 8, ["id", "class", "scroll-x", "scroll-with-animation", "scroll-left"])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
