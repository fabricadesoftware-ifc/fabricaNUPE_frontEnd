<template>
  <div>
    <h3 class="subtitle has-text-centered">
      <b-icon icon="map-marker"></b-icon>
      Cadastrar razão de atendimento
    </h3>
    <form>
      <b-field label="Razão do atendimento" :label-position="labelPosition">
        <b-input
          type="text"
          placeholder="Digite um nome/razão ao resgistro"
          required
        >
        </b-input>
      </b-field>

      <b-field label="Detalhamento" :label-position="labelPosition">
        <b-input type="textarea" placeholder="Texto descritivo" required>
        </b-input>
      </b-field>

      <b-field label="'Motivo Pai'" :label-position="labelPosition">
        <b-input type="number" value="father_reason" placeholder="Número">
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