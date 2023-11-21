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
                    :items="categoriasReceita"
                    label="Categoria"
                    outlined
                    required
                    dense
                    :menu-props="{ offsetY: true }"
                  />
                </v-col>

                <v-col>
                  <v-text-field
                    v-model="newRevenue.amount"
                    label="Valor"
                    outlined
                    type="number"
                    required
                    dense
                  />
                </v-col>

                <v-col>
                  <v-text-field
                    v-model="newRevenue.date"
                    label="Data"
                    outlined
                    type="date"
                    required
                    dense
                  />
                </v-col>

                <v-col>
                  <v-btn type="submit" color="success">
                    Adicionar Receita
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <Expense />
        </v-card>
        <div style="display: flex; flex-direction: row; justify-content: space-between; margin-top: 24px; gap: 26px;">
          <Balance style="padding: 0px; border-radius: 12px; height: auto;" />
          <FutureBalance style="padding: 0px; border-radius: 12px;" />
        </div>

        <!-- Listagem de receitas -->
        <ListAllTransactions style="margin-top: 24px;" />
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
      categoriasReceita: ["SALARIO", "DECIMO_TERCEIRO", "FERIAS", "OUTROS"]
    };
  },
  mounted() {
    let nowDate = new Date();
    this.fetchIncome(nowDate);
    this.$store.dispatch("getTransactions", nowDate);
  },
  computed: {
    fetchedIncome() {
      return this.$store.state.income;
    },
    transactions() {
      return this.$store.state.transactions;
    }
  },
  methods: {
    addRevenue() {
      this.newRevenue.date = this.formatYYYYMMDD(this.newRevenue.date);
      this.newRevenue.amount = parseFloat(this.newRevenue.amount);
      this.$store.dispatch("addIncome", this.newRevenue).then(() => {
        this.fetchIncome(this.newRevenue.date);
      }).catch((error) => {
        console.log(error);
      });
    },
    fetchIncome(date) {
      this.$store.dispatch("getBalance", date).then(() => {
        this.newRevenue.amount = this.$store.state.balance;
      });
    },
    formatYYYYMMDD(date) {
      let formattedDate = new Date(date);
      let year = formattedDate.getFullYear();
      let month = formattedDate.getMonth() + 1;
      let day = formattedDate.getDate();
      return `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;
    }
  }
};
</script>

<style scoped>
/* Adicione estilos específicos para o componente Receitas, se necessário */
</style>
