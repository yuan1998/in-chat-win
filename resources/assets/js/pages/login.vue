<template>
    <div class="container-auth-page">
        <el-row  >
            <el-col :lg="{span: 8 , offset:8}" :md="{span:12,offset:6}" :sm="{span:24}">
                <el-form label-position="top" :model="formInline" ref="form" label-width="100px" class="login-form">
                    <el-form-item
                            prop="email"
                            label="邮箱"
                            :rules="[
                              { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                              { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
                            ]"
                    >
                        <el-input name="email" v-model="formInline.email"></el-input>
                    </el-form-item>
                    <el-form-item
                            label="密码"
                            prop="password"
                            :rules="{
                              required: true, message: '请输入密码', trigger: 'blur'
                            }"
                    >
                        <el-input name="password" type="password" v-model="formInline.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loging" type="primary" @click="handleSubmit('form')">提交</el-button>
                        <el-button >
                            <router-link to="/signup">
                                注册
                            </router-link>
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>

    </div>
</template>
<script>
    import {mapActions} from 'vuex';

    export default {
        data () {
            return {
                loging: false,
                formInline: {
                    email: '' ,
                    password: ''
                },
                ruleInline: {
                    email: [
                        { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                        { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    ]
                }
            }
        } ,
        methods: {
            ...mapActions({
                _login: 'auth/login' ,
            }),
            async login()
            {
                this.loging = true;
                let res = await this._login(this.formInline);
                if(res === true) {
                    this.$message({
                        message: 'Success!',
                        type: 'success'
                    });
                    this.$router.push('/');
                }else {
                    this.$message({
                        message: res.data.message,
                        type: 'error'
                    });
                }
                this.loging = false;
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.login();
                    } else {
                        this.$message({
                            message: 'Fail!',
                            type: 'error'
                        });
                    }
                })
            }
        } ,
        computed: {
            isLogin(){
                return this.$store.getters['auth/gerUserInfo'];
            }
        }

    }
</script>
