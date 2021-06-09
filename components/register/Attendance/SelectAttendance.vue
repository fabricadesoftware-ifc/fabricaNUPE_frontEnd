<template>
  <div class="columns is-vcentered">
    <div class="column has-text-centered">
      <!-- // * width="300px" parece agradável -->
      <img src="../../../assets/registration.svg" />
    </div>
    <div class="column">
      <h3 class="subtitle has-text-centered">
        <b-icon icon="map-marker"></b-icon>
        Editar atendimento
      </h3>
      <div class="block content">
        <small>Editando {{ attendance.attendance }}</small> <br />
        <small>Razão do atendimento: {{ attendance.attendance_reason }}</small>
        <br />
        <small>Atendentes: {{ attendance.attendants }}</small> <br />
        <small>Estudante: {{ attendance.student }}</small> <br />
        <small>Status: {{ attendance.status }}</small> <br />

        <!-- //TODO: Perguntar sobre attendants ser lista de integer -->
      </div>
      <form>
        <b-field label="Atendimento" :label-position="labelPosition">
          <b-input type="text" placeholder="Novo nome ao atendimento" required>
          </b-input>
        </b-field>

        <b-field label="Razão do atendimento" :label-position="labelPosition">
          <b-input
            type="text"
            placeholder="Novo motivo ao atendimento"
            required
          >
          </b-input>
        </b-field>

        <!-- <b-field label="Atendentes" :label-position="labelPosition">
        <b-input type="text" placeholder="Atendentes" required> </b-input>
      </b-field> -->

        <b-field label="Estudante" :label-position="labelPosition">
          <b-input type="text" placeholder="Nome do estudante" required>
          </b-input>
        </b-field>

        <b-field label="Status" :label-position="labelPosition">
          <b-input type="text" placeholder="Status do atendimento"> </b-input>
        </b-field>

        <b-field class="columns">
          <div class="column is-one-half">
            <b-button native-type="submit" class="is-primary" expanded
              >Atualizar</b-button
            >
          </div>
          <div class="column is-one-half">
            <b-button type="is-danger" @click="confirmCustomDelete()" expanded>
              Excluir
            </b-button>
          </div>
        </b-field>
      </form>
    </div>
  </div>
</template>

// TODO: razão do atendimento faltante

<script>
export default {
  data() {
    return {
      labelPosition: "on-border",
    };
  },
  methods: {
    confirmCustomDelete() {
      this.$buefy.dialog.confirm({
        title: "Deletar atendimento",
        message:
          "Tem certeza que deseja deletar o atendimento? A ação é irreversível",
        confirmText: "Deletar atendimento",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () =>
          this.$buefy.toast.open({
            message: "Atendimento deletado com sucesso!",
            type: "is-primary",
          }),
      });
    },
  },

  auth: false,
  props: {
    attendance: Object,
  },
};
</script>

<style>
</style>