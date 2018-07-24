<template>
  <v-app id="app">
    <v-toolbar color='indigo' app fixed>
      <v-toolbar-title class="white--text">{{ $t ('app.title') }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat class='white--text toolbar_menu' v-if='isLogged' @click="switchFunc('Home')">
          {{ $t ('toolbar.home')}}
        </v-btn>
        <v-btn flat class='white--text toolbar_menu' v-if='isLogged' @click="switchFunc('Trainee')">
          {{ $t ('toolbar.trainee')}}
        </v-btn>
        <v-btn flat class='white--text toolbar_menu' v-if='isLogged'>
          {{ $t ('toolbar.trainer')}}
        </v-btn>
        <v-btn flat class='white--text toolbar_menu' v-if='isLogged' @click="switchFunc('Training')">
          {{ $t ('toolbar.training')}}
        </v-btn>
        <v-menu bottom offset-y>
        <v-btn flat slot='activator'>
            <v-avatar color='white' size='40'>
              <img src='./assets/aaron.png' />
            </v-avatar>
        </v-btn>
        <v-list v-if='isLogged'>
          <v-list-tile>
            <v-list-tile-title>{{ $t ('app.logged_user', [loggedUser ? loggedUser.username : '']) }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view/>
        <!--snackbar提示创建成功与否的对话框-->
      <v-snackbar v-model="noteSettings.show" :color="noteSettings.color" :multi-line="true" :timeout="noteSettings.timeout" :top="true">
          {{noteSettings.text}}
          <v-btn dark flat @click="hideNotification">{{$t('common.ok')}}</v-btn>
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'App',
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      loggedUser: state => state.user.loggedUser,
      noteSettings: state => state.common.noteSettings
    }),
    ...mapGetters('user', ['isLogged'])
  },
  methods: {
    ...mapActions('user', ['restoreUserProfile']),
    ...mapMutations('common', ['hideNotification']),
    switchFunc (moduleName) {
      this.$router.push({name: moduleName});
    }
  },
  mounted () {
    // to restore the logged user
    if (this.isLogged) {
      this.restoreUserProfile()
    }
  }
}
</script>

<style lang="less" scoped>
.toolbar_menu {
  height: inherit;
}
</style>
