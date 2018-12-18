<template>
    <div v-loading.fullscreen.lock="!loaded" class="message-list_container">
        <div v-if="loaded">
            <div class=" admin-component-header message-header">
                <div class="admin-header_filter">
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
                    <el-button type="primary" @click="handleCreate">
                        新建
                    </el-button>
                </div>
            </div>
            <div v-if="!currentMessage">
                数据出错.
            </div>
            <div v-else-if="currentMessage.length === 0">
                一条都没有
                <el-button @click="dialogVisible = true" type="text">添加一条吧</el-button>
            </div>
            <el-row v-else :gutter="30">
                <el-col :span="8" v-for="item in filterable" :key="item.id" style="margin-bottom: 15px;">
                    <el-card class="message-card mac-card">
                        <div class="message-card_content">
                            <div class="message-card_url-bar card-url-bar">
                                {{item.keyword}}
                            </div>
                            <div v-for="(each , index) in item.message "
                                 :key="index"
                                 :class="'message-pop_wrap message-pop_' + each.type">
                                <div v-if="each.type === 'custom'" v-html="each.value"></div>
                                <div v-else class="message-pop">
                                    <p class="message-pop_text" v-html="strParse(each.value)">
                                    </p>
                                </div>
                            </div>

                            <div class="message-card-footer mac-card-footer">
                                <el-button
                                        :disabled="currentDefault === item.id"
                                        @click="handleSetDefault(item.id)"
                                        class="setting-card-btn"
                                        type="text">
                                    设定默认
                                </el-button>
                                <el-button
                                        @click="handleUpdate(item)"
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
                                        <el-button size="mini" @click="item.modelShow = false" type="text">取消
                                        </el-button>
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
                    :visible.sync="dialogVisible"
                    @closed="closedDialog"
                    @before-close="closeDialogBefore"
                    width="700px">
                <el-form :model="form" ref="form" label-position="top" label-width="120px">
                    <el-form-item
                            label="关键词"
                            prop="keyword"
                            :rules="[
                                {
                                    validator:validatorKeyword,
                                    trigger: ['blur','change'],
                                },
                            ]">
                        <el-input
                                v-model="form.keyword"
                                autocomplete="off">
                        </el-input>
                    </el-form-item>
                    <h1>
                        回复短句
                        <el-button @click="addMessageItem"
                                   icon="el-icon-circle-plus"
                                   type="text">
                            加增
                        </el-button>
                    </h1>
                    <div ref="contain"
                         class="message-value-container">
                        <div class="message-list-item"
                             v-for="(item , index) in form.message"
                             :key="index">
                            <el-form-item
                                    class="message-value-form-item"
                                    :rules="{
                                        required: true, message: '不行哦', trigger: 'blur'
                                    }"
                                    :prop="'message.' + index + '.value'">
                                <el-input
                                        v-model="item.value"
                                        placeholder="输入内容.."
                                        type="textarea"
                                        :autosize="{ minRows: 2, maxRows: 4}"
                                        resize="none">
                                </el-input>
                            </el-form-item>
                            <div class="message-value-attribute">
                                <el-form-item
                                        class="message-item-attribute-inline">
                                    <el-select
                                            size="mini"
                                            v-model="item.type"
                                            placeholder="信息位置">
                                        <el-option
                                                controls-position="right"
                                                v-for="each in [{value:'left' , label: '左侧'},{value:'right' , label: '右侧'},{value:'center' , label: '中间'},{value:'custom' , label: '自定义内容'},]"
                                                :key="each.value"
                                                :label="each.label"
                                                :value="each.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item
                                        class="message-item-attribute-inline">
                                    <el-input-number

                                            size="mini"
                                            v-model="item.duration"
                                            :min="0"
                                            :max="3000"
                                            label="延迟">
                                    </el-input-number>
                                </el-form-item>
                                <el-button
                                        @click="addMessageTo('before' , index )"
                                        icon="el-icon-caret-top"
                                        type="text">
                                    在上方插入一行
                                </el-button>
                                <el-button
                                        @click="addMessageTo('after' , index + 1 )"
                                        icon="el-icon-caret-bottom"
                                        type="text">
                                    在下方插入一行
                                </el-button>
                                <el-button
                                        v-show="form.message && form.message.length > 1"
                                        @click="removeMessageItem(index)"
                                        icon="el-icon-circle-close"
                                        type="text">
                                    削除
                                </el-button>

                            </div>
                        </div>

                    </div>
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
    import { mapActions, mapGetters } from 'vuex'
    import { cloneOf }                from "../utils/assist";
    import { Yuandown }               from "../utils/yuandown";

    const defaultMessage = {
        value   : '',
        type    : 'left',
        duration: 0
    };
    const defaultForm    = {
        keyword: '',
        message: [
            cloneOf(defaultMessage),
        ]
    };

    export default {
        props   : {},
        data() {
            return {
                loading      : false,
                query        : '',
                placeholder  : '关键字',
                inputHover   : false,
                dialogVisible: false,
                form         : cloneOf(defaultForm),
                submitting   : false,
            }
        },
        async mounted() {
            const { $notify, $route, gSettingCurrent, settingShow, messageCurrent } = this;

            let id       = $route.params.id;
            let current  = gSettingCurrent(id);
            this.loading = true;

            if (!current) {
                let res = await settingShow(id);
                if (res.status !== 200) {
                    id = null;
                }
            }

            if (id !== null) {
                let res = await messageCurrent(id);
                $notify({
                    message: '加载完成.',
                    title  : '提示',
                    type   : 'success'
                })
            }
            else {
                $notify.error({
                    message: '发生错误',
                    title  : '警告'
                });
                throw new Error('Error . id error');
            }

            this.loading = false;
        },
        methods : {
            ...mapActions({
                aCreate       : 'message/store',
                aUpdate       : 'message/update',
                aDelete       : 'message/destroy',
                messageCurrent: 'message/current',
                settingShow   : 'setting/settingShow',
                settingDefault: 'setting/setDefault',
            }),
            handleCreate() {
                this.form          = cloneOf(defaultForm);
                this.dialogVisible = true;
            },
            clearQuery() {
                if (this.inputIcon === 'circle-close')
                    this.query = '';
            },
            addMessageTo(position, index) {
                console.log("index :",index >= this.form.message.length);
                if (index >= this.form.message.length) {
                    this.addMessageItem();
                }
                else {
                    this.form.message.splice(index, 0, cloneOf(defaultMessage));
                }
            },
            addMessageItem() {
                this.form.message.push(cloneOf(defaultMessage));
                this.$nextTick(() => {
                    this.containScrollBottom('contain');
                })
            },
            removeMessageItem(index) {
                this.form.message.splice(index, 1);
            },
            containScrollBottom(ref) {
                let el       = this.$refs[ ref ];
                el.scrollTop = el.scrollHeight;
            },
            handleUpdate(item) {
                this.form          = this.checkUpdateMessage(cloneOf(item));
                this.dialogVisible = true;
            },
            checkUpdateMessage(data) {
                let message  = data.message || [];
                message      = message.map((item) => {
                    if (item.value && !item.type) {
                        let c   = cloneOf(defaultMessage);
                        c.value = item.value;
                        item    = c;
                    }
                    return item;
                });
                data.message = message;
                return data;
            },
            validatorKeyword(rule, value, callback) {
                if (value === '') {
                    callback(new Error('输入内容!'));
                }
                else if (this.gNameExists(value, this.form.id)) {
                    callback(new Error('关键字已存在'));
                }
                else {
                    callback();
                }
            },
            handleSubmit(ref) {
                const { $refs, $notify, form, aCreate, aUpdate, closeDialog } = this;

                $refs[ ref ].validate(async (valid) => {
                    if (valid) {
                        this.submitting = true;
                        let res         = form.id ? await aUpdate(form) : await aCreate(form);

                        if (res.status === 200) {
                            $notify({
                                title  : '恭喜',
                                message: '操作成功.',
                                type   : 'success'
                            })
                        }
                        closeDialog();
                    } else {
                        $notify.error({
                            message: '不行哦，Message is Empty.',
                            title  : '提示'
                        });
                    }
                });
            },
            async handleDelete(item) {
                item.deleting = true;
                let res       = await this.aDelete(item.id);

                if (res.status === 204) {
                    this.$notify({
                        title  : '恭喜',
                        message: '你杀死了' + item.keyword,
                        type   : 'success'
                    });
                }
                else {
                    this.$notify.error({
                        title  : '错误',
                        message: '发生意外',
                    });
                }


            },
            async handleSetDefault(id) {
                let res = await this.settingDefault(id);

                if (res.status === 200) {
                    this.$notify({
                        title  : 'Congratulations',
                        message: 'He became king.',
                        type   : 'success'
                    });
                }
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
            strParse(str) {
                return Yuandown(str);
            }
        },
        computed: {
            ...mapGetters({
                gCurrent       : 'message/current',
                gSettingCurrent: 'setting/current',
                gList          : 'message/message',
                gNameExists    : 'message/nameExists',
            }),
            isCurrent() {
                return this.gCurrent(this.$route.params.id);
            },
            loaded() {
                return !(this.loading || !this.currentMessage);
            },
            settingCurrent() {
                return this.gSettingCurrent(this.$route.params.id);
            },
            currentMessage() {
                return this.isCurrent && this.gList;
            },
            inputIcon() {
                return this.query.length > 0 && this.inputHover
                    ? 'circle-close'
                    : 'search';
            },
            filterable() {
                const { currentMessage, query } = this;
                if (!currentMessage)
                    return false;

                if (query === '') {
                    return currentMessage;
                }

                return currentMessage.filter(item => {
                    return item.keyword.toLowerCase().indexOf(query.toLowerCase()) > -1;
                });
            },
            currentDefault() {
                return this.settingCurrent.default_message;
            }
        }
    }
</script>
