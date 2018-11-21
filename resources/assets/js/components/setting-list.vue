<template>
    <div v-loading.fullscreen.lock="!loaded" class="setting-component-container">
        <div v-if="loaded">
            <div class="admin-component-header">
                <div class="admin-header_filter message-header_filter">
                    <el-input v-model="query"
                              size="small"
                              :placeholder="placeholder"
                              @mouseenter.native="inputHover = true"
                              @mouseleave.native="inputHover = false">
                        <i slot="prefix"
                           :class="['el-input__icon', 'el-icon-' + inputIcon]"
                           @click="clearQuery">
                        </i>
                    </el-input>
                </div>
                <div class="admin-header_controller">
                    <el-button type="primary" @click="dialogVisible = true">
                        新建
                    </el-button>
                </div>
            </div>
            <div class="admin-component-content">
                <div v-if="!filterable">
                    咋回事啊.叫人
                </div>
                <div v-else-if="filterable.length === 0">
                    没有配置,<el-button type="text" @click="dialogVisible = true">点击添加.</el-button>
                </div>
                <el-row v-else :gutter="20">
                    <el-col style="margin-bottom: 20px;" :span="6" v-for="item in filterable" :key="item.id">
                        <el-card class="setting-card mac-card">
                            <div class="setting-card-content">
                                <div>
                                    {{item.name}}
                                </div>
                                <div class="setting-card-footer mac-card-footer">
                                    <el-button type="text">
                                        <router-link :to="'message/'+ item.id">短句</router-link>
                                    </el-button>
                                    <el-button
                                            @click="handleUpdate(item)"
                                            class="setting-card-btn"
                                            type="text">
                                        变更
                                    </el-button>
                                    <el-popover
                                            v-model="item.model_show"
                                            placement="top"
                                            width="160">
                                        <p>这是一段内容这是一段内容确定删除吗？</p>
                                        <div style="text-align: right; margin: 0">
                                            <el-button size="mini"
                                                       @click="item.modelShow = false"
                                                       type="text">
                                                取消
                                            </el-button>
                                            <el-button type="primary"
                                                       size="mini"
                                                       :loading="item.deleting"
                                                       @click="handleDelete(item)">
                                                确定
                                            </el-button>
                                        </div>
                                        <el-button class="setting-card-btn" type="text" slot="reference">
                                            削除
                                        </el-button>
                                    </el-popover>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
            <el-dialog
                    ref="dialog"
                    title="提示"
                    class="domain-dialog-container"
                    :visible.sync="dialogVisible"
                    @closed="closedDialog"
                    @before-close="closeDialogBefore"
                    width="50%">
                <el-form :model="form" ref="form" label-position="top" label-width="120px">
                    <el-form-item
                            label="名称"
                            prop="name"
                            :rules="{
                          required: true, message: '不能为空', trigger: 'blur'
                        }">
                        <el-input
                                v-model="form.name"
                                autocomplete="off">
                        </el-input>
                    </el-form-item>
                    <el-form-item
                            label="备注"
                            prop="description"
                            :rules="{
                      required: true, message: '不能为空', trigger: 'blur'
                    }">
                        <el-input v-model="form.description"></el-input>
                    </el-form-item>
                    <el-form-item label="启动筛选">
                        <el-switch v-model="form['list-open']"></el-switch>
                    </el-form-item>
                    <el-form-item label="筛选模式">
                        <el-select v-model="form['list-model']" placeholder="List Model">
                            <el-option label="黑名单" value="black"></el-option>
                            <el-option label="白名单" value="white"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="筛选列表">
                        <transfer-panel ref="transfer" @delete-checked="deleteChecked" @add="addQuery" title="名单"
                                        :filterable="true" :data="form['list-data']">
                            <el-button size="small">
                                test
                            </el-button>
                        </transfer-panel>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">
                        取 消
                    </el-button>
                    <el-button
                            :loading="submitting"
                            type="primary"
                            @click="handleSubmit('form')">
                        确 定
                    </el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import {mapGetters , mapActions} from 'vuex'
    import {defaultForm}             from "../utils/setting";
    import {cloneOf}                 from "../utils/assist";
    import transferPanel             from '../components/transfer-panel'

    export default {
        data () {
            return {
                loading: false ,
                query: '' ,
                placeholder: 'ADF' ,
                inputHover: false ,
                dialogVisible: false ,
                submitting: false ,
                form: cloneOf(defaultForm) ,
            }
        } ,
        components: {
            transferPanel ,
        } ,
        mounted () {
            if (!this.gList) {
                this.getList();
            }
        } ,
        methods: {
            ...mapActions({
                aList: 'setting/getList' ,
                aCreate: 'setting/create' ,
                aUpdate: 'setting/update',
                aDelete: 'setting/destroy'
            }) ,
            async handleSubmit (ref) {
                const {$refs , $notify , form , aCreate , aUpdate , closeDialog} = this;

                $refs[ref].validate(async (val) => {
                    if (val) {
                        this.submitting = true;
                        let res = !form.id ? await aCreate(form) : await aUpdate(form);

                        console.log(res);

                        if (res.status === 200) {
                            $notify({
                                message: '他诞生了.' ,
                                title: '恭喜' ,
                                type: 'success'
                            });
                        }
                        else {
                            $notify.error({
                                message: '发生了位置错误.' ,
                                title: '警告'
                            });
                        }

                        closeDialog();
                    }
                    else {
                        $notify({
                            message: '看仔细了.' ,
                            title: '提示' ,
                            type: 'warning'
                        })
                    }

                })


            } ,
            async getList () {
                let res = await this.aList();
                console.log(res);

                if (res.status === 200) {

                }
                else {
                    this.$message('Error!');
                }
            } ,
            handleUpdate(item) {
                this.form = cloneOf(item);
                this.dialogVisible = true;
            },
            async handleDelete(item) {
                let res = await this.aDelete(item.id);

                console.log(res);
                if (res.status === 204) {
                    this.$notify({
                        message: '你删除了他.',
                        title: '提示',
                        type: 'success'
                    })
                }
                else {
                    this.$notify.error({
                        message: '发生了意外情况.',
                        title: '警告',
                    });
                }

            },
            clearQuery () {
                if (this.inputIcon === 'circle-close')
                    this.query = '';
            } ,
            closeDialog () {
                this.submitting = false;
                this.dialogVisible = false;
            } ,
            closedDialog () {
                this.$refs['form'].resetFields();
            } ,
            closeDialogBefore (done) {
                if (!this.submitting) {
                    done();
                }
            } ,
            addQuery (query) {
                let arr = this.form['list-data'];
                arr.push(query);
                this.$refs['transfer'].clearQuery();
            } ,
            deleteChecked (arr) {
                let data = this.form['list-data'];
                arr.forEach(each => {
                    let index = data.findIndex(v => v === each);

                    if (index !== -1) {
                        data.splice(index , 1);
                    } else {
                        this.$message({
                            type: 'warning' ,
                            message: 'has ' + each + ' on found.'
                        })
                    }
                });
            } ,

        } ,
        computed: {
            ...mapGetters({
                gList: 'setting/list'
            }) ,
            loaded () {
                return (!this.loading && !!this.gList);
            } ,
            filterable () {
                const {gList , query} = this;

                if (query === '') {
                    return gList;
                }

                return this.gList && this.gList.filter((item) => {
                    return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
                })
            } ,
            inputIcon () {
                return this.query.length > 0 && this.inputHover
                    ? 'circle-close'
                    : 'search';
            } ,
        }
    }
</script>
