<template>
  <div>
    <div class="block">
      <!--INICIO novo Layout sup pag-->
      <h2 class="title">Admin / Estudantes</h2>
    </div>
    <h2 class="subtitle">Todos os Estudantes</h2>

    <div class="level">
      <span class="level-left">
        <b-input
          class="level-item"
          type="search"
          icon="magnify"
          icon-clickable
          placeholder="Pesquise na lista"
        />
        <b-button type="button is-primary">Pesquisar</b-button>
      </span>
      <span class="level-right">
        <b-button
          @click="createStudent(true)"
          type="is-primary"
          class="level-item is-primary"
        >
          Cadastrar estudante
        </b-button>
      </span>
    </div>

    <b-table
      :data="data"
      :paginated="isPaginated"
      :per-page="perPage"
      :selected.sync="selected"
      :current-page.sync="currentPage"
      :pagination-simple="isPaginationSimple"
      :pagination-position="paginationPosition"
      :default-sort-direction="defaultSortDirection"
      :pagination-rounded="isPaginationRounded"
      :sort-icon="sortIcon"
      :hoverable="hoverable"
      :focusable="focusable"
      :scrollable="scrollable"
    >
      <template v-slot="props">
        <b-table-column
          v-for="(column, index) in columns"
          :key="index"
          :field="column.field"
          :label="column.label"
          :sortable="sortable"
        >
          {{ props.row[column.field] }}
        </b-table-column>
        <b-table-column custom-key="actions" label="Ações">
          <b-button
            type="is-primary"
            icon-left="pencil"
            @click="editStudent(props.row)"
          ></b-button>
          <b-button
            type="is-danger"
            icon-left="delete"
            @click="confirmCustomDelete(props.row)"
          ></b-button>
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>



<script>
export default {
  created() {
    this.fecthAllStudents();
  },
  methods: {
    async fecthAllStudents() {
      this.data = await this.$axios.$get("/api/v1/student/");
    },
    editStudent(student){
      this.$emit("editStudent", student)
    },
    createStudent(value) {
      this.$emit("createStudent", value);
    },

    async deleteStudent(student) {
      try {
        await this.$axios.$delete(`/api/v1/student/${student.registration}/`);
        this.$buefy.toast.open({
          message: "Estudante deletado com sucesso",
          type: "is-primary",
        });
        window.location.reload();
      } catch (error) {
        this.$buefy.toast.open({
          message: "Ocorreu um erro!",
          type: "is-danger",
        });
      }
    },

    confirmCustomDelete(student) {
      this.$buefy.dialog.confirm({
        title: "Excluir Aluno",
        message:
          "Tem certeza que deseja excluir esse aluno?<br>Essa ação não poderá ser desfeita.",
        confirmText: "Excluir",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => this.deleteStudent(student),
      });
    },
  },
  data() {
    /*Início Componentes Listagem de alunos*/
    const data = [];
    return {
      // propriedads da tabela
      sortable: true,
      hoverable: true,
      focusable: true,
      scrollable: true,
      isPaginated: true,
      isPaginationSimple: false,
      isPaginationRounded: false,
      paginationPosition: "bottom",
      defaultSortDirection: "asc",
      sortIcon: "arrow-up",
      sortIconSize: "is-small",
      currentPage: 1,
      perPage: 5,
      isActive: true,
      data,
      selected: data[0],
      // propriedades da tabela
      columns: [
        {
          field: "id",
          label: "ID",
          numeric: true,
        },
        {
          field: "registration",
          label: "Matrícula",
        },
        {
          field: "full_name",
          label: "Nome completo",
        },
        {
          field: "ingress_date",
          label: "Data de Ingresso",
          centered: true,
        },
        {
          field: "graduated",
          label: "Graduado",
        },
      ],
    };
  },
};
</script>
<style>
</style>
