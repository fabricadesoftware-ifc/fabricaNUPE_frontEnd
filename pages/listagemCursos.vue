<template>
  <div>
    <title-bar :title-stack="titleStack" />

    <hero-bar>
      Listagem de Cursos
      <template v-slot:right>
        <router-link to="/" class="button"> Dashboard </router-link>
      </template>
    </hero-bar>
    <card-component
      class="has-table has-mobile-sort-spaced"
      title="Cursos"
      icon="puzzle"
    >
      <listagem-cursos />
    </card-component>
  </div>
</template>

<script>
import HeroBar from "@/components/templates/HeroBar";
import TitleBar from "@/components/templates/TitleBar";
import CardComponent from "@/components/templates/CardComponent";

import ListagemCursos from "@/components/curso/ListagemCursos";

export default {
  auth: false,
  components: { ListagemCursos, TitleBar, HeroBar, CardComponent },

  computed: {
    titleStack() {
      return ["Admin", "Listagem de Cursos"];
    },
  },
};
</script>