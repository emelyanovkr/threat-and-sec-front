<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";
import Swal from "sweetalert2";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["update:modelValue"]);

const localData = ref(
  props.modelValue.length
    ? props.modelValue
    : [
        {
          id: 1,
          systemName: "",
          systemPurpose: "",
          userCategories: "",
          systemPriority: "",
          userCount: null,
          systemPosition: "",
          locked: false,
        },
      ]
);
let nextId = localData.value.length ? localData.value.length + 1 : 2;

function isRowComplete(row) {
  return (
    row.systemName &&
    row.systemPurpose &&
    row.userCategories &&
    row.systemPriority &&
    row.userCount !== null &&
    row.systemPosition
  );
}

function addRow() {
  localData.value.push({
    id: nextId++,
    systemName: "",
    systemPurpose: "",
    userCategories: "",
    systemPriority: "",
    userCount: null,
    systemPosition: "",
    locked: false,
  });
}

function removeRow(index) {
  localData.value.splice(index, 1);
}

function saveRow(index) {
  const row = localData.value[index];
  if (isRowComplete(row)) {
    row.locked = true;
  } else {
    Swal.fire({
      title: "Ошибка!",
      text: "Пожалуйста, заполните все поля.",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
}

function editRow(index) {
  localData.value[index].locked = false;
}

watch(
  localData,
  (newValue) => {
    emit("update:modelValue", newValue);
  },
  { deep: true }
);
watch(
  () => props.modelValue,
  (newValue) => {
    localData.value = newValue;
  },
  { deep: true }
);
</script>

<template>
  <div>
    <h3>Описание систем и сетей</h3>
    <div class="table-responsive">
      <table class="table table-bordered align-middle">
        <thead>
          <tr>
            <th>Наименование системы</th>
            <th>Назначение</th>
            <th>Категории пользователей</th>
            <th>Критичность сервиса для бизнес-процессов компании</th>
            <th>Количество пользователей</th>
            <th>Расположение системы</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in localData" :key="row.id">
            <td>
              <input
                type="text"
                class="form-control"
                v-model="row.systemName"
                placeholder="Введите наименование"
                :disabled="row.locked"
              />
            </td>
            <td>
              <input
                type="text"
                class="form-control"
                v-model="row.systemPurpose"
                placeholder="Введите назначение системы"
                :disabled="row.locked"
              />
            </td>
            <td>
              <input
                type="text"
                class="form-control"
                v-model="row.userCategories"
                placeholder="Укажите категории пользователей"
                :disabled="row.locked"
              />
            </td>
            <td>
              <select
                class="form-select"
                v-model="row.systemPriority"
                :disabled="row.locked"
              >
                <option disabled value="">Выберите критичность</option>
                <option value="HIGH">Высокая</option>
                <option value="MEDIUM">Средняя</option>
                <option value="MINIMAL">Минимальная</option>
              </select>
            </td>
            <td>
              <input
                type="number"
                class="form-control"
                v-model.number="row.userCount"
                placeholder="Укажите количество"
                :disabled="row.locked"
              />
            </td>
            <td>
              <input
                type="text"
                class="form-control"
                v-model="row.systemPosition"
                placeholder="Введите расположение"
                :disabled="row.locked"
              />
            </td>
            <td>
              <div class="action-container">
                <div
                  v-if="!row.locked"
                  class="bi-check-circle-fill text-success"
                  :class="{ disabled: !isRowComplete(row) }"
                  @click="isRowComplete(row) && saveRow(index)"
                ></div>
                <div
                  v-else
                  class="bi-pencil-fill"
                  @click="editRow(index)"
                ></div>
                <div
                  class="bi-x-circle-fill text-danger"
                  @click="removeRow(index)"
                ></div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="d-flex justify-content-end">
    <button class="add-row-button" @click="addRow">Добавить строку</button>
  </div>
</template>

<style>
.swal2-actions {
  margin-top: 0.15rem !important;
}

.swal2-html-container {
  margin: 0.75rem 0 !important;
  padding: 0 !important;
}

.swal2-confirm {
  color: white;
  background-color: #a11919;

  &:hover {
    color: #a11919 !important;
    border-color: #a11919 !important;
    background-color: #ffffff !important;
  }
}
</style>

<style lang="scss" scoped>
@import "bootstrap";

th {
  text-align: center;
  vertical-align: middle;
}

.action-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 0.5rem;
}

.bi-pencil-fill {
  color: #6e8e59;
}

.bi-check-circle-fill,
.bi-pencil-fill,
.bi-x-circle-fill {
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.bi-check-circle-fill:hover,
.bi-pencil-fill:hover,
.bi-x-circle-fill:hover {
  transform: scale(1.1);
}

.form-select:focus,
.form-control:focus {
  border-color: #a11919;
  box-shadow: none;
}

.delete-button {
  @extend .btn-close;
  width: 0.3rem;
  height: 0.3rem;

  &:focus:active {
    box-shadow: none;
  }
}

.add-row-button {
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
