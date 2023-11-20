<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <!-- Componentes para inclusão de receitas e despesas -->
    <Balance />
  </div>
</template>
<script>
import Balance from "~/components/Balance.vue";

export default {
  components: {
    Balance
  },
  data() {
    return {
      saldoAtual: null // You should fetch the current balance from your backend
    };
  }
};
</script>