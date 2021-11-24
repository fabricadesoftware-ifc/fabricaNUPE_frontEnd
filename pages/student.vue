<template>
  <section class="section is-main-section">
    <div class="is-vcentered">
      <cadastro-estudantes v-if="creating" />
      <estudantes @createStudent="createStudent" :value="value" v-else />
    </div>
  </section>
</template>

<script>
import Estudantes from "@/components/register/estudantes/estudantes";
import CadastroEstudantes from "@/components/register/estudantes/cadastro_estudante";

export default {
  components: { Estudantes, CadastroEstudantes },
  data() {
    return {
      creating: false,
      value: "",
    };
  },
  methods: {
    createStudent(value) {
      this.creating = value;
    },
  },
};
</script>

<style>
</style>