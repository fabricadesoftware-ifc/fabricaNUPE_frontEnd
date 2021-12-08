<template>
  <div style="margin-left: 20%; margin-right: 20%; margin-top: 2%">
    <div class="columns">
      <b-field class="column is-half" label="Nome"
        ><b-input
          minlength="1"
          maxlength="50"
          required
          placeholder="Nome do Aluno"
          type="text"
        ></b-input
      ></b-field>

      <b-field label="Sobrenome" class="column is-half"
        ><b-input
          minlength="1"
          maxlength="100"
          required
          placeholder="Sobrenome do Aluno"
          type="text"
        ></b-input
      ></b-field>
    </div>
    <div class="columns">
      <b-field label="CPF" class="column is-half"
        ><b-input
          minlength="14"
          maxlength="14"
          required
          placeholder="CPF Ex:116.888.552-66"
          type="text"
        ></b-input
      ></b-field>

      <b-field label="E-mail" class="column is-half"
        ><b-input
          minlength="1"
          maxlength="254"
          required
          placeholder="E-mail. Ex:nupe@gmail.com"
          type="text"
        ></b-input
      ></b-field>
    </div>
    <div class="columns">
      <b-field label="Data de Nascimento" class="column is-half"
        ><b-input
          minlength="10"
          maxlength="10"
          required
          placeholder="Data. Ex:2021-06-22"
          type="text"
        ></b-input
      ></b-field>

      <b-field label="Gênero" class="column is-half"
        ><b-input
          minlength="1"
          maxlength="1"
          required
          placeholder="Gênero Ex: M ou F"
          type="text"
        ></b-input
      ></b-field>
    </div>

    <b-field label="Contato"
      ><b-input
        minlength="11"
        maxlength="12"
        placeholder="Contato. 554734454322"
        type="text"
      ></b-input
    ></b-field>
  </div>
</template>