<template>
    <div>
        <el-form ref="form" label-position="right" label-width="80px" :model="data">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="名称">
                        <el-input v-model="data.name"></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input v-model="data.description"></el-input>
                    </el-form-item>
                    <el-form-item label="List Status">
                        <el-switch v-model="data['list-open']"></el-switch>
                    </el-form-item>
                    <el-form-item label="List Model">
                        <el-select v-model="data['list-model']" placeholder="List Model">
                            <el-option label="黑名单" value="black"></el-option>
                            <el-option label="白名单" value="white"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">

                    <el-form-item label="List Data">
                        <transfer-panel ref="transfer" @delete-checked="deleteChecked" @add="addQuery" title="名单" :filterable="true" :data="data['list-data']">
                            <el-button size="small">
                                test
                            </el-button>
                        </transfer-panel>
                    </el-form-item>

                </el-col>
            </el-row>
        </el-form>
    </div>

</template>
<script>
    import transferPanel from './transfer-panel'

    export default {
        name: 'settingBasis',
        componentName: "settingBasis",
        components: {
            transferPanel,
        },
        props: {
            data: Object
        },
        data () {
            return {

            }
        },
        methods: {
            addQuery(query) {
                let arr = this.data['list-data'];
                arr.push(query);
                this.$refs['transfer'].clearQuery();
            },
            deleteChecked(arr) {
                let data = this.data['list-data'];
                arr.forEach(each => {
                    let index = data.findIndex(v => v === each);

                    if (index !== -1) {
                        data.splice(index, 1);
                    }else {
                        this.$message({
                            type:'warning',
                            message: 'has ' + each + ' on found.'
                        })
                    }
                });
            }
        }

    }
</script>
