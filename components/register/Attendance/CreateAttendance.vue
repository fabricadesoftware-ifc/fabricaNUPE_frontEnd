<template>
  <div>
    <h3 class="subtitle has-text-centered">
      <b-icon icon="map-marker"></b-icon>
      Cadastrar atendimento
    </h3>
    <form>
      <b-field label="Razão" :label-position="labelPosition">
        <b-input type="number" placeholder="Razão do atendimento" required>
        </b-input>
      </b-field>

      <b-field label="Atendentes" :label-position="labelPosition">
        <b-input type="text" placeholder="Atendentes" required> </b-input>
      </b-field>

      <b-field label="Gravidade" :label-position="labelPosition">
        <b-input type="text" placeholder="Gravidade do problema" required>
        </b-input>
      </b-field>

      <b-field label="Estudante" :label-position="labelPosition">
        <b-input type="number" placeholder="Número~ do estudante" required>
        </b-input>
      </b-field>

      <b-field label="Status" :label-position="labelPosition">
        <b-input type="text" placeholder="Status do atendimento" required>
        </b-input>
      </b-field>

      <b-field>
        <b-field class="columns">
          <div class="column is-one-half">
            <b-button native-type="submit" class="is-primary" expanded
              >Cadastrar</b-button
            >
          </div>
          <div class="column is-one-half">
            <b-button
              type="is-primary is-outlined"
              @click="tela = 'selecionar'"
              expanded
            >
              Editar
            </b-button>
          </div>
        </b-field>
      </b-field>
    </form>
  </div>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      labelPosition: "on-border",
    };
  },
};
</script>

<style>
</style>