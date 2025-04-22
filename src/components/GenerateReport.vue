<script setup>
import { defineProps, ref } from "vue";
import Swal from "sweetalert2";

const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
});

const isDownloading = ref(false);

async function generateReportData() {
  return {
    generalInformation: {
      customerName: props.formData.generalInformation.customerName.value,
      category: props.formData.generalInformation.category.value,
    },
    networkTable: props.formData.networkTable
      .filter((row) => Object.values(row).every((v) => v !== ""))
      .map((row) => ({
        systemName: row.systemName,
        systemPurpose: row.systemPurpose,
        userCategories: row.userCategories,
        systemPriority: row.systemPriority,
        userCount: row.userCount,
        systemPosition: row.systemPosition,
      })),
    influenceObjects: props.formData.influenceObjects
      .filter((item) => item.applies)
      .map((item) => ({
        objectName: item.label,
        applies: item.applies,
      })),
    risksAndConsequences: props.formData.risksAndConsequences.riskData
      .filter((risk) => risk.selected)
      .map((risk) => ({
        riskId: risk.id,
        consequenceIds: risk.consequences
          .filter((consequence) => consequence.checked)
          .map((consequence) => consequence.id),
      })),
    violatorsInformationChosenIds: props.formData.violatorsInfo.offendersInfo
      .filter((att) => att.categoryId || att.sourceId)
      .map((att) => att.id),
    threatsExecutionMethodsIds: props.formData.threatsExecution.map((id) =>
      Number(id)
    ),
    actualChosenThreatsIds: props.formData.actualThreats
      .filter((th) => th.status === "POSSIBLE")
      .map((th) => th.id),
  };
}

async function downloadReport() {
  const reportData = await generateReportData();
  isDownloading.value = true;

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
    const response = await fetch("/api/generate-model-report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reportData),
    });

    if (!response.ok) throw new Error("Server error");

    const blob = await response.blob();
    const disp = response.headers.get("content-disposition") || "";
    const match = disp.match(/filename="(.+)"/);
    const fileName = match ? match[1] : `report_${Date.now()}.docx`;

    // выбор директории и сохранение
    if ("showSaveFilePicker" in window) {
      try {
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
      } catch {
        // если отменено, падаем обратно на fallback
      }
    } else {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
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
  } catch (error) {
    console.error(error);
    Swal.fire({
      toast: true,
      position: "bottom-end",
      icon: "error",
      title: "Ошибка при скачивании отчета. Повторите попытку.",
      showConfirmButton: false,
      timer: 5000,
    });
  } finally {
    isDownloading.value = false;
  }
}
</script>

<template>
  <h3>Генерация отчета</h3>
  <div>
    <div class="d-flex flex-wrap justify-content-between mb-2">
      <div class="mb-2 me-4">
        <strong>Название компании:</strong>
        {{ props.formData.generalInformation.customerName.label }}
      </div>
      <div class="mb-2 me-4">
        <strong>Категория системы:</strong>
        {{ props.formData.generalInformation.category.label }}
      </div>
      <template
        v-if="props.formData.generalInformation.category.value === 'GIS'"
      >
        <div class="mb-2 me-4">
          <strong>Уровень значимости:</strong>
          {{ props.formData.generalInformation.significance.label }}
        </div>
        <div class="mb-2 me-4">
          <strong>Масштаб системы:</strong>
          {{ props.formData.generalInformation.systemScale.label }}
        </div>
      </template>
      <template
        v-else-if="props.formData.generalInformation.category.value === 'ISPDN'"
      >
        <div class="mb-2 me-4">
          <strong>Категория ПДн:</strong>
          {{ props.formData.generalInformation.pdnCategory.label }}
        </div>
        <div class="mb-2 me-4">
          <strong>Собственный работник:</strong>
          {{ props.formData.generalInformation.ownWorker.label }}
        </div>
        <div class="mb-2 me-4">
          <strong>Количество субъектов:</strong>
          {{ props.formData.generalInformation.subjectCount.label }}
        </div>
        <div class="mb-2 me-4">
          <strong>Тип угроз:</strong>
          {{ props.formData.generalInformation.threatType.label }}
        </div>
      </template>
      <template
        v-else-if="props.formData.generalInformation.category.value === 'KII'"
      >
        <div class="mb-2 me-4">
          <strong>Уровень КИИ:</strong>
          {{ props.formData.generalInformation.kiiLevel.label }}
        </div>
        <div class="mb-2 me-4">
          <strong>Выбранная значимость:</strong>
          {{ props.formData.generalInformation.kiiSignificanceArea.label }}
        </div>
        <div class="mb-2 me-4">
          <strong>Итоговая категория:</strong>
          {{ props.formData.generalInformation.kiiCategoryResult.label }}
        </div>
      </template>
    </div>
    <div class="text-center">
      <button
        class="btn-main-style"
        @click="downloadReport"
        :disabled="isDownloading"
      >
        <span>Скачать отчет</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "bootstrap";

.btn-main-style {
  @extend .btn;
  @extend .btn-primary;
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

  &:disabled {
    color: #ffffff;
    border-color: #a11919;
    background-color: #a11919;
    opacity: 0.6;
    cursor: not-allowed;
  }
}
</style>
