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

      <form>
        <b-field label="Matrícula" :label-position="labelPosition">
          <b-input
            v-model="data.registration"
            placeholder="Ex: 2019456952"
          ></b-input>
        </b-field>
        <b-field label="Data de ingresso" :label-position="labelPosition">
          <b-datepicker
            placeholder="Clique para selecionar"
            icon="calendar-today"
            v-model="data.ingress_date"
            trap-focus
            locale="pt-BR"
            width="60%"
          >
          </b-datepicker>
        </b-field>

        <b-field label="Conta pessoal" :label-position="labelPosition">
          <b-input
            v-model="data.personal_info.id"
            type="text"
            placeholder="Conta pessoal"
          />
        </b-field>

        <b-field label="Campus" :label-position="labelPosition">
          <b-input
            class=""
            placeholder="Campus"
            v-model="data.academic_education_campus"
          >
          </b-input>
        </b-field>

        <b-field
          label="Adicione os responsáveis"
          :label-position="labelPosition"
        >
          <b-taginput
            v-model="data.responsables"
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
    };
  },
  created() {
    this.currentStudent = this.student;
    this.getStudentInfo();
  },
  methods: {
    async getStudentInfo() {
      this.data = await this.$axios.$get(
        `/api/v1/student/${this.student.registration}/`
      );
      this.formatDate();
    },

    async atualizar() {
      try {
        // await this.$axios.$patch(
        //   `/api/v1/student/${}/`,
        //   {}
        // );
        this.$buefy.toast.open({
          message: "Estudante atualizado com sucesso.",
          type: "is-primary",
        });
        this.$emit("cancelEdit");
      } catch {
        this.$buefy.toast.open({
          message: "Erro ao atualizar o Estudante!",
          type: "is-danger",
        });
      }
    },

    formatDate() {
      this.data.ingress_date = new Date(this.data.ingress_date);
    },

    deleteSector() {
      try {
        this.$axios.$delete(`/api/v1/student/${this.currentStudent.id}/`);
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
          this.student +
          "? A ação é irreversível",
        confirmText: "Deletar Setor",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => {},
      });
    },
  },
};
</script>

<style>
</style>