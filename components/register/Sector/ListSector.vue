<template>
  <div>
    <div class="block">
      <h2 class="title">Admin / setor</h2>
    </div>
    <h2 class="subtitle">Todos os setores</h2>

    <div class="level">
      <span class="level-left">
        <b-input
          class="level-item"
          id="searchInput"
          type="text"
          icon="magnify"
          placeholder="Pesquise na lista"
        />
        <b-button class="is-primary" @click="searchSectors()"
          >Pesquisar</b-button
        >
      </span>
      <span class="level-right">
        <b-button
          @click="createSector(true)"
          type="is-primary"
          class="level-item"
        >
          Criar setor
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
      id="table"
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
          <b-button
            type="is-primary"
            icon-left="pencil"
            @click="editSector(props.row)"
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
  data() {
    return {
      filter: ["name"],
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
      perPage: 10,
      // término propriedades da tabela
      data: [],
      columns: [
        {
          field: "id",
          label: "ID",
        },
        {
          field: "name",
          label: "Setor",
        },
        {
          field: "description",
          label: "Descrição",
        },
      ],
    };
  },
  created() {
    this.fetchAllSectors();
  },
  methods: {
    async fetchAllSectors() {
      this.data = await this.$axios.$get("/api/v1/sector/");
      this.backup = this.data;
    },

    searchSectors() {
      var data, input, inputLowerCase, sectorInIndex, value, filterValue;
      var matchingItens = [];
      data = this.backup;
      input = document.getElementById("searchInput");
      inputLowerCase = input.value.toLowerCase();
      if ("" != input.value) {
        for (let position in this.filter) {
          filterValue = this.filter[position];
          for (let index in data) {
            if (data[index][filterValue] != null) {
              sectorInIndex = data[index][filterValue].toLowerCase();
              if (sectorInIndex.toLowerCase().indexOf(inputLowerCase) > -1) {
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
    editSector(sector) {
      this.$emit("editSector", sector);
    },
    deleteSector(sector) {
      try {
        this.$axios.$delete(`/api/v1/sector/${sector.id}/`);
      } catch (err) {
        console.log(err);
      }
      window.location.reload();
    },
    createSector(value) {
      this.$emit("createSector", value);
    },
    confirmCustomDelete(sector) {
      this.$buefy.dialog.confirm({
        title: "Deletar setor",
        message:
          "Tem certeza que deseja deletar o " +
          sector.sector +
          "? A ação é irreversível",
        confirmText: "Deletar Setor",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () =>
          this.$buefy.toast.open({
            message: "Setor deletado com sucesso!",
            type: "is-primary",
          }) && this.deleteSector(sector),
      });
    },
  },
};
</script>

<style>
</style>