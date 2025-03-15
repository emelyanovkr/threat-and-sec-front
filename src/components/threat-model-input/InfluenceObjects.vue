<script setup>
import { ref, computed, watch, defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["update:modelValue"]);

const defaultItems = [
  { label: "Аппаратное обеспечение", applies: false },
  { label: "Сетевое ПО", applies: false },
  { label: "Программное обеспечение", applies: false },
  { label: "Сетевое оборудование", applies: false },
  { label: "Прикладное ПО", applies: false },
  { label: "Среда виртуализации", applies: false },
  { label: "Информационная система", applies: false },
  { label: "Сервер", applies: false },
  { label: "Сетевой узел, сетевой трафик", applies: false },
  {
    label: "Микропрограмма и аппаратное обеспечение BIOS/UEFI",
    applies: false,
  },
  { label: "Мобильное устройство", applies: false },
  { label: "Облачная платформа", applies: false },
  { label: "Система управления базами данных", applies: false },
  { label: "Технологии Big Data (различная больших данных)", applies: false },
];

const items = ref(
  props.modelValue.length ? props.modelValue : [...defaultItems]
);

const locked = ref(false);

const half = computed(() => Math.ceil(items.value.length / 2));
const leftItems = computed(() => items.value.slice(0, half.value));
const rightItems = computed(() => items.value.slice(half.value));

function resetAll() {
  items.value = items.value.map((item) => ({ ...item, applies: false }));
}

function toggleLock() {
  locked.value = !locked.value;
}

const actionButtonText = computed(() =>
  locked.value ? "Редактировать" : "Сохранить"
);

watch(
  items,
  (newValue) => {
    emit("update:modelValue", newValue);
  },
  { deep: true }
);

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue.length) {
      items.value = newValue;
    }
  },
  { deep: true }
);
</script>

<template>
  <h3 class="mb-3">Объекты воздействия</h3>
  <div class="container my-2">
    <div class="row">
      <div class="col-md-6 mb-3">
        <div
          v-for="(item, index) in leftItems"
          :key="index"
          class="form-check form-switch mb-2"
        >
          <input
            class="form-check-input"
            type="checkbox"
            :id="'leftSwitch' + index"
            v-model="item.applies"
            :disabled="locked"
          />
          <label class="form-check-label" :for="'leftSwitch' + index">
            {{ item.label }}
          </label>
        </div>
      </div>

      <div class="col-md-6 mb-3">
        <div
          v-for="(item, index) in rightItems"
          :key="index"
          class="form-check form-switch mb-2"
        >
          <input
            class="form-check-input"
            type="checkbox"
            :id="'rightSwitch' + index"
            v-model="item.applies"
            :disabled="locked"
          />
          <label class="form-check-label" :for="'rightSwitch' + index">
            {{ item.label }}
          </label>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-between">
      <button class="btn btn-secondary" @click="resetAll" :disabled="locked">
        Сбросить выбор
      </button>
      <button class="save-btn" @click="toggleLock">
        {{ actionButtonText }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "bootstrap";

.form-check-input[type="checkbox"] {
  &:checked {
    background-color: #a11919;
    border-color: #a11919;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(161, 25, 25, 0.25);
  }

  &:disabled {
    opacity: 0.5;
  }
}

.form-check-input[type="checkbox"]:focus::before {
  background-color: blue !important;
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
