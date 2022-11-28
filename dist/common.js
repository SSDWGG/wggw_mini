"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["common"],{

/***/ "./src/custom-tab-bar/useTabBarStore.ts":
/*!**********************************************!*\
  !*** ./src/custom-tab-bar/useTabBarStore.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useTabBarStore": function() { return /* binding */ useTabBarStore; },
/* harmony export */   "tabList": function() { return /* binding */ tabList; },
/* harmony export */   "adjustSelected": function() { return /* binding */ adjustSelected; }
/* harmony export */ });
/* harmony import */ var pinia__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! pinia */ "./node_modules/pinia/dist/pinia.mjs");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/taro */ "webpack/container/remote/@tarojs/taro");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_0__);


var useTabBarStore = (0,pinia__WEBPACK_IMPORTED_MODULE_1__.defineStore)('tabbar', {
  state: function state() {
    return {
      selected: 0,
      visible: true
    };
  },
  getters: {
    height: function height(state) {
      return state.visible ? _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().pxTransform(50) : '0px';
    }
  },
  actions: {
    setSelected: function setSelected(index) {
      if (this.selected === index) return;
      this.selected = index;
    },
    setVisible: function setVisible(visible) {
      console.log('设置tab显隐', visible);
      this.visible = visible;
    }
  }
});

// 请同步 app.config.ts tabBar.list
var tabList = [{
  pagePath: 'pages/album/index',
  // 请确保 /pages/album/index.vue has definePageConfig.usingComponents
  text: '相册',
  iconPath: '../assets/images/tabbar/icon-tabbar-album.png',
  selectedIconPath: '../assets/images/tabbar/icon-tabbar-album-active.png'
}, {
  pagePath: 'pages/mine/index',
  // 请确保 /pages/mine/index has definePageConfig.usingComponents
  text: '个人',
  iconPath: '../assets/images/tabbar/icon-tabbar-mine.png',
  selectedIconPath: '../assets/images/tabbar/icon-tabbar-mine-active.png'
}];

/**
 * 修正 tabbar selected
 * the path: 'pages/home/index' || '/pages/home/index'
*/
var adjustSelected = function adjustSelected(path) {
  var index = tabList.findIndex(function (i) {
    return i.pagePath === path || "/".concat(i.pagePath) === path;
  });
  if (index >= 0) {
    var tabbarStore = useTabBarStore();
    tabbarStore.setSelected(index);
  }
};

/***/ })

}]);
//# sourceMappingURL=common.js.map