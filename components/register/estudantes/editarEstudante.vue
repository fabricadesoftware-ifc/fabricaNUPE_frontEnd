<template>
  <div class="columns is-vcentered">
    <div class="column has-text-centered">
      <img src="../../../assets/registration.svg" width="300px" />
    </div>
    <div class="column">
      <h3 class="subtitle has-text-centered">
        <b-icon icon="map-marker"></b-icon>
        Editar estudante
      </h3>

      <form @submit.prevent="atualizar()">
        <b-field label="Matrícula" :label-position="labelPosition">
          <b-input
            v-model="currentStudent.registration"
            placeholder="Ex: 2019456952"
            required
          ></b-input>
        </b-field>
        <b-field label="Data de ingresso" :label-position="labelPosition">
          <b-datepicker
            placeholder="Clique para selecionar"
            icon="calendar-today"
            v-model="currentStudent.ingress_date"
            trap-focus
            locale="pt-BR"
            width="60%"
            required
          >
          </b-datepicker>
        </b-field>

        <b-field label="Conta pessoal" :label-position="labelPosition">
          <b-input
            v-model="currentStudent.personal_info.id"
            type="text"
            placeholder="Conta pessoal"
            required
          />
        </b-field>

        <b-field label="Campus" :label-position="labelPosition">
          <b-input
            class=""
            placeholder="Campus"
            v-model="currentStudent.academic_education_campus"
            required
          >
          </b-input>
        </b-field>

        <b-field
          label="Adicione os responsáveis"
          :label-position="labelPosition"
        >
          <b-taginput
            v-model="responsibles"
            ellipsis
            icon="label"
            placeholder="Nome dos responsáveis"
            aria-close-label="Delete esse item"
          >
          </b-taginput>
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
                type="is-danger"
                @click="confirmCustomDelete()"
                expanded
              >
                Excluir
              </b-button>
            </div>
          </b-field>
        </b-field>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    student: Object,
  },
  data() {
    return {
      labelPosition: "on-border",
      data: [],
      currentStudent: {},
      responsibles: [],
    };
  },
  created() {
    this.currentStudent = this.student;
    this.responsibles = this.currentStudent.responsibles;
    console.log(this.currentStudent);
  },
  methods: {
    async atualizar() {
      var date = this.formatDate(this.currentStudent.ingress_date);
      try {
        await this.$axios.$patch(
          `/api/v1/student/${this.currentStudent.registration}/`,
          {
            registration: this.currentStudent.registration,
            person: this.currentStudent.personal_info.id,
            academic_education_campus:
              this.currentStudent.academic_education_campus,
            responsibles: this.responsibles,
            ingress_date: date,
          }
        );

        this.$buefy.toast.open({
          message: "Estudante atualizado com sucesso.",
          type: "is-primary",
        });
        this.$emit("cancelEdit");
      } catch (error) {
        console.log(error);
        this.$buefy.toast.open({
          message: "Erro ao atualizar o Estudante!",
          type: "is-danger",
        });
      }
    },

    formatDate(date) {
      var dateArray = [];
      dateArray.push(date.getDate(), date.getMonth() + 1, date.getFullYear());
      return dateArray.reverse().join("-");
    },

    deleteStudent() {
      try {
        this.$axios.$delete(
          `/api/v1/student/${this.currentStudent.registration}/`
        );
      } catch {
        this.$buefy.toast.open({
          message: "Erro ao deletar estudante!",
          type: "is-danger",
        });
      }
      window.location.reload();
    },
    confirmCustomDelete() {
      this.$buefy.dialog.confirm({
        title: "Deletar estudante",
        message:
          "Tem certeza que deseja deletar o " +
          this.currentStudent.personal_info.first_name +
          " " +
          this.currentStudent.personal_info.last_name +
          "? A ação é irreversível",
        confirmText: "Deletar Estudante",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => {
          this.deleteStudent();
        },
      });
    },
  },
};
</script>

<style>
</style>