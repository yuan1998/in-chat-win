<template>
    <div class="message-list_container">
        <div class="message-header" v-if="filterable">
            <div class="message-header_filter">
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
            <div class="message-header_controller">
                <el-button type="primary" @click="dialogVisible = true">
                    新建
                </el-button>
            </div>
        </div>
        <el-row v-if="filterable" :gutter="30">
            <el-col :span="8" v-for="item in filterable" :key="item.id" style="margin-bottom: 15px;">
                <el-card class="message-card mac-card">
                    <div class="message-card_content">
                        <div class="message-pop_wrap message-pop_right">
                            <div class="message-pop">
                                <p class="message-pop_text">
                                    {{item.keyword}}
                                </p>
                            </div>
                        </div>
                        <div class="message-pop_wrap message-pop_left"
                             v-for="(each , index) in item.message " :key="index">
                            <div class="message-pop">
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
                                    v-model="item.model_show"
                                    placement="top"
                                    width="160">
                                <p>这是一段内容这是一段内容确定删除吗？</p>
                                <div style="text-align: right; margin: 0">
                                    <el-button size="mini" @click="item.model_show = false" type="text">取消</el-button>
                                    <el-button type="primary" size="mini" :loading="item.delete_btn_loading"
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
                width="50%">
            <el-form :model="form" ref="form" label-position="top" label-width="120px">
                <el-form-item
                        label="活动名称"
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
                    <el-form-item
                            class="message-value-form-item"
                            v-for="(item , index) in form.message"
                            :rules="{
                                required: true, message: '不行哦', trigger: 'blur'
                            }"
                            :prop="'message.' + index + '.value'"
                            :key="index">
                        <div slot="label"
                             class="message-value-label">
                            <el-button
                                    v-show="form.message && form.message.length > 1"
                                    @click="removeMessageItem(index)"
                                    icon="el-icon-circle-close"
                                    type="text">
                                削除
                            </el-button>
                        </div>
                        <el-input
                                v-model="item.value"
                                placeholder="输入内容.."
                                type="textarea"
                                :autosize="{ minRows: 2, maxRows: 4}"
                                resize="none">
                        </el-input>
                    </el-form-item>
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
</template>
<script>
    import {cloneOf}  from "../utils/assist";
    import {Yuandown} from "../utils/yuandown";

    const defaultMessage = {
        value: ''
    };
    const defaultForm = {
        keyword: '' ,
        message: [
            cloneOf(defaultMessage) ,
        ]
    };

    export default {
        props: {} ,
        data () {
            return {
                loading: false ,
                query: '' ,
                placeholder: '关键字' ,
                inputHover: false ,
                dialogVisible: false ,
                form: cloneOf(defaultForm) ,
                submitting: false ,
            }
        } ,
        async mounted () {
            const {$store , $route , settingCurrent} = this;
            let id = $route.params.id;
            let current = settingCurrent;
            this.loading = true;

            if (!current) {
                let res = await $store.dispatch('setting/settingShow' , id);
                console.log( 'Current' , res);
                if (res.status !== 200) {
                    id = null;
                }
            }

            if (id !== null) {
                let res = await $store.dispatch('message/current' , id);
                console.log( 'Id' , res);
            }
            else {
                throw new Error('Error . id error');
            }
            this.loading = false;

        } ,
        methods: {
            clearQuery () {
                if (this.inputIcon === 'circle-close')
                    this.query = '';
            } ,
            addMessageItem () {
                this.form.message.push(cloneOf(defaultMessage));
                this.$nextTick(() => {
                    this.containScrollBottom('contain');
                })
            } ,
            removeMessageItem (index) {
                this.form.message.splice(index , 1);
            } ,
            containScrollBottom (ref) {
                let el = this.$refs[ref];
                el.scrollTop = el.scrollHeight;
            } ,
            handleUpdate (item) {
                this.form = cloneOf(item);
                this.dialogVisible = true;
            } ,
            validatorKeyword (rule , value , callback) {
                if (value === '') {
                    callback(new Error('输入内容!'));
                }
                else if (this.$store.getters['message/nameExists'](value , this.form.id)) {
                    callback(new Error('关键字已存在'));
                }
                else {
                    callback();
                }
            } ,
            handleSubmit (ref) {
                const {$refs , form , handleSubmitCreate , handleSubmitUpdate} = this;

                $refs[ref].validate((valid) => {
                    if (valid) {
                        form.id === undefined ? handleSubmitCreate() : handleSubmitUpdate();
                    } else {
                        this.$message.error('不行哦，Message is Empty.');
                        return false;
                    }
                });
            } ,
            async handleSubmitCreate () {
                const { $store , form , closeDialog } = this;
                this.submitting = true;

                let res = await $store.dispatch('message/store' , form);

                if (res.status === 200) {
                    this.$notify({
                        title: '恭喜' ,
                        message: form.keyword + ' 诞生了!' ,
                        type: 'success'
                    });
                    closeDialog();
                }
            } ,
            async handleSubmitUpdate () {
                const {$store , form , closeDialog} = this;
                this.submitting = true;

                let res = await $store.dispatch('message/update' , {id: form.id , data: form});

                if (res.status === 200) {
                    this.$notify({
                        title: '恭喜' ,
                        message: '你改变了' + form.keyword ,
                        type: 'success'
                    });
                    closeDialog();
                }
            } ,
            async handleDelete (item) {
                item.delete_btn_loading = true;
                let res = await this.$store.dispatch('message/destroy' , item.id);

                this.$notify({
                    title: '恭喜' ,
                    message: '你杀死了' + item.keyword ,
                    type: 'success'
                });
            } ,
            async handleSetDefault (id) {
                let res = await this.$store.dispatch('setting/setDefault',id);

                console.log(res);
                if(res.status === 200) {
                    this.$notify({
                        title: 'Congratulations' ,
                        message: 'He became king.' ,
                        type: 'success'
                    });
                }
            },
            closeDialog() {
                this.submitting = false;
                this.dialogVisible = false;
            },
            closedDialog () {
                this.$refs['form'].resetFields();
            },
            closeDialogBefore(done) {
                if (!this.submitting) {
                    done();
                }
            },
            strParse(str) {
                return Yuandown(str);
            }
        } ,
        computed: {
            isCurrent () {
                return this.$store.getters['message/current'](this.$route.params.id);
            } ,
            settingCurrent()
            {
                return this.$store.getters['setting/current'](this.$route.params.id);
            },
            currentMessage () {
                return this.isCurrent && this.$store.getters['message/message'];
            } ,
            inputIcon () {
                return this.query.length > 0 && this.inputHover
                    ? 'circle-close'
                    : 'search';
            } ,
            filterable () {
                const {currentMessage , query} = this;
                if (!currentMessage)
                    return false;

                if (query === '') {
                    return currentMessage;
                }

                return currentMessage.filter(item => {
                    return item.keyword.toLowerCase().indexOf(query.toLowerCase()) > -1;
                });
            } ,
            currentDefault() {
                return this.settingCurrent.default_message;
            }
        }
    }
</script>
