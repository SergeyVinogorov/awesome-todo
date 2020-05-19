<template>
  <div
    class="column"
    @drop="moveTask($event, column.tasks)"
    @dragover.prevent
    @dragenter.prevent
  >
    <div class="column__title">
      <input
        type="text"
        class="input-title"
        :value="column.name"
        @change="updateColumnProperty($event, columnIndex)"
        @keyup.enter="updateColumnProperty($event, columnIndex)"
      />
      <AppButton type="danger" @click.native="deleteColumn(columnIndex)"
        >Delete</AppButton
      >
    </div>
    <div class="tasks-wrapper">
      <div
        class="task"
        v-for="(task, $taskIndex) of column.tasks"
        :key="$taskIndex"
        draggable
        @dragstart="pickupTask($event, $taskIndex, columnIndex)"
        @click="openModal(task, columnIndex, $taskIndex)"
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
    </div>
    <input
      type="text"
      class="task-add"
      placeholder="+ Enter new task"
      @keyup.enter="createTask($event, column.tasks)"
    />
  </div>
</template>

<script>
import { elipseText } from "../utils";
import AppButton from "@/components/AppButton";

export default {
  props: {
    column: {
      type: Object,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    },
    board: {
      type: Object,
      required: true
    },
    openTask: {
      type: Function,
      required: true
    }
  },
  filters: {
    crop: function(value) {
      return elipseText(value, 100);
    }
  },
  methods: {
    moveTask(e, toTasks) {
      const fromColumnIndex = e.dataTransfer.getData("from-column-index");
      console.log(fromColumnIndex);
      const fromTasks = this.board.columns[fromColumnIndex].tasks;
      const taskIndex = e.dataTransfer.getData("task-index");

      this.$store.commit("MOVE_TASK", {
        fromColumn: fromTasks,
        toColumn: toTasks,
        taskIndex: taskIndex
      });
    },
    updateColumnProperty(e, key) {
      this.$store.commit("UPDATE_COLUMN", {
        key,
        value: e.target.value
      });
    },
    deleteColumn(key) {
      this.$store.commit("DELETE_COLUMN", key);
    },
    pickupTask(e, taskIndex, fromColumnIndex) {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.dropEffect = "move";

      e.dataTransfer.setData("task-index", taskIndex);
      e.dataTransfer.setData("from-column-index", fromColumnIndex);
    },
    openModal(task, colIndex, taskIndex) {
      this.openTask(task, colIndex, taskIndex);
      // this.colIndex = colIndex;
      // this.taskIndex = taskIndex;
      // this.localTask = task;
    },
    statusPrepare(status) {
      return status ? "Ready" : "Not ready";
    },
    createTask(e, tasks) {
      this.$store.commit("CREATE_TASK", {
        tasks,
        name: e.target.value
      });
      e.target.value = "";
    }
  }
};
/**
 <div
        class="column"
        v-for="(column, $columnIndex) of board.columns"
        :key="$columnIndex"
        @drop="moveTask($event, column.tasks)"
        @dragover.prevent
        @dragenter.prevent
      >
        <div class="column__title">
          <input
            type="text"
            class="input-title"
            :value="column.name"
            @change="updateColumnProperty($event, $columnIndex)"
            @keyup.enter="updateColumnProperty($event, $columnIndex)"
          />
          <AppButton type="danger" @click.native="deleteColumn($columnIndex)"
            >Delete</AppButton
          >
        </div>
        <div class="tasks-wrapper">
          <div
            class="task"
            v-for="(task, $taskIndex) of column.tasks"
            :key="$taskIndex"
            draggable
            @dragstart="pickupTask($event, $taskIndex, $columnIndex)"
            @click="openModal(task, $columnIndex, $taskIndex)"
          >
            <div class="task__title">
              <p class="task__title-name">{{ task.name }}</p>
              <p
                class="task__title--status"
                :class="
                  task.status ? 'task__title--redy' : 'task__title--not-redy'
                "
              >
                {{ statusPrepare(task.status) }}
              </p>
            </div>
            <p v-if="task.description" class="task__description">
              {{ task.description | crop }}
            </p>
          </div>
        </div>
        <input
          type="text"
          class="task-add"
          placeholder="+ Enter new task"
          @keyup.enter="createTask($event, column.tasks)"
        />
      </div>
 */
</script>

<style lang="scss" scoped>
.column {
  max-width: 320px;
  background-color: lightgray;
  box-shadow: 0px 0px 3px 0px #000000;
  padding: 1em;
  margin: 0 2em 2em 0;
  border-radius: 6px;
  align-items: flex-start;
}
.column__title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5em;
  font-weight: bold;
}
.input-title {
  font-weight: bold;
  display: block;
  background-color: transparent;
  border: none;
  font-size: 1em;
  width: 100%;
  box-sizing: border-box;
}
.tasks-wrapper {
  display: flex;
  flex-direction: column;
}
.task {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  box-shadow: 0px 0px 3px 0px #000000;
  margin-bottom: 1em;
  padding: 0.5em;
  border-radius: 6px;
  background-color: #ffffff;
  cursor: pointer;
}
.task__title {
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  text-align: left;
  width: 100%;
  p {
    margin: 0.3em 0;
  }
}
.task__title-name {
  display: flex;
  align-items: center;
}
.task__description {
  margin-top: 0.5em;
  font-size: 13px;
  line-height: 1.5;
  text-align: left;
}
.task-add {
  display: block;
  box-sizing: border-box;
  width: 100%;
  border-radius: 6px;
  padding: 1em;
  border: none;
  background: transparent;
}
@media screen and (max-width: 768px) {
  .column {
    margin-right: 0;
  }
}
</style>