<template>
  <section class="section is-main-section">
    <div class="is-vcentered">
      <select-attendance
        v-if="editing"
        @cancelEdit="cancelEdit"
        :attendance="currentAttendance"
      />
      <create-attendance
        v-else-if="creating"
        @createAttendance="createAttendance"
        :value="value"
      />
      <my-attendance
        v-else-if="personal"
        @personalAttendance="personalAttendance"
        :value="value"
      >
      </my-attendance>
      <report-attendance v-else-if="report"></report-attendance>
      <list-attendance
        v-else
        @personalAttendance="personalAttendance"
        @editAttendance="editAttendance"
        @createAttendance="createAttendance"
        :value="value"
      />
    </div>
  </section>
</template>

<script>
import ListAttendance from "@/components/register/Attendance/ListAttendance";
import MyAttendance from "@/components/register/Attendance/MyAttendance";
import ReportAttendance from "@/components/register/Attendance/ReportAttendance";
import CreateAttendance from "@/components/register/Attendance/CreateAttendance";
import SelectAttendance from "@/components/register/Attendance/SelectAttendance";
export default {
  components: {
    ListAttendance,
    CreateAttendance,
    MyAttendance,
    ReportAttendance,
    SelectAttendance,
  },
  data() {
    return {
      editing: false,
      creating: false,
      personal: false,
      report: false,
      currentAttendance: {},
      value: "",
    };
  },
  methods: {
    cancelEdit() {
      this.creating = false;
    },
    personalAttendance(value) {
      this.personal = value;
    },
    createAttendance(value) {
      this.creating = value;
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