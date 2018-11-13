<template>
    <div class="el-transfer-panel">
        <p class="el-transfer-panel__header">
            <el-checkbox
                    v-model="allChecked"
                    @change="handleAllCheckedChange"
                    :indeterminate="isIndeterminate">
                {{ title }}
                <span>{{ checkedSummary }}</span>
            </el-checkbox>
        </p>

        <div :class="['el-transfer-panel__body', hasFooter ? 'is-with-footer' : '']">
            <el-input
                    class="el-transfer-panel__filter"
                    style="text-align: left;"
                    v-model="query"
                    size="small"
                    :placeholder="placeholder"
                    @mouseenter.native="inputHover = true"
                    @mouseleave.native="inputHover = false"
                    @keyup.enter.native="addQuery"
                    v-if="filterable">
                <i slot="prefix"
                   :class="['el-input__icon', 'el-icon-' + inputIcon]"
                   @click="clearQuery"
                ></i>
                <i slot="suffix"
                   class="el-input__icon"
                   :class="{ 'el-icon-circle-plus' : !queryOf}"
                   @click="addQuery"
                ></i>
            </el-input>
            <el-checkbox-group
                    v-model="checked"
                    v-show="!hasNoMatch && data.length > 0"
                    :class="{ 'is-filterable': filterable }"
                    class="el-transfer-panel__list">
                <el-checkbox
                        class="el-transfer-panel__item"
                        :label="item"
                        :key="index"
                        v-for="(item , index) in filteredData">
                    {{item}}
                </el-checkbox>
            </el-checkbox-group>
            <p
                    class="el-transfer-panel__empty"
                    v-show="hasNoMatch">无匹配数据</p>
            <p
                    class="el-transfer-panel__empty"
                    v-show="data.length === 0 && !hasNoMatch">么有数据</p>
        </div>
        <p class="el-transfer-panel__footer" v-if="hasFooter">
            <el-button size="small"
                       :disabled="checked.length === 0"
                       @click="deleteChecked">
                删除
            </el-button>
        </p>
    </div>
</template>

<script>
    export default {
        name: 'transferPanel',
        componentName: 'transferPanel',
        props: {
            data: {
                type: Array,
                default() {
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

        data() {
            return {
                checked: [],
                allChecked: false,
                query: '',
                inputHover: false,
                checkChangeByUser: true
            };
        },
        mounted()
        {
            console.log('run: transfer panel');
        },

        watch: {
            checked(val, oldVal) {
                this.updateAllChecked();
                if (this.checkChangeByUser) {
                    const movedKeys = val.concat(oldVal)
                                         .filter(v => val.indexOf(v) === -1 || oldVal.indexOf(v) === -1);
                    this.$emit('checked-change', val, movedKeys);
                } else {
                    this.$emit('checked-change', val);
                    this.checkChangeByUser = true;
                }
            },

            data() {
                console.log('this ?');
                const checked = [];
                const filteredDataKeys = this.filteredData.map(item => item);
                console.log(this.checked , '321');
                this.checked.forEach(item => {
                    if (filteredDataKeys.indexOf(item) > -1) {
                        checked.push(item);
                    }
                });
                this.checkChangeByUser = false;
                this.checked = checked;
            },

            checkableData() {
                this.updateAllChecked();
            },

            defaultChecked: {
                immediate: true,
                handler(val, oldVal) {
                    if(!val)
                        return;

                    if (oldVal && val.length === oldVal.length &&
                        val.every(item => oldVal.indexOf(item) > -1)) return;
                    const checked = [];
                    const checkableDataKeys = this.checkableData.map(item => item);
                    console.log('this is val');
                    console.log(val);
                    val.forEach(item => {
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
            filteredData() {
                return this.data.filter(item => {
                    const label = item;
                    return label.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
                });
            },
            queryOf() {
                if (this.query === '')
                    return true;

                return this.data.findIndex(item => {
                    return item.toLowerCase() === this.query.toLowerCase();
                }) !== -1;

            },

            checkableData() {
                return this.filteredData;
            },

            checkedSummary() {
                const checkedLength = this.checked.length;
                const dataLength = this.data.length;
                return `${ checkedLength }/${ dataLength }`;
            },

            isIndeterminate() {
                const checkedLength = this.checked.length;
                return checkedLength > 0 && checkedLength < this.checkableData.length;
            },

            hasNoMatch() {
                return this.query.length > 0 && this.filteredData.length === 0;
            },

            inputIcon() {
                return this.query.length > 0 && this.inputHover
                    ? 'circle-close'
                    : 'search';
            },

            plusIcon() {
                return this.hasNoMatch && this.inputHover;
            },

            labelProp() {
                return 'label';
            },

            keyProp() {
                return  'key';
            },

            disabledProp() {
                return 'disabled';
            },

            hasFooter() {
                return !!this.$slots.default;
            }
        },

        methods: {
            updateAllChecked() {
                const checkableDataKeys = this.checkableData.map(item => item);
                this.allChecked = checkableDataKeys.length > 0 &&
                    checkableDataKeys.every(item => this.checked.indexOf(item) > -1);
            },

            handleAllCheckedChange(value) {
                this.checked = value
                    ? this.checkableData.map(item => item)
                    : [];
            },

            clearQuery() {
                if (this.inputIcon === 'circle-close') {
                    this.query = '';
                }
            },

            addQuery()
            {
                if (!this.queryOf) {
                    this.$emit('add',this.query);
                }
            },
            deleteChecked() {
                if (this.checked.length !== 0) {
                    this.$emit('delete-checked',this.checked);
                    this.checked = [];
                }
            }
        }
    };
</script>

