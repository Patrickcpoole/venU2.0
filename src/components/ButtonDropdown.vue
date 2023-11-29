<script>
export default {
  name: "ButtonDropdown",
  props: {
    dropdownButtons: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentLabel: this.dropdownButtons[0].label,
    };
  },
  methods: {
    sortData(button) {
      this.currentLabel = button.label
      this.$emit("sort", button.value);
    },
  },
}
</script>

<template>
  <q-btn-dropdown color="primary" class="q-mb-md" :label="`Sort by ${currentLabel}`">
    <q-list v-for="(button, index) in dropdownButtons" :key="index">
       <q-item clickable v-close-popup @click="sortData(button)">
          <q-item-section>
            <q-item-label>{{ button.label }}</q-item-label>
          </q-item-section>
       </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<style scoped>

</style>
