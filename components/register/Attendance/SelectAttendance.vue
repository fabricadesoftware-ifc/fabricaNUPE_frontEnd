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
          <b-taginput
            v-model="attendants"
            id="attendantInput"
            field="full_name"
            :data="filteredAccounts"
            placeholder="Nome do atendente"
            @typing="searchAccounts()"
            autocomplete
          >
            <template v-slot="props">
              <strong>{{ props.option.id }}</strong
              >: {{ props.option.full_name }}
            </template>
          </b-taginput>
        </b-field>

        <!-- <b-field label="Atendentes" :label-position="labelPosition">
          <b-taginput
            list="attendants"
            v-model="currentAttendance.attendants"
            id="attendant"
            name="attendants"
            placeholder="Nome da atendente"
            required
          />  
        </b-field> -->

        <b-field label="Estudante" :label-position="labelPosition">
          <b-taginput
            v-model="student"
            id="studentInput"
            field="full_name"
            maxtags="1"
            :data="filteredStudents"
            placeholder="Nome do estudante"
            required
            autocomplete
            @typing="searchStudents()"
          >
            <template v-slot="props">
              <strong>{{ props.option.id }}</strong
              >: {{ props.option.full_name }}
            </template>
          </b-taginput>
        </b-field>

        <b-field label="Status" :label-position="labelPosition">
          <b-select
            type="text"
            v-model="currentAttendance.status"
            placeholder="Status do atendimento"
          >
            <option value="O">Aberto</option>
            <option value="OH">Em espera</option>
            <option value="IP">Em andamento</option>
            <option value="C">Fechado</option>
          </b-select>
        </b-field>

        <b-field label="Gravidade" :label-position="labelPosition">
          <b-select
            class="is-primary"
            type="text"
            v-model="currentAttendance.attendance_severity"
            placeholder="Gravidade do problema"
            required
          >
            <option value="L">Leve</option>
            <option value="M">Média</option>
            <option value="H">Grave</option>
            <option value="S">Alta</option>
          </b-select>
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
      {{ filteredAccounts }} <br />
      <br />
      {{ filteredStudents }}
    </div>
  </div>
</template>


<script>
export default {
  props: {
    attendance: Object,
  },
  data() {
    return {
      currentAttendance: {},
      labelPosition: "on-border",
      studentsAccount: [],
      attendantsAccounts: [],
      filteredAccounts: this.filteredAccounts,
      filteredStudents: this.filteredStudents,
      attendants: [],
      student: [],
      value: [],
    };
  },
  created() {
    this.currentAttendance = this.attendance;
    this.fillTagInputs();
    this.fetchAllAccounts();
  },
  methods: {
    async fetchAllAccounts() {
      this.studentsAccount = await this.$axios.$get("/api/v1/student/");
      this.attendantsAccounts = await this.$axios.$get("/api/v1/account/");
    },
    fillTagInputs() {
      this.student.push(this.currentAttendance.student.full_name);
      for (let index in this.currentAttendance.attendants) {
        this.attendants.push(
          this.currentAttendance.attendants[index].full_name
        );
      }
    },
    searchAccounts() {
      let value = document.getElementById("attendantInput").value;
      this.filteredAccounts = this.attendantsAccounts.filter((option) => {
        return (
          option.full_name
            .toString()
            .toLowerCase()
            .indexOf(value.toLowerCase()) >= 0
        );
      });
    },
    searchStudents() {
      let value = document.getElementById("studentInput").value;
      this.filteredStudents = this.studentsAccount.filter((student) => {
        return (
          student.full_name
            .toString()
            .toLowerCase()
            .indexOf(value.toLowerCase()) >= 0
        );
      });
    },
    getAccountsId() {
      this.attendantAccountsId = [];
      for (let index in this.attendants) {
        this.attendantAccountsId.push(this.attendants[index].id);
      }
      this.studentAccountId = this.student[0].id;
    },

    async atualizar() {
      try {
        this.getAccountsId();
        await this.$axios.$patch(
          `/api/v1/attendance/${this.currentAttendance.id}/`,
          {
            id: this.currentAttendance.attendance_reason,
            attendants: this.attendantAccountsId,
            attendance_reason: this.currentAttendance.attendance_reason,
            attendance_severity: this.currentAttendance.attendance_severity,
            student: this.studentAccountId,
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
          message: "Erro ao atualizar atendimento!",
          type: "is-danger",
        });
      }
    },
    deleteAttendance() {
      try {
        this.$axios.$delete(`/api/v1/attendance/${this.attendance.id}/`);
      } catch {
        this.$buefy.toast.open({
          message: "Erro ao deletar attendance!",
          type: "is-danger",
        });
      }
      window.location.reload();
    },
    confirmCustomDelete() {
      this.$buefy.dialog.confirm({
        title: "Deletar atendimento",
        message:
          "Tem certeza que deseja deletar " +
          this.currentAttendance.attendance_reason +
          "o atendimento? A ação é irreversível ",
        confirmText: "Deletar atendimento",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => {
          this.$buefy.toast.open({
            message: "Atendimento deletado com sucesso!",
            type: "is-primary",
          }) && this.deleteAttendance();
        },
      });
    },
  },
};
</script>

<style>
</style>