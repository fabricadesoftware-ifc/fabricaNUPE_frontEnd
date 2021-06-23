<template>
  <div>
    <div class="columns is-vcentered">
      <div class="column has-text-centered">
        <img src="../../../assets/registration.svg" width="300px" alt="" />
      </div>
      <div class="column has-text-centered">
        <h3 class="subtitle has-text-centered">
          <b-icon icon="map-marker"></b-icon>
          Cadastrar setor
        </h3>
        <form>
          <b-field label="Setor" :label-position="labelPosition">
            <b-input type="text" placeholder="Nome do setor" required>
            </b-input>
          </b-field>

          <b-field label="Descrição" :label-position="labelPosition">
            <b-input type="textarea" placeholder="Texto descritivo"> </b-input>
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
                  @click="createSector(false)"
                  expanded
                >
                  Cancelar
                </b-button>
              </div>
            </b-field>
          </b-field>
        </form>
      </div>
    </div>
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
  methods: {
    createSector() {
      this.$emit("createSector");
    },
  },
};
</script>

<style>
</style>