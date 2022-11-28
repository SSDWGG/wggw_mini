"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["custom-tab-bar/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/raw.js!./src/custom-tab-bar/index.vue":
/*!************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/raw.js!./src/custom-tab-bar/index.vue ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var _index_vue_vue_type_template_id_ef8866ca_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=ef8866ca&ts=true */ "./src/custom-tab-bar/index.vue?vue&type=template&id=ef8866ca&ts=true");
/* harmony import */ var _index_vue_vue_type_script_lang_ts_setup_true__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=ts&setup=true */ "./src/custom-tab-bar/index.vue?vue&type=script&lang=ts&setup=true");
/* harmony import */ var _Users_renshuaiweidemac_Desktop_wggw_mini_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_Users_renshuaiweidemac_Desktop_wggw_mini_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_index_vue_vue_type_script_lang_ts_setup_true__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_index_vue_vue_type_template_id_ef8866ca_ts_true__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"src/custom-tab-bar/index.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ __webpack_exports__["default"] = (__exports__);

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-16.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/custom-tab-bar/index.vue?vue&type=script&lang=ts&setup=true":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-16.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/custom-tab-bar/index.vue?vue&type=script&lang=ts&setup=true ***!
  \******************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "webpack/container/remote/vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "webpack/container/remote/@tarojs/taro");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _useTabBarStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useTabBarStore */ "./src/custom-tab-bar/useTabBarStore.ts");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles.scss */ "./src/custom-tab-bar/styles.scss");




/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
  __name: 'index',
  setup: function setup(__props, _ref) {
    var expose = _ref.expose;
    expose();

    /**
     * 微信小程序自定义 Tabbar https://taro-docs.jd.com/taro/docs/custom-tabbar/
     * 第一次加载 TabBar 页时 TabBar 会闪烁：自定义 TabBar 在各个 TabBar 页面初始化时都会创建一个新的组件实例导致
     * https://github.com/NervJS/taro/issues/7302
     * 
     * ⚠️ selected 不能通过组件自己的 state（ref/reactive）触发渲染，与小程序setData不同步，可通过状态管理
     * 不能使用 pinia 的函数写法（类似于一个组件setup(), 内部同样使用ref/reactive）这种情况将在真机上无效
     * 
     * tabbar实例存在每一个页面？？ https://developers.weixin.qq.com/community/develop/doc/000e6081cacf6058ac082094656000
    */
    var color = '#747474';
    var selectedColor = '#7468F2';
    var store = (0,_useTabBarStore__WEBPACK_IMPORTED_MODULE_2__.useTabBarStore)();
    var switchTab = function switchTab(index, url) {
      if (index === store.selected) return;
      store.setSelected(index);
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().switchTab({
        url: "/".concat(url)
      });
    };
    var __returned__ = {
      color: color,
      selectedColor: selectedColor,
      store: store,
      switchTab: switchTab,
      get tabList() {
        return _useTabBarStore__WEBPACK_IMPORTED_MODULE_2__.tabList;
      },
      get styles() {
        return _styles_scss__WEBPACK_IMPORTED_MODULE_3__["default"];
      }
    };
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true
    });
    return __returned__;
  }
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-16.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/custom-tab-bar/index.vue?vue&type=template&id=ef8866ca&ts=true":
/*!*******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-16.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/custom-tab-bar/index.vue?vue&type=template&id=ef8866ca&ts=true ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* binding */ render; }
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "webpack/container/remote/vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var _hoisted_1 = ["onTap"];
var _hoisted_2 = ["src"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)(((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("cover-view", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($setup.styles.tabbar)
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("cover-view", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($setup.styles.topBorder)
  }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("cover-view", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($setup.styles.container)
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.tabList, function (item, index) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("cover-view", {
      key: index,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($setup.styles.item),
      onTap: function onTap($event) {
        return $setup.switchTab(index, item.pagePath);
      }
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("cover-image", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($setup.styles.icon),
      src: $setup.store.selected === index ? item.selectedIconPath : item.iconPath
    }, null, 10 /* CLASS, PROPS */, _hoisted_2), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("cover-view", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($setup.styles.text),
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        color: $setup.store.selected === index ? $setup.selectedColor : $setup.color
      })
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.text), 7 /* TEXT, CLASS, STYLE */)], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, _hoisted_1);
  }), 128 /* KEYED_FRAGMENT */))], 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("cover-view", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($setup.styles.bottomArea)
  }, null, 2 /* CLASS */)], 2 /* CLASS */)), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $setup.store.visible]]);
}

/***/ }),

/***/ "./src/custom-tab-bar/styles.scss":
/*!****************************************!*\
  !*** ./src/custom-tab-bar/styles.scss ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

// extracted by mini-css-extract-plugin
/* harmony default export */ __webpack_exports__["default"] = ({"mini-drag":"styles__mini-drag___lKW75","mini-drag-item":"styles__mini-drag-item___F6Ppm","mini-drag-item__transition":"styles__mini-drag-item__transition___SxL_5","mini-drag-item__fixed":"styles__mini-drag-item__fixed___Z6OJt","mini-drag-item__upper":"styles__mini-drag-item__upper___pLXBg","tu-tabs":"styles__tu-tabs___AK_Ls","tu-tabs__item":"styles__tu-tabs__item___LrToj","tu-tabs__item-underline":"styles__tu-tabs__item-underline___g95nc","tu-tabs__item-text":"styles__tu-tabs__item-text___ulKC7","tu-tabs__item--active":"styles__tu-tabs__item--active___UCZg5","tu-tabs__scroll-view":"styles__tu-tabs__scroll-view___TclEC","tu-tabs__header":"styles__tu-tabs__header___iYdU9","tu-tabs__scrollable":"styles__tu-tabs__scrollable___QNL3a","tu-scroll":"styles__tu-scroll___tEWtA","tu-scroll__refresher":"styles__tu-scroll__refresher___s_Mr4","tu-scroll__refresher-text":"styles__tu-scroll__refresher-text___vH_8H","tu-scroll__success":"styles__tu-scroll__success___K0c46","tu-scroll__success-show":"styles__tu-scroll__success-show___jlAQw","tu-scroll__success-hide":"styles__tu-scroll__success-hide___Vw0Kj","tu-scroll__success-bar":"styles__tu-scroll__success-bar___N3pFa","tu-scroll__success-bar-show":"styles__tu-scroll__success-bar-show___juPcV","tu-scroll__loadmore":"styles__tu-scroll__loadmore___exgaU","tu-loading":"styles__tu-loading___BbjiT","tu-loading__item":"styles__tu-loading__item___txbVf","fadeDelay":"styles__fadeDelay___N2UIV","tu-arrow":"styles__tu-arrow___gxr3g","tu-arrow__line":"styles__tu-arrow__line___nbMGo","rotate":"styles__rotate___u6IV3","mini-navbar":"styles__mini-navbar___YVBzi","mini-navbar__fixed":"styles__mini-navbar__fixed___ysPtK","mini-navbar__header":"styles__mini-navbar__header___LNyiK","mini-navbar__header-left":"styles__mini-navbar__header-left___wx4AU","mini-navbar__header-wrap":"styles__mini-navbar__header-wrap___vkOK_","mini-navbar__icon":"styles__mini-navbar__icon___lZ3iP","mini-navbar__goback":"styles__mini-navbar__goback___oPOzk","mini-navbar__placeholder":"styles__mini-navbar__placeholder___Clb1w","flex":"styles__flex___nVQeH","flex-column":"styles__flex-column___jXZT1","text-ellipsis":"styles__text-ellipsis___a6YYL","text-ellipsis-2":"styles__text-ellipsis-2___d1o18","text-ellipsis-3":"styles__text-ellipsis-3___XAY1y","button-to-view":"styles__button-to-view___kNbOl","nut-button--small":"styles__nut-button--small___KUjMT","tabbar":"styles__tabbar___g5MeG","topBorder":"styles__topBorder___Cix_u","container":"styles__container___vaLA4","item":"styles__item___ktqjT","icon":"styles__icon___kYNlK","text":"styles__text___iwxBc","bottomArea":"styles__bottomArea____oZzw"});

/***/ }),

/***/ "./src/custom-tab-bar/index.vue":
/*!**************************************!*\
  !*** ./src/custom-tab-bar/index.vue ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/runtime */ "webpack/container/remote/@tarojs/runtime");
/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_tarojs_taro_loader_lib_raw_js_index_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@tarojs/taro-loader/lib/raw.js!./index.vue */ "./node_modules/@tarojs/taro-loader/lib/raw.js!./src/custom-tab-bar/index.vue");


var inst = Component((0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__.createComponentConfig)(_node_modules_tarojs_taro_loader_lib_raw_js_index_vue__WEBPACK_IMPORTED_MODULE_1__["default"], 'custom-tab-bar/index'))



/***/ }),

/***/ "./src/custom-tab-bar/index.vue?vue&type=script&lang=ts&setup=true":
/*!*************************************************************************!*\
  !*** ./src/custom-tab-bar/index.vue?vue&type=script&lang=ts&setup=true ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_16_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_index_vue_vue_type_script_lang_ts_setup_true__WEBPACK_IMPORTED_MODULE_0__["default"]; }
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_16_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_index_vue_vue_type_script_lang_ts_setup_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-16.use[0]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./index.vue?vue&type=script&lang=ts&setup=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-16.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/custom-tab-bar/index.vue?vue&type=script&lang=ts&setup=true");
 

/***/ }),

/***/ "./src/custom-tab-bar/index.vue?vue&type=template&id=ef8866ca&ts=true":
/*!****************************************************************************!*\
  !*** ./src/custom-tab-bar/index.vue?vue&type=template&id=ef8866ca&ts=true ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_16_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_index_vue_vue_type_template_id_ef8866ca_ts_true__WEBPACK_IMPORTED_MODULE_0__.render; }
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_16_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_index_vue_vue_type_template_id_ef8866ca_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-16.use[0]!../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./index.vue?vue&type=template&id=ef8866ca&ts=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-16.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/custom-tab-bar/index.vue?vue&type=template&id=ef8866ca&ts=true");


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["vendors","common"], function() { return __webpack_exec__("./src/custom-tab-bar/index.vue"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map