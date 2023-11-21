
export const state = () => ({
  balance: 0,
  transactions: [],
  currentBalance: 0,
  income: 0,
  expense: 0

});

export const mutations = {
  setTransactions(state, transactions) {
    state.transactions = transactions;
  },
  setBalance(state, balance) {
    state.balance = balance;
  },
  setCurrentBalance(state, currentBalance) {
    state.currentBalance = currentBalance;
  },
  setIncome(state, income) {
    state.income = income;
  },
  setExpense(state, expense) {
    state.expense = expense;
  }
};

export const actions = {
  getTransactions(context, data) {
    return this.$axios.get("http://localhost:8080/api/transactions", data).then((r) => {
      context.commit("setTransactions", r.data);
    });
  },
  getBalance(context, data) {
    return this.$axios.get("http://localhost:8080/api/balance", data).then((r) => {
      context.commit("setBalance", r.data);
    });
  },
  getCurrentBalance(context, data) {
    return this.$axios.get("http://localhost:8080/api/current-balance", data).then((r) => {
      context.commit("setCurrentBalance", r.data);
    });
  },
  getIncome(context, data) {
    return this.$axios.get("http://localhost:8080/api/income/", data).then((r) => {
      context.commit("setIncome", r.data);
    });
  },
  getExpense(context, data) {
    return this.$axios.get("http://localhost:8080/api/expense", data).then((r) => {
      context.commit("setExpense", r.data);
    });
  },
  addTransaction(context, data) {
    return this.$axios.post("http://localhost:8080/api/transactions", data);
  },
  deleteTransaction(context, data) {
    return this.$axios.delete("http://localhost:8080/api/transactions" + data);
  },
  getTransaction(context, data) {
    return this.$axios.get("http://localhost:8080/api/transactions" + data);
  },
  addIncome(context, data) {
    return this.$axios.post("http://localhost:8080/api/income", data).then((r) => {
      context.commit("setIncome", r.data);
    });
  },
  addExpense(context, data) {
    return this.$axios.post("http://localhost:8080/api/expense", data).then((r) => {
      context.commit("setExpense", r.data);
    });
  }
};
