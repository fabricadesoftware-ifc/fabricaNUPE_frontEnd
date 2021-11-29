<template>
  <div class="section is-main-section">
    <title-bar :title-stack="titleStack" />

    <hero-bar>
      Gerenciamento de Instituição
      <template v-slot:right>
        <b-button
          v-if="!creating && !editing"
          type="is-success"
          icon-left="plus"
          @click="createInstitution"
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
      <cadastro-instituicao v-if="editing" :institution="currentInstitution" />
      <cadastro-instituicao
        v-else-if="creating"
        :institution="currentInstitution"
      />
      <listar-instituicao v-else @editInstitution="editInstitution" />
    </card-component>
  </div>
</template>

<script>
import HeroBar from "@/components/templates/HeroBar";
import TitleBar from "@/components/templates/TitleBar";
import CardComponent from "@/components/templates/CardComponent";

import CadastroInstituicao from "@/components/instituicao/CadastroInstituicao";
import ListarInstituicao from "../components/instituicao/ListarInstituicao.vue";

export default {
  components: {
    TitleBar,
    HeroBar,
    CardComponent,
    ListarInstituicao,
    CadastroInstituicao,
  },
  data() {
    return {
      editing: false,
      creating: false,
      currentInstitution: {},
    };
  },
  computed: {
    titleStack() {
      return ["Admin", "Listagem de Instituição"];
    },
  },
  methods: {
    editInstitution(institution) {
      this.editing = true;
      Object.assign(this.currentInstitution, institution);
    },
    createInstitution() {
      this.creating = true;
      this.editing = false;
    },
    reset() {
      (this.creating = false),
        (this.editing = false),
        (this.currentInstitution = {});
    },
  },
};
</script>