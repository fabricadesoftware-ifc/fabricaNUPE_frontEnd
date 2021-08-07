<template>
  <section>
    <div class="block">
      <h2 class="title">Admin / atendimento</h2>
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
          @click="createAttendance(true)"
          type="is-primary"
          class="level-item is-primary"
        >
          Criar atendimento
        </b-button>
        <b-button
          @click="personalAttendance(true)"
          class="level-item is-primary is-outlined"
          >Meus atendimentos</b-button
        >
      </span>
    </div>

    <b-table
      :data="data"
      :paginated="isPaginated"
      :per-page="perPage"
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
          <b-field>
            <b-button
              type="is-primary"
              icon-left="pencil"
              @click="editAttendance(props.row)"
            ></b-button>
          </b-field>
          <b-field>
            <b-button
              type="is-danger"
              icon-left="delete"
              @click="confirmCustomDelete(props.row)"
            ></b-button>
          </b-field>
        </b-table-column>
      </template>
    </b-table>
  </section>
</template>
<script>
export default {
  data() {
    return {
      // propriedades da tabela
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
      // término propriedades da tabela
      data: [],
      columns: [
        {
          field: "id",
          label: "ID",
        },
        {
          field: "attendance",
          label: "Atendimento",
        },
        {
          field: "status",
          label: "Status",
        },
        {
          field: "severity",
          label: "Gravidade",
        },
        {
          field: "attendant_last_name",
          label: "Sobrenome atendente",
        },
        {
          field: "attendant_name",
          label: "Nome atendente",
        },
        {
          field: "attendants",
          label: "Atendentes",
        },
        {
          field: "student_name",
          label: "Nome estudante",
        },
        {
          field: "student_last_name",
          label: "Sobrenome estudante",
        },
        {
          field: "student",
          label: "Estudante",
        },
      ],
    };
  },
  created() {
    this.fetchAllAttendances();
  },

  methods: {
    revertDate(date) {
      let reversedDate = date.split("-");
      let corectedDateInArray = reversedDate.reverse();
      let correctedDateInString = corectedDateInArray.join("/");
      return correctedDateInString;
    },

    studentObjectToString() {
      let keys = [
        "Id:",
        "Matrícula:",
        "Nome completo:",
        "Data de ingresso:",
        "Graduado:",
      ];
      for (let index in this.data) {
        let result = "";
        let position = 0;
        for (let item in this.data[index].student) {
          this.data[index].student["graduated"] ==
          this.data[index].student[item]
            ? this.data[index].student[item]
              ? (result += `${keys[position]} Sim; `)
              : (result += `${keys[position]} Não; `)
            : this.data[index].student["ingress_date"] ==
              this.data[index].student[item]
            ? (result += `${keys[position]} ${this.revertDate(
                this.data[index].student[item]
              )}; `)
            : (result += `${keys[position]} ${this.data[index].student[item]}; `);
          position++;
        }
        this.data[index].student = result;
      }
    },

    attendantsObjectToString() {
      let keys = ["Id:", "Nome completo:", "Email:", "Trabalho:"];
      for (let index in this.data) {
        for (let item in this.data[index].attendants) {
          let result = "";
          let position = 0;
          for (let property in this.data[index].attendants[item]) {
            this.data[index].attendants[item][property] ==
            this.data[index].attendants[item]["local_job"]
              ? this.data[index].attendants[item][property] == null
                ? (result += `${keys[position]} Sem registro `)
                : (result += `${keys[position]} ${this.data[index].attendants[item][property]}: `)
              : (result += `${keys[position]} ${this.data[index].attendants[item][property]}: `);
            position++;
          }
          this.data[index].attendants[item] = result;
        }
        this.data[index].attendants = this.data[index].attendants[0];
      }
    },

    async fetchAllAttendances() {
      this.data = await this.$axios.$get("/api/v1/attendance/");
      this.studentObjectToString();
      this.attendantsObjectToString();
    },
    editAttendance(attendance) {
      this.$emit("editAttendance", attendance);
    },
    createAttendance(value) {
      this.$emit("createAttendance", value);
    },
    personalAttendance(value) {
      this.$emit("personalAttendance", value);
    },
    deleteAttendance(attendance) {
      try {
        this.$axios.$delete(`/api/v1/attendance/${attendance.id}/`);
      } catch (err) {
        console.log(err);
      }
      window.location.reload();
    },
    confirmCustomDelete(attendance) {
      this.$buefy.dialog.confirm({
        title: "Deletar atendimento",
        message:
          "Tem certeza que deseja deletar o " +
          attendance.attendance +
          "? A ação é irreversível",
        confirmText: "Deletar Atendimento",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () =>
          this.$buefy.toast.open({
            message: "Atendimento deletado com sucesso!",
            type: "is-primary",
          }) && this.deleteAttendance(attendance),
      });
    },
  },
};
</script>