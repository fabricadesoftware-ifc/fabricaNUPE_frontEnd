<template>
  <section style="margin-left: 3%; margin-right: 2%">
    <h3 class="subtitle">Cadastro de Estudante</h3>
    <form @submit.prevent="createStudent">
      <b-field label="Matrícula">
        <b-input v-model="registration" placeholder="Ex: 2019456952"></b-input>
      </b-field>
      <b-field label="Data de ingresso" :label-position="labelPosition">
        <b-datepicker
          placeholder="Clique para selecionar"
          icon="calendar-today"
          v-model="ingress_date"
          trap-focus
          width="60%"
        >
        </b-datepicker>
      </b-field>

      <b-field label="Conta pessoal">
        <b-input v-model="person" type="text" placeholder="Conta pessoal" />
      </b-field>

      <b-field label="Campus">
        <b-input
          class=""
          placeholder="Campus"
          v-model="academic_education_campus"
        >
        </b-input>
      </b-field>

      <b-field label="Responsáveis">
        <b-input
          placeholder="Nome dos responsáveis"
          v-model="responsables"
          type="number"
        />
      </b-field>

      <b-field>
        <b-field class="columns">
          <div class="column is-one-half">
            <b-button native-type="submit" class="is-primary" expanded
              >Cadastrar</b-button
            >
          </div>
          <div class="column is-one-half">
            <b-button type="is-primary is-outlined" expanded>
              Cancelar
            </b-button>
          </div>
        </b-field>
      </b-field>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "is-centered",
      ingress_date: [],
      academic_education_campus: "",
      person: "",
      registration: "",
      responsables: "",
    };
  },
  computed: {
    sampleFormat() {
      const dtf = new Intl.DateTimeFormat("pt-BR");
      console.log(dtf.format(this.ingress_date));
      return dtf.format();
    },
  },
  methods: {
    responsablesArray(responsables) {
      const responsablesArray = [];
      return responsablesArray.push(responsables);
    },

    async createStudent() {
      try {
        const responsables = this.responsablesArray(this.responsables);
        const date = this.reversedDate(this.ingress_date);

        await this.$axios.$post("/api/v1/student/", {
          person: this.person,
          academic_education_campus: this.academic_education_campus,
          responsibles: responsables,
          registration: this.registration,
          ingress_date: this.ingress_date,
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
</style>
