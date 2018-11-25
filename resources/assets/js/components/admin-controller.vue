<template>
    <div>
        <h1 style="padding-top:10px;">
            User Id : {{ userInfo.id }}
        </h1>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    export default {
        data () {
            return {

            }
        },
        computed: {
            ...mapGetters({
                userInfo : 'auth/gerUserInfo'
            })
        }
    }
</script>
