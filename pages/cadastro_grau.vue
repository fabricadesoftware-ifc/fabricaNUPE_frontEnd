<!-- Cadastro grau ---------------------------------------------------------------------------
-->
<template>
  <section style="margin-left: 3%; margin-right: 2%">
    <h3 class="subtitle">Cadastro de Grau</h3>
    <b-field label="Nome">
      <b-input placeholder="Grau I"></b-input>
    </b-field>
    <b-field grouped>
      <b-field label="Data inicial de vigência" :label-position="labelPosition">
        <b-datepicker
          placeholder="Clique para selecionar"
          icon="calendar-today"
          trap-focus
          width="60%"
        >
        </b-datepicker>
      </b-field>
      <b-field label="Data final de vigencia" :label-position="labelPosition">
        <b-datepicker
          placeholder="Clique para selecionar"
          icon="calendar-today"
          trap-focus
          width="60%"
        >
        </b-datepicker>
      </b-field>
    </b-field>
    <a href="index"><b-button type="is-warning is-light">Voltar</b-button></a>
    <b-button
      tag="input"
      native-type="submit"
      value="Enviar Cadastro"
      type="is-success"
      @click="success"
      >Enviar Cadastro</b-button
    >
  </section>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      labelPosition: "is-centered",
      email: "",
    };
  },
  methods: {
    clearIconClick() {
      this.email = "";
    },
    success() {
      this.$buefy.toast.open({
        message: "Aluno cadastrado com sucesso",
        type: "is-success",
      });
    },
  },
};
</script>

<style>
</style>

<!-- Fim cadastro grau --------------------------------------------------------------->
