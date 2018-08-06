<template>
    <v-container grid-list-md>
        <v-layout row wrap>
            <v-btn  icon dark color='indigo' @click="back"><v-icon>keyboard_arrow_left</v-icon></v-btn>
            <div v-if="trainee.properties" style="padding: 7px">
                <h2 v-if="trainee.properties.find(e => e.name === 'familyName')">{{trainee.properties.find(e => e.name === 'familyName').value}} {{trainee.properties.find(e => e.name === 'givenName').value}}</h2>
                <h2 v-else>{{trainee.username}}</h2>
            </div>
        </v-layout>
        <v-card v-if="trainee.username" style="margin-top: 10px">
            <v-layout row wrap>
                <v-flex sm4 md2 style="padding: 20px">
                    <v-avatar v-if="hasAvatar" size="96"><img :src="trainee.properties.find(e => e.name === 'avatar').value" /></v-avatar>
                    <v-avatar v-else size="96"><img src='../assets/avatar.png' /></v-avatar>
                </v-flex>
                <v-flex sm4 md7 style="padding: 20px">
                    <v-layout row wrap>
                        <v-flex sm4 md4 >{{$t('trainee.registered.training')}}:  {{trainee.trainingAccounts.length}}{{$t('common.class')}}</v-flex>
                        <v-flex sm4 md4 >{{$t('trainee.registered.age')}}:  {{trainee.createDate | registerAge}}{{$t('common.years')}}</v-flex>
                    </v-layout>
                </v-flex>
                <v-flex sm4 md3 style="padding: 20px">
                    <v-layout row wrap>
                        <v-flex xs12 md6><v-btn depressed block color="success">{{$t('trainee.createAccount')}}</v-btn></v-flex>
                        <v-flex xs12 md6><v-btn depressed block color="success" :disabled="!canDeposite" @click="showDepositeDlg = true">{{$t('trainee.deposite')}}</v-btn></v-flex>
                        <v-flex xs12 md6><v-btn depressed block color="success" :disabled="true">账户协转</v-btn></v-flex>
                        <v-flex xs12 md6><v-btn depressed block color="success" :disabled="true">账户销户</v-btn></v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-card>
        <v-card v-if="trainee.username" style="margin-top: 10px">
            <v-layout row wrap>
                <v-flex v-if="trainee.trainingAccounts && trainee.trainingAccounts.length > 0">
                    <v-tabs fixed-tabs v-model="activeTab">
                        <v-tab v-for="account in trainee.trainingAccounts" :key="account.id">
                            {{account.training.title}}
                        </v-tab>
                        <v-tab-item v-for="account in trainee.trainingAccounts" :key="account.id">
                            <v-card flat>
                                <v-layout row wrap style="padding: 20px">
                                    <v-flex xs12 md12>
                                        <h3>{{$t('trainee.accountInfo')}}</h3>
                                    </v-flex>
                                    <v-flex xs6 md2>
                                        {{$t('trainee.account.balance')}}:&nbsp;&nbsp;&nbsp;&nbsp;{{$n(account.balance, 'currency')}}
                                    </v-flex>
                                    <v-flex xs6 md2>
                                        {{$t('trainee.account.unitPrice')}}:&nbsp;&nbsp;&nbsp;&nbsp;{{$n(account.unitPrice, 'currency')}}
                                    </v-flex>
                                    <v-flex xs6 md2>
                                        {{$t('trainee.account.depositeCount')}}:&nbsp;&nbsp;&nbsp;&nbsp;{{account.depositeLogCount}}
                                    </v-flex>
                                    <v-flex xs6 md2>
                                        {{$t('trainee.account.trainingLogCount')}}:&nbsp;&nbsp;&nbsp;&nbsp;{{account.trainingLogCount}}
                                    </v-flex>
                                     <v-flex xs12 md4>
                                       {{$t('trainee.account.validDate')}}:&nbsp;&nbsp;&nbsp;&nbsp;{{account.validBeginDate}} ~ {{account.validEndDate}}
                                    </v-flex>
                                </v-layout>
                                <v-tabs fixed-tabs v-model="activeFuncTab">
                                    <v-tab>{{$t('trainee.account.trainingLogCount')}}</v-tab>
                                    <v-tab>{{$t('trainee.account.depositeCount')}}</v-tab>
                                    <v-tab-item style="padding: 20px">
                                        <v-list>
                                            <v-list-tile v-for="log in trainingLogs" :key="log.id" class="log_cell">
                                                <v-list-tile-content>
                                                    {{log.id}} - {{log.createDate}} - {{log.trainerId}}
                                                </v-list-tile-content>
                                            </v-list-tile>
                                        </v-list>
                                        <infinite-loading @infinite="loadTrainingLog" ref="infiniteTrainingLog">
                                            <span slot="no-more"></span>
                                            <span slot="no-results"></span>
                                        </infinite-loading>
                                    </v-tab-item>
                                    <v-tab-item style="padding: 20px">
                                        <v-list>
                                            <v-list-tile v-for="log in depositeLogs" :key="log.id" class="log_cell">
                                                <v-list-tile-content>
                                                    {{log.id}} - {{log.createDate}} - {{log.amount}} - {{log.comment}}
                                                </v-list-tile-content>
                                            </v-list-tile>
                                        </v-list>
                                        <infinite-loading @infinite="loadDepositeLog" ref="infiniteDepositeLog">
                                            <span slot="no-more"></span>
                                            <span slot="no-results"></span>
                                        </infinite-loading>
                                    </v-tab-item>
                                </v-tabs>
                            </v-card>
                        </v-tab-item>
                    </v-tabs>
                </v-flex>
                <v-flex v-else>
                    <v-alert :value="true" color="info" >{{$t('trainee.noneAccount')}}</v-alert>
                </v-flex>
            </v-layout>
        </v-card>

        <v-dialog v-model="showDepositeDlg" max-width="480px" persistent>
            <v-card>
                <v-card-text>
                    <v-form v-model="canAddMoney" ref="depositeForm">
                        <v-text-field v-model="depositeNum" :label="$t('common.depositeNum')" :prefix="$t('common.currency')" mask="######" :rules="[validAmount]"></v-text-field>
                         <v-text-field v-model='depositeNote' :label="$t('common.comment')"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn falt color="success" :disabled="!canAddMoney" @click.stop="doAddMoney">{{$t('common.ok')}}</v-btn>
                    <v-btn falt color="error" @click.stop="closeDepositeDlg">{{$t('common.cancel')}}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
import InfiniteLoading from 'vue-infinite-loading'
import { mapActions, mapMutations } from 'vuex'
import _ from 'lodash'

export default {
    name: 'TraineeDetail',
    components: {
        InfiniteLoading
    },
    data () {
        return {
            trainee: {},
            activeTab: 0,
            activeFuncTab: 0,
            trainingLogs: [],
            depositeLogs: [],
            pagination: {
                page: 0,
                size: 10
            },
            pagination_1: {
                page: 0,
                size: 10
            },
            showDepositeDlg: false,
            canAddMoney: false,
            depositeNum: 0,
            depositeNote: ''
        }
    },
    computed: {
        hasAvatar () {
            return !_.isUndefined(this.trainee.properties) &&
                !_.isUndefined(this.trainee.properties.find(e => e.name === 'avatar')) &&
                !_.isUndefined(this.trainee.properties.find(e => e.name === 'avatar').value) &&
                !_.isEmpty(this.trainee.properties.find(e => e.name === 'avatar').value)
        },
        canDeposite () {
            return !_.isUndefined(this.trainee.trainingAccounts) &&
                this.trainee.trainingAccounts.length > 0
        }
    },
    mounted () {
        this.trainee.id = this.$route.params.id
        this.getTrainee(this.trainee.id).then(data => {
            this.trainee = data
        }).catch(err => {
            this.showNotification({color: 'error', text: err})
        })
    },
    methods: {
        ...mapActions('trainee', ['getTrainee', 'getTrainingLogs', 'getDepositeLogs', 'addMoney']),
        ...mapMutations('common', ['showNotification']),
        back () {
            this.$router.go(-1);
        },
        loadTrainingLog ($state) {
            const traineeId = this.$route.params.id
            const accountId = this.trainee.trainingAccounts[this.activeTab].id
            this.pagination.page++
            const payload = {
                traineeId,
                accountId,
                pagination: this.pagination
            }

            this.getTrainingLogs(payload).then(data => {
                if (data.content.length > 0) {
                    this.trainingLogs = _.concat(this.trainingLogs, data.content)
                    $state.loaded()
                } else {
                    $state.complete()
                    this.pagination.page--
                }
            }).catch(err => {
                this.trainingLogs = []
                this.pagination.page = 0
                $state.complete()
                this.showNotification({color: 'error', text: err})
            })
        },
        loadDepositeLog ($state) {
            const traineeId = this.$route.params.id
            const accountId = this.trainee.trainingAccounts[this.activeTab].id
            this.pagination_1.page++
            const payload = {
                traineeId,
                accountId,
                pagination: this.pagination_1
            }

            this.getDepositeLogs(payload).then(data => {
                if (data.content.length > 0) {
                    this.depositeLogs = _.concat(this.depositeLogs, data.content)
                    $state.loaded()
                } else {
                    $state.complete()
                    this.pagination_1.page--
                }
            }).catch(err => {
                this.depositeLogs = []
                this.pagination_1.page = 0
                $state.complete()
                this.showNotification({color: 'error', text: err})
            })
        },
        doAddMoney () {
            const payload = {
                traineeId: this.$route.params.id,
                accountId: this.trainee.trainingAccounts[this.activeTab].id,
                amount: this.depositeNum,
                comment: this.depositeNote
            }
            this.addMoney(payload).then(data => {
                this.getTrainee(this.trainee.id).then(data => {
                    this.trainee = data
                    this.depositeLogs = []
                    this.pagination_1.page = 0
                    this.$refs.infiniteDepositeLog.forEach(c => c.$emit('$InfiniteLoading:reset'))
                    this.showDepositeDlg = false
                    this.$refs.depositeForm.reset()
                    this.showNotification({color: 'success', text: this.$t('trainee.depositeDone')})
                }).catch(err => {
                    this.showNotification({color: 'error', text: err})
                })
            }).catch(err => {
                this.showNotification({color: 'error', text: err})
            })
        },
        closeDepositeDlg () {
            this.showDepositeDlg = false
        },
        validAmount (value) {
            return value > 0 ? true : this.$t('trainee.rule.deposite')
        }
    },
    watch: {
        activeTab: {
            handler (newVal, oldVal) {
                this.activeFuncTab = 0
                this.trainingLogs = []
                this.depositeLogs = []
                this.pagination.page = 0
                // this.pagination_1.page = 0
                this.$refs.infiniteTrainingLog.forEach(c => c.$emit('$InfiniteLoading:reset'))
                // this.$refs.infiniteDepositeLog.forEach(c => c.$emit('$InfiniteLoading:reset'))
            },
            deep: false
        },
        activeFuncTab: {
            handler (newVal, oldVal) {
                if (newVal === 1) {
                    // switch to deposite log
                    if (this.depositeLogs.length === 0) {
                        this.pagination_1.page = 0
                        this.$refs.infiniteDepositeLog.forEach(c => c.$emit('$InfiniteLoading:reset'))
                    }
                }
            }
        }
    }
}
</script>
<style lang="less" scoped>
.log_cell {
    font-size: 14px;
    height: 32px;
}
</style>
