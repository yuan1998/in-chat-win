webpackJsonp([7],{

/***/ 218:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(81)
/* script */
var __vue_script__ = __webpack_require__(232)
/* template */
var __vue_template__ = __webpack_require__(233)
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
Component.options.__file = "resources/assets/js/pages/signup.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-266ab516", Component.options)
  } else {
    hotAPI.reload("data-v-266ab516", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 232:
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



/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            submitting: false,
            formInline: {
                email: '',
                name: '',
                password: '',
                confirmPassword: ''
            }
        };
    },

    methods: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapActions */])({
        aSignup: 'auth/signup'
    }), {
        validateConfirmPassword: function validateConfirmPassword(rule, value, callback) {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.formInline.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        },
        handleSubmit: function handleSubmit(ref) {
            var _this = this;

            var $refs = this.$refs,
                formInline = this.formInline,
                $notify = this.$notify,
                $router = this.$router,
                aSignup = this.aSignup;


            $refs[ref].validate(function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee(value) {
                    var res;
                    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    if (!value) {
                                        _context.next = 8;
                                        break;
                                    }

                                    _this.submitting = true;
                                    _context.next = 4;
                                    return aSignup(formInline);

                                case 4:
                                    res = _context.sent;


                                    if (res.status === 201) {
                                        $notify({
                                            message: '注册成功',
                                            title: '恭喜',
                                            type: 'success'
                                        });
                                        $router.push('/admin');
                                    } else {
                                        $notify.error({
                                            message: '发生错误.',
                                            title: '糟糕'
                                        });
                                    }

                                    _context.next = 8;
                                    break;

                                case 8:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this);
                }));

                return function (_x) {
                    return _ref.apply(this, arguments);
                };
            }());
        }
    })
});

/***/ }),

/***/ 233:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "container-auth-page" },
    [
      _c(
        "el-row",
        [
          _c(
            "el-col",
            {
              attrs: {
                lg: { span: 8, offset: 8 },
                md: { span: 12, offset: 6 },
                sm: { span: 24 }
              }
            },
            [
              _c(
                "el-form",
                {
                  ref: "form",
                  staticClass: "login-form",
                  attrs: {
                    "label-position": "top",
                    model: _vm.formInline,
                    "label-width": "100px"
                  }
                },
                [
                  _c(
                    "el-form-item",
                    {
                      attrs: {
                        prop: "email",
                        label: "邮箱",
                        rules: [
                          {
                            required: true,
                            message: "请输入邮箱地址",
                            trigger: "blur"
                          },
                          {
                            type: "email",
                            message: "请输入正确的邮箱地址",
                            trigger: "blur"
                          }
                        ]
                      }
                    },
                    [
                      _c("el-input", {
                        attrs: { name: "email" },
                        model: {
                          value: _vm.formInline.email,
                          callback: function($$v) {
                            _vm.$set(_vm.formInline, "email", $$v)
                          },
                          expression: "formInline.email"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    {
                      attrs: {
                        prop: "name",
                        label: "用户名",
                        rules: {
                          required: true,
                          message: "请输入用户名",
                          trigger: "blur"
                        }
                      }
                    },
                    [
                      _c("el-input", {
                        attrs: { name: "name" },
                        model: {
                          value: _vm.formInline.name,
                          callback: function($$v) {
                            _vm.$set(_vm.formInline, "name", $$v)
                          },
                          expression: "formInline.name"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    {
                      attrs: {
                        label: "密码",
                        prop: "password",
                        rules: [
                          {
                            required: true,
                            message: "请输入密码",
                            trigger: "blur"
                          },
                          {
                            min: 8,
                            message: "长度不能少于 8 字符",
                            trigger: "blur"
                          }
                        ]
                      }
                    },
                    [
                      _c("el-input", {
                        attrs: { name: "password", type: "password" },
                        model: {
                          value: _vm.formInline.password,
                          callback: function($$v) {
                            _vm.$set(_vm.formInline, "password", $$v)
                          },
                          expression: "formInline.password"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    {
                      attrs: {
                        label: "确认密码",
                        prop: "confirmPassword",
                        rules: [
                          {
                            required: true,
                            message: "请输入密码",
                            trigger: "blur"
                          },
                          {
                            validator: _vm.validateConfirmPassword,
                            trigger: "blur"
                          }
                        ]
                      }
                    },
                    [
                      _c("el-input", {
                        attrs: { name: "confirmPassword", type: "password" },
                        model: {
                          value: _vm.formInline.confirmPassword,
                          callback: function($$v) {
                            _vm.$set(_vm.formInline, "confirmPassword", $$v)
                          },
                          expression: "formInline.confirmPassword"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    [
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
                        [_vm._v("提交")]
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
    require("vue-hot-reload-api")      .rerender("data-v-266ab516", module.exports)
  }
}

/***/ })

});