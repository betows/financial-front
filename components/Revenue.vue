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
                  <v-btn type="submit" color="info">
                    Adicionar Receita
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
        <div style="display: flex; flex-direction: row; justify-content: space-between; margin-top: 24px; gap: 26px;">
          <Balance style="padding: 0px; border-radius: 12px; height: auto;" />
          <FutureBalance style="padding: 0px; border-radius: 12px;" />
        </div>

        <!-- Listagem de receitas -->
        <v-card 
          v-if="fetchedIncome.length > 0"
          style="border-radius: 12px; margin-top: 24px; padding: 8px;"
        >
          <v-card-title class="headline">
            Lista de Receitas
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item-group v-if="fetchedIncome.length > 0">
                <v-list-item v-for="(revenue, index) in fetchedIncome" :key="index">
                  <v-list-item-content>
                    <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; width: 100%;">
                      <v-list-item-title>
                        {{ revenue.category }} R$ {{ revenue.amount }} - {{ revenue.date }}
                      </v-list-item-title>
                      <v-icon @click="fetchedIncome.splice(revenueList.indexOf(revenue), 1)">
                        mdi-delete
                      </v-icon>
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
              <v-alert v-else :value="true" type="info">
                Nenhuma receita cadastrada.
              </v-alert>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FutureBalance from "@/components/FutureBalance.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Revenue",
  components: {
    FutureBalance
  },
  data() {
    return {
      newRevenue: {
        category: "",
        amount: null,
        date: ""
      },
      categoriasReceita: ["SALARIO", "DECIMO_TERCEIRO", "FERIAS", "OUTROS"]
    };
  },
  mounted() {
    let nowDate = new Date();
    this.fetchIncome(nowDate);
  },
  computed: {
    fetchedIncome() {
      return this.$store.state.income;
    }
  },
  methods: {
    addRevenue() {
      this.newRevenue.date = new Date(this.newRevenue.date).toISOString().slice(0, 10);
      this.$store.dispatch("addIncome", this.newRevenue).then(() => {
        this.fetchIncome(this.newRevenue.date);
      });
    },
    fetchIncome(date) {
      this.$store.dispatch("getBalance", date).then(() => {
        this.revenueList.push(this.$store.state.balance);
      });
    }
  }
};
</script>

<style scoped>
/* Adicione estilos específicos para o componente Receitas, se necessário */
</style>
