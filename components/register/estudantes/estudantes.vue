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
    createStudent(value) {
      this.$emit("createStudent", value);
    },
    confirmCustomDelete() {
      this.$buefy.dialog.confirm({
        title: "Excluir Aluno",
        message:
          "Tem certeza que deseja excluir esse aluno?<br>Essa ação não poderá ser desfeita.",
        confirmText: "Excluir",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () =>
          this.$buefy.toast.open({
            duration: 5000,
            message: "Aluno excluído com sucesso",
            //position: 'is-bottom',
            type: "is-primary",
          }),
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
          label: "N° Matrícula",
          numeric: true,
        },
        {
          field: "registration",
          label: "Nome completo",
        },
        {
          field: "full_name",
          label: "Curso",
        },
        {
          field: "ingress_date",
          label: "Período",
          centered: true,
        },
        {
          field: "graduated",
          label: "Turma",
        },
      ],
      methods: {
        alert() {
          this.$buefy.dialog.alert("Everything looks fine!");
        },
        alertCustom() {
          this.$buefy.dialog.alert({
            title: "Title Alert",
            message: "I have a title, a custom button and <b>HTML</b>!",
            confirmText: "Cool!",
          });
        },
        alertCustomError() {
          this.$buefy.dialog.alert({
            title: "Error",
            message:
              "Something's not good but I have a custom <b>icon</b> and <b>type</b>",
            type: "is-danger",
            hasIcon: true,
            icon: "times-circle",
            iconPack: "fa",
            ariaRole: "alertdialog",
            ariaModal: true,
          });
        },
      },
    };
  },
};
</script>
<style>
</style>
