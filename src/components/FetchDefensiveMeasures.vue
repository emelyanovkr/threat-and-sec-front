<script setup>
import { computed, defineProps, defineEmits, ref, onMounted } from "vue";

const props = defineProps({
  modelValue: { type: Object, required: true },
});
const emit = defineEmits(["update:modelValue", "validityChanged"]);

const dataModel = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  },
});

const categoryOptions = [
  { value: "GIS", label: "ГИС" },
  { value: "ISPDN", label: "ИСПДН" },
  { value: "KII", label: "КИИ" },
];

function getLabel(options, val) {
  const found = options.find((o) => o.value === val);
  return found ? found.label : val;
}

async function fetchDefensiveMeasures() {
  let requestData = {};
  const dm = dataModel.value;

  if (dm.category.value === "GIS") {
    requestData = {
      systemCategory: dm.category.value,
      gisScale: dm.gisSystemScale.value,
      gisSignificance: dm.gisSignificance.value,
    };
  } else if (dm.category.value === "ISPDN") {
    requestData = {
      systemCategory: dm.category.value,
      ispdnCategory: dm.ispdnCategory.value,
      ispdnOwnWorker: dm.ispdnOwnWorker.value,
      ispdnSubjectCount: dm.ispdnSubjectCount.value,
      ispdnThreatType: dm.ispdnThreatType.value,
    };
  } else if (dm.category.value === "KII") {
    requestData = {
      systemCategory: dm.category.value,
      kiiSignificanceCategory:
        parseInt(dataModel.value.kiiSignificanceCategory.value) || null,
    };
  }
  console.log("Fetching defensive measures:", requestData);

  try {
    const response = await fetch("/api/defensive-measures", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
    if (!response.ok) {
      throw new Error("ERROR FETCHING DEFENSIVE MEASURES");
    }

    const { securityClass, basicDefensiveMeasures } = await response.json();

    dataModel.value.securityClass = securityClass;
    dataModel.value.basicDefensiveMeasures = basicDefensiveMeasures;

    console.log("Fetched defensive measures: ", basicDefensiveMeasures);
    console.log("Fetched Security Class: ", securityClass);

    dm.defensiveMeasures = basicDefensiveMeasures;
  } catch (error) {
    console.error("ERROR WHILE FETCHING DEFENSIVE MEASURES:", error);
  }
}

function removeDefensiveMeasure(id) {
  dataModel.value.defensiveMeasures = dataModel.value.defensiveMeasures.filter(
    (measure) => measure.id !== id
  );
}

const showDetailsModal = ref(false);
const detailsDescription = ref("");
const detailsKey = ref("");

function openDetails(measure) {
  detailsKey.value = measure.key;
  detailsDescription.value = measure.description;
  showDetailsModal.value = true;
}

function closeDetails() {
  showDetailsModal.value = false;
}

async function fetchSecurityTools() {
  const ids = dataModel.value.defensiveMeasures.map((measure) => measure.id);
  console.log("Requesting security tools for ids:", ids);

  try {
    const response = await fetch("/api/security-tools", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ids),
    });

    if (!response.ok) {
      throw new Error("ERROR FETCHING SECURITY TOOLS");
    }

    dataModel.value.securityTools = await response.json();
    console.log("Received security tools:", dataModel.value.securityTools);
  } catch (error) {
    console.error("ERROR FETCHING SECURITY TOOLS:", error);
  }
}

onMounted(() => {
  fetchDefensiveMeasures();
});
</script>

<template>
  <div v-if="dataModel.defensiveMeasures.length">
    <div class="d-flex justify-content-between align-items-center mb-1">
      <h3>Базовые меры защиты</h3>
      <div class="d-flex align-items-center gap-4">
        <div>
          <strong>Категория ИС:</strong>
          {{ getLabel(categoryOptions, dataModel.category.value) }}
        </div>
        <div>
          <strong v-if="dataModel.category.value === 'GIS'"
            >Класс защищенности:</strong
          >
          <strong v-else-if="dataModel.category.value === 'ISPDN'"
            >Уровень защищенности:</strong
          >
          <strong v-else-if="dataModel.category.value === 'KII'"
            >Категория значимости:</strong
          >
          {{ dataModel.securityClass }}
        </div>
      </div>
    </div>
    <div
      v-for="measure in dataModel.defensiveMeasures"
      :key="measure.id"
      class="card mb-2"
    >
      <div class="defensive-card">
        <h5 class="mb-0">{{ measure.key }}</h5>
      </div>
      <div class="card-body">
        {{ measure.name }}
        <div class="text-end">
          <button class="details-btn me-2" @click="openDetails(measure)">
            Детали
          </button>
          <button
            class="delete-btn"
            @click="removeDefensiveMeasure(measure.id)"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>

    <div class="mt-2">
      <button class="confirm-defensive-btn" @click="fetchSecurityTools">
        Подтвердить средства защиты
      </button>
    </div>

    <div v-if="dataModel.securityTools.length" class="mt-2">
      <h4>Средства защиты по адаптированным мерам</h4>
      <div
        v-for="toolGroup in dataModel.securityTools"
        :key="toolGroup.key.id"
        class="card mb-2"
      >
        <div class="defensive-card">
          <strong>{{ toolGroup.key.key }}</strong>
          <small class="d-block">{{ toolGroup.key.name }}</small>
        </div>
        <div class="card-body">
          <ul>
            <li v-for="tool in toolGroup.value" :key="tool.id">
              {{ tool.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="showDetailsModal"
    style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1040;
    "
  >
    <div
      class="modal-backdrop show"
      style="position: absolute; top: 0; left: 0; width: 100%; height: 100%"
    ></div>
    <div
      class="modal show"
      style="display: block; position: fixed; z-index: 1050"
      tabindex="-1"
      role="dialog"
    >
      <div class="modal-dialog" role="document" style="max-width: 85%">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ detailsKey }}</h5>
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              @click="closeDetails"
            ></button>
          </div>
          <div class="modal-body">
            <p>{{ detailsDescription }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "bootstrap";

.btn-main-style {
  @extend .btn;

  border-radius: 0.25rem;
  border-color: #a11919;
  background-color: #a11919;
  color: white;

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

.confirm-btn {
  @extend .btn-primary;
  @extend .btn-main-style;
}

.defensive-card {
  @extend .card-header;
  @extend .d-flex;
  align-items: center;
  text-align: end;
  justify-content: space-between;

  background-color: rgba(1, 85, 81, 0.9);
  border-color: rgba(1, 85, 81, 1);
  color: #fdfbee;
}

.details-btn {
  @extend .btn-sm;
  @extend .btn-main-style;
}

.delete-btn {
  @extend .btn-sm;
  @extend .btn-danger;

  @extend .btn-main-style;
}

.confirm-defensive-btn {
  @extend .btn;

  color: white;
  background-color: rgba(1, 85, 81, 0.9);
  border-color: rgba(1, 85, 81, 0.9);

  &:active {
    color: #ffffff !important;
    background-color: rgba(1, 85, 81, 0.9) !important;
    border-color: rgba(1, 85, 81, 0.9) !important;
  }

  &:hover {
    color: rgba(1, 85, 81, 0.9);
    border-color: rgba(1, 85, 81, 0.9);
    background-color: #ffffff;
  }
}
</style>
