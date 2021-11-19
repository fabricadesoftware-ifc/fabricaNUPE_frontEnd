<template>
  <div>
    <title-bar :title-stack="titleStack" />

    <hero-bar>
      Edição de Curso
      <template v-slot:right>
        <router-link to="/" class="button"> Dashboard </router-link>
      </template>
    </hero-bar>
    <card-component
      class="has-table has-mobile-sort-spaced"
      title="Curso"
      icon="puzzle"
    >
      <editar-curso />
    </card-component>
  </div>
</template>

<script>
import HeroBar from "@/components/templates/HeroBar";
import TitleBar from "@/components/templates/TitleBar";
import CardComponent from "@/components/templates/CardComponent";

import EditarCurso from "@/components/curso/EditarCurso";

export default {
  auth: false,
  components: { EditarCurso, TitleBar, HeroBar, CardComponent },

  computed: {
    titleStack() {
      return ["Admin", "Edição de Curso"];
    },
  },
};
</script>