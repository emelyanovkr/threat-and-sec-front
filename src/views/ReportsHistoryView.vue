<script setup>
import { ref, onMounted } from "vue";
import Swal from "sweetalert2";

const reports = ref([]);
const loading = ref(false);
const error = ref(null);

const categoryOptions = [
  { value: "GIS", label: "ГИС" },
  { value: "ISPDN", label: "ИСПДН" },
  { value: "KII", label: "КИИ" },
];
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
  { value: "DEFENSE", label: "Значимость для обороны и безопасности" },
];

function getLabel(options, val) {
  const found = options.find((o) => o.value === val);
  return found ? found.label : val;
}

onMounted(async () => {
  loading.value = true;
  try {
    const resp = await fetch("/api/reports-history");
    if (!resp.ok) throw new Error("Ошибка загрузки истории отчетов");
    reports.value = await resp.json();
  } catch (e) {
    console.error(e);
    error.value = e.message;
  } finally {
    loading.value = false;
  }
});

function formatDate(isoString) {
  const dt = new Date(isoString);
  return dt.toLocaleString("ru-RU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

async function downloadReport(reportId) {
  Swal.fire({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    html: `
    <div style="display:flex; align-items:center;">
      <div class="spinner-border" role="status"
           style="margin-right:1rem; color: rgba(1,85,81,0.9); width:2.25rem; height:2.25rem; flex:none;">
        <span class="visually-hidden">Loading...</span>
      </div>
      <span style="font-weight: 500">Скачивание отчета, пожалуйста, подождите</span>
    </div>
  `,
    background: "rgba(255,255,255,0.8)",
  });
  try {
    const resp = await fetch(`/api/download-report?reportId=${reportId}`);
    if (!resp.ok) throw new Error("Ошибка при скачивании");
    const blob = await resp.blob();
    const disp = resp.headers.get("content-disposition") || "";
    const match = disp.match(/filename="(.+)"/);
    const fileName = match ? match[1] : `report_${reportId}.docx`;
    if ("showSaveFilePicker" in window) {
      const handle = await window.showSaveFilePicker({
        suggestedName: fileName,
        types: [
          {
            description: "Word Document",
            accept: {
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                [".docx"],
            },
          },
        ],
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
    } else {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }
    Swal.fire({
      toast: true,
      position: "bottom-end",
      icon: "success",
      title: "Отчет успешно сохранён",
      showConfirmButton: false,
      timer: 3000,
      iconColor: "rgba(1,85,81,0.9)",
    });
  } catch (e) {
    console.error(e);
    Swal.fire({
      toast: true,
      position: "bottom-end",
      icon: "error",
      title: "Ошибка при скачивании отчета. Повторите попытку.",
      showConfirmButton: false,
      timer: 5000,
    });
  }
}

async function deleteReport(reportId, idx) {
  try {
    const resp = await fetch(`/api/delete-report?reportId=${reportId}`, {
      method: "DELETE",
    });
    const ok = resp.ok && (await resp.json());
    if (ok) {
      reports.value.splice(idx, 1);
      Swal.fire({
        toast: true,
        position: "bottom-end",
        icon: "success",
        title: "Отчет успешно удален",
        showConfirmButton: false,
        timer: 3000,
        iconColor: "rgba(1,85,81,0.9)",
      });
    } else {
      throw new Error("Не удалось удалить");
    }
  } catch (e) {
    console.error(e);
    Swal.fire({
      toast: true,
      position: "bottom-end",
      icon: "error",
      title: "Ошибка при удалении отчета",
      showConfirmButton: false,
      timer: 5000,
    });
  }
}
</script>

<template>
  <div class="container my-4">
    <h2 class="mb-3">История отчетов</h2>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-danger" role="status">
        <span class="visually-hidden">Загрузка...</span>
      </div>
    </div>

    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <div v-if="!loading && reports.length === 0" class="text-center text-muted">
      Нет сгенерированных отчетов.
    </div>

    <div class="row">
      <div v-for="rep in reports" :key="rep.id" class="col-md-6 mb-3">
        <div class="card border-danger h-100 position-relative">
          <div class="dropdown position-absolute top-0 end-0 m-2">
            <button
              class="btn btn-sm btn-link text-dark p-0"
              style="font-size: 1.5rem; line-height: 1"
              data-bs-toggle="dropdown"
            >
              <i class="bi bi-three-dots"></i>
            </button>
            <ul class="dropdown-menu">
              <li>
                <a
                  class="dropdown-item"
                  style="cursor: pointer"
                  @click="downloadReport(rep.id)"
                  >Скачать отчет</a
                >
              </li>
              <li>
                <a
                  class="dropdown-item text-danger"
                  style="cursor: pointer"
                  @click="deleteReport(rep.id, idx)"
                  >Удалить отчет</a
                >
              </li>
            </ul>
          </div>
          <div class="card-body d-flex">
            <i class="bi bi-file-earmark-text display-4 text-danger me-3"></i>
            <div>
              <div class="h5 fw-bold mb-1">Отчет #{{ rep.id }}</div>
              <div class="text-muted mb-2">
                Сгенерирован: {{ formatDate(rep.createdAt) }}
              </div>
              <div class="mb-1">
                <strong>Категория системы:</strong>
                {{ getLabel(categoryOptions, rep.systemCategory) }}
              </div>

              <template v-if="rep.systemCategory === 'GIS'">
                <div>
                  <strong>Значимость:</strong>
                  {{ getLabel(gisSignificanceOptions, rep.gisSignificance) }}
                </div>
                <div>
                  <strong>Масштаб:</strong>
                  {{ getLabel(gisScaleOptions, rep.gisScale) }}
                </div>
              </template>
              <template v-else-if="rep.systemCategory === 'ISPDN'">
                <div>
                  <strong>Категория ПДн:</strong>
                  {{ getLabel(ispdnCategoryOptions, rep.ispdnCategory) }}
                </div>
                <div>
                  <strong>Собственный работник:</strong>
                  {{ getLabel(ispdnOwnWorkerOptions, rep.ispdnOwnWorker) }}
                </div>
                <div>
                  <strong>Кол-во субъектов:</strong>
                  {{
                    getLabel(ispdnSubjectCountOptions, rep.ispdnSubjectsCount)
                  }}
                </div>
                <div>
                  <strong>Тип угроз:</strong>
                  {{ getLabel(ispdnThreatTypeOptions, rep.ispdnThreatType) }}
                </div>
              </template>
              <template v-else-if="rep.systemCategory === 'KII'">
                <div>
                  <strong>Уровень КИИ:</strong>
                  {{ getLabel(kiiLevelOptions, rep.kiiLevel) }}
                </div>
                <div>
                  <strong>Значимость:</strong>
                  {{
                    getLabel(kiiSignificanceOptions, rep.kiiSignificanceArea)
                  }}
                </div>
                <div>
                  <strong>Итоговая категория:</strong>
                  {{ getLabel(categoryOptions, rep.kiiSignificanceCategory) }}
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border-width: 1px;
}
</style>
