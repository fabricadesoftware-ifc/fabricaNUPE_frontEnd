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
          id="searchInput"
          type="search"
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
          @click="personalAttendance(false)"
          type="is-primary"
          class="level-item is-primary"
        >
          Todos os atendimentos
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
        <b-radio v-model="filter" native-value="student_name">
          Nome do estudante
        </b-radio>
        <b-radio v-model="filter" native-value="student_last_name">
          Sobrenome do estudante
        </b-radio>
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
          {{ props.row[column.field] }}
        </b-table-column>
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
          field: "public_annotation",
          label: "Anotação pública",
        },
        {
          field: "private_annotation",
          label: "Anotação privada",
        },
        {
          field: "group_annotation",
          label: "Anotação grupal",
        },
        {
          field: "attendance",
          label: "Atendimento",
        },
        {
          field: "attendance_at",
          label: "Atendimento em",
        },
        {
          field: "updated_at",
          label: "Atualizado em",
        },
      ],
    };
  },
  created() {
    this.fetchAllAttendances();
  },
  methods: {
    async searchAttendances() {
      this.search = await this.$axios.$get(
        `/api/v1/attendance/my?${this.filter}=${
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
    async fetchAllAttendances() {
      this.data = await this.$axios.$get("/api/v1/attendance/my/");
      this.backup = this.data;
    },
    personalAttendance(value) {
      this.$emit("personalAttendance", value);
    },
  },
};
</script>

<style>
</style>