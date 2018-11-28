<template>
    <div class="load-component-container" v-loading.fullscreen.lock="!loaded" >
        <div v-if="loaded">
            <h1>
                Logs.
            </h1>
            <div class="logs-table-container" v-loading="dataLoading">
                <el-table
                        highlight-current-row
                        :data="data"
                        style="width: 100%;"
                        max-height="650"
                        :default-sort="{prop: 'create_at', order: 'descending'}"
                >
                    <el-table-column
                            fixed
                            sortable
                            prop="create_at"
                            label="日期"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            sortable
                            prop="type"
                            label="类型"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="ip"
                            label="IP"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            label="位置"
                            width="150">
                        <template slot-scope="scope">
                            <span>{{ scope.row.info.city }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="停留时间"
                            width="150">
                        <template slot-scope="scope">
                            <span>{{ parseDate(scope.row.time) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="选择项"
                            width="200">
                        <template slot-scope="scope">
                            <span>{{ parseDataKey(scope.row.data , 'selectMessage') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="发送对话"
                            width="150">
                        <template slot-scope="scope">
                            <span>{{ parseDataKey(scope.row.data , 'jumpMessage') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="url"
                            label="url"
                            width="350">
                    </el-table-column>
                </el-table>
                <div class="logs-pagination-container" style="text-align: center;">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="pagination.current_page"
                            :page-sizes="[20, 40, 60, 100]"
                            :page-size="pagination.per_page"
                            layout="sizes, prev, pager, next, total"
                            :total="pagination.total">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex';
    import { parseTime }                            from '../utils/assist';

    export default {
        data() {
            return {
                dataLoading : false,
                firstLoading: false,
            }
        },
        async mounted() {
            if (!this.queryPage) {
                this.setPage(1);
            }
            this.firstLoading = true;
            await this.getList();

            this.firstLoading = false;
        },
        methods : {
            ...mapActions({
                list    : 'logs/data',
                setWhere: 'logs/setWhere',
            }),
            ...mapMutations({
                changeCurrent  : 'logs/current',
                changePageCount: 'logs/pageCount'
            }),
            async getList() {
                const { $notify, list } = this;
                this.dataLoading        = true;
                let res                 = await list();
                this.dataLoading        = false;

                if (res.status === 200) {
                    $notify({
                        type   : 'success',
                        title  : '成功',
                        message: '数据加载完成.',
                    })
                }
                else {
                    $notify.error({
                        title  : '错误',
                        message: '发生未知错误.',
                    })
                }

                console.log(res);
            },
            setPage(page) {
                this.changeCurrent(page);
                this.$router.push({ query: { page } });
            },
            parseDate(time) {
                return isNaN(time) ? '未知' : parseTime(time);
            },
            parseDataKey(data, key) {
                return (data && data[ key ]) ? data[ key ] : '-';
            },
            handleSizeChange(val) {
                this.changePageCount(val);
            },
            handleCurrentChange(val) {
                this.setPage(val);
                this.getList();
            },
        },
        computed: {
            ...mapGetters({
                data      : 'logs/data',
                pagination: 'logs/pagination'
            }),
            loaded() {
                return (!this.firstLoading && this.data);
            },
            queryPage() {
                return parseInt(this.$route.query && this.$route.query.page);
            }
        }
    }

</script>

<style lang="scss">
    .logs-pagination-container {
        text-align: center;
        padding-top: 20px;
    }
</style>
