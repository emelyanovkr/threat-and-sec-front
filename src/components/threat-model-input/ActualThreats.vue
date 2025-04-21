<script setup>
import { computed, defineEmits, defineProps, ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue", "update:tacticsAndTechniques"]);

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
    newVal.forEach((threat) => {
      if (!threat.status) {
        threat.status = "POSSIBLE";
      }
    });
  },
  { deep: true, immediate: true }
);

const possibilityOptions = [
  { value: "POSSIBLE", label: "Возможна" },
  { value: "NOT POSSIBLE", label: "Не возможна" },
];

const locked = ref(false);

const actionButtonText = computed(() =>
  locked.value ? "Редактировать" : "Сохранить"
);

async function fetchTacticsAndTechniques() {
  try {
    const response = await fetch("/api/tactics-techniques", {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Ошибка получения тактик и техник");
    }
    const tacticsData = await response.json();
    const dataCopy = JSON.parse(JSON.stringify(tacticsData));
    emit("update:tacticsAndTechniques", dataCopy);
  } catch (error) {
    console.error("Ошибка при сохранении актуальных угроз:", error);
  }
}

function resetActualThreats() {
  actualThreats.value = actualThreats.value.map((threat) => ({
    ...threat,
    status: "POSSIBLE",
  }));
}

function handleSave() {
  if (!locked.value) {
    fetchTacticsAndTechniques();
  }
  locked.value = !locked.value;
}
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
              :disabled="locked"
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

  <div class="d-flex justify-content-between">
    <button class="btn btn-secondary" @click="resetActualThreats">
      Сбросить выбор
    </button>
    <button class="save-btn" @click="handleSave">
      {{ actionButtonText }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import "~bootstrap/scss/bootstrap";

.form-select:focus {
  border-color: #a11919;
  box-shadow: 0 0 0 0.2rem rgba(161, 25, 25, 0.25);
}

.save-btn {
  @extend .btn;
  @extend .btn-primary;

  border-radius: 0.25rem;
  border-color: #a11919;
  background-color: #a11919;

  &:active {
    color: #ffffff !important;
    background-color: #a11919 !important;
    border-color: #a11919 !important;
  }

  &:hover {
    color: #a11919;
    border-color: #a11919;
    background-color: #ffffff;
  }
}
</style>
