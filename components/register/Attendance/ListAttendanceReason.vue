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
          type="search"
          icon="magnify"
          icon-clickable
          placeholder="Pesquise na lista"
        />
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
  auth: false,
  data() {
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
      // propriedades da tabela
      columns: [
        {
          field: "father_reason",
          label: "Razão pai",
        },
        {
          field: "name",
          label: "Razão do atendimento",
        },
        {
          field: "description",
          label: "Descrição",
        },
      ],
      data: [
        {
          father_reason: 1,
          name: "Razão de número 1",
          description: "Lorem ipsum dolor sit amet",
        },
        {
          father_reason: 2,
          name: "Continuação da sequência",
          description: "Lórios ipslon dórios sit down ametyst",
        },
        {
          father_reason: 3,
          name: "Sucessor",
          description: "olhos elson notório city downtown mimis",
        },
        {
          father_reason: 4,
          name: "término temporal da sucessão",
          description: "alg finguncia notivingerton est sything mimis",
        },
      ],
    };
  },
  methods: {
    createAttendanceReason(value) {
      this.$emit("createAttendanceReason", value);
    },
    editAttendanceReason(attendanceReason) {
      this.$emit("editAttendanceReason", attendanceReason);
    },
    deleteAttendanceReason(attendanceReason) {
      const index = this.data.indexOf(attendanceReason);
      this.data.splice(index, 1);
    },
    confirmCustomDelete(attendanceReason) {
      this.$buefy.dialog.confirm({
        title: "Deletar razão de atendimento",
        message:
          "Tem certeza que deseja deletar o " +
          attendanceReason.attendanceReason +
          "? A ação é irreversível",
        confirmText: "Deletar Motivo",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () =>
          this.$buefy.toast.open({
            message: "Motivo e descrição deletados com sucesso!",
            type: "is-primary",
          }) && this.deleteAttendanceReason(attendanceReason),
      });
    },
  },
};
</script>