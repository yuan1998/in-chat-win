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
                        prop="name"
                        label="用户名"
                        :rules="{
                              required: true, message: '请输入用户名', trigger: 'blur'
                            }"
                    >
                        <el-input name="name" v-model="formInline.name"></el-input>
                    </el-form-item>
                    <el-form-item
                            label="密码"
                            prop="password"
                            :rules="[
                                {
                                  required: true, message: '请输入密码', trigger: 'blur',
                                },
                                {
                                    min: 8  , message: '长度不能少于 8 字符', trigger: 'blur'
                                }
                            ]"
                    >
                        <el-input name="password" type="password" v-model="formInline.password"></el-input>
                    </el-form-item>
                    <el-form-item
                            label="确认密码"
                            prop="confirmPassword"
                            :rules="[
                                {
                                    required: true, message: '请输入密码', trigger: 'blur'
                                },
                                {
                                    validator: validateConfirmPassword , trigger: 'blur'
                                }
                            ]"
                    >
                        <el-input name="confirmPassword" type="password" v-model="formInline.confirmPassword"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="submitting" type="primary" @click="handleSubmit('form')">提交</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        data () {
            return {
                submitting: false,
                formInline: {
                    email: '',
                    name: '',
                    password: '',
                    confirmPassword: '',
                }
            }
        },
        methods : {
            ...mapActions({
                aSignup: 'auth/signup'
            }),
            validateConfirmPassword(rule , value , callback) {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.formInline.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            },
            handleSubmit(ref) {
                const { $refs , formInline , $notify , $router , aSignup } = this;

                $refs[ref].validate( async (value) => {
                    if (value) {
                        this.submitting = true;
                         let res = await aSignup(formInline);

                         if (res.status === 201) {
                             $notify({
                                 message: '注册成功',
                                 title: '恭喜',
                                 type: 'success'
                             });
                             $router.push('/admin');
                         }
                         else {
                             $notify.error({
                                 message: '发生错误.',
                                 title: '糟糕'
                             })

                         }

                    }
                    else {

                    }
                })

            }
        }
    }

</script>
