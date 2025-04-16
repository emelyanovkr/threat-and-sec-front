<script setup>
import { computed, defineProps, onMounted, inject } from "vue";

defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      riskData: [],
      isRiskDataLoaded: false,
    }),
  },
});

const formData = inject("formData");

const riskData = computed({
  get: () => formData.value.risksAndConsequences.riskData,
  set: (val) => {
    formData.value.risksAndConsequences.riskData = val;
  },
});

const isRiskDataLoaded = computed({
  get: () => formData.value.risksAndConsequences.isRiskDataLoaded,
  set: (val) => {
    formData.value.risksAndConsequences.isRiskDataLoaded = val;
  },
});

const fetchRisksAndConsequences = async () => {
  if (!isRiskDataLoaded.value) {
    try {
      const url = `/api/risks-consequences?systemCategory=${formData.value.generalInformation.category}`;
      const response = await fetch(url, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Error fetching risks and consequences");
      }
      const data = await response.json();
      riskData.value = data.map((risk) => ({
        id: risk.id,
        label: risk.riskName,
        selected: false,
        consequences: risk.consequences.map((consequence) => ({
          text: consequence.title,
          checked: false,
        })),
      }));
      isRiskDataLoaded.value = true;
    } catch (error) {
      console.error("Error:", error);
    }
  }
};

onMounted(() => {
  fetchRisksAndConsequences();
});

const selectedRiskCategories = computed(() => {
  return riskData.value.filter((risk) => risk.selected);
});
</script>

<template>
  <div>
    <h3>Выберите виды риска</h3>
    <div class="risk-container">
      <div v-for="risk in riskData" :key="risk.id" class="risk-item">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            :id="risk.id"
            v-model="risk.selected"
          />
          <label class="form-check-label" :for="risk.id"
            >У{{ risk.id }}: {{ risk.label }}</label
          >
        </div>
      </div>
    </div>
    <div class="consequences-container">
      <div
        v-for="risk in selectedRiskCategories"
        :key="risk.id + '-consequences'"
        class="consequences-item"
      >
        <h5>У{{ risk.id }}: {{ risk.label }}: Негативные последствия</h5>
        <div
          v-for="(consequence, cIndex) in risk.consequences"
          :key="risk.id + '-' + cIndex"
          class="form-check"
        >
          <input
            class="form-check-input"
            type="checkbox"
            :id="risk.id + '-' + cIndex"
            v-model="consequence.checked"
          />
          <label class="form-check-label" :for="risk.id + '-' + cIndex">
            {{ consequence.text }}
          </label>
        </div>
      </div>
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

.risk-container {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.risk-item {
  flex: 1;
  min-width: 200px;
}

.consequences-container {
  margin-top: 1rem;
}

.consequences-item {
  margin-bottom: 1.5rem;
}
</style>
