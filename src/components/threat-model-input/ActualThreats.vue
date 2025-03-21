<script setup>
import { computed, defineProps, defineEmits, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);

const actualThreats = computed({
  get() {
    return props.modelValue;
  },
  set(newVal) {
    emit("update:modelValue", newVal);
  },
});

const sortedThreats = computed(() => {
  return [...actualThreats.value].sort((a, b) => a.id - b.id);
});

watch(
  actualThreats,
  (newVal) => {
    for (const threat of newVal) {
      if (!threat.status) {
        threat.status = "возможна";
      }
    }
  },
  { deep: true, immediate: true }
);

const possibilityOptions = [
  { value: "возможна", label: "Возможна" },
  { value: "не возможна", label: "Не возможна" },
];
</script>

<template>
  <h3>Актуальные УБИ</h3>
  <div class="actual-threats-container">
    <table class="table">
      <thead>
        <tr>
          <th>Угроза</th>
          <th>Статус</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="threat in sortedThreats" :key="threat.id">
          <td class="align-middle">
            УБИ.{{ threat.id }}: {{ threat.name }}
            <i
              class="align-middle bi bi-question-circle ms-1"
              style="cursor: help"
              :title="threat.description"
            ></i>
          </td>
          <td class="text-center align-middle">
            <select
              class="form-select"
              style="min-width: 10rem"
              v-model="threat.status"
            >
              <option
                v-for="option in possibilityOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.form-select:focus {
  border-color: #a11919;
  box-shadow: 0 0 0 0.2rem rgba(161, 25, 25, 0.25);
}
</style>
