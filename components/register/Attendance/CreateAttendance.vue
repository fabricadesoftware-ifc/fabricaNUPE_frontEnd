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
            <b-input
              type="number"
              v-model="attendants"
              placeholder="Atendentes"
            >
            </b-input>
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
            <b-input
              list="students"
              v-model="student"
              id="student"
              name="students"
              required
            />
            <datalist id="students">
              <option
                v-for="(item, index) in students"
                :key="index"
                :value="students[index].full_name"
              ></option>
            </datalist>
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
                  >Cadastrar</b-button
                >
              </div>
              <div class="column is-one-half">
                <b-button
                  type="is-primary is-outlined"
                  @click="cancelAttendance(true)"
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
      attendance_reason: "",
      attendance_severity: "",
      attendants: "",
      student: "",
      status: "",
      students: "",
    };
  },
  created() {
    this.fetchAllStudents();
  },
  methods: {
    searchAccounts() {
      this.attendantAccountIds = [];
      for (let index = 0; index < this.attendantsAccounts.length; index++) {
        if (this.attendantsAccounts[index].id == this.attendants) {
          this.attendantAccountIds.push(this.attendantsAccounts[index].id);
        }
      }
      for (let index = 0; index < this.studentsAccount.length; index++) {
        if (this.studentsAccount[index].full_name == this.student) {
          this.studentSelected = this.studentsAccount[index].id;
        }
      }
    },
    async fetchAllStudents() {
      this.studentsAccount = await this.$axios.$get("/api/v1/student/");
      this.attendantsAccounts = await this.$axios.$get("/api/v1/account/");
    },

    async createAttendance() {
      try {
        this.searchAccounts();
        await this.$axios.$post("/api/v1/attendance/", {
          attendance_reason: this.attendance_reason,
          attendance_severity: this.attendance_severity,
          attendants: this.accountsId,
          student: this.studentSelected,
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