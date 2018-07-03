<template>
  <v-app id="app">
    <v-toolbar color='indigo' app fixed>
      <v-toolbar-title class="white--text">{{ $t ('app.title') }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat class='white--text toolbar_menu' v-if='isLogged'>
        {{ $t ('toolbar.home')}}
      </v-btn>
      <v-btn flat class='white--text toolbar_menu' v-if='isLogged'>
        {{ $t ('toolbar.trainee')}}
      </v-btn>
      <v-btn flat class='white--text toolbar_menu' v-if='isLogged'>
        {{ $t ('toolbar.trainer')}}
      </v-btn>
      <v-btn flat class='white--text toolbar_menu' v-if='isLogged' @click="switchFunc('training')">
        {{ $t ('toolbar.training')}}
      </v-btn>
      <v-toolbar-items>
        <v-menu bottom offset-y>
        <v-btn flat slot='activator'>
            <v-avatar color='white' size='40'>
              <img src='./assets/avatar.png' />
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
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      loggedUser: state => state.user.loggedUser
    }),
    ...mapGetters('user', ['isLogged'])
  },
  methods: {
    ...mapActions('user', ['restoreUserProfile']),
    switchFunc (moduleName) {
      this.$router.push(moduleName);
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
