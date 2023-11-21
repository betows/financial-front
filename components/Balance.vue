<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card style="height: 242px;">
          <v-card-title class="headline">
            Saldo atual
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <v-alert v-if="currentBalance !== null" :value="true" type="info">
                  Seu saldo atual é de: R$ {{ currentBalance }}
                </v-alert>
                <v-alert v-else :value="true" type="info">
                  Sem dados disponíveis
                </v-alert>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      currentBalance: null // You should fetch the current balance from your backend
    };
  },
  // You may want to fetch the current balance when the component is created
  created() {
    this.fetchCurrentBalance();
  },
  computed: {
    balance() {
      return this.$store.state.balance;
    },
    formattedCurrentBalance() {
      return this.currentBalance ? this.currentBalance.toFixed(2) : null;
    }
  },
  methods: {
    // Simulate fetching the current balance from the backend
    fetchCurrentBalance() {
      this.$store.dispatch("getCurrentBalance").then(() => {
        this.currentBalance = this.balance;
      });
    }
  }
};
</script>

<style scoped>
/* Add specific styles for the Balance component if necessary */
</style>
