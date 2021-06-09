<template>
  <section>
    <div class="column">
      <select-attendance-reason
        v-if="editing"
        :attendanceReason="currentAttendanceReason"
      />
      <list-attendance-reason
        v-else
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
    };
  },
  methods: {
    editAttendanceReason(attendanceReason) {
      this.editing = true;
      this.currentAttendanceReason = attendanceReason;
    },
  },
};
</script>

<style>
</style>