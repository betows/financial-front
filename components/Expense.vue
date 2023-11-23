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
                  :error-messages="showError ? 'Campo obrigatório' : ''"
                  :menu-props="{ offsetY: true }"
                  @input="showError = false"
                />
              </v-col>

              <v-col>
                <v-text-field
                  v-model="expense.amount"
                  label="Valor"
                  outlined
                  :error-messages="showError ? 'Campo obrigatório' : ''"
                  type="number"
                  required
                  dense
                  @input="showError = false"
                />
              </v-col>

              <v-col>
                <v-text-field
                  v-model="expense.date"
                  label="Data"
                  outlined
                  type="date"
                  required
                  :error-messages="showError ? 'Campo obrigatório' : ''"
                  dense
                  @input="showError = false"
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
      },
      snackbar: false,
      showError: false,
      text: "Preencha todos os campos obrigatórios da despesa!"
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
      if (!this.expense.category || !this.expense.amount || !this.expense.date) {
        this.snackbar = true;
        this.showError = true;
        return;
      }
      this.expense.amount = parseFloat(this.expense.amount);
      this.expense.date = this.formatDate(this.expense.date);
      this.$store.dispatch("addExpense", this.expense).then(() => {
        this.$store.dispatch("getBalance");
        this.$store.dispatch("getCurrentBalance");
        this.$store.dispatch("getTransactions");
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