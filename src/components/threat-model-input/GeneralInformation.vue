<script setup>
import { computed, defineProps, defineEmits, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      customerName: { value: "", label: "" },
      category: { value: "", label: "" },
      gisSignificance: { value: "", label: "" },
      gisSystemScale: { value: "", label: "" },
      ispdnCategory: { value: "", label: "" },
      ispdnOwnWorker: { value: "", label: "" },
      ispdnSubjectCount: { value: "", label: "" },
      ispdnThreatType: { value: "", label: "" },
      kiiLevel: { value: "", label: "" },
      kiiSignificanceArea: { value: "", label: "" },
      kiiCategoryPick: { value: "", label: "" },
      kiiSignificanceCategory: { value: "", label: "" },
      defensiveMeasures: [],
      securityTools: [],
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

const categoryOptions = [
  { value: "GIS", label: "ГИС" },
  { value: "ISPDN", label: "ИСПДН" },
  { value: "KII", label: "КИИ" },
];

// ГИС
const gisSignificanceOptions = [
  { value: "FIRST", label: "Первый уровень" },
  { value: "SECOND", label: "Второй уровень" },
  { value: "THIRD", label: "Третий уровень" },
];

const gisScaleOptions = [
  { value: "FEDERAL", label: "Федеральный" },
  { value: "REGIONAL", label: "Региональный" },
  { value: "OBJECT", label: "Объектовый" },
];

// ИСПДН
const ispdnCategoryOptions = [
  { value: "SPECIAL", label: "Специальные" },
  { value: "BIOMETRICAL", label: "Биометрические" },
  { value: "OTHER", label: "Иные" },
  { value: "SOCIAL", label: "Общественные" },
];

const ispdnOwnWorkerOptions = [
  { value: "YES", label: "Да" },
  { value: "NO", label: "Нет" },
];

const ispdnSubjectCountOptions = [
  { value: "MORE100", label: "Более 100 тыс." },
  { value: "LESS100", label: "Менее 100 тыс." },
];

const ispdnThreatTypeOptions = [
  { value: "FIRST", label: "1 - минимальный набор угроз" },
  { value: "SECOND", label: "2 - расширенный набор угроз" },
  { value: "THIRD", label: "3 - сложные сценарии атак" },
];

// КИИ
const kiiLevelOptions = [
  { value: "LEVEL1", label: "Уровень 1" },
  { value: "LEVEL2", label: "Уровень 2" },
  { value: "LEVEL3", label: "Уровень 3" },
  { value: "LEVEL4", label: "Уровень 4" },
  { value: "LEVEL5", label: "Уровень 5" },
];

const kiiSignificanceOptions = [
  { value: "SOCIAL", label: "Социальная значимость" },
  { value: "POLITICAL", label: "Политическая значимость" },
  { value: "ECONOMIC", label: "Экономическая значимость" },
  { value: "ECOLOGICAL", label: "Экологическая значимость" },
  {
    value: "DEFENSE",
    label:
      "Значимость для обеспечения обороны страны, безопасности государства и правопорядка",
  },
];

const kiiSignificanceTableData = {
  SOCIAL: [
    {
      indicator: "Причинение ущерба жизни и здоровью людей (человек)",
      cat3: "более или равно 1, но менее или равно 50",
      cat2: "более 50, но менее или равно 500",
      cat1: "более 500",
    },
    {
      indicator:
        "Прекращение или нарушение функционирования объектов обеспечения жизнедеятельности населения, оцениваемые: a) на территории, на которой возможно нарушение обеспечения жизнедеятельности населения;",
      cat3: "в пределах территории одного муниципального образования (численностью от 2 тыс. человек) или одной внутригородской территории города федерального значения",
      cat2: "выход за пределы территории одного муниципального образования (численностью от 2 тыс. человек) или одной внутригородской территории города федерального значения, но не за пределы территории одного субъекта Российской Федерации или территории города федерального значения",
      cat1: "выход за пределы территории одного субъекта Российской Федерации или территории города федерального значения",
    },
    {
      indicator:
        "б) по количеству людей, условия жизнедеятельности которых могут быть нарушены (тыс. человек)",
      cat3: "более или равно 2, но менее 1000",
      cat2: "более или равно 1000, но менее 5000",
      cat1: "более или равно 5000",
    },
    {
      indicator:
        "Прекращение или нарушение функционирования объектов транспортной инфраструктуры, транспортных средств, в том числе высокоавтоматизированных транспортных средств, оцениваемые: а) на территории, на которой возможно нарушение транспортного сообщения или предоставления транспортных услуг;",
      cat3: "в пределах территории одного муниципального образования (численностью от 2 тыс. человек) или одной внутригородской территории города федерального значения",
      cat2: "выход за пределы территории одного муниципального образования (численностью от 2 тыс. человек) или одной внутригородской территории города федерального значения, но не за пределы территории одного субъекта Российской Федерации или территории города федерального значения",
      cat1: "выход за пределы территории одного субъекта Российской Федерации или территории города федерального значения",
    },
    {
      indicator:
        "б) по количеству людей, для которых могут быть недоступны транспортные услуги (тыс. человек)",
      cat3: "более или равно 2, но менее 1000",
      cat2: "более или равно 1000, но менее 5000",
      cat1: "более или равно 5000",
    },
    {
      indicator:
        "Прекращение или нарушение функционирования сети связи, оцениваемые по количеству абонентов, для которых могут быть недоступны услуги связи (тыс. человек)",
      cat3: "более или равно 2, но менее 1000",
      cat2: "более или равно 1000, но менее 5000",
      cat1: "более или равно 5000",
    },
    {
      indicator:
        "Отсутствие доступа к государственной услуге, оцениваемое:" +
        " а) в максимальном допустимом времени, в течение которого государственная услуга может быть недоступна для получателей такой услуги (часов)",
      cat3: "менее или равно 24, но более 12",
      cat2: "менее или равно 12, но более 6",
      cat1: "менее или равно 6",
    },
    {
      indicator:
        "б) во времени с момента приема запроса о предоставлении государственной услуги органом, предоставляющим государственную услугу, или подведомственной государственному органу организацией, участвующей в предоставлении государственной услуги, в течение которого государственная услуга не может быть оказана (в процентах от времени предоставления услуги, предусмотренного административным регламентом) ",
      cat3: "менее или равно 30",
      cat2: "более 30, но менее или равно 70",
      cat1: "более 70",
    },
  ],
  POLITICAL: [
    {
      indicator:
        "Прекращение или нарушение функционирования государственного органа в части невыполнения возложенной на него функции (полномочия)",
      cat3: "Прекращение или нарушение функционирования органа государственной власти субъекта Российской Федерации или города федерального значения",
      cat2: "Прекращение или нарушение функционирования федерального органа государственной власти",
      cat1: "Прекращение или нарушение функционирования Администрации Президента Российской Федерации, Правительства Российской Федерации, Федерального Собрания Российской Федерации, Совета Безопасности Российской Федерации, Верховного Суда Российской Федерации, Конституционного Суда Российской Федерации",
    },
    {
      indicator:
        "Нарушение условий международного договора Российской Федерации, срыв переговоров или подписания планируемого к заключению международного договора Российской Федерации, оцениваемые по уровню международного договора Российской Федерации",
      cat3: "нарушение условий договора межведомственного характера (срыв переговоров или подписания)",
      cat2: "нарушение условий межправительственного договора (срыв переговоров или подписания)",
      cat1: "нарушение условиймежгосударственного договора (срыв переговоров или подписания)",
    },
  ],
  ECONOMIC: [
    {
      indicator:
        "Возникновение ущерба субъекту критической информационной инфраструктуры, который является государственной корпорацией, государственным унитарным предприятием, государственной компанией, организацией оборонно-промышленного комплекса, стратегическим акционерным обществом, стратегическим предприятием, оцениваемого в снижении уровня дохода (с учетом налога на добавленную стоимость, акцизов и иных обязательных платежей) по всем видам деятельности (процентов от годового объема доходов, усредненного за прошедший 5-летний период)",
      cat3: "более или равно 1, но менее или равно 10",
      cat2: "более 10, но менее или равно 20",
      cat1: "более 20",
    },
    {
      indicator:
        "Возникновение ущерба бюджету Российской Федерации, оцениваемого в снижении выплат (отчислений) в бюджет, осуществляемых субъектом критической информационной инфраструктуры (процентов прогнозируемого годового дохода федерального бюджета, усредненного за планируемый 3-летний период)",
      cat3: "более 0,0003, но менее или равно 0,0006",
      cat2: "более 0,0006, но менее или равно 0,001",
      cat1: "более 0,001",
    },
    {
      indicator:
        "Прекращение или нарушение проведения клиентами операций по осуществлению перевода денежных средств, осуществляемых субъектом критической информационной инфраструктуры, являющимся в соответствии с законодательством Российской Федерации системно значимой кредитной организацией, кредитной организацией, выполняющей функции оператора услуг платежной инфраструктуры системно значимых платежных систем, кредитной организацией, значимой на рынке платежных услуг, оператором услуг платежной инфраструктуры, оказывающим услуги платежной инфраструктуры в рамках системно значимых платежных систем, оцениваемые среднедневным (по отношению к числу календарных дней в году) количеством осуществляемых операций (млн. единиц) (расчет осуществляется по итогам года, а для создаваемых объектов - на основе прогнозных значений)",
      cat3: "менее или равно 70 ",
      cat2: "более 70, но менее или равно 120",
      cat1: "более 120",
    },
    {
      indicator:
        "Прекращение или нарушение проведения операций по исполнению обязательств, осуществляемых субъектом критической информационной инфраструктуры, являющимся центральным контрагентом, среднедневной размер обязательств которого по передаче денежных средств в валюте Российской Федерации по итогам клиринга за последние 12 месяцев (трлн. рублей)",
      cat3: "менее 1 ",
      cat2: "более или равно 1, но менее 10",
      cat1: "более или равно 10",
    },
    {
      indicator:
        "Прекращение или нарушение проведения учетно-расчетных операций, осуществляемых субъектом критической информационной инфраструктуры, являющимся центральным депозитарием и регистратором финансовых транзакций, среднедневное количество ценных бумаг (ISIN) российских эмитентов, которые учитывались на счетах в центральном депозитарии (оцениваемые за последние 12 месяцев в тыс. штук)",
      cat3: "менее 10",
      cat2: "более или равно 10, но менее 25",
      cat1: "более или равно 25",
    },
    {
      indicator:
        "Прекращение или нарушение проведения операций по выплатам, передаче и размещению денежных средств, осуществляемых субъектом критической информационной инфраструктуры, являющимся него суд ар ств енным пенсионным фондом, которые оцениваются суммой пенсионных накоплений и пенсионных резервов негосударственного пенсионного фонда (млрд. рублей)",
      cat3: "более или равно 50, но менее 1000",
      cat2: "более или равно 1000, но менее 2000",
      cat1: "более или равно 2000",
    },
    {
      indicator:
        "Прекращение или нарушение проведения операций по выплатам, перестрахованию, инвестициям, осуществляемых субъектом критической информационной инфраструктуры, являющимся страховой организацией, оцениваемые объемом активов (млрд. рублей)",
      cat3: "более или равно 100, но менее 1500",
      cat2: "более или равно 1500, но менее 5000",
      cat1: "более или равно 5000",
    },
    {
      indicator:
        "Прекращение или нарушение выполнения функций по переводу денежных средств, осуществляемых субъектом критической информационной инфраструктуры, являющимся оператором услуг информационного обмена (некредитной организацией), который оценивается количеством заключенных договоров с кредитными организациями",
      cat3: "более или равно 25, но менее 100",
      cat2: "более или равно 100, но менее 150",
      cat1: "более или равно 150",
    },
  ],
  ECOLOGICAL: [
    {
      indicator:
        "Вредные воздействия на окружающую среду, оцениваемые: a) на территории, на которой окружающая среда может подвергнуться вредным воздействиям;",
      cat3: "в пределах территории одного муниципального образования (численностью от 2 тыс. чел.) или одной внутригородской территории города федерального значения, с выходом вредных воздействий за пределы территории субъекта критической информационной инфраструктуры",
      cat2: "выход за пределы территории одного муниципального образования (численностью от 2 тыс. чел.) или одной внутригородской территории города федерального значения, но не за пределы территории одного субъекта Российской Федерации или территории города федерального значения, с выходом вредных воздействий за пределы территории субъекта критической информационной инфраструктуры",
      cat1: "выход за пределы территории одного субъекта Российской Федерации или территории города федерального значения, с выходом вредных воздействий за пределы территории субъекта критической информационной инфраструктуры",
    },
    {
      indicator:
        "б) по количеству людей, которые могут быть подвержены вредным воздействиям (тыс. человек)",
      cat3: "более или равно 2, но менее 1000",
      cat2: "более или равно 1000, но менее 5000",
      cat1: "более или равно 5000",
    },
  ],
  DEFENSE: [
    {
      indicator:
        "Прекращение или нарушение функционирования (невыполнение установленных показателей) пункта управления (ситуационного центра), оцениваемые в уровне (значимости) пункта управления или ситуационного центра",
      cat3: "Прекращение или нарушение функционирования пункта управления или ситуационного центра органа государственной власти субъекта Российской Федерации или города федерального значения",
      cat2: "Прекращение или нарушение функционирования  пункта управления или ситуационного центра федерального органа государственной власти или государственной корпорации",
      cat1: "Прекращение или нарушение функционирования  пункта управления государством или ситуационного центра Администрации Президента Российской Федерации, Правительства Российской Федерации, Федерального Собрания Российской Федерации, Совета Безопасности Российской Федерации, Верховного Суда Российской Федерации, Конституционного Суда Российской Федерации",
    },
    {
      indicator:
        "Снижение показателей государственного оборонного заказа, выполняемого (обеспечиваемого) субъектом критической информационной инфраструктуры, оцениваемое: a) в снижении объемов продукции (работ,услуг) в заданный период времени (процентов заданного объема продукции);",
      cat3: "более 0, но менее или равно 10",
      cat2: "более 10, но менее или равно 15",
      cat1: "более 15",
    },
    {
      indicator:
        "б) в увеличении времени изготовления единицы продукции с заданным объемом (процентов установленного времени на изготовление единицы продукции)",
      cat3: "более 0, но менее или равно 10",
      cat2: "более 10, но менее или равно 40",
      cat1: "более 40",
    },
    {
      indicator:
        "Прекращение или нарушение функционирования (невыполнение установленных показателей) информационной системы в области обеспечения обороны страны, безопасности государства и правопорядка 6, оцениваемые в максимально допустимом времени, в течение которого информационная система может быть недоступна пользователю (часов)",
      cat3: "менее или равно 4, но более 2",
      cat2: "менее или равно 2, но более 1 ",
      cat1: "менее или равно 1",
    },
  ],
};

const currentSignificanceRows = computed(() => {
  const area = dataModel.value.kiiSignificanceArea.value;
  if (!area) return [];
  return kiiSignificanceTableData[area] || [];
});

watch(
  () => dataModel.value.kiiCategoryPick,
  (newPick) => {
    const raw = typeof newPick === "object" ? newPick.value : newPick;
    if (!raw) {
      dataModel.value.kiiSignificanceCategory = { value: "", label: "" };
      return;
    }
    const [, cat] = raw.split("-");

    let label;
    switch (cat) {
      case "1":
        label = "I"; // Римская цифра
        break;
      case "2":
        label = "II"; // Римская цифра
        break;
      case "3":
        label = "III"; // Римская цифра
        break;
      default:
        label = ""; // Если ничего не выбрано
        break;
    }

    dataModel.value.kiiSignificanceCategory = { value: cat, label: label };
  },
  { immediate: true }
);

watch(
  () => dataModel.value.kiiSignificanceArea,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      dataModel.value.kiiCategoryPick = "";
      dataModel.value.kiiSignificanceCategory = "";
    }
  }
);

const romanCategory = computed(() => {
  switch (dataModel.value.kiiSignificanceCategory.value) {
    case "3":
      return "III";
    case "2":
      return "II";
    case "1":
      return "I";
    default:
      return "";
  }
});

const isFormValid = computed(() => {
  const dm = dataModel.value;
  if (!dm.customerName || !dm.customerName.value.trim()) return false;
  switch (dm.category.value) {
    case "GIS":
      return dm.gisSignificance.value && dm.gisSystemScale.value;
    case "ISPDN":
      return (
        dm.ispdnCategory.value &&
        dm.ispdnOwnWorker.value &&
        dm.ispdnSubjectCount.value &&
        dm.ispdnThreatType.value
      );
    case "KII":
      return (
        dm.kiiLevel.value &&
        dm.kiiSignificanceArea.value &&
        (typeof dm.kiiCategoryPick === "object"
          ? dm.kiiCategoryPick.value
          : dm.kiiCategoryPick)
      );
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

const updateField = (field, selectedOption) => {
  emit("update:modelValue", {
    ...props.modelValue,
    [field]: { value: selectedOption.value, label: selectedOption.label },
  });
};
</script>

<template>
  <div>
    <h3>Ввод общей информации</h3>

    <!-- Название компании -->
    <div class="form-floating mb-2">
      <input
        type="text"
        class="form-control"
        id="customerName"
        placeholder="Введите название компании"
        v-model="dataModel.customerName.value"
        @blur="
          updateField('customerName', {
            value: dataModel.customerName.value,
            label: dataModel.customerName.value,
          })
        "
      />
      <label for="customerName">Название компании (заказчика)</label>
    </div>

    <!-- Категория -->
    <h4>Категория объекта</h4>
    <div
      v-for="cat in categoryOptions"
      :key="cat.value"
      class="form-check mb-1"
    >
      <input
        class="form-check-input"
        type="radio"
        :id="'cat-' + cat.value"
        name="category"
        :value="cat.value"
        v-model="dataModel.category.value"
        @change="updateField('category', cat)"
      />
      <label class="form-check-label" :for="'cat-' + cat.value">{{
        cat.label
      }}</label>
    </div>

    <!-- GIS -->
    <div v-if="dataModel.category.value === 'GIS'">
      <h5 class="mt-3">ГИС</h5>
      <p class="mb-1">Уровень значимости:</p>
      <div
        v-for="opt in gisSignificanceOptions"
        :key="opt.value"
        class="form-check mb-1"
      >
        <input
          class="form-check-input"
          type="radio"
          :id="'gisSignificance-' + opt.value"
          name="gisSignificance"
          :value="opt.value"
          v-model="dataModel.gisSignificance.value"
          @change="updateField('gisSignificance', opt)"
        />
        <label class="form-check-label" :for="'gisSignificance-' + opt.value">{{
          opt.label
        }}</label>
      </div>
      <p class="mb-1 mt-3">Масштаб:</p>
      <div
        v-for="opt in gisScaleOptions"
        :key="opt.value"
        class="form-check mb-1"
      >
        <input
          class="form-check-input"
          type="radio"
          :id="'gisScale-' + opt.value"
          name="gisScale"
          :value="opt.value"
          v-model="dataModel.gisSystemScale.value"
          @change="updateField('gisSystemScale', opt)"
        />
        <label class="form-check-label" :for="'gisScale-' + opt.value">{{
          opt.label
        }}</label>
      </div>
    </div>

    <!-- ISPDN -->
    <div v-else-if="dataModel.category.value === 'ISPDN'">
      <h5 class="mt-3">ИСПДН</h5>
      <!-- PDN Category -->
      <p class="mb-1">Категория ПДн:</p>
      <div
        v-for="opt in ispdnCategoryOptions"
        :key="opt.value"
        class="form-check mb-1"
      >
        <input
          class="form-check-input"
          type="radio"
          :id="'ispdnCat-' + opt.value"
          name="ispdnCategory"
          :value="opt.value"
          v-model="dataModel.ispdnCategory.value"
          @change="updateField('ispdnCategory', opt)"
        />
        <label class="form-check-label" :for="'ispdnCat-' + opt.value">{{
          opt.label
        }}</label>
      </div>
      <!-- Own Worker -->
      <p class="mb-1 mt-3">Собственный работник?</p>
      <div
        v-for="opt in ispdnOwnWorkerOptions"
        :key="opt.value"
        class="form-check mb-1"
      >
        <input
          class="form-check-input"
          type="radio"
          :id="'ispdnOwnWorker-' + opt.value"
          name="ispdnOwnWorker"
          :value="opt.value"
          v-model="dataModel.ispdnOwnWorker.value"
          @change="updateField('ispdnOwnWorker', opt)"
        />
        <label class="form-check-label" :for="'ispdnOwnWorker-' + opt.value">{{
          opt.label
        }}</label>
      </div>
      <!-- Subject Count -->
      <p class="mb-1 mt-3">Количество субъектов:</p>
      <div
        v-for="opt in ispdnSubjectCountOptions"
        :key="opt.value"
        class="form-check mb-1"
      >
        <input
          class="form-check-input"
          type="radio"
          :id="'ispdnSubjectCount-' + opt.value"
          name="ispdnSubjectCount"
          :value="opt.value"
          v-model="dataModel.ispdnSubjectCount.value"
          @change="updateField('ispdnSubjectCount', opt)"
        />
        <label
          class="form-check-label"
          :for="'ispdnSubjectCount-' + opt.value"
          >{{ opt.label }}</label
        >
      </div>
      <!-- Threat Type -->
      <p class="mb-1 mt-3">Тип угроз:</p>
      <div
        v-for="opt in ispdnThreatTypeOptions"
        :key="opt.value"
        class="form-check mb-1"
      >
        <input
          class="form-check-input"
          type="radio"
          :id="'ispdnThreatType-' + opt.value"
          name="ispdnThreatType"
          :value="opt.value"
          v-model="dataModel.ispdnThreatType.value"
          @change="updateField('ispdnThreatType', opt)"
        />
        <label class="form-check-label" :for="'ispdnThreatType-' + opt.value">{{
          opt.label
        }}</label>
      </div>
    </div>

    <!-- KII -->
    <div v-else-if="dataModel.category.value === 'KII'">
      <h5 class="mt-3">КИИ</h5>
      <!-- Level -->
      <p class="mb-1">Уровень:</p>
      <div
        v-for="opt in kiiLevelOptions"
        :key="opt.value"
        class="form-check mb-1"
      >
        <input
          class="form-check-input"
          type="radio"
          :id="'kiiLevel-' + opt.value"
          name="kiiLevel"
          :value="opt.value"
          v-model="dataModel.kiiLevel.value"
          @change="updateField('kiiLevel', opt)"
        />
        <label class="form-check-label" :for="'kiiLevel-' + opt.value">{{
          opt.label
        }}</label>
      </div>
      <!-- Significance Area -->
      <h6>Выбор значимости:</h6>
      <div
        v-for="opt in kiiSignificanceOptions"
        :key="opt.value"
        class="form-check mb-1"
      >
        <input
          class="form-check-input"
          type="radio"
          :id="'kiiArea-' + opt.value"
          name="kiiSignificanceArea"
          :value="opt.value"
          v-model="dataModel.kiiSignificanceArea.value"
          @change="updateField('kiiSignificanceArea', opt)"
        />
        <label class="form-check-label" :for="'kiiArea-' + opt.value">{{
          opt.label
        }}</label>
      </div>
      <div v-if="dataModel.kiiSignificanceArea.value" class="mt-3">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Показатель</th>
              <th>III категория</th>
              <th>II категория</th>
              <th>I категория</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, rowIndex) in currentSignificanceRows"
              :key="rowIndex"
            >
              <td>{{ row.indicator }}</td>
              <td>
                <label class="d-block">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="kiiCategoryPick"
                    :value="rowIndex + '-3'"
                    v-model="dataModel.kiiCategoryPick"
                  />
                  {{ row.cat3 }}
                </label>
              </td>
              <td>
                <label class="d-block">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="kiiCategoryPick"
                    :value="rowIndex + '-2'"
                    v-model="dataModel.kiiCategoryPick"
                  />
                  {{ row.cat2 }}
                </label>
              </td>
              <td>
                <label class="d-block">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="kiiCategoryPick"
                    :value="rowIndex + '-1'"
                    v-model="dataModel.kiiCategoryPick"
                  />
                  {{ row.cat1 }}
                </label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-2" v-if="romanCategory">
        <strong>Итоговая категория:</strong>
        <span class="ms-1">{{ romanCategory }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "bootstrap";

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
</style>
