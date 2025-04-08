<script setup>
import { computed, ref, watch } from "vue";
import StepIndicator from "@/components/StepIndicator.vue";
import SystemsNetworksTable from "@/components/threat-model-input/SystemsNetworksTable.vue";
import GeneralInformation from "@/components/threat-model-input/GeneralInformation.vue";
import InfluenceObjects from "@/components/threat-model-input/InfluenceObjects.vue";
import RisksAndConsequences from "@/components/threat-model-input/RisksAndConsequences.vue";
import ViolatorsInfo from "@/components/threat-model-input/ViolatorsInfo.vue";
import ThreatsExecutionMethods from "@/components/threat-model-input/ThreatsExecutionMethods.vue";
import ActualThreats from "@/components/threat-model-input/ActualThreats.vue";
import TacticTechnic from "@/components/threat-model-input/TacticTechnic.vue";

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
];

const currentStep = ref(0);

const formData = ref({
  generalInformation: {
    customerName: "",
    category: "",
    significance: "",
    systemScale: "",
    pdnCategory: "",
    ownWorker: "",
    subjectCount: "",
    threatType: "",
    kiiLevel: "",
    kiiSignificanceArea: "",
    kiiCategoryPick: "",
    kiiCategoryResult: "",
    defensiveMeasures: [],
    isConfirmed: false,
  },
  systemData: [],
  influenceObjects: [],
  risksAndConsequences: [],
  attackersInfo: [],
  threatsExecution: [],
  actualThreats: [],
  tacticsAndTechniquesSelection: {},
  tacticsData: [],
});

const showErrorMessage = ref(false);
const nextDisabled = ref(false);

const isGeneralInfoValid = computed(() => {
  const info = formData.value.generalInformation;

  if (!info.customerName.trim() || !info.category.trim()) {
    return false;
  }

  switch (info.category) {
    case "GIS":
      return info.significance.trim() !== "" && info.systemScale.trim() !== "";
    case "ISPDN":
      return (
        info.pdnCategory.trim() !== "" &&
        info.ownWorker.trim() !== "" &&
        info.subjectCount.trim() !== "" &&
        info.threatType.trim() !== ""
      );
    case "KII":
      return (
        info.kiiLevel.trim() !== "" &&
        info.kiiSignificanceArea.trim() !== "" &&
        info.kiiCategoryPick.trim() !== ""
      );
    default:
      return false;
  }
});

watch(isGeneralInfoValid, (newVal) => {
  if (newVal) {
    nextDisabled.value = false;
    showErrorMessage.value = false;
  }
});

function nextStep() {
  if (currentStep.value === 0 && !isGeneralInfoValid.value) {
    showErrorMessage.value = true;
    nextDisabled.value = true;
    return;
  }
  const general = formData.value.generalInformation;
  console.log("Selected category:", general.category);

  switch (general.category) {
    case "ГИС":
      console.log("GIS Significance:", general.significance);
      console.log("System Scale:", general.systemScale);
      break;
    case "ИСПДН":
      console.log("PDN Category:", general.pdnCategory);
      console.log("Own Worker:", general.ownWorker);
      console.log("Subject Count:", general.subjectCount);
      console.log("Threat Type:", general.threatType);
      break;
    case "КИИ":
      console.log("KII Level:", general.kiiLevel);
      console.log("Selected Significance (Branch):", general.kiiCategoryPick);
      break;
    default:
      break;
  }

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
              <SystemsNetworksTable v-model="formData.systemData" />
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
              <ViolatorsInfo v-model="formData.attackersInfo" />
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
