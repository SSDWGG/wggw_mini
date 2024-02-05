(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue"), require("@tarojs/taro")) : typeof define === "function" && define.amd ? define(["exports", "vue", "@tarojs/taro"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.fishui = {}, global.Vue, global.Taro));
})(this, function(exports2, vue, Taro) {
  "use strict";
  const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
  const Taro__default = /* @__PURE__ */ _interopDefaultLegacy(Taro);
  const execSelectQuery = (selectQuery, interval = 100, timeout = 3e3) => {
    const _startTime = Date.now();
    return new Promise((resolve, reject) => {
      const func = () => {
        selectQuery.exec((res) => {
          const result = res[0];
          if (Date.now() - _startTime > timeout) {
            reject(new Error("query time out"));
          } else if (result === null || Array.isArray(result) && result.length === 0) {
            setTimeout(func, interval);
          } else {
            resolve(result);
          }
        });
      };
      func();
    });
  };
  const getSizeToPx = (size) => {
    if (String(size).startsWith("0"))
      return 0;
    if (typeof size === "number" || /^\d+$/.test(size)) {
      return `${size}px`;
    }
    return size;
  };
  const _hoisted_1$5 = ["id"];
  const _hoisted_2$3 = ["onLongpress", "onTouchstart"];
  const _sfc_main$6 = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    props: {
      listData: null,
      id: { default: "fish-drag" },
      columns: { default: 3 },
      itemHeight: { default: 124 },
      vibrate: { type: Boolean, default: false },
      transition: { type: Boolean, default: true },
      trigger: { default: "longpress" }
    },
    emits: ["change", "dragstart", "dragend"],
    setup(__props, { emit }) {
      const props = __props;
      const state = vue.reactive({
        selected: -1,
        listData: [],
        translateX: 0,
        translateY: 0
      });
      const _baseData = {
        current: -1,
        distanceX: 0,
        distanceY: 0,
        identifier: -1,
        itemHeight: 0,
        itemWidth: 0,
        containerLeft: 0,
        containerTop: 0,
        isDragging: false,
        previousMove: ""
      };
      const wrapHeight = vue.computed(() => Math.ceil(props.listData.length / props.columns) * props.itemHeight);
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
      const onDragStart = (event, originIndex) => {
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
        _baseData.distanceX = iTouch.pageX - _baseData.containerLeft - offsetX;
        _baseData.distanceY = iTouch.pageY - _baseData.containerTop - offsetY;
        _baseData.identifier = iTouch.identifier;
        state.translateX = props.columns === 1 ? 0 : offsetX;
        state.translateY = offsetY;
        if (props.vibrate)
          Taro.vibrateShort({ type: "light" });
        emit("dragstart", event);
      };
      const onLongPress = (event, index) => {
        if (props.trigger === "longpress") {
          onDragStart(event, index);
        }
      };
      const onTouchStart = (event, index) => {
        if (props.trigger === "touchstart") {
          onDragStart(event, index);
        }
      };
      const onTouchMove = (event) => {
        event.stopPropagation();
        event.preventDefault();
        if (!_baseData.isDragging)
          return;
        const iTouch = event.touches[0];
        if (!iTouch)
          return;
        if (_baseData.identifier !== iTouch.identifier)
          return;
        const tranX = props.columns === 1 ? 0 : iTouch.pageX - _baseData.containerLeft - _baseData.distanceX;
        const tranY = iTouch.pageY - _baseData.containerTop - _baseData.distanceY;
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
            execSelectQuery(Taro.createSelectorQuery().select(`#${props.id}`).boundingClientRect()),
            execSelectQuery(Taro.createSelectorQuery().select(`#${props.id} .fish-drag-item`).boundingClientRect())
          ]);
          _baseData.itemWidth = item.width;
          _baseData.itemHeight = item.height;
          _baseData.containerLeft = container.left;
          _baseData.containerTop = container.top;
        }, 100);
      };
      Taro.useReady(() => {
        render("init");
      });
      vue.watch(() => props.itemHeight, render);
      vue.watch(() => props.columns, render);
      vue.watch(() => props.listData, render, { deep: true });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          id: props.id,
          class: "fish-drag",
          style: vue.normalizeStyle({ height: `${vue.unref(wrapHeight)}px` })
        }, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(state.listData, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: index,
              class: vue.normalizeClass({
                "fish-drag-item": true,
                "fish-drag-item__upper": item.index === state.selected,
                "fish-drag-item__transition": props.transition && item.index !== state.selected
              }),
              style: vue.normalizeStyle({
                width: `${100 / props.columns}%`,
                height: `${props.itemHeight}`,
                transform: item.index === state.selected ? `translateX(${state.translateX}px) translateY(${state.translateY}px)` : `translateX(${item.tranX}) translateY(${item.tranY})`
              }),
              onLongpress: (e) => onLongPress(e, index),
              onTouchstart: (e) => onTouchStart(e, index),
              onTouchmove: onTouchMove,
              onTouchend: onTouchEnd
            }, [
              vue.renderSlot(_ctx.$slots, "item", vue.normalizeProps(vue.guardReactiveProps(item.data)))
            ], 46, _hoisted_2$3);
          }), 128))
        ], 12, _hoisted_1$5);
      };
    }
  });
  const _hoisted_1$4 = ["onLongpress"];
  const _sfc_main$5 = /* @__PURE__ */ vue.defineComponent({
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
      const state = vue.reactive({
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
      const wrapHeight = vue.computed(() => Math.ceil(props.listData.length / props.columns) * props.itemHeight);
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
          Taro.vibrateShort({ type: "light" });
        emit("dragstart", event);
        startMove();
      };
      const onTouchStart = () => {
        execSelectQuery(Taro.createSelectorQuery().select(`#${props.id}`).scrollOffset()).then((res) => {
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
            execSelectQuery(Taro.createSelectorQuery().select(`#${props.id}`).boundingClientRect()),
            execSelectQuery(Taro.createSelectorQuery().select(`#${props.id} .fish-drag-item`).boundingClientRect())
          ]);
          _baseData.itemWidth = item.width;
          _baseData.itemHeight = item.height;
          _baseData.left = container.left;
          _baseData.top = container.top;
          _baseData.bottom = container.bottom;
        }, 100);
      };
      Taro.useReady(() => {
        render("init");
        _baseData.windowHeight = Taro.getSystemInfoSync().windowHeight;
      });
      vue.watch(() => props.itemHeight, render);
      vue.watch(() => props.columns, render);
      vue.watch(() => props.listData, render, { deep: true });
      return (_ctx, _cache) => {
        const _component_scroll_view = vue.resolveComponent("scroll-view");
        return vue.openBlock(), vue.createBlock(_component_scroll_view, {
          id: props.id,
          class: "fish-drag-scroll",
          "scroll-y": true,
          "scroll-top": state.scrollTop
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", {
              class: "fish-drag",
              style: vue.normalizeStyle({ height: `${vue.unref(wrapHeight)}px` })
            }, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(state.listData, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: index,
                  class: vue.normalizeClass({
                    "fish-drag-item": true,
                    "fish-drag-item__upper": item.index === state.selected,
                    "fish-drag-item__transition": state.selected !== -1 && item.index !== state.selected
                  }),
                  style: vue.normalizeStyle({
                    width: `${100 / props.columns}%`,
                    height: `${props.itemHeight}px`,
                    transform: item.index === state.selected ? `translateX(${state.translateX}px) translateY(${state.translateY}px)` : `translateX(${item.tranX}) translateY(${item.tranY})`
                  })
                }, [
                  vue.renderSlot(_ctx.$slots, "item", vue.normalizeProps(vue.guardReactiveProps(item.data))),
                  vue.createElementVNode("view", {
                    "catch-move": "",
                    onLongpress: (e) => onLongPress(e, index),
                    onTouchstart: onTouchStart,
                    onTouchmove: onTouchMove,
                    onTouchend: onTouchEnd
                  }, [
                    vue.renderSlot(_ctx.$slots, "drag")
                  ], 40, _hoisted_1$4)
                ], 6);
              }), 128))
            ], 4)
          ]),
          _: 3
        }, 8, ["id", "scroll-top"]);
      };
    }
  });
  const LoadingIcon = () => vue.createVNode("view", {
    "class": "fish-loading"
  }, [vue.createVNode("view", {
    "class": "fish-loading__item"
  }, null), vue.createVNode("view", {
    "class": "fish-loading__item"
  }, null), vue.createVNode("view", {
    "class": "fish-loading__item"
  }, null), vue.createVNode("view", {
    "class": "fish-loading__item"
  }, null), vue.createVNode("view", {
    "class": "fish-loading__item"
  }, null), vue.createVNode("view", {
    "class": "fish-loading__item"
  }, null), vue.createVNode("view", {
    "class": "fish-loading__item"
  }, null), vue.createVNode("view", {
    "class": "fish-loading__item"
  }, null), vue.createVNode("view", {
    "class": "fish-loading__item"
  }, null), vue.createVNode("view", {
    "class": "fish-loading__item"
  }, null), vue.createVNode("view", {
    "class": "fish-loading__item"
  }, null), vue.createVNode("view", {
    "class": "fish-loading__item"
  }, null)]);
  const ArrowIcon = () => vue.createVNode("view", {
    "class": "fish-arrow"
  }, [vue.createVNode("view", {
    "class": "fish-arrow__line"
  }, null)]);
  const _hoisted_1$3 = /* @__PURE__ */ vue.createElementVNode("text", { class: "fish-scroll__refresher-text" }, "\u52A0\u8F7D\u4E2D...", -1);
  const _hoisted_2$2 = { class: "fish-scroll__refresher-text" };
  const _hoisted_3$2 = { class: "fish-scroll__loadmore" };
  const _hoisted_4$2 = /* @__PURE__ */ vue.createElementVNode("text", { class: "fish-scroll__refresher-text" }, "\u52A0\u8F7D\u4E2D...", -1);
  const _hoisted_5$1 = {
    key: 1,
    class: "fish-scroll__loadmore"
  };
  const _sfc_main$4 = /* @__PURE__ */ vue.defineComponent({
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
      const state = vue.reactive({
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
      Taro.useReady(() => {
        execSelectQuery(Taro.createSelectorQuery().select(`#${props.id}`).boundingClientRect()).then((res) => {
          _scrollHeight = res.height;
        });
      });
      return (_ctx, _cache) => {
        const _component_block = vue.resolveComponent("block");
        const _component_scroll_view = vue.resolveComponent("scroll-view");
        return vue.openBlock(), vue.createBlock(_component_scroll_view, {
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
          default: vue.withCtx(() => [
            vue.createElementVNode("view", {
              class: vue.normalizeClass({ "fish-scroll__refresher": true, "fish-scroll__refresher-flush": state.flush }),
              style: vue.normalizeStyle({ height: props.refresherThreshold + "px", top: -props.refresherThreshold + "px" })
            }, [
              state.refreshStatus === 2 ? (vue.openBlock(), vue.createBlock(_component_block, { key: 0 }, {
                default: vue.withCtx(() => [
                  vue.createVNode(vue.unref(LoadingIcon)),
                  _hoisted_1$3
                ]),
                _: 1
              })) : state.refreshStatus < 2 ? (vue.openBlock(), vue.createBlock(_component_block, { key: 1 }, {
                default: vue.withCtx(() => [
                  vue.createVNode(vue.unref(ArrowIcon), {
                    class: vue.normalizeClass({ "rotate": state.refreshStatus === 1 })
                  }, null, 8, ["class"]),
                  vue.createElementVNode("text", _hoisted_2$2, vue.toDisplayString(state.refreshStatus === 1 ? "\u91CA\u653E\u5237\u65B0" : "\u4E0B\u62C9\u5237\u65B0"), 1)
                ]),
                _: 1
              })) : vue.createCommentVNode("", true)
            ], 6),
            props.showSuccess && state.refreshStatus >= 3 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: vue.normalizeClass({
                "fish-scroll__success": true,
                "fish-scroll__success-show": state.refreshStatus >= 4,
                "fish-scroll__success-hide": state.refreshStatus === 5
              }),
              style: vue.normalizeStyle({ height: props.refresherThreshold + "px" })
            }, [
              vue.createElementVNode("view", {
                class: vue.normalizeClass({
                  "fish-scroll__success-bar": true,
                  "fish-scroll__success-bar-show": state.refreshStatus >= 4
                })
              }, vue.toDisplayString(props.successText), 3)
            ], 6)) : vue.createCommentVNode("", true),
            vue.renderSlot(_ctx.$slots, "default"),
            vue.withDirectives(vue.createElementVNode("view", _hoisted_3$2, [
              vue.createVNode(vue.unref(LoadingIcon)),
              _hoisted_4$2
            ], 512), [
              [vue.vShow, state.isMoreLoading]
            ]),
            !props.hasmore && !state.isMoreLoading ? (vue.openBlock(), vue.createElementBlock("view", _hoisted_5$1, vue.toDisplayString(props.loadallText), 1)) : vue.createCommentVNode("", true)
          ]),
          _: 3
        }, 8, ["id", "lower-threshold", "refresher-enabled", "refresher-threshold", "refresher-background", "refresher-triggered"]);
      };
    }
  });
  const _hoisted_1$2 = { class: "fish-tabs" };
  const _hoisted_2$1 = { class: "fish-tabs__header" };
  const _hoisted_3$1 = ["onTap"];
  const _hoisted_4$1 = { class: "fish-tabs__item-text" };
  const _sfc_main$3 = /* @__PURE__ */ vue.defineComponent({
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
      const state = vue.reactive({
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
          execSelectQuery(Taro.createSelectorQuery().select(`#${props.id}`).boundingClientRect()),
          execSelectQuery(Taro.createSelectorQuery().selectAll(`#${props.id} .fish-tabs__item-text`).boundingClientRect())
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
      Taro.useReady(init);
      vue.watch(() => props.modelValue, getLayout);
      vue.watch(() => props.tabList, tabListChange, { deep: true });
      return (_ctx, _cache) => {
        const _component_scroll_view = vue.resolveComponent("scroll-view");
        return vue.openBlock(), vue.createElementBlock("view", _hoisted_1$2, [
          vue.createVNode(_component_scroll_view, {
            id: props.id,
            class: vue.normalizeClass({
              "fish-tabs__scroll-view": true,
              "fish-tabs__scrollable": props.scrollable
            }),
            "scroll-y": false,
            "scroll-x": props.scrollable,
            "scroll-with-animation": props.scrollable,
            "scroll-animation-duration": 300,
            "scroll-left": state.scrollLeft
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", _hoisted_2$1, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(props.tabList, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    key: index,
                    class: vue.normalizeClass({
                      "fish-tabs__item": true,
                      "fish-tabs__item--active": props.modelValue === index
                    }),
                    onTap: () => handleClick(index)
                  }, [
                    vue.createElementVNode("view", _hoisted_4$1, vue.toDisplayString(item.title), 1)
                  ], 42, _hoisted_3$1);
                }), 128)),
                vue.createElementVNode("view", {
                  class: "fish-tabs__item-underline",
                  style: vue.normalizeStyle({
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
  const iconPath = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAApJJREFUaEPtmVmO1DAQhn8HhieugIQrfRceENDd0zPsF0DcBvEMM8AATyD25Sqx3ULcYRapU8hSIoVMko6TOIs0/RjZzv/VX0lXVQQm/hMT148LgKEd9OYAEd0E8JyZd4IgeKqU+uAD1gsAEe0CeAtgJxH9V2t9bRIAUsqVEOIoI97qVlrr2egBpJR7Qog3OfFnQRDciqLo16gBSsSfMvOeMeazD/H2zE6eASnlfhL5yxmh3sV3AjCbzfbjOLZp8594ACut9RdfkU/PbeVAGIZ3mfl1gfhdrfVX3+JbORCG4T1mfjWk+MYAFeKXWutvfUS+cQoR0X0Ah7nInwCwadOreGcHysQLIZZKqe99Rt7ZASJ6AOAgH/khxdd2wIpn5kMhxKVMlE+EEAul1I8hIl/bASJ6yMwHYxS/1QEp5SMAL/PigyCYR1H0c8jIb3WgRPxxHMeL9Xo9CvGlDkgpHwN4kYv8MTPPjTFeqsqmbp4rJWxts9lsjgrE3zHG/G56I1/7zgEQ0R8A2e7JRn6U4gtTiIgMgOtje12WOVjkwBLA+4I/rMHf+UUQheX0GEuG2g6kC6cCUdnQjKlsdnYg3VDRdfVe+9d+BvILx9A6NnYg3VjRvPfW/zZ2IN1YNj5JurFemvg8hPNUomyA1dcYpTWAPaBk/nk6BISzA5l0Khri9jKNy7rQGMAeUjBGt5d7hWgFUAFxxswrn0PdrR2ZS/1ORLYAfJcfqyeT6U8uZ7mube1ApnYaBKIzAAsShuGCmW0pnn5aspftB47bvoYAnQJkIGw6XUndYWZtjAld06PO+s4BEoh54kQKMZ2PfJna6UYcx88AXBVCPFFKfawTUdc1XhxwFdFm/QVAm+h1sXfyDvwDmUo+QDLH3GkAAAAASUVORK5CYII=";
  const _hoisted_1$1 = { class: "fish-navbar" };
  const _hoisted_2 = {
    key: 0,
    class: "fish-navbar__header-left"
  };
  const _hoisted_3 = ["src"];
  const _hoisted_4 = { class: "fish-navbar__header-wrap" };
  const _hoisted_5 = { class: "fish-navbar__placeholder" };
  const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
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
      const { statusBarHeight } = Taro__default.default.getSystemInfoSync();
      const slots = vue.useSlots();
      const handleBack = (e) => {
        if (typeof props.goback === "function") {
          props.goback(e);
        } else {
          Taro__default.default.navigateBack();
        }
      };
      const height = vue.computed(() => getSizeToPx(props.height));
      return (_ctx, _cache) => {
        const _component_block = vue.resolveComponent("block");
        return vue.openBlock(), vue.createElementBlock("view", _hoisted_1$1, [
          vue.createElementVNode("view", {
            class: vue.normalizeClass({ "fish-navbar__fixed": props.fixed }),
            style: vue.normalizeStyle({ backgroundColor: props.backgroundColor })
          }, [
            vue.createElementVNode("view", {
              style: vue.normalizeStyle({ height: `${vue.unref(statusBarHeight)}px` })
            }, null, 4),
            vue.unref(height) !== 0 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "fish-navbar__header",
              style: vue.normalizeStyle({ height: vue.unref(height), backgroundColor: props.backgroundColor })
            }, [
              !props.hideBack ? (vue.openBlock(), vue.createElementBlock("view", _hoisted_2, [
                !vue.unref(slots).left ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "fish-navbar__goback",
                  onTap: handleBack
                }, [
                  vue.createElementVNode("image", {
                    src: props.backIcon,
                    class: "fish-navbar__icon"
                  }, null, 8, _hoisted_3)
                ], 32)) : (vue.openBlock(), vue.createBlock(_component_block, { key: 1 }, {
                  default: vue.withCtx(() => [
                    vue.renderSlot(_ctx.$slots, "left")
                  ]),
                  _: 3
                }))
              ])) : vue.createCommentVNode("", true),
              vue.createElementVNode("view", _hoisted_4, [
                !vue.unref(slots).title ? (vue.openBlock(), vue.createElementBlock("text", {
                  key: 0,
                  style: vue.normalizeStyle({ color: props.color })
                }, vue.toDisplayString(props.title), 5)) : (vue.openBlock(), vue.createBlock(_component_block, { key: 1 }, {
                  default: vue.withCtx(() => [
                    vue.renderSlot(_ctx.$slots, "title")
                  ]),
                  _: 3
                }))
              ])
            ], 4)) : vue.createCommentVNode("", true)
          ], 6),
          vue.createElementVNode("view", _hoisted_5, [
            vue.createElementVNode("view", {
              style: vue.normalizeStyle({ height: `${vue.unref(statusBarHeight)}px` })
            }, null, 4),
            vue.createElementVNode("view", {
              style: vue.normalizeStyle({ height: vue.unref(height) })
            }, null, 4)
          ])
        ]);
      };
    }
  });
  const _hoisted_1 = ["id", "catch-move"];
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
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
      const slots = vue.useSlots();
      const slides = vue.computed(() => {
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
      const state = vue.reactive({
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
      Taro__default.default.useReady(() => {
        if (props.width && props.height) {
          initSize(props.width, props.height);
        } else {
          execSelectQuery(Taro__default.default.createSelectorQuery().select(`#${props.id}`).boundingClientRect()).then((res) => {
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
        return vue.h(vue.Fragment, {}, slides.value.filter((_item, index) => index >= state.from && index <= state.to).map((slide, index) => {
          if (!slide.props)
            slide.props = { key: String(index) };
          if (!slide.props.style)
            slide.props.style = {};
          slide.props.style = { ...slide.props.style, ...itemStyle, ...{ top: `${state.from * state.height}px` } };
          return vue.h(slide.type, { ...slide.props }, slide.children);
        }));
      };
      vue.watch(() => props.current, (newCurrent, preCurrent) => {
        if (newCurrent === state.currentIndex)
          return;
        if (Math.abs(newCurrent - preCurrent) > props.slidesPerView) {
          doNotAnimate();
        }
        moveTo(newCurrent);
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          id: props.id,
          "catch-move": props.catchMove,
          class: "fish-swiper",
          onTouchstart: onTouchStart,
          onTouchmove: onTouchMove,
          onTouchend: onTouchEnd,
          onTouchcancel: onTouchEnd
        }, [
          vue.createElementVNode("view", {
            class: vue.normalizeClass({
              "fish-swiper__container": true,
              "fish-swiper__vertical": props.vertical
            }),
            style: vue.normalizeStyle({
              transitionDuration: `${state.isMoving ? 0 : props.duration}ms`,
              transform: `translateX(${state.translateX}px) translateY(${state.translateY}px)`,
              [props.vertical ? "height" : "width"]: props.vertical ? `${state.height * vue.unref(slides).length}px` : `${state.width * vue.unref(slides).length}px`
            }),
            onTransitionend: onTransitionEnd
          }, [
            (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(renderSlides)))
          ], 38)
        ], 40, _hoisted_1);
      };
    }
  });
  const __default__ = { name: "SwiperSlide" };
  const _sfc_main = /* @__PURE__ */ vue.defineComponent({
    ...__default__,
    props: {
      current: null,
      index: null
    },
    setup(__props) {
      const props = __props;
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          class: vue.normalizeClass({
            "fish-swiper__slide": true,
            "fish-swiper__slide-active": props.current !== void 0 && props.index === props.current
          })
        }, [
          vue.renderSlot(_ctx.$slots, "default")
        ], 2);
      };
    }
  });
  exports2.Drag = _sfc_main$6;
  exports2.DragX = _sfc_main$5;
  exports2.Navbar = _sfc_main$2;
  exports2.Scroll = _sfc_main$4;
  exports2.SwiperSlide = _sfc_main;
  exports2.Tab = _sfc_main$3;
  exports2.VirtualSwiper = _sfc_main$1;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
