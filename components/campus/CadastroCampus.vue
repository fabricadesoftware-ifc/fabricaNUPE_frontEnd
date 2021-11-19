<template>
  <section>
    <b-field label="Nome">
      <b-input
        v-model="currentCampus.name"
        minlength="1"
        maxlength="50"
        required
        placeholder="Nome do Campus"
        type="text"
      ></b-input>
    </b-field>

    <b-field label="CNPJ">
      <b-input
        v-model="currentCampus.cnpj"
        minlength="18"
        maxlength="18"
        required
        placeholder="CNPJ do Campus"
        type="text"
      ></b-input>
    </b-field>

    <b-field label="Endereço">
      <b-input
        v-model="currentCampus.address"
        minlength="1"
        maxlength="75"
        required
        placeholder="Endereço do Campus"
        type="text"
      ></b-input>
    </b-field>

    <b-field label="Número">
      <b-input
        v-model="currentCampus.number"
        minlength="1"
        maxlength="10"
        required
        placeholder="Número do Campus"
        type="text"
      ></b-input>
    </b-field>

    <b-field label="Website">
      <b-input
        v-model="currentCampus.website"
        maxlength="50"
        placeholder="Site do Campus"
        type="url"
      ></b-input>
    </b-field>

    <b-field label="Localização">
      <b-select
        v-model="currentCampus.location"
        placeholder="Selecione a Localização"
      >
        <option v-for="loc of locations" :key="loc.id" :value="loc.id">
          {{ loc.name }}
        </option>
      </b-select>
    </b-field>

    <b-field label="Selecione a Instituição">
      <b-select
        v-model="currentCampus.institution"
        placeholder="Selecione a Instituição"
      >
        <option v-for="inst of institutions" :key="inst.id" :value="inst.id">
          {{ inst.name }}
        </option>
      </b-select>
    </b-field>

    <b-button class="is-primary" @click="save">Cadastrar</b-button>
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: {
    campus: {
      type: Object,
    },
  },

  data() {
    return {
      currentCampus: this.campus,
    };
  },
  methods: {
    ...mapActions("institution", ["fetchAllInstitutions"]),
    ...mapActions("location", ["fetchAllLocations"]),
    ...mapActions("campus", ["createCampus"]),
    async save() {
      try {
        if (this.campus.id) {
          this.$axios.$patch(
            `api/v1/campus/${this.campus.id}/`,
            this.currentCampus
          );
          // console.log('editar')
        } else {
          console.log("criar");
          await this.createCampus(this.currentCampus);
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
      }
    },
  },
  computed: {
    ...mapState("institution", ["institutions"]),
    ...mapState("location", ["locations"]),
  },
  created() {
    this.fetchAllInstitutions(), this.fetchAllLocations();
    console.log(this.campus);
  },
};
</script>
