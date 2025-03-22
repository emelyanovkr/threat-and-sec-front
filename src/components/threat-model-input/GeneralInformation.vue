<script setup>
import { computed, defineProps, defineEmits, watch } from "vue";

/**
 * Входные данные (v-model) - объект со всеми нужными полями.
 * Появились новые поля для ИСПДН (pdnCategory, ownWorker, subjectCount, threatType)
 * и для КИИ (kiiLevel, kiiBranch).
 */
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      customerName: "",
      category: "",
      significance: "",
      systemScale: "",
      pdnCategory: "",
      ownWorker: "",
      subjectCount: "",
      threatType: "",
      kiiLevel: "",
      kiiBranch: "",
    }),
  },
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

const isFormValid = computed(() => {
  const dm = dataModel.value;
  if (!dm.customerName.trim()) {
    return false;
  }
  switch (dm.category) {
    case "ГИС":
      return dm.significance && dm.systemScale;
    case "ИСПДН":
      return dm.pdnCategory && dm.ownWorker && dm.subjectCount && dm.threatType;
    case "КИИ":
      return dm.kiiLevel && dm.kiiBranch;
    default:
      return false;
  }
});

watch(
  isFormValid,
  (newVal) => {
    emit("validityChanged", newVal);
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <h3>Ввод общей информации</h3>

    <!-- Название компании -->
    <div class="form-floating">
      <input
        type="text"
        class="form-control"
        id="customerName"
        placeholder="Введите название компании"
        v-model="dataModel.customerName"
      />
      <label for="customerName">Название компании (заказчика)</label>
    </div>
    <div class="form-text mb-1">Например, ООО "Гарант" или ИП Иванов И. И.</div>

    <!-- Категория объекта (ГИС, ИСПДН, КИИ) -->
    <div class="mb-2">
      <h4>Категория объекта</h4>
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
          id="categoryISPDN"
          value="ИСПДН"
          v-model="dataModel.category"
        />
        <label class="form-check-label" for="categoryISPDN">ИСПДН</label>
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
    </div>

    <!-- Блок ГИС -->
    <div v-if="dataModel.category === 'ГИС'">
      <h5>ГИС</h5>
      <p class="mb-1">Уровень значимости:</p>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="gisSignificance"
          id="gisSignificance1"
          value="первый"
          v-model="dataModel.significance"
        />
        <label class="form-check-label" for="gisSignificance1">
          Первый уровень
        </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="gisSignificance"
          id="gisSignificance2"
          value="второй"
          v-model="dataModel.significance"
        />
        <label class="form-check-label" for="gisSignificance2">
          Второй уровень
        </label>
      </div>
      <div class="form-check mb-3">
        <input
          class="form-check-input"
          type="radio"
          name="gisSignificance"
          id="gisSignificance3"
          value="третий"
          v-model="dataModel.significance"
        />
        <label class="form-check-label" for="gisSignificance3">
          Третий уровень
        </label>
      </div>

      <p class="mb-1">Масштаб информационной системы:</p>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="gisScale"
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
          name="gisScale"
          id="scaleRegional"
          value="региональный"
          v-model="dataModel.systemScale"
        />
        <label class="form-check-label" for="scaleRegional">Региональный</label>
      </div>
      <div class="form-check mb-3">
        <input
          class="form-check-input"
          type="radio"
          name="gisScale"
          id="scaleObject"
          value="объектовый"
          v-model="dataModel.systemScale"
        />
        <label class="form-check-label" for="scaleObject">Объектовый</label>
      </div>
    </div>

    <!-- Блок ИСПДН -->
    <div v-else-if="dataModel.category === 'ИСПДН'">
      <h5>ИСПДН</h5>
      <p class="mb-1">Категория ПДн:</p>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="pdnCategory"
          id="pdnSpecial"
          value="специальные"
          v-model="dataModel.pdnCategory"
        />
        <label class="form-check-label" for="pdnSpecial">Специальные</label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="pdnCategory"
          id="pdnBio"
          value="биометрические"
          v-model="dataModel.pdnCategory"
        />
        <label class="form-check-label" for="pdnBio">Биометрические</label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="pdnCategory"
          id="pdnOther"
          value="иные"
          v-model="dataModel.pdnCategory"
        />
        <label class="form-check-label" for="pdnOther">Иные</label>
      </div>
      <div class="form-check mb-3">
        <input
          class="form-check-input"
          type="radio"
          name="pdnCategory"
          id="pdnPublic"
          value="общественные"
          v-model="dataModel.pdnCategory"
        />
        <label class="form-check-label" for="pdnPublic">Общественные</label>
      </div>

      <p class="mb-1">Собственный работник?</p>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="ownWorker"
          id="ownWorkerYes"
          value="да"
          v-model="dataModel.ownWorker"
        />
        <label class="form-check-label" for="ownWorkerYes">Да</label>
      </div>
      <div class="form-check mb-3">
        <input
          class="form-check-input"
          type="radio"
          name="ownWorker"
          id="ownWorkerNo"
          value="нет"
          v-model="dataModel.ownWorker"
        />
        <label class="form-check-label" for="ownWorkerNo">Нет</label>
      </div>

      <p class="mb-1">Количество субъектов:</p>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="subjectCount"
          id="subjectMore"
          value="более100"
          v-model="dataModel.subjectCount"
        />
        <label class="form-check-label" for="subjectMore">Более 100 тыс.</label>
      </div>
      <div class="form-check mb-3">
        <input
          class="form-check-input"
          type="radio"
          name="subjectCount"
          id="subjectLess"
          value="менее100"
          v-model="dataModel.subjectCount"
        />
        <label class="form-check-label" for="subjectLess">Менее 100 тыс.</label>
      </div>

      <p class="mb-1">Тип актуальных угроз:</p>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="threatType"
          id="threatType1"
          value="1"
          v-model="dataModel.threatType"
        />
        <label class="form-check-label" for="threatType1"
          >1 - минимальный набор угроз</label
        >
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="threatType"
          id="threatType2"
          value="2"
          v-model="dataModel.threatType"
        />
        <label class="form-check-label" for="threatType2"
          >2 - расширенный набор угроз</label
        >
      </div>
      <div class="form-check mb-3">
        <input
          class="form-check-input"
          type="radio"
          name="threatType"
          id="threatType3"
          value="3"
          v-model="dataModel.threatType"
        />
        <label class="form-check-label" for="threatType3"
          >3 - продвинутый набор угроз, учитывающий сложные сценарии атак</label
        >
      </div>
    </div>

    <!-- Блок КИИ -->
    <div v-else-if="dataModel.category === 'КИИ'">
      <h5>КИИ</h5>
      <p class="mb-1">Критический уровень:</p>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="kiiLevel"
          id="kiiLevel1"
          value="уровень1"
          v-model="dataModel.kiiLevel"
        />
        <label class="form-check-label" for="kiiLevel1">Уровень 1</label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="kiiLevel"
          id="kiiLevel2"
          value="уровень2"
          v-model="dataModel.kiiLevel"
        />
        <label class="form-check-label" for="kiiLevel2">Уровень 2</label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="kiiLevel"
          id="kiiLevel3"
          value="уровень3"
          v-model="dataModel.kiiLevel"
        />
        <label class="form-check-label" for="kiiLevel3">Уровень 3</label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="kiiLevel"
          id="kiiLevel4"
          value="уровень4"
          v-model="dataModel.kiiLevel"
        />
        <label class="form-check-label" for="kiiLevel4">Уровень 4</label>
      </div>
      <div class="form-check mb-3">
        <input
          class="form-check-input"
          type="radio"
          name="kiiLevel"
          id="kiiLevel5"
          value="уровень5"
          v-model="dataModel.kiiLevel"
        />
        <label class="form-check-label" for="kiiLevel5">Уровень 5</label>
      </div>

      <p class="mb-1">Отрасль:</p>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="kiiBranch"
          id="kiiBranchEnergy"
          value="энергетика"
          v-model="dataModel.kiiBranch"
        />
        <label class="form-check-label" for="kiiBranchEnergy">Энергетика</label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="kiiBranch"
          id="kiiBranchTransport"
          value="транспорт"
          v-model="dataModel.kiiBranch"
        />
        <label class="form-check-label" for="kiiBranchTransport"
          >Транспорт</label
        >
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="kiiBranch"
          id="kiiBranchComm"
          value="связь"
          v-model="dataModel.kiiBranch"
        />
        <label class="form-check-label" for="kiiBranchComm">Связь</label>
      </div>
      <div class="form-check mb-3">
        <input
          class="form-check-input"
          type="radio"
          name="kiiBranch"
          id="kiiBranchHealth"
          value="здравоохранение"
          v-model="dataModel.kiiBranch"
        />
        <label class="form-check-label" for="kiiBranchHealth"
          >Здравоохранение</label
        >
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
  box-shadow: 0 0 0 0.2rem rgba(161, 25, 25, 0.25);
}
</style>
