webpackJsonp([10],{

/***/ 208:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(78)
/* script */
var __vue_script__ = __webpack_require__(219)
/* template */
var __vue_template__ = __webpack_require__(220)
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
Component.options.__file = "resources/assets/js/components/setting-list.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-380e8e12", Component.options)
  } else {
    hotAPI.reload("data-v-380e8e12", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);


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

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {};
    },
    mounted: function mounted() {
        this.getList();
    },

    methods: {
        getList: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
                var res;
                return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.$store.dispatch('setting/getList');

                            case 2:
                                res = _context.sent;


                                if (res.status !== 200) {
                                    res.$message('Error!');
                                }

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getList() {
                return _ref.apply(this, arguments);
            }

            return getList;
        }()
    },
    computed: {
        list: function list() {
            return this.$store.getters['setting/list'];
        }
    }
});

/***/ }),

/***/ 220:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticStyle: { padding: "0 20px" } },
    [
      _vm.list === null
        ? _c("div", [_vm._v("\n        Loading....\n    ")])
        : _vm.list && _vm.list.length === 0
        ? _c("div", [_vm._v("\n        Empty...\n    ")])
        : _c(
            "el-row",
            { attrs: { gutter: 20 } },
            _vm._l(_vm.list, function(item) {
              return _c(
                "el-col",
                { key: item.id, attrs: { span: 6 } },
                [
                  _c("el-card", { staticClass: "setting-card mac-card" }, [
                    _c("span", [
                      _vm._v(
                        "\n                    " +
                          _vm._s(item.name) +
                          "\n                "
                      )
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "setting-card-footer" },
                      [
                        _c(
                          "el-button",
                          {
                            staticClass: "setting-card-btn",
                            attrs: { type: "text" }
                          },
                          [
                            _c(
                              "router-link",
                              { attrs: { to: "/admin/domain/" + item.id } },
                              [_vm._v("域名")]
                            )
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "el-button",
                          {
                            staticClass: "setting-card-btn",
                            attrs: { type: "text" }
                          },
                          [
                            _c(
                              "router-link",
                              { attrs: { to: "/admin/message/" + item.id } },
                              [_vm._v("短句")]
                            )
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "el-button",
                          {
                            staticClass: "setting-card-btn",
                            attrs: { type: "text" }
                          },
                          [
                            _c(
                              "router-link",
                              { attrs: { to: "/admin/setting/" + item.id } },
                              [_vm._v("配置")]
                            )
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ])
                ],
                1
              )
            })
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
    require("vue-hot-reload-api")      .rerender("data-v-380e8e12", module.exports)
  }
}

/***/ })

});