<template>
  <section class="section is-main-section">
    <div class="is-vcentered">
      <cadastro-estudantes
        @createStudent="createStudent"
        :value="value"
        v-if="creating"
      />
      <editar-estudante :student="currentStudent" v-else-if="editing">
      </editar-estudante>
      <estudantes
        @editStudent="editStudent"
        :currentStudent="currentStudent"
        @createStudent="createStudent"
        :value="value"
        v-else
      />
    </div>
  </section>
</template>

<script>
import Estudantes from "@/components/register/estudantes/estudantes";
import CadastroEstudantes from "@/components/register/estudantes/cadastro_estudante";
import EditarEstudante from "@/components/register/estudantes/editarEstudante";

export default {
  components: { Estudantes, CadastroEstudantes, EditarEstudante },
  data() {
    return {
      currentStudent: {},
      creating: false,
      editing: false,
      value: "",
    };
  },
  methods: {
    editStudent(currentStudent) {
      this.currentStudent = currentStudent;
      this.editing = true;
    },
    createStudent(value) {
      this.creating = value;
    },
  },
};
</script>

<style>
</style>