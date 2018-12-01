<template>
    <div class="setting-template-container" v-loading.fullscreen.lock="!loaded">
        <div v-if="loaded" class="setting-template-wrapper">
            <div class="preview-container">
                <div id="y-chat-container">
                    <div id="y-chat-header">
                        <div class="y-header-wrapper y-header-type-1" :style="styleList('header')"
                             :class="{ 'active' : current === 'header' }" @click.stop="changeCurrent('header')">
                            <div class="y-header-back-icon y-item-lh">
                                <svg t="1542941432445" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                     xmlns="http://www.w3.org/2000/svg" p-id="1943"
                                     xmlns:xlink="http://www.w3.org/1999/xlink"
                                     width="80" height="80">
                                    <defs>
                                    </defs>
                                    <path d="M780.738722 92.147922 358.435523 512.007105 780.738722 931.866287C801.939138 952.953029 801.939138 987.140831 780.738722 1008.227572 759.538306 1029.285895 725.151571 1029.285895 703.951155 1008.227572L243.254173 550.173538C222.053757 529.115215 222.053757 494.927413 243.254173 473.840672L703.951155 15.815056C725.151571-5.271685 759.538306-5.271685 780.738722 15.815056 801.939138 36.901797 801.939138 71.0896 780.738722 92.147922Z"
                                          p-id="1944" :fill="settingItem('header').backIconColor"></path>
                                </svg>
                            </div>
                            <div class="y-header-text-wrap">
                                <div>
                                    {{settingItem('header').title}}
                                </div>
                            </div>
                            <a class="y-header-tel-wrap">
                                <span class="y-header-tel-icon y-item-lh">
                                    <svg t="1542942287111" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                         xmlns="http://www.w3.org/2000/svg" p-id="2905"
                                         xmlns:xlink="http://www.w3.org/1999/xlink"
                                         width="80" height="80">
                                        <defs>
                                        </defs>
                                        <path d="M4 270.312c8.16-31.028 13.994-62.914 25.056-92.876 13.72-37.148 40.66-62.254 80.35-72.862A1085.464 1085.464 0 0 0 196.14 77.46c28.49-10.234 52.55-3.62 70.594 18.58 52.982 65.18 83.392 139.28 83.3 224.43-0.024 26.734-11.494 44.416-36.714 56.08-48.64 22.488-56.586 52.3-20.842 93.232 51.516 58.978 106.052 115.42 161.068 171.206 32.23 32.684 66.78 63.35 102.31 92.45 43.346 35.492 70.972 28.612 94.918-22.172 11.26-23.874 29.184-35.59 54.152-35.3 86.98 1.012 163.382 30.834 229.196 87.496 18.49 15.92 23.17 36.656 16.592 59.84-5.992 21.112-12.02 42.208-18.79 63.088-33.104 102.08-106.354 149.524-213.04 128.51-57.772-11.368-116.376-29.678-168.53-56.604-247.202-127.668-428.24-316.764-522.886-582.306-6.294-17.646-11.164-35.99-14.64-54.398-3.082-16.344-3.306-33.222-4.79-49.868L4 270.312zM547.552 11.038c256.354 8.448 466.844 221.256 472.22 477.414 0.84 39.988-14.176 59.94-46.088 61.218-34.7 1.382-50.94-16.626-52.646-58.388-8.6-210.15-173.7-373.312-386.286-381.76-40.866-1.624-62.68-19.208-62.458-50.328 0.242-32.92 23.64-50.2 65.868-48.646 3.132 0.116 6.258 0.332 9.39 0.49z"
                                              :fill="settingItem('header').telIconColor" p-id="2906"></path>
                                        <path d="M511.584 203.04c170.714 4.654 315.598 150.64 314.34 316.738-0.276 36.186-16.672 56.456-46.848 57.924-30.278 1.466-49.22-18.42-51.592-54.164-8.274-124.724-96.226-212.66-221.528-221.488-39.304-2.764-62.09-22.92-60.2-53.238 1.95-31.188 24.536-46.894 65.828-45.772z"
                                              :fill="settingItem('header').telIconColor" p-id="2907"></path>
                                    </svg>
                                </span>
                                <span class="y-header-tel-text" v-if="settingItem('header').showTelNumber">
                                    {{settingItem('header').telNumber}}
                                </span>
                            </a>
                        </div>
                    </div>
                    <div id="y-chat-main" :style="styleList('main')" :class="{ 'active' : current === 'main' }"
                         @click.stop="changeCurrent('main')">
                        <div class="y-main-wrapper">
                            <div class="y-pop-wrap y-pop-left" :class="{ 'active' : current === 'left' }"
                                 @click.stop="changeCurrent('left')">
                                <div class="y-pop-avatar" v-if="settingItem('left').showAvatar">
                                    <div class="y-pop-avatar-img" :style="styleList('leftAvatar')"></div>
                                </div>
                                <div class="y-pop-text">
                                    <div v-if="settingItem('left').showName" class="y-pop-name">
                                        {{settingItem('left').name}}
                                    </div>
                                    <p :style="styleList('leftText')">
                                        你好,小老弟
                                    </p>
                                </div>
                            </div>
                            <div class="y-pop-wrap y-pop-right" :class="{ 'active' : current === 'right' }"
                                 @click.stop="changeCurrent('right')">
                                <div class="y-pop-avatar" v-if="settingItem('right').showAvatar">
                                    <div class="y-pop-avatar-img" :style="styleList('rightAvatar')"></div>
                                </div>
                                <div class="y-pop-text">
                                    <div v-if="settingItem('right').showName" class="y-pop-name">
                                        {{settingItem('right').name}}
                                    </div>
                                    <p :style="styleList('rightText')">
                                        你好,大老哥
                                    </p>
                                </div>
                            </div>
                            <div class="y-pop-wrap y-pop-tip" :class="{ 'active' : current === 'tip' }"
                                 @click.stop="changeCurrent('tip')">
                                <div :style="styleList('tip')" class="y-tip">呜呜呜呜呜,我哭了你呢</div>
                            </div>
                        </div>
                    </div>
                    <div id="y-chat-footer">
                        <div class="y-footer-wrapper y-footer-type-1">
                            <div class="y-footer-form-wrap" :style="styleList('form')"
                                 :class="{ 'active' : current === 'form' }" @click.stop="changeCurrent('form')">
                                <form class="y-footer-form">
                                    <div class="y-footer-input-wrap" :style="styleList('inputWrap')">
                                        <textarea :style="styleList('input')" class="y-footer-form-value" name="test"
                                                  :class="'y-footer-' + settingItem('form').elementTagName"
                                                  :placeholder="settingItem('form').placeholder"></textarea>
                                    </div>
                                    <div class="y-footer-button-wrap" :style="styleList('buttonWrap')">
                                        <button :style="styleList('button')" type="button">
                                            {{settingItem('form').btnText}}
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div class="y-footer-recode-wrap" :style="styleList('footer')"
                                 :class="{ 'active' : current === 'footer' }" @click.stop="changeCurrent('footer')">
                                {{settingItem('footer').text}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="edit-container">
                <div class="edit-wrapper">
                    <div class="edit-null" v-if="!current">
                        前选择左侧组件
                    </div>
                    <el-form class="edit-form" v-model="getSetting" label-position="left" label-width="105px" v-else>
                        <div class="edit-content">
                            <template v-if="current === 'header'">
                                <h1>
                                    Header
                                </h1>
                                <el-form-item class="label-input-color" label="标题">
                                    <el-input class="label-input" v-model="getSetting.header.title"></el-input>
                                    <el-color-picker class="label-input-right"
                                                     v-model="getSetting.header.color"></el-color-picker>
                                </el-form-item>
                                <el-form-item class="label-input-color" label="电话">
                                    <el-input class="label-input" v-model="getSetting.header.telNumber"></el-input>
                                    <el-switch class="label-input-right"
                                               v-model="getSetting.header.showTelNumber"></el-switch>
                                </el-form-item>
                                <el-form-item class="label-input-color" label="返回Icon颜色">
                                    <el-color-picker v-model="getSetting.header.backIconColor"></el-color-picker>
                                </el-form-item>
                                <el-form-item class="label-input-color" label="电话Icon颜色">
                                    <el-color-picker v-model="getSetting.header.telIconColor"></el-color-picker>
                                </el-form-item>
                                <el-form-item class="label-input-color" label="背景颜色">
                                    <el-color-picker v-model="getSetting.header.backgroundColor"></el-color-picker>
                                </el-form-item>
                            </template>
                            <template v-else-if="current === 'main'">
                                <h1>
                                    Main
                                </h1>
                                <el-form-item class="label-input-color" label="背景颜色">
                                    <el-color-picker v-model="getSetting.main.backgroundColor"></el-color-picker>
                                </el-form-item>
                            </template>
                            <template v-else-if="current === 'left'">
                                <h1>
                                    Left
                                </h1>
                                <el-form-item class="label-input-color" label="名称">
                                    <el-input class="label-input" v-model="getSetting.left.name"></el-input>
                                    <el-switch class="label-input-right" v-model="getSetting.left.showName"></el-switch>
                                </el-form-item>
                                <el-form-item class="label-input-color" label="头像">
                                    <el-input class="label-input" placeholder="不输入将使用默认值"
                                              v-model="getSetting.left.avatar"></el-input>
                                    <el-switch class="label-input-right"
                                               v-model="getSetting.left.showAvatar"></el-switch>
                                </el-form-item>
                                <el-form-item class="label-input-color" label="文字颜色">
                                    <el-color-picker v-model="getSetting.left.color"></el-color-picker>
                                </el-form-item>
                                <el-form-item class="label-input-color" label="背景颜色">
                                    <el-color-picker v-model="getSetting.left.backgroundColor"></el-color-picker>
                                </el-form-item>
                            </template>
                            <template v-else-if="current === 'tip'">
                                <el-form-item class="label-input-color" label="文字颜色">
                                    <el-color-picker v-model="getSetting.tip.color"></el-color-picker>
                                </el-form-item>
                                <el-form-item class="label-input-color" label="背景颜色">
                                    <el-color-picker v-model="getSetting.tip.backgroundColor"></el-color-picker>
                                </el-form-item>
                            </template>
                            <template v-else-if="current === 'right'">
                                <h1>
                                    Right
                                </h1>
                                <el-form-item class="label-input-color" label="名称">
                                    <el-input class="label-input" v-model="getSetting.right.name"></el-input>
                                    <el-switch class="label-input-right"
                                               v-model="getSetting.right.showName"></el-switch>
                                </el-form-item>
                                <el-form-item class="label-input-color" label="头像">
                                    <el-input class="label-input" placeholder="不输入将使用默认值"
                                              v-model="getSetting.right.avatar"></el-input>
                                    <el-switch class="label-input-right"
                                               v-model="getSetting.right.showAvatar"></el-switch>
                                </el-form-item>
                                <el-form-item class="label-input-color" label="文字颜色">
                                    <el-color-picker v-model="getSetting.right.color"></el-color-picker>
                                </el-form-item>
                                <el-form-item class="label-input-color" label="背景颜色">
                                    <el-color-picker v-model="getSetting.right.backgroundColor"></el-color-picker>
                                </el-form-item>
                            </template>
                            <template v-else-if="current === 'form'">
                                <h1>
                                    Form
                                </h1>
                                <el-form-item label="输入框样式">
                                    <el-radio-group v-model="getSetting.form.elementTagName">
                                        <el-radio label="input">Input</el-radio>
                                        <el-radio label="textarea">Textarea</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item class="label-input-color" label="input栅格">
                                    <el-input-number v-model="getSetting.form.inputSpan" :min="1"
                                                     :max="20"></el-input-number>
                                </el-form-item>
                                <el-form-item class="label-input-color" label="占位符">
                                    <el-input class="label-input" v-model="getSetting.form.placeholder"></el-input>
                                </el-form-item>

                                <el-form-item class="label-input-color" label="input颜色">
                                    <el-color-picker v-model="getSetting.form.backgroundColor"></el-color-picker>
                                </el-form-item>
                                <el-form-item class="label-input-color" label="input文字颜色">
                                    <el-color-picker v-model="getSetting.form.color"></el-color-picker>
                                </el-form-item>
                                <el-form-item class="label-input-color" label="按钮栅格">
                                    <el-input-number v-model="getSetting.form.buttonSpan" :min="1"
                                                     :max="20"></el-input-number>
                                </el-form-item>
                                <el-form-item class="label-input-color" label="按钮">
                                    <el-input class="label-input" v-model="getSetting.form.btnText"></el-input>
                                    <el-color-picker class="label-input-right"
                                                     v-model="getSetting.form.btnColor"></el-color-picker>
                                </el-form-item>
                                <el-form-item class="label-input-color" label="按钮颜色">
                                    <el-color-picker v-model="getSetting.form.btnBackgroundColor"></el-color-picker>
                                </el-form-item>
                                <el-form-item class="label-input-color" label="背景颜色">
                                    <el-color-picker v-model="getSetting.form.wrapBackgroundColor"></el-color-picker>
                                </el-form-item>
                            </template>
                            <template v-else-if="current === 'footer'">
                                <el-form-item class="label-input-color" label="文字">
                                    <el-input class="label-input" v-model="getSetting.footer.text"></el-input>
                                    <el-color-picker class="label-input-right"
                                                     v-model="getSetting.footer.color"></el-color-picker>
                                </el-form-item>
                                <el-form-item class="label-input-color" label="背景颜色">
                                    <el-color-picker v-model="getSetting.footer.backgroundColor"></el-color-picker>
                                </el-form-item>
                                <el-form-item class="label-input-color" label="边框颜色">
                                    <el-color-picker v-model="getSetting.footer.borderColor"></el-color-picker>
                                </el-form-item>
                            </template>
                        </div>
                        <div class="form-footer">
                            <el-button :loading="submitting" @click="handleSubmit" type="primary">保存</el-button>
                        </div>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions, mapGetters } from 'vuex';

    export default {
        data() {
            return {
                loading   : false,
                data      : null,
                current   : null,
                submitting: false
            }
        },
        async mounted() {
            const { $notify, $route, getSettingWithId, getTemplate } = this;
            const id                                                 = $route.params.id;
            this.loading                                             = true;

            let current = await getSettingWithId(id);
            if (current.status === 200) {

                let response = await getTemplate();
                if (response.status !== 200) {
                    $notify.error({
                        message: '意外来了,联系谁?',
                        title  : '警告'
                    });
                }
            }
            else {
                $notify.error({
                    message: 'id错误.',
                    title  : '操作失误'
                });
            }
            this.loading = false;
        },
        methods : {
            ...mapActions({
                getSettingWithId: 'setting/settingShow',
                getTemplate     : 'template/show',
                update          : 'template/update'
            }),
            changeCurrent(text) {
                this.current = text;
            },
            async handleSubmit() {
                const { templateData, $notify, update } = this;

                this.submitting       = true;
                let res               = await update(templateData);
                templateData.template = this.parseToString;
                if (res.status === 200) {
                    $notify({
                        message: '操作成功',
                        title  : '恭喜',
                        type   : 'success'
                    })
                }
                else {
                    $notify.error({
                        message: '警告,出现问题',
                        title  : '错误',
                    })
                }
                console.log(res);
                this.submitting = false;
            },
            parseStyleToString(text) {
                const { styleList } = this;
                let obj             = styleList(text);
                let str             = "";

                for (let key in obj) {
                    let item = obj[ key ];
                    !!item && (str += `${key}:${item};`);
                }
                return str;
            }
        },
        computed: {
            ...mapGetters({
                currentSetting: 'setting/current',
                templateData  : 'template/data',
                getSetting    : 'template/getSetting',
            }),
            loaded() {
                return (!this.loading && this.templateData && this.currentSetting);
            },
            settingItem() {
                return (text) => {
                    return this.getSetting[ text ];
                }
            },
            styleList() {
                const { header, main, left, right, form, footer, tip } = this.getSetting;

                const list = {
                    header     : {
                        'background-color': header.backgroundColor,
                        color             : header.color
                    },
                    main       : {
                        'background-color': main.backgroundColor,
                    },
                    leftText   : {
                        'background-color': left.backgroundColor,
                        color             : left.color
                    },
                    leftAvatar : {
                        'background-image': !!left.avatar ? `url(${left.avatar})` : '',
                    },
                    rightText  : {
                        'background-color': right.backgroundColor,
                        color             : right.color
                    },
                    rightAvatar: {
                        'background-image': !!right.avatar ? `url(${right.avatar})` : '',
                    },
                    tip        : {
                        'background-color': tip.backgroundColor,
                        color             : tip.color
                    },
                    input      : {
                        color             : form.color,
                        'background-color': form.backgroundColor,
                    },
                    form       : {
                        'background-color': form.wrapBackgroundColor,
                    },
                    button     : {
                        color             : form.btnColor,
                        'background-color': form.btnBackgroundColor,
                    },
                    inputWrap  : {
                        flex: form.inputSpan
                    },
                    buttonWrap : {
                        flex: form.buttonSpan
                    },
                    footer     : {
                        'border-color'    : footer.borderColor,
                        'background-color': footer.backgroundColor,
                        color             : footer.color,
                    }
                };
                return (text) => {
                    return list[ text ];
                }
            },
            parseToString() {
                const { header, form, left, right, footer } = this.getSetting;
                const { parseStyleToString }                = this;
                return {
                    header: `
                        <div id="y-chat-header" >
                            <div class="y-header-wrapper y-header-type-1" style="${parseStyleToString('header')}">
                                <a href="javascript:history.go(-1)" class="y-header-back-icon y-item-lh">
                                    <svg t="1542941432445" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                         xmlns="http://www.w3.org/2000/svg" p-id="1943"
                                         xmlns:xlink="http://www.w3.org/1999/xlink"
                                         width="80" height="80">
                                        <defs>
                                        </defs>
                                        <path d="M780.738722 92.147922 358.435523 512.007105 780.738722 931.866287C801.939138 952.953029 801.939138 987.140831 780.738722 1008.227572 759.538306 1029.285895 725.151571 1029.285895 703.951155 1008.227572L243.254173 550.173538C222.053757 529.115215 222.053757 494.927413 243.254173 473.840672L703.951155 15.815056C725.151571-5.271685 759.538306-5.271685 780.738722 15.815056 801.939138 36.901797 801.939138 71.0896 780.738722 92.147922Z"
                                              p-id="1944" fill="${header.backIconColor}"></path>
                                    </svg>
                                </a>
                                <div class="y-header-text-wrap">
                                    <div>
                                        ${header.title}
                                    </div>
                                </div>
                                <a href="tel:${header.telNumber}" class="y-header-tel-wrap">
                                    <span class="y-header-tel-icon y-item-lh">
                                        <svg t="1542942287111" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                             xmlns="http://www.w3.org/2000/svg" p-id="2905"
                                             xmlns:xlink="http://www.w3.org/1999/xlink"
                                             width="80" height="80">
                                            <defs>
                                            </defs>
                                            <path d="M4 270.312c8.16-31.028 13.994-62.914 25.056-92.876 13.72-37.148 40.66-62.254 80.35-72.862A1085.464 1085.464 0 0 0 196.14 77.46c28.49-10.234 52.55-3.62 70.594 18.58 52.982 65.18 83.392 139.28 83.3 224.43-0.024 26.734-11.494 44.416-36.714 56.08-48.64 22.488-56.586 52.3-20.842 93.232 51.516 58.978 106.052 115.42 161.068 171.206 32.23 32.684 66.78 63.35 102.31 92.45 43.346 35.492 70.972 28.612 94.918-22.172 11.26-23.874 29.184-35.59 54.152-35.3 86.98 1.012 163.382 30.834 229.196 87.496 18.49 15.92 23.17 36.656 16.592 59.84-5.992 21.112-12.02 42.208-18.79 63.088-33.104 102.08-106.354 149.524-213.04 128.51-57.772-11.368-116.376-29.678-168.53-56.604-247.202-127.668-428.24-316.764-522.886-582.306-6.294-17.646-11.164-35.99-14.64-54.398-3.082-16.344-3.306-33.222-4.79-49.868L4 270.312zM547.552 11.038c256.354 8.448 466.844 221.256 472.22 477.414 0.84 39.988-14.176 59.94-46.088 61.218-34.7 1.382-50.94-16.626-52.646-58.388-8.6-210.15-173.7-373.312-386.286-381.76-40.866-1.624-62.68-19.208-62.458-50.328 0.242-32.92 23.64-50.2 65.868-48.646 3.132 0.116 6.258 0.332 9.39 0.49z" fill="${header.telIconColor}" p-id="2906"></path>
                                            <path d="M511.584 203.04c170.714 4.654 315.598 150.64 314.34 316.738-0.276 36.186-16.672 56.456-46.848 57.924-30.278 1.466-49.22-18.42-51.592-54.164-8.274-124.724-96.226-212.66-221.528-221.488-39.304-2.764-62.09-22.92-60.2-53.238 1.95-31.188 24.536-46.894 65.828-45.772z" fill="${header.telIconColor}" p-id="2907"></path>
                                        </svg>
                                    </span>
                                    ${ header.showTelNumber && `<span class="y-header-tel-text">${header.telNumber}</span>` }
                                </a>
                            </div>
                        </div>
                    `,
                    main  : `
                        <div id="y-chat-main" style="${parseStyleToString('main')}">
                            <div class="y-main-wrapper" >
                            </div>
                        </div>
                    `,
                    left  : `
                        <div class="y-pop-wrap y-pop-left" >
                            ${left.showAvatar ? `<div class="y-pop-avatar" ><div class="y-pop-avatar-img" style="${parseStyleToString('leftAvatar')}"></div></div>` : '' }
                            <div class="y-pop-text">
                                ${left.showName ? `<div class="y-pop-name">${left.name}</div>` : '' }
                                <p style="${parseStyleToString('leftText')}" class="text-content"></p>
                            </div>
                        </div>
                    `,
                    tip: `<div class="y-pop-wrap y-pop-tip"><div style="${parseStyleToString('tip')}" class="y-tip text-content"></div></div>`,
                    right : `
                        <div class="y-pop-wrap y-pop-right" >
                            ${right.showAvatar ? `<div class="y-pop-avatar" ><div class="y-pop-avatar-img" style="${parseStyleToString('rightAvatar')}"></div></div>` : '' }
                            <div class="y-pop-text">
                                ${right.showName ? `<div class="y-pop-name">${right.name}</div>` : '' }
                                <p style="${parseStyleToString('rightText')}" class="text-content"></p>
                            </div>
                        </div>
                    `,
                    footer: `<div id="y-chat-footer">
                            <div class="y-footer-wrapper y-footer-type-1">
                                <div class="y-footer-form-wrap" style="${parseStyleToString('form')}">
                                    <form class="y-footer-form">
                                        <div class="y-footer-input-wrap" style="${parseStyleToString('inputWrap')}">
                                            <textarea style="${parseStyleToString('input')}" name="message-value" placeholder="${form.placeholder}" class="y-footer-form-value y-footer-${form.elementTagName}"></textarea>
                                        </div>
                                        <div class="y-footer-button-wrap" style="${parseStyleToString('buttonWrap')}">
                                            <button style="${parseStyleToString('button')}" type="submit">${form.btnText}</button>
                                        </div>
                                    </form>
                                </div>
                                <div class="y-footer-recode-wrap" style="${parseStyleToString('footer')}">
                                    ${footer.text}
                                </div>
                            </div>
                        </div>`
                };

            },
        }
    }
</script>
<style lang="scss" scoped>

    .setting-template-wrapper {
        padding-top: 20px;
        display: flex;

        .preview-container {
            width: 450px;
            height: 700px;
            background-color: #fff;
            flex: none;
        }

        .edit-container {
            flex: 1;
            padding-left: 20px;
        }

        .edit-wrapper {
            max-width: 450px;
            min-height: 700px;
            height: auto;
            padding: 10px;
            width: 100%;
            display: block;
            border-radius: 2px;
            border: 1px solid rgba(0, 0, 0, .1);
        }

        .edit-null {
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            font-size: 27px;
            display: block;
            width: 100%;
            text-align: center;
            color: #777777;
            transform: translateY(-50%);
        }

        .label-input-color {
            .label-input {
                display: inline-block;
                width: 80%;
            }

            .label-input-right {
                position: absolute;
                left: 84%;
            }
        }
    }

    .edit-form {
        position: static;
    }

    .form-footer {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: right;
        padding: 10px;
    }

    .active {
        &::before {
            position: absolute;
            content: '';
            display: inline-block;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 0;
            border: 3px dashed #000;
        }
    }
</style>
