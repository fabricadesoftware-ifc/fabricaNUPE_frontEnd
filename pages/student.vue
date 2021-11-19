<template>
  <section class="section is-main-section">
    <div class="is-vcentered">
      <estudantes />
      <cadastro-estudantes />
    </div>
  </section>
</template>

<script>
import Estudantes from "@/components/register/estudantes/estudantes";
import CadastroEstudantes from "@/components/register/estudantes/cadastro_estudante";

export default {
  components: { Estudantes, CadastroEstudantes },
  auth: false,
  data() {
    return {};
  },  
};
</script>

<style>
</style>