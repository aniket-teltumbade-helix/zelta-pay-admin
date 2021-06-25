<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{ title }}<sup class="body-1">{{ subtitle }}</sup>
          </v-list-item-title>
          <v-list-item-subtitle> {{ userName }} </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list>
        <v-list-group
          v-for="item in items"
          :key="item.title"
          :class="{ noindicator: !item.items }"
          link
        >
          <template #activator>
            <v-list-item :to="item.link">
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-list-item
            v-for="subItem in item.items"
            :key="subItem.title"
            :to="subItem.link"
          >
            <v-list-item-content class="pl-5">
              <v-list-item-title>{{ subItem.title }}</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-icon>{{ subItem.action }}</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ title }} {{ subtitle }} Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text
        ><v-avatar><v-img :src="userPic"></v-img></v-avatar
      ></v-btn>
      <v-icon medium color="red" @click="logout">mdi-logout</v-icon>
    </v-app-bar>

    <v-main>
      <Nuxt />
    </v-main>
    <v-footer :padless="padless">
      <v-card flat tile width="100%" class="white text-right">
        <v-card-text class="black--text">
          Copyright ©{{ new Date().getFullYear() }}
          <strong>ZeltaPay.</strong> All rights reserved.
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  middleware: 'auth',
  data: () => ({
    title: 'ZeltaPay',
    subtitle: 'Admin',
    drawer: null,
    padless: false,
    items: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard', link: '/' },
      { title: 'Profile', icon: 'mdi-user', link: '/profile' },
      { title: 'About', icon: 'mdi-help-box' },
    ],
  }),
  computed: {
    userPic() {
      return this.$auth.user.photoURL
        ? this.$auth.user.photoURL
        : this.$auth.user.displayName
        ? `https://ui-avatars.com/api/?name=${this.$auth.user.displayName}`
        : `https://ui-avatars.com/api/?name=${
            this.$auth.user.email.split('@')[0]
          }`
    },
    userName() {
      return this.$auth.user.displayName
        ? this.$auth.user.displayName
        : this.$auth.user.email.split('@')[0]
    },
  },
  methods: {
    logout() {
      this.$auth.logout()
    },
  },
}
</script>
<style>
.noindicator .v-list-item .v-list-item__icon {
  display: none;
}
.noindicator .v-list-group__header {
  padding: 0;
}
.noindicator .v-list-group__header .v-list-item {
  padding: 0 32px;
}
</style>
