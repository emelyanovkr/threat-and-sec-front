<script setup>
import { ref, computed, watch, defineProps, defineEmits } from "vue";

const defaultRiskCategories = [
  {
    id: "U1",
    label: "У1: Ущерб физическому лицу",
    selected: false,
    consequences: [
      { text: "Угроза жизни или здоровью", checked: false },
      { text: "Унижение достоинства личности", checked: false },
      { text: "Нарушение свободы, личной неприкосновенности", checked: false },
      { text: "Нарушение неприкосновенности частной жизни", checked: false },
      {
        text: "Нарушение личной, семейной тайны, утрата чести и доброго имени",
        checked: false,
      },
      {
        text: "Нарушение тайны переписки, телефонных переговоров, иных сообщений",
        checked: false,
      },
      { text: "Нарушение прав и свобод гражданина", checked: false },
      { text: "Финансовый, иной материальный ущерб", checked: false },
      {
        text: "«Травля» в сети, разглашение персональных данных",
        checked: false,
      },
    ],
  },
  {
    id: "U2",
    label: "У2: Риски юридическому лицу, ИП, хозяйственной деятельности",
    selected: false,
    consequences: [
      { text: "Нарушение законодательства РФ", checked: false },
      { text: "Потеря (хищение) денежных средств", checked: false },
      { text: "Недополучение прибыли", checked: false },
      {
        text: "Незапланированные затраты (штрафы, компенсации)",
        checked: false,
      },
      { text: "Нарушение штатного режима функционирования", checked: false },
      { text: "Нарушение планируемых сделок и соглашений", checked: false },
      { text: "Потеря конкурентного преимущества", checked: false },
      { text: "Утрата доверия", checked: false },
      { text: "Имущественный ущерб", checked: false },
      { text: "Утрата репутации", checked: false },
      { text: "Дискредитация бренда", checked: false },
      { text: "Ограничение доступа к web-ресурсам", checked: false },
      { text: "Выведение из строя web-ресурса", checked: false },
      { text: "Неправомерное копирование ПО", checked: false },
      { text: "Утечка конфиденциальной информации", checked: false },
    ],
  },
  {
    id: "U3",
    label: "У3: Ущерб государству (оборона, безопасность и пр.)",
    selected: false,
    consequences: [
      { text: "Причинение ущерба жизни и здоровью людей", checked: false },
      {
        text: "Нарушение функционирования объектов жизнеобеспечения",
        checked: false,
      },
      { text: "Нарушение транспортной инфраструктуры", checked: false },
      { text: "Нарушение функционирования госорганов", checked: false },
      { text: "Нарушение работы сети связи", checked: false },
      { text: "Нарушение международных договоров РФ", checked: false },
      { text: "Прекращение деятельности организаций", checked: false },
      { text: "Нарушение межгосударственного сотрудничества", checked: false },
      { text: "Ущерб экономике государства", checked: false },
      { text: "Раскрытие государственной тайны", checked: false },
      { text: "Нарушение безопасности государства", checked: false },
      { text: "Утечка конфиденциальной информации", checked: false },
    ],
  },
];

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["update:modelValue"]);

const riskData = ref(
  props.modelValue.length ? props.modelValue : defaultRiskCategories
);

watch(
  riskData,
  (newValue) => {
    emit("update:modelValue", newValue);
  },
  { deep: true }
);

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue.length) {
      riskData.value = newValue;
    }
  },
  { deep: true }
);

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
          <label class="form-check-label" :for="risk.id">{{
            risk.label
          }}</label>
        </div>
      </div>
    </div>
    <div class="consequences-container">
      <div
        v-for="risk in selectedRiskCategories"
        :key="risk.id + '-consequences'"
        class="consequences-item"
      >
        <h5>{{ risk.label }}: Негативные последствия</h5>
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
