<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card style="height: 242px; border-radius: 12px; padding: 8px;">
          <v-card-title class="headline">
            Projeção de saldo futuro
          </v-card-title>
          <v-card-text>
            <!-- <v-row>
              <v-col>
                <v-form @submit.prevent="calculateFutureBalance">
                  <v-row>
                    <v-col>
                      <v-btn type="submit" color="info">
                        Calcular balanço futuro
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-col>
            </v-row> -->

            <v-row>
              <v-col>
                <v-alert v-if="futureBalance !== null" :value="true" :color="futureBalance > 0 ? '#2E8B57' : '#880808'">
                  <v-icon> mdi-account-cash-outline </v-icon> O saldo projetado é de: R$ {{ futureBalance.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) }}
                </v-alert>
                <v-alert v-else :value="true" type="info">
                  Sem dados de projeção disponíveis
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
      futureBalanceDate: ""
    };
  },
  props: {
    futureBalance: {
      type: Number,
      required: true
    }
  },
  methods: {
  }
};
</script>

<style scoped>
/* Add specific styles for the FutureBalance component if necessary */
</style>
