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
          @click="createAttendance()"
          type="is-primary"
          class="level-item"
        >
          Criar atendimento
        </b-button>
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
      data: [
        {
          id: 1,
          attendance: "Atendimento 1",
          description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem totam animi ratione ut deserunt veritatis et qui, placeat fuga ipsum quas quibusdam aliquid a esse, recusandae dolor corporis incidunt soluta.",
          status: "Pendente",
          severity: "Médio",
          attendant_last_name: "Souza",
          attendant_name: "Lurde",
          attendants: "Pessoa A, B e C",
          student_last_name: "Jânito",
          student_name: "Yohan",
          student: "Yohan Jânito",
        },
        {
          id: 2,
          attendance: "Atendimento A",
          description:
            "Aorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem totam animi ratione ut deserunt veritatis et qui, placeat fuga ipsum quas quibusdam aliquid a esse, recusandae dolor corporis incidunt soluta.",
          status: "Pendente",
          severity: "Médio",
          attendant_last_name: "Souza",
          attendant_name: "Lurde",
          attendants: "Pessoa A, B e C",
          student_last_name: "Jânito",
          student_name: "Yohan",
          student: "Yohan Jânito",
        },
        {
          id: 3,
          attendance: "Atendimento 3",
          description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem totam animi ratione ut deserunt veritatis et qui, placeat fuga ipsum quas quibusdam aliquid a esse, recusandae dolor corporis incidunt soluta.",
          status: "Pendente",
          severity: "Médio",
          attendant_last_name: "Souza",
          attendant_name: "Lurde",
          attendants: "Pessoa A, B e C",
          student_last_name: "Jânito",
          student_name: "Yohan",
          student: "Yohan Jânito",
        },
        {
          id: 4,
          attendance: "Atendimento 4",
          description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem totam animi ratione ut deserunt veritatis et qui, placeat fuga ipsum quas quibusdam aliquid a esse, recusandae dolor corporis incidunt soluta.",
          status: "Pendente",
          severity: "Médio",
          attendant_last_name: "Souza",
          attendant_name: "Lurde",
          attendants: "Pessoa A, B e C",
          student_last_name: "Jânito",
          student_name: "Yohan",
          student: "Yohan Jânito",
        },
        {
          id: 5,
          attendance: "Atendimento 5",
          description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem totam animi ratione ut deserunt veritatis et qui, placeat fuga ipsum quas quibusdam aliquid a esse, recusandae dolor corporis incidunt soluta.",
          status: "Pendente",
          severity: "Médio",
          attendant_last_name: "Souza",
          attendant_name: "Lurde",
          attendants: "Pessoa A, B e C",
          student_last_name: "Jânito",
          student_name: "Yohan",
          student: "Yohan Jânito",
        },
        {
          id: 6,
          attendance: "Atendimento 6",
          description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem totam animi ratione ut deserunt veritatis et qui, placeat fuga ipsum quas quibusdam aliquid a esse, recusandae dolor corporis incidunt soluta.",
          status: "Pendente",
          severity: "Médio",
          attendant_last_name: "Souza",
          attendant_name: "Lurde",
          attendants: "Pessoa A, B e C",
          student_last_name: "Jânito",
          student_name: "Yohan",
          student: "Yohan Jânito",
        },
        {
          id: 7,
          attendance: "Atendimento v",
          description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem totam animi ratione ut deserunt veritatis et qui, placeat fuga ipsum quas quibusdam aliquid a esse, recusandae dolor corporis incidunt soluta.",
          status: "Pendente",
          severity: "Médio",
          attendant_last_name: "Souza",
          attendant_name: "Lurde",
          attendants: "Pessoa A, B e C",
          student_last_name: "Jânito",
          student_name: "Yohan",
          student: "Yohan Jânito",
        },
        {
          id: 8,
          attendance: "Atendimento nk",
          description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem totam animi ratione ut deserunt veritatis et qui, placeat fuga ipsum quas quibusdam aliquid a esse, recusandae dolor corporis incidunt soluta.",
          status: "Pendente",
          severity: "Médio",
          attendant_last_name: "Souza",
          attendant_name: "Lurde",
          attendants: "Pessoa A, B e C",
          student_last_name: "Jânito",
          student_name: "Yohan",
          student: "Yohan Jânito",
        },
        {
          id: 9,
          attendance: "Atendimento jj",
          description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem totam animi ratione ut deserunt veritatis et qui, placeat fuga ipsum quas quibusdam aliquid a esse, recusandae dolor corporis incidunt soluta.",
          status: "Pendente",
          severity: "Médio",
          attendant_last_name: "Souza",
          attendant_name: "Lurde",
          attendants: "Pessoa A, B e C",
          student_last_name: "Jânito",
          student_name: "Yohan",
          student: "Yohan Jânito",
        },
        {
          id: 10,
          attendance: "Atendimento B",
          description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem totam animi ratione ut deserunt veritatis et qui, placeat fuga ipsum quas quibusdam aliquid a esse, recusandae dolor corporis incidunt soluta.",
          status: "Pendente",
          severity: "Médio",
          attendant_last_name: "Souza",
          attendant_name: "Lurde",
          attendants: "Pessoa A, B e C",
          student_last_name: "Jânito",
          student_name: "Yohan",
          student: "Yohan Jânito",
        },
      ],
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
          field: "student_last_name",
          label: "Sobrenome estudante",
        },
        {
          field: "student_name",
          label: "Nome estudante",
        },
        {
          field: "student",
          label: "Estudante",
        },
      ],
    };
  },
  methods: {
    editAttendance(attendance) {
      this.$emit("editAttendance", attendance);
    },
    createAttendance() {
      this.$emit("createAttendance");
    },
    deleteAttendance(attendance) {
      const index = this.data.indexOf(attendance);
      this.data.splice(index, 1);
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