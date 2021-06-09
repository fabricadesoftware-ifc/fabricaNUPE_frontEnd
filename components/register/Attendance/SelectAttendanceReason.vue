<template>
  <section>
    <div class="columns is-vcentered">
      <div class="column">
        <img src="../../../assets/registration.svg" />
      </div>
      <div class="column">
        <h3 class="subtitle has-text-centered">
          <b-icon icon="map-marker"></b-icon>
          Editar razão do atendimento
        </h3>
        <div class="block content">
          <b-small>Editando razão pai: {{ father_reason }}</b-small> <br />
          <b-small>O nome: {{ name }}</b-small> <br />
          <b-small>A descrição: {{ description }}</b-small> <br />

          <!-- //TODO: Perguntar sobre attendants se lista de integer -->
        </div>
        <form action="">
          <b-field label="Nome" :label-position="labelPosition">
            <b-input type="text" placeholder="Nome" required> </b-input>
          </b-field>

          <b-field label="Descrição" :label-position="labelPosition">
            <b-input type="textarea" placeholder="Texto descritivo" required>
            </b-input>
          </b-field>

          <b-field label="'Razão pai'" :label-position="labelPosition">
            <b-input type="number" placeholder="'Razão pai'"> </b-input>
          </b-field>

          <b-field class="columns">
            <div class="column is-one-half">
              <b-button native-type="submit" class="is-primary" expanded
                >Atualizar</b-button
              >
            </div>
            <div class="column is-one-half">
              <b-button type="is-danger" @click="confirmCustomDelete" expanded>
                Excluir
              </b-button>
            </div>
          </b-field>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    confirmCustomDelete() {
      this.$buefy.dialog.confirm({
        title: "Deletar atendimento",
        message:
          "Tem certeza que deseja deletar a razão do atendimento? A ação é irreversível",
        confirmText: "Deletar a razão do atendimento",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () =>
          this.$buefy.toast.open("Atendimento deletado com sucesso!"),
      });
    },
  },

  auth: false,
  data() {
    return {
      labelPosition: "on-border",
      father_reason: 1,
      description: "Algum texto descritivo",
      name: "Nome em string máxima de 50 caracteres",
    };
  },
};
</script>

<style>
</style>