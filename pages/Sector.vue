<template>
  <section class="section is-main-section">
    <div class="is-vcentered">
      <select-sector
        v-if="editing"
        :sector="currentSector"
        @cancelEdit="cancelEdit"
      />
      <create-sector
        v-else-if="creating"
        @createSector="createSector"
      ></create-sector>
      <list-sector
        v-else
        @createSector="createSector"
        :value="value"
        @editSector="editSector"
      />
    </div>
  </section>
</template>

<script>
import ListSector from "@/components/register/Sector/ListSector";
import CreateSector from "@/components/register/Sector/CreateSector";
import SelectSector from "@/components/register/Sector/SelectSector";
export default {
  components: { ListSector, CreateSector, SelectSector },
  data() {
    return {
      editing: false,
      currentSector: {},
      creating: false,
      value: "",
    };
  },
  methods: {
    createSector(value) {
      this.creating = value;
    },
    editSector(sector) {
      this.editing = true;
      this.currentSector = sector;
    },
    cancelEdit() {
      this.editing = false;
      this.currentSector = {};
    },
  },
};
</script>
<style>
</style>