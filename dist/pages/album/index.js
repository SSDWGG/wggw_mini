"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/album/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/raw.js!./src/pages/album/index.vue":
/*!*********************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/raw.js!./src/pages/album/index.vue ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var _index_vue_vue_type_template_id_7d510544_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=7d510544&ts=true */ "./src/pages/album/index.vue?vue&type=template&id=7d510544&ts=true");
/* harmony import */ var _index_vue_vue_type_script_lang_ts_setup_true__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=ts&setup=true */ "./src/pages/album/index.vue?vue&type=script&lang=ts&setup=true");
/* harmony import */ var _Users_renshuaiweidemac_Desktop_wggw_mini_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_Users_renshuaiweidemac_Desktop_wggw_mini_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_index_vue_vue_type_script_lang_ts_setup_true__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_index_vue_vue_type_template_id_7d510544_ts_true__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"src/pages/album/index.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ __webpack_exports__["default"] = (__exports__);

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-16.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/pages/album/index.vue?vue&type=script&lang=ts&setup=true":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-16.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/pages/album/index.vue?vue&type=script&lang=ts&setup=true ***!
  \***************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var _nutui_nutui_taro_dist_packages_es_CircleProgress__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nutui/nutui-taro/dist/packages/_es/CircleProgress */ "./node_modules/@nutui/nutui-taro/dist/packages/_es/CircleProgress.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "webpack/container/remote/vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles.scss */ "./src/pages/album/styles.scss");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_3__);






/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_1__.defineComponent)({
  __name: 'index',
  setup: function setup(__props, _ref) {
    var expose = _ref.expose;
    expose();
    var data = (0,vue__WEBPACK_IMPORTED_MODULE_1__.reactive)({
      gradientColor: {
        '0%': '#FF5E5E',
        '100%': '#FFA062'
      },
      startYear: dayjs__WEBPACK_IMPORTED_MODULE_3___default()("".concat(dayjs__WEBPACK_IMPORTED_MODULE_3___default()().year() - 1, "-12-31 23:59:59.999")),
      endDay: dayjs__WEBPACK_IMPORTED_MODULE_3___default()("".concat(dayjs__WEBPACK_IMPORTED_MODULE_3___default()().format('YYYY-MM-DD'), " 23:59:59.999")),
      nowTime: dayjs__WEBPACK_IMPORTED_MODULE_3___default()()
    });
    setInterval(function () {
      data.nowTime = dayjs__WEBPACK_IMPORTED_MODULE_3___default()();
    }, 25);
    var progressYear = (0,vue__WEBPACK_IMPORTED_MODULE_1__.computed)(function () {
      return ((data.nowTime - data.startYear) * 100 / 31536000000).toFixed(6);
    });
    var passTimeInYear = (0,vue__WEBPACK_IMPORTED_MODULE_1__.computed)(function () {
      return data.nowTime.diff(dayjs__WEBPACK_IMPORTED_MODULE_3___default()(data.startYear), 'day', true).toFixed(6);
    });
    var progressDay = (0,vue__WEBPACK_IMPORTED_MODULE_1__.computed)(function () {
      return (100 - data.endDay.diff(dayjs__WEBPACK_IMPORTED_MODULE_3___default()(data.nowTime), 'millisecond', true) * 100 / 86400000).toFixed(6);
    });
    var __returned__ = {
      data: data,
      progressYear: progressYear,
      passTimeInYear: passTimeInYear,
      progressDay: progressDay,
      get styles() {
        return _styles_scss__WEBPACK_IMPORTED_MODULE_2__["default"];
      },
      get NutCircleProgress() {
        return _nutui_nutui_taro_dist_packages_es_CircleProgress__WEBPACK_IMPORTED_MODULE_0__["default"];
      },
      get dayjs() {
        return (dayjs__WEBPACK_IMPORTED_MODULE_3___default());
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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-16.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/pages/album/index.vue?vue&type=template&id=7d510544&ts=true":
/*!****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-16.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/pages/album/index.vue?vue&type=template&id=7d510544&ts=true ***!
  \****************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* binding */ render; }
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "webpack/container/remote/vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var _hoisted_1 = {
  class: "progress"
};
var _hoisted_2 = {
  class: "progressDiv"
};
var _hoisted_3 = {
  class: "title"
};
var _hoisted_4 = {
  class: "progressNum"
};
var _hoisted_5 = {
  class: "progressNum"
};
var _hoisted_6 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("image", {
  class: "bgImg",
  src: "https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/CGHMKNBP-1669687856120rabbit.jpg"
}, null, -1 /* HOISTED */);
var _hoisted_7 = {
  class: "progressDiv"
};
var _hoisted_8 = {
  class: "title"
};
var _hoisted_9 = {
  class: "progressNum"
};
var _hoisted_10 = {
  class: "progressNum"
};
var _hoisted_11 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("image", {
  class: "bgImg",
  src: "https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/CGHMKNBP-1669687856120rabbit.jpg"
}, null, -1 /* HOISTED */);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("view", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($setup.styles.myContainer)
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("view", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" year progress "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["NutCircleProgress"], {
    progress: $setup.progressYear,
    radius: "80",
    strokeWidth: "3",
    color: $setup.data.gradientColor
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("view", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("view", _hoisted_3, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.data.nowTime.year()) + "-progress ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("view", _hoisted_4, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.progressYear) + "% ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("view", _hoisted_5, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.passTimeInYear) + "Day ", 1 /* TEXT */)]), _hoisted_6];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["progress", "color"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" day progress "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["NutCircleProgress"], {
    progress: $setup.progressDay,
    radius: "80",
    strokeWidth: "3",
    color: $setup.data.gradientColor
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("view", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("view", _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.data.nowTime.format('M.D')) + "-progress ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("view", _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.dayjs().format('MM-DD hh:mm')), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("view", _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.progressDay) + "% ", 1 /* TEXT */)]), _hoisted_11];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["progress", "color"])])], 2 /* CLASS */);
}

/***/ }),

/***/ "./src/pages/album/styles.scss":
/*!*************************************!*\
  !*** ./src/pages/album/styles.scss ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

// extracted by mini-css-extract-plugin
/* harmony default export */ __webpack_exports__["default"] = ({"mini-drag":"styles__mini-drag___Hs_A8","mini-drag-item":"styles__mini-drag-item___P193S","mini-drag-item__transition":"styles__mini-drag-item__transition___j0YCJ","mini-drag-item__fixed":"styles__mini-drag-item__fixed___ztTDu","mini-drag-item__upper":"styles__mini-drag-item__upper___XyHY_","tu-tabs":"styles__tu-tabs___mj3MG","tu-tabs__item":"styles__tu-tabs__item___Bzh59","tu-tabs__item-underline":"styles__tu-tabs__item-underline___A9pWG","tu-tabs__item-text":"styles__tu-tabs__item-text___JfPBs","tu-tabs__item--active":"styles__tu-tabs__item--active___klKPA","tu-tabs__scroll-view":"styles__tu-tabs__scroll-view___fcBUS","tu-tabs__header":"styles__tu-tabs__header___kSCLQ","tu-tabs__scrollable":"styles__tu-tabs__scrollable___munrs","tu-scroll":"styles__tu-scroll___gP7O2","tu-scroll__refresher":"styles__tu-scroll__refresher___uWN3m","tu-scroll__refresher-text":"styles__tu-scroll__refresher-text___wdgbY","tu-scroll__success":"styles__tu-scroll__success___qb0zr","tu-scroll__success-show":"styles__tu-scroll__success-show___vpxfH","tu-scroll__success-hide":"styles__tu-scroll__success-hide___sbXbv","tu-scroll__success-bar":"styles__tu-scroll__success-bar___Ii5dk","tu-scroll__success-bar-show":"styles__tu-scroll__success-bar-show___ujhpX","tu-scroll__loadmore":"styles__tu-scroll__loadmore___sQUeQ","tu-loading":"styles__tu-loading___NlBQG","tu-loading__item":"styles__tu-loading__item___DyH2O","fadeDelay":"styles__fadeDelay___UNSbl","tu-arrow":"styles__tu-arrow___J2taT","tu-arrow__line":"styles__tu-arrow__line___jWzPX","rotate":"styles__rotate___LxccZ","mini-navbar":"styles__mini-navbar___z_j6Q","mini-navbar__fixed":"styles__mini-navbar__fixed___nTwnE","mini-navbar__header":"styles__mini-navbar__header___Aejet","mini-navbar__header-left":"styles__mini-navbar__header-left___D8Px1","mini-navbar__header-wrap":"styles__mini-navbar__header-wrap___qW6tj","mini-navbar__icon":"styles__mini-navbar__icon___JMwsC","mini-navbar__goback":"styles__mini-navbar__goback___ughmy","mini-navbar__placeholder":"styles__mini-navbar__placeholder___oeTUP","flex":"styles__flex___p8B20","flex-column":"styles__flex-column___NGPdN","text-ellipsis":"styles__text-ellipsis___yae5J","text-ellipsis-2":"styles__text-ellipsis-2___flTho","text-ellipsis-3":"styles__text-ellipsis-3___zKlSN","button-to-view":"styles__button-to-view___Clg0l","nut-button--small":"styles__nut-button--small___zDevn","myContainer":"styles__myContainer___cCQkv"});

/***/ }),

/***/ "./src/pages/album/index.vue":
/*!***********************************!*\
  !*** ./src/pages/album/index.vue ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/runtime */ "webpack/container/remote/@tarojs/runtime");
/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_tarojs_taro_loader_lib_raw_js_index_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/@tarojs/taro-loader/lib/raw.js!./index.vue */ "./node_modules/@tarojs/taro-loader/lib/raw.js!./src/pages/album/index.vue");


var config = {"enableShareAppMessage":true,"enableShareTimeline":true};
_node_modules_tarojs_taro_loader_lib_raw_js_index_vue__WEBPACK_IMPORTED_MODULE_1__["default"].enableShareTimeline = true
_node_modules_tarojs_taro_loader_lib_raw_js_index_vue__WEBPACK_IMPORTED_MODULE_1__["default"].enableShareAppMessage = true
var inst = Page((0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__.createPageConfig)(_node_modules_tarojs_taro_loader_lib_raw_js_index_vue__WEBPACK_IMPORTED_MODULE_1__["default"], 'pages/album/index', {root:{cn:[]}}, config || {}))




/***/ }),

/***/ "./src/pages/album/index.vue?vue&type=script&lang=ts&setup=true":
/*!**********************************************************************!*\
  !*** ./src/pages/album/index.vue?vue&type=script&lang=ts&setup=true ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_16_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_index_vue_vue_type_script_lang_ts_setup_true__WEBPACK_IMPORTED_MODULE_0__["default"]; }
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_16_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_index_vue_vue_type_script_lang_ts_setup_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-16.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./index.vue?vue&type=script&lang=ts&setup=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-16.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/pages/album/index.vue?vue&type=script&lang=ts&setup=true");
 

/***/ }),

/***/ "./src/pages/album/index.vue?vue&type=template&id=7d510544&ts=true":
/*!*************************************************************************!*\
  !*** ./src/pages/album/index.vue?vue&type=template&id=7d510544&ts=true ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_16_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_index_vue_vue_type_template_id_7d510544_ts_true__WEBPACK_IMPORTED_MODULE_0__.render; }
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_16_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_index_vue_vue_type_template_id_7d510544_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-16.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./index.vue?vue&type=template&id=7d510544&ts=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-16.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/pages/album/index.vue?vue&type=template&id=7d510544&ts=true");


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["vendors","common"], function() { return __webpack_exec__("./src/pages/album/index.vue"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map