<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card style="height: 242px; border-radius: 12px; padding: 8px;">
          <v-card-title class="headline">
            Saldo atual
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <v-alert v-if="currentBalance !== null" :value="true" :color="currentBalance > 0 ? '#2E8B57' : '#880808'">
                  <v-icon> mdi-currency-usd </v-icon>  Seu saldo atual é de: R$ {{ currentBalance }}
                </v-alert>
                <v-alert v-else :value="true" type="info">
                  Sem dados disponíveis
                </v-alert>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  props: {
    currentBalance: {
      type: Number,
      required: true
    }
  },
  computed: {
    formattedCurrentBalance() {
      return this.currentBalance ? this.currentBalance.toFixed(2) : null;
    }
  },
  methods: {
    getIcon() {
      return this.currentBalance > 0 ? "mdi-arrow-top-right-thick" : "mdi-arrow-bottom-right-thick";
    }
  }
};
</script>

<style scoped>
/* Add specific styles for the Balance component if necessary */
</style>
