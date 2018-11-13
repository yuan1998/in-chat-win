<template>
    <div class="container-admin-page">
        <el-container style="height:100%">
            <el-aside class="admin-aside">
                <el-menu
                        :collapse-transition="true"
                        :router="true"
                        :default-active="current"
                         class="el-menu-vertical-demo"
                        @select="handleSelect"
                        :collapse="isCollapse"
                >
                    <el-menu-item index="/admin/setting">
                        <i class="el-icon y-icon">
                            <img src="../../images/stack.png" alt="">
                        </i>
                        <span slot="title">所有配置</span>
                    </el-menu-item>
                    <el-menu-item index="/admin/domain">
                        <i class="el-icon y-icon">
                            <img src="../../images/global.png" alt="">
                        </i>
                        <span slot="title">所有域名</span>
                    </el-menu-item>

                </el-menu>
            </el-aside>
            <el-container>
                <el-header class="admin-header">
                    <el-button
                            type="text"
                            @click="() => {isCollapse = !isCollapse}"
                    >
                        <i
                                class="el-icon y-icon collapse-btn"
                                :class="{'y-active': isCollapse }"
                        >
                            <img src="../../images/collapse.png" alt="">
                        </i>
                        {{ isCollapse ? '展开' : '收起' }}
                    </el-button>
                    <el-dropdown
                            trigger="click"
                            class="y-user-dropdown"
                    >
                        <span class="el-dropdown-link y-user">
                            {{userInfo.username}}
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>logout</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-header>
                <el-main class="admin-main">
                    <transition>
                        <router-view></router-view>
                    </transition>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
    import {oneOf} from '../utils/assist'

    export default {
        data () {
            return {
                isCollapse: true ,
                current: '/admin/setting' ,
                tabs: ['/admin/setting'] ,
                tabsName: {
                    '/admin/setting': '所有配置' ,
                }
            }
        } ,
        mounted() {
            this.getList();
        },
        methods: {
            handleSelect (index , indexPath) {
                let {current , tabs} = this;
                current = index;

                if (!oneOf(index , tabs)) {
                    tabs.push(index);
                }
            } ,
            handleClick (tab , evt) {

            } ,
            closeTab (name) {
                const {tabs} = this;

            },
            async getList() {
                let res = await this.$store.dispatch('setting/getList');

                if (res.status !== 200) {
                    this.$message('Error!');
                }
            }
        } ,
        computed: {
            userInfo () {
                return this.$store.getters['auth/gerUserInfo'];
            }
        }

    }
</script>
