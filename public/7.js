webpackJsonp([7],{

/***/ 237:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(78)
/* script */
var __vue_script__ = __webpack_require__(238)
/* template */
var __vue_template__ = __webpack_require__(239)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
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
Component.options.__file = "resources/assets/js/components/message-list.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-343ccb8a", Component.options)
  } else {
    hotAPI.reload("data-v-343ccb8a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 238:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_assist__ = __webpack_require__(48);


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



var defaultMessage = {
    value: ''
};
var defaultForm = {
    keyword: '',
    message: [Object(__WEBPACK_IMPORTED_MODULE_1__utils_assist__["a" /* cloneOf */])(defaultMessage)]
};

/* harmony default export */ __webpack_exports__["default"] = ({
    props: {},
    data: function data() {
        return {
            loading: false,
            query: '',
            placeholder: '关键字',
            inputHover: false,
            dialogVisible: false,
            form: {
                keyword: '',
                message: [Object(__WEBPACK_IMPORTED_MODULE_1__utils_assist__["a" /* cloneOf */])(defaultMessage)]
            }
        };
    },
    mounted: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
            var $store, $route, id, current, res, _res;

            return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            $store = this.$store, $route = this.$route;
                            id = $route.params.id;
                            current = $store.getters['setting/current'](id);

                            if (current) {
                                _context.next = 14;
                                break;
                            }

                            this.loading = true;
                            _context.next = 7;
                            return $store.dispatch('setting/settingShow', id);

                        case 7:
                            res = _context.sent;

                            if (!res) {
                                _context.next = 13;
                                break;
                            }

                            _context.next = 11;
                            return $store.dispatch('message/current', id);

                        case 11:
                            _res = _context.sent;

                            console.log(_res);

                        case 13:
                            this.loading = false;

                        case 14:
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

    methods: {
        clearQuery: function clearQuery() {
            if (this.inputIcon === 'circle-close') this.query = '';
        }
    },
    computed: {
        isCurrent: function isCurrent() {
            return this.$store.getters['message/current'](this.$route.params.id);
        },
        currentMessage: function currentMessage() {
            return this.isCurrent && this.$store.getters['message/message'];
        },
        inputIcon: function inputIcon() {
            return this.query.length > 0 && this.inputHover ? 'circle-close' : 'search';
        },
        filterable: function filterable() {
            var currentMessage = this.currentMessage,
                query = this.query;

            if (!currentMessage) return false;

            if (query === '') {
                return currentMessage;
            }

            return currentMessage.filter(function (item) {
                return item.keyword.toLowerCase().indexOf(query.toLowerCase()) > -1;
            });
        }
    }
});

/***/ }),

/***/ 239:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "message-list_container" },
    [
      _vm.filterable
        ? _c("div", { staticClass: "message-header" }, [
            _c(
              "div",
              { staticClass: "message-header_filter" },
              [
                _c(
                  "el-input",
                  {
                    attrs: { size: "small", placeholder: _vm.placeholder },
                    nativeOn: {
                      mouseenter: function($event) {
                        _vm.inputHover = true
                      },
                      mouseleave: function($event) {
                        _vm.inputHover = false
                      }
                    },
                    model: {
                      value: _vm.query,
                      callback: function($$v) {
                        _vm.query = $$v
                      },
                      expression: "query"
                    }
                  },
                  [
                    _c("i", {
                      class: ["el-input__icon", "el-icon-" + _vm.inputIcon],
                      attrs: { slot: "prefix" },
                      on: { click: _vm.clearQuery },
                      slot: "prefix"
                    })
                  ]
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "message-header_controller" },
              [
                _c(
                  "el-button",
                  {
                    attrs: { type: "primary" },
                    on: {
                      click: function($event) {
                        _vm.dialogVisible = true
                      }
                    }
                  },
                  [_vm._v("\n                新建\n            ")]
                )
              ],
              1
            )
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm.filterable
        ? _c(
            "el-row",
            { attrs: { gutter: 30 } },
            _vm._l(_vm.filterable, function(item) {
              return _c(
                "el-col",
                { key: item.id, attrs: { span: 8 } },
                [
                  _c("el-card", { staticClass: "message-card mac-card" }, [
                    _c(
                      "div",
                      { staticClass: "message-card_content" },
                      [
                        _c(
                          "div",
                          { staticClass: "message-pop_wrap message-pop_right" },
                          [
                            _c("div", { staticClass: "message-pop" }, [
                              _c("p", { staticClass: "message-pop_text" }, [
                                _vm._v(
                                  "\n                                " +
                                    _vm._s(item.keyword) +
                                    "\n                            "
                                )
                              ])
                            ])
                          ]
                        ),
                        _vm._v(" "),
                        _vm._l(item.message, function(each, index) {
                          return _c(
                            "div",
                            {
                              key: index,
                              staticClass: "message-pop_wrap message-pop_left"
                            },
                            [
                              _c("div", { staticClass: "message-pop" }, [
                                _c("p", { staticClass: "message-pop_text" }, [
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(each.value) +
                                      "\n                            "
                                  )
                                ])
                              ])
                            ]
                          )
                        }),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "message-card-footer mac-card-footer"
                          },
                          [
                            _c(
                              "el-button",
                              {
                                staticClass: "setting-card-btn",
                                attrs: { type: "text" }
                              },
                              [
                                _vm._v(
                                  "\n                            设为默认\n                        "
                                )
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "el-button",
                              {
                                staticClass: "setting-card-btn",
                                attrs: { type: "text" }
                              },
                              [
                                _vm._v(
                                  "\n                            编辑\n                        "
                                )
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "el-button",
                              {
                                staticClass: "setting-card-btn",
                                attrs: { type: "text" }
                              },
                              [
                                _vm._v(
                                  "\n                            删除\n                        "
                                )
                              ]
                            )
                          ],
                          1
                        )
                      ],
                      2
                    )
                  ])
                ],
                1
              )
            })
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: { title: "提示", visible: _vm.dialogVisible, width: "30%" },
          on: {
            "update:visible": function($event) {
              _vm.dialogVisible = $event
            }
          }
        },
        [
          _c(
            "el-form",
            {
              attrs: {
                model: _vm.form,
                "label-position": "left",
                "label-width": "120px"
              }
            },
            [
              _c(
                "el-form-item",
                { attrs: { label: "活动名称" } },
                [
                  _c("el-input", {
                    attrs: { autocomplete: "off" },
                    model: {
                      value: _vm.form.keyword,
                      callback: function($$v) {
                        _vm.$set(_vm.form, "keyword", $$v)
                      },
                      expression: "form.keyword"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: "活动区域" } },
                _vm._l(_vm.form.message, function(item, index) {
                  return _c(
                    "el-input",
                    {
                      key: index,
                      attrs: {
                        placeholder: "输入内容..",
                        type: "textarea",
                        autosize: { minRows: 2, maxRows: 4 },
                        resize: "none"
                      },
                      model: {
                        value: item.message,
                        callback: function($$v) {
                          _vm.$set(item, "message", $$v)
                        },
                        expression: "item.message"
                      }
                    },
                    [
                      _c("el-button", {
                        attrs: { slot: "append", icon: "el-icon-search" },
                        slot: "append"
                      })
                    ],
                    1
                  )
                })
              )
            ],
            1
          ),
          _vm._v(" "),
          _c("span", [_vm._v("这是一段信息")]),
          _vm._v(" "),
          _c(
            "span",
            {
              staticClass: "dialog-footer",
              attrs: { slot: "footer" },
              slot: "footer"
            },
            [
              _c(
                "el-button",
                {
                  on: {
                    click: function($event) {
                      _vm.dialogVisible = false
                    }
                  }
                },
                [_vm._v("取 消")]
              ),
              _vm._v(" "),
              _c(
                "el-button",
                {
                  attrs: { type: "primary" },
                  on: {
                    click: function($event) {
                      _vm.dialogVisible = false
                    }
                  }
                },
                [_vm._v("确 定")]
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-343ccb8a", module.exports)
  }
}

/***/ })

});