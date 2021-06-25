const state = () => ({
  list: null,
  count: 0,
  pending: 0,
  verified: 0,
  message: []
})
const getters = {
  vendorList (state) {
    return state.list ? state.list : []
  },
  totalVendorCounts (state) {
    return state.count
  },
  pendingVendorCounts (state) {
    return state.pending
  },
  verifiedVendorCounts (state) {
    return state.verified
  }
}
const actions = {
  async fetchVendors ({ commit }) {
    let reply = await this.$axios.get('http://localhost:9898/vendor/all')
    console.log({ reply })
    commit('loadVendors', reply.data)
    return reply.data.message ? 'Succesfully Loaded!' : 'Something Went Wrong!'
  },
  async kycApproval ({ commit }, data) {
    let reply = await this.$axios.post(
      'http://localhost:9898/vendor/kyc/approval',
      data
    )
    commit('kycRequest', reply.data)
    return reply.data
  }
}
const mutations = {
  loadVendors (state, data) {
    state.list = data.message
    state.count = data.message ? data.message.length : 0
    state.pending = data.message
      ? data.message.filter(el => el.status === 'pending').length
      : 0
    state.verified = data.message
      ? data.message.filter(el => el.status === 'verified').length
      : 0
  },
  kycRequest (state, data) {
    state.message.push(data)
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
