<script setup>
import { computed, defineProps, defineEmits, watch, ref } from "vue";

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
      kiiSignificanceArea: "",
      kiiCategoryPick: "",
      kiiCategoryResult: "",
      defensiveMeasures: [],
      securityTools: [],
      isConfirmed: false,
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
const pdnCategoryOptions = [
  { value: "SPECIAL", label: "Специальные" },
  { value: "BIOMETRICAL", label: "Биометрические" },
  { value: "OTHER", label: "Иные" },
  { value: "SOCIAL", label: "Общественные" },
];

const ownWorkerOptions = [
  { value: "YES", label: "Да" },
  { value: "NO", label: "Нет" },
  { value: "NO_MATTER", label: "Не важно" },
];

const subjectCountOptions = [
  { value: "MORE100", label: "Более 100 тыс." },
  { value: "LESS100", label: "Менее 100 тыс." },
  { value: "ANY", label: "Любое" },
];

const threatTypeOptions = [
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

const significanceTableData = {
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
  const area = dataModel.value.kiiSignificanceArea;
  if (!area) return [];
  return significanceTableData[area] || [];
});

watch(
  () => dataModel.value.kiiCategoryPick,
  (newVal) => {
    if (!newVal) {
      dataModel.value.kiiCategoryResult = "";
      return;
    }
    const [, cat] = newVal.split("-");
    dataModel.value.kiiCategoryResult = cat;
  },
  { immediate: true }
);

watch(
  () => dataModel.value.kiiSignificanceArea,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      dataModel.value.kiiCategoryPick = "";
      dataModel.value.kiiCategoryResult = "";
    }
  }
);

const romanCategory = computed(() => {
  switch (dataModel.value.kiiCategoryResult) {
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
  if (!dm.customerName.trim()) return false;
  switch (dm.category) {
    case "GIS":
      return dm.significance && dm.systemScale;
    case "ISPDN":
      return dm.pdnCategory && dm.ownWorker && dm.subjectCount && dm.threatType;
    case "KII":
      return dm.kiiLevel && dm.kiiSignificanceArea && dm.kiiCategoryPick;
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
async function fetchDefensiveMeasures() {
  let requestData = {};
  const dm = dataModel.value;

  if (dm.category === "GIS") {
    requestData = {
      systemCategory: dm.category,
      gisScale: dm.systemScale,
      gisSignificance: dm.significance,
    };
  } else if (dm.category === "ISPDN") {
    requestData = {
      systemCategory: dm.category,
      pdCategory: dm.pdnCategory,
      ownWorker: dm.ownWorker,
      subjectCount: dm.subjectCount,
      threatType: dm.threatType,
    };
  } else if (dm.category === "KII") {
    requestData = {
      systemCategory: dm.category,
      kiiSecurityClass: parseInt(dataModel.value.kiiCategoryResult) || null,
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

    const measures = await response.json();
    console.log("Fetched defensive measures: ", measures);
    dm.defensiveMeasures = measures;
  } catch (error) {
    console.error("ERROR WHILE FETCHING DEFENSIVE MEASURES:", error);
  }
}

async function confirmForm() {
  if (!isFormValid.value) {
    alert("Форма заполнена некорректно. Проверьте обязательные поля.");
    return;
  }

  dataModel.value.isConfirmed = true;
  await fetchDefensiveMeasures();
}

function removeDefensiveMeasure(id) {
  dataModel.value.defensiveMeasures = dataModel.value.defensiveMeasures.filter(
    (measure) => measure.id !== id
  );
}

function unlockForm() {
  dataModel.value.isConfirmed = false;
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
        v-model="dataModel.category"
        :disabled="dataModel.isConfirmed"
      />
      <label class="form-check-label" :for="'cat-' + cat.value">
        {{ cat.label }}
      </label>
    </div>

    <div v-if="dataModel.category === 'GIS'">
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
          v-model="dataModel.significance"
          :disabled="dataModel.isConfirmed"
        />
        <label class="form-check-label" :for="'gisSignificance-' + opt.value">
          {{ opt.label }}
        </label>
      </div>
      <p class="mb-1 mt-3">Масштаб информационной системы:</p>
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
          v-model="dataModel.systemScale"
          :disabled="dataModel.isConfirmed"
        />
        <label class="form-check-label" :for="'gisScale-' + opt.value">
          {{ opt.label }}
        </label>
      </div>
    </div>

    <div v-else-if="dataModel.category === 'ISPDN'">
      <h5 class="mt-3">ИСПДН</h5>
      <p class="mb-1">Категория ПДн:</p>
      <div
        v-for="opt in pdnCategoryOptions"
        :key="opt.value"
        class="form-check mb-1"
      >
        <input
          class="form-check-input"
          type="radio"
          :id="'pdnCat-' + opt.value"
          name="pdnCategory"
          :value="opt.value"
          v-model="dataModel.pdnCategory"
          :disabled="dataModel.isConfirmed"
        />
        <label class="form-check-label" :for="'pdnCat-' + opt.value">
          {{ opt.label }}
        </label>
      </div>
      <p class="mb-1 mt-3">Собственный работник?</p>
      <div
        v-for="opt in ownWorkerOptions"
        :key="opt.value"
        class="form-check mb-1"
      >
        <input
          class="form-check-input"
          type="radio"
          :id="'ownWorker-' + opt.value"
          name="ownWorker"
          :value="opt.value"
          v-model="dataModel.ownWorker"
          :disabled="dataModel.isConfirmed"
        />
        <label class="form-check-label" :for="'ownWorker-' + opt.value">
          {{ opt.label }}
        </label>
      </div>
      <p class="mb-1 mt-3">Количество субъектов:</p>
      <div
        v-for="opt in subjectCountOptions"
        :key="opt.value"
        class="form-check mb-1"
      >
        <input
          class="form-check-input"
          type="radio"
          :id="'subjectCount-' + opt.value"
          name="subjectCount"
          :value="opt.value"
          v-model="dataModel.subjectCount"
          :disabled="dataModel.isConfirmed"
        />
        <label class="form-check-label" :for="'subjectCount-' + opt.value">
          {{ opt.label }}
        </label>
      </div>
      <p class="mb-1 mt-3">Тип актуальных угроз:</p>
      <div
        v-for="opt in threatTypeOptions"
        :key="opt.value"
        class="form-check mb-1"
      >
        <input
          class="form-check-input"
          type="radio"
          :id="'threatType-' + opt.value"
          name="threatType"
          :value="opt.value"
          v-model="dataModel.threatType"
          :disabled="dataModel.isConfirmed"
        />
        <label class="form-check-label" :for="'threatType-' + opt.value">
          {{ opt.label }}
        </label>
      </div>
    </div>

    <div v-else-if="dataModel.category === 'KII'">
      <h5 class="mt-3">КИИ</h5>
      <p class="mb-1">Критический уровень:</p>
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
          v-model="dataModel.kiiLevel"
          :disabled="dataModel.isConfirmed"
        />
        <label class="form-check-label" :for="'kiiLevel-' + opt.value">
          {{ opt.label }}
        </label>
      </div>
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
          v-model="dataModel.kiiSignificanceArea"
          :disabled="dataModel.isConfirmed"
        />
        <label class="form-check-label" :for="'kiiArea-' + opt.value">
          {{ opt.label }}
        </label>
      </div>
      <div v-if="dataModel.kiiSignificanceArea" class="mt-3">
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
                    :disabled="dataModel.isConfirmed"
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
                    :disabled="dataModel.isConfirmed"
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
                    :disabled="dataModel.isConfirmed"
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

    <div class="mt-3">
      <button
        class="confirm-btn"
        @click="dataModel.isConfirmed ? unlockForm() : confirmForm()"
      >
        {{ dataModel.isConfirmed ? "Редактировать" : "Подтвердить" }}
      </button>
    </div>

    <div v-if="dataModel.defensiveMeasures.length" class="mt-4">
      <h4>Базовые меры защиты</h4>
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
