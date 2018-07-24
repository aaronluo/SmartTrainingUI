<template>
    <v-container grid-list-md>
        <v-layout row>
            <v-flex xs12 sm12 md12>
                <v-toolbar dense>
                    <v-toolbar-items>
                        <v-text-field hide-details prepend-icon="search" single-line></v-text-field>
                        <v-btn color="primary" style="margin-left: 15px">{{$t('common.search')}}</v-btn>
                        <v-btn color="success" style="margin-left: 15px" @click.stop="newTraining()">{{$t('training.new')}}</v-btn>
                    </v-toolbar-items>
                </v-toolbar>
            </v-flex>
        </v-layout>
        <v-layout row style="margin-top:10px">
            <v-flex xs12 sm12 md12>
                <v-layout row wrap>
                    <v-flex xs5 sm4 md4 v-for="t in avaiableTrainings" :key="t.id" style="margin:0px">
                        <v-card color="white" :to="`/trainings/${t.id}`">
                            <v-card-title>
                                <v-container style="padding:0">
                                    <v-layout row wrap>
                                        <v-flex xs12><h3>{{t.title}} ({{$t(`training.type.${t.type}`)}})</h3></v-flex>
                                        <v-flex xs12 style="margin-bottom: 2px">
                                            <v-divider></v-divider>
                                        </v-flex>
                                        <v-flex xs6 sm5 md4 class='card-label'>{{$t('training.label.startDate')}}:</v-flex>
                                        <v-flex xs6 sm6 md8>{{t.startDate}}</v-flex>
                                        <v-flex xs6 sm5 md4 class='card-label'>{{$t('training.label.endDate')}}:</v-flex>
                                        <v-flex xs6 sm6 md8>{{t.endDate}}</v-flex>
                                        <v-flex xs6 sm5 md4 class='card-label'>{{$t('training.label.unitPrice')}}:</v-flex>
                                        <v-flex xs6 sm6 md8>{{$n(t.unitPrice, 'currency')}}</v-flex>
                                        <v-flex xs6 sm5 md4 class='card-label'>{{$t('training.label.limitation')}}:</v-flex>
                                        <v-flex xs6 sm6 md8>{{t.attendeeCount}} / {{t.limitation}}</v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-title>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <!--新建课程Dlg -->
        <v-dialog v-model="showNewTrainingDlg" max-width="480px" persistent>
            <v-card>
                <v-card-title><h3>{{$t('training.new')}}</h3></v-card-title>
                <v-card-text>
                    <v-form ref='trainingForm' v-model='canCreateTraining'>
                        <v-text-field v-model='training.title' :label="$t('training.label.title')" :rules="[validTitle]"></v-text-field>
                        <v-textarea v-model='training.description' :label="$t('training.label.description')" rows='3'></v-textarea>
                        <v-menu ref='startDatePicker' :close-on-content-click="false" :close-on-click="false" style="width:45%"
                            v-model="showStartDatePicker" :return-value.sync="training.startDate" lazy transition="scale-transition">
                            <v-text-field v-model='training.startDate' :label="$t('training.label.startDate')" slot='activator' readonly :rules="[v => !!v || $t('training.rule.date.required')]"></v-text-field>
                            <v-date-picker v-model="training.startDate" no-title scrollable locale="zh-cn"
                                :min="today"
                                @input="$refs.startDatePicker.save(training.startDate)"></v-date-picker>
                        </v-menu>
                        <v-menu ref='endDatePicker' :close-on-content-click="false" :close-on-click="false" style="width:45%"
                            v-model="showEndDatePicker" :return-value.sync="training.endDate" lazy transition="scale-transition">
                            <v-text-field v-model='training.endDate' :label="$t('training.label.endDate')" slot='activator' readonly></v-text-field>
                            <v-date-picker v-model="training.endDate" no-title scrollable locale="zh-cn"
                                :min="minEndDate"
                                @input="$refs.endDatePicker.save(training.endDate)"></v-date-picker>
                        </v-menu>
                        <v-select v-model="training.type" :label="$t('training.label.type')" :items="trainingTypeOptions" item-text="label" item-value="value" dense :rules="[v => !!v || $t('training.rule.type.required')]">
                        </v-select>
                        <v-text-field v-model="training.unitPrice" :label="$t('training.label.unitPrice')" :prefix="$t('common.currency')" mask="######" :rules="[validUnitPrice]"></v-text-field>
                        <v-text-field v-model="training.limitation" :label="$t('training.label.limitation')"  mask="####" :rules="[validLimitation]"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn falt color="success" :disabled="!canCreateTraining" @click.stop="doCreateNewTraining">{{$t('common.ok')}}</v-btn>
                    <v-btn falt color="error" @click.stop="closeNewTrainingDlg">{{$t('common.cancel')}}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import moment from 'moment'

export default {
    name: 'Training',
    data () {
        return {
            showNewTrainingDlg: false,
            showStartDatePicker: false,
            showEndDatePicker: false,
            training: {},
            canCreateTraining: false,
            today: moment().format('YYYY-MM-DD'),
            trainingTypeOptions: [
                {label: this.$t('training.type.CLASS'), value: 'CLASS'},
                {label: this.$t('training.type.MONTH'), value: 'MONTH'},
                {label: this.$t('training.type.QUARTER'), value: 'QUARTER'},
                {label: this.$t('training.type.YEAR'), value: 'YEAR'}
            ]
        }
    },
    computed: {
        ...mapState('training', ['avaiableTrainings']),
        minEndDate () {
            let minStartDate = this.training.startDate ? moment(this.training.startDate) : moment()

            return minStartDate.add(1, 'd').format('YYYY-MM-DD')
        }
    },
    methods: {
        ...mapActions('training', ['loadAvaiableTrainings', 'createNewTraining']),
        ...mapMutations('common', ['showNotification']),
        validTitle (value) {
            if (value && value.length <= 20) {
                return true
            } else {
                return this.$t('training.rule.title')
            }
        },
        validLimitation (value) {
            if (value && value > 0) {
                return true
            } else {
                return this.$t('training.rule.limitation')
            }
        },
        validUnitPrice (value) {
            return value >= 0 ? true : this.$t('training.rule.unitPrice')
        },
        newTraining () {
            this.training = {
                limitation: 100,
                unitPrice: 100
            }
            this.showNewTrainingDlg = true
        },
        closeNewTrainingDlg () {
            this.showNewTrainingDlg = false
            this.$refs.trainingForm.reset()
        },
        doCreateNewTraining () {
            this.createNewTraining(this.training).then(res => {
                this.loadAvaiableTrainings();
                this.closeNewTrainingDlg()
                let payload = {text: this.$t('training.create.success')}
                this.showNotification(payload)
            }).catch(err => {
                let payload = {color: 'error', text: this.$t('training.create.error', err)}
                this.showNotification(payload)
            })
        }
    },
    mounted () {
        // to load avaiable trainings
        this.loadAvaiableTrainings();
    }
}
</script>
<style lang="less" scoped>
</style>
