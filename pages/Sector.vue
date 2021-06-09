<template>
  <section class="section is-main-section">
    <div class="is-vcentered">
      <select-sector v-if="editing" :sector="currentSector" />
      <list-sector v-else @editSector="editSector" />
    </div>
  </section>
</template>

<script>
import ListSector from "@/components/register/Sector/ListSector";
import CreateSector from "@/components/register/Sector/CreateSector";
import SelectSector from "@/components/register/Sector/SelectSector";
export default {
  components: { ListSector, CreateSector, SelectSector },
  auth: false,
  data() {
    return {
      editing: false,
      currentSector: {},
    };
  },
  methods: {
    editSector(sector) {
      this.editing = true;
      this.currentSector = sector;
    },
  },
};
</script>
<style>
</style>