<script setup>
import { defineProps } from "vue";

defineProps({
  steps: {
    type: Array,
    default: () => [],
  },
  currentStep: {
    type: Number,
    default: 0,
  },
});
</script>

<template>
  <div class="step-indicator">
    <div class="steps">
      <div
        v-for="(step, index) in steps"
        :key="index"
        :class="['step', { active: index === currentStep }]"
      >
        {{ step }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.step-indicator {
  margin: 1rem 0;
  display: flex;
  justify-content: center;

  .steps {
    display: flex;
    gap: 0.5rem;

    .step {
      padding: 0.5rem 1rem;
      background-color: #e9ecef;
      border-radius: 0.25rem;
      color: #6c757d;
      font-size: 0.9rem;
      white-space: nowrap;
    }

    .step.active {
      background-color: #a11919;
      color: #fff;
      font-weight: bold;
    }
  }
}
</style>
