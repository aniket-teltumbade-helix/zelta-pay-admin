<template>
  <v-container fill-height>
    <v-row justify="center" align="center">
      <v-col cols="12" md="4">
        <div class="text-h4 text-center">Login</div>

        <v-divider class="mt-5 mb-5" />
        <v-form justify="center" align="center" @submit.prevent="userLogin">
          <v-text-field
            v-model="email"
            label="Email"
            placeholder="Enter your email"
            type="email"
            :rules="emailRules"
            autofocus
            shaped
            outlined
            class="mt-2 mb-2"
          >
          </v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            :rules="passwordRules"
            shaped
            outlined
            class="mt-2 mb-2"
          >
          </v-text-field>
          <v-btn class="mt-2 mb-2" type="submit">Login</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    email: '',
    password: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    passwordRules: [
      (v) => !!v || 'Password is required',
      (v) => (v && v.length >= 8) || 'Password must be more than 8 characters',
    ],
  }),
  head: {
    title: 'Login',
  },
  methods: {
    async userLogin() {
      try {
        const response = await this.$auth.loginWith('local', {
          data: { email: this.email, password: this.password },
        })
        await this.$auth.setUserToken(
          response.data.token,
          response.data.refreshToken
        )
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
    },
  },
}
</script>
<style scoped></style>
