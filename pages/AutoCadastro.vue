<template>
  <div class="section is-main-section">
    <title-bar :title-stack="titleStack" />
    <hr />
    <section>
      <div class="block"></div>
      <b-steps
        animated
        rounded
        has-navigation
        icon-prev="chevron-left"
        icon-next="chevron-right"
        label-position="botton"
        mobile-mode="minimalist"
      >
        <b-step-item
          step="1"
          label="Dados do Aluno"
          :clickable="isStepsClickable"
          ><student-info />
        </b-step-item>

        <b-step-item
          step="2"
          label="Responsáveis"
          :clickable="isStepsClickable"
        >
          <responsibles />
        </b-step-item>

        <b-step-item step="3" label="Finalização" :clickable="isStepsClickable">
          <h1 class="title has-text-centered">Finish</h1>
          Lorem ipsum dolor sit amet.
        </b-step-item>

        <template v-if="customNavigation" #navigation="{ previous, next }">
          <b-button
            outlined
            type="is-danger"
            icon-pack="fas"
            icon-left="backward"
            :disabled="previous.disabled"
            @click.prevent="previous.action"
          >
            Previous
          </b-button>
          <b-button
            outlined
            type="is-success"
            icon-pack="fas"
            icon-right="forward"
            :disabled="next.disabled"
            @click.prevent="next.action"
          >
            Next
          </b-button>
        </template>
      </b-steps>
    </section>
  </div>
</template>

<script>
import HeroBar from "@/components/templates/HeroBar";
import TitleBar from "@/components/templates/TitleBar";
import CardComponent from "@/components/templates/CardComponent";
import StudentInfo from "@/components/AutoCadastro/StudentInfo";
import Responsibles from "@/components/AutoCadastro/Responsibles";
import Finish from "@/components/AutoCadastro/Finish";

export default {
  components: {
    TitleBar,
    HeroBar,
    CardComponent,
    StudentInfo,
    Responsibles,
    Finish,
  },
  data() {
    return {
      activeStep: 0,

      showSocial: false,
      isAnimated: true,
      isRounded: true,
      isStepsClickable: false,

      hasNavigation: true,
      customNavigation: false,
      isProfileSuccess: false,

      prevIcon: "chevron-left",
      nextIcon: "chevron-right",
      labelPosition: "bottom",
      mobileMode: "minimalist",
    };
  },
  computed: {
    titleStack() {
      return ["Cadastro"];
    },
  },
  methods: {},
};
</script>
