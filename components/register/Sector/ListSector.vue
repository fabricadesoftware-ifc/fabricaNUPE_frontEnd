<template>
  <div>
    <h3 class="title">Todos os setores</h3>
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
      :hoverable="true"
      :focusable="true"
    >
      <template v-slot="props">
        <b-table-column
          v-for="(column, index) in columns"
          :key="index"
          :field="column.field"
          :label="column.label"
          :sortable="sortable"
          :searchable="searchable[index]"
        >
          {{ props.row[column.field] }}
        </b-table-column>
        <b-table-column custom-key="actions" label="Ações">
          <b-field>
            <b-button
              type="is-primary"
              icon-left="pencil"
              @click="editSector(props.row)"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      // propriedades da tabela
      searchable: [false, true, true, false],
      sortable: true,
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
      data: [
        {
          id: 1,
          sector: "Setor 1",
          description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem totam animi ratione ut deserunt veritatis et qui, placeat fuga ipsum quas quibusdam aliquid a esse, recusandae dolor corporis incidunt soluta.",
        },
        {
          id: 2,
          sector: "Setor A",
          description:
            "Aorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem totam animi ratione ut deserunt veritatis et qui, placeat fuga ipsum quas quibusdam aliquid a esse, recusandae dolor corporis incidunt soluta.",
        },
        {
          id: 3,
          sector: "Setor 3",
          description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem totam animi ratione ut deserunt veritatis et qui, placeat fuga ipsum quas quibusdam aliquid a esse, recusandae dolor corporis incidunt soluta.",
        },
        {
          id: 4,
          sector: "Setor 4",
          description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem totam animi ratione ut deserunt veritatis et qui, placeat fuga ipsum quas quibusdam aliquid a esse, recusandae dolor corporis incidunt soluta.",
        },
        {
          id: 5,
          sector: "Setor 5",
          description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem totam animi ratione ut deserunt veritatis et qui, placeat fuga ipsum quas quibusdam aliquid a esse, recusandae dolor corporis incidunt soluta.",
        },
        {
          id: 6,
          sector: "Setor 6",
          description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem totam animi ratione ut deserunt veritatis et qui, placeat fuga ipsum quas quibusdam aliquid a esse, recusandae dolor corporis incidunt soluta.",
        },
        {
          id: 7,
          sector: "Setor v",
          description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem totam animi ratione ut deserunt veritatis et qui, placeat fuga ipsum quas quibusdam aliquid a esse, recusandae dolor corporis incidunt soluta.",
        },
        {
          id: 8,
          sector: "Setor nk",
          description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem totam animi ratione ut deserunt veritatis et qui, placeat fuga ipsum quas quibusdam aliquid a esse, recusandae dolor corporis incidunt soluta.",
        },
        {
          id: 9,
          sector: "Setor jj",
          description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem totam animi ratione ut deserunt veritatis et qui, placeat fuga ipsum quas quibusdam aliquid a esse, recusandae dolor corporis incidunt soluta.",
        },
        {
          id: 10,
          sector: "Setor B",
          description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem totam animi ratione ut deserunt veritatis et qui, placeat fuga ipsum quas quibusdam aliquid a esse, recusandae dolor corporis incidunt soluta.",
        },
      ],
      columns: [
        {
          field: "id",
          label: "ID",
        },
        {
          field: "sector",
          label: "Setor",
        },
        {
          field: "description",
          label: "Descrição",
        },
      ],
    };
  },
  methods: {
    editSector(sector) {
      this.$emit("editSector", sector);
    },
    deleteSector(sector) {
      const index = this.data.indexOf(sector);
      this.data.splice(index, 1);
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