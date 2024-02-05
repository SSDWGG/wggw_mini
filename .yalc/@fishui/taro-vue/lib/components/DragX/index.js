import { defineComponent, reactive, computed, watch, resolveComponent, openBlock, createBlock, withCtx, createElementVNode, normalizeStyle, unref, createElementBlock, Fragment, renderList, normalizeClass, renderSlot, normalizeProps, guardReactiveProps } from "vue";
import { useReady, getSystemInfoSync, vibrateShort, createSelectorQuery } from "@tarojs/taro";
import { e as execSelectQuery } from "../utils.9b8ff9e1.js";
const _hoisted_1 = ["onLongpress"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    listData: null,
    id: { default: "fish-drag-scroll" },
    columns: { default: 3 },
    itemHeight: { default: 124 },
    vibrate: { type: Boolean, default: false }
  },
  emits: ["change", "dragstart", "dragend"],
  setup(__props, { emit }) {
    const props = __props;
    const state = reactive({
      selected: -1,
      listData: [],
      translateX: 0,
      translateY: 0,
      scrollTop: 0
    });
    const _baseData = {
      current: -1,
      distanceX: 0,
      distanceY: 0,
      identifier: -1,
      itemHeight: 0,
      itemWidth: 0,
      isDragging: false,
      previousMove: "",
      windowHeight: 600,
      left: 0,
      top: 0,
      bottom: 0,
      scrollTop: -1,
      ready: false
    };
    const wrapHeight = computed(() => Math.ceil(props.listData.length / props.columns) * props.itemHeight);
    const getOffsetX = (index) => index % props.columns;
    const getOffsetY = (index) => Math.floor(index / props.columns);
    const getIndex = (x, y) => x + props.columns * y;
    const sort = (sourceIndex, targetIndex) => {
      const renderPositon = (list) => {
        const listData = list.map((item) => {
          item.tranX = `${getOffsetX(item.sortIndex) * 100}%`;
          item.tranY = `${getOffsetY(item.sortIndex) * 100}%`;
          return item;
        });
        state.listData = listData;
      };
      const excludeFixed = (sortKey, reversed) => {
        if (state.listData[sortKey].fixed) {
          reversed ? --sortKey : ++sortKey;
          return excludeFixed(sortKey, reversed);
        }
        return sortKey;
      };
      const move = `${sourceIndex}-${targetIndex}`;
      if (move === _baseData.previousMove)
        return;
      _baseData.previousMove = move;
      if (sourceIndex < targetIndex) {
        const list = state.listData.map((item) => {
          if (item.fixed)
            return item;
          if (item.sortIndex > sourceIndex && item.sortIndex <= targetIndex) {
            item.sortIndex = excludeFixed(item.sortIndex - 1, true);
          } else if (item.sortIndex === sourceIndex) {
            item.sortIndex = targetIndex;
          }
          return item;
        });
        renderPositon(list);
      } else if (sourceIndex > targetIndex) {
        const list = state.listData.map((item) => {
          if (item.fixed)
            return item;
          if (item.sortIndex >= targetIndex && item.sortIndex < sourceIndex) {
            item.sortIndex = excludeFixed(item.sortIndex + 1, false);
          } else if (item.sortIndex === sourceIndex) {
            item.sortIndex = targetIndex;
          }
          return item;
        });
        renderPositon(list);
      }
    };
    const onLongPress = (event, originIndex) => {
      const iTouch = event.touches[0];
      if (!iTouch)
        return;
      const realIndex = state.listData[originIndex].sortIndex;
      if (state.listData[originIndex].fixed)
        return;
      if (_baseData.isDragging)
        return;
      _baseData.isDragging = true;
      _baseData.current = originIndex;
      state.selected = realIndex;
      const offsetX = getOffsetX(realIndex) * _baseData.itemWidth;
      const offsetY = getOffsetY(realIndex) * _baseData.itemHeight;
      _baseData.distanceX = iTouch.pageX - _baseData.left - offsetX;
      _baseData.distanceY = iTouch.pageY - _baseData.top - offsetY;
      _baseData.identifier = iTouch.identifier;
      state.translateX = props.columns === 1 ? 0 : offsetX;
      state.translateY = offsetY;
      if (props.vibrate)
        vibrateShort({ type: "light" });
      emit("dragstart", event);
      startMove();
    };
    const onTouchStart = () => {
      execSelectQuery(createSelectorQuery().select(`#${props.id}`).scrollOffset()).then((res) => {
        _baseData.scrollTop = res.scrollTop;
        startMove();
      });
    };
    const startMove = () => {
      if (_baseData.scrollTop === -1 || !_baseData.isDragging)
        return;
      _baseData.ready = true;
    };
    const onTouchMove = (event) => {
      event.stopPropagation();
      event.preventDefault();
      if (!_baseData.ready)
        return;
      const iTouch = event.touches[0];
      if (!iTouch)
        return;
      if (_baseData.identifier !== iTouch.identifier)
        return;
      const offsetTop = _baseData.distanceY + _baseData.scrollTop;
      const toBottom = iTouch.clientY - offsetTop + _baseData.itemHeight - _baseData.bottom;
      if (toBottom > 0) {
        state.scrollTop = _baseData.scrollTop + toBottom;
      } else {
        const toTop = iTouch.clientY - offsetTop - _baseData.top;
        if (toTop < 0) {
          state.scrollTop = _baseData.scrollTop + toTop;
        }
      }
      const tranX = props.columns === 1 ? 0 : iTouch.pageX - _baseData.left - _baseData.distanceX;
      const tranY = iTouch.pageY - _baseData.top - _baseData.distanceY;
      state.translateX = tranX;
      state.translateY = tranY;
      const currentItem = state.listData[_baseData.current];
      const sourceIndex = currentItem.sortIndex;
      const curX = Math.round(tranX / _baseData.itemWidth);
      const curY = Math.round(tranY / _baseData.itemHeight);
      const targetIndex = getIndex(curX, curY);
      const targetItem = state.listData[targetIndex];
      if (targetItem && targetItem.fixed)
        return;
      if (targetIndex > -1 && targetIndex < state.listData.length) {
        sort(sourceIndex, targetIndex);
      }
    };
    const reset = () => {
      _baseData.previousMove = "";
      _baseData.isDragging = false;
      _baseData.current = -1;
      _baseData.scrollTop = -1;
      _baseData.ready = false;
      state.selected = -1;
    };
    const onTouchEnd = (event) => {
      emit("dragend", event);
      reset();
      const hasChanged = state.listData.some((v) => v.index !== v.sortIndex);
      if (hasChanged) {
        const listData = state.listData.map((item) => ({
          ...item,
          index: item.sortIndex
        }));
        state.listData = [...listData];
        emit("change", listData.sort((a, b) => a.index - b.index).map((i) => ({ ...i.data })));
      }
    };
    const render = (init) => {
      if (init !== "init") {
        reset();
      }
      state.listData = (props.listData || []).map((data, index) => ({
        data,
        fixed: data.fixed || false,
        index,
        sortIndex: index,
        tranX: `${getOffsetX(index) * 100}%`,
        tranY: `${getOffsetY(index) * 100}%`
      }));
      setTimeout(async () => {
        const [container, item] = await Promise.all([
          execSelectQuery(createSelectorQuery().select(`#${props.id}`).boundingClientRect()),
          execSelectQuery(createSelectorQuery().select(`#${props.id} .fish-drag-item`).boundingClientRect())
        ]);
        _baseData.itemWidth = item.width;
        _baseData.itemHeight = item.height;
        _baseData.left = container.left;
        _baseData.top = container.top;
        _baseData.bottom = container.bottom;
      }, 100);
    };
    useReady(() => {
      render("init");
      _baseData.windowHeight = getSystemInfoSync().windowHeight;
    });
    watch(() => props.itemHeight, render);
    watch(() => props.columns, render);
    watch(() => props.listData, render, { deep: true });
    return (_ctx, _cache) => {
      const _component_scroll_view = resolveComponent("scroll-view");
      return openBlock(), createBlock(_component_scroll_view, {
        id: props.id,
        class: "fish-drag-scroll",
        "scroll-y": true,
        "scroll-top": state.scrollTop
      }, {
        default: withCtx(() => [
          createElementVNode("view", {
            class: "fish-drag",
            style: normalizeStyle({ height: `${unref(wrapHeight)}px` })
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(state.listData, (item, index) => {
              return openBlock(), createElementBlock("view", {
                key: index,
                class: normalizeClass({
                  "fish-drag-item": true,
                  "fish-drag-item__upper": item.index === state.selected,
                  "fish-drag-item__transition": state.selected !== -1 && item.index !== state.selected
                }),
                style: normalizeStyle({
                  width: `${100 / props.columns}%`,
                  height: `${props.itemHeight}px`,
                  transform: item.index === state.selected ? `translateX(${state.translateX}px) translateY(${state.translateY}px)` : `translateX(${item.tranX}) translateY(${item.tranY})`
                })
              }, [
                renderSlot(_ctx.$slots, "item", normalizeProps(guardReactiveProps(item.data))),
                createElementVNode("view", {
                  "catch-move": "",
                  onLongpress: (e) => onLongPress(e, index),
                  onTouchstart: onTouchStart,
                  onTouchmove: onTouchMove,
                  onTouchend: onTouchEnd
                }, [
                  renderSlot(_ctx.$slots, "drag")
                ], 40, _hoisted_1)
              ], 6);
            }), 128))
          ], 4)
        ]),
        _: 3
      }, 8, ["id", "scroll-top"]);
    };
  }
});
export {
  _sfc_main as default
};
