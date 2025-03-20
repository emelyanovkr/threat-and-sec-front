<script setup>
import { computed, defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["update:modelValue"]);

// Используем computed для двустороннего связывания
const selected = computed({
  get() {
    return props.modelValue;
  },
  set(newVal) {
    emit("update:modelValue", newVal);
  },
});

// Массив способов реализации угроз
const methods = [
  {
    id: "method1",
    label:
      "использование уязвимостей (уязвимостей кода (программного обеспечения), уязвимостей архитектуры и конфигурации систем и сетей, а также организационных и многофакторных уязвимостей)",
  },
  {
    id: "method2",
    label: "внедрение вредоносного программного обеспечения",
  },
  {
    id: "method3",
    label:
      "использование недекларированных возможностей программного обеспечения и (или) программно-аппаратных средств",
  },
  {
    id: "method4",
    label:
      "установка программных и (или) программно-аппаратных закладок в программное обеспечение и (или) программно-аппаратные средства",
  },
  {
    id: "method5",
    label:
      "формирование и использование скрытых каналов (по времени, по памяти) для передачи конфиденциальных данных",
  },
  {
    id: "method6",
    label:
      "нарушение безопасности при оказании услуг по установке, настройке, испытаниям, пусконаладочным работам (в том числе администрированию, обслуживанию)",
  },
  {
    id: "method7",
    label:
      "ошибочные действия в ходе создания и эксплуатации систем и сетей, в том числе при установке, настройке программных и программно-аппаратных средств",
  },
];
</script>

<template>
  <div>
    <h3>Способы реализации угроз</h3>
    <div v-for="method in methods" :key="method.id" class="form-check my-2">
      <input
        class="form-check-input"
        type="checkbox"
        :id="method.id"
        :value="method.id"
        v-model="selected"
      />
      <label class="form-check-label" :for="method.id">
        {{ method.label }}
      </label>
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
</style>
