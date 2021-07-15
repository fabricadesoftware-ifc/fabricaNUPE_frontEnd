<template>
  <div class="columns is-vcentered">
    <div class="column has-text-centered">
      <img src="../../../assets/registration.svg" width="300px" />
    </div>
    <div class="column">
      <h3 class="subtitle has-text-centered">
        <b-icon icon="map-marker"></b-icon>
        Editar atendimento
      </h3>

      <form>
        <b-field label="Razão do atendimento" :label-position="labelPosition">
          <b-input
            type="text"
            v-model="currentAttendance.attendance_reason"
            placeholder="Novo motivo ao atendimento"
            required
          >
          </b-input>
        </b-field>

        <b-field label="Atendentes" :label-position="labelPosition">
          <b-input
            type="text"
            v-model="currentAttendance.attendants"
            placeholder="Atendentes"
            required
          >
          </b-input>
        </b-field>

        <b-field label="Estudante" :label-position="labelPosition">
          <b-input
            type="number"
            v-model="currentAttendance.student.id"
            placeholder="Nome do estudante"
            required
          >
          </b-input>
        </b-field>

        <b-field label="Status" :label-position="labelPosition">
          <b-input
            type="text"
            v-model="currentAttendance.status"
            placeholder="Status do atendimento"
          >
          </b-input>
        </b-field>
        <b-field label="Gravidade" :label-position="labelPosition">
          <b-input
            type="text"
            v-model="currentAttendance.attendance_severity"
            placeholder="Gravidade"
          >
          </b-input>
        </b-field>

        <b-field class="columns">
          <div class="column is-one-half">
            <b-button
              native-type="submit"
              @click.prevent="atualizar"
              class="is-primary"
              expanded
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
  props: {
    attendance: Object,
  },
  data() {
    return {
      currentAttendance: {},
      labelPosition: "on-border",
    };
  },
  created() {
    this.currentAttendance = this.attendance;
  },
  methods: {
    async atualizar() {
      try {
        await this.$axios.$patch(
          `/api/v1/attendance/${this.currentAttendance.id}/`,
          {
            id: this.currentAttendance.id,
            attendants: this.currentAttendance.attendants,
            attendance_reason: this.currentAttendance.attendance_reason,
            attendance_severity: this.currentAttendance.attendance_severity,
            // student: this.currentAttendance.student,
            status: this.currentAttendance.status,
          }
        );
        this.$buefy.toast.open({
          message: "Atendimento atualizado com sucesso.",
          type: "is-primary",
        });
        this.$emit("cancelEdit");
      } catch {
        this.$buefy.toast.open({
          message: "Erro ao atualizar o atendimento!",
          type: "is-danger",
        });
      }
    },
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
};
</script>

<style>
</style>