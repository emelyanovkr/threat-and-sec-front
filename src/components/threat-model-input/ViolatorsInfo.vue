<script setup>
import { ref } from "vue";

const intruders = ref([
  "Специальные службы иностранных государств",
  "Террористические, экстремистские группировки",
  "Преступные группы (криминальные структуры)",
  "Отдельные физические лица (хакеры)",
  "Конкурирующие организации",
  "Разработчики программных, программно-аппаратных средств",
  "Лица, обеспечивающие поставку программных, программно-аппаратных средств",
  "Поставщики услуг связи, вычислительных услуг",
  "Лица, привлекаемые для установки, настройки, испытаний",
  "Лица, обеспечивающие функционирование систем и сетей оператора",
  "Авторизованные пользователи систем и сетей",
  "Системные администраторы и администраторы безопасности",
  "Бывшие (уволенные) работники (пользователи)",
]);

const categories = [
  { id: "external", label: "Внешний" },
  { id: "internal_persistent", label: "Внутренний (пост.)" },
  { id: "internal_one_time", label: "Внутренний (раз.)" },
];

const sources = [
  { id: "N1", label: "Н1", title: "Нарушитель с базовыми возможностями" },
  {
    id: "N2",
    label: "Н2",
    title: "Нарушитель с базовыми повышенными возможностями",
  },
  { id: "N3", label: "Н3", title: "Нарушитель со средними возможностями" },
  { id: "N4", label: "Н4", title: "Нарушитель с высокими возможностями" },
];

const selection = ref({});

function selectCategory(intruderIndex, categoryId) {
  if (!selection.value[intruderIndex]) {
    selection.value[intruderIndex] = {};
  }
  selection.value[intruderIndex].categoryId = categoryId;
}

function selectSource(intruderIndex, sourceId) {
  if (!selection.value[intruderIndex]) {
    selection.value[intruderIndex] = {};
  }
  selection.value[intruderIndex].sourceId = sourceId;
}
</script>

<template>
  <h3 class="mb-0">Нарушители</h3>
  <div class="intruders-table-container">
    <table class="table align-middle">
      <thead>
        <tr>
          <th rowspan="2" class="text-center align-middle"></th>
          <th :colspan="categories.length" class="text-center"></th>
          <th class="gap-cell"></th>
          <th :colspan="sources.length" class="text-center"></th>
        </tr>
        <tr>
          <th
            v-for="cat in categories"
            :key="cat.id + '-header'"
            class="text-center"
          >
            {{ cat.label }}
          </th>
          <th class="gap-cell"></th>
          <th
            v-for="src in sources"
            :key="src.id + '-header'"
            class="text-center"
          >
            <span :title="src.title">
              {{ src.label }}
            </span>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(intruder, i) in intruders" :key="i">
          <td>{{ intruder }}</td>

          <td
            v-for="cat in categories"
            :key="cat.id + '-' + i"
            class="text-center"
          >
            <div class="form-check d-flex justify-content-center">
              <input
                class="form-check-input"
                type="radio"
                :name="'category-' + i"
                :value="cat.id"
                :checked="selection[i] && selection[i].categoryId === cat.id"
                @change="selectCategory(i, cat.id)"
              />
            </div>
          </td>

          <td class="gap-cell"></td>

          <td
            v-for="src in sources"
            :key="src.id + '-' + i"
            class="text-center"
          >
            <div class="form-check d-flex justify-content-center">
              <input
                class="form-check-input"
                type="radio"
                :name="'source-' + i"
                :value="src.id"
                :checked="selection[i] && selection[i].sourceId === src.id"
                @change="selectSource(i, src.id)"
              />
            </div>
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
