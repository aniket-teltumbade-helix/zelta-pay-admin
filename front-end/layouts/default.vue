<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-toolbar-items class="hidden-sm-and">
        <v-btn to="/login" nuxt> Login </v-btn>
        <v-btn to="/register" nuxt> Register </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <v-container fill-height>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      left: true,
      leftDrawer: false,
      title: 'ZeltaPay',
    }
  },
  auth: false,
}
</script>
