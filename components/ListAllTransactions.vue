<template>
  <v-container style="padding: 0px;">
    <v-card style="border-radius: 12px; padding: 8px;">
      <v-card-title class="headline">
        Todas as transações
      </v-card-title>
      <v-card-text>
        <v-row align="center">
          <v-col>
            <v-select
              v-model="selectedFilters"
              :items="categories"
              label="Filtrar por categoria"
              outlined
              multiple
              item-text="text"
              item-value="value"
              chips
              small-chips
              allow-overflow
              :menu-props="{ offsetY: true }"
            >
              <template #selection="{ item }">
                <v-chip small>
                  {{ item.text }}
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
                <v-list-item v-for="(transaction, index) in filteredTransactions" :key="index">
                  <v-list-item-content @click="seeDetails(transaction)" style="display: flex; flex-direction: row; justify-content: space-between; align-items: center;">
                    <div style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
                      <!-- Fixed width for the category column -->
                      <div style="width: 150px; font-weight: 700;">
                        {{ formatCategory(transaction.category) }}
                      </div>
                      <div :style="'font-weight: 700;' + 'color: ' + getTransactionColor(transaction)">
                        {{ formatCurrency(transaction.amount, transaction.type) }} 
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
    <v-dialog v-model="seeDetailsDialog" width="500px">
      <v-card>
        <v-card-title style="display: flex; flex-direction: row; justify-content: space-between;">
          Detalhes da transação 
          <v-icon @click="seeDetailsDialog = false">
            mdi-close
          </v-icon>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-alert v-if="transactionDetails !== null" :value="true" :color="transactionDetails.type === 'RECEITA' ? '#2E8B57' : '#880808'"> 
                <div style="display: flex; flex-direction: column;"> 
                  <div style="display: flex; flex-direction: row; font-weight: 700;">
                    <v-icon size="18">
                      mdi-currency-usd
                    </v-icon>
                    {{ transactionDetails.type === 'RECEITA' ? 'Receita' : 'Despesa' }}
                  </div>
                  <div style="display: flex; flex-direction: column; justify-content: space-between; align-items: center; margin: 16px 0px 0px 6px;">
                    <div>
                      No dia {{ formatDate(transactionDetails.date) }} você adicionou uma transação na categoria {{ formatCategory(transactionDetails.category) }}
                    </div>
                    <div :style="'font-weight: 700; align-self: flex-start;'">
                      no valor de {{ transactionDetails.amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) }} 
                    </div>
                  </div>
                </div>
              </v-alert>
              <v-alert v-else :value="true" type="info">
                Sem dados disponíveis
              </v-alert>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      selectedFilters: [],
      transactionDetails: null,
      seeDetailsDialog: false       
    };
  },
  props: {
    transactions: {
      type: Array,
      required: true
    },
    categories: {
      type: Array,
      required: true
    }
  },
  computed: {
    filteredTransactions() {
      // Filter transactions based on the selected categories
      return this.selectedFilters.length > 0
        ? this.transactions.filter(transaction => this.selectedFilters.includes(transaction.category))
        : this.transactions;
    },
    futureBalance() {
      // Calculate the future balance based on the transactions
      let balance = 0;
      this.transactions.forEach(transaction => {
        if (transaction.type === "RECEITA") {
          balance += transaction.amount;
        } else {
          balance -= transaction.amount;
        }
      });
      return balance;
    }
  },
  methods: {
    formatDate(date) {
      let formattedDate = new Date(date);
      return formattedDate.toLocaleDateString("pt-BR");
    },
    formatCategory(category) {
      switch (category) {
      case "SALARIO":
        return "Salário";
      case "DECIMO_TERCEIRO":
        return "Décimo terceiro";
      case "FERIAS":
        return "Férias";
      case "OUTROS":
        return "Outros";
      case "ALIMENTACAO":
        return "Alimentação";
      case "TRANSPORTE":
        return "Transporte";
      case "RESIDENCIA":
        return "Residência";
      case "SAUDE":
        return "Saúde";
      case "EDUCACAO":
        return "Educação";
      case "ENTRETENIMENTO":
        return "Entretenimento";
      default:
        return "Outros";
      }
    },
    getTransactionColor(transaction) {
      return transaction.type === "RECEITA" ? "#0FFF50" : "#FF3131";
    },
    formatCurrency(value, type) {
      return type === "RECEITA" ? value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) : "-" + value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    },
    seeDetails(transaction) {
      this.transactionDetails = transaction;
      this.seeDetailsDialog = true;
    }
  }
};
</script>

<style scoped>
/* Add specific styles for the ListAllTransactions component if necessary */
</style>
