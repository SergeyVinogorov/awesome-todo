<template>
  <div
    class="task"
    draggable
    @dragstart="pickupTask($event, taskIndex, columnIndex)"
    @click="openModal(task, columnIndex, taskIndex)"
  >
    <div class="task__title">
      <p class="task__title-name">{{ task.name }}</p>
      <p
        class="task__title--status"
        :class="task.status ? 'task__title--redy' : 'task__title--not-redy'"
      >
        {{ statusPrepare(task.status) }}
      </p>
    </div>
    <p v-if="task.description" class="task__description">
      {{ task.description | crop }}
    </p>
  </div>
</template>

<script>
import { elipseText } from "@/utils";
import movingRepeatedPropsMixin from "@/mixins/movingRepeatedPropsMixin";
export default {
  mixins: [movingRepeatedPropsMixin],

  props: {
    task: {
      type: Object,
      required: true
    },
    taskIndex: {
      type: Number,
      required: true
    }
  },
  filters: {
    crop: function(value) {
      return elipseText(value, 100);
    }
  },
  methods: {
    openModal(task, colIndex, taskIndex) {
      this.openTask(task, colIndex, taskIndex);
    },
    statusPrepare(status) {
      return status ? "Ready" : "Not ready";
    },
    pickupTask(e, taskIndex, fromColumnIndex) {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.dropEffect = "move";

      e.dataTransfer.setData("task-index", taskIndex);
      e.dataTransfer.setData("from-column-index", fromColumnIndex);
    }
  }
};
</script>
