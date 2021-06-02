<template>
  <div>
    <title-bar :title-stack="titleStack" />

    <hero-bar>
      Gerenciamento de Campus
      <template v-slot:right>
        <router-link to="/" class="button"> Dashboard </router-link>
      </template>
    </hero-bar>
    <card-component
      class="has-table has-mobile-sort-spaced"
      title="Câmpus"
      icon="puzzle"
    >
      <editar-campus v-if="editing" :campus="currentCampus" />
      <listar-campus v-else @editCampus="editCampus" />
    </card-component>
  </div>
</template>

<script>
import HeroBar from "@/components/templates/HeroBar";
import TitleBar from "@/components/templates/TitleBar";
import CardComponent from "@/components/templates/CardComponent";

import ListarCampus from "@/components/campus/ListarCampus";
import EditarCampus from "@/components/campus/EditarCampus";

export default {
  auth: false,
  components: { TitleBar, HeroBar, CardComponent, EditarCampus, ListarCampus },
  data() {
    return {
      editing: false,
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
      this.currentCampus = campus;
      // alert(campus.general_director);
    },
  },
};
</script>