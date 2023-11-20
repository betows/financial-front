<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <ListAllTransactions />
  </div>
</template>
<script>
import ListAllTransactions from "~/components/ListAllTransactions.vue";

export default {
  components: {
    ListAllTransactions
  },
  data() {
    return {
      saldoFuturo: null // You should fetch the current balance from your backend
    };
  }
};
</script>
