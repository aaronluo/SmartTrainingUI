<template>
    <v-container grid-list-md>
        <v-layout row>
            <v-flex xs12 sm12 md12>
                <v-toolbar dense>
                    <v-toolbar-items>
                        <v-text-field hide-details prepend-icon="search" single-line></v-text-field>
                        <v-btn color="primary" style="margin-left: 15px">{{$t('common.search')}}</v-btn>
                        <v-btn color="success" style="margin-left: 15px" @click.stop="newTrainee()">{{$t('trainee.new')}}</v-btn>
                    </v-toolbar-items>
                </v-toolbar>
            </v-flex>
        </v-layout>
        <v-layout row wrap style="margin-top: 10px">
            <v-flex xs6 sm4 md3 v-for="t in trainees" :key="t.id">
                <v-card color="white" >
                    <v-container fluid grid-list-xs style="padding: 8px">
                        <v-layout row>
                            <v-flex xs3>
                                <v-avatar size="48"><img src='../assets/avatar.png' /></v-avatar>
                            </v-flex>
                            <v-flex xs9>
                                <v-flex xs12>
                                    <b v-if="t.properties.find(e => e.name === 'familyName')">{{t.properties.find(e => e.name === 'familyName').value}} {{t.properties.find(e => e.name === 'givenName').value}}</b>
                                    <b v-else>{{t.username}}</b>
                                </v-flex>
                                <v-flex xs12 class="traineeText">{{$t('trainee.registered.training')}}:  {{t.trainingAccounts.length}}{{$t('common.class')}}</v-flex>
                                <v-flex xs12 class="traineeText">{{$t('trainee.registered.age')}}:  {{t.createDate | registerAge}}{{$t('common.years')}}</v-flex>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
        <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading">
            <span slot="no-more"></span>
            <span slot="no-results"></span>
        </infinite-loading>

        <!--new trainee dlg-->
        <v-dialog v-model="showNewTraineeDlg" max-width="480px" persistent>
            <v-stepper v-model="curStep">
                <v-stepper-header>
                    <v-stepper-step :complete="curStep > 1" step="1">{{$t('trainee.newStep.newAccount')}}</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :complete="curStep > 2" step="2">{{$t('trainee.newStep.addProp')}}</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step step="3">{{$t('trainee.newStep.complete')}}</v-stepper-step>
                </v-stepper-header>
                <v-stepper-items>
                    <v-stepper-content step="1">
                        <v-card>
                            <v-card-text>
                                <v-form ref='traineeForm' v-model='canCreateTrainee'>
                                    <v-text-field v-model='trainee.username' :label="$t('login.username')" :rules="[validUsername]"></v-text-field>
                                    <v-text-field v-model='trainee.password' :label="$t ('login.password')"
                                        :append-icon="showPass ? 'visibility':'visibility_off'"
                                        @click:append="() => {showPass = !showPass}"
                                        :type="showPass  ? 'text' : 'password'"
                                        :rules="[validPassword]"></v-text-field>
                                    <v-text-field v-model='trainee.repasswd' :label="$t ('login.repasswd')"
                                        :append-icon="showRePass ? 'visibility':'visibility_off'"
                                        @click:append="() => {showRePass = !showRePass}"
                                        :type="showRePass  ? 'text' : 'password'"
                                        :rules="[validRePassword]"></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn falt color="success" :disabled="!canCreateTrainee" @click.stop="doCreateNewTrainee">{{$t('common.next')}}</v-btn>
                                <v-btn falt color="error" @click.stop="closeNewTraineeDlg">{{$t('common.cancel')}}</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-stepper-content>
                    <v-stepper-content step="2">
                        <v-card>
                            <v-card-text>
                                <v-form ref='addPropForm' v-model='canAddProp'>
                                    <v-text-field v-model="addProps.familyName" :label="$t('common.familyName')" :rules="[v => !!v || $t('common.required')]"></v-text-field>
                                    <v-text-field v-model="addProps.givenName" :label="$t('common.givenName')"  :rules="[v => !!v || $t('common.required')]"></v-text-field>
                                    <v-text-field v-model="addProps.avatar" :label="$t('common.avatar')" :rules="[]"></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn falt color="success" :disabled="!canAddProp" @click.stop="doAddProp">{{$t('common.next')}}</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-stepper-content>
                    <v-stepper-content step="3">
                        <v-card>
                            <v-card-text>
                                {{addProps.familyName}} {{addProps.givenName}} ( {{trainee.username}} ) {{$t('trainee.createDone')}}
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn falt color="success" @click.stop="onAddTraineeComplete">{{$t('common.ok')}}</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>

        </v-dialog>
    </v-container>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import { mapActions, mapMutations } from 'vuex'
import _ from 'lodash'

export default {
    name: 'Trainee',
    components: {
        InfiniteLoading
    },
    data () {
        return {
            trainees: [],
            pagination: {
                page: 0,
                size: 8
            },
            showNewTraineeDlg: false,
            canCreateTrainee: true,
            showPass: false,
            showRePass: false,
            trainee: {
                username: '',
                password: '',
                repasswd: ''
            },
            curStep: 1,
            canAddProp: false,
            addProps: {
                familyName: '',
                givenName: '',
                avatar: ''
            }
        }
    },
    mounted () {
    },
    methods: {
        ...mapActions('trainee', ['getTrainees', 'createTraineeAccount', 'addAddtionalProps']),
        ...mapMutations('common', ['showNotification']),
        mounted () {
        },
        infiniteHandler ($state) {
            this.pagination.page++
            this.getTrainees(this.pagination).then(data => {
                if (data.content.length > 0) {
                    this.trainees = _.concat(this.trainees, data.content)
                    $state.loaded()
                } else {
                    $state.complete()
                    this.pagination.page--
                }
            }).catch(err => {
                let payload = {color: 'error', text: err}
                this.showNotification(payload)
                this.trainees = []
                $state.complete()
                // this.$nextTick(() => {
                //     this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
                // });
            })
        },
        newTrainee () {
            this.showNewTraineeDlg = true
        },
        doCreateNewTrainee () {
            // save user account info and move to the next step
            const payload = {
                username: this.trainee.username,
                password: this.trainee.password,
                roles: [{
                    name: 'ROLE_TRAINEE'
                }]
            }
            this.createTraineeAccount(payload).then(data => {
                console.log(data)
                this.trainee = data
                this.curStep = 2
            }).catch(err => {
                this.showNotification({color: 'error', text: err})
            })
        },
        doAddProp () {
            // add addtional propety
            const payload = {
                userId: this.trainee.id,
                props: [
                    {name: 'familyName', value: this.addProps.familyName},
                    {name: 'givenName', value: this.addProps.givenName},
                    {name: 'avatar', value: this.addProps.avatar}
                ]
            }

            this.addAddtionalProps(payload).then(data => {
                this.curStep = 3
            }).catch(err => {
                this.showNotification({color: 'error', text: err})
            })
        },
        onAddTraineeComplete () {
            this.pagination.page = 0
            this.trainees = []
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
            this.$refs.addPropForm.reset()
            this.closeNewTraineeDlg()
        },
        closeNewTraineeDlg () {
            this.showNewTraineeDlg = false
            this.$refs.traineeForm.reset()
            this.curStep = 1
        },
        validUsername (value) {
            const pattern = /[a-zA-Z]{1}[a-zA-Z0-9_]{6,12}$/
            return pattern.test(value) || this.$t('login.invalid_username')
        },
        validPassword (value) {
            const pattern = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{8,12}$/
            return pattern.test(value) || this.$t('login.invalid_password')
        },
        validRePassword (value) {
            return _.isEqual(value, this.trainee.password) || this.$t('login.invalid_repasswd')
        }
    }
}
</script>
<style lang="less" scoped>
.traineeText {
    font-size: 12px;
    color: gray;
}
</style>
