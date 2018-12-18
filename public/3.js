webpackJsonp([3],{

/***/ 224:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(258)
}
var normalizeComponent = __webpack_require__(81)
/* script */
var __vue_script__ = __webpack_require__(260)
/* template */
var __vue_template__ = __webpack_require__(261)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-024d0dee"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/setting-template.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-024d0dee", Component.options)
  } else {
    hotAPI.reload("data-v-024d0dee", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 226:
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(227)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ 227:
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

/***/ 258:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(259);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(226)("2aa1b4d5", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-024d0dee\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./setting-template.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-024d0dee\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./setting-template.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 259:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(83)(false);
// imports


// module
exports.push([module.i, "\n.setting-template-wrapper[data-v-024d0dee] {\n  padding-top: 20px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.setting-template-wrapper .preview-container[data-v-024d0dee] {\n    width: 450px;\n    height: 700px;\n    background-color: #fff;\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n}\n.setting-template-wrapper .edit-container[data-v-024d0dee] {\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    padding-left: 20px;\n}\n.setting-template-wrapper .edit-wrapper[data-v-024d0dee] {\n    max-width: 450px;\n    min-height: 700px;\n    height: auto;\n    padding: 10px;\n    width: 100%;\n    display: block;\n    border-radius: 2px;\n    border: 1px solid rgba(0, 0, 0, 0.1);\n}\n.setting-template-wrapper .edit-null[data-v-024d0dee] {\n    position: absolute;\n    top: 50%;\n    left: 0;\n    right: 0;\n    font-size: 27px;\n    display: block;\n    width: 100%;\n    text-align: center;\n    color: #777777;\n    -webkit-transform: translateY(-50%);\n            transform: translateY(-50%);\n}\n.setting-template-wrapper .label-input-color .label-input[data-v-024d0dee] {\n    display: inline-block;\n    width: 80%;\n}\n.setting-template-wrapper .label-input-color .label-input-right[data-v-024d0dee] {\n    position: absolute;\n    left: 84%;\n}\n.edit-form[data-v-024d0dee] {\n  position: static;\n}\n.form-footer[data-v-024d0dee] {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  text-align: right;\n  padding: 10px;\n}\n.active[data-v-024d0dee]::before {\n  position: absolute;\n  content: '';\n  display: inline-block;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 0;\n  border: 3px dashed #000;\n}\n", ""]);

// exports


/***/ }),

/***/ 260:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(82);


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            loading: false,
            data: null,
            current: null,
            submitting: false
        };
    },
    mounted: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
            var $notify, $route, getSettingWithId, getTemplate, id, current, response;
            return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            $notify = this.$notify, $route = this.$route, getSettingWithId = this.getSettingWithId, getTemplate = this.getTemplate;
                            id = $route.params.id;

                            this.loading = true;

                            _context.next = 5;
                            return getSettingWithId(id);

                        case 5:
                            current = _context.sent;

                            if (!(current.status === 200)) {
                                _context.next = 13;
                                break;
                            }

                            _context.next = 9;
                            return getTemplate();

                        case 9:
                            response = _context.sent;

                            if (response.status !== 200) {
                                $notify.error({
                                    message: '意外来了,联系谁?',
                                    title: '警告'
                                });
                            }
                            _context.next = 14;
                            break;

                        case 13:
                            $notify.error({
                                message: 'id错误.',
                                title: '操作失误'
                            });

                        case 14:
                            this.loading = false;

                        case 15:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function mounted() {
            return _ref.apply(this, arguments);
        }

        return mounted;
    }(),

    methods: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapActions */])({
        getSettingWithId: 'setting/settingShow',
        getTemplate: 'template/show',
        update: 'template/update'
    }), {
        changeCurrent: function changeCurrent(text) {
            this.current = text;
        },
        handleSubmit: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee2() {
                var templateData, $notify, update, res;
                return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                templateData = this.templateData, $notify = this.$notify, update = this.update;


                                this.submitting = true;
                                templateData.template = this.parseToString;
                                _context2.next = 5;
                                return update(templateData);

                            case 5:
                                res = _context2.sent;

                                if (res.status === 200) {
                                    $notify({
                                        message: '操作成功',
                                        title: '恭喜',
                                        type: 'success'
                                    });
                                } else {
                                    $notify.error({
                                        message: '警告,出现问题',
                                        title: '错误'
                                    });
                                }
                                console.log(res);
                                this.submitting = false;

                            case 9:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function handleSubmit() {
                return _ref2.apply(this, arguments);
            }

            return handleSubmit;
        }(),
        parseStyleToString: function parseStyleToString(text) {
            var styleList = this.styleList;

            var obj = styleList(text, true);
            var str = "";

            for (var key in obj) {
                var item = obj[key];
                !!item && (str += key + ':' + item + ';');
            }
            return str;
        },
        styleList: function styleList(text, model) {
            var _getSetting = this.getSetting,
                header = _getSetting.header,
                main = _getSetting.main,
                left = _getSetting.left,
                right = _getSetting.right,
                form = _getSetting.form,
                footer = _getSetting.footer,
                tip = _getSetting.tip;


            var list = {
                header: {
                    'background-color': header.backgroundColor,
                    color: header.color,
                    opacity: header.display ? 1 : .4

                },
                main: {
                    'background-color': main.backgroundColor
                },
                leftText: {
                    'background-color': left.backgroundColor,
                    color: left.color
                },
                leftAvatar: {
                    'background-image': !!left.avatar ? 'url(' + left.avatar + ')' : ''
                },
                rightText: {
                    'background-color': right.backgroundColor,
                    color: right.color
                },
                rightAvatar: {
                    'background-image': !!right.avatar ? 'url(' + right.avatar + ')' : ''
                },
                tip: {
                    'background-color': tip.backgroundColor,
                    color: tip.color
                },
                input: {
                    color: form.color,
                    'background-color': form.backgroundColor
                },
                form: {
                    'background-color': form.wrapBackgroundColor
                },
                button: {
                    color: form.btnColor,
                    'background-color': form.btnBackgroundColor
                },
                inputWrap: {
                    flex: form.inputSpan
                },
                buttonWrap: {
                    flex: form.buttonSpan
                },
                footer: {
                    'border-color': footer.borderColor,
                    'background-color': footer.backgroundColor,
                    color: footer.color,
                    opacity: footer.display ? 1 : .4
                }
            };

            if (model) {
                list.footer.display = footer.display ? 'block' : 'none';
                list.header.display = header.display ? 'block' : 'none';
            }

            return list[text];
        }
    }),
    computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_1_vuex__["c" /* mapGetters */])({
        currentSetting: 'setting/current',
        templateData: 'template/data',
        getSetting: 'template/getSetting'
    }), {
        loaded: function loaded() {
            return !this.loading && this.templateData && this.currentSetting;
        },
        settingItem: function settingItem() {
            var _this = this;

            return function (text) {
                return _this.getSetting[text];
            };
        },
        parseToString: function parseToString() {
            var _getSetting2 = this.getSetting,
                header = _getSetting2.header,
                form = _getSetting2.form,
                left = _getSetting2.left,
                right = _getSetting2.right,
                footer = _getSetting2.footer;
            var parseStyleToString = this.parseStyleToString;

            return {
                header: '\n                    <div id="y-chat-header" >\n                        <div class="y-header-wrapper y-header-type-1" style="' + parseStyleToString('header') + '">\n                            <a href="javascript:history.go(-1)" class="y-header-back-icon y-item-lh">\n                                <svg t="1542941432445" class="icon" viewBox="0 0 1024 1024" version="1.1"\n                                     xmlns="http://www.w3.org/2000/svg" p-id="1943"\n                                     xmlns:xlink="http://www.w3.org/1999/xlink"\n                                     width="80" height="80">\n                                    <defs>\n                                    </defs>\n                                    <path d="M780.738722 92.147922 358.435523 512.007105 780.738722 931.866287C801.939138 952.953029 801.939138 987.140831 780.738722 1008.227572 759.538306 1029.285895 725.151571 1029.285895 703.951155 1008.227572L243.254173 550.173538C222.053757 529.115215 222.053757 494.927413 243.254173 473.840672L703.951155 15.815056C725.151571-5.271685 759.538306-5.271685 780.738722 15.815056 801.939138 36.901797 801.939138 71.0896 780.738722 92.147922Z"\n                                          p-id="1944" fill="' + header.backIconColor + '"></path>\n                                </svg>\n                            </a>\n                            <div class="y-header-text-wrap">\n                                <div>\n                                    ' + header.title + '\n                                </div>\n                            </div>\n                            <a href="tel:' + header.telNumber + '" class="y-header-tel-wrap">\n                                <span class="y-header-tel-icon y-item-lh">\n                                    <svg t="1542942287111" class="icon" viewBox="0 0 1024 1024" version="1.1"\n                                         xmlns="http://www.w3.org/2000/svg" p-id="2905"\n                                         xmlns:xlink="http://www.w3.org/1999/xlink"\n                                         width="80" height="80">\n                                        <defs>\n                                        </defs>\n                                        <path d="M4 270.312c8.16-31.028 13.994-62.914 25.056-92.876 13.72-37.148 40.66-62.254 80.35-72.862A1085.464 1085.464 0 0 0 196.14 77.46c28.49-10.234 52.55-3.62 70.594 18.58 52.982 65.18 83.392 139.28 83.3 224.43-0.024 26.734-11.494 44.416-36.714 56.08-48.64 22.488-56.586 52.3-20.842 93.232 51.516 58.978 106.052 115.42 161.068 171.206 32.23 32.684 66.78 63.35 102.31 92.45 43.346 35.492 70.972 28.612 94.918-22.172 11.26-23.874 29.184-35.59 54.152-35.3 86.98 1.012 163.382 30.834 229.196 87.496 18.49 15.92 23.17 36.656 16.592 59.84-5.992 21.112-12.02 42.208-18.79 63.088-33.104 102.08-106.354 149.524-213.04 128.51-57.772-11.368-116.376-29.678-168.53-56.604-247.202-127.668-428.24-316.764-522.886-582.306-6.294-17.646-11.164-35.99-14.64-54.398-3.082-16.344-3.306-33.222-4.79-49.868L4 270.312zM547.552 11.038c256.354 8.448 466.844 221.256 472.22 477.414 0.84 39.988-14.176 59.94-46.088 61.218-34.7 1.382-50.94-16.626-52.646-58.388-8.6-210.15-173.7-373.312-386.286-381.76-40.866-1.624-62.68-19.208-62.458-50.328 0.242-32.92 23.64-50.2 65.868-48.646 3.132 0.116 6.258 0.332 9.39 0.49z" fill="' + header.telIconColor + '" p-id="2906"></path>\n                                        <path d="M511.584 203.04c170.714 4.654 315.598 150.64 314.34 316.738-0.276 36.186-16.672 56.456-46.848 57.924-30.278 1.466-49.22-18.42-51.592-54.164-8.274-124.724-96.226-212.66-221.528-221.488-39.304-2.764-62.09-22.92-60.2-53.238 1.95-31.188 24.536-46.894 65.828-45.772z" fill="' + header.telIconColor + '" p-id="2907"></path>\n                                    </svg>\n                                </span>\n                                ' + (header.showTelNumber && '<span class="y-header-tel-text">' + header.telNumber + '</span>') + '\n                            </a>\n                        </div>\n                    </div>\n                ',
                main: '\n                    <div id="y-chat-main" style="' + parseStyleToString('main') + '">\n                        <div class="y-main-wrapper" >\n                        </div>\n                    </div>\n                ',
                left: '\n                    <div class="y-pop-wrap y-pop-left" >\n                        ' + (left.showAvatar ? '<div class="y-pop-avatar" ><div class="y-pop-avatar-img" style="' + parseStyleToString('leftAvatar') + '"></div></div>' : '') + '\n                        <div class="y-pop-text">\n                            ' + (left.showName ? '<div class="y-pop-name">' + left.name + '</div>' : '') + '\n                            <p style="' + parseStyleToString('leftText') + '" class="text-content"></p>\n                        </div>\n                    </div>\n                ',
                tip: '<div class="y-pop-wrap y-pop-tip"><div style="' + parseStyleToString('tip') + '" class="y-tip text-content"></div></div>',
                custom: '<div class="y-pop-wrap y-pop-custom text-content"></div>',
                right: '\n                    <div class="y-pop-wrap y-pop-right" >\n                        ' + (right.showAvatar ? '<div class="y-pop-avatar" ><div class="y-pop-avatar-img" style="' + parseStyleToString('rightAvatar') + '"></div></div>' : '') + '\n                        <div class="y-pop-text">\n                            ' + (right.showName ? '<div class="y-pop-name">' + right.name + '</div>' : '') + '\n                            <p style="' + parseStyleToString('rightText') + '" class="text-content"></p>\n                        </div>\n                    </div>\n                ',
                footer: '<div id="y-chat-footer">\n                        <div class="y-footer-wrapper y-footer-type-1">\n                            <div class="y-footer-form-wrap" style="' + parseStyleToString('form') + '">\n                                <form class="y-footer-form">\n                                    <div class="y-footer-input-wrap" style="' + parseStyleToString('inputWrap') + '">\n                                        ' + (form.elementTagName === 'input-border' ? '<input type="text" style="' + parseStyleToString('input') + '" :placeholder="settingItem(\'form\').placeholder" name="message-value" placeholder="' + form.placeholder + '" class="y-footer-form-value y-footer-input-border">' : '<textarea style="' + parseStyleToString('input') + '" name="message-value" placeholder="' + form.placeholder + '" class="y-footer-form-value y-footer-' + form.elementTagName + '"></textarea>') + '\n                                    </div>\n                                    <div class="y-footer-button-wrap" style="' + parseStyleToString('buttonWrap') + '">\n                                        <button style="' + parseStyleToString('button') + '" type="submit">' + form.btnText + '</button>\n                                    </div>\n                                </form>\n                            </div>\n                            <div class="y-footer-recode-wrap" style="' + parseStyleToString('footer') + '">\n                                ' + footer.text + '\n                            </div>\n                        </div>\n                    </div>'
            };
        }
    })
});

/***/ }),

/***/ 261:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        {
          name: "loading",
          rawName: "v-loading.fullscreen.lock",
          value: !_vm.loaded,
          expression: "!loaded",
          modifiers: { fullscreen: true, lock: true }
        }
      ],
      staticClass: "setting-template-container"
    },
    [
      _vm.loaded
        ? _c("div", { staticClass: "setting-template-wrapper" }, [
            _c("div", { staticClass: "preview-container" }, [
              _c("div", { attrs: { id: "y-chat-container" } }, [
                _c("div", { attrs: { id: "y-chat-header" } }, [
                  _c(
                    "div",
                    {
                      staticClass: "y-header-wrapper y-header-type-1",
                      class: { active: _vm.current === "header" },
                      style: _vm.styleList("header"),
                      on: {
                        click: function($event) {
                          $event.stopPropagation()
                          _vm.changeCurrent("header")
                        }
                      }
                    },
                    [
                      _c(
                        "div",
                        { staticClass: "y-header-back-icon y-item-lh" },
                        [
                          _c(
                            "svg",
                            {
                              staticClass: "icon",
                              attrs: {
                                t: "1542941432445",
                                viewBox: "0 0 1024 1024",
                                version: "1.1",
                                xmlns: "http://www.w3.org/2000/svg",
                                "p-id": "1943",
                                "xmlns:xlink": "http://www.w3.org/1999/xlink",
                                width: "80",
                                height: "80"
                              }
                            },
                            [
                              _c("defs"),
                              _vm._v(" "),
                              _c("path", {
                                attrs: {
                                  d:
                                    "M780.738722 92.147922 358.435523 512.007105 780.738722 931.866287C801.939138 952.953029 801.939138 987.140831 780.738722 1008.227572 759.538306 1029.285895 725.151571 1029.285895 703.951155 1008.227572L243.254173 550.173538C222.053757 529.115215 222.053757 494.927413 243.254173 473.840672L703.951155 15.815056C725.151571-5.271685 759.538306-5.271685 780.738722 15.815056 801.939138 36.901797 801.939138 71.0896 780.738722 92.147922Z",
                                  "p-id": "1944",
                                  fill: _vm.settingItem("header").backIconColor
                                }
                              })
                            ]
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c("div", { staticClass: "y-header-text-wrap" }, [
                        _c("div", [
                          _vm._v(
                            "\n                                " +
                              _vm._s(_vm.settingItem("header").title) +
                              "\n                            "
                          )
                        ])
                      ]),
                      _vm._v(" "),
                      _c("a", { staticClass: "y-header-tel-wrap" }, [
                        _c(
                          "span",
                          { staticClass: "y-header-tel-icon y-item-lh" },
                          [
                            _c(
                              "svg",
                              {
                                staticClass: "icon",
                                attrs: {
                                  t: "1542942287111",
                                  viewBox: "0 0 1024 1024",
                                  version: "1.1",
                                  xmlns: "http://www.w3.org/2000/svg",
                                  "p-id": "2905",
                                  "xmlns:xlink": "http://www.w3.org/1999/xlink",
                                  width: "80",
                                  height: "80"
                                }
                              },
                              [
                                _c("defs"),
                                _vm._v(" "),
                                _c("path", {
                                  attrs: {
                                    d:
                                      "M4 270.312c8.16-31.028 13.994-62.914 25.056-92.876 13.72-37.148 40.66-62.254 80.35-72.862A1085.464 1085.464 0 0 0 196.14 77.46c28.49-10.234 52.55-3.62 70.594 18.58 52.982 65.18 83.392 139.28 83.3 224.43-0.024 26.734-11.494 44.416-36.714 56.08-48.64 22.488-56.586 52.3-20.842 93.232 51.516 58.978 106.052 115.42 161.068 171.206 32.23 32.684 66.78 63.35 102.31 92.45 43.346 35.492 70.972 28.612 94.918-22.172 11.26-23.874 29.184-35.59 54.152-35.3 86.98 1.012 163.382 30.834 229.196 87.496 18.49 15.92 23.17 36.656 16.592 59.84-5.992 21.112-12.02 42.208-18.79 63.088-33.104 102.08-106.354 149.524-213.04 128.51-57.772-11.368-116.376-29.678-168.53-56.604-247.202-127.668-428.24-316.764-522.886-582.306-6.294-17.646-11.164-35.99-14.64-54.398-3.082-16.344-3.306-33.222-4.79-49.868L4 270.312zM547.552 11.038c256.354 8.448 466.844 221.256 472.22 477.414 0.84 39.988-14.176 59.94-46.088 61.218-34.7 1.382-50.94-16.626-52.646-58.388-8.6-210.15-173.7-373.312-386.286-381.76-40.866-1.624-62.68-19.208-62.458-50.328 0.242-32.92 23.64-50.2 65.868-48.646 3.132 0.116 6.258 0.332 9.39 0.49z",
                                    fill: _vm.settingItem("header")
                                      .telIconColor,
                                    "p-id": "2906"
                                  }
                                }),
                                _vm._v(" "),
                                _c("path", {
                                  attrs: {
                                    d:
                                      "M511.584 203.04c170.714 4.654 315.598 150.64 314.34 316.738-0.276 36.186-16.672 56.456-46.848 57.924-30.278 1.466-49.22-18.42-51.592-54.164-8.274-124.724-96.226-212.66-221.528-221.488-39.304-2.764-62.09-22.92-60.2-53.238 1.95-31.188 24.536-46.894 65.828-45.772z",
                                    fill: _vm.settingItem("header")
                                      .telIconColor,
                                    "p-id": "2907"
                                  }
                                })
                              ]
                            )
                          ]
                        ),
                        _vm._v(" "),
                        _vm.settingItem("header").showTelNumber
                          ? _c("span", { staticClass: "y-header-tel-text" }, [
                              _vm._v(
                                "\n                                " +
                                  _vm._s(_vm.settingItem("header").telNumber) +
                                  "\n                            "
                              )
                            ])
                          : _vm._e()
                      ])
                    ]
                  )
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    class: { active: _vm.current === "main" },
                    style: _vm.styleList("main"),
                    attrs: { id: "y-chat-main" },
                    on: {
                      click: function($event) {
                        $event.stopPropagation()
                        _vm.changeCurrent("main")
                      }
                    }
                  },
                  [
                    _c("div", { staticClass: "y-main-wrapper" }, [
                      _c(
                        "div",
                        {
                          staticClass: "y-pop-wrap y-pop-left",
                          class: { active: _vm.current === "left" },
                          on: {
                            click: function($event) {
                              $event.stopPropagation()
                              _vm.changeCurrent("left")
                            }
                          }
                        },
                        [
                          _vm.settingItem("left").showAvatar
                            ? _c("div", { staticClass: "y-pop-avatar" }, [
                                _c("div", {
                                  staticClass: "y-pop-avatar-img",
                                  style: _vm.styleList("leftAvatar")
                                })
                              ])
                            : _vm._e(),
                          _vm._v(" "),
                          _c("div", { staticClass: "y-pop-text" }, [
                            _vm.settingItem("left").showName
                              ? _c("div", { staticClass: "y-pop-name" }, [
                                  _vm._v(
                                    "\n                                    " +
                                      _vm._s(_vm.settingItem("left").name) +
                                      "\n                                "
                                  )
                                ])
                              : _vm._e(),
                            _vm._v(" "),
                            _c("p", { style: _vm.styleList("leftText") }, [
                              _vm._v(
                                "\n                                    你好,小老弟\n                                "
                              )
                            ])
                          ])
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass: "y-pop-wrap y-pop-right",
                          class: { active: _vm.current === "right" },
                          on: {
                            click: function($event) {
                              $event.stopPropagation()
                              _vm.changeCurrent("right")
                            }
                          }
                        },
                        [
                          _vm.settingItem("right").showAvatar
                            ? _c("div", { staticClass: "y-pop-avatar" }, [
                                _c("div", {
                                  staticClass: "y-pop-avatar-img",
                                  style: _vm.styleList("rightAvatar")
                                })
                              ])
                            : _vm._e(),
                          _vm._v(" "),
                          _c("div", { staticClass: "y-pop-text" }, [
                            _vm.settingItem("right").showName
                              ? _c("div", { staticClass: "y-pop-name" }, [
                                  _vm._v(
                                    "\n                                    " +
                                      _vm._s(_vm.settingItem("right").name) +
                                      "\n                                "
                                  )
                                ])
                              : _vm._e(),
                            _vm._v(" "),
                            _c("p", { style: _vm.styleList("rightText") }, [
                              _vm._v(
                                "\n                                    你好,大老哥\n                                "
                              )
                            ])
                          ])
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass: "y-pop-wrap y-pop-tip",
                          class: { active: _vm.current === "tip" },
                          on: {
                            click: function($event) {
                              $event.stopPropagation()
                              _vm.changeCurrent("tip")
                            }
                          }
                        },
                        [
                          _c(
                            "div",
                            {
                              staticClass: "y-tip",
                              style: _vm.styleList("tip")
                            },
                            [_vm._v("呜呜呜呜呜,我哭了你呢")]
                          )
                        ]
                      )
                    ])
                  ]
                ),
                _vm._v(" "),
                _c("div", { attrs: { id: "y-chat-footer" } }, [
                  _c(
                    "div",
                    { staticClass: "y-footer-wrapper y-footer-type-1" },
                    [
                      _c(
                        "div",
                        {
                          staticClass: "y-footer-form-wrap",
                          class: { active: _vm.current === "form" },
                          style: _vm.styleList("form"),
                          on: {
                            click: function($event) {
                              $event.stopPropagation()
                              _vm.changeCurrent("form")
                            }
                          }
                        },
                        [
                          _c("form", { staticClass: "y-footer-form" }, [
                            _c(
                              "div",
                              {
                                staticClass: "y-footer-input-wrap",
                                style: _vm.styleList("inputWrap")
                              },
                              [
                                _vm.settingItem("form").elementTagName ===
                                "input-border"
                                  ? _c("input", {
                                      staticClass:
                                        "y-footer-form-value y-footer-input-border",
                                      style: _vm.styleList("input"),
                                      attrs: {
                                        type: "text",
                                        name: "test",
                                        placeholder: _vm.settingItem("form")
                                          .placeholder
                                      }
                                    })
                                  : _c("textarea", {
                                      staticClass: "y-footer-form-value",
                                      class:
                                        "y-footer-" +
                                        _vm.settingItem("form").elementTagName,
                                      style: _vm.styleList("input"),
                                      attrs: {
                                        name: "test",
                                        placeholder: _vm.settingItem("form")
                                          .placeholder
                                      }
                                    })
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              {
                                staticClass: "y-footer-button-wrap",
                                style: _vm.styleList("buttonWrap")
                              },
                              [
                                _c(
                                  "button",
                                  {
                                    style: _vm.styleList("button"),
                                    attrs: { type: "button" }
                                  },
                                  [
                                    _vm._v(
                                      "\n                                        " +
                                        _vm._s(
                                          _vm.settingItem("form").btnText
                                        ) +
                                        "\n                                    "
                                    )
                                  ]
                                )
                              ]
                            )
                          ])
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass: "y-footer-recode-wrap",
                          class: { active: _vm.current === "footer" },
                          style: _vm.styleList("footer"),
                          on: {
                            click: function($event) {
                              $event.stopPropagation()
                              _vm.changeCurrent("footer")
                            }
                          }
                        },
                        [
                          _vm._v(
                            "\n                            " +
                              _vm._s(_vm.settingItem("footer").text) +
                              "\n                        "
                          )
                        ]
                      )
                    ]
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "edit-container" }, [
              _c(
                "div",
                { staticClass: "edit-wrapper" },
                [
                  !_vm.current
                    ? _c("div", { staticClass: "edit-null" }, [
                        _vm._v(
                          "\n                    前选择左侧组件\n                "
                        )
                      ])
                    : _c(
                        "el-form",
                        {
                          staticClass: "edit-form",
                          attrs: {
                            "label-position": "left",
                            "label-width": "105px"
                          },
                          model: {
                            value: _vm.getSetting,
                            callback: function($$v) {
                              _vm.getSetting = $$v
                            },
                            expression: "getSetting"
                          }
                        },
                        [
                          _c(
                            "div",
                            { staticClass: "edit-content" },
                            [
                              _vm.current === "header"
                                ? [
                                    _c("h1", [
                                      _vm._v(
                                        "\n                                Header\n                            "
                                      )
                                    ]),
                                    _vm._v(" "),
                                    _c(
                                      "el-form-item",
                                      {
                                        staticClass: "label-input-color",
                                        attrs: { label: "显示" }
                                      },
                                      [
                                        _c("el-switch", {
                                          model: {
                                            value:
                                              _vm.getSetting.header.display,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.getSetting.header,
                                                "display",
                                                $$v
                                              )
                                            },
                                            expression:
                                              "getSetting.header.display"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "el-form-item",
                                      {
                                        staticClass: "label-input-color",
                                        attrs: { label: "标题" }
                                      },
                                      [
                                        _c("el-input", {
                                          staticClass: "label-input",
                                          model: {
                                            value: _vm.getSetting.header.title,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.getSetting.header,
                                                "title",
                                                $$v
                                              )
                                            },
                                            expression:
                                              "getSetting.header.title"
                                          }
                                        }),
                                        _vm._v(" "),
                                        _c("el-color-picker", {
                                          staticClass: "label-input-right",
                                          model: {
                                            value: _vm.getSetting.header.color,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.getSetting.header,
                                                "color",
                                                $$v
                                              )
                                            },
                                            expression:
                                              "getSetting.header.color"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "el-form-item",
                                      {
                                        staticClass: "label-input-color",
                                        attrs: { label: "电话" }
                                      },
                                      [
                                        _c("el-input", {
                                          staticClass: "label-input",
                                          model: {
                                            value:
                                              _vm.getSetting.header.telNumber,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.getSetting.header,
                                                "telNumber",
                                                $$v
                                              )
                                            },
                                            expression:
                                              "getSetting.header.telNumber"
                                          }
                                        }),
                                        _vm._v(" "),
                                        _c("el-switch", {
                                          staticClass: "label-input-right",
                                          model: {
                                            value:
                                              _vm.getSetting.header
                                                .showTelNumber,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.getSetting.header,
                                                "showTelNumber",
                                                $$v
                                              )
                                            },
                                            expression:
                                              "getSetting.header.showTelNumber"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "el-form-item",
                                      {
                                        staticClass: "label-input-color",
                                        attrs: { label: "返回Icon颜色" }
                                      },
                                      [
                                        _c("el-color-picker", {
                                          model: {
                                            value:
                                              _vm.getSetting.header
                                                .backIconColor,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.getSetting.header,
                                                "backIconColor",
                                                $$v
                                              )
                                            },
                                            expression:
                                              "getSetting.header.backIconColor"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "el-form-item",
                                      {
                                        staticClass: "label-input-color",
                                        attrs: { label: "电话Icon颜色" }
                                      },
                                      [
                                        _c("el-color-picker", {
                                          model: {
                                            value:
                                              _vm.getSetting.header
                                                .telIconColor,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.getSetting.header,
                                                "telIconColor",
                                                $$v
                                              )
                                            },
                                            expression:
                                              "getSetting.header.telIconColor"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "el-form-item",
                                      {
                                        staticClass: "label-input-color",
                                        attrs: { label: "背景颜色" }
                                      },
                                      [
                                        _c("el-color-picker", {
                                          model: {
                                            value:
                                              _vm.getSetting.header
                                                .backgroundColor,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.getSetting.header,
                                                "backgroundColor",
                                                $$v
                                              )
                                            },
                                            expression:
                                              "getSetting.header.backgroundColor"
                                          }
                                        })
                                      ],
                                      1
                                    )
                                  ]
                                : _vm.current === "main"
                                ? [
                                    _c("h1", [
                                      _vm._v(
                                        "\n                                Main\n                            "
                                      )
                                    ]),
                                    _vm._v(" "),
                                    _c(
                                      "el-form-item",
                                      {
                                        staticClass: "label-input-color",
                                        attrs: { label: "背景颜色" }
                                      },
                                      [
                                        _c("el-color-picker", {
                                          model: {
                                            value:
                                              _vm.getSetting.main
                                                .backgroundColor,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.getSetting.main,
                                                "backgroundColor",
                                                $$v
                                              )
                                            },
                                            expression:
                                              "getSetting.main.backgroundColor"
                                          }
                                        })
                                      ],
                                      1
                                    )
                                  ]
                                : _vm.current === "left"
                                ? [
                                    _c("h1", [
                                      _vm._v(
                                        "\n                                Left\n                            "
                                      )
                                    ]),
                                    _vm._v(" "),
                                    _c(
                                      "el-form-item",
                                      {
                                        staticClass: "label-input-color",
                                        attrs: { label: "名称" }
                                      },
                                      [
                                        _c("el-input", {
                                          staticClass: "label-input",
                                          model: {
                                            value: _vm.getSetting.left.name,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.getSetting.left,
                                                "name",
                                                $$v
                                              )
                                            },
                                            expression: "getSetting.left.name"
                                          }
                                        }),
                                        _vm._v(" "),
                                        _c("el-switch", {
                                          staticClass: "label-input-right",
                                          model: {
                                            value: _vm.getSetting.left.showName,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.getSetting.left,
                                                "showName",
                                                $$v
                                              )
                                            },
                                            expression:
                                              "getSetting.left.showName"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "el-form-item",
                                      {
                                        staticClass: "label-input-color",
                                        attrs: { label: "头像" }
                                      },
                                      [
                                        _c("el-input", {
                                          staticClass: "label-input",
                                          attrs: {
                                            placeholder: "不输入将使用默认值"
                                          },
                                          model: {
                                            value: _vm.getSetting.left.avatar,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.getSetting.left,
                                                "avatar",
                                                $$v
                                              )
                                            },
                                            expression: "getSetting.left.avatar"
                                          }
                                        }),
                                        _vm._v(" "),
                                        _c("el-switch", {
                                          staticClass: "label-input-right",
                                          model: {
                                            value:
                                              _vm.getSetting.left.showAvatar,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.getSetting.left,
                                                "showAvatar",
                                                $$v
                                              )
                                            },
                                            expression:
                                              "getSetting.left.showAvatar"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "el-form-item",
                                      {
                                        staticClass: "label-input-color",
                                        attrs: { label: "文字颜色" }
                                      },
                                      [
                                        _c("el-color-picker", {
                                          model: {
                                            value: _vm.getSetting.left.color,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.getSetting.left,
                                                "color",
                                                $$v
                                              )
                                            },
                                            expression: "getSetting.left.color"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "el-form-item",
                                      {
                                        staticClass: "label-input-color",
                                        attrs: { label: "背景颜色" }
                                      },
                                      [
                                        _c("el-color-picker", {
                                          model: {
                                            value:
                                              _vm.getSetting.left
                                                .backgroundColor,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.getSetting.left,
                                                "backgroundColor",
                                                $$v
                                              )
                                            },
                                            expression:
                                              "getSetting.left.backgroundColor"
                                          }
                                        })
                                      ],
                                      1
                                    )
                                  ]
                                : _vm.current === "tip"
                                ? [
                                    _c(
                                      "el-form-item",
                                      {
                                        staticClass: "label-input-color",
                                        attrs: { label: "文字颜色" }
                                      },
                                      [
                                        _c("el-color-picker", {
                                          model: {
                                            value: _vm.getSetting.tip.color,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.getSetting.tip,
                                                "color",
                                                $$v
                                              )
                                            },
                                            expression: "getSetting.tip.color"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "el-form-item",
                                      {
                                        staticClass: "label-input-color",
                                        attrs: { label: "背景颜色" }
                                      },
                                      [
                                        _c("el-color-picker", {
                                          model: {
                                            value:
                                              _vm.getSetting.tip
                                                .backgroundColor,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.getSetting.tip,
                                                "backgroundColor",
                                                $$v
                                              )
                                            },
                                            expression:
                                              "getSetting.tip.backgroundColor"
                                          }
                                        })
                                      ],
                                      1
                                    )
                                  ]
                                : _vm.current === "right"
                                ? [
                                    _c("h1", [
                                      _vm._v(
                                        "\n                                Right\n                            "
                                      )
                                    ]),
                                    _vm._v(" "),
                                    _c(
                                      "el-form-item",
                                      {
                                        staticClass: "label-input-color",
                                        attrs: { label: "名称" }
                                      },
                                      [
                                        _c("el-input", {
                                          staticClass: "label-input",
                                          model: {
                                            value: _vm.getSetting.right.name,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.getSetting.right,
                                                "name",
                                                $$v
                                              )
                                            },
                                            expression: "getSetting.right.name"
                                          }
                                        }),
                                        _vm._v(" "),
                                        _c("el-switch", {
                                          staticClass: "label-input-right",
                                          model: {
                                            value:
                                              _vm.getSetting.right.showName,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.getSetting.right,
                                                "showName",
                                                $$v
                                              )
                                            },
                                            expression:
                                              "getSetting.right.showName"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "el-form-item",
                                      {
                                        staticClass: "label-input-color",
                                        attrs: { label: "头像" }
                                      },
                                      [
                                        _c("el-input", {
                                          staticClass: "label-input",
                                          attrs: {
                                            placeholder: "不输入将使用默认值"
                                          },
                                          model: {
                                            value: _vm.getSetting.right.avatar,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.getSetting.right,
                                                "avatar",
                                                $$v
                                              )
                                            },
                                            expression:
                                              "getSetting.right.avatar"
                                          }
                                        }),
                                        _vm._v(" "),
                                        _c("el-switch", {
                                          staticClass: "label-input-right",
                                          model: {
                                            value:
                                              _vm.getSetting.right.showAvatar,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.getSetting.right,
                                                "showAvatar",
                                                $$v
                                              )
                                            },
                                            expression:
                                              "getSetting.right.showAvatar"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "el-form-item",
                                      {
                                        staticClass: "label-input-color",
                                        attrs: { label: "文字颜色" }
                                      },
                                      [
                                        _c("el-color-picker", {
                                          model: {
                                            value: _vm.getSetting.right.color,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.getSetting.right,
                                                "color",
                                                $$v
                                              )
                                            },
                                            expression: "getSetting.right.color"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "el-form-item",
                                      {
                                        staticClass: "label-input-color",
                                        attrs: { label: "背景颜色" }
                                      },
                                      [
                                        _c("el-color-picker", {
                                          model: {
                                            value:
                                              _vm.getSetting.right
                                                .backgroundColor,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.getSetting.right,
                                                "backgroundColor",
                                                $$v
                                              )
                                            },
                                            expression:
                                              "getSetting.right.backgroundColor"
                                          }
                                        })
                                      ],
                                      1
                                    )
                                  ]
                                : _vm.current === "form"
                                ? [
                                    _c("h1", [
                                      _vm._v(
                                        "\n                                Form\n                            "
                                      )
                                    ]),
                                    _vm._v(" "),
                                    _c(
                                      "el-form-item",
                                      { attrs: { label: "输入框样式" } },
                                      [
                                        _c(
                                          "el-radio-group",
                                          {
                                            model: {
                                              value:
                                                _vm.getSetting.form
                                                  .elementTagName,
                                              callback: function($$v) {
                                                _vm.$set(
                                                  _vm.getSetting.form,
                                                  "elementTagName",
                                                  $$v
                                                )
                                              },
                                              expression:
                                                "getSetting.form.elementTagName"
                                            }
                                          },
                                          [
                                            _c(
                                              "el-radio",
                                              { attrs: { label: "input" } },
                                              [_vm._v("Input")]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "el-radio",
                                              {
                                                attrs: { label: "input-border" }
                                              },
                                              [_vm._v("Input-Border")]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "el-radio",
                                              { attrs: { label: "textarea" } },
                                              [_vm._v("Textarea")]
                                            )
                                          ],
                                          1
                                        )
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "el-form-item",
                                      {
                                        staticClass: "label-input-color",
                                        attrs: { label: "input栅格" }
                                      },
                                      [
                                        _c("el-input-number", {
                                          attrs: { min: 1, max: 20 },
                                          model: {
                                            value:
                                              _vm.getSetting.form.inputSpan,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.getSetting.form,
                                                "inputSpan",
                                                $$v
                                              )
                                            },
                                            expression:
                                              "getSetting.form.inputSpan"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "el-form-item",
                                      {
                                        staticClass: "label-input-color",
                                        attrs: { label: "占位符" }
                                      },
                                      [
                                        _c("el-input", {
                                          staticClass: "label-input",
                                          model: {
                                            value:
                                              _vm.getSetting.form.placeholder,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.getSetting.form,
                                                "placeholder",
                                                $$v
                                              )
                                            },
                                            expression:
                                              "getSetting.form.placeholder"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "el-form-item",
                                      {
                                        staticClass: "label-input-color",
                                        attrs: { label: "input颜色" }
                                      },
                                      [
                                        _c("el-color-picker", {
                                          model: {
                                            value:
                                              _vm.getSetting.form
                                                .backgroundColor,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.getSetting.form,
                                                "backgroundColor",
                                                $$v
                                              )
                                            },
                                            expression:
                                              "getSetting.form.backgroundColor"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "el-form-item",
                                      {
                                        staticClass: "label-input-color",
                                        attrs: { label: "input文字颜色" }
                                      },
                                      [
                                        _c("el-color-picker", {
                                          model: {
                                            value: _vm.getSetting.form.color,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.getSetting.form,
                                                "color",
                                                $$v
                                              )
                                            },
                                            expression: "getSetting.form.color"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "el-form-item",
                                      {
                                        staticClass: "label-input-color",
                                        attrs: { label: "按钮栅格" }
                                      },
                                      [
                                        _c("el-input-number", {
                                          attrs: { min: 1, max: 20 },
                                          model: {
                                            value:
                                              _vm.getSetting.form.buttonSpan,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.getSetting.form,
                                                "buttonSpan",
                                                $$v
                                              )
                                            },
                                            expression:
                                              "getSetting.form.buttonSpan"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "el-form-item",
                                      {
                                        staticClass: "label-input-color",
                                        attrs: { label: "按钮" }
                                      },
                                      [
                                        _c("el-input", {
                                          staticClass: "label-input",
                                          model: {
                                            value: _vm.getSetting.form.btnText,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.getSetting.form,
                                                "btnText",
                                                $$v
                                              )
                                            },
                                            expression:
                                              "getSetting.form.btnText"
                                          }
                                        }),
                                        _vm._v(" "),
                                        _c("el-color-picker", {
                                          staticClass: "label-input-right",
                                          model: {
                                            value: _vm.getSetting.form.btnColor,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.getSetting.form,
                                                "btnColor",
                                                $$v
                                              )
                                            },
                                            expression:
                                              "getSetting.form.btnColor"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "el-form-item",
                                      {
                                        staticClass: "label-input-color",
                                        attrs: { label: "按钮颜色" }
                                      },
                                      [
                                        _c("el-color-picker", {
                                          model: {
                                            value:
                                              _vm.getSetting.form
                                                .btnBackgroundColor,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.getSetting.form,
                                                "btnBackgroundColor",
                                                $$v
                                              )
                                            },
                                            expression:
                                              "getSetting.form.btnBackgroundColor"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "el-form-item",
                                      {
                                        staticClass: "label-input-color",
                                        attrs: { label: "背景颜色" }
                                      },
                                      [
                                        _c("el-color-picker", {
                                          model: {
                                            value:
                                              _vm.getSetting.form
                                                .wrapBackgroundColor,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.getSetting.form,
                                                "wrapBackgroundColor",
                                                $$v
                                              )
                                            },
                                            expression:
                                              "getSetting.form.wrapBackgroundColor"
                                          }
                                        })
                                      ],
                                      1
                                    )
                                  ]
                                : _vm.current === "footer"
                                ? [
                                    _c(
                                      "el-form-item",
                                      {
                                        staticClass: "label-input-color",
                                        attrs: { label: "显示" }
                                      },
                                      [
                                        _c("el-switch", {
                                          model: {
                                            value:
                                              _vm.getSetting.footer.display,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.getSetting.footer,
                                                "display",
                                                $$v
                                              )
                                            },
                                            expression:
                                              "getSetting.footer.display"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "el-form-item",
                                      {
                                        staticClass: "label-input-color",
                                        attrs: { label: "文字" }
                                      },
                                      [
                                        _c("el-input", {
                                          staticClass: "label-input",
                                          model: {
                                            value: _vm.getSetting.footer.text,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.getSetting.footer,
                                                "text",
                                                $$v
                                              )
                                            },
                                            expression: "getSetting.footer.text"
                                          }
                                        }),
                                        _vm._v(" "),
                                        _c("el-color-picker", {
                                          staticClass: "label-input-right",
                                          model: {
                                            value: _vm.getSetting.footer.color,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.getSetting.footer,
                                                "color",
                                                $$v
                                              )
                                            },
                                            expression:
                                              "getSetting.footer.color"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "el-form-item",
                                      {
                                        staticClass: "label-input-color",
                                        attrs: { label: "背景颜色" }
                                      },
                                      [
                                        _c("el-color-picker", {
                                          model: {
                                            value:
                                              _vm.getSetting.footer
                                                .backgroundColor,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.getSetting.footer,
                                                "backgroundColor",
                                                $$v
                                              )
                                            },
                                            expression:
                                              "getSetting.footer.backgroundColor"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "el-form-item",
                                      {
                                        staticClass: "label-input-color",
                                        attrs: { label: "边框颜色" }
                                      },
                                      [
                                        _c("el-color-picker", {
                                          model: {
                                            value:
                                              _vm.getSetting.footer.borderColor,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.getSetting.footer,
                                                "borderColor",
                                                $$v
                                              )
                                            },
                                            expression:
                                              "getSetting.footer.borderColor"
                                          }
                                        })
                                      ],
                                      1
                                    )
                                  ]
                                : _vm._e()
                            ],
                            2
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "form-footer" },
                            [
                              _c(
                                "el-button",
                                {
                                  attrs: {
                                    loading: _vm.submitting,
                                    type: "primary"
                                  },
                                  on: { click: _vm.handleSubmit }
                                },
                                [_vm._v("保存")]
                              )
                            ],
                            1
                          )
                        ]
                      )
                ],
                1
              )
            ])
          ])
        : _vm._e()
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-024d0dee", module.exports)
  }
}

/***/ })

});