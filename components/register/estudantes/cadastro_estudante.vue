<template>
  <section style="margin-left: 3%; margin-right: 2%">
    <h3 class="subtitle">Cadastro de Estudante  </h3>
    <form>
      <b-field label="Nome completo">
        <b-input placeholder="Kelvin Klaxs"></b-input>
      </b-field>
      <b-field grouped>
        <b-field label="Data de Nascimento" :label-position="labelPosition">
          <b-datepicker
            placeholder="Clique para selecionar"
            icon="calendar-today"
            trap-focus
            width="60%"
          >
          </b-datepicker>
        </b-field>
        <b-field label="Gênero">
          <b-select placeholder="Selecione seu gênero">
            <option value="1">Masculino</option>
            <option value="2">Feminino</option>
            <option value="3">Outro</option>
          </b-select>
        </b-field>
      </b-field>
      <b-field>
        <b-field label="CPF">
          <b-input
            class="form-control cpf-mask"
            placeholder="CPF"
            icon="credit-card"
          >
          </b-input>
        </b-field>
        <b-field label="Número de matrícula">
          <b-input placeholder="2020011212"></b-input>
        </b-field>
      </b-field>

      <b-field label="Observações" :label-position="labelPosition">
        <b-input maxlength="200" type="textarea"></b-input>
      </b-field>

      <b-field label="E-mail">
        <b-input
          placeholder="email@email.com"
          v-model="email"
          type="email"
          icon="email"
          icon-right="close-circle"
          icon-right-clickable
          @icon-right-click="clearIconClick"
        >
        </b-input>
      </b-field>
      <b-field grouped>
        <b-field label="Usuário">
          <b-input
            placeholder="Ex: Seu nome + dia de nascimento: Lucas23"
          ></b-input>
        </b-field>

        <b-field
          label="Password"
          type="Warning Light"
          :message="[
            'A senha deve possuir no mínimo 8 caracteres.',
            'Máximo 15 caracteres.',
          ]"
        >
          <b-input
            value="112"
            type="password"
            maxlength="15"
            minlength="8"
          ></b-input>
        </b-field>
      </b-field>
      <b-field>
        <b-field class="columns">
          <div class="column is-one-half">
            <b-button native-type="submit" class="is-primary" expanded
              >Enviar Cadastro</b-button
            >
          </div>
          <div class="column is-one-half">
            <b-button type="is-danger is-outlined" @click="reset" expanded>
              Voltar
            </b-button>
          </div>
        </b-field>
      </b-field>
      <b-button type="is-primary is-outlined" expanded
        >Upload de foto de Perfil
      </b-button>
    </form>

    <!-- <b-field class="file is-primary" :class="{ 'has-name': !!file }">
      <b-upload v-model="file" class="file-label">
        <span class="file-cta">
          <b-icon class="file-icon" icon="upload"></b-icon>
          <span class="file-label">Foto de perfil</span>
        </span>
        <span class="file-name" v-if="file">
          {{ file.name }}
        </span>
      </b-upload>
    </b-field> 
  
    
      tag="input"
      native-type="submit"
      value="Enviar Cadastro"
      type="is-primary"
      @click="success"
      >Enviar Cadastro</b-button

      
    >-->
  </section>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      labelPosition: "is-centered",
      email: "",
    };
  },
  methods: {
    reset() {},
    clearIconClick() {
      this.email = "";
    },
    success() {
      this.$buefy.toast.open({
        message: "Aluno cadastrado com sucesso",
        type: "is-success",
      });
    },
  },
};
</script>

<style>
</style>
