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
            <b-input
              type="number"
              v-model="attendance_reason"
              placeholder="Razão do atendimento"
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

          <b-field label="Gravidade" :label-position="labelPosition">
            <b-select
              class="is-primary"
              type="text"
              v-model="attendance_severity"
              placeholder="Gravidade do problema"
              required
            >
              <option value="L">Leve</option>
              <option value="M">Média</option>
              <option value="H">Grave</option>
              <option value="S">Alta</option>
            </b-select>
          </b-field>

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
              v-model="status"
              placeholder="Status do atendimento"
            >
              <option value="O">Aberto</option>
              <option value="OH">Em espera</option>
              <option value="IP">Em andamento</option>
              <option value="C">Fechado</option>
            </b-select>
          </b-field>

          <b-field>
            <b-field class="columns">
              <div class="column is-one-half">
                <b-button
                  native-type="submit"
                  @click.prevent="createAttendance()"
                  class="is-primary"
                  expanded
                >
                  Cadastrar
                </b-button>
              </div>
              <div class="column is-one-half">
                <b-button
                  type="is-primary is-outlined"
                  @click="cancelAttendance(false)"
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
  data() {
    return {
      labelPosition: "on-border",
      filteredAccounts: this.attendantsAccounts,
      filteredStudents: this.filteredStudents,
      attendance_reason: "",
      attendance_severity: "L",
      attendants: [],
      student: [],
      status: "O",
    };
  },
  created() {
    this.fetchAllAccounts();
  },
  methods: {
    async fetchAllAccounts() {
      this.studentsAccount = await this.$axios.$get("/api/v1/student/");
      this.attendantsAccounts = await this.$axios.$get("/api/v1/account/");
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
    async createAttendance() {
      try {
        this.getAccountsId();
        await this.$axios.$post("/api/v1/attendance/", {
          attendance_reason: this.attendance_reason,
          attendance_severity: this.attendance_severity,
          attendants: this.attendantAccountsId,
          student: this.studentAccountId,
          status: this.status,
        });
        this.$buefy.toast.open({
          message: "Atendimento criador com sucesso.",
          type: "is-primary",
        });
        this.$emit("createAttendance");
      } catch {
        console.log();
        this.$buefy.toast.open({
          message: "Erro ao criar o atendimento!",
          type: "is-danger",
        });
      }
    },
    cancelAttendance(value) {
      this.$emit("createAttendance", value);
    },
  },
};
</script>

<style>
</style>