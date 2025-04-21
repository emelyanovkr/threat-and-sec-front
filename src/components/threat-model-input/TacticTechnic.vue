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

const flattenedData = computed(() => {
  return props.tacticsData.flatMap((tacticItem) => {
    const { tacticId, tacticName, tacticalTask, techniques } = tacticItem;
    return techniques.map((tech) => ({
      tactic: {
        id: tacticId,
        tacticName,
        tacticalTask,
      },
      technique: {
        id: tech.id,
        techniqueDescription: tech.techniqueDescription,
        techniqueNumber: tech.techniqueNumber,
      },
    }));
  });
});

const groupedTactics = computed(() => {
  const groups = {};
  flattenedData.value.forEach((item) => {
    const tid = item.tactic.id;
    if (!groups[tid]) {
      groups[tid] = {
        tactic: item.tactic,
        techniques: [],
      };
    }
    groups[tid].techniques.push(item.technique);
  });
  const arr = Object.values(groups);
  arr.sort((a, b) => a.tactic.id - b.tactic.id);
  arr.forEach((g) => {
    g.techniques.sort((x, y) => x.techniqueNumber - y.techniqueNumber);
  });
  return arr;
});

const filteredThreats = computed(() => {
  return props.threats.filter((t) => t.status === "POSSIBLE");
});

const sortedThreats = computed(() => {
  return [...filteredThreats.value].sort((a, b) => a.id - b.id);
});

function getSelectedTactics(threatId) {
  const sel = selection.value || {};
  if (!sel[threatId] || !sel[threatId].tactics) return [];
  return groupedTactics.value.filter((grp) =>
    sel[threatId].tactics.includes(grp.tactic.id)
  );
}

function toggleTactic(threatId, tacticId) {
  const newSel = { ...selection.value };
  if (!newSel[threatId]) {
    newSel[threatId] = { tactics: [], techniques: {} };
  }
  const idx = newSel[threatId].tactics.indexOf(tacticId);
  if (idx === -1) {
    newSel[threatId].tactics.push(tacticId);
  } else {
    newSel[threatId].tactics.splice(idx, 1);
    delete newSel[threatId].techniques[tacticId];
  }
  selection.value = newSel;
  emit("update:selection", newSel);
}

function toggleTechnique(threatId, tacticId, techniqueId) {
  const newSel = { ...selection.value };
  if (!newSel[threatId]) {
    newSel[threatId] = { tactics: [], techniques: {} };
  }
  if (!newSel[threatId].techniques[tacticId]) {
    newSel[threatId].techniques[tacticId] = [];
  }
  const arr = newSel[threatId].techniques[tacticId];
  const idx = arr.indexOf(techniqueId);
  if (idx === -1) arr.push(techniqueId);
  else arr.splice(idx, 1);
  selection.value = newSel;
  emit("update:selection", newSel);
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
        <!-- Колонка тактик -->
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
              :id="`threat-${threat.id}-tactic-${group.tactic.id}`"
              :checked="
                selection[threat.id] &&
                selection[threat.id].tactics.includes(group.tactic.id)
              "
              @change="toggleTactic(threat.id, group.tactic.id)"
            />
            <label
              class="form-check-label"
              :for="`threat-${threat.id}-tactic-${group.tactic.id}`"
            >
              {{ "T" + group.tactic.id + ". " + group.tactic.tacticName }}
            </label>
          </div>
        </div>
        <div style="width: 20px"></div>
        <div class="techniques-column">
          <h6>Техники</h6>
          <div
            v-for="group in getSelectedTactics(threat.id)"
            :key="`tech-group-${threat.id}-${group.tactic.id}`"
            class="mb-2"
          >
            <div
              v-for="tech in group.techniques"
              :key="`technique-${threat.id}-${group.tactic.id}-${tech.id}`"
              class="form-check"
            >
              <input
                class="form-check-input"
                type="checkbox"
                :id="`threat-${threat.id}-tech-${group.tactic.id}-${tech.id}`"
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
                :for="`threat-${threat.id}-tech-${group.tactic.id}-${tech.id}`"
              >
                {{
                  "T" +
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
