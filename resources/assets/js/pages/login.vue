<template>
    <div class="container-login-page">

    </div>
</template>
<script>
    import {login , logout , refreshToken} from "../api/auth";
    import {getStorage}                    from "../utils/storage";
    import {tokenName}                     from "../utils/config";

    export default {
        data () {
            return {
                form: {
                    email: 'chizhiyueshu@gmail.com' ,
                    password: '3322123'
                }
            }
        } ,

        mounted () {
            // this.login();
        } ,

        methods: {
            async login () {
                let res = await login(this.form);
                console.log(res);
            } ,
            async logout () {
                let res = await logout();
                console.log(res);
            } ,
            async refresh () {
                let res = await refreshToken(getStorage(tokenName));
                console.log(res);
            }
        },

    }
</script>
