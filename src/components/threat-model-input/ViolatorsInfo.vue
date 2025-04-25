<script setup>
import { ref, onMounted, watch, defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["update:modelValue"]);

const offenders = ref([]);
const selection = ref([]);

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
</template>

<style scoped>
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
</style>
