<template>
  <section>
    <div class="block">
      <h2 class="title">Admin / atendimento</h2>
    </div>
    <h2 class="subtitle">Todos os atendimentos</h2>

    <div class="level">
      <span class="level-left">
        <b-input
          class="level-item"
          id="searchInput"
          type="search"
          icon="magnify"
          icon-clickable
          placeholder="Pesquise na lista"
        />
        <b-button @click="searchAttendances()" class="is-primary">
          Pesquisar
        </b-button>
      </span>

      <span class="level-right">
        <b-button
          @click="createAttendance(true)"
          type="is-primary"
          class="level-item is-primary"
        >
          Criar atendimento
        </b-button>
        <b-button
          @click="personalAttendance(true)"
          class="level-item is-primary is-outlined"
        >
          Meus atendimentos
        </b-button>
        <b-button
          @click="reportAttendance(true)"
          class="level-item is-primary is-outlined"
        >
          Reporte dos atendimentos
        </b-button>
      </span>
    </div>

    <div class="level">
      <span class="level-left">
        <div class="block">
          <b-radio v-model="filter" native-value="status"> Status </b-radio>
          <b-radio v-model="filter" native-value="attendants">
            Atendentes
          </b-radio>
          <b-radio v-model="filter" native-value="student"> Estudante </b-radio>
          <b-radio v-model="filter" native-value="search">
            Qualquer correspondência
          </b-radio>
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
          <span v-if="column.field == 'attendants'">
            <span v-for="(obj, index) in props.row[column.field]" :key="index">
              <span v-for="(value, index) in obj" :key="index">
                {{ index }}: {{ value }}
              </span>
            </span>
          </span>
          <span v-else-if="column.field == 'student'">
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
        <!-- <b-table-column>
        {{ search }}
      </b-table-column> -->
      </template>
    </b-table>
  </section>
</template>
<script>
export default {
  data() {
    return {
      filter: "status",
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
          field: "status",
          label: "Status",
        },
        {
          field: "attendants",
          label: "Atendentes",
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
    async fetchAllAttendances() {
      this.data = await this.$axios.$get("/api/v1/attendance/");
      this.backup = this.data;
    },

    async searchAttendances() {
      this.search = await this.$axios.$get(
        `/api/v1/attendance?${this.filter}=${
          document.getElementById("searchInput").value
        }`
      );
      if (this.search.length > 0) {
        this.data.length = 0;
        this.data = this.search;
      } else {
        this.$buefy.toast.open({
          message: "Sem resultados válidos!",
          type: "is-danger",
        });
      }
    },

    editAttendance(attendance) {
      this.$emit("editAttendance", attendance);
    },
    createAttendance(value) {
      this.$emit("createAttendance", value);
    },
    personalAttendance(value) {
      this.$emit("personalAttendance", value);
    },
    reportAttendance(value) {
      this.$emit("reportAttendance", value);
    },

    deleteAttendance(attendance) {
      try {
        this.$axios.$delete(`/api/v1/attendance/${attendance.id}/`);
      } catch (err) {
        console.log(err);
      }
      window.location.reload();
    },

    confirmCustomDelete(attendance) {
      this.$buefy.dialog.confirm({
        title: "Deletar atendimento",
        message:
          "Tem certeza que deseja deletar o " +
          attendance.attendance +
          "? A ação é irreversível",
        confirmText: "Deletar Atendimento",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () =>
          this.$buefy.toast.open({
            message: "Atendimento deletado com sucesso!",
            type: "is-primary",
          }) && this.deleteAttendance(attendance),
      });
    },
  },
};
</script>