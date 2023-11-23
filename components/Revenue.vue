<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container style="padding: 0px;">
    <v-row>
      <v-col>
        <v-card
          style="border-radius: 12px; padding: 8px;"
        >
          <v-card-title class="headline">
            Incluir Receitas
          </v-card-title>
          <v-card-text>
            <!-- Formulário para incluir receitas -->
            <v-form @submit.prevent="addRevenue">
              <v-row>
                <v-col>
                  <v-select
                    v-model="newRevenue.category"
                    :items="revenueCategories"
                    label="Categoria"
                    item-text="text"
                    item-value="value"
                    :error-messages="showError ? 'Campo obrigatório' : ''"
                    outlined
                    required
                    dense
                    :menu-props="{ offsetY: true }"
                    @input="showError = false"
                  />
                </v-col>

                <v-col>
                  <v-text-field
                    v-model="newRevenue.amount"
                    label="Valor"
                    :error-messages="showError ? 'Campo obrigatório' : ''"
                    outlined
                    required
                    dense
                    :mask="mask"
                    @input="showError = false"
                  />
                </v-col>

                <v-col>
                  <v-text-field
                    v-model="newRevenue.date"
                    label="Data"
                    outlined
                    :error-messages="showError ? 'Campo obrigatório' : ''"
                    type="date"
                    required
                    dense
                    @input="showError = false"
                  />
                </v-col>

                <v-col>
                  <v-btn type="submit" color="#2E8B57">
                    Adicionar Receita
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <Expense :expense-categories="expenseCategories" />
        </v-card>
        <v-snackbar
          top
          v-model="snackbar"
        >
          {{ text }}

          <template #actions>
            <v-btn
              color="pink"
              variant="text"
              @click="snackbar = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
        <div style="display: flex; flex-direction: row; justify-content: space-between; margin-top: 24px; gap: 26px; margin-bottom: 16px;">
          <Balance :loading="loadingIncome" :current-balance="currentBalance" style="padding: 0px; border-radius: 12px; height: auto;" />
          <FutureBalance :loading="loadingIncome" :future-balance="balance" style="padding: 0px; border-radius: 12px;" />
        </div>

        <!-- Listagem de receitas -->
        <ListAllTransactions :transactions="transactions" :categories="allCategories" style="margin-top: 24px;" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FutureBalance from "@/components/FutureBalance.vue";
import ListAllTransactions from "@/components/ListAllTransactions.vue";
import Expense from "@/components/Expense.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Revenue",
  components: {
    FutureBalance,
    ListAllTransactions,
    Expense
  },
  data() {
    return {
      newRevenue: {
        category: "",
        amount: null,
        date: "",
        type: "RECEITA"
      },
      mask: "###.##",
      snackbar: false,
      showError: false,
      text: "Preencha todos os campos necessários da receita!",
      loadingIncome: false,
      revenueCategories: [{
        text: "Salário",
        value: "SALARIO"
      }, 
      {
        text: "Décimo terceiro",
        value: "DECIMO_TERCEIRO"
      }, 
      {
        text: "Férias",
        value: "FERIAS"
      }, 
      {
        text: "Outros",
        value: "OUTROS"
      }],
      expenseCategories: [{
        text: "Alimentação",
        value: "ALIMENTACAO"
      },
      {
        text: "Educação",
        value: "EDUCACAO"
      },
      {
        text: "Entretenimento",
        value: "ENTRETENIMENTO"
      },
      {
        text: "Residência",
        value: "RESIDENCIA"
      },
      {
        text: "Saúde",
        value: "SAUDE"
      },
      {
        text: "Transporte",
        value: "TRANSPORTE"
      },
      {
        text: "Outros",
        value: "OUTROS"
      }]
    };
  },
  mounted() {
    this.fetchTransactions();
  },
  watch: {
    balance(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$store.dispatch("getCurrentBalance");
      }
    },
    transactions(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$store.dispatch("getCurrentBalance");
      }
    },
    fetchedIncome(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$store.dispatch("getCurrentBalance");
      }
    }
  },
  computed: {
    fetchedIncome() {
      return this.$store.state.income;
    },
    allCategories() {
      return this.revenueCategories.concat(this.expenseCategories);
    },
    transactions: {
      get() {
        return this.$store.state.transactions;
      },
      set(value) {
        this.$store.commit("setTransactions", value);
      }
    },
    balance() {
      return this.$store.state.balance;
    },
    currentBalance() {
      return this.$store.state.currentBalance;
    }
  },
  methods: {
    addRevenue() {
      if (this.requiredFieldsAreEmpty(this.newRevenue)) {
        this.snackbar = true;
        this.showError = true;
        return;
      }
      this.newRevenue.date = this.formatDate(this.newRevenue.date);
      this.$store.dispatch("addIncome", this.newRevenue).then(() => {
        this.fetchTransactions();
        this.newRevenue = {
          category: "",
          amount: null,
          date: "",
          type: "RECEITA"
        };
      }).catch((error) => {
        console.log(error);
      });
    },
    fetchTransactions() {
      this.loadingIncome = true;
      this.$store.dispatch("getTransactions").then(() => {
        this.$store.dispatch("getCurrentBalance");
        this.$store.dispatch("getBalance");
        this.loadingIncome = false;
      });
    },
    formatDate(date) {
      return date.split("-").reverse().join("/");
    },
    handleFormatCurrency() {
      this.newRevenue.amount.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      });
    },
    requiredFieldsAreEmpty(revenue) {
      if (revenue.category === "" || revenue.amount === null || revenue.date === "") {
        return true;
      }
      return false;
    }
  }
};
</script>

<style scoped>
/* Adicione estilos específicos para o componente Receitas, se necessário */
</style>
