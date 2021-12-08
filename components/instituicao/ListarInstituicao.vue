<template>
  <b-table :data="institutions">
    aaa
    <template v-slot="props">
      <b-table-column label="ID"> {{ props.row["id"] }} </b-table-column>
      <b-table-column label="Nome"> {{ props.row["name"] }}</b-table-column>

      <b-table-column custom-key="actions" label="Ações">
        <b-button
          type="is-primary"
          icon-left="pencil"
          @click="editInstitution(props.row)"
        ></b-button>
        <b-button
          type="is-danger"
          icon-left="delete"
          @click="deleteInstitution(props.row)"
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
    };
  },
  computed: {
    ...mapState("institution", ["institutions"]),
  },
  methods: {
    ...mapActions("institution", ["fetchAllInstitutions"]),
    editInstitution(institution) {
      this.$emit("editInstitution", institution);
    },
    deleteInstitution(institution) {
      try {
        this.$axios.$delete(`/api/v1/institution/${institution.id}/`);
      } catch (error) {
        console.log(error);
      }
      window.location.reload();
    },
  },
  created() {
    this.fetchAllInstitutions();
  },
};
</script>

<style>
</style>