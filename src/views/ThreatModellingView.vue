<script setup>
import { computed, provide, ref, watch } from "vue";
import StepIndicator from "@/components/StepIndicator.vue";
import SystemsNetworksTable from "@/components/threat-model-input/SystemsNetworksTable.vue";
import GeneralInformation from "@/components/threat-model-input/GeneralInformation.vue";
import InfluenceObjects from "@/components/threat-model-input/InfluenceObjects.vue";
import RisksAndConsequences from "@/components/threat-model-input/RisksAndConsequences.vue";
import ViolatorsInfo from "@/components/threat-model-input/ViolatorsInfo.vue";
import ThreatsExecutionMethods from "@/components/threat-model-input/ThreatsExecutionMethods.vue";
import ActualThreats from "@/components/threat-model-input/ActualThreats.vue";
import TacticTechnic from "@/components/threat-model-input/TacticTechnic.vue";
import GenerateReport from "@/components/GenerateReport.vue";

const steps = [
  "Общая информация",
  "Описание систем и сетей",
  "Объекты воздействия",
  "Риски и последствия",
  "Нарушители",
  "Способы реализации угроз",
  "Актуальные УБИ",
  "Тактики и техники",
  "Генерация отчета",
  "Подбор СЗИ",
];

const currentStep = ref(0);

const formData = ref({
  generalInformation: {
    customerName: { value: "", label: "" },
    category: { value: "", label: "" },
    significance: { value: "", label: "" },
    systemScale: { value: "", label: "" },
    pdnCategory: { value: "", label: "" },
    ownWorker: { value: "", label: "" },
    subjectCount: { value: "", label: "" },
    threatType: { value: "", label: "" },
    kiiLevel: { value: "", label: "" },
    kiiSignificanceArea: { value: "", label: "" },
    kiiCategoryPick: { value: "", label: "" },
    kiiCategoryResult: { value: "", label: "" },
    defensiveMeasures: [],
    securityTools: [],
    isConfirmed: false,
  },
  networkTable: [],
  influenceObjects: [],
  risksAndConsequences: {
    riskData: [],
    isRiskDataLoaded: false,
  },
  violatorsInfo: {
    offenders: [],
    isOffendersLoaded: false,
    offendersInfo: [],
  },
  threatsExecution: [],
  actualThreats: [],
  tacticsAndTechniquesSelection: {},
  tacticsData: [],
});

provide("formData", formData);

const showErrorMessage = ref(false);
const nextDisabled = ref(false);

const isGeneralInfoValid = computed(() => {
  const info = formData.value.generalInformation;
  const pickVal = info.kiiCategoryPick?.value ?? info.kiiCategoryPick;

  // Basic required fields
  if (!info.customerName.value.trim() || !info.category.value.trim()) {
    return false;
  }

  switch (info.category.value) {
    case "GIS":
      return (
        info.significance.value.trim() !== "" &&
        info.systemScale.value.trim() !== ""
      );

    case "ISPDN":
      return (
        info.pdnCategory.value.trim() !== "" &&
        info.ownWorker.value.trim() !== "" &&
        info.subjectCount.value.trim() !== "" &&
        info.threatType.value.trim() !== ""
      );

    case "KII":
      return (
        info.kiiLevel.value.trim() !== "" &&
        info.kiiSignificanceArea.value.trim() !== "" &&
        typeof pickVal === "string" &&
        pickVal.trim() !== ""
      );

    default:
      return false;
  }
});

watch(isGeneralInfoValid, (valid) => {
  nextDisabled.value = !valid;
  if (valid) showErrorMessage.value = false;
});

function nextStep() {
  if (currentStep.value === 0 && !isGeneralInfoValid.value) {
    showErrorMessage.value = true;
    nextDisabled.value = true;
    return;
  }
  if (currentStep.value < steps.length - 1) currentStep.value++;
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

      <button class="nav-buttons" @click="nextStep" :disabled="nextDisabled">
        Далее
      </button>
    </div>
    <div
      v-if="currentStep === 0 && showErrorMessage"
      class="text-center text-danger medium mb-2"
    >
      Необходимо заполнить все обязательные поля.
    </div>

    <div class="row justify-content-center">
      <div class="col-md-9">
        <div class="card">
          <div class="card-body">
            <div v-if="currentStep === 0">
              <GeneralInformation v-model="formData.generalInformation" />
            </div>
            <div v-else-if="currentStep === 1">
              <SystemsNetworksTable v-model="formData.networkTable" />
            </div>
            <div v-else-if="currentStep === 2">
              <InfluenceObjects
                v-model="formData.influenceObjects"
                @update:actualThreats="formData.actualThreats = $event"
              />
            </div>
            <div v-else-if="currentStep === 3">
              <RisksAndConsequences v-model="formData.risksAndConsequences" />
            </div>
            <div v-else-if="currentStep === 4">
              <ViolatorsInfo v-model="formData.violatorsInfo" />
            </div>
            <div v-else-if="currentStep === 5">
              <ThreatsExecutionMethods v-model="formData.threatsExecution" />
            </div>
            <div v-else-if="currentStep === 6">
              <ActualThreats
                v-model="formData.actualThreats"
                @update:tacticsAndTechniques="formData.tacticsData = $event"
              />
            </div>
            <div v-else-if="currentStep === 7">
              <TacticTechnic
                v-model="formData.tacticsAndTechniquesSelection"
                :threats="formData.actualThreats"
                :tactics-data="formData.tacticsData"
              />
            </div>
            <div v-else-if="currentStep === 8">
              <GenerateReport :formData="formData" />
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
  width: 85%;
  gap: 2rem;
  margin: 0 auto 0.25rem;
}

.card {
  border: 1px solid #c80036;
}

.nav-buttons {
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

  &:disabled {
    border-color: #9a5757;
    background-color: #9a5757;
  }
}
</style>
