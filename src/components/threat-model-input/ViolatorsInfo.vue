<script setup>
import { ref, watch, onMounted, defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["update:modelValue"]);

const categories = [
  { id: "external", label: "Внешний" },
  { id: "internal_persistent", label: "Внутренний (пост.)" },
  { id: "internal_one_time", label: "Внутренний (раз.)" },
];

const sources = [
  { id: "N1", label: "Н1", title: "нарушитель с базовыми возможностями" },
  {
    id: "N2",
    label: "Н2",
    title: "нарушитель с повыш. базовыми возможностями",
  },
  { id: "N3", label: "Н3", title: "нарушитель со средними возможностями" },
  { id: "N4", label: "Н4", title: "нарушитель с высокими возможностями" },
];

const offenders = ref(props.modelValue.offenders);
const selection = ref([]);

onMounted(async () => {
  // Загружаем нарушителей только один раз
  if (!props.modelValue.isOffendersLoaded) {
    try {
      const resp = await fetch("/api/offenders");
      if (!resp.ok) throw new Error("Ошибка загрузки нарушителей");
      offenders.value = await resp.json();

      emit("update:modelValue", {
        ...props.modelValue,
        offenders: offenders.value,
        isOffendersLoaded: true,
      });
    } catch (e) {
      console.error(e);
    }
  }

  selection.value = offenders.value.map((off) => {
    const saved = props.modelValue.offendersInfo.find((i) => i.id === off.id);
    return saved ? saved.categoryId || saved.sourceId || null : null;
  });
});

watch(
  selection,
  (newSel) => {
    const attackersInfo = offenders.value.map((off, idx) => {
      const choice = newSel[idx];
      return {
        id: off.id,
        name: off.name,
        categoryId: categories.some((c) => c.id === choice) ? choice : null,
        sourceId: sources.some((s) => s.id === choice) ? choice : null,
      };
    });

    emit("update:modelValue", {
      ...props.modelValue,
      offendersInfo: attackersInfo,
    });
  },
  { deep: true }
);
</script>

<template>
  <h3 class="mb-0">Нарушители</h3>

  <div class="intruders-table-container">
    <table class="table align-middle">
      <thead>
        <tr>
          <th></th>
          <th v-for="cat in categories" :key="cat.id" class="text-center">
            {{ cat.label }}
          </th>
          <th class="gap-cell"></th>
          <th v-for="src in sources" :key="src.id" class="text-center">
            {{ src.label }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(off, i) in offenders" :key="off.id">
          <td>{{ off.name }}</td>

          <!-- категории -->
          <td
            v-for="cat in categories"
            :key="cat.id + '-' + i"
            class="text-center"
          >
            <input
              class="form-check-input"
              type="radio"
              :name="'intruder-' + i"
              :value="cat.id"
              v-model="selection[i]"
            />
          </td>

          <td class="gap-cell"></td>

          <!-- источники -->
          <td
            v-for="src in sources"
            :key="src.id + '-' + i"
            class="text-center"
          >
            <input
              class="form-check-input"
              type="radio"
              :name="'intruder-' + i"
              :value="src.id"
              v-model="selection[i]"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  border-collapse: separate;
  border-spacing: 0;
}
th,
td {
  border: none !important;
}
.gap-cell {
  width: 20px;
}
.form-check-input[type="radio"]:checked {
  background-color: #a11919;
  border-color: #a11919;
}
.form-check-input[type="radio"]:focus {
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(161, 25, 25, 0.25);
}
</style>
