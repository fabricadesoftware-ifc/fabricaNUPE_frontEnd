<template>
  <div>
    <div class="block">
      <!--INICIO novo Layout sup pag-->
      <h2 class="title">Estudantes</h2>
    </div>
    <h2 class="subtitle">Todos os Estudantes</h2>

    <div class="level">
      <span class="level-left">
        <b-input
          class="level-item"
          type="search"
          icon="magnify"
          icon-clickable
          placeholder="Pesquise na lista"
        />
      </span>
      <span class="level-right">
        <b-button
          @click="createAttendance()"
          type="is-primary"
          class="level-item is-primary"
        >
          Cadastrar estudante
        </b-button>
      </span>
      <!--FIM novo Layout sup pag-->

      <!-- antigo layout-------------------------------------------------------------------------------------
        
        <h2 class="title">Admin / Estudantes</h2>
    </div>
    <h2 class="subtitle">Todos os atendimentos</h2>

    <div class="level">
      <span class="level-left">
        <b-input
          class="level-item"
          type="search"
          icon="magnify"
          icon-clickable
          placeholder="Pesquise na lista"
        />
      </span>
      <span class="level-right">
        <b-button
          @click="createAttendance()"
          type="is-primary"
          class="level-item is-primary"
        >
          Cadastrar curso
        </b-button>
      </span> -->
    </div>

    <!-- FILTRO PRETO -----------------------------
      
       <b-menu>
      <b-menu-list label="Menu ----------------------">
        <b-menu-item icon="settings" :active="isActive" expanded>
          <template #label="props">
            Filtros
            <b-icon
              class="is-pulled-right"
              :icon="props.expanded ? 'menu-down' : 'menu-up'"
            ></b-icon>
            <b-menu>
              <b-menu-list label="">
                <b-menu-item icon="settings" :active="isActive">
                  <template #label="props">
                    Curso
                    <b-icon
                      class="is-pulled-right"
                      :icon="props.expanded ? 'menu-down' : 'menu-up'"
                    ></b-icon>
                  </template>
                  <b-menu-item icon="settings" :active="isActive">
                    <template #label="props">
                      Agropecuária
                      <b-icon
                        class="is-pulled-right"
                        :icon="props.expanded ? 'menu-down' : 'menu-up'"
                      ></b-icon>
                    </template>
                    <b-field>
                      <b-checkbox>1AGRO1</b-checkbox>
                    </b-field>
                    <b-field>
                      <b-checkbox>1AGRO2</b-checkbox>
                    </b-field>
                    <b-field>
                      <b-checkbox>1AGRO3</b-checkbox>
                    </b-field>
                  </b-menu-item>
                  <b-menu-item icon="settings" :active="isActive">
                    <template #label="props">
                      Informática
                      <b-icon
                        class="is-pulled-right"
                        :icon="props.expanded ? 'menu-down' : 'menu-up'"
                      ></b-icon>
                    </template>
                    <b-field>
                      <b-checkbox>1INFO1</b-checkbox>
                    </b-field>
                    <b-field>
                      <b-checkbox>1INFO2</b-checkbox>
                    </b-field>
                    <b-field>
                      <b-checkbox>1INFO3</b-checkbox>
                    </b-field>
                  </b-menu-item>

                  <b-menu-item icon="settings" :active="isActive">
                    <template #label="props">
                      Química
                      <b-icon
                        class="is-pulled-right"
                        :icon="props.expanded ? 'menu-down' : 'menu-up'"
                      ></b-icon>
                    </template>
                    <b-field>
                      <b-checkbox>1QUIMI1</b-checkbox>
                    </b-field>
                    <b-field>
                      <b-checkbox>1QUIMI2</b-checkbox>
                    </b-field>
                    <b-field>
                      <b-checkbox>1QUIMI</b-checkbox>
                    </b-field>
                  </b-menu-item>
                </b-menu-item>
              </b-menu-list>
            </b-menu>
          </template>
        </b-menu-item>
      </b-menu-list>
    </b-menu> 
    
    FIM FILTRO PRETO --------------
    -->

    <b-tabs>
      <b-tab-item label="Dados">
        <b-table
          :data="data"
          :paginated="isPaginated"
          :per-page="perPage"
          :selected.sync="selected"
          :current-page.sync="currentPage"
          :pagination-simple="isPaginationSimple"
          :pagination-position="paginationPosition"
          :default-sort-direction="defaultSortDirection"
          :pagination-rounded="isPaginationRounded"
          :sort-icon="sortIcon"
          :hoverable="hoverable"
          :focusable="focusable"
          :scrollable="scrollable"
        >
          <template v-slot="props">
            <b-table-column
              v-for="(column, index) in columns"
              :key="index"
              :field="column.field"
              :label="column.label"
              :sortable="sortable"
            >
              {{ props.row[column.field] }}
            </b-table-column>
            <b-table-column custom-key="actions" label="Ações">
              <b-button
                type="is-primary"
                icon-left="pencil"
                @click="editSector(props.row)"
              ></b-button>
              <b-button
                type="is-danger"
                icon-left="delete"
                @click="confirmCustomDelete(props.row)"
              ></b-button>
            </b-table-column>
          </template>
        </b-table>

        <!-- <b-table
          :data="data"
          :paginated="isPaginated"
          :per-page="perPage"
          :columns="columns"
          :selected.sync="selected"
          focusable>
        </b-table> -->
      </b-tab-item>

      <b-tab-item label="Mais informações">
        <pre>{{ selected }}</pre>
      </b-tab-item>
    </b-tabs>

    <hr />
    <!-- Fim Listagem de Alunos | Início Paginação-->
    <!--<b-pagination
      :paginated="isPaginated"
      :total="total"
      v-model="current"
      :range-before="rangeBefore"
      :range-after="rangeAfter"
      :order="order"
      :size="size"
      :simple="isSimple"
      :rounded="isRounded"
      :per-page="perPage"
      :icon-prev="prevIcon"
      :icon-next="nextIcon"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page">
    </b-pagination> -->

    <!--Fim Paginação-->
  </div>
</template>



<script>
export default {
  created() {
    this.fecthAllStudents();
  },
  methods: {
    async fecthAllStudents() {
      this.data = await this.$axios.$get("/api/v1/student/");
    },
    createAttendance() {},
    confirm() {
      this.$buefy.dialog.confirm({
        message: "Continue on this task?",
        onConfirm: () => this.$buefy.toast.open("User confirmed"),
      });
    },
    confirmCustomDelete() {
      this.$buefy.dialog.confirm({
        title: "Excluir Aluno",
        message:
          "Tem certeza que deseja excluir esse aluno?<br>Essa ação não poderá ser desfeita.",
        confirmText: "Excluir",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () =>
          this.$buefy.toast.open({
            duration: 5000,
            message: "Aluno excluído com sucesso",
            //position: 'is-bottom',
            type: "is-success",
          }),
      });
    },
  },
  data() {
    /*Início Componentes Listagem de alunos*/
    const data = [];
    return {
      // propriedads da tabela
      sortable: true,
      hoverable: true,
      focusable: true,
      scrollable: true,
      isPaginated: true,
      isPaginationSimple: false,
      isPaginationRounded: false,
      paginationPosition: "bottom",
      defaultSortDirection: "asc",
      sortIcon: "arrow-up",
      sortIconSize: "is-small",
      currentPage: 1,
      perPage: 5,
      isActive: true,
      data,
      selected: data[1],
      // propriedades da tabela
      columns: [
        {
          field: "id",
          label: "N° Matrícula",
          //width: '40',
          numeric: true,
        },
        {
          field: "registration",
          label: "Nome completo",
        },
        {
          field: "full_name",
          label: "Curso",
        },
        {
          field: "ingress_date",
          label: "Período",
          centered: true,
        },
        {
          field: "graduated",
          label: "Turma",
        },
      ] /*Fim Componentes Listagem de alunos*/,

      total: 100 /*Paginação inferior*/,
      current: 10,
      perPage: 10,
      rangeBefore: 3,
      rangeAfter: 9,
      order: "",
      size: "",
      isSimple: false,
      isRounded: false,
      prevIcon: "chevron-left",
      nextIcon: "chevron-right" /*Fim Paginação inferior*/,
      methods: {
        alert() {
          this.$buefy.dialog.alert("Everything looks fine!");
        },
        alertCustom() {
          this.$buefy.dialog.alert({
            title: "Title Alert",
            message: "I have a title, a custom button and <b>HTML</b>!",
            confirmText: "Cool!",
          });
        },
        alertCustomError() {
          this.$buefy.dialog.alert({
            title: "Error",
            message:
              "Something's not good but I have a custom <b>icon</b> and <b>type</b>",
            type: "is-danger",
            hasIcon: true,
            icon: "times-circle",
            iconPack: "fa",
            ariaRole: "alertdialog",
            ariaModal: true,
          });
        },
      },
    };
  },
};
</script>
<style>
</style>
