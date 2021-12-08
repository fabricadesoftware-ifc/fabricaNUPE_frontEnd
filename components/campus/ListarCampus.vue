<template>
  <b-table :data="campus" :paginated="isPaginated" :per-page="perPage">
    <template v-slot="props">
      <b-table-column label="Nome">
        {{ props.row["name"] }}
      </b-table-column>
      <b-table-column label="Instituição">
        {{ props.row["institution"].name }}
      </b-table-column>
      <b-table-column label="Endereço">
        {{ props.row["address"] }}
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
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      data: [],
      isPaginated: true,
      perPage: 10,
      // sortable: true,
    };
  },
  computed: {
    ...mapState("campus", ["campus"]),
  },
  methods: {
    ...mapActions("campus", ["fetchAllCampus"]),
    editCampus(campus) {
      this.$emit("editCampus", campus);
    },
    deleteCampus(campus) {
      try {
        this.$axios.$delete(`/api/v1/campus/${campus.id}/`);
      } catch (error) {
        console.log(error);
      }
      window.location.reload();
    },
  },
  created() {
    this.fetchAllCampus();
  },
};
</script>

<style>
</style>