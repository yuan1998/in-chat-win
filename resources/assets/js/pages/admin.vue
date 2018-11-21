<template>
    <div class="container-admin-page">
        <el-container style="height:100%">
            <el-aside class="admin-aside">
                <el-menu
                        :collapse-transition="true"
                        :router="true"
                        class="el-menu-vertical-demo"
                        @select="handleSelect"
                        active-text-color="#303133"
                        :collapse="isCollapse"
                >
                    <el-menu-item index="/admin">
                        <i class="el-icon y-icon">
                            <img src="../../images/composer.png" alt="">
                        </i>
                        <span slot="title">控制台</span>
                    </el-menu-item>
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
                            @command="handleCommand"
                    >
                        <span class="el-dropdown-link y-user">
                            {{userInfo && userInfo.username}}
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="logout">logout</el-dropdown-item>
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
    import {oneOf}      from '../utils/assist'
    import {mapActions} from 'vuex';

    export default {
        data () {
            return {
                isCollapse: true ,
                current: '/admin' ,
                tabs: ['/admin/setting'] ,
                tabsName: {
                    '/admin/setting': '所有配置' ,
                }
            }
        } ,
        mounted () {
            this.getList();
        } ,
        methods: {
            ...mapActions({
                getSettings: 'setting/getList' ,
                logout: 'auth/logout' ,
            }) ,
            handleSelect () {
                this.isCollapse = true;
            } ,
            handleClick (tab , evt) {

            } ,
            closeTab (name) {
                const {tabs} = this;

            } ,
            handleCommand(command) {
                const {handleLogout} = this;
                switch (command) {
                    case "logout" :
                        handleLogout();
                        break;
                }
            },
            async handleLogout () {
                const {$router , logout , $notify} = this;
                let res = await logout();

                if (res.status === 204) {
                    $notify({
                        message: '操作成功' ,
                        title: '提示' ,
                        type: 'success'
                    });
                    $router.push('/login');
                }

            } ,
            async getList () {
                let res = await this.getSettings();

                if (res.status !== 200) {
                    this.$message('Error!');
                }
            }
        } ,
        computed: {
            userInfo () {
                return this.$store.getters['auth/gerUserInfo'];
            }
        },

    }
</script>
