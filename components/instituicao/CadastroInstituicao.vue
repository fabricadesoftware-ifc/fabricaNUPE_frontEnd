<template>
  <section>
    <b-field label="Nome">
      <b-input
        v-model="currentInstitution.name"
        minlength="1"
        maxlength="50"
        required
        placeholder="Nome da Instituição"
        type="text"
      ></b-input>
    </b-field>

    <b-button class="is-primary" @click="save">Cadastrar</b-button>
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: {
    institution: {
      type: Object,
    },
  },

  data() {
    return {
      currentInstitution: this.institution,
    };
  },
  methods: {
    ...mapActions("institution", ["fetchAllInstitutions"]),
    ...mapActions("institution", ["createInstitution"]),
    async save() {
      try {
        if (this.institution.id) {
          this.$axios.$patch(
            `api/v1/institution/${this.institution.id}/`,
            this.currentInstitution
          );
          // console.log('editar')
        } else {
          console.log("criar");
          await this.createInstitution(this.currentInstitution);
        }
        this.$buefy.toast.open({
          message: "Sucesso!",
          type: "is-success",
        });
      } catch (error) {
        this.$buefy.toast.open({
          message: "Algo está Errado!",
          type: "is-danger",
        });
        console.log(error);
      }
    },
  },
  computed: {
    ...mapState("institution", ["institutions"]),
  },
  created() {
    this.fetchAllInstitutions();
    console.log(this.institution);
  },
};
</script>
