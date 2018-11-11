<template>
    <div class="setting-tab-component">
        <el-form ref="form" label-position="left" label-width="150px" :model="data">
            <el-form-item label="再次访问跳转">
                <el-radio-group v-model="data.again">
                    <el-radio :label="true">开启</el-radio>
                    <el-radio :label="false">关闭</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="背景颜色">
                <el-color-picker v-model="data.bgColor"></el-color-picker>
            </el-form-item>
            <el-form-item label="按钮颜色">
                <el-color-picker v-model="data.buttonColor"></el-color-picker>
            </el-form-item>
            <el-form-item label="按钮文字">
                <el-input v-model="data.buttonText"></el-input>
            </el-form-item>
            <el-form-item label="底部颜色">
                <el-color-picker v-model="data.footerColor"></el-color-picker>
            </el-form-item>
            <el-form-item label="底部文字颜色">
                <el-color-picker v-model="data.footerColorText"></el-color-picker>
            </el-form-item>
            <el-form-item label="底部文字">
                <el-input v-model="data.footerText"></el-input>
            </el-form-item>
            <el-form-item label="输入框颜色">
                <el-color-picker v-model="data.inputColor"></el-color-picker>
            </el-form-item>
            <el-form-item label="输入框文字颜色">
                <el-color-picker v-model="data.inputColorText"></el-color-picker>
            </el-form-item>
            <el-form-item label="输入框文字">
                <el-input v-model="data.inputText"></el-input>
            </el-form-item>
            <el-form-item label="输入框(容器)颜色">
                <el-color-picker v-model="data.inputWrapColor"></el-color-picker>
            </el-form-item>
            <el-form-item label="左侧头像">
                <el-input v-model="data.lmAvatar"></el-input>
            </el-form-item>
            <el-form-item label="左侧气泡颜色">
                <el-color-picker v-model="data.lmColor"></el-color-picker>
            </el-form-item>
            <el-form-item label="左侧文字颜色">
                <el-color-picker v-model="data.lmColorText"></el-color-picker>
            </el-form-item>
            <el-form-item label="左侧名称">
                <el-input v-model="data.lmName"></el-input>
            </el-form-item>
            <el-form-item label="左侧预览文字">
                <el-input v-model="data.lmText"></el-input>
            </el-form-item>
            <el-form-item label="主题颜色">
                <el-color-picker v-model="data.mainColor"></el-color-picker>
            </el-form-item>
            <el-form-item label="文字主颜色">
                <el-color-picker v-model="data.mainColorText"></el-color-picker>
            </el-form-item>
            <el-form-item label="标题">
                <el-input v-model="data.name"></el-input>
            </el-form-item>
            <el-form-item label="右侧颜色">
                <el-color-picker v-model="data.rmColor"></el-color-picker>
            </el-form-item>
            <el-form-item label="右侧文字颜色">
                <el-color-picker v-model="data.rmColorText"></el-color-picker>
            </el-form-item>
            <el-form-item label="右侧预览文字">
                <el-input v-model="data.rmText"></el-input>
            </el-form-item>
            <el-form-item label="标识码">
                <el-input v-model="data.tag"></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="data.tel">
                    <i slot="suffix" class="el-input__icon el-icon-phone"></i>
                </el-input>
            </el-form-item>
            <el-form-item label="弹出等待时间">
                <el-input v-model="data.waitTime">
                    <i slot="suffix" class="el-input__icon el-icon-time"></i>
                </el-input>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        componentName: 'SettingTemplate',
        name: 'SettingTemplate',
        props: {
            data:Object,
        },
        data()
        {
            return {

            }
        },
        methods : {

        }
    }
</script>
