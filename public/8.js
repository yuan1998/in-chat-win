webpackJsonp([8],{

/***/ 209:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(78)
/* script */
var __vue_script__ = __webpack_require__(221)
/* template */
var __vue_template__ = __webpack_require__(222)
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
Component.options.__file = "resources/assets/js/components/setting.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-52d84aee", Component.options)
  } else {
    hotAPI.reload("data-v-52d84aee", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__setting_basis__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__setting_basis___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__setting_basis__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__setting_template__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__setting_template___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__setting_template__);


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
    components: {
        settingBasis: __WEBPACK_IMPORTED_MODULE_1__setting_basis___default.a,
        settingTemplate: __WEBPACK_IMPORTED_MODULE_2__setting_template___default.a
    },
    data: function data() {
        return {
            loading: false,
            current: 'basis'
        };
    },
    mounted: function mounted() {
        if (!this.settingData) {
            this.syncSetting(this.$route.params.id);
        }
    },

    methods: {
        syncSetting: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee(id) {
                var res;
                return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                this.loading = true;
                                _context.next = 3;
                                return this.$store.dispatch('setting/settingShow', id);

                            case 3:
                                res = _context.sent;

                                this.loading = false;

                            case 5:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function syncSetting(_x) {
                return _ref.apply(this, arguments);
            }

            return syncSetting;
        }(),
        handleSubmit: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee2() {
                var settingData, $store, res;
                return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                settingData = this.settingData, $store = this.$store;
                                _context2.next = 3;
                                return $store.dispatch('setting/update', settingData);

                            case 3:
                                res = _context2.sent;

                                console.log(res);
                                if (res.status === 200) {
                                    this.$notify({
                                        title: '恭喜',
                                        message: '你成功了!🤣',
                                        type: 'success'
                                    });
                                }

                            case 6:
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
        }()
    },
    computed: {
        settingData: function settingData() {
            return this.$store.getters['setting/current'](this.$route.params.id);
        }
    }

});

/***/ }),

/***/ 222:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "container-setting-info-component" },
    [
      _c("div", { staticClass: "component-header-title" }, [
        _vm._m(0),
        _vm._v(" "),
        _c("h1", [
          _vm._v(
            "\n            " +
              _vm._s(!_vm.settingData ? "QAQ" : _vm.settingData.name) +
              "\n        "
          )
        ])
      ]),
      _vm._v(" "),
      _vm.settingData
        ? _c(
            "div",
            { staticClass: "component-content" },
            [
              _c(
                "el-tabs",
                { attrs: { value: _vm.current } },
                [
                  _c(
                    "el-tab-pane",
                    { attrs: { label: "基础设置", name: "basis" } },
                    [_c("setting-basis", { attrs: { data: _vm.settingData } })],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-tab-pane",
                    { attrs: { label: "样式配置", name: "second" } },
                    [
                      _c("setting-template", {
                        attrs: { data: _vm.settingData.setting }
                      })
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "el-button",
        { attrs: { type: "primary" }, on: { click: _vm.handleSubmit } },
        [_vm._v("\n        Save\n    ")]
      ),
      _vm._v(" "),
      _vm.loading
        ? _c("div", [_vm._v("\n        loading..\n    ")])
        : !_vm.settingData
        ? _c("div", [_vm._v("\n        Data is Null.\n    ")])
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("i", { staticClass: "el-icon y-icon" }, [
      _c("img", { attrs: { src: __webpack_require__(223), alt: "" } })
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-52d84aee", module.exports)
  }
}

/***/ }),

/***/ 223:
/***/ (function(module, exports) {

module.exports = "/images/back.png?75d95f9aa55c237c7e2b8cb8d15fda0d";

/***/ }),

/***/ 225:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(78)
/* script */
var __vue_script__ = __webpack_require__(226)
/* template */
var __vue_template__ = __webpack_require__(227)
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
Component.options.__file = "resources/assets/js/components/setting-basis.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9e186d0c", Component.options)
  } else {
    hotAPI.reload("data-v-9e186d0c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__transfer_panel__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__transfer_panel___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__transfer_panel__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    name: 'settingBasis',
    componentName: "settingBasis",
    components: {
        transferPanel: __WEBPACK_IMPORTED_MODULE_0__transfer_panel___default.a
    },
    props: {
        data: Object
    },
    data: function data() {
        return {};
    },

    methods: {
        addQuery: function addQuery(query) {
            var arr = this.data['list-data'];
            arr.push(query);
            this.$refs['transfer'].clearQuery();
        },
        deleteChecked: function deleteChecked(arr) {
            var _this = this;

            var data = this.data['list-data'];
            arr.forEach(function (each) {
                var index = data.findIndex(function (v) {
                    return v === each;
                });

                if (index !== -1) {
                    data.splice(index, 1);
                } else {
                    _this.$message({
                        type: 'warning',
                        message: 'has ' + each + ' on found.'
                    });
                }
            });
        }
    }

});

/***/ }),

/***/ 227:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "el-form",
        {
          ref: "form",
          attrs: {
            "label-position": "right",
            "label-width": "80px",
            model: _vm.data
          }
        },
        [
          _c(
            "el-row",
            { attrs: { gutter: 20 } },
            [
              _c(
                "el-col",
                { attrs: { span: 12 } },
                [
                  _c(
                    "el-form-item",
                    { attrs: { label: "名称" } },
                    [
                      _c("el-input", {
                        model: {
                          value: _vm.data.name,
                          callback: function($$v) {
                            _vm.$set(_vm.data, "name", $$v)
                          },
                          expression: "data.name"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    { attrs: { label: "描述" } },
                    [
                      _c("el-input", {
                        model: {
                          value: _vm.data.description,
                          callback: function($$v) {
                            _vm.$set(_vm.data, "description", $$v)
                          },
                          expression: "data.description"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    { attrs: { label: "List Status" } },
                    [
                      _c("el-switch", {
                        model: {
                          value: _vm.data["list-open"],
                          callback: function($$v) {
                            _vm.$set(_vm.data, "list-open", $$v)
                          },
                          expression: "data['list-open']"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    { attrs: { label: "List Model" } },
                    [
                      _c(
                        "el-select",
                        {
                          attrs: { placeholder: "List Model" },
                          model: {
                            value: _vm.data["list-model"],
                            callback: function($$v) {
                              _vm.$set(_vm.data, "list-model", $$v)
                            },
                            expression: "data['list-model']"
                          }
                        },
                        [
                          _c("el-option", {
                            attrs: { label: "黑名单", value: "black" }
                          }),
                          _vm._v(" "),
                          _c("el-option", {
                            attrs: { label: "白名单", value: "white" }
                          })
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-col",
                { attrs: { span: 12 } },
                [
                  _c(
                    "el-form-item",
                    { attrs: { label: "List Data" } },
                    [
                      _c(
                        "transfer-panel",
                        {
                          ref: "transfer",
                          attrs: {
                            title: "名单",
                            filterable: true,
                            data: _vm.data["list-data"]
                          },
                          on: {
                            "delete-checked": _vm.deleteChecked,
                            add: _vm.addQuery
                          }
                        },
                        [
                          _c("el-button", { attrs: { size: "small" } }, [
                            _vm._v(
                              "\n                            test\n                        "
                            )
                          ])
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
    require("vue-hot-reload-api")      .rerender("data-v-9e186d0c", module.exports)
  }
}

/***/ }),

/***/ 228:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(78)
/* script */
var __vue_script__ = __webpack_require__(229)
/* template */
var __vue_template__ = __webpack_require__(230)
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
Component.options.__file = "resources/assets/js/components/transfer-panel.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b5213b0e", Component.options)
  } else {
    hotAPI.reload("data-v-b5213b0e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 229:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    name: 'transferPanel',
    componentName: 'transferPanel',
    props: {
        data: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        placeholder: String,
        title: String,
        filterable: Boolean,
        format: Object,
        defaultChecked: Array,
        props: Object
    },

    data: function data() {
        return {
            checked: [],
            allChecked: false,
            query: '',
            inputHover: false,
            checkChangeByUser: true
        };
    },
    mounted: function mounted() {
        console.log('run: transfer panel');
    },


    watch: {
        checked: function checked(val, oldVal) {
            this.updateAllChecked();
            if (this.checkChangeByUser) {
                var movedKeys = val.concat(oldVal).filter(function (v) {
                    return val.indexOf(v) === -1 || oldVal.indexOf(v) === -1;
                });
                this.$emit('checked-change', val, movedKeys);
            } else {
                this.$emit('checked-change', val);
                this.checkChangeByUser = true;
            }
        },
        data: function data() {
            console.log('this ?');
            var checked = [];
            var filteredDataKeys = this.filteredData.map(function (item) {
                return item;
            });
            console.log(this.checked, '321');
            this.checked.forEach(function (item) {
                if (filteredDataKeys.indexOf(item) > -1) {
                    checked.push(item);
                }
            });
            this.checkChangeByUser = false;
            this.checked = checked;
        },
        checkableData: function checkableData() {
            this.updateAllChecked();
        },


        defaultChecked: {
            immediate: true,
            handler: function handler(val, oldVal) {
                if (!val) return;

                if (oldVal && val.length === oldVal.length && val.every(function (item) {
                    return oldVal.indexOf(item) > -1;
                })) return;
                var checked = [];
                var checkableDataKeys = this.checkableData.map(function (item) {
                    return item;
                });
                console.log('this is val');
                console.log(val);
                val.forEach(function (item) {
                    if (checkableDataKeys.indexOf(item) > -1) {
                        checked.push(item);
                    }
                });
                this.checkChangeByUser = false;
                this.checked = checked;
            }
        }
    },

    computed: {
        filteredData: function filteredData() {
            var _this = this;

            return this.data.filter(function (item) {
                var label = item;
                return label.toLowerCase().indexOf(_this.query.toLowerCase()) > -1;
            });
        },
        queryOf: function queryOf() {
            var _this2 = this;

            if (this.query === '') return true;

            return this.data.findIndex(function (item) {
                return item.toLowerCase() === _this2.query.toLowerCase();
            }) !== -1;
        },
        checkableData: function checkableData() {
            return this.filteredData;
        },
        checkedSummary: function checkedSummary() {
            var checkedLength = this.checked.length;
            var dataLength = this.data.length;
            return checkedLength + '/' + dataLength;
        },
        isIndeterminate: function isIndeterminate() {
            var checkedLength = this.checked.length;
            return checkedLength > 0 && checkedLength < this.checkableData.length;
        },
        hasNoMatch: function hasNoMatch() {
            return this.query.length > 0 && this.filteredData.length === 0;
        },
        inputIcon: function inputIcon() {
            return this.query.length > 0 && this.inputHover ? 'circle-close' : 'search';
        },
        plusIcon: function plusIcon() {
            return this.hasNoMatch && this.inputHover;
        },
        labelProp: function labelProp() {
            return 'label';
        },
        keyProp: function keyProp() {
            return 'key';
        },
        disabledProp: function disabledProp() {
            return 'disabled';
        },
        hasFooter: function hasFooter() {
            return !!this.$slots.default;
        }
    },

    methods: {
        updateAllChecked: function updateAllChecked() {
            var _this3 = this;

            var checkableDataKeys = this.checkableData.map(function (item) {
                return item;
            });
            this.allChecked = checkableDataKeys.length > 0 && checkableDataKeys.every(function (item) {
                return _this3.checked.indexOf(item) > -1;
            });
        },
        handleAllCheckedChange: function handleAllCheckedChange(value) {
            this.checked = value ? this.checkableData.map(function (item) {
                return item;
            }) : [];
        },
        clearQuery: function clearQuery() {
            if (this.inputIcon === 'circle-close') {
                this.query = '';
            }
        },
        addQuery: function addQuery() {
            if (!this.queryOf) {
                this.$emit('add', this.query);
            }
        },
        deleteChecked: function deleteChecked() {
            if (this.checked.length !== 0) {
                this.$emit('delete-checked', this.checked);
                this.checked = [];
            }
        }
    }
});

/***/ }),

/***/ 230:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "el-transfer-panel" }, [
    _c(
      "p",
      { staticClass: "el-transfer-panel__header" },
      [
        _c(
          "el-checkbox",
          {
            attrs: { indeterminate: _vm.isIndeterminate },
            on: { change: _vm.handleAllCheckedChange },
            model: {
              value: _vm.allChecked,
              callback: function($$v) {
                _vm.allChecked = $$v
              },
              expression: "allChecked"
            }
          },
          [
            _vm._v("\n            " + _vm._s(_vm.title) + "\n            "),
            _c("span", [_vm._v(_vm._s(_vm.checkedSummary))])
          ]
        )
      ],
      1
    ),
    _vm._v(" "),
    _c(
      "div",
      {
        class: [
          "el-transfer-panel__body",
          _vm.hasFooter ? "is-with-footer" : ""
        ]
      },
      [
        _vm.filterable
          ? _c(
              "el-input",
              {
                staticClass: "el-transfer-panel__filter",
                staticStyle: { "text-align": "left" },
                attrs: { size: "small", placeholder: _vm.placeholder },
                nativeOn: {
                  mouseenter: function($event) {
                    _vm.inputHover = true
                  },
                  mouseleave: function($event) {
                    _vm.inputHover = false
                  },
                  keyup: function($event) {
                    if (
                      !("button" in $event) &&
                      _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                    ) {
                      return null
                    }
                    return _vm.addQuery($event)
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
                }),
                _vm._v(" "),
                _c("i", {
                  staticClass: "el-input__icon",
                  class: { "el-icon-circle-plus": !_vm.queryOf },
                  attrs: { slot: "suffix" },
                  on: { click: _vm.addQuery },
                  slot: "suffix"
                })
              ]
            )
          : _vm._e(),
        _vm._v(" "),
        _c(
          "el-checkbox-group",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: !_vm.hasNoMatch && _vm.data.length > 0,
                expression: "!hasNoMatch && data.length > 0"
              }
            ],
            staticClass: "el-transfer-panel__list",
            class: { "is-filterable": _vm.filterable },
            model: {
              value: _vm.checked,
              callback: function($$v) {
                _vm.checked = $$v
              },
              expression: "checked"
            }
          },
          _vm._l(_vm.filteredData, function(item, index) {
            return _c(
              "el-checkbox",
              {
                key: index,
                staticClass: "el-transfer-panel__item",
                attrs: { label: item }
              },
              [_vm._v("\n                " + _vm._s(item) + "\n            ")]
            )
          })
        ),
        _vm._v(" "),
        _c(
          "p",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.hasNoMatch,
                expression: "hasNoMatch"
              }
            ],
            staticClass: "el-transfer-panel__empty"
          },
          [_vm._v("无匹配数据")]
        ),
        _vm._v(" "),
        _c(
          "p",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.data.length === 0 && !_vm.hasNoMatch,
                expression: "data.length === 0 && !hasNoMatch"
              }
            ],
            staticClass: "el-transfer-panel__empty"
          },
          [_vm._v("么有数据")]
        )
      ],
      1
    ),
    _vm._v(" "),
    _vm.hasFooter
      ? _c(
          "p",
          { staticClass: "el-transfer-panel__footer" },
          [
            _c(
              "el-button",
              {
                attrs: { size: "small", disabled: _vm.checked.length === 0 },
                on: { click: _vm.deleteChecked }
              },
              [_vm._v("\n            删除\n        ")]
            )
          ],
          1
        )
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-b5213b0e", module.exports)
  }
}

/***/ }),

/***/ 232:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(78)
/* script */
var __vue_script__ = __webpack_require__(233)
/* template */
var __vue_template__ = __webpack_require__(234)
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

/***/ 233:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    componentName: 'SettingTemplate',
    name: 'SettingTemplate',
    props: {
        data: Object
    },
    data: function data() {
        return {};
    },

    methods: {}
});

/***/ }),

/***/ 234:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "setting-tab-component" },
    [
      _c(
        "el-form",
        {
          ref: "form",
          attrs: {
            "label-position": "left",
            "label-width": "150px",
            model: _vm.data
          }
        },
        [
          _c(
            "el-form-item",
            { attrs: { label: "再次访问跳转" } },
            [
              _c(
                "el-radio-group",
                {
                  model: {
                    value: _vm.data.again,
                    callback: function($$v) {
                      _vm.$set(_vm.data, "again", $$v)
                    },
                    expression: "data.again"
                  }
                },
                [
                  _c("el-radio", { attrs: { label: true } }, [_vm._v("开启")]),
                  _vm._v(" "),
                  _c("el-radio", { attrs: { label: false } }, [_vm._v("关闭")])
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "背景颜色" } },
            [
              _c("el-color-picker", {
                model: {
                  value: _vm.data.bgColor,
                  callback: function($$v) {
                    _vm.$set(_vm.data, "bgColor", $$v)
                  },
                  expression: "data.bgColor"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "按钮颜色" } },
            [
              _c("el-color-picker", {
                model: {
                  value: _vm.data.buttonColor,
                  callback: function($$v) {
                    _vm.$set(_vm.data, "buttonColor", $$v)
                  },
                  expression: "data.buttonColor"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "按钮文字" } },
            [
              _c("el-input", {
                model: {
                  value: _vm.data.buttonText,
                  callback: function($$v) {
                    _vm.$set(_vm.data, "buttonText", $$v)
                  },
                  expression: "data.buttonText"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "底部颜色" } },
            [
              _c("el-color-picker", {
                model: {
                  value: _vm.data.footerColor,
                  callback: function($$v) {
                    _vm.$set(_vm.data, "footerColor", $$v)
                  },
                  expression: "data.footerColor"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "底部文字颜色" } },
            [
              _c("el-color-picker", {
                model: {
                  value: _vm.data.footerColorText,
                  callback: function($$v) {
                    _vm.$set(_vm.data, "footerColorText", $$v)
                  },
                  expression: "data.footerColorText"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "底部文字" } },
            [
              _c("el-input", {
                model: {
                  value: _vm.data.footerText,
                  callback: function($$v) {
                    _vm.$set(_vm.data, "footerText", $$v)
                  },
                  expression: "data.footerText"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "输入框颜色" } },
            [
              _c("el-color-picker", {
                model: {
                  value: _vm.data.inputColor,
                  callback: function($$v) {
                    _vm.$set(_vm.data, "inputColor", $$v)
                  },
                  expression: "data.inputColor"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "输入框文字颜色" } },
            [
              _c("el-color-picker", {
                model: {
                  value: _vm.data.inputColorText,
                  callback: function($$v) {
                    _vm.$set(_vm.data, "inputColorText", $$v)
                  },
                  expression: "data.inputColorText"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "输入框文字" } },
            [
              _c("el-input", {
                model: {
                  value: _vm.data.inputText,
                  callback: function($$v) {
                    _vm.$set(_vm.data, "inputText", $$v)
                  },
                  expression: "data.inputText"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "输入框(容器)颜色" } },
            [
              _c("el-color-picker", {
                model: {
                  value: _vm.data.inputWrapColor,
                  callback: function($$v) {
                    _vm.$set(_vm.data, "inputWrapColor", $$v)
                  },
                  expression: "data.inputWrapColor"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "左侧头像" } },
            [
              _c("el-input", {
                model: {
                  value: _vm.data.lmAvatar,
                  callback: function($$v) {
                    _vm.$set(_vm.data, "lmAvatar", $$v)
                  },
                  expression: "data.lmAvatar"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "左侧气泡颜色" } },
            [
              _c("el-color-picker", {
                model: {
                  value: _vm.data.lmColor,
                  callback: function($$v) {
                    _vm.$set(_vm.data, "lmColor", $$v)
                  },
                  expression: "data.lmColor"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "左侧文字颜色" } },
            [
              _c("el-color-picker", {
                model: {
                  value: _vm.data.lmColorText,
                  callback: function($$v) {
                    _vm.$set(_vm.data, "lmColorText", $$v)
                  },
                  expression: "data.lmColorText"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "左侧名称" } },
            [
              _c("el-input", {
                model: {
                  value: _vm.data.lmName,
                  callback: function($$v) {
                    _vm.$set(_vm.data, "lmName", $$v)
                  },
                  expression: "data.lmName"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "左侧预览文字" } },
            [
              _c("el-input", {
                model: {
                  value: _vm.data.lmText,
                  callback: function($$v) {
                    _vm.$set(_vm.data, "lmText", $$v)
                  },
                  expression: "data.lmText"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "主题颜色" } },
            [
              _c("el-color-picker", {
                model: {
                  value: _vm.data.mainColor,
                  callback: function($$v) {
                    _vm.$set(_vm.data, "mainColor", $$v)
                  },
                  expression: "data.mainColor"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "文字主颜色" } },
            [
              _c("el-color-picker", {
                model: {
                  value: _vm.data.mainColorText,
                  callback: function($$v) {
                    _vm.$set(_vm.data, "mainColorText", $$v)
                  },
                  expression: "data.mainColorText"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "标题" } },
            [
              _c("el-input", {
                model: {
                  value: _vm.data.name,
                  callback: function($$v) {
                    _vm.$set(_vm.data, "name", $$v)
                  },
                  expression: "data.name"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "右侧颜色" } },
            [
              _c("el-color-picker", {
                model: {
                  value: _vm.data.rmColor,
                  callback: function($$v) {
                    _vm.$set(_vm.data, "rmColor", $$v)
                  },
                  expression: "data.rmColor"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "右侧文字颜色" } },
            [
              _c("el-color-picker", {
                model: {
                  value: _vm.data.rmColorText,
                  callback: function($$v) {
                    _vm.$set(_vm.data, "rmColorText", $$v)
                  },
                  expression: "data.rmColorText"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "右侧预览文字" } },
            [
              _c("el-input", {
                model: {
                  value: _vm.data.rmText,
                  callback: function($$v) {
                    _vm.$set(_vm.data, "rmText", $$v)
                  },
                  expression: "data.rmText"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "标识码" } },
            [
              _c("el-input", {
                model: {
                  value: _vm.data.tag,
                  callback: function($$v) {
                    _vm.$set(_vm.data, "tag", $$v)
                  },
                  expression: "data.tag"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "电话" } },
            [
              _c(
                "el-input",
                {
                  model: {
                    value: _vm.data.tel,
                    callback: function($$v) {
                      _vm.$set(_vm.data, "tel", $$v)
                    },
                    expression: "data.tel"
                  }
                },
                [
                  _c("i", {
                    staticClass: "el-input__icon el-icon-phone",
                    attrs: { slot: "suffix" },
                    slot: "suffix"
                  })
                ]
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "弹出等待时间" } },
            [
              _c(
                "el-input",
                {
                  model: {
                    value: _vm.data.waitTime,
                    callback: function($$v) {
                      _vm.$set(_vm.data, "waitTime", $$v)
                    },
                    expression: "data.waitTime"
                  }
                },
                [
                  _c("i", {
                    staticClass: "el-input__icon el-icon-time",
                    attrs: { slot: "suffix" },
                    slot: "suffix"
                  })
                ]
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
    require("vue-hot-reload-api")      .rerender("data-v-024d0dee", module.exports)
  }
}

/***/ })

});