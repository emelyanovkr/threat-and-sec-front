<script setup>
import { computed, defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      customerName: "",
      category: "",
      significance: "",
      systemScale: "",
    }),
  },
});

const emit = defineEmits(["update:modelValue"]);
const dataModel = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  },
});
</script>

<template>
  <div>
    <h3>Ввод общей информации</h3>

    <div class="form-floating mb-2">
      <input
        type="text"
        class="form-control"
        id="customerName"
        placeholder="Введите название компании"
        v-model="dataModel.customerName"
      />
      <label for="customerName">Название компании (заказчика)</label>
    </div>
    <div class="form-text mb-3">Например, ООО "Гарант" или ИП Иванов И. И.</div>

    <div class="mb-3">
      <label for="category" class="form-label">Категория объекта</label>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="category"
          id="categoryGIS"
          value="ГИС"
          v-model="dataModel.category"
        />
        <label class="form-check-label" for="categoryGIS">ГИС</label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="category"
          id="categoryKII"
          value="КИИ"
          v-model="dataModel.category"
        />
        <label class="form-check-label" for="categoryKII">КИИ</label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="category"
          id="categoryISPDN"
          value="ИСПДН"
          v-model="dataModel.category"
        />
        <label class="form-check-label" for="categoryISPDN">ИСПДН</label>
      </div>
    </div>

    <h4 class="mb-0">Класс защищенности</h4>
    <div class="mb-3">
      <label class="form-label">Уровень значимости информации</label>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="significance"
          id="significanceHigh"
          value="высокий"
          v-model="dataModel.significance"
        />
        <label class="form-check-label" for="significanceHigh">Высокий</label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="significance"
          id="significanceMedium"
          value="средний"
          v-model="dataModel.significance"
        />
        <label class="form-check-label" for="significanceMedium">Средний</label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="significance"
          id="significanceLow"
          value="низкий"
          v-model="dataModel.significance"
        />
        <label class="form-check-label" for="significanceLow">Низкий</label>
      </div>
    </div>

    <div class="mb-3">
      <label class="form-label">Масштаб системы</label>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="systemScale"
          id="scaleFederal"
          value="федеральный"
          v-model="dataModel.systemScale"
        />
        <label class="form-check-label" for="scaleFederal">Федеральный</label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="systemScale"
          id="scaleRegional"
          value="региональный"
          v-model="dataModel.systemScale"
        />
        <label class="form-check-label" for="scaleRegional">Региональный</label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="systemScale"
          id="scaleObject"
          value="объектовый"
          v-model="dataModel.systemScale"
        />
        <label class="form-check-label" for="scaleObject">Объектовый</label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-control {
  border-color: #c80036;
  &:focus {
    border-color: #a11919;
    box-shadow: none;
  }
}

.form-check-input[type="radio"]:checked {
  background-color: #a11919;
  border-color: #a11919;
}

.form-check-input[type="radio"]:focus {
  outline: none;
  box-shadow: 0 0 0 1px rgba(161, 25, 25, 0.25);
}
</style>
