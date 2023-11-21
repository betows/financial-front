<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card style="height: 242px; border-radius: 12px;">
          <v-card-title class="headline">
            Projeção de saldo futuro
          </v-card-title>
          <v-card-text>
            <!-- <v-row>
              <v-col>
                <v-form @submit.prevent="calculateFutureBalance">
                  <v-row>
                    <v-col>
                      <v-btn type="submit" color="info">
                        Calcular balanço futuro
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-col>
            </v-row> -->

            <v-row>
              <v-col>
                <v-alert v-if="futureBalance !== null" :value="true" type="info">
                  Seu saldo projetado será de: R$ {{ futureBalance }}
                </v-alert>
                <v-alert v-else :value="true" type="info">
                  Sem dados de projeção disponíveis
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
      futureBalanceDate: "", // Date for projecting the future balance
      futureBalance: null   // Projected future balance
    };
  },
  mounted() {
    this.fetchFutureBalance();
  },
  computed: {
    fetchedFutureBalance() {
      return this.$store.state.futureBalance;
    }
  },
  methods: {
    calculateFutureBalance() {
      // Implement logic to calculate the future balance based on your backend data
      // For now, let's use a mock value
      this.futureBalance = 6000; // Mock future balance
    },
    fetchFutureBalance() {
      this.$store.dispatch("getBalance").then(() => {
        this.futureBalance = this.$store.state.balance;
      });
    }
  }
};
</script>

<style scoped>
/* Add specific styles for the FutureBalance component if necessary */
</style>
