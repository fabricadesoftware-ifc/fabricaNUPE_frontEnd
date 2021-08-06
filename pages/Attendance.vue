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
      />
      <my-attendance v-else-if="personal"> </my-attendance>
      <list-attendance
        v-else
        @personalAttendance="personalAttendance"
        @createAttendance="createAttendance"
        :value="value"
        @editAttendance="editAttendance"
      />
    </div>
  </section>
</template>

<script>
import ListAttendance from "@/components/register/Attendance/ListAttendance";
import MyAttendance from "@/components/register/Attendance/MyAttendance";
import CreateAttendance from "@/components/register/Attendance/CreateAttendance";
import SelectAttendance from "@/components/register/Attendance/SelectAttendance";
export default {
  components: {
    ListAttendance,
    CreateAttendance,
    MyAttendance,
    SelectAttendance,
  },
  data() {
    return {
      editing: false,
      creating: false,
      personal: false,
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