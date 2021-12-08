<template>
  <section style="margin-left: 3%; margin-right: 2%">
    <div>
      <title-bar :title-stack="titleStack" />

      <hero-bar>
        Edição de Curso
        <template v-slot:right>
          <router-link to="/" class="button"> Dashboard </router-link>
        </template>
      </hero-bar>
    </div>
    
    <b-field label="Nome do Curso">
      <b-input placeholder="Dado da base de dados"></b-input>
    </b-field>
      <b-field grouped>
        <b-field label="Portaria de Credenciamento">
        <b-input placeholder="Dado da base de dados"></b-input>
      </b-field>
      <b-field label="Data da Portaria" :label-position="labelPosition">
        <b-datepicker
          placeholder="Dado da base de dados"
          icon="calendar-today"
          trap-focus width='60%'>
        </b-datepicker>
      </b-field>
    </b-field>
      <b-field grouped>
        <b-field label="Início de vigência" :label-position="labelPosition">
          <b-datepicker
            placeholder="Dado da base de dados"
            icon="calendar-today"
            trap-focus width='60%'>
          </b-datepicker>
        </b-field>
        <b-field label="Fim de vigência" :label-position="labelPosition">
          <b-datepicker
            placeholder="Dado da base de dados"
            icon="calendar-today"
            trap-focus width='60%'>
          </b-datepicker>
        </b-field>
        <b-field label="Grau">
          <b-select placeholder="Dado da base de dados">
            <option value="1">Grau I</option>
            <option value="2">Grau II</option>
            <option value="3">Grau II</option>
          </b-select>
        </b-field>
        </b-field>

        <b-field label="Observações"
            :label-position="labelPosition">
            <b-input maxlength="200" type="textarea" placeholder="Dado da base de dados"></b-input>
        </b-field>

        <b-field label="Nome do Coordenador">
          <b-input placeholder="Dado da base de dados"></b-input>
        </b-field>
      
      <b-button tag="input"
                native-type="submit"
                value="Editar" @click="success">Editar</b-button>
    </section>
</template>

<script>
  export default {
    methods: {
      clickMe() {
        this.$buefy.notification.open('Alteração efetuada com Sucesso!')
      }
    }
  }
</script>
