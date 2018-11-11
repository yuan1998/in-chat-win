webpackJsonp([0],{

/***/ 238:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_assist__ = __webpack_require__(49);


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
            form: Object(__WEBPACK_IMPORTED_MODULE_1__utils_assist__["a" /* cloneOf */])(defaultForm),
            submitting: false
        };
    },
    mounted: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
            var $store, $route, settingCurrent, id, current, res, _res;

            return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            $store = this.$store, $route = this.$route, settingCurrent = this.settingCurrent;
                            id = $route.params.id;
                            current = settingCurrent;

                            this.loading = true;

                            if (current) {
                                _context.next = 10;
                                break;
                            }

                            _context.next = 7;
                            return $store.dispatch('setting/settingShow', id);

                        case 7:
                            res = _context.sent;

                            console.log('Current', res);
                            if (res.status !== 200) {
                                id = null;
                            }

                        case 10:
                            if (!(id !== null)) {
                                _context.next = 17;
                                break;
                            }

                            _context.next = 13;
                            return $store.dispatch('message/current', id);

                        case 13:
                            _res = _context.sent;

                            console.log('Id', _res);
                            _context.next = 18;
                            break;

                        case 17:
                            throw new Error('Error . id error');

                        case 18:
                            this.loading = false;

                        case 19:
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
        },
        addMessageItem: function addMessageItem() {
            var _this = this;

            this.form.message.push(Object(__WEBPACK_IMPORTED_MODULE_1__utils_assist__["a" /* cloneOf */])(defaultMessage));
            this.$nextTick(function () {
                _this.containScrollBottom('contain');
            });
        },
        removeMessageItem: function removeMessageItem(index) {
            this.form.message.splice(index, 1);
        },
        containScrollBottom: function containScrollBottom(ref) {
            var el = this.$refs[ref];
            el.scrollTop = el.scrollHeight;
        },
        handleUpdate: function handleUpdate(item) {
            this.form = Object(__WEBPACK_IMPORTED_MODULE_1__utils_assist__["a" /* cloneOf */])(item);
            this.dialogVisible = true;
        },
        validatorKeyword: function validatorKeyword(rule, value, callback) {
            if (value === '') {
                callback(new Error('输入内容!'));
            } else if (this.$store.getters['message/nameExists'](value, this.form.id)) {
                callback(new Error('关键字已存在'));
            } else {
                callback();
            }
        },
        handleSubmit: function handleSubmit(ref) {
            var _this2 = this;

            var $refs = this.$refs,
                form = this.form,
                handleSubmitCreate = this.handleSubmitCreate,
                handleSubmitUpdate = this.handleSubmitUpdate;


            $refs[ref].validate(function (valid) {
                if (valid) {
                    form.id === undefined ? handleSubmitCreate() : handleSubmitUpdate();
                } else {
                    _this2.$message.error('不行哦，Message is Empty.');
                    return false;
                }
            });
        },
        handleSubmitCreate: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee2() {
                var $store, form, closeDialog, res;
                return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                $store = this.$store, form = this.form, closeDialog = this.closeDialog;

                                this.submitting = true;

                                _context2.next = 4;
                                return $store.dispatch('message/store', form);

                            case 4:
                                res = _context2.sent;


                                if (res.status === 200) {
                                    this.$notify({
                                        title: '恭喜',
                                        message: form.keyword + ' 诞生了!',
                                        type: 'success'
                                    });
                                    closeDialog();
                                }

                            case 6:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function handleSubmitCreate() {
                return _ref2.apply(this, arguments);
            }

            return handleSubmitCreate;
        }(),
        handleSubmitUpdate: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee3() {
                var $store, form, closeDialog, res;
                return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                $store = this.$store, form = this.form, closeDialog = this.closeDialog;

                                this.submitting = true;

                                _context3.next = 4;
                                return $store.dispatch('message/update', { id: form.id, data: form });

                            case 4:
                                res = _context3.sent;


                                if (res.status === 200) {
                                    this.$notify({
                                        title: '恭喜',
                                        message: '你改变了' + form.keyword,
                                        type: 'success'
                                    });
                                    closeDialog();
                                }

                            case 6:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function handleSubmitUpdate() {
                return _ref3.apply(this, arguments);
            }

            return handleSubmitUpdate;
        }(),
        handleDelete: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee4(item) {
                var res;
                return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                item.delete_btn_loading = true;
                                _context4.next = 3;
                                return this.$store.dispatch('message/destroy', item.id);

                            case 3:
                                res = _context4.sent;


                                this.$notify({
                                    title: '恭喜',
                                    message: '你杀死了' + item.keyword,
                                    type: 'success'
                                });

                            case 5:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function handleDelete(_x) {
                return _ref4.apply(this, arguments);
            }

            return handleDelete;
        }(),
        handleSetDefault: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee5(id) {
                var res;
                return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.next = 2;
                                return this.$store.dispatch('setting/setDefault', id);

                            case 2:
                                res = _context5.sent;


                                console.log(res);
                                if (res.status === 200) {
                                    this.$notify({
                                        title: 'Congratulations',
                                        message: 'He became king.',
                                        type: 'success'
                                    });
                                }

                            case 5:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function handleSetDefault(_x2) {
                return _ref5.apply(this, arguments);
            }

            return handleSetDefault;
        }(),
        closeDialog: function closeDialog() {
            this.submitting = false;
            this.dialogVisible = false;
        },
        closedDialog: function closedDialog() {
            this.$refs['form'].resetFields();
        },
        closeDialogBefore: function closeDialogBefore(done) {
            if (!this.submitting) {
                done();
            }
        }
    },
    computed: {
        isCurrent: function isCurrent() {
            return this.$store.getters['message/current'](this.$route.params.id);
        },
        settingCurrent: function settingCurrent() {
            return this.$store.getters['setting/current'](this.$route.params.id);
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
        },
        currentDefault: function currentDefault() {
            return this.settingCurrent.default_message;
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
                {
                  key: item.id,
                  staticStyle: { "margin-bottom": "15px" },
                  attrs: { span: 8 }
                },
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
                                _c("p", {
                                  staticClass: "message-pop_text",
                                  domProps: { innerHTML: _vm._s(each.value) }
                                })
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
                                attrs: {
                                  disabled: _vm.currentDefault === item.id,
                                  type: "text"
                                },
                                on: {
                                  click: function($event) {
                                    _vm.handleSetDefault(item.id)
                                  }
                                }
                              },
                              [
                                _vm._v(
                                  "\n                            设定默认\n                        "
                                )
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "el-button",
                              {
                                staticClass: "setting-card-btn",
                                attrs: { type: "text" },
                                on: {
                                  click: function($event) {
                                    _vm.handleUpdate(item)
                                  }
                                }
                              },
                              [
                                _vm._v(
                                  "\n                            变更\n                        "
                                )
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "el-popover",
                              {
                                attrs: { placement: "top", width: "160" },
                                model: {
                                  value: item.model_show,
                                  callback: function($$v) {
                                    _vm.$set(item, "model_show", $$v)
                                  },
                                  expression: "item.model_show"
                                }
                              },
                              [
                                _c("p", [
                                  _vm._v("这是一段内容这是一段内容确定删除吗？")
                                ]),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  {
                                    staticStyle: {
                                      "text-align": "right",
                                      margin: "0"
                                    }
                                  },
                                  [
                                    _c(
                                      "el-button",
                                      {
                                        attrs: { size: "mini", type: "text" },
                                        on: {
                                          click: function($event) {
                                            item.model_show = false
                                          }
                                        }
                                      },
                                      [_vm._v("取消")]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "el-button",
                                      {
                                        attrs: {
                                          type: "primary",
                                          size: "mini",
                                          loading: item.delete_btn_loading
                                        },
                                        on: {
                                          click: function($event) {
                                            _vm.handleDelete(item)
                                          }
                                        }
                                      },
                                      [
                                        _vm._v(
                                          "确定\n                                "
                                        )
                                      ]
                                    )
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "el-button",
                                  {
                                    staticClass: "setting-card-btn",
                                    attrs: { slot: "reference", type: "text" },
                                    slot: "reference"
                                  },
                                  [
                                    _vm._v(
                                      "\n                                削除\n                            "
                                    )
                                  ]
                                )
                              ],
                              1
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
          ref: "dialog",
          attrs: { title: "提示", visible: _vm.dialogVisible, width: "50%" },
          on: {
            "update:visible": function($event) {
              _vm.dialogVisible = $event
            },
            closed: _vm.closedDialog,
            "before-close": _vm.closeDialogBefore
          }
        },
        [
          _c(
            "el-form",
            {
              ref: "form",
              attrs: {
                model: _vm.form,
                "label-position": "top",
                "label-width": "120px"
              }
            },
            [
              _c(
                "el-form-item",
                {
                  attrs: {
                    label: "活动名称",
                    prop: "keyword",
                    rules: [
                      {
                        validator: _vm.validatorKeyword,
                        trigger: ["blur", "change"]
                      }
                    ]
                  }
                },
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
                "h1",
                [
                  _vm._v("\n                回复短句\n                "),
                  _c(
                    "el-button",
                    {
                      attrs: { icon: "el-icon-circle-plus", type: "text" },
                      on: { click: _vm.addMessageItem }
                    },
                    [_vm._v("\n                    加增\n                ")]
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                { ref: "contain", staticClass: "message-value-container" },
                _vm._l(_vm.form.message, function(item, index) {
                  return _c(
                    "el-form-item",
                    {
                      key: index,
                      staticClass: "message-value-form-item",
                      attrs: {
                        rules: {
                          required: true,
                          message: "不行哦",
                          trigger: "blur"
                        },
                        prop: "message." + index + ".value"
                      }
                    },
                    [
                      _c(
                        "div",
                        {
                          staticClass: "message-value-label",
                          attrs: { slot: "label" },
                          slot: "label"
                        },
                        [
                          _c(
                            "el-button",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value:
                                    _vm.form.message &&
                                    _vm.form.message.length > 1,
                                  expression:
                                    "form.message && form.message.length > 1"
                                }
                              ],
                              attrs: {
                                icon: "el-icon-circle-close",
                                type: "text"
                              },
                              on: {
                                click: function($event) {
                                  _vm.removeMessageItem(index)
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n                            削除\n                        "
                              )
                            ]
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("el-input", {
                        attrs: {
                          placeholder: "输入内容..",
                          type: "textarea",
                          autosize: { minRows: 2, maxRows: 4 },
                          resize: "none"
                        },
                        model: {
                          value: item.value,
                          callback: function($$v) {
                            _vm.$set(item, "value", $$v)
                          },
                          expression: "item.value"
                        }
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
                [_vm._v("\n                取 消\n            ")]
              ),
              _vm._v(" "),
              _c(
                "el-button",
                {
                  attrs: { loading: _vm.submitting, type: "primary" },
                  on: {
                    click: function($event) {
                      _vm.handleSubmit("form")
                    }
                  }
                },
                [_vm._v("\n                确 定\n            ")]
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

/***/ }),

/***/ 50:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(79)
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


/***/ })

});