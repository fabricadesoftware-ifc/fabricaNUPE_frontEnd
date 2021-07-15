<template>
  <section>
    <div class="column">
      <select-attendance-reason
        v-if="editing"
        :attendanceReason="currentAttendanceReason"
      />
      <create-attendance-reason
        v-else-if="creating"
        :value="value"
      ></create-attendance-reason>
      <list-attendance-reason
        v-else
        @createAttendaceReason="createAttendaceReason"
        :value="value"
        @editAttendanceReason="editAttendanceReason"
      />
    </div>
  </section>
</template>

<script>
import ListAttendanceReason from "@/components/register/Attendance/ListAttendanceReason";
import CreateAttendanceReason from "@/components/register/Attendance/CreateAttendanceReason";
import SelectAttendanceReason from "@/components/register/Attendance/SelectAttendanceReason";
export default {
  components: {
    ListAttendanceReason,
    CreateAttendanceReason,
    SelectAttendanceReason,
  },
  auth: false,
  data() {
    return {
      editing: false,
      currentAttendanceReason: {},
      creating: false,
      value: "",
    };
  },
  methods: {
    createAttendaceReason(value) {
      this.creating = value;
    },
    editAttendanceReason(attendanceReason) {
      this.editing = true;
      this.currentAttendanceReason = attendanceReason;
    },
  },
};
</script>

<style>
</style>