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
                    <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center;">
                      <div>
                        {{ transaction.category }}
                      </div>
                      <div>
                        R$ {{ transaction.amount }} 
                      </div>
                      <div>
                        {{ formatDate(transaction.date) }}
                      </div>
                      
                      <!-- <v-icon small @click="deleteTransaction(transaction.id)">
                        mdi-delete
                      </v-icon> -->
                    </div>
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
      selectedFilters: [],       
      transactionFilters: []    
    };
  },
  mounted() {
    this.fetchTransactions();
  },
  computed: {
    transactions: {
      get() {
        return this.$store.state.transactions;
      },
      set(value) {
        this.$store.commit("setTransactions", value);
      }
    },
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
        this.transactionFilters = [...new Set(this.transactions.map(transaction => transaction.category))];
      });
    },
    formatDate(date) {
      let formattedDate = new Date(date);
      return formattedDate.toLocaleDateString("pt-BR");
    }
  }
};
</script>

<style scoped>
/* Add specific styles for the ListAllTransactions component if necessary */
</style>
