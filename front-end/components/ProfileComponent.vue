<template>
  <v-container fluid>
    <Loader :loading="loader" />

    <v-row>
      <v-col cols="12" md="6" class="py-5">
        <v-flex>
          <v-card>
            <v-layout>
              <v-avatar size="300" class="mx-auto mt-5">
                <v-img :src="avatar" rounded />
              </v-avatar>
            </v-layout>
            <v-card-actions>
              <v-container>
                <v-row justify="center" class="mb-5">
                  <v-col cols="12" md="3">
                    <v-file-input
                      v-model="buttonModel"
                      class="file-button"
                      accept="image/png, image/jpeg, image/jpg"
                      :label="userPhoto ? 'REPLACE' : 'ADD'"
                      prepend-icon=""
                      dense
                      outlined
                      filled
                      clearable
                      @change="(e) => updatePic(e)"
                    ></v-file-input>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-layout>
                      <v-btn block dense @click="removePic"> Remove </v-btn>
                    </v-layout>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title> Email</v-card-title>
          <v-card-subtitle v-if="!emailField" @click="(e) => emailToggle(e)">
            {{ this.$auth.user.email }}
          </v-card-subtitle>
          <v-text-field
            v-if="emailField"
            class="mx-5"
            name="email"
            :value="userEmail"
            autofocus
            append-icon="mdi-content-save"
            dense
            @blur="(e) => emailToggle(e)"
          />
        </v-card>
        <v-divider class="my-3" />
        <v-card>
          <v-card-title> Password </v-card-title>
          <v-card-subtitle v-if="!passField" @click="(e) => passToggle(e)">
            **************
          </v-card-subtitle>
          <v-text-field
            v-if="passField"
            class="mx-5"
            name="password"
            :value="password"
            autofocus
            append-icon="mdi-content-save"
            dense
            @blur="(e) => passToggle(e)"
          />
        </v-card>
        <v-divider class="my-3" />
        <v-card>
          <v-card-title> Phone Number </v-card-title>
          <v-card-subtitle v-if="!phoneField" @click="(e) => phoneToggle(e)">
            {{ userPhone ? userPhone : 'N/A' }}
          </v-card-subtitle>
          <v-text-field
            v-if="phoneField"
            class="mx-5"
            :value="userPhone ? userPhone : ''"
            :rules="phoneRules"
            name="phoneNumber"
            type="tel"
            autofocus
            append-icon="mdi-content-save"
            dense
            @blur="(e) => phoneToggle(e)"
          />
        </v-card>
        <v-divider class="my-3" />
        <v-card>
          <v-card-title> Name </v-card-title>
          <v-card-subtitle v-if="!nameField" @click="(e) => nameToggle(e)">
            {{ userName ? userName : 'N/A' }}
          </v-card-subtitle>
          <v-text-field
            v-if="nameField"
            class="mx-5"
            :value="userName ? userName : ''"
            name="displayName"
            autofocus
            append-icon="mdi-content-save"
            dense
            @blur="(e) => nameToggle(e)"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import Loader from './Loader.vue'
export default {
  components: { Loader },
  props: { field: { type: String } },
  data() {
    return {
      emailField: false,
      passField: false,
      phoneField: false,
      nameField: false,
      password: '',
      email: '',
      phoneNumber: '',
      displayName: '',
      buttonModel: null,
      loader: false,
      phoneRules: [
        (v) =>
          /^\+(?:[0-9] ?){6,14}[0-9]$/.test(v) || 'Enter a valid phone number.',
      ],
    }
  },
  computed: {
    avatar() {
      return this.$auth.user.photoURL
        ? this.$auth.user.photoURL
        : this.$auth.user.displayName
        ? `https://ui-avatars.com/api/?name=${this.$auth.user.displayName}`
        : `https://ui-avatars.com/api/?name=${
            this.$auth.user.email.split('@')[0]
          }`
    },
    userEmail() {
      return this.$auth.user.email
    },
    userPhoto() {
      return this.$auth.user.photoURL
    },
    userPhone() {
      return this.$auth.user.phoneNumber
    },
    userName() {
      return this.$auth.user.displayName
    },
  },
  methods: {
    ...mapActions('user', ['update', 'updatePhotoUrl']),
    updateUser(name, value) {
      const info = {}
      info[name] = value
      console.log(info)
      this.update(info)
        .then(async (res) => {
          const userdata = await this.$auth.fetchUser()
          this.$auth.setUser(userdata.data.user)
          return res
        })
        .then((res) => {
          console.log(res.data)
          if (res.data.error) {
            this.$toast.error(`${res.data.error.message}`).goAway(3000)
          } else {
            this.$toast.success(`🏆${res.data.message}`).goAway(3000)
          }
        })
    },
    emailToggle(e) {
      console.log(e)
      if (e.target.value) {
        this.updateUser(e.target.name, e.target.value)
      }
      this.emailField = !this.emailField
    },
    passToggle(e) {
      if (e.target.value) {
        if (e.target.value.length > 8) {
          this.updateUser(e.target.name, e.target.value)
        } else {
          this.$toast.error('Something went wrong!').goAway(3000)
        }
      }
      this.passField = !this.passField
    },
    phoneToggle(e) {
      if (e.target.value) {
        this.updateUser(e.target.name, e.target.value)
      }
      this.phoneField = !this.phoneField
    },
    nameToggle(e) {
      if (e.target.value) {
        this.updateUser(e.target.name, e.target.value)
      }
      this.nameField = !this.nameField
    },
    updatePic(e) {
      if (e !== null) {
        this.loader = true
        this.updatePhotoUrl(e)
          .then(async (res) => {
            const userdata = await this.$auth.fetchUser()
            this.$auth.setUser(userdata.data.user)
            return res
          })
          .then((res) => {
            this.$toast.success(`🏆 ${res.data.message}`).goAway(3000)
            this.buttonModel = null
          })
          .then(() => (this.loader = false))
      }
    },
    removePic() {
      this.loader = true
      try {
        this.update({ photoURL: null })
          .then(async (res) => {
            const userdata = await this.$auth.fetchUser()
            this.$auth.setUser(userdata.data.user)
            return res
          })
          .then((res) => {
            this.$toast.success(`🏆${res.data.message}`).goAway(3000)
          })
          .then(() => (this.loader = false))
      } catch (error) {
        this.$toast
          .error('Something went wrong!')
          .goAway(3000)
          .then(() => (this.loader = false))
      }
    },
  },
}
</script>

<style>
.v-card__title {
  text-transform: capitalize;
}
.v-btn-add-avatar {
  min-width: 100% !important;
}
.file-button .v-text-field__slot .v-label.theme--light {
  left: 50% !important;
  transform: translateX(-50%) !important;
  color: black;
}
.file-button .v-input__slot {
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
}
.file-button fieldset {
  color: rgba(0, 0, 0, 0) !important;
}
</style>
