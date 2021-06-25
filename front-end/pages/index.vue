<template>
  <v-container class="pa-4" fluid="fluid" grid-list-md="grid-list-md">
    <v-layout wrap="wrap">
      <v-flex xs12="xs12">
        <h1 class="display-1 mb-1">Dashboard</h1>
      </v-flex>
    </v-layout>
    <Dashboard />
  </v-container>
</template>

<script>
import Dashboard from "../components/Dashboard.vue";
export default {
  layout: "sidebar",
  components: { Dashboard },
  head: {
    title: "Dashboard",
  },
};
</script>

<style scoped></style>
