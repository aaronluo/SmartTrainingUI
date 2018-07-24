<template>
    <v-container grid-list-md>
        <v-layout row wrap>
            <v-btn  icon dark color='indigo' @click="back"><v-icon>keyboard_arrow_left</v-icon></v-btn>
            <div v-if="training" style="padding: 7px"><h2>{{training.title || ''}} ({{$t(`training.type.${training.type}`)}})</h2></div>
        </v-layout>
        <v-layout row wrap v-if="training">
            <v-flex xs12 sm12 md12>
                <v-card color="white" >
                    <v-card-title style="padding: 10px">
                        <v-container style="padding: 0px">
                            <v-layout row wrap>
                                <v-flex xs1 class='card-label'><b>{{$t('training.label.startDate')}}:</b></v-flex>
                                <v-flex xs1>{{training.startDate}}</v-flex>
                                <v-flex xs1 class='card-label'><b>{{$t('training.label.endDate')}}:</b></v-flex>
                                <v-flex xs1>{{training.endDate}}</v-flex>
                                <v-flex xs1 class='card-label'><b>{{$t('training.label.unitPrice')}}:</b></v-flex>
                                <v-flex xs1>{{$n(training.unitPrice, 'currency')}}</v-flex>
                                <v-flex xs1 class='card-label'><b>{{$t('training.label.limitation')}}:</b></v-flex>
                                <v-flex xs1>{{training.attendeeCount}} / {{training.limitation}}</v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-title>
                </v-card>
            </v-flex>
            <v-flex xs12 sm12 md12 v-if="users.length > 0">
                <v-list>
                    <template>
                        <v-list-tile v-for="user in users" :key="user.id">
                            <v-list-tile-avatar><img src='../assets/avatar.png' /></v-list-tile-avatar>
                            <v-list-tile-content>
                                {{user.username}}
                                {{user.createDate}}
                            </v-list-tile-content>
                        </v-list-tile>
                    </template>
                </v-list>
                <v-pagination v-model="pagination.page" :length="pagination.totalPages" circle></v-pagination>
            </v-flex>
            <v-flex xs12 sm12 md12 v-else>
                    <v-alert :value="true" color="info">{{loadingNote}}</v-alert>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
    name: 'TrainingDetail',
    data () {
        return {
            loadingNote: this.$t('common.loading'),
            training: null,
            pagination: {
                page: 1,
                size: 7,
                totalPages: 0
            },
            users: []
        }
    },
    mounted () {
        let trainingId = this.$route.params.id
        let _this = this
        _this.getTraining(trainingId).then(data => {
            _this.training = data

            _this.getUsers(trainingId, this.pagination.page, this.pagination.size)
        }).catch(err => {
            let payload = {color: 'error', text: err}
            _this.showNotification(payload)
            _this.training = null
        })
    },
    methods: {
        ...mapMutations('common', ['showNotification']),
        ...mapActions('training', ['getTraining', 'getInvolvedUsers']),
        back () {
            this.$router.go(-1);
        },
        getUsers (trainingId, page, size) {
            let payload = {
                trainingId: trainingId,
                page: page,
                size: size
            }

            this.getInvolvedUsers(payload).then(data => {
                // this.users = _.concat(this.users, data.content)
                this.users = data.content
                this.pagination.page = data.number + 1
                this.pagination.totalPages = data.totalPages
                if (this.users.length === 0) {
                    this.loadingNote = this.$t('training.none_attendee')
                }
            }).catch(err => {
                let payload = {color: 'error', text: err}
                this.showNotification(payload)
                this.users = []
                this.pagination = {
                    page: 1,
                    size: 1,
                    totalPages: 0
                }
            })
        }
    },
    watch: {
        pagination: {
            handler (newVal, oldVal) {
                this.getUsers(this.training.id, newVal.page, this.pagination.size)
            },
            deep: true
        }
    }
}
</script>
<style lang="less" scoped>

</style>
