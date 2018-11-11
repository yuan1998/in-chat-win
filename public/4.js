webpackJsonp([4],{

/***/ 208:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(79)
/* script */
var __vue_script__ = __webpack_require__(213)
/* template */
var __vue_template__ = __webpack_require__(214)
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
Component.options.__file = "resources/assets/js/pages/login.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-37b6a9c8", Component.options)
  } else {
    hotAPI.reload("data-v-37b6a9c8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(80);


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



/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            loging: false,
            formInline: {
                email: '',
                password: ''
            },
            ruleInline: {
                email: [{ required: true, message: 'Please fill in the user name', trigger: 'blur' }],
                password: [{ required: true, message: 'Please fill in the password.', trigger: 'blur' }, { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }]
            }
        };
    },

    methods: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapActions */])({
        _login: 'auth/login'
    }), {
        login: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
                var res;
                return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                this.loging = true;
                                _context.next = 3;
                                return this._login(this.formInline);

                            case 3:
                                res = _context.sent;

                                if (res === true) {
                                    this.$message({
                                        message: 'Success!',
                                        type: 'success'
                                    });
                                    this.$router.push('/');
                                } else {
                                    this.$message({
                                        message: res.data.message,
                                        type: 'error'
                                    });
                                }
                                this.loging = false;

                            case 6:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function login() {
                return _ref.apply(this, arguments);
            }

            return login;
        }(),
        handleSubmit: function handleSubmit(name) {
            var _this = this;

            this.$refs[name].validate(function (valid) {
                if (valid) {
                    _this.login();
                } else {
                    _this.$message({
                        message: 'Fail!',
                        type: 'error'
                    });
                }
            });
        }
    }),
    computed: {
        isLogin: function isLogin() {
            return this.$store.getters['auth/gerUserInfo'];
        }
    }

});

/***/ }),

/***/ 214:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "container-login-page" },
    [
      _c(
        "el-row",
        [
          _c(
            "el-col",
            { attrs: { span: 8 } },
            [
              _c(
                "el-form",
                {
                  ref: "form",
                  staticClass: "demo-dynamic",
                  attrs: { model: _vm.formInline, "label-width": "100px" }
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
                        label: "密码",
                        prop: "password",
                        rules: {
                          required: true,
                          message: "请输入密码",
                          trigger: "blur"
                        }
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
                    [
                      _c(
                        "el-button",
                        {
                          attrs: { loading: _vm.loging, type: "primary" },
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
    require("vue-hot-reload-api")      .rerender("data-v-37b6a9c8", module.exports)
  }
}

/***/ })

});