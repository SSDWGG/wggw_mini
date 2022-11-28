"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["vendors"],{

/***/ "./node_modules/@vue/devtools-api/lib/esm/const.js":
/*!*********************************************************!*\
  !*** ./node_modules/@vue/devtools-api/lib/esm/const.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HOOK_SETUP": function() { return /* binding */ HOOK_SETUP; },
/* harmony export */   "HOOK_PLUGIN_SETTINGS_SET": function() { return /* binding */ HOOK_PLUGIN_SETTINGS_SET; }
/* harmony export */ });
const HOOK_SETUP = 'devtools-plugin:setup';
const HOOK_PLUGIN_SETTINGS_SET = 'plugin:settings:set';


/***/ }),

/***/ "./node_modules/@vue/devtools-api/lib/esm/env.js":
/*!*******************************************************!*\
  !*** ./node_modules/@vue/devtools-api/lib/esm/env.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDevtoolsGlobalHook": function() { return /* binding */ getDevtoolsGlobalHook; },
/* harmony export */   "getTarget": function() { return /* binding */ getTarget; },
/* harmony export */   "isProxyAvailable": function() { return /* binding */ isProxyAvailable; }
/* harmony export */ });
/* provided dependency */ var navigator = __webpack_require__(/*! @tarojs/runtime */ "webpack/container/remote/@tarojs/runtime")["navigator"];
/* provided dependency */ var window = __webpack_require__(/*! @tarojs/runtime */ "webpack/container/remote/@tarojs/runtime")["window"];
function getDevtoolsGlobalHook() {
    return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function getTarget() {
    // @ts-ignore
    return (typeof navigator !== 'undefined' && typeof window !== 'undefined')
        ? window
        : typeof __webpack_require__.g !== 'undefined'
            ? __webpack_require__.g
            : {};
}
const isProxyAvailable = typeof Proxy === 'function';


/***/ }),

/***/ "./node_modules/@vue/devtools-api/lib/esm/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/@vue/devtools-api/lib/esm/index.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setupDevtoolsPlugin": function() { return /* binding */ setupDevtoolsPlugin; }
/* harmony export */ });
/* harmony import */ var _env_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./env.js */ "./node_modules/@vue/devtools-api/lib/esm/env.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./const.js */ "./node_modules/@vue/devtools-api/lib/esm/const.js");
/* harmony import */ var _proxy_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./proxy.js */ "./node_modules/@vue/devtools-api/lib/esm/proxy.js");






function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    const descriptor = pluginDescriptor;
    const target = (0,_env_js__WEBPACK_IMPORTED_MODULE_0__.getTarget)();
    const hook = (0,_env_js__WEBPACK_IMPORTED_MODULE_0__.getDevtoolsGlobalHook)();
    const enableProxy = _env_js__WEBPACK_IMPORTED_MODULE_0__.isProxyAvailable && descriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
        hook.emit(_const_js__WEBPACK_IMPORTED_MODULE_1__.HOOK_SETUP, pluginDescriptor, setupFn);
    }
    else {
        const proxy = enableProxy ? new _proxy_js__WEBPACK_IMPORTED_MODULE_2__.ApiProxy(descriptor, hook) : null;
        const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
        list.push({
            pluginDescriptor: descriptor,
            setupFn,
            proxy,
        });
        if (proxy)
            setupFn(proxy.proxiedTarget);
    }
}


/***/ }),

/***/ "./node_modules/@vue/devtools-api/lib/esm/proxy.js":
/*!*********************************************************!*\
  !*** ./node_modules/@vue/devtools-api/lib/esm/proxy.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApiProxy": function() { return /* binding */ ApiProxy; }
/* harmony export */ });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./const.js */ "./node_modules/@vue/devtools-api/lib/esm/const.js");
/* harmony import */ var _time_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./time.js */ "./node_modules/@vue/devtools-api/lib/esm/time.js");


class ApiProxy {
    constructor(plugin, hook) {
        this.target = null;
        this.targetQueue = [];
        this.onQueue = [];
        this.plugin = plugin;
        this.hook = hook;
        const defaultSettings = {};
        if (plugin.settings) {
            for (const id in plugin.settings) {
                const item = plugin.settings[id];
                defaultSettings[id] = item.defaultValue;
            }
        }
        const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
        let currentSettings = Object.assign({}, defaultSettings);
        try {
            const raw = localStorage.getItem(localSettingsSaveId);
            const data = JSON.parse(raw);
            Object.assign(currentSettings, data);
        }
        catch (e) {
            // noop
        }
        this.fallbacks = {
            getSettings() {
                return currentSettings;
            },
            setSettings(value) {
                try {
                    localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
                }
                catch (e) {
                    // noop
                }
                currentSettings = value;
            },
            now() {
                return (0,_time_js__WEBPACK_IMPORTED_MODULE_0__.now)();
            },
        };
        if (hook) {
            hook.on(_const_js__WEBPACK_IMPORTED_MODULE_1__.HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
                if (pluginId === this.plugin.id) {
                    this.fallbacks.setSettings(value);
                }
            });
        }
        this.proxiedOn = new Proxy({}, {
            get: (_target, prop) => {
                if (this.target) {
                    return this.target.on[prop];
                }
                else {
                    return (...args) => {
                        this.onQueue.push({
                            method: prop,
                            args,
                        });
                    };
                }
            },
        });
        this.proxiedTarget = new Proxy({}, {
            get: (_target, prop) => {
                if (this.target) {
                    return this.target[prop];
                }
                else if (prop === 'on') {
                    return this.proxiedOn;
                }
                else if (Object.keys(this.fallbacks).includes(prop)) {
                    return (...args) => {
                        this.targetQueue.push({
                            method: prop,
                            args,
                            resolve: () => { },
                        });
                        return this.fallbacks[prop](...args);
                    };
                }
                else {
                    return (...args) => {
                        return new Promise(resolve => {
                            this.targetQueue.push({
                                method: prop,
                                args,
                                resolve,
                            });
                        });
                    };
                }
            },
        });
    }
    async setRealTarget(target) {
        this.target = target;
        for (const item of this.onQueue) {
            this.target.on[item.method](...item.args);
        }
        for (const item of this.targetQueue) {
            item.resolve(await this.target[item.method](...item.args));
        }
    }
}


/***/ }),

/***/ "./node_modules/@vue/devtools-api/lib/esm/time.js":
/*!********************************************************!*\
  !*** ./node_modules/@vue/devtools-api/lib/esm/time.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "now": function() { return /* binding */ now; }
/* harmony export */ });
/* unused harmony export isPerformanceSupported */
/* provided dependency */ var window = __webpack_require__(/*! @tarojs/runtime */ "webpack/container/remote/@tarojs/runtime")["window"];
let supported;
let perf;
function isPerformanceSupported() {
    var _a;
    if (supported !== undefined) {
        return supported;
    }
    if (typeof window !== 'undefined' && window.performance) {
        supported = true;
        perf = window.performance;
    }
    else if (typeof __webpack_require__.g !== 'undefined' && ((_a = __webpack_require__.g.perf_hooks) === null || _a === void 0 ? void 0 : _a.performance)) {
        supported = true;
        perf = __webpack_require__.g.perf_hooks.performance;
    }
    else {
        supported = false;
    }
    return supported;
}
function now() {
    return isPerformanceSupported() ? perf.now() : Date.now();
}


/***/ }),

/***/ "./node_modules/pinia/dist/pinia.mjs":
/*!*******************************************!*\
  !*** ./node_modules/pinia/dist/pinia.mjs ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPinia": function() { return /* binding */ createPinia; },
/* harmony export */   "defineStore": function() { return /* binding */ defineStore; }
/* harmony export */ });
/* unused harmony exports MutationType, PiniaVuePlugin, acceptHMRUpdate, getActivePinia, mapActions, mapGetters, mapState, mapStores, mapWritableState, setActivePinia, setMapStoreSuffix, skipHydrate, storeToRefs */
/* harmony import */ var _Users_renshuaiweidemac_Desktop_WGGW_mini_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var _Users_renshuaiweidemac_Desktop_WGGW_mini_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js */ "./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js");
/* harmony import */ var _Users_renshuaiweidemac_Desktop_WGGW_mini_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _Users_renshuaiweidemac_Desktop_WGGW_mini_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var vue_demi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-demi */ "./node_modules/vue-demi/lib/index.mjs");
/* harmony import */ var _vue_devtools_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @vue/devtools-api */ "./node_modules/@vue/devtools-api/lib/esm/index.js");
/* provided dependency */ var window = __webpack_require__(/*! @tarojs/runtime */ "webpack/container/remote/@tarojs/runtime")["window"];
/* provided dependency */ var document = __webpack_require__(/*! @tarojs/runtime */ "webpack/container/remote/@tarojs/runtime")["document"];
/* provided dependency */ var navigator = __webpack_require__(/*! @tarojs/runtime */ "webpack/container/remote/@tarojs/runtime")["navigator"];
/* provided dependency */ var HTMLAnchorElement = __webpack_require__(/*! ./node_modules/taro-plugin-pinia/dist/constructor.js */ "./node_modules/taro-plugin-pinia/dist/constructor.js")["HTMLAnchorElement"];




/*!
  * pinia v2.0.24
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */



/**
 * setActivePinia must be called to handle SSR at the top of functions like
 * `fetch`, `setup`, `serverPrefetch` and others
 */
var activePinia;
/**
 * Sets or unsets the active pinia. Used in SSR and internally when calling
 * actions and getters
 *
 * @param pinia - Pinia instance
 */
var setActivePinia = function setActivePinia(pinia) {
  return activePinia = pinia;
};
/**
 * Get the currently active pinia if there is any.
 */
var getActivePinia = function getActivePinia() {
  return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.getCurrentInstance)() && (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.inject)(piniaSymbol) || activePinia;
};
var piniaSymbol =  true ? Symbol('pinia') : /* istanbul ignore next */0;
function isPlainObject(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
o) {
  return o && (0,_Users_renshuaiweidemac_Desktop_WGGW_mini_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_1__["default"])(o) === 'object' && Object.prototype.toString.call(o) === '[object Object]' && typeof o.toJSON !== 'function';
}
// type DeepReadonly<T> = { readonly [P in keyof T]: DeepReadonly<T[P]> }
// TODO: can we change these to numbers?
/**
 * Possible types for SubscriptionCallback
 */
var MutationType;
(function (MutationType) {
  /**
   * Direct mutation of the state:
   *
   * - `store.name = 'new name'`
   * - `store.$state.name = 'new name'`
   * - `store.list.push('new item')`
   */
  MutationType["direct"] = "direct";
  /**
   * Mutated the state with `$patch` and an object
   *
   * - `store.$patch({ name: 'newName' })`
   */
  MutationType["patchObject"] = "patch object";
  /**
   * Mutated the state with `$patch` and a function
   *
   * - `store.$patch(state => state.name = 'newName')`
   */
  MutationType["patchFunction"] = "patch function";
  // maybe reset? for $state = {} and $reset
})(MutationType || (MutationType = {}));
var IS_CLIENT = typeof window !== 'undefined';
/**
 * Should we add the devtools plugins.
 * - only if dev mode or forced through the prod devtools flag
 * - not in test
 * - only if window exists (could change in the future)
 */
var USE_DEVTOOLS =  true && IS_CLIENT;

/*
 * FileSaver.js A saveAs() FileSaver implementation.
 *
 * Originally by Eli Grey, adapted as an ESM module by Eduardo San Martin
 * Morote.
 *
 * License : MIT
 */
// The one and only way of getting global scope in all environments
// https://stackoverflow.com/q/3277182/1008999
var _global = /*#__PURE__*/function () {
  return (typeof window === "undefined" ? "undefined" : (0,_Users_renshuaiweidemac_Desktop_WGGW_mini_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_1__["default"])(window)) === 'object' && window.window === window ? window : (typeof self === "undefined" ? "undefined" : (0,_Users_renshuaiweidemac_Desktop_WGGW_mini_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_1__["default"])(self)) === 'object' && self.self === self ? self : (typeof __webpack_require__.g === "undefined" ? "undefined" : (0,_Users_renshuaiweidemac_Desktop_WGGW_mini_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_1__["default"])(__webpack_require__.g)) === 'object' && __webpack_require__.g.global === __webpack_require__.g ? __webpack_require__.g : (typeof globalThis === "undefined" ? "undefined" : (0,_Users_renshuaiweidemac_Desktop_WGGW_mini_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_1__["default"])(globalThis)) === 'object' ? globalThis : {
    HTMLElement: null
  };
}();
function bom(blob) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref$autoBom = _ref.autoBom,
    autoBom = _ref$autoBom === void 0 ? false : _ref$autoBom;
  // prepend BOM for UTF-8 XML and text/* types (including HTML)
  // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
  if (autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
    return new Blob([String.fromCharCode(0xfeff), blob], {
      type: blob.type
    });
  }
  return blob;
}
function download(url, name, opts) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.onload = function () {
    saveAs(xhr.response, name, opts);
  };
  xhr.onerror = function () {
    console.error('could not download file');
  };
  xhr.send();
}
function corsEnabled(url) {
  var xhr = new XMLHttpRequest();
  // use sync to avoid popup blocker
  xhr.open('HEAD', url, false);
  try {
    xhr.send();
  } catch (e) {}
  return xhr.status >= 200 && xhr.status <= 299;
}
// `a.click()` doesn't work for all browsers (#465)
function click(node) {
  try {
    node.dispatchEvent(new MouseEvent('click'));
  } catch (e) {
    var evt = document.createEvent('MouseEvents');
    evt.initMouseEvent('click', true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
    node.dispatchEvent(evt);
  }
}
var _navigator = (typeof navigator === "undefined" ? "undefined" : (0,_Users_renshuaiweidemac_Desktop_WGGW_mini_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_1__["default"])(navigator)) === 'object' ? navigator : {
  userAgent: ''
};
// Detect WebView inside a native macOS app by ruling out all browsers
// We just need to check for 'Safari' because all other browsers (besides Firefox) include that too
// https://www.whatismybrowser.com/guides/the-latest-user-agent/macos
var isMacOSWebView = /*#__PURE__*/function () {
  return /Macintosh/.test(_navigator.userAgent) && /AppleWebKit/.test(_navigator.userAgent) && !/Safari/.test(_navigator.userAgent);
}();
var saveAs = !IS_CLIENT ? function () {} // noop
:
// Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
typeof HTMLAnchorElement !== 'undefined' && 'download' in HTMLAnchorElement.prototype && !isMacOSWebView ? downloadSaveAs :
// Use msSaveOrOpenBlob as a second approach
'msSaveOrOpenBlob' in _navigator ? msSaveAs :
// Fallback to using FileReader and a popup
fileSaverSaveAs;
function downloadSaveAs(blob) {
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'download';
  var opts = arguments.length > 2 ? arguments[2] : undefined;
  var a = document.createElement('a');
  a.download = name;
  a.rel = 'noopener'; // tabnabbing
  // TODO: detect chrome extensions & packaged apps
  // a.target = '_blank'
  if (typeof blob === 'string') {
    // Support regular links
    a.href = blob;
    if (a.origin !== location.origin) {
      if (corsEnabled(a.href)) {
        download(blob, name, opts);
      } else {
        a.target = '_blank';
        click(a);
      }
    } else {
      click(a);
    }
  } else {
    // Support blobs
    a.href = URL.createObjectURL(blob);
    setTimeout(function () {
      URL.revokeObjectURL(a.href);
    }, 4e4); // 40s
    setTimeout(function () {
      click(a);
    }, 0);
  }
}
function msSaveAs(blob) {
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'download';
  var opts = arguments.length > 2 ? arguments[2] : undefined;
  if (typeof blob === 'string') {
    if (corsEnabled(blob)) {
      download(blob, name, opts);
    } else {
      var a = document.createElement('a');
      a.href = blob;
      a.target = '_blank';
      setTimeout(function () {
        click(a);
      });
    }
  } else {
    // @ts-ignore: works on windows
    navigator.msSaveOrOpenBlob(bom(blob, opts), name);
  }
}
function fileSaverSaveAs(blob, name, opts, popup) {
  // Open a popup immediately do go around popup blocker
  // Mostly only available on user interaction and the fileReader is async so...
  popup = popup || open('', '_blank');
  if (popup) {
    popup.document.title = popup.document.body.innerText = 'downloading...';
  }
  if (typeof blob === 'string') return download(blob, name, opts);
  var force = blob.type === 'application/octet-stream';
  var isSafari = /constructor/i.test(String(_global.HTMLElement)) || 'safari' in _global;
  var isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((isChromeIOS || force && isSafari || isMacOSWebView) && typeof FileReader !== 'undefined') {
    // Safari doesn't allow downloading of blob URLs
    var reader = new FileReader();
    reader.onloadend = function () {
      var url = reader.result;
      if (typeof url !== 'string') {
        popup = null;
        throw new Error('Wrong reader.result type');
      }
      url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, 'data:attachment/file;');
      if (popup) {
        popup.location.href = url;
      } else {
        location.assign(url);
      }
      popup = null; // reverse-tabnabbing #460
    };

    reader.readAsDataURL(blob);
  } else {
    var url = URL.createObjectURL(blob);
    if (popup) popup.location.assign(url);else location.href = url;
    popup = null; // reverse-tabnabbing #460
    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 4e4); // 40s
  }
}

/**
 * Shows a toast or console.log
 *
 * @param message - message to log
 * @param type - different color of the tooltip
 */
function toastMessage(message, type) {
  var piniaMessage = '🍍 ' + message;
  if (typeof __VUE_DEVTOOLS_TOAST__ === 'function') {
    __VUE_DEVTOOLS_TOAST__(piniaMessage, type);
  } else if (type === 'error') {
    console.error(piniaMessage);
  } else if (type === 'warn') {
    console.warn(piniaMessage);
  } else {
    console.log(piniaMessage);
  }
}
function isPinia(o) {
  return '_a' in o && 'install' in o;
}
function checkClipboardAccess() {
  if (!('clipboard' in navigator)) {
    toastMessage("Your browser doesn't support the Clipboard API", 'error');
    return true;
  }
}
function checkNotFocusedError(error) {
  if (error instanceof Error && error.message.toLowerCase().includes('document is not focused')) {
    toastMessage('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', 'warn');
    return true;
  }
  return false;
}
function actionGlobalCopyState(_x) {
  return _actionGlobalCopyState.apply(this, arguments);
}
function _actionGlobalCopyState() {
  _actionGlobalCopyState = (0,_Users_renshuaiweidemac_Desktop_WGGW_mini_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/(0,_Users_renshuaiweidemac_Desktop_WGGW_mini_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_3__["default"])().mark(function _callee4(pinia) {
    return (0,_Users_renshuaiweidemac_Desktop_WGGW_mini_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_3__["default"])().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!checkClipboardAccess()) {
              _context4.next = 2;
              break;
            }
            return _context4.abrupt("return");
          case 2:
            _context4.prev = 2;
            _context4.next = 5;
            return navigator.clipboard.writeText(JSON.stringify(pinia.state.value));
          case 5:
            toastMessage('Global state copied to clipboard.');
            _context4.next = 14;
            break;
          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](2);
            if (!checkNotFocusedError(_context4.t0)) {
              _context4.next = 12;
              break;
            }
            return _context4.abrupt("return");
          case 12:
            toastMessage("Failed to serialize the state. Check the console for more details.", 'error');
            console.error(_context4.t0);
          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 8]]);
  }));
  return _actionGlobalCopyState.apply(this, arguments);
}
function actionGlobalPasteState(_x2) {
  return _actionGlobalPasteState.apply(this, arguments);
}
function _actionGlobalPasteState() {
  _actionGlobalPasteState = (0,_Users_renshuaiweidemac_Desktop_WGGW_mini_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/(0,_Users_renshuaiweidemac_Desktop_WGGW_mini_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_3__["default"])().mark(function _callee5(pinia) {
    return (0,_Users_renshuaiweidemac_Desktop_WGGW_mini_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_3__["default"])().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (!checkClipboardAccess()) {
              _context5.next = 2;
              break;
            }
            return _context5.abrupt("return");
          case 2:
            _context5.prev = 2;
            _context5.t0 = JSON;
            _context5.next = 6;
            return navigator.clipboard.readText();
          case 6:
            _context5.t1 = _context5.sent;
            pinia.state.value = _context5.t0.parse.call(_context5.t0, _context5.t1);
            toastMessage('Global state pasted from clipboard.');
            _context5.next = 17;
            break;
          case 11:
            _context5.prev = 11;
            _context5.t2 = _context5["catch"](2);
            if (!checkNotFocusedError(_context5.t2)) {
              _context5.next = 15;
              break;
            }
            return _context5.abrupt("return");
          case 15:
            toastMessage("Failed to deserialize the state from clipboard. Check the console for more details.", 'error');
            console.error(_context5.t2);
          case 17:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[2, 11]]);
  }));
  return _actionGlobalPasteState.apply(this, arguments);
}
function actionGlobalSaveState(_x3) {
  return _actionGlobalSaveState.apply(this, arguments);
}
function _actionGlobalSaveState() {
  _actionGlobalSaveState = (0,_Users_renshuaiweidemac_Desktop_WGGW_mini_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/(0,_Users_renshuaiweidemac_Desktop_WGGW_mini_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_3__["default"])().mark(function _callee6(pinia) {
    return (0,_Users_renshuaiweidemac_Desktop_WGGW_mini_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_3__["default"])().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            try {
              saveAs(new Blob([JSON.stringify(pinia.state.value)], {
                type: 'text/plain;charset=utf-8'
              }), 'pinia-state.json');
            } catch (error) {
              toastMessage("Failed to export the state as JSON. Check the console for more details.", 'error');
              console.error(error);
            }
          case 1:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _actionGlobalSaveState.apply(this, arguments);
}
var fileInput;
function getFileOpener() {
  if (!fileInput) {
    fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
  }
  function openFile() {
    return new Promise(function (resolve, reject) {
      fileInput.onchange = /*#__PURE__*/(0,_Users_renshuaiweidemac_Desktop_WGGW_mini_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/(0,_Users_renshuaiweidemac_Desktop_WGGW_mini_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_3__["default"])().mark(function _callee() {
        var files, file;
        return (0,_Users_renshuaiweidemac_Desktop_WGGW_mini_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_3__["default"])().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                files = fileInput.files;
                if (files) {
                  _context.next = 3;
                  break;
                }
                return _context.abrupt("return", resolve(null));
              case 3:
                file = files.item(0);
                if (file) {
                  _context.next = 6;
                  break;
                }
                return _context.abrupt("return", resolve(null));
              case 6:
                _context.t0 = resolve;
                _context.next = 9;
                return file.text();
              case 9:
                _context.t1 = _context.sent;
                _context.t2 = file;
                _context.t3 = {
                  text: _context.t1,
                  file: _context.t2
                };
                return _context.abrupt("return", (0, _context.t0)(_context.t3));
              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      // @ts-ignore: TODO: changed from 4.3 to 4.4
      fileInput.oncancel = function () {
        return resolve(null);
      };
      fileInput.onerror = reject;
      fileInput.click();
    });
  }
  return openFile;
}
function actionGlobalOpenStateFile(_x4) {
  return _actionGlobalOpenStateFile.apply(this, arguments);
}
function _actionGlobalOpenStateFile() {
  _actionGlobalOpenStateFile = (0,_Users_renshuaiweidemac_Desktop_WGGW_mini_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/(0,_Users_renshuaiweidemac_Desktop_WGGW_mini_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_3__["default"])().mark(function _callee7(pinia) {
    var _open, result, text, file;
    return (0,_Users_renshuaiweidemac_Desktop_WGGW_mini_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_3__["default"])().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return getFileOpener();
          case 3:
            _open = _context7.sent;
            _context7.next = 6;
            return _open();
          case 6:
            result = _context7.sent;
            if (result) {
              _context7.next = 9;
              break;
            }
            return _context7.abrupt("return");
          case 9:
            text = result.text, file = result.file;
            pinia.state.value = JSON.parse(text);
            toastMessage("Global state imported from \"".concat(file.name, "\"."));
            _context7.next = 18;
            break;
          case 14:
            _context7.prev = 14;
            _context7.t0 = _context7["catch"](0);
            toastMessage("Failed to export the state as JSON. Check the console for more details.", 'error');
            console.error(_context7.t0);
          case 18:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 14]]);
  }));
  return _actionGlobalOpenStateFile.apply(this, arguments);
}
function formatDisplay(display) {
  return {
    _custom: {
      display: display
    }
  };
}
var PINIA_ROOT_LABEL = '🍍 Pinia (root)';
var PINIA_ROOT_ID = '_root';
function formatStoreForInspectorTree(store) {
  return isPinia(store) ? {
    id: PINIA_ROOT_ID,
    label: PINIA_ROOT_LABEL
  } : {
    id: store.$id,
    label: store.$id
  };
}
function formatStoreForInspectorState(store) {
  if (isPinia(store)) {
    var storeNames = Array.from(store._s.keys());
    var storeMap = store._s;
    var _state = {
      state: storeNames.map(function (storeId) {
        return {
          editable: true,
          key: storeId,
          value: store.state.value[storeId]
        };
      }),
      getters: storeNames.filter(function (id) {
        return storeMap.get(id)._getters;
      }).map(function (id) {
        var store = storeMap.get(id);
        return {
          editable: false,
          key: id,
          value: store._getters.reduce(function (getters, key) {
            getters[key] = store[key];
            return getters;
          }, {})
        };
      })
    };
    return _state;
  }
  var state = {
    state: Object.keys(store.$state).map(function (key) {
      return {
        editable: true,
        key: key,
        value: store.$state[key]
      };
    })
  };
  // avoid adding empty getters
  if (store._getters && store._getters.length) {
    state.getters = store._getters.map(function (getterName) {
      return {
        editable: false,
        key: getterName,
        value: store[getterName]
      };
    });
  }
  if (store._customProperties.size) {
    state.customProperties = Array.from(store._customProperties).map(function (key) {
      return {
        editable: true,
        key: key,
        value: store[key]
      };
    });
  }
  return state;
}
function formatEventData(events) {
  if (!events) return {};
  if (Array.isArray(events)) {
    // TODO: handle add and delete for arrays and objects
    return events.reduce(function (data, event) {
      data.keys.push(event.key);
      data.operations.push(event.type);
      data.oldValue[event.key] = event.oldValue;
      data.newValue[event.key] = event.newValue;
      return data;
    }, {
      oldValue: {},
      keys: [],
      operations: [],
      newValue: {}
    });
  } else {
    return {
      operation: formatDisplay(events.type),
      key: formatDisplay(events.key),
      oldValue: events.oldValue,
      newValue: events.newValue
    };
  }
}
function formatMutationType(type) {
  switch (type) {
    case MutationType.direct:
      return 'mutation';
    case MutationType.patchFunction:
      return '$patch';
    case MutationType.patchObject:
      return '$patch';
    default:
      return 'unknown';
  }
}

// timeline can be paused when directly changing the state
var isTimelineActive = true;
var componentStateTypes = [];
var MUTATIONS_LAYER_ID = 'pinia:mutations';
var INSPECTOR_ID = 'pinia';
/**
 * Gets the displayed name of a store in devtools
 *
 * @param id - id of the store
 * @returns a formatted string
 */
var getStoreType = function getStoreType(id) {
  return '🍍 ' + id;
};
/**
 * Add the pinia plugin without any store. Allows displaying a Pinia plugin tab
 * as soon as it is added to the application.
 *
 * @param app - Vue application
 * @param pinia - pinia instance
 */
function registerPiniaDevtools(app, pinia) {
  (0,_vue_devtools_api__WEBPACK_IMPORTED_MODULE_4__.setupDevtoolsPlugin)({
    id: 'dev.esm.pinia',
    label: 'Pinia 🍍',
    logo: 'https://pinia.vuejs.org/logo.svg',
    packageName: 'pinia',
    homepage: 'https://pinia.vuejs.org',
    componentStateTypes: componentStateTypes,
    app: app
  }, function (api) {
    if (typeof api.now !== 'function') {
      toastMessage('You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.');
    }
    api.addTimelineLayer({
      id: MUTATIONS_LAYER_ID,
      label: "Pinia \uD83C\uDF4D",
      color: 0xe5df88
    });
    api.addInspector({
      id: INSPECTOR_ID,
      label: 'Pinia 🍍',
      icon: 'storage',
      treeFilterPlaceholder: 'Search stores',
      actions: [{
        icon: 'content_copy',
        action: function action() {
          actionGlobalCopyState(pinia);
        },
        tooltip: 'Serialize and copy the state'
      }, {
        icon: 'content_paste',
        action: function () {
          var _action = (0,_Users_renshuaiweidemac_Desktop_WGGW_mini_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/(0,_Users_renshuaiweidemac_Desktop_WGGW_mini_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_3__["default"])().mark(function _callee2() {
            return (0,_Users_renshuaiweidemac_Desktop_WGGW_mini_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_3__["default"])().wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return actionGlobalPasteState(pinia);
                  case 2:
                    api.sendInspectorTree(INSPECTOR_ID);
                    api.sendInspectorState(INSPECTOR_ID);
                  case 4:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));
          function action() {
            return _action.apply(this, arguments);
          }
          return action;
        }(),
        tooltip: 'Replace the state with the content of your clipboard'
      }, {
        icon: 'save',
        action: function action() {
          actionGlobalSaveState(pinia);
        },
        tooltip: 'Save the state as a JSON file'
      }, {
        icon: 'folder_open',
        action: function () {
          var _action2 = (0,_Users_renshuaiweidemac_Desktop_WGGW_mini_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/(0,_Users_renshuaiweidemac_Desktop_WGGW_mini_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_3__["default"])().mark(function _callee3() {
            return (0,_Users_renshuaiweidemac_Desktop_WGGW_mini_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_3__["default"])().wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.next = 2;
                    return actionGlobalOpenStateFile(pinia);
                  case 2:
                    api.sendInspectorTree(INSPECTOR_ID);
                    api.sendInspectorState(INSPECTOR_ID);
                  case 4:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          }));
          function action() {
            return _action2.apply(this, arguments);
          }
          return action;
        }(),
        tooltip: 'Import the state from a JSON file'
      }],
      nodeActions: [{
        icon: 'restore',
        tooltip: 'Reset the state (option store only)',
        action: function action(nodeId) {
          var store = pinia._s.get(nodeId);
          if (!store) {
            toastMessage("Cannot reset \"".concat(nodeId, "\" store because it wasn't found."), 'warn');
          } else if (!store._isOptionsAPI) {
            toastMessage("Cannot reset \"".concat(nodeId, "\" store because it's a setup store."), 'warn');
          } else {
            store.$reset();
            toastMessage("Store \"".concat(nodeId, "\" reset."));
          }
        }
      }]
    });
    api.on.inspectComponent(function (payload, ctx) {
      var proxy = payload.componentInstance && payload.componentInstance.proxy;
      if (proxy && proxy._pStores) {
        var piniaStores = payload.componentInstance.proxy._pStores;
        Object.values(piniaStores).forEach(function (store) {
          payload.instanceData.state.push({
            type: getStoreType(store.$id),
            key: 'state',
            editable: true,
            value: store._isOptionsAPI ? {
              _custom: {
                value: (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.toRaw)(store.$state),
                actions: [{
                  icon: 'restore',
                  tooltip: 'Reset the state of this store',
                  action: function action() {
                    return store.$reset();
                  }
                }]
              }
            } :
            // NOTE: workaround to unwrap transferred refs
            Object.keys(store.$state).reduce(function (state, key) {
              state[key] = store.$state[key];
              return state;
            }, {})
          });
          if (store._getters && store._getters.length) {
            payload.instanceData.state.push({
              type: getStoreType(store.$id),
              key: 'getters',
              editable: false,
              value: store._getters.reduce(function (getters, key) {
                try {
                  getters[key] = store[key];
                } catch (error) {
                  // @ts-expect-error: we just want to show it in devtools
                  getters[key] = error;
                }
                return getters;
              }, {})
            });
          }
        });
      }
    });
    api.on.getInspectorTree(function (payload) {
      if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
        var stores = [pinia];
        stores = stores.concat(Array.from(pinia._s.values()));
        payload.rootNodes = (payload.filter ? stores.filter(function (store) {
          return '$id' in store ? store.$id.toLowerCase().includes(payload.filter.toLowerCase()) : PINIA_ROOT_LABEL.toLowerCase().includes(payload.filter.toLowerCase());
        }) : stores).map(formatStoreForInspectorTree);
      }
    });
    api.on.getInspectorState(function (payload) {
      if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
        var inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
        if (!inspectedStore) {
          // this could be the selected store restored for a different project
          // so it's better not to say anything here
          return;
        }
        if (inspectedStore) {
          payload.state = formatStoreForInspectorState(inspectedStore);
        }
      }
    });
    api.on.editInspectorState(function (payload, ctx) {
      if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
        var inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
        if (!inspectedStore) {
          return toastMessage("store \"".concat(payload.nodeId, "\" not found"), 'error');
        }
        var path = payload.path;
        if (!isPinia(inspectedStore)) {
          // access only the state
          if (path.length !== 1 || !inspectedStore._customProperties.has(path[0]) || path[0] in inspectedStore.$state) {
            path.unshift('$state');
          }
        } else {
          // Root access, we can omit the `.value` because the devtools API does it for us
          path.unshift('state');
        }
        isTimelineActive = false;
        payload.set(inspectedStore, path, payload.state.value);
        isTimelineActive = true;
      }
    });
    api.on.editComponentState(function (payload) {
      if (payload.type.startsWith('🍍')) {
        var storeId = payload.type.replace(/^🍍\s*/, '');
        var store = pinia._s.get(storeId);
        if (!store) {
          return toastMessage("store \"".concat(storeId, "\" not found"), 'error');
        }
        var path = payload.path;
        if (path[0] !== 'state') {
          return toastMessage("Invalid path for store \"".concat(storeId, "\":\n").concat(path, "\nOnly state can be modified."));
        }
        // rewrite the first entry to be able to directly set the state as
        // well as any other path
        path[0] = '$state';
        isTimelineActive = false;
        payload.set(store, path, payload.state.value);
        isTimelineActive = true;
      }
    });
  });
}
function addStoreToDevtools(app, store) {
  if (!componentStateTypes.includes(getStoreType(store.$id))) {
    componentStateTypes.push(getStoreType(store.$id));
  }
  (0,_vue_devtools_api__WEBPACK_IMPORTED_MODULE_4__.setupDevtoolsPlugin)({
    id: 'dev.esm.pinia',
    label: 'Pinia 🍍',
    logo: 'https://pinia.vuejs.org/logo.svg',
    packageName: 'pinia',
    homepage: 'https://pinia.vuejs.org',
    componentStateTypes: componentStateTypes,
    app: app,
    settings: {
      logStoreChanges: {
        label: 'Notify about new/deleted stores',
        type: 'boolean',
        defaultValue: true
      }
      // useEmojis: {
      //   label: 'Use emojis in messages ⚡️',
      //   type: 'boolean',
      //   defaultValue: true,
      // },
    }
  }, function (api) {
    // gracefully handle errors
    var now = typeof api.now === 'function' ? api.now.bind(api) : Date.now;
    store.$onAction(function (_ref3) {
      var after = _ref3.after,
        onError = _ref3.onError,
        name = _ref3.name,
        args = _ref3.args;
      var groupId = runningActionId++;
      api.addTimelineEvent({
        layerId: MUTATIONS_LAYER_ID,
        event: {
          time: now(),
          title: '🛫 ' + name,
          subtitle: 'start',
          data: {
            store: formatDisplay(store.$id),
            action: formatDisplay(name),
            args: args
          },
          groupId: groupId
        }
      });
      after(function (result) {
        activeAction = undefined;
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now(),
            title: '🛬 ' + name,
            subtitle: 'end',
            data: {
              store: formatDisplay(store.$id),
              action: formatDisplay(name),
              args: args,
              result: result
            },
            groupId: groupId
          }
        });
      });
      onError(function (error) {
        activeAction = undefined;
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now(),
            logType: 'error',
            title: '💥 ' + name,
            subtitle: 'end',
            data: {
              store: formatDisplay(store.$id),
              action: formatDisplay(name),
              args: args,
              error: error
            },
            groupId: groupId
          }
        });
      });
    }, true);
    store._customProperties.forEach(function (name) {
      (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.watch)(function () {
        return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.unref)(store[name]);
      }, function (newValue, oldValue) {
        api.notifyComponentUpdate();
        api.sendInspectorState(INSPECTOR_ID);
        if (isTimelineActive) {
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now(),
              title: 'Change',
              subtitle: name,
              data: {
                newValue: newValue,
                oldValue: oldValue
              },
              groupId: activeAction
            }
          });
        }
      }, {
        deep: true
      });
    });
    store.$subscribe(function (_ref4, state) {
      var events = _ref4.events,
        type = _ref4.type;
      api.notifyComponentUpdate();
      api.sendInspectorState(INSPECTOR_ID);
      if (!isTimelineActive) return;
      // rootStore.state[store.id] = state
      var eventData = {
        time: now(),
        title: formatMutationType(type),
        data: (0,_Users_renshuaiweidemac_Desktop_WGGW_mini_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_5__["default"])({
          store: formatDisplay(store.$id)
        }, formatEventData(events)),
        groupId: activeAction
      };
      // reset for the next mutation
      activeAction = undefined;
      if (type === MutationType.patchFunction) {
        eventData.subtitle = '⤵️';
      } else if (type === MutationType.patchObject) {
        eventData.subtitle = '🧩';
      } else if (events && !Array.isArray(events)) {
        eventData.subtitle = events.type;
      }
      if (events) {
        eventData.data['rawEvent(s)'] = {
          _custom: {
            display: 'DebuggerEvent',
            type: 'object',
            tooltip: 'raw DebuggerEvent[]',
            value: events
          }
        };
      }
      api.addTimelineEvent({
        layerId: MUTATIONS_LAYER_ID,
        event: eventData
      });
    }, {
      detached: true,
      flush: 'sync'
    });
    var hotUpdate = store._hotUpdate;
    store._hotUpdate = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.markRaw)(function (newStore) {
      hotUpdate(newStore);
      api.addTimelineEvent({
        layerId: MUTATIONS_LAYER_ID,
        event: {
          time: now(),
          title: '🔥 ' + store.$id,
          subtitle: 'HMR update',
          data: {
            store: formatDisplay(store.$id),
            info: formatDisplay("HMR update")
          }
        }
      });
      // update the devtools too
      api.notifyComponentUpdate();
      api.sendInspectorTree(INSPECTOR_ID);
      api.sendInspectorState(INSPECTOR_ID);
    });
    var $dispose = store.$dispose;
    store.$dispose = function () {
      $dispose();
      api.notifyComponentUpdate();
      api.sendInspectorTree(INSPECTOR_ID);
      api.sendInspectorState(INSPECTOR_ID);
      api.getSettings().logStoreChanges && toastMessage("Disposed \"".concat(store.$id, "\" store \uD83D\uDDD1"));
    };
    // trigger an update so it can display new registered stores
    api.notifyComponentUpdate();
    api.sendInspectorTree(INSPECTOR_ID);
    api.sendInspectorState(INSPECTOR_ID);
    api.getSettings().logStoreChanges && toastMessage("\"".concat(store.$id, "\" store installed \uD83C\uDD95"));
  });
}
var runningActionId = 0;
var activeAction;
/**
 * Patches a store to enable action grouping in devtools by wrapping the store with a Proxy that is passed as the
 * context of all actions, allowing us to set `runningAction` on each access and effectively associating any state
 * mutation to the action.
 *
 * @param store - store to patch
 * @param actionNames - list of actionst to patch
 */
function patchActionForGrouping(store, actionNames) {
  // original actions of the store as they are given by pinia. We are going to override them
  var actions = actionNames.reduce(function (storeActions, actionName) {
    // use toRaw to avoid tracking #541
    storeActions[actionName] = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.toRaw)(store)[actionName];
    return storeActions;
  }, {});
  var _loop = function _loop(actionName) {
    store[actionName] = function () {
      // setActivePinia(store._p)
      // the running action id is incremented in a before action hook
      var _actionId = runningActionId;
      var trackedStore = new Proxy(store, {
        get: function get() {
          activeAction = _actionId;
          return Reflect.get.apply(Reflect, arguments);
        },
        set: function set() {
          activeAction = _actionId;
          return Reflect.set.apply(Reflect, arguments);
        }
      });
      return actions[actionName].apply(trackedStore, arguments);
    };
  };
  for (var actionName in actions) {
    _loop(actionName);
  }
}
/**
 * pinia.use(devtoolsPlugin)
 */
function devtoolsPlugin(_ref5) {
  var app = _ref5.app,
    store = _ref5.store,
    options = _ref5.options;
  // HMR module
  if (store.$id.startsWith('__hot:')) {
    return;
  }
  // detect option api vs setup api
  if (options.state) {
    store._isOptionsAPI = true;
  }
  // only wrap actions in option-defined stores as this technique relies on
  // wrapping the context of the action with a proxy
  if (typeof options.state === 'function') {
    patchActionForGrouping(
    // @ts-expect-error: can cast the store...
    store, Object.keys(options.actions));
    var originalHotUpdate = store._hotUpdate;
    // Upgrade the HMR to also update the new actions
    (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.toRaw)(store)._hotUpdate = function (newStore) {
      originalHotUpdate.apply(this, arguments);
      patchActionForGrouping(store, Object.keys(newStore._hmrPayload.actions));
    };
  }
  addStoreToDevtools(app,
  // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
  store);
}

/**
 * Creates a Pinia instance to be used by the application
 */
function createPinia() {
  var scope = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.effectScope)(true);
  // NOTE: here we could check the window object for a state and directly set it
  // if there is anything like it with Vue 3 SSR
  var state = scope.run(function () {
    return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.ref)({});
  });
  var _p = [];
  // plugins added before calling app.use(pinia)
  var toBeInstalled = [];
  var pinia = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.markRaw)({
    install: function install(app) {
      // this allows calling useStore() outside of a component setup after
      // installing pinia's plugin
      setActivePinia(pinia);
      if (!vue_demi__WEBPACK_IMPORTED_MODULE_0__.isVue2) {
        pinia._a = app;
        app.provide(piniaSymbol, pinia);
        app.config.globalProperties.$pinia = pinia;
        /* istanbul ignore else */
        if (USE_DEVTOOLS) {
          registerPiniaDevtools(app, pinia);
        }
        toBeInstalled.forEach(function (plugin) {
          return _p.push(plugin);
        });
        toBeInstalled = [];
      }
    },
    use: function use(plugin) {
      if (!this._a && !vue_demi__WEBPACK_IMPORTED_MODULE_0__.isVue2) {
        toBeInstalled.push(plugin);
      } else {
        _p.push(plugin);
      }
      return this;
    },
    _p: _p,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: scope,
    _s: new Map(),
    state: state
  });
  // pinia devtools rely on dev only features so they cannot be forced unless
  // the dev build of Vue is used. Avoid old browsers like IE11.
  if (USE_DEVTOOLS && typeof Proxy !== 'undefined') {
    pinia.use(devtoolsPlugin);
  }
  return pinia;
}

/**
 * Checks if a function is a `StoreDefinition`.
 *
 * @param fn - object to test
 * @returns true if `fn` is a StoreDefinition
 */
var isUseStore = function isUseStore(fn) {
  return typeof fn === 'function' && typeof fn.$id === 'string';
};
/**
 * Mutates in place `newState` with `oldState` to _hot update_ it. It will
 * remove any key not existing in `newState` and recursively merge plain
 * objects.
 *
 * @param newState - new state object to be patched
 * @param oldState - old state that should be used to patch newState
 * @returns - newState
 */
function patchObject(newState, oldState) {
  // no need to go through symbols because they cannot be serialized anyway
  for (var key in oldState) {
    var subPatch = oldState[key];
    // skip the whole sub tree
    if (!(key in newState)) {
      continue;
    }
    var targetValue = newState[key];
    if (isPlainObject(targetValue) && isPlainObject(subPatch) && !(0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.isRef)(subPatch) && !(0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.isReactive)(subPatch)) {
      newState[key] = patchObject(targetValue, subPatch);
    } else {
      // objects are either a bit more complex (e.g. refs) or primitives, so we
      // just set the whole thing
      if (vue_demi__WEBPACK_IMPORTED_MODULE_0__.isVue2) {
        (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.set)(newState, key, subPatch);
      } else {
        newState[key] = subPatch;
      }
    }
  }
  return newState;
}
/**
 * Creates an _accept_ function to pass to `import.meta.hot` in Vite applications.
 *
 * @example
 * ```js
 * const useUser = defineStore(...)
 * if (import.meta.hot) {
 *   import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot))
 * }
 * ```
 *
 * @param initialUseStore - return of the defineStore to hot update
 * @param hot - `import.meta.hot`
 */
function acceptHMRUpdate(initialUseStore, hot) {
  // strip as much as possible from iife.prod
  if (false) {}
  return function (newModule) {
    var pinia = hot.data.pinia || initialUseStore._pinia;
    if (!pinia) {
      // this store is still not used
      return;
    }
    // preserve the pinia instance across loads
    hot.data.pinia = pinia;
    // console.log('got data', newStore)
    for (var exportName in newModule) {
      var useStore = newModule[exportName];
      // console.log('checking for', exportName)
      if (isUseStore(useStore) && pinia._s.has(useStore.$id)) {
        // console.log('Accepting update for', useStore.$id)
        var id = useStore.$id;
        if (id !== initialUseStore.$id) {
          console.warn("The id of the store changed from \"".concat(initialUseStore.$id, "\" to \"").concat(id, "\". Reloading."));
          // return import.meta.hot.invalidate()
          return hot.invalidate();
        }
        var existingStore = pinia._s.get(id);
        if (!existingStore) {
          console.log("[Pinia]: skipping hmr because store doesn't exist yet");
          return;
        }
        useStore(pinia, existingStore);
      }
    }
  };
}
var noop = function noop() {};
function addSubscription(subscriptions, callback, detached) {
  var onCleanup = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : noop;
  subscriptions.push(callback);
  var removeSubscription = function removeSubscription() {
    var idx = subscriptions.indexOf(callback);
    if (idx > -1) {
      subscriptions.splice(idx, 1);
      onCleanup();
    }
  };
  if (!detached && (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.getCurrentScope)()) {
    (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.onScopeDispose)(removeSubscription);
  }
  return removeSubscription;
}
function triggerSubscriptions(subscriptions) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  subscriptions.slice().forEach(function (callback) {
    callback.apply(void 0, args);
  });
}
function mergeReactiveObjects(target, patchToApply) {
  // Handle Map instances
  if (target instanceof Map && patchToApply instanceof Map) {
    patchToApply.forEach(function (value, key) {
      return target.set(key, value);
    });
  }
  // Handle Set instances
  if (target instanceof Set && patchToApply instanceof Set) {
    patchToApply.forEach(target.add, target);
  }
  // no need to go through symbols because they cannot be serialized anyway
  for (var key in patchToApply) {
    if (!patchToApply.hasOwnProperty(key)) continue;
    var subPatch = patchToApply[key];
    var targetValue = target[key];
    if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !(0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.isRef)(subPatch) && !(0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.isReactive)(subPatch)) {
      // NOTE: here I wanted to warn about inconsistent types but it's not possible because in setup stores one might
      // start the value of a property as a certain type e.g. a Map, and then for some reason, during SSR, change that
      // to `undefined`. When trying to hydrate, we want to override the Map with `undefined`.
      target[key] = mergeReactiveObjects(targetValue, subPatch);
    } else {
      // @ts-expect-error: subPatch is a valid value
      target[key] = subPatch;
    }
  }
  return target;
}
var skipHydrateSymbol =  true ? Symbol('pinia:skipHydration') : /* istanbul ignore next */0;
var skipHydrateMap = /*#__PURE__*/new WeakMap();
/**
 * Tells Pinia to skip the hydration process of a given object. This is useful in setup stores (only) when you return a
 * stateful object in the store but it isn't really state. e.g. returning a router instance in a setup store.
 *
 * @param obj - target object
 * @returns obj
 */
function skipHydrate(obj) {
  return vue_demi__WEBPACK_IMPORTED_MODULE_0__.isVue2 ?
  // in @vue/composition-api, the refs are sealed so defineProperty doesn't work...
  /* istanbul ignore next */
  skipHydrateMap.set(obj, 1) && obj : Object.defineProperty(obj, skipHydrateSymbol, {});
}
/**
 * Returns whether a value should be hydrated
 *
 * @param obj - target variable
 * @returns true if `obj` should be hydrated
 */
function shouldHydrate(obj) {
  return vue_demi__WEBPACK_IMPORTED_MODULE_0__.isVue2 ? /* istanbul ignore next */!skipHydrateMap.has(obj) : !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
}
var assign = Object.assign;
function isComputed(o) {
  return !!((0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.isRef)(o) && o.effect);
}
function createOptionsStore(id, options, pinia, hot) {
  var state = options.state,
    actions = options.actions,
    getters = options.getters;
  var initialState = pinia.state.value[id];
  var store;
  function setup() {
    if (!initialState && ( false || !hot)) {
      /* istanbul ignore if */
      if (vue_demi__WEBPACK_IMPORTED_MODULE_0__.isVue2) {
        (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.set)(pinia.state.value, id, state ? state() : {});
      } else {
        pinia.state.value[id] = state ? state() : {};
      }
    }
    // avoid creating a state in pinia.state.value
    var localState =  true && hot ?
    // use ref() to unwrap refs inside state TODO: check if this is still necessary
    (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.toRefs)((0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.ref)(state ? state() : {}).value) : (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.toRefs)(pinia.state.value[id]);
    return assign(localState, actions, Object.keys(getters || {}).reduce(function (computedGetters, name) {
      if ( true && name in localState) {
        console.warn("[\uD83C\uDF4D]: A getter cannot have the same name as another state property. Rename one of them. Found with \"".concat(name, "\" in store \"").concat(id, "\"."));
      }
      computedGetters[name] = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.markRaw)((0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
        setActivePinia(pinia);
        // it was created just before
        var store = pinia._s.get(id);
        // allow cross using stores
        /* istanbul ignore next */
        if (vue_demi__WEBPACK_IMPORTED_MODULE_0__.isVue2 && !store._r) return;
        // @ts-expect-error
        // return getters![name].call(context, context)
        // TODO: avoid reading the getter while assigning with a global variable
        return getters[name].call(store, store);
      }));
      return computedGetters;
    }, {}));
  }
  store = createSetupStore(id, setup, options, pinia, hot, true);
  store.$reset = function $reset() {
    var newState = state ? state() : {};
    // we use a patch to group all changes into one single subscription
    this.$patch(function ($state) {
      assign($state, newState);
    });
  };
  return store;
}
function createSetupStore($id, setup) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var pinia = arguments.length > 3 ? arguments[3] : undefined;
  var hot = arguments.length > 4 ? arguments[4] : undefined;
  var isOptionsStore = arguments.length > 5 ? arguments[5] : undefined;
  var scope;
  var optionsForPlugin = assign({
    actions: {}
  }, options);
  /* istanbul ignore if */
  // @ts-expect-error: active is an internal property
  if ( true && !pinia._e.active) {
    throw new Error('Pinia destroyed');
  }
  // watcher options for $subscribe
  var $subscribeOptions = {
    deep: true
    // flush: 'post',
  };
  /* istanbul ignore else */
  if ( true && !vue_demi__WEBPACK_IMPORTED_MODULE_0__.isVue2) {
    $subscribeOptions.onTrigger = function (event) {
      /* istanbul ignore else */
      if (isListening) {
        debuggerEvents = event;
        // avoid triggering this while the store is being built and the state is being set in pinia
      } else if (isListening == false && !store._hotUpdating) {
        // let patch send all the events together later
        /* istanbul ignore else */
        if (Array.isArray(debuggerEvents)) {
          debuggerEvents.push(event);
        } else {
          console.error('🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug.');
        }
      }
    };
  }
  // internal state
  var isListening; // set to true at the end
  var isSyncListening; // set to true at the end
  var subscriptions = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.markRaw)([]);
  var actionSubscriptions = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.markRaw)([]);
  var debuggerEvents;
  var initialState = pinia.state.value[$id];
  // avoid setting the state for option stores if it is set
  // by the setup
  if (!isOptionsStore && !initialState && ( false || !hot)) {
    /* istanbul ignore if */
    if (vue_demi__WEBPACK_IMPORTED_MODULE_0__.isVue2) {
      (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.set)(pinia.state.value, $id, {});
    } else {
      pinia.state.value[$id] = {};
    }
  }
  var hotState = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.ref)({});
  // avoid triggering too many listeners
  // https://github.com/vuejs/pinia/issues/1129
  var activeListener;
  function $patch(partialStateOrMutator) {
    var subscriptionMutation;
    isListening = isSyncListening = false;
    // reset the debugger events since patches are sync
    /* istanbul ignore else */
    if (true) {
      debuggerEvents = [];
    }
    if (typeof partialStateOrMutator === 'function') {
      partialStateOrMutator(pinia.state.value[$id]);
      subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents
      };
    } else {
      mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
      subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents
      };
    }
    var myListenerId = activeListener = Symbol();
    (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.nextTick)().then(function () {
      if (activeListener === myListenerId) {
        isListening = true;
      }
    });
    isSyncListening = true;
    // because we paused the watcher, we need to manually call the subscriptions
    triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
  }
  /* istanbul ignore next */
  var $reset =  true ? function () {
    throw new Error("\uD83C\uDF4D: Store \"".concat($id, "\" is built using the setup syntax and does not implement $reset()."));
  } : 0;
  function $dispose() {
    scope.stop();
    subscriptions = [];
    actionSubscriptions = [];
    pinia._s.delete($id);
  }
  /**
   * Wraps an action to handle subscriptions.
   *
   * @param name - name of the action
   * @param action - action to wrap
   * @returns a wrapped action to handle subscriptions
   */
  function wrapAction(name, action) {
    return function () {
      setActivePinia(pinia);
      var args = Array.from(arguments);
      var afterCallbackList = [];
      var onErrorCallbackList = [];
      function after(callback) {
        afterCallbackList.push(callback);
      }
      function onError(callback) {
        onErrorCallbackList.push(callback);
      }
      // @ts-expect-error
      triggerSubscriptions(actionSubscriptions, {
        args: args,
        name: name,
        store: store,
        after: after,
        onError: onError
      });
      var ret;
      try {
        ret = action.apply(this && this.$id === $id ? this : store, args);
        // handle sync errors
      } catch (error) {
        triggerSubscriptions(onErrorCallbackList, error);
        throw error;
      }
      if (ret instanceof Promise) {
        return ret.then(function (value) {
          triggerSubscriptions(afterCallbackList, value);
          return value;
        }).catch(function (error) {
          triggerSubscriptions(onErrorCallbackList, error);
          return Promise.reject(error);
        });
      }
      // allow the afterCallback to override the return value
      triggerSubscriptions(afterCallbackList, ret);
      return ret;
    };
  }
  var _hmrPayload = /*#__PURE__*/(0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.markRaw)({
    actions: {},
    getters: {},
    state: [],
    hotState: hotState
  });
  var partialStore = {
    _p: pinia,
    // _s: scope,
    $id: $id,
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $patch: $patch,
    $reset: $reset,
    $subscribe: function $subscribe(callback) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var removeSubscription = addSubscription(subscriptions, callback, options.detached, function () {
        return stopWatcher();
      });
      var stopWatcher = scope.run(function () {
        return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.watch)(function () {
          return pinia.state.value[$id];
        }, function (state) {
          if (options.flush === 'sync' ? isSyncListening : isListening) {
            callback({
              storeId: $id,
              type: MutationType.direct,
              events: debuggerEvents
            }, state);
          }
        }, assign({}, $subscribeOptions, options));
      });
      return removeSubscription;
    },
    $dispose: $dispose
  };
  /* istanbul ignore if */
  if (vue_demi__WEBPACK_IMPORTED_MODULE_0__.isVue2) {
    // start as non ready
    partialStore._r = false;
  }
  var store = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.reactive)( true ? assign({
    _hmrPayload: _hmrPayload,
    _customProperties: (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.markRaw)(new Set()) // devtools custom properties
  }, partialStore
  // must be added later
  // setupStore
  ) : 0);
  // store the partial store now so the setup of stores can instantiate each other before they are finished without
  // creating infinite loops.
  pinia._s.set($id, store);
  // TODO: idea create skipSerialize that marks properties as non serializable and they are skipped
  var setupStore = pinia._e.run(function () {
    scope = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.effectScope)();
    return scope.run(function () {
      return setup();
    });
  });
  // overwrite existing actions to support $onAction
  for (var key in setupStore) {
    var prop = setupStore[key];
    if ((0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.isRef)(prop) && !isComputed(prop) || (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.isReactive)(prop)) {
      // mark it as a piece of state to be serialized
      if ( true && hot) {
        (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.set)(hotState.value, key, (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.toRef)(setupStore, key));
        // createOptionStore directly sets the state in pinia.state.value so we
        // can just skip that
      } else if (!isOptionsStore) {
        // in setup stores we must hydrate the state and sync pinia state tree with the refs the user just created
        if (initialState && shouldHydrate(prop)) {
          if ((0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.isRef)(prop)) {
            prop.value = initialState[key];
          } else {
            // probably a reactive object, lets recursively assign
            // @ts-expect-error: prop is unknown
            mergeReactiveObjects(prop, initialState[key]);
          }
        }
        // transfer the ref to the pinia state to keep everything in sync
        /* istanbul ignore if */
        if (vue_demi__WEBPACK_IMPORTED_MODULE_0__.isVue2) {
          (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.set)(pinia.state.value[$id], key, prop);
        } else {
          pinia.state.value[$id][key] = prop;
        }
      }
      /* istanbul ignore else */
      if (true) {
        _hmrPayload.state.push(key);
      }
      // action
    } else if (typeof prop === 'function') {
      // @ts-expect-error: we are overriding the function we avoid wrapping if
      var actionValue =  true && hot ? prop : wrapAction(key, prop);
      // this a hot module replacement store because the hotUpdate method needs
      // to do it with the right context
      /* istanbul ignore if */
      if (vue_demi__WEBPACK_IMPORTED_MODULE_0__.isVue2) {
        (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.set)(setupStore, key, actionValue);
      } else {
        // @ts-expect-error
        setupStore[key] = actionValue;
      }
      /* istanbul ignore else */
      if (true) {
        _hmrPayload.actions[key] = prop;
      }
      // list actions so they can be used in plugins
      // @ts-expect-error
      optionsForPlugin.actions[key] = prop;
    } else if (true) {
      // add getters for devtools
      if (isComputed(prop)) {
        _hmrPayload.getters[key] = isOptionsStore ?
        // @ts-expect-error
        options.getters[key] : prop;
        if (IS_CLIENT) {
          var getters = setupStore._getters || (
          // @ts-expect-error: same
          setupStore._getters = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.markRaw)([]));
          getters.push(key);
        }
      }
    }
  }
  // add the state, getters, and action properties
  /* istanbul ignore if */
  if (vue_demi__WEBPACK_IMPORTED_MODULE_0__.isVue2) {
    Object.keys(setupStore).forEach(function (key) {
      (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.set)(store, key, setupStore[key]);
    });
  } else {
    assign(store, setupStore);
    // allows retrieving reactive objects with `storeToRefs()`. Must be called after assigning to the reactive object.
    // Make `storeToRefs()` work with `reactive()` #799
    assign((0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.toRaw)(store), setupStore);
  }
  // use this instead of a computed with setter to be able to create it anywhere
  // without linking the computed lifespan to wherever the store is first
  // created.
  Object.defineProperty(store, '$state', {
    get: function get() {
      return  true && hot ? hotState.value : pinia.state.value[$id];
    },
    set: function set(state) {
      /* istanbul ignore if */
      if ( true && hot) {
        throw new Error('cannot set hotState');
      }
      $patch(function ($state) {
        assign($state, state);
      });
    }
  });
  // add the hotUpdate before plugins to allow them to override it
  /* istanbul ignore else */
  if (true) {
    store._hotUpdate = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.markRaw)(function (newStore) {
      store._hotUpdating = true;
      newStore._hmrPayload.state.forEach(function (stateKey) {
        if (stateKey in store.$state) {
          var newStateTarget = newStore.$state[stateKey];
          var oldStateSource = store.$state[stateKey];
          if ((0,_Users_renshuaiweidemac_Desktop_WGGW_mini_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_1__["default"])(newStateTarget) === 'object' && isPlainObject(newStateTarget) && isPlainObject(oldStateSource)) {
            patchObject(newStateTarget, oldStateSource);
          } else {
            // transfer the ref
            newStore.$state[stateKey] = oldStateSource;
          }
        }
        // patch direct access properties to allow store.stateProperty to work as
        // store.$state.stateProperty
        (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.set)(store, stateKey, (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.toRef)(newStore.$state, stateKey));
      });
      // remove deleted state properties
      Object.keys(store.$state).forEach(function (stateKey) {
        if (!(stateKey in newStore.$state)) {
          (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.del)(store, stateKey);
        }
      });
      // avoid devtools logging this as a mutation
      isListening = false;
      isSyncListening = false;
      pinia.state.value[$id] = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.toRef)(newStore._hmrPayload, 'hotState');
      isSyncListening = true;
      (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.nextTick)().then(function () {
        isListening = true;
      });
      for (var actionName in newStore._hmrPayload.actions) {
        var action = newStore[actionName];
        (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.set)(store, actionName, wrapAction(actionName, action));
      }
      // TODO: does this work in both setup and option store?
      var _loop2 = function _loop2(getterName) {
        var getter = newStore._hmrPayload.getters[getterName];
        var getterValue = isOptionsStore ?
        // special handling of options api
        (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
          setActivePinia(pinia);
          return getter.call(store, store);
        }) : getter;
        (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.set)(store, getterName, getterValue);
      };
      for (var getterName in newStore._hmrPayload.getters) {
        _loop2(getterName);
      }
      // remove deleted getters
      Object.keys(store._hmrPayload.getters).forEach(function (key) {
        if (!(key in newStore._hmrPayload.getters)) {
          (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.del)(store, key);
        }
      });
      // remove old actions
      Object.keys(store._hmrPayload.actions).forEach(function (key) {
        if (!(key in newStore._hmrPayload.actions)) {
          (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.del)(store, key);
        }
      });
      // update the values used in devtools and to allow deleting new properties later on
      store._hmrPayload = newStore._hmrPayload;
      store._getters = newStore._getters;
      store._hotUpdating = false;
    });
  }
  if (USE_DEVTOOLS) {
    var nonEnumerable = {
      writable: true,
      configurable: true,
      // avoid warning on devtools trying to display this property
      enumerable: false
    };
    ['_p', '_hmrPayload', '_getters', '_customProperties'].forEach(function (p) {
      Object.defineProperty(store, p, (0,_Users_renshuaiweidemac_Desktop_WGGW_mini_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_5__["default"])({
        value: store[p]
      }, nonEnumerable));
    });
  }
  /* istanbul ignore if */
  if (vue_demi__WEBPACK_IMPORTED_MODULE_0__.isVue2) {
    // mark the store as ready before plugins
    store._r = true;
  }
  // apply all plugins
  pinia._p.forEach(function (extender) {
    /* istanbul ignore else */
    if (USE_DEVTOOLS) {
      var extensions = scope.run(function () {
        return extender({
          store: store,
          app: pinia._a,
          pinia: pinia,
          options: optionsForPlugin
        });
      });
      Object.keys(extensions || {}).forEach(function (key) {
        return store._customProperties.add(key);
      });
      assign(store, extensions);
    } else {
      assign(store, scope.run(function () {
        return extender({
          store: store,
          app: pinia._a,
          pinia: pinia,
          options: optionsForPlugin
        });
      }));
    }
  });
  if ( true && store.$state && (0,_Users_renshuaiweidemac_Desktop_WGGW_mini_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_1__["default"])(store.$state) === 'object' && typeof store.$state.constructor === 'function' && !store.$state.constructor.toString().includes('[native code]')) {
    console.warn("[\uD83C\uDF4D]: The \"state\" must be a plain object. It cannot be\n" + "\tstate: () => new MyClass()\n" + "Found in store \"".concat(store.$id, "\"."));
  }
  // only apply hydrate to option stores with an initial state in pinia
  if (initialState && isOptionsStore && options.hydrate) {
    options.hydrate(store.$state, initialState);
  }
  isListening = true;
  isSyncListening = true;
  return store;
}
function defineStore(
// TODO: add proper types from above
idOrOptions, setup, setupOptions) {
  var id;
  var options;
  var isSetupStore = typeof setup === 'function';
  if (typeof idOrOptions === 'string') {
    id = idOrOptions;
    // the option store setup will contain the actual options in this case
    options = isSetupStore ? setupOptions : setup;
  } else {
    options = idOrOptions;
    id = idOrOptions.id;
  }
  function useStore(pinia, hot) {
    var currentInstance = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.getCurrentInstance)();
    pinia =
    // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    ( false ? 0 : pinia) || currentInstance && (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.inject)(piniaSymbol);
    if (pinia) setActivePinia(pinia);
    if ( true && !activePinia) {
      throw new Error("[\uD83C\uDF4D]: getActivePinia was called with no active Pinia. Did you forget to install pinia?\n" + "\tconst pinia = createPinia()\n" + "\tapp.use(pinia)\n" + "This will fail in production.");
    }
    pinia = activePinia;
    if (!pinia._s.has(id)) {
      // creating the store registers it in `pinia._s`
      if (isSetupStore) {
        createSetupStore(id, setup, options, pinia);
      } else {
        createOptionsStore(id, options, pinia);
      }
      /* istanbul ignore else */
      if (true) {
        // @ts-expect-error: not the right inferred type
        useStore._pinia = pinia;
      }
    }
    var store = pinia._s.get(id);
    if ( true && hot) {
      var hotId = '__hot:' + id;
      var newStore = isSetupStore ? createSetupStore(hotId, setup, options, pinia, true) : createOptionsStore(hotId, assign({}, options), pinia, true);
      hot._hotUpdate(newStore);
      // cleanup the state properties and the store from the cache
      delete pinia.state.value[hotId];
      pinia._s.delete(hotId);
    }
    // save stores in instances to access them devtools
    if ( true && IS_CLIENT && currentInstance && currentInstance.proxy &&
    // avoid adding stores that are just built for hot module replacement
    !hot) {
      var vm = currentInstance.proxy;
      var cache = '_pStores' in vm ? vm._pStores : vm._pStores = {};
      cache[id] = store;
    }
    // StoreGeneric cannot be casted towards Store
    return store;
  }
  useStore.$id = id;
  return useStore;
}
var mapStoreSuffix = 'Store';
/**
 * Changes the suffix added by `mapStores()`. Can be set to an empty string.
 * Defaults to `"Store"`. Make sure to extend the MapStoresCustomization
 * interface if you are using TypeScript.
 *
 * @param suffix - new suffix
 */
function setMapStoreSuffix(suffix // could be 'Store' but that would be annoying for JS
) {
  mapStoreSuffix = suffix;
}
/**
 * Allows using stores without the composition API (`setup()`) by generating an
 * object to be spread in the `computed` field of a component. It accepts a list
 * of store definitions.
 *
 * @example
 * ```js
 * export default {
 *   computed: {
 *     // other computed properties
 *     ...mapStores(useUserStore, useCartStore)
 *   },
 *
 *   created() {
 *     this.userStore // store with id "user"
 *     this.cartStore // store with id "cart"
 *   }
 * }
 * ```
 *
 * @param stores - list of stores to map to an object
 */
function mapStores() {
  for (var _len2 = arguments.length, stores = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    stores[_key2] = arguments[_key2];
  }
  if ( true && Array.isArray(stores[0])) {
    console.warn("[\uD83C\uDF4D]: Directly pass all stores to \"mapStores()\" without putting them in an array:\n" + "Replace\n" + "\tmapStores([useAuthStore, useCartStore])\n" + "with\n" + "\tmapStores(useAuthStore, useCartStore)\n" + "This will fail in production if not fixed.");
    stores = stores[0];
  }
  return stores.reduce(function (reduced, useStore) {
    // @ts-expect-error: $id is added by defineStore
    reduced[useStore.$id + mapStoreSuffix] = function () {
      return useStore(this.$pinia);
    };
    return reduced;
  }, {});
}
/**
 * Allows using state and getters from one store without using the composition
 * API (`setup()`) by generating an object to be spread in the `computed` field
 * of a component.
 *
 * @param useStore - store to map from
 * @param keysOrMapper - array or object
 */
function mapState(useStore, keysOrMapper) {
  return Array.isArray(keysOrMapper) ? keysOrMapper.reduce(function (reduced, key) {
    reduced[key] = function () {
      return useStore(this.$pinia)[key];
    };
    return reduced;
  }, {}) : Object.keys(keysOrMapper).reduce(function (reduced, key) {
    // @ts-expect-error
    reduced[key] = function () {
      var store = useStore(this.$pinia);
      var storeKey = keysOrMapper[key];
      // for some reason TS is unable to infer the type of storeKey to be a
      // function
      return typeof storeKey === 'function' ? storeKey.call(this, store) : store[storeKey];
    };
    return reduced;
  }, {});
}
/**
 * Alias for `mapState()`. You should use `mapState()` instead.
 * @deprecated use `mapState()` instead.
 */
var mapGetters = mapState;
/**
 * Allows directly using actions from your store without using the composition
 * API (`setup()`) by generating an object to be spread in the `methods` field
 * of a component.
 *
 * @param useStore - store to map from
 * @param keysOrMapper - array or object
 */
function mapActions(useStore, keysOrMapper) {
  return Array.isArray(keysOrMapper) ? keysOrMapper.reduce(function (reduced, key) {
    // @ts-expect-error
    reduced[key] = function () {
      var _useStore;
      return (_useStore = useStore(this.$pinia))[key].apply(_useStore, arguments);
    };
    return reduced;
  }, {}) : Object.keys(keysOrMapper).reduce(function (reduced, key) {
    // @ts-expect-error
    reduced[key] = function () {
      var _useStore2;
      return (_useStore2 = useStore(this.$pinia))[keysOrMapper[key]].apply(_useStore2, arguments);
    };
    return reduced;
  }, {});
}
/**
 * Allows using state and getters from one store without using the composition
 * API (`setup()`) by generating an object to be spread in the `computed` field
 * of a component.
 *
 * @param useStore - store to map from
 * @param keysOrMapper - array or object
 */
function mapWritableState(useStore, keysOrMapper) {
  return Array.isArray(keysOrMapper) ? keysOrMapper.reduce(function (reduced, key) {
    // @ts-ignore
    reduced[key] = {
      get: function get() {
        return useStore(this.$pinia)[key];
      },
      set: function set(value) {
        // it's easier to type it here as any
        return useStore(this.$pinia)[key] = value;
      }
    };
    return reduced;
  }, {}) : Object.keys(keysOrMapper).reduce(function (reduced, key) {
    // @ts-ignore
    reduced[key] = {
      get: function get() {
        return useStore(this.$pinia)[keysOrMapper[key]];
      },
      set: function set(value) {
        // it's easier to type it here as any
        return useStore(this.$pinia)[keysOrMapper[key]] = value;
      }
    };
    return reduced;
  }, {});
}

/**
 * Creates an object of references with all the state, getters, and plugin-added
 * state properties of the store. Similar to `toRefs()` but specifically
 * designed for Pinia stores so methods and non reactive properties are
 * completely ignored.
 *
 * @param store - store to extract the refs from
 */
function storeToRefs(store) {
  // See https://github.com/vuejs/pinia/issues/852
  // It's easier to just use toRefs() even if it includes more stuff
  if (vue_demi__WEBPACK_IMPORTED_MODULE_0__.isVue2) {
    // @ts-expect-error: toRefs include methods and others
    return (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.toRefs)(store);
  } else {
    store = (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.toRaw)(store);
    var refs = {};
    for (var key in store) {
      var value = store[key];
      if ((0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.isRef)(value) || (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.isReactive)(value)) {
        // @ts-expect-error: the key is state or getter
        refs[key] =
        // ---
        (0,vue_demi__WEBPACK_IMPORTED_MODULE_0__.toRef)(store, key);
      }
    }
    return refs;
  }
}

/**
 * Vue 2 Plugin that must be installed for pinia to work. Note **you don't need
 * this plugin if you are using Nuxt.js**. Use the `buildModule` instead:
 * https://pinia.vuejs.org/ssr/nuxt.html.
 *
 * @example
 * ```js
 * import Vue from 'vue'
 * import { PiniaVuePlugin, createPinia } from 'pinia'
 *
 * Vue.use(PiniaVuePlugin)
 * const pinia = createPinia()
 *
 * new Vue({
 *   el: '#app',
 *   // ...
 *   pinia,
 * })
 * ```
 *
 * @param _Vue - `Vue` imported from 'vue'.
 */
var PiniaVuePlugin = function PiniaVuePlugin(_Vue) {
  // Equivalent of
  // app.config.globalProperties.$pinia = pinia
  _Vue.mixin({
    beforeCreate: function beforeCreate() {
      var options = this.$options;
      if (options.pinia) {
        var pinia = options.pinia;
        // HACK: taken from provide(): https://github.com/vuejs/composition-api/blob/main/src/apis/inject.ts#L31
        /* istanbul ignore else */
        if (!this._provided) {
          var provideCache = {};
          Object.defineProperty(this, '_provided', {
            get: function get() {
              return provideCache;
            },
            set: function set(v) {
              return Object.assign(provideCache, v);
            }
          });
        }
        this._provided[piniaSymbol] = pinia;
        // propagate the pinia instance in an SSR friendly way
        // avoid adding it to nuxt twice
        /* istanbul ignore else */
        if (!this.$pinia) {
          this.$pinia = pinia;
        }
        pinia._a = this;
        if (IS_CLIENT) {
          // this allows calling useStore() outside of a component setup after
          // installing pinia's plugin
          setActivePinia(pinia);
        }
        if (USE_DEVTOOLS) {
          registerPiniaDevtools(pinia._a, pinia);
        }
      } else if (!this.$pinia && options.parent && options.parent.$pinia) {
        this.$pinia = options.parent.$pinia;
      }
    },
    destroyed: function destroyed() {
      delete this._pStores;
    }
  });
};


/***/ }),

/***/ "./node_modules/taro-plugin-pinia/dist/constructor.js":
/*!************************************************************!*\
  !*** ./node_modules/taro-plugin-pinia/dist/constructor.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.HTMLAnchorElement = void 0;
function HTMLAnchorElement() {}
exports.HTMLAnchorElement = HTMLAnchorElement;
HTMLAnchorElement.prototype = Object.create({
  download: true
});

/***/ }),

/***/ "./node_modules/vue-demi/lib/index.mjs":
/*!*********************************************!*\
  !*** ./node_modules/vue-demi/lib/index.mjs ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "set": function() { return /* binding */ set; },
/* harmony export */   "del": function() { return /* binding */ del; },
/* harmony export */   "isVue2": function() { return /* binding */ isVue2; }
/* harmony export */ });
/* unused harmony exports Vue2, isVue3, install */
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "webpack/container/remote/vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (checked) */ if(__webpack_require__.o(vue__WEBPACK_IMPORTED_MODULE_0__, "computed")) __webpack_require__.d(__webpack_exports__, { "computed": function() { return vue__WEBPACK_IMPORTED_MODULE_0__.computed; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(vue__WEBPACK_IMPORTED_MODULE_0__, "effectScope")) __webpack_require__.d(__webpack_exports__, { "effectScope": function() { return vue__WEBPACK_IMPORTED_MODULE_0__.effectScope; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(vue__WEBPACK_IMPORTED_MODULE_0__, "getCurrentInstance")) __webpack_require__.d(__webpack_exports__, { "getCurrentInstance": function() { return vue__WEBPACK_IMPORTED_MODULE_0__.getCurrentInstance; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(vue__WEBPACK_IMPORTED_MODULE_0__, "getCurrentScope")) __webpack_require__.d(__webpack_exports__, { "getCurrentScope": function() { return vue__WEBPACK_IMPORTED_MODULE_0__.getCurrentScope; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(vue__WEBPACK_IMPORTED_MODULE_0__, "inject")) __webpack_require__.d(__webpack_exports__, { "inject": function() { return vue__WEBPACK_IMPORTED_MODULE_0__.inject; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(vue__WEBPACK_IMPORTED_MODULE_0__, "isReactive")) __webpack_require__.d(__webpack_exports__, { "isReactive": function() { return vue__WEBPACK_IMPORTED_MODULE_0__.isReactive; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(vue__WEBPACK_IMPORTED_MODULE_0__, "isRef")) __webpack_require__.d(__webpack_exports__, { "isRef": function() { return vue__WEBPACK_IMPORTED_MODULE_0__.isRef; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(vue__WEBPACK_IMPORTED_MODULE_0__, "markRaw")) __webpack_require__.d(__webpack_exports__, { "markRaw": function() { return vue__WEBPACK_IMPORTED_MODULE_0__.markRaw; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(vue__WEBPACK_IMPORTED_MODULE_0__, "nextTick")) __webpack_require__.d(__webpack_exports__, { "nextTick": function() { return vue__WEBPACK_IMPORTED_MODULE_0__.nextTick; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(vue__WEBPACK_IMPORTED_MODULE_0__, "onScopeDispose")) __webpack_require__.d(__webpack_exports__, { "onScopeDispose": function() { return vue__WEBPACK_IMPORTED_MODULE_0__.onScopeDispose; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(vue__WEBPACK_IMPORTED_MODULE_0__, "reactive")) __webpack_require__.d(__webpack_exports__, { "reactive": function() { return vue__WEBPACK_IMPORTED_MODULE_0__.reactive; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(vue__WEBPACK_IMPORTED_MODULE_0__, "ref")) __webpack_require__.d(__webpack_exports__, { "ref": function() { return vue__WEBPACK_IMPORTED_MODULE_0__.ref; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(vue__WEBPACK_IMPORTED_MODULE_0__, "toRaw")) __webpack_require__.d(__webpack_exports__, { "toRaw": function() { return vue__WEBPACK_IMPORTED_MODULE_0__.toRaw; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(vue__WEBPACK_IMPORTED_MODULE_0__, "toRef")) __webpack_require__.d(__webpack_exports__, { "toRef": function() { return vue__WEBPACK_IMPORTED_MODULE_0__.toRef; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(vue__WEBPACK_IMPORTED_MODULE_0__, "toRefs")) __webpack_require__.d(__webpack_exports__, { "toRefs": function() { return vue__WEBPACK_IMPORTED_MODULE_0__.toRefs; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(vue__WEBPACK_IMPORTED_MODULE_0__, "unref")) __webpack_require__.d(__webpack_exports__, { "unref": function() { return vue__WEBPACK_IMPORTED_MODULE_0__.unref; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(vue__WEBPACK_IMPORTED_MODULE_0__, "watch")) __webpack_require__.d(__webpack_exports__, { "watch": function() { return vue__WEBPACK_IMPORTED_MODULE_0__.watch; } });


var isVue2 = false
var isVue3 = true
var Vue2 = undefined

function install() {}

function set(target, key, val) {
  if (Array.isArray(target)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }
  target[key] = val
  return val
}

function del(target, key) {
  if (Array.isArray(target)) {
    target.splice(key, 1)
    return
  }
  delete target[key]
}





/***/ }),

/***/ "./node_modules/vue-loader/dist/exportHelper.js":
/*!******************************************************!*\
  !*** ./node_modules/vue-loader/dist/exportHelper.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
// runtime helper for setting properties on components
// in a tree-shakable way
exports["default"] = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
        target[key] = val;
    }
    return target;
};


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _asyncToGenerator; }
/* harmony export */ });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _defineProperty; }
/* harmony export */ });
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _objectSpread2; }
/* harmony export */ });
/* harmony import */ var _defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defineProperty.js */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      (0,_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _regeneratorRuntime; }
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");

function _regeneratorRuntime() {
  "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  _regeneratorRuntime = function _regeneratorRuntime() {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function value(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }
      return ContinueSentinel;
    }
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) {
              if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            }
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) {
      keys.push(key);
    }
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) {
        "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      }
    },
    stop: function stop() {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!***********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _typeof; }
/* harmony export */ });
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

/***/ })

}]);
//# sourceMappingURL=vendors.js.map