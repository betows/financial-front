<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <FutureBalance />
  </div>
</template>
<script>
import FutureBalance from "~/components/FutureBalance.vue";

export default {
  components: {
    FutureBalance
  },
  data() {
    return {
      saldoFuturo: null // You should fetch the current balance from your backend
    };
  }
};