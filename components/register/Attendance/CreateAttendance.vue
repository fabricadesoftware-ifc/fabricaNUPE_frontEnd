<template>
  <div>
    <div class="columns is-vcentered">
      <div class="column has-text-centered">
        <img src="../../../assets/registration.svg" width="300px" />
      </div>
      <div class="column has-text-centered">
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
            <b-input type="number" placeholder="Número do estudante" required>
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
                  @click="cancelCreateAttendance()"
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
    cancelCreateAttendance() {
      this.$emit("cancelCreateAttendance");
    },
  },
};
</script>

<style>
</style>