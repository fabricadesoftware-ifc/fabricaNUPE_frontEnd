<template>
  <div>
    <div class="block">
      <h2 class="title">Admin / razão do atendimento</h2>
    </div>
    <h2 class="subtitle">Todos as razões de atendimento</h2>

    <div class="level">
      <span class="level-left">
        <b-input
          class="level-item"
          id="searchInput"
          type="search"
          icon="magnify"
          placeholder="Pesquise na lista"
        />

        <b-button @click="searchAttendanceReasons()" class="is-primary"
          >Pesquisar</b-button
        >
      </span>

      <span class="level-right">
        <b-button
          @click="createAttendanceReason(true)"
          type="is-primary"
          class="level-item"
        >
          Criar razão de atendimento
        </b-button>
      </span>
    </div>

    <div class="level">
      <span class="level-left">
        <div class="block">
          <b-checkbox v-model="filter" native-value="name"> Nome </b-checkbox>
          <b-checkbox v-model="filter" native-value="description">
            Descrição
          </b-checkbox>
        </div>
      </span>
    </div>

    <b-table
      :data="data"
      :paginated="isPaginated"
      :per-page="perPage"
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
          <b-field>
            <b-button
              type="is-primary"
              icon-left="pencil"
              @click="editAttendanceReason(props.row)"
            >
            </b-button>
          </b-field>
          <b-field>
            <b-button
              type="is-danger"
              icon-left="delete"
              @click="confirmCustomDelete(props.row)"
            >
            </b-button>
          </b-field>
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      filter: ["name"],
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
      // propriedades da tabela
      columns: [
        {
          field: "id",
          label: "Id",
        },
        // {
        //   field: "father_reason",
        //   label: "Razão pai",
        // },
        {
          field: "name",
          label: "Razão do atendimento",
        },
        {
          field: "description",
          label: "Descrição",
        },
      ],
      data: [],
    };
  },
  created() {
    this.fetchAllAttendanceReasons();
  },
  methods: {
    async fetchAllAttendanceReasons() {
      this.data = await this.$axios.$get("/api/v1/attendance_reason/");
      this.backup = this.data;
    },
    searchAttendanceReasons() {
      var data,
        input,
        inputLowerCase,
        attendanceReasonInIndex,
        value,
        filterValue;
      var matchingItens = [];
      data = this.backup;
      input = document.getElementById("searchInput");
      inputLowerCase = input.value.toLowerCase();
      if ("" != input.value) {
        for (let position in this.filter) {
          filterValue = this.filter[position];
          for (let index in data) {
            if (data[index][filterValue] != null) {
              attendanceReasonInIndex = data[index][filterValue].toLowerCase();
              if (
                attendanceReasonInIndex.toLowerCase().indexOf(inputLowerCase) >
                -1
              ) {
                value = data[index];
                matchingItens.push(value);
              }
            }
          }
          this.data = matchingItens;
        }
      } else {
        this.data = this.backup;
      }
    },
    createAttendanceReason(value) {
      this.$emit("createAttendanceReason", value);
    },
    editAttendanceReason(attendanceReason) {
      this.$emit("editAttendanceReason", attendanceReason);
    },
    deleteAttendanceReason(attendanceReason) {
      this.$axios.$delete(`/api/v1/attendance_reason/${attendanceReason.id}/`);
      window.location.reload();
    },
    confirmCustomDelete(attendanceReason) {
      this.$buefy.dialog.confirm({
        title: "Deletar razão do atendimento",
        message:
          "Tem certeza que deseja deletar o " +
          attendanceReason.name +
          "? A ação é irreversível",
        confirmText: "Deletar Razão do Atendimento",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () =>
          this.$buefy.toast.open({
            message: "Razão de atendimento deletado com sucesso!",
            type: "is-primary",
          }) && this.deleteAttendanceReason(attendanceReason),
      });
    },
  },
};
</script>