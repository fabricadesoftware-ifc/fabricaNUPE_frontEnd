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
          id="searchInput"
          icon="magnify"
          icon-clickable
          placeholder="Pesquise na lista"
        />
        <b-button class="is-primary" @click="searchAttendances()"
          >Pesquisar</b-button
        >
      </span>
      <span class="level-right">
        <b-button
          @click="reportAttendance(false)"
          type="is-primary"
          class="level-item is-primary"
        >
          Todos os atendimentos
        </b-button>
      </span>
    </div>

    <div class="level">
      <div class="block">
        <b-radio v-model="filter" native-value="status"> Status </b-radio>
        <b-radio v-model="filter" native-value="student_name">
          Nome do estudante
        </b-radio>
        <b-radio v-model="filter" native-value="student_last_name">
          Sobrenome do estudante
        </b-radio>
        <b-radio v-model="filter" native-value="attendants">
          Atendentes
        </b-radio>
        <b-radio v-model="filter" native-value="attendant_name">
          Nome do atendente
        </b-radio>
        <b-radio v-model="filter" native-value="attendant_last_name">
          Sobrenome do atendente
        </b-radio>
        <b-radio v-model="filter" native-value="severity"> Gravidade </b-radio>
        <b-radio v-model="filter" native-value="student"> Estudante </b-radio>
        <b-radio v-model="filter" native-value="search">
          Qualquer correspondência
        </b-radio>
      </div>
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
          <span v-if="column.field == 'student'">
            <span
              v-for="(value, index) in props.row[column.field]"
              :key="index"
            >
              {{ index }}: {{ value }}
            </span>
          </span>
          <span v-else>
            {{ props.row[column.field] }}
          </span>
        </b-table-column>
        <!-- <b-table-column custom-key="actions" label="Ações">
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
        </b-table-column> -->
      </template>
    </b-table>
  </section>
</template>
<script>
export default {
  data() {
    return {
      filter: ["status"],
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
          field: "attendance_reason",
          label: "Razão do atendimento",
        },
        {
          field: "attendance_severity",
          label: "Gravidade",
        },
        {
          field: "student",
          label: "Estudante",
        },
        {
          field: "account_attendance",
          label: "Atendente",
        },
        {
          field: "status",
          label: "Status",
        },
        {
          field: "opened_at",
          label: "Aberto em",
        },
        {
          field: "closed_at",
          label: "Fechado em",
        },
      ],
    };
  },
  created() {
    this.fetchAllAttendances();
  },
  methods: {
    searchAttendances() {
      var data, input, inputLowerCase, attendanceInIndex, value, filterValue;
      var matchingItens = [];
      data = this.backup;
      input = document.getElementById("searchInput");
      inputLowerCase = input.value.toLowerCase();
      if ("" != input.value) {
        for (let position in this.filter) {
          filterValue = this.filter[position];
          for (let index in data) {
            if (data[index][filterValue] != null) {
              attendanceInIndex = data[index][filterValue].toLowerCase();
              if (
                attendanceInIndex.toLowerCase().indexOf(inputLowerCase) > -1
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
    async fetchAllAttendances() {
      this.data = await this.$axios.$get("/api/v1/attendance/report/");
      this.backup = this.data;
    },
    reportAttendance(value) {
      this.$emit("reportAttendance", value);
    },
  },
};
</script>

<style>
</style>