<template>
  <section class="section is-main-section">
    <div class="is-vcentered">
      <select-attendance v-if="editing" :attendance="currentAttendance" />
      <create-attendance
        @cancelCreateAttendance="cancelCreateAttendance"
        v-else-if="creating"
      />
      <list-attendance
        v-else
        @createAttendance="createAttendance"
        @editAttendance="editAttendance"
      />
    </div>
  </section>
</template>

<script>
import ListAttendance from "@/components/register/Attendance/ListAttendance";
import CreateAttendance from "@/components/register/Attendance/CreateAttendance";
import SelectAttendance from "@/components/register/Attendance/SelectAttendance";
export default {
  components: { ListAttendance, CreateAttendance, SelectAttendance },
  auth: false,
  data() {
    return {
      editing: false,
      creating: false,
      currentAttendance: {},
    };
  },
  methods: {
    cancelCreateAttendance() {
      this.creating = false;
    },
    createAttendance() {
      this.creating = true;
    },
    editAttendance(attendance) {
      this.editing = true;
      this.currentAttendance = attendance;
    },
  },
};
</script>

<style>
</style>