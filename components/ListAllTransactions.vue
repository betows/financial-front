<template>
  <v-container style="padding: 0px;">
    <v-card style="border-radius: 12px;">
      <v-card-title class="headline">
        Todas as transações
      </v-card-title>
      <v-card-text>
        <v-row align="center">
          <v-col>
            <v-select
              v-model="selectedFilters"
              :items="transactionFilters"
              label="Filtrar por categoria"
              outlined
              multiple
              chips
              small-chips
              allow-overflow
              :menu-props="{ offsetY: true }"
              dense
            >
              <template #selection="{ item }">
                <v-chip small>
                  {{ item }}
                  <v-icon style="padding-left: 8px;" small @click="selectedFilters.splice(selectedFilters.indexOf(item), 1)">
                    mdi-close
                  </v-icon>
                </v-chip>
                <!-- <v-chip v-else>
                  {{ `${selectedFilters.length} categories selected` }}
                </v-chip> -->
              </template>
            </v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-list>
              <v-list-item-group v-if="filteredTransactions.length > 0">
                <v-list-item v-for="transaction in filteredTransactions" :key="transaction.id">
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ transaction.category }} - R$ {{ transaction.amount }} - {{ transaction.date }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
              <v-alert v-else :value="true" type="info">
                Não há transações disponíveis
              </v-alert>
            </v-list>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      selectedFilters: [],       // Selected filters for transactions
      transactions: [],          // List of all transactions (income and expenses)
      transactionFilters: []     // Categories for filtering transactions
    };
  },
  // You may want to fetch transactions when the component is created
  created() {
    this.fetchTransactions();
  },
  computed: {
    filteredTransactions() {
      // Filter transactions based on the selected categories
      return this.selectedFilters.length > 0
        ? this.transactions.filter(transaction => this.selectedFilters.includes(transaction.category))
        : this.transactions;
    }
  },
  methods: {
    // Simulate fetching transactions from the backend
    fetchTransactions() {
      this.$store.dispatch("getTransactions").then(() => {
        this.transactions = this.$store.state.transactions;
        this.transactionFilters = [...new Set(this.transactions.map(transaction => transaction.category))];
        this.transactionFilters.unshift("Todos");
      });
    }
  }
};
</script>

<style scoped>
/* Add specific styles for the ListAllTransactions component if necessary */
</style>
