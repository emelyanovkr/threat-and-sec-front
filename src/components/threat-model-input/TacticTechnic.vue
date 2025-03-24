<script setup>
import { computed, defineProps, defineEmits } from "vue";

const props = defineProps({
  threats: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: Object,
    default: () => ({}),
  },
  tacticsData: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue", "update:selection"]);

const selection = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  },
});

const localTacticsData = computed(() => props.tacticsData);

const groupedTactics = computed(() => {
  const groups = {};
  localTacticsData.value.forEach((item) => {
    const tacticId = item.tactic.id;
    if (!groups[tacticId]) {
      groups[tacticId] = {
        tactic: item.tactic,
        techniques: [],
      };
    }
    groups[tacticId].techniques.push(item.technique);
  });
  const arr = Object.values(groups);
  arr.sort((a, b) => a.tactic.id - b.tactic.id);
  arr.forEach((group) => {
    group.techniques.sort((a, b) => a.techniqueNumber - b.techniqueNumber);
  });
  return arr;
});

const filteredThreats = computed(() => {
  return props.threats.filter((threat) => threat.status === "возможна");
});

const sortedThreats = computed(() => {
  return [...filteredThreats.value].sort((a, b) => a.id - b.id);
});

function getSelectedTactics(threatId) {
  const sel = selection.value || {};
  if (!sel[threatId] || !sel[threatId].tactics) return [];
  return groupedTactics.value.filter((group) =>
    sel[threatId].tactics.includes(group.tactic.id)
  );
}

function toggleTactic(threatId, tacticId) {
  const newSelection = { ...selection.value };
  if (!newSelection[threatId]) {
    newSelection[threatId] = { tactics: [], techniques: {} };
  }
  const idx = newSelection[threatId].tactics.indexOf(tacticId);
  if (idx === -1) {
    newSelection[threatId].tactics.push(tacticId);
  } else {
    newSelection[threatId].tactics.splice(idx, 1);
    delete newSelection[threatId].techniques[tacticId];
  }
  selection.value = newSelection;
  emit("update:selection", newSelection);
}

function toggleTechnique(threatId, tacticId, techniqueId) {
  const newSelection = { ...selection.value };
  if (!newSelection[threatId]) {
    newSelection[threatId] = { tactics: [], techniques: {} };
  }
  if (!newSelection[threatId].techniques[tacticId]) {
    newSelection[threatId].techniques[tacticId] = [];
  }
  const arr = newSelection[threatId].techniques[tacticId];
  const idx = arr.indexOf(techniqueId);
  if (idx === -1) {
    arr.push(techniqueId);
  } else {
    arr.splice(idx, 1);
  }
  selection.value = newSelection;
  emit("update:selection", newSelection);
}
</script>

<template>
  <div>
    <h3>Тактики и Техники</h3>
    <div
      v-for="threat in sortedThreats"
      :key="threat.id"
      class="threat-block mb-4"
    >
      <h5>{{ "УБИ." + threat.id + ": " + threat.name }}</h5>
      <div class="d-flex">
        <!-- Колонка для тактик -->
        <div class="tactics-column">
          <h6>Тактики</h6>
          <div
            v-for="group in groupedTactics"
            :key="group.tactic.id"
            class="form-check"
          >
            <input
              class="form-check-input"
              type="checkbox"
              :id="'threat-' + threat.id + '-tactic-' + group.tactic.id"
              :value="group.tactic.id"
              :checked="
                selection[threat.id] &&
                selection[threat.id].tactics.includes(group.tactic.id)
              "
              @change="toggleTactic(threat.id, group.tactic.id)"
            />
            <label
              class="form-check-label"
              :for="'threat-' + threat.id + '-tactic-' + group.tactic.id"
            >
              {{ "Т" + group.tactic.id + ". " + group.tactic.tacticName }}
            </label>
          </div>
        </div>
        <div style="width: 20px"></div>
        <!-- Колонка для техник -->
        <div class="techniques-column">
          <h6>Техники</h6>
          <div
            v-for="group in getSelectedTactics(threat.id)"
            :key="'tech-group-' + threat.id + '-' + group.tactic.id"
            class="mb-2"
          >
            <div
              v-for="tech in group.techniques"
              :key="
                'technique-' + threat.id + '-' + group.tactic.id + '-' + tech.id
              "
              class="form-check"
            >
              <input
                class="form-check-input"
                type="checkbox"
                :id="
                  'threat-' +
                  threat.id +
                  '-tech-' +
                  group.tactic.id +
                  '-' +
                  tech.id
                "
                :value="tech.id"
                :checked="
                  selection[threat.id] &&
                  selection[threat.id].techniques[group.tactic.id] &&
                  selection[threat.id].techniques[group.tactic.id].includes(
                    tech.id
                  )
                "
                @change="toggleTechnique(threat.id, group.tactic.id, tech.id)"
              />
              <label
                class="form-check-label"
                :for="
                  'threat-' +
                  threat.id +
                  '-tech-' +
                  group.tactic.id +
                  '-' +
                  tech.id
                "
              >
                {{
                  "Т" +
                  group.tactic.id +
                  "." +
                  tech.techniqueNumber +
                  ". " +
                  tech.techniqueDescription
                }}
              </label>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  </div>
</template>

<style scoped>
.tactics-column,
.techniques-column {
  flex: 1;
}
.threat-block {
  margin-bottom: 1.5rem;
}

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
