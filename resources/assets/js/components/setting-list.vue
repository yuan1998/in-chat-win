<template>
    <div >
        <div v-if="list === null">
            Loading....
        </div>
        <div v-else-if=" list && list.length === 0">
            Empty...
        </div>
        <el-row v-else :gutter="20">
            <el-col :span="6" v-for="item in list" :key="item.id">
                <el-card class="setting-card mac-card">
                    <span>
                        {{item.name}}
                    </span>
                    <div class="setting-card-footer">
                        <el-button class="setting-card-btn" type="text">
                            <router-link :to="'/admin/domain/'+ item.id">域名</router-link>
                        </el-button>
                        <el-button class="setting-card-btn" type="text">
                            <router-link :to="'/admin/message/'+ item.id">短句</router-link>
                        </el-button>
                        <el-button class="setting-card-btn" type="text">
                            <router-link :to="'/admin/setting/'+ item.id">配置</router-link>
                        </el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        mounted() {
            this.getList();
        },
        methods: {
            async getList() {
                let res = await this.$store.dispatch('setting/getList');

                if (res.status !== 200) {
                    this.$message('Error!');
                }
            }
        },
        computed: {
            list ()
            {
                return this.$store.getters['setting/list'];
            }
        }
    }
</script>
