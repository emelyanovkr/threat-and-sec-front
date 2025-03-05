<script setup>
import { ref } from "vue";
import StepIndicator from "@/components/StepIndicator.vue";

const steps = [
  "Общая информация",
  "Описание систем и сетей",
  "Объекты воздействия",
  "Риски и последствия",
  "Нарушители",
  "Способы реализации угроз",
  "Актуальные УБИ",
  "Генерация отчета",
];

const currentStep = ref(0);

const formData = ref({
  customerName: "",
  category: "",
  significance: "",
  systemScale: "",
});

function nextStep() {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++;
  }
}

function prevStep() {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
}
</script>

<template>
  <div class="container-fluid my-2">
    <h1 class="page-header">Формирование модели угроз</h1>
    <div class="nav-container">
      <button
        class="nav-buttons"
        @click="prevStep"
        :disabled="currentStep === 0"
      >
        Назад
      </button>
      <StepIndicator :steps="steps" :currentStep="currentStep" />

      <button
        class="nav-buttons"
        @click="nextStep"
        :disabled="currentStep === steps.length - 1"
      >
        Далее
      </button>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-9">
        <div class="card">
          <div class="card-body">
            <div v-if="currentStep === 0">
              <h3>Ввод общей информации</h3>

              <div class="form-floating">
                <input
                  type="text"
                  class="form-control"
                  id="customerName"
                  placeholder="Введите название компании"
                  v-model="formData.customerName"
                />
                <label for="customerName">Название компании (заказчика)</label>
              </div>
              <div class="form-text mb-2">
                Например, ООО "Гарант" или ИП Иванов И. И.
              </div>

              <div class="mb-3">
                <label for="category" class="form-label"
                  >Категория объекта</label
                >
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="category"
                    id="categoryGIS"
                    value="ГИС"
                    v-model="formData.category"
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
                    v-model="formData.category"
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
                    v-model="formData.category"
                  />
                  <label class="form-check-label" for="categoryISPDN"
                    >ИСПДН</label
                  >
                </div>
              </div>

              <h4>Класс защищенности</h4>
              <div class="mb-3">
                <label class="form-label">Уровень значимости информации</label>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="significance"
                    id="significanceHigh"
                    value="высокий"
                    v-model="formData.significance"
                  />
                  <label class="form-check-label" for="significanceHigh"
                    >Высокий</label
                  >
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="significance"
                    id="significanceMedium"
                    value="средний"
                    v-model="formData.significance"
                  />
                  <label class="form-check-label" for="significanceMedium"
                    >Средний</label
                  >
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="significance"
                    id="significanceLow"
                    value="низкий"
                    v-model="formData.significance"
                  />
                  <label class="form-check-label" for="significanceLow"
                    >Низкий</label
                  >
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
                    v-model="formData.systemScale"
                  />
                  <label class="form-check-label" for="scaleFederal"
                    >Федеральный</label
                  >
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="systemScale"
                    id="scaleRegional"
                    value="региональный"
                    v-model="formData.systemScale"
                  />
                  <label class="form-check-label" for="scaleRegional"
                    >Региональный</label
                  >
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="systemScale"
                    id="scaleObject"
                    value="объектовый"
                    v-model="formData.systemScale"
                  />
                  <label class="form-check-label" for="scaleObject"
                    >Объектовый</label
                  >
                </div>
              </div>
            </div>
            <div v-else-if="currentStep === 1">
              <h3>Объекты воздействия</h3>
              <input
                type="text"
                class="form-control"
                placeholder="Введите объекты воздействия"
              />
            </div>
            <div v-else-if="currentStep === 2">
              <h3>Анализ угроз</h3>
              <input
                type="text"
                class="form-control"
                v-model="formData.threatAnalysis"
                placeholder="Опишите угрозы"
              />
            </div>
            <div v-else-if="currentStep === 3">
              <h3>Меры защиты</h3>
              <input
                type="text"
                class="form-control"
                v-model="formData.protectionMeasures"
                placeholder="Введите меры защиты"
              />
            </div>
            <div v-else-if="currentStep === 4">
              <h3>Генерация отчета</h3>
              <p>Отчет будет сгенерирован на основе введенных данных.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~bootstrap/scss/bootstrap";

.page-header {
  text-align: center;
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: 0.25rem;
}

.nav-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 0.5rem;
  width: 85%;
  gap: 2rem;
}

.card {
  border: 1px solid #a11919;

  .form-control:focus {
    border-color: #a11919;
    box-shadow: 0 0 0 0;
  }
}

.nav-buttons {
  @extend .btn;
  @extend .btn-primary;
  display: flex;
  justify-content: space-between;
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

  &:disabled {
    border-color: #9a5757;
    background-color: #9a5757;
  }
}
</style>
