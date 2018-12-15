<template>
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
                <el-button :disabled="gSettings.length === 0" type="primary" @click="dialogVisible = true">
                    新建
                </el-button>
            </div>
        </div>

        <h1 v-if="!filterable">
            乍回事啊,叫人
        </h1>
        <h1 v-else-if="gSettings.length === 0">
            缺少配置.不能添加域名
            <el-button type="text">
                <router-link to="/admin/setting">去添加.</router-link>
            </el-button>
        </h1>
        <h1 v-else-if="filterable.length === 0">
            Not Found Data.
            <el-button @click="dialogVisible = true" type="text">Add Domain.</el-button>
        </h1>
        <el-row v-else :gutter="20">
            <el-col v-for="item in filterable"
                    style="margin-bottom: 20px;"
                    :key="item.id"
                    :span="8">
                <el-card class="domain-card mac-card">
                    <div class="domain-card_content">
                        <div class="domain-card_url-bar card-url-bar">
                            {{item.domain}}
                        </div>
                        <div class="domain-card_open-wrap" v-loading="item.opening">
                            <div class="open-label">
                                开关
                            </div>
                            <el-switch v-model="item.open" @change="handleOpen(item)">
                            </el-switch>
                            <span class="domain-card_setting-name">{{settingOf(item.setting_id).name}}</span>
                        </div>
                        <div class="domain-card_tags">
                            <h1>
                                标签:
                            </h1>
                            <div v-if="item.tags.length === 0">
                                没有标签.
                            </div>
                            <el-tag v-else v-for="(val , index) in item.tags" :key="index">{{val}}</el-tag>

                        </div>
                        <div class="domain-card-footer mac-card-footer" style="text-align: right;">
                            <el-button
                                    @click="handleUpdateBtn(item)"
                                    class="setting-card-btn"
                                    type="text">
                                变更
                            </el-button>
                            <el-popover
                                    v-model="item.modelShow"
                                    placement="top"
                                    width="160">
                                <p>这是一段内容这是一段内容确定删除吗？</p>
                                <div style="text-align: right; margin: 0">
                                    <el-button size="mini" @click="item.modelShow = false" type="text">取消</el-button>
                                    <el-button type="primary" size="mini" :loading="item.deleting"
                                               @click="handleDelete(item)">确定
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
                        label="域名"
                        prop="domain"
                        :rules="[
                            {
                                validator:validatorDomain,
                                trigger: ['blur','change'],
                            },
                        ]">
                    <el-input
                            v-model="form.domain"
                            autocomplete="off">
                        <template slot="prepend">Http://</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="开关" prop="open">
                    <el-switch v-model="form.open"></el-switch>
                </el-form-item>
                <el-form-item
                        label="备注"
                        prop="description"
                        :rules="{
                  required: true, message: '不能为空', trigger: 'blur'
                }">
                    <el-input v-model="form.description"></el-input>
                </el-form-item>
                <el-form-item
                        class="domain-dialog-tag-wrap"
                        label="标签">
                    <el-tag
                            :key="index"
                            v-for="(tag , index) in form.tags"
                            closable
                            :disable-transitions="false"
                            @close="handleCloseTag(index)">
                        {{tag}}
                    </el-tag>
                    <el-input
                            class="input-new-tag"
                            v-if="form.showTagInput"
                            v-model="form.tagText"
                            ref="saveTagInput"
                            size="small"
                            @keyup.enter.native="handleAddTag(form.tagText)"
                            @blur="handleAddTag(form.tagText)"
                    >
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                </el-form-item>
                <el-form-item label="所属" prop="setting_id" :rules="{
                  required: true, message: '不能为空', trigger: 'blur'
                }">
                    <el-select v-model="form.setting_id" placeholder="请">
                        <el-option v-for="item in gSettings" :label="item.name" :key="item.id" :value="item.id">
                        </el-option>
                    </el-select>
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
</template>
<script>
    import { mapGetters, mapActions } from 'vuex'
    import { defaultForm }            from '../utils/domain'
    import { cloneOf }                from "../utils/assist";

    export default {
        data() {
            return {
                query        : '',
                inputHover   : false,
                dialogVisible: false,
                submitting   : false,
                placeholder  : '请',
                form         : cloneOf(defaultForm),
                loading      : false,
            }
        },
        mounted() {
            console.log(312);
            if (!this.gDomains) {
                this.getDomains();
            }
        },
        methods : {
            ...mapActions({
                aDomains: 'domain/index',
                aUpdate : 'domain/update',
                aDestroy: 'domain/destroy',
                aCreate : 'domain/create',
            }),
            async getDomains() {
                let res = await this.aDomains();
            },
            async handleOpen(item) {
                item.opening = true;

                let res = await this.aUpdate({
                    id  : item.id,
                    open: item.open,
                });

                if (res.status === 200) {
                    this.$notify({
                        title  : '成功',
                        message: '你' + (item.open ? '打开' : '封印') + '了他.',
                        type   : 'success'
                    });
                }
                else {
                    item.open = !item.open;
                    this.$notify({
                        title  : '警告',
                        message: '发送了非常轻微的错误.',
                        type   : 'warning'
                    });
                }

                item.opening = false;
            },
            async handleDelete(item) {
                let res = this.aDestroy(item.id);

                if (res.status === 204) {
                    this.$notify({
                        message: '删除了',
                        type   : 'success',
                        title  : '恭喜'
                    })
                }
                else {
                    this.$notify.error({
                        message: '出错了',
                        title  : '警告'
                    })
                }
            },
            handleUpdateBtn(item) {
                this.form          = cloneOf(item);
                this.dialogVisible = true;
            },
            handleSubmit(ref) {
                const { $refs, $message, form, $notify, aCreate, aUpdate, closeDialog } = this;

                $refs[ ref ].validate(async (value) => {
                    if (!value) {
                        $message({
                            type   : 'warning',
                            message: '看仔细一点.'
                        })
                    }
                    else {
                        this.submitting = true;

                        let res = !form.id
                            ? await aCreate(form)
                            : await aUpdate(form);

                        console.log(res);

                        if (res && res.status === 200) {
                            $notify({
                                message: '操作成功',
                                title  : '恭喜',
                                type   : 'success'
                            })
                        }
                        else {
                            $notify({
                                message: '发生了一点小意外',
                                title  : '提示',
                                type   : 'warning'
                            })
                        }

                        closeDialog();
                    }

                });
            },
            clearQuery() {
                if (this.inputIcon === 'circle-close')
                    this.query = '';
            },
            closeDialog() {
                this.form          = cloneOf(defaultForm);
                this.submitting    = false;
                this.dialogVisible = false;
            },
            closedDialog() {
                this.$refs[ 'form' ].resetFields();
            },
            closeDialogBefore(done) {
                if (this.form && this.form.id) {
                    this.form = cloneOf(defaultForm);
                }

                if (!this.submitting) {
                    done();
                }
            },
            validatorDomain(rule, value, callback) {
                const { form, gDomains } = this;
                if (value === '') {
                    callback(new Error('输入内容!'));
                }
                else if (gDomains.findIndex(item => {
                    return form.id !== item.id && item.domain.toLowerCase() === value.toLowerCase();
                }) !== -1) {
                    callback(new Error('域名已存在'));
                }
                else {
                    callback();
                }
            },
            handleAddTag(text) {
                if (text !== '') {
                    let tags = this.form.tags;

                    let index = tags.findIndex((item) => {
                        return item === text;
                    });

                    index === -1 && tags.push(text);
                }

                this.form.showTagInput = false;
                this.form.tagText      = '';
            },
            handleCloseTag(index) {
                index >= 0 && this.form.tags.splice(index, 1);
            },
            showInput() {
                this.form.showTagInput = true;
                this.$nextTick(() => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
        },
        computed: {
            ...mapGetters({
                gDomains : 'domain/domains',
                settingOf: 'setting/idOf',
                gSettings: 'setting/list'
            }),
            filterable() {
                const { gDomains, query } = this;
                if (!gDomains)
                    return false;

                if (query === '') {
                    return gDomains;
                }

                return gDomains.filter(item => {
                    return item.domain.toLowerCase().indexOf(query.toLowerCase()) > -1;
                });
            },
            inputIcon() {
                return this.query.length > 0 && this.inputHover
                    ? 'circle-close'
                    : 'search';
            },
            loaded() {
                return !(this.loading || !this.gSettings || !this.gDomains);
            }

        }
    }
</script>
