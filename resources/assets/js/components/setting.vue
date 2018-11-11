<template>
    <div class="container-setting-info-component">
        <div class="component-header-title">
            <i class="el-icon y-icon">
                <img src="../../images/back.png" alt="">
            </i>
            <h1>
                {{ !settingData ? 'QAQ' : settingData.name }}
            </h1>
        </div>
        <div class="component-content" v-if="settingData">
            <el-tabs :value="current">
                <el-tab-pane label="基础设置" name="basis">
                    <setting-basis :data="settingData"></setting-basis>
                </el-tab-pane>
                <el-tab-pane label="样式配置" name="second">
                    <setting-template :data="settingData.setting">

                    </setting-template>
                </el-tab-pane>
            </el-tabs>
        </div>
        <el-button type="primary" @click="handleSubmit">
            Save
        </el-button>
        <div v-if="loading">
            loading..
        </div>
        <div v-else-if="!settingData">
            Data is Null.
        </div>
    </div>
</template>
<script>
    import settingBasis  from './setting-basis'
    import settingTemplate  from './setting-template'


    export default {
        components: {
            settingBasis ,
            settingTemplate
        } ,
        data () {
            return {
                loading: false ,
                current: 'basis'
            }
        } ,
        mounted () {
            if (!this.settingData) {
                this.syncSetting(this.$route.params.id);
            }
        } ,
        methods: {
            async syncSetting (id) {
                this.loading = true;
                let res = await this.$store.dispatch('setting/settingShow' , id);
                this.loading = false;
            } ,
            async handleSubmit () {
                const {settingData , $store} = this;
                let res = await $store.dispatch('setting/update' , settingData);
                console.log(res);
                if (res.status === 200) {
                    this.$notify({
                        title: '恭喜',
                        message: '你成功了!🤣',
                        type: 'success'
                    });
                }
            }
        } ,
        computed: {
            settingData () {
                return this.$store.getters['setting/current'](this.$route.params.id);
            } ,
        }

    }

</script>
