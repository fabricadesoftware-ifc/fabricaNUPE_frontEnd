<template>
  <b-table :data="data">
    <template v-slot="props">
      <b-table-column
        v-for="(column, index) in columns"
        :key="index"
        :field="column.field"
        :label="column.label"
      >
        {{ props.row[column.field] }}
      </b-table-column>
      <b-table-column custom-key="actions" label="Ações">
        <b-button
          type="is-primary"
          icon-left="pencil"
          @click="editCampus(props.row)"
        ></b-button>
        <b-button
          type="is-danger"
          icon-left="delete"
          @click="deleteCampus(props.row)"
        ></b-button>
      </b-table-column>
    </template>
  </b-table>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          cnpj: "10.635.424/0003-48",
          campus_name: "Araquari",
          institution_name: "IFC - Instituto Federal Catarinense",
          general_director: "Cleder Alexandre Somensi",
        },
        {
          cnpj: "11.635.424/0003-48",
          campus_name: "Araquari",
          institution_name: "IFC - Instituto Federal Catarinense",
          general_director: "Matheu Santos",
        },
        {
          cnpj: "10.635.424/0003-48",
          campus_name: "Blumenau",
          institution_name: "IFC - Instituto Federal Catarinense",
          general_director: "Renan",
        },
        {
          cnpj: "10.635.424/0003-48",
          campus_name: "Videira",
          institution_name: "IFC - Instituto Federal Catarinense",
          general_director: "Calleo",
        },
        {
          cnpj: "10.635.424/0003-48",
          campus_name: "Araquari",
          institution_name: "IFC - Instituto Federal Catarinense",
          general_director: "Cleder Alexandre Somensi",
        },
      ],
      columns: [
        {
          field: "cnpj",
          label: "CNPJ",
          width: "40",
        },
        {
          field: "campus_name",
          label: "Campus",
        },
        {
          field: "institution_name",
          label: "Instituição",
        },
        {
          field: "general_director",
          label: "Diretor Geral",
        },
      ],
    };
  },
  methods: {
    editCampus(campus) {
      this.$emit("editCampus", campus);
    },
    deleteCampus(campus) {
      const index = this.data.indexOf(campus);
      this.data.splice(index, 1);
    },
  },
};
</script>

<style>
</style>