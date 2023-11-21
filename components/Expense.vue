<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container style="padding: 0px;">
    <v-row>
      <v-col>
        <v-card-title class="headline">
          Incluir despesas
        </v-card-title>
        <v-card-text>
          <!-- Formulário para incluir receitas -->
          <v-form @submit.prevent="addExpense">
            <v-row>
              <v-col>
                <v-select
                  v-model="expense.category"
                  :items="expenseCategories"
                  item-text="text"
                  item-value="value"
                  label="Categoria"
                  outlined
                  required
                  dense
                  :menu-props="{ offsetY: true }"
                />
              </v-col>

              <v-col>
                <v-text-field
                  v-model="expense.amount"
                  label="Valor"
                  outlined
                  type="number"
                  required
                  dense
                />
              </v-col>

              <v-col>
                <v-text-field
                  v-model="expense.date"
                  label="Data"
                  outlined
                  type="date"
                  required
                  dense
                />
              </v-col>

              <v-col>
                <v-btn type="submit" color="#880808">
                  Adicionar Despesa
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      expense: {
        category: "",
        amount: "",
        date: "",
        type: "EXPENSE"
      }
    };
  },
  props: {
    expenseCategories: {
      type: Array,
      required: true
    }
  },
  methods: {
    addExpense() {
      this.expense.amount = parseFloat(this.expense.amount);
      this.expense.date = this.formatDate(this.expense.date);
      this.$store.dispatch("addExpense", this.expense).then(() => {
        this.$store.dispatch("getBalance");
      });
    },
    formatDate(date) {
      return date.split("-").reverse().join("/");
    }
  }

};
</script>

<style>

</style>