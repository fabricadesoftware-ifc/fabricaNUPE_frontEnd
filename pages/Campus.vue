<template>
  <div class="section is-main-section">
    <title-bar :title-stack="titleStack" />

    <hero-bar>
      Gerenciamento de Campus
      <template v-slot:right>
        <b-button
          v-if="!creating && !editing && !page"
          type="is-success"
          icon-left="plus"
          @click="createCampus"
        />
        <b-button
          v-else
          type="is-primary"
          icon-left="arrow-left-bold"
          @click="reset"
        />
      </template>
    </hero-bar>
    <card-component
      class="has-table has-mobile-sort-spaced"
      title="Câmpus"
      icon="puzzle"
    >
      <cadastro-campus v-if="editing" :campus="currentCampus" />
      <cadastro-campus v-else-if="creating" :campus="currentCampus" />
      <listar-campus v-else @editCampus="editCampus" />
    </card-component>
  </div>
</template>

<script>
import HeroBar from "@/components/templates/HeroBar";
import TitleBar from "@/components/templates/TitleBar";
import CardComponent from "@/components/templates/CardComponent";
import ListarCampus from "@/components/campus/ListarCampus";
import CadastroCampus from "@/components/campus/CadastroCampus";

export default {
  components: {
    TitleBar,
    HeroBar,
    CardComponent,
    ListarCampus,
    CadastroCampus,
  },
  data() {
    return {
      editing: false,
      creating: false,
      page: true,
      currentCampus: {},
    };
  },
  computed: {
    titleStack() {
      return ["Admin", "Listagem de Campus"];
    },
  },
  methods: {
    editCampus(campus) {
      this.editing = true;
      Object.assign(this.currentCampus, campus);
      this.currentCampus.institution = this.currentCampus.institution.id;
      this.currentCampus.location = this.currentCampus.location;
      // alert(campus.general_director);
    },
    createCampus() {
      this.creating = true;
      this.editing = false;
    },
    reset() {
      (this.creating = false),
        (this.editing = false),
        (this.currentCampus = {});
    },
  },
};
</script>