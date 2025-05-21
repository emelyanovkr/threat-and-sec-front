<script setup>
import {
  ref,
  onMounted,
  watch,
  inject,
  defineProps,
  defineEmits,
  computed,
} from "vue";

const formData = inject("formData");

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["update:modelValue", "update:actualThreats"]);

const offenders = ref([]);
const selection = ref([]);
const locked = ref(false);

onMounted(async () => {
  if (!props.modelValue.isOffendersLoaded) {
    const resp = await fetch("/api/offenders");
    offenders.value = await resp.json();
    emit("update:modelValue", {
      ...props.modelValue,
      offenders: offenders.value,
      isOffendersLoaded: true,
    });
  } else {
    offenders.value = props.modelValue.offenders;
  }
  selection.value = props.modelValue.offendersInfo || [];
});

watch(
  selection,
  (ids) => {
    emit("update:modelValue", {
      ...props.modelValue,
      offendersInfo: ids,
    });
  },
  { deep: true }
);

async function fetchRelevantThreats() {
  const body = {
    influenceObjects: formData.value.influenceObjects
      .filter((item) => item.applies)
      .map((item) => item.label),
    chosenOffendersIds: [...selection.value],
  };
  try {
    const response = await fetch("/api/relevant-threats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error("Ошибка получения данных с сервера");
    }
    const actualThreats = await response.json();
    emit("update:actualThreats", actualThreats);
  } catch (error) {
    console.error("Ошибка сохранения объектов воздействия:", error);
  }
}

function resetAll() {
  selection.value = [];
  emit("update:modelValue", {
    ...props.modelValue,
    offendersInfo: [],
  });
}

const actionButtonText = computed(() =>
  locked.value ? "Редактировать" : "Сохранить"
);

function handleSave() {
  if (!locked.value) {
    fetchRelevantThreats();
  }
  locked.value = !locked.value;
}
</script>

<template>
  <h3 class="mb-2">Нарушители</h3>
  <div class="violators-list">
    <div v-for="off in offenders" :key="off.id" class="form-check mb-1">
      <input
        class="form-check-input"
        type="checkbox"
        :id="`violator-${off.id}`"
        :value="off.id"
        v-model="selection"
        :disabled="locked"
      />
      <label class="form-check-label" :for="`violator-${off.id}`">
        {{ off.name }}
        <i
          class="align-middle bi bi-question-circle ms-1"
          style="cursor: help"
          :title="`${off.category} - ${off.powerLevelName}`"
        ></i>
      </label>
    </div>
  </div>

  <div class="d-flex justify-content-start gap-2 mt-3">
    <button class="btn btn-secondary" @click="resetAll">Сбросить выбор</button>
    <button class="save-btn" @click="handleSave">
      {{ actionButtonText }}
    </button>
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
    border-color: #a11919;
  }
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
