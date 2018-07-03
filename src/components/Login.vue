<template>
<v-container>
    <v-layout row style="margin-top:200px">
        <v-flex xs5></v-flex>
        <v-flex xs3>
            <v-alert  outline :value="showLoginErrMsg"  color="error" icon="warning">{{loginErrMsg}}</v-alert>
            <v-card>
                <v-card-title primary-title>
                    <v-flex xs12><span style="font-size:24px">{{$t ('login.title')}}</span></v-flex>
                    <v-flex xs12>
                        <v-text-field v-model='username' :label="$t ('login.username')" prepend-icon='perm_identity'
                        type='text'
                        :rules="[validUsername]"></v-text-field>
                    <v-text-field v-model='password' :label="$t ('login.password')" prepend-icon='vpn_key'
                        :append-icon="showPass ? 'visibility':'visibility_off'"
                        :append-icon-cb="() => {showPass = !showPass}"
                        :type="showPass  ? 'text' : 'password'"
                        :rules="[validPassword]"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-btn  block color="success" @click="onLogin">{{$t ('login.title')}}</v-btn>
                    </v-flex>
                </v-card-title>
            </v-card>
        </v-flex>
    </v-layout>
</v-container>
</template>
<script>
import { mapActions } from 'vuex'

export default {
    name: 'login',
    data () {
        return {
            username: '',
            password: '',
            showPass: false,
            showLoginErrMsg: false,
            loginErrMsg: ''
        }
    },
    methods: {
        ...mapActions('user', ['login']),
        validUsername (value) {
            const pattern = /[a-zA-Z]{1}[a-zA-Z0-9_]{6,12}$/
            return pattern.test(value) || this.$t('login.invalid_username')
        },
        validPassword (value) {
            const pattern = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{8,12}$/
            return pattern.test(value) || this.$t('login.invalid_password')
        },
        onLogin () {
            this.showLoginErrMsg = false
            let payload = {
                username: this.username,
                password: this.password
            }

            let self = this

            this.login(payload).then(res => {
                self.$router.replace({path: '/'})
            }).catch(err => {
                this.showLoginErrMsg = true
                this.loginErrMsg = err
            })
        }
    },
    mounted () {
    }
}
</script>
<style lang='less' scoped>
</style>
