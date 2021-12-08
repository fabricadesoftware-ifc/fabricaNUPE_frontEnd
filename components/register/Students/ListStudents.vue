<template>
  <div>
    <label class="title">TODOS OS ESTUDANTES</label>
    <b-table
      :data="allStudents"
      :columns="columns"
      :sticky-header="true"
    ></b-table>
  </div>
</template>
<script>
export default {
  props: {
    allStudents: {
      type: Array,
      required: true,
    },
  },
  data() {},
};
</script>
