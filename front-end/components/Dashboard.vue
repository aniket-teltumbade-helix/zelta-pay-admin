<template>
  <v-container>
    <v-flex xs9="xs9" class="d-flex flex-row">
      <v-layout wrap="wrap">
        <v-flex xs11="xs11">
          <v-card class="text-md-center" height="100%">
            <v-card-text>
              <div class="display-1 mb-2">
                {{ totalVendorCounts ? totalVendorCounts : 0 }}
              </div>
              Total Vendors
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout wrap="wrap">
        <v-flex xs11="xs11">
          <v-card class="text-md-center" height="100%">
            <v-card-text>
              <div class="display-1 mb-2">
                {{ pendingVendorCounts ? pendingVendorCounts : 0 }}
              </div>
              Pending KYC Requests
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout wrap="wrap">
        <v-flex xs11="xs11">
          <v-card class="text-md-center" height="100%">
            <v-card-text>
              <div class="display-1 mb-2">
                {{ verifiedVendorCounts ? verifiedVendorCounts : 0 }}
              </div>
              Verified Vendors
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-row>
      <v-col cols="12" lg="12">
        <v-data-table
          :headers="headers"
          :items="vendorList"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-dialog v-model="dialog" max-width="100%" width="500px">
              <v-card width="100%">
                <v-card-title>Rejection Form</v-card-title>
                <v-card-text>
                  <v-radio-group v-model="reasons">
                    <v-radio
                      v-for="reasonOption in reasonOptions"
                      v-bind:key="reasonOption.label"
                      :value="reasonOption.value"
                      @change="reason = reasonOption.value"
                    >
                      <template v-slot:label>
                        <div>{{ reasonOption.label }}</div>
                      </template>
                    </v-radio>
                  </v-radio-group>
                  <v-form
                    class="text-center"
                    @submit.prevent="kycReqSubmit"
                    ref="form"
                  >
                    <v-textarea
                      label="Reason Details"
                      auto-grow
                      outlined
                      rows="3"
                      row-height="25"
                      shaped
                      v-model="details"
                    >
                    </v-textarea>
                    <v-btn type="submit">Submit</v-btn>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-dialog>
          </template>
          <template v-slot:[`item.kyc.address`]="{ item }">
            <v-btn :href="item.kyc.address">View</v-btn>
          </template>
          <template v-slot:[`item.kyc.business`]="{ item }">
            <v-btn :href="item.kyc.business">View</v-btn>
          </template>
          <template v-slot:[`item.kyc.identity`]="{ item }">
            <v-btn :href="item.kyc.identity">View</v-btn>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn
              v-if="item.status === 'pending'"
              @click="() => acceptApproval(item.id)"
              >Approve</v-btn
            >
            <v-btn v-if="item.status === 'pending'" @click="rejectDialog(item)"
              >Reject</v-btn
            >
            <div v-else>
              {{ item.status }}
            </div>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      headers: [
        {
          text: "User",
          align: "start",
          sortable: false,
          value: "email",
        },
        { text: "Address", value: "kyc.address" },
        { text: "Business", value: "kyc.business" },
        { text: "Identity", value: "kyc.identity" },
        { text: "Actions", value: "actions" },
      ],
      reasonOptions: [
        {
          label: "DOCUMENT INCOMPLETE",
          value: "DOCUMENT INCOMPLETE",
        },
        {
          label: "DOCUMENT UNREADABLE",
          value: "DOCUMENT UNREADABLE",
        },
        {
          label: "DO NOT MATCH WITH USER DATA",
          value: "DO NOT MATCH WITH USER DATA",
        },
        {
          label: "DOCUMENT NOT ACCEPTED",
          value: "DOCUMENT NOT ACCEPTED",
        },
        {
          label: "DOCUMENT EXPIRED",
          value: "DOCUMENT EXPIRED",
        },
        {
          label: "DOCUMENT MISSING",
          value: "DOCUMENT MISSING",
        },
        {
          label: "DOCUMENT FALSIFIED",
          value: "DOCUMENT FALSIFIED",
        },
      ],
      dialog: false,
      reasons: "",
      details: "",
      dialogItem: {
        id: "",
      },
    };
  },
  methods: {
    ...mapActions("vendor", ["fetchVendors", "kycApproval"]),
    rejectDialog(item) {
      this.dialog = true;
      this.dialogItem = item;
      console.log(item.id);
    },
    acceptApproval(id) {
      this.kycApproval({
        id,
        status: "verified",
      })
        .then((res) => this.$toast.success(res.message))
        .then(() => this.fetchVendors());
    },
    kycReqSubmit() {
      this.kycApproval({
        id: this.dialogItem.id,
        approval: {
          reason: this.reasons,
          details: this.details,
        },
        status: "rejected",
      })
        .then((res) => this.$toast.success(res.message))
        .then(() => this.fetchVendors())
        .then(() => (this.dialog = false))
        .finally(() => this.$refs.form.reset());
    },
  },
  created() {
    this.fetchVendors();
  },
  computed: {
    ...mapGetters("vendor", [
      "totalVendorCounts",
      "verifiedVendorCounts",
      "pendingVendorCounts",
      "vendorList",
    ]),
  },
};
</script>

<style scoped></style>
