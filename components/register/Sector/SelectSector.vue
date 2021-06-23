<template>
  <div class="columns is-vcentered">
    <div class="column has-text-centered">
      <img src="../../../assets/registration.svg" width="300px" />
    </div>
    <div class="column">
      <h3 class="subtitle has-text-centered">
        <b-icon icon="map-marker"></b-icon>
        Editar setor
      </h3>
      <div class="block content">
        <small>Editando: {{ sector.sector }}</small> <br />
        <small>Descrição: {{ sector.description }}</small>
      </div>
      <form>
        <b-field label="Setor" :label-position="labelPosition">
          <b-input type="text" placeholder="Novo nome ao setor" required>
          </b-input>
        </b-field>

        <b-field label="Descrição" :label-position="labelPosition">
          <b-input type="textarea" placeholder="Novo texto descritivo">
          </b-input>
        </b-field>

        <b-field class="columns">
          <div class="column is-one-half">
            <b-button native-type="submit" class="is-primary" expanded
              >Atualizar</b-button
            >
          </div>
          <div class="column is-one-half">
            <b-button
              type="is-danger"
              native-type="reset"
              @click="confirmCustomDelete"
              expanded
            >
              Excluir
            </b-button>
          </div>
        </b-field>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  data() {
    return { labelPosition: "on-border" };
  },
  methods: {
    confirmCustomDelete() {
      this.$buefy.dialog.confirm({
        title: "Deletar setor",
        message:
          "Tem certeza que deseja deletar o " +
          this.sector.sector +
          "? A ação é irreversível",
        confirmText: "Deletar Setor",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () =>
          this.$buefy.toast.open({
            message: "Setor deletado com sucesso!",
            type: "is-primary",
          }),
      });
    },
  },

  props: {
    sector: Object,
  },
};
</script>

<style>
</style>