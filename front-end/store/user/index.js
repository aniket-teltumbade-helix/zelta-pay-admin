/* eslint-disable prettier/prettier */
const state = () => ({
  data: null,
  message: []
})
const getters = {}
const actions = {
  async register ({ commit }, data) {
    const logResult = await this.$axios.post(
      'http://localhost:9898/auth/register',
      {
        email: data.email,
        password: data.password
      }
    )
    commit('addUser', logResult)
    return logResult
  },
  async update ({ commit }, data) {
    const logResult = await this.$axios.post(
      'http://localhost:9898/auth/update',
      data
    )
    commit('updateUser', logResult)
    return logResult
  },
  async updatePhotoUrl ({ commit }, data) {
    const formData = new FormData()
    formData.append('file', data)
    const logResult = await this.$axios.post(
      'http://localhost:9898/auth/update/image',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    commit('updateUser', logResult)
    return logResult
  }
}
const mutations = {
  addUser (state, login) {
    state.data = login
  },
  updateUser (state, data) {
    const { message } = data.data
    state.message.push(message)
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
