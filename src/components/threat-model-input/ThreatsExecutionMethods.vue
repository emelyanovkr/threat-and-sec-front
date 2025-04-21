<script setup>
import { ref, watch, onMounted, inject, defineProps, defineEmits } from "vue";

const formData = inject("formData");

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["update:modelValue"]);

const selected = ref([]);

const methodsList = ref([]);
const isLoaded = ref(false);

onMounted(async () => {
  selected.value = Array.isArray(props.modelValue) ? [...props.modelValue] : [];

  if (
    formData.value.isThreatsExecutionMethodsLoaded &&
    Array.isArray(formData.value.threatsExecutionMethodsList)
  ) {
    methodsList.value = formData.value.threatsExecutionMethodsList;
  } else {
    const resp = await fetch("/api/threats-execution");
    const data = await resp.json();
    methodsList.value = data.map((item) => ({
      id: item.id.toString(),
      label: item.name,
    }));

    formData.value.threatsExecutionMethodsList = methodsList.value;
    formData.value.isThreatsExecutionMethodsLoaded = true;
  }

  isLoaded.value = true;
});

watch(
  selected,
  (val) => {
    emit("update:modelValue", val);
  },
  { deep: true }
);
</script>

<template>
  <div>
    <h3>Способы реализации угроз</h3>
    <div v-if="isLoaded">
      <div
        v-for="method in methodsList"
        :key="method.id"
        class="form-check my-2"
      >
        <input
          class="form-check-input"
          type="checkbox"
          :id="method.id"
          :value="method.id"
          v-model="selected"
        />
        <label class="form-check-label" :for="method.id">
          {{ method.label }}
        </label>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<style scoped>
.form-check-input[type="checkbox"]:checked {
  background-color: #a11919;
  border-color: #a11919;
}
.form-check-input[type="checkbox"]:focus {
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(161, 25, 25, 0.25);
  border-color: #a11919;
}
</style>
