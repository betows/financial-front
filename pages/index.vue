<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <h1>Controle de finanças pessoais</h1>
    <!-- Componentes para inclusão de receitas e despesas -->
    <Revenue style="margin: 16px 0 32px;" />
  </div>
</template>

<script>
import Revenue from "~/components/Revenue.vue";
/* import Despesas from "~/components/Despesas.vue";
import SaldoAtual from "~/components/SaldoAtual.vue";
import SaldoFuturo from "~/components/SaldoFuturo.vue";
import ListaRevenue from "~/components/ListaRevenue.vue";
import ListaDespesas from "~/components/ListaDespesas.vue";
import Extrato from "~/components/Extrato.vue"; */

export default {
  components: {
    Revenue
  }
};
</script>

<style>
/* Estilos CSS da página principal podem ser adicionados aqui */
</style>
