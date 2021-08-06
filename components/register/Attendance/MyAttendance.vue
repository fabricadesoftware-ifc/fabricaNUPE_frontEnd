<template>
  <section>
    <div class="block">
      <div class="title">Admin / atendimento</div>
    </div>
    <h2 class="subtitle">Todos os meus atendimentos</h2>

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
          @click="teste()"
          type="is-primary"
          class="level-item is-primary"
        >
          Botão
        </b-button>
      </span>
      <!-- <span class="level-right">
        <b-button
          @click="createAttendance(true)"
          type="is-primary"
          class="level-item is-primary"
        >
          Botão
        </b-button>
      </span> -->
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
              @click="editAttendance(props.row)"
            ></b-button>
          </b-field>
          <b-field>
            <b-button
              type="is-danger"
              icon-left="delete"
              @click="confirmCustomDelete(props.row)"
            ></b-button>
          </b-field>
        </b-table-column>
      </template>
    </b-table>
  </section>
</template>
<script>
export default {
  data() {
    return {
      // propriedades da tabela
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
      // término propriedades da tabela
      data: [],
      columns: [
        {
          field: "id",
          label: "ID",
        },
        {
          field: "attendance",
          label: "Atendimento",
        },
        {
          field: "status",
          label: "Status",
        },
        {
          field: "severity",
          label: "Gravidade",
        },
        {
          field: "attendant_last_name",
          label: "Sobrenome atendente",
        },
        {
          field: "attendant_name",
          label: "Nome atendente",
        },
        {
          field: "attendants",
          label: "Atendentes",
        },
        {
          field: "student_name",
          label: "Nome estudante",
        },
        {
          field: "student_last_name",
          label: "Sobrenome estudante",
        },
        {
          field: "student",
          label: "Estudante",
        },
      ],
    };
  },
  created() {
    this.fetchAllAttendances();
  },
  methods: {
    teste() {
      console.log("flemis", this.user);
    },

    async fetchAllAttendances() {
      this.data = await this.$axios.$get("/api/v1/attendance/my/");
    },
  },
};
</script>

<style>
</style>