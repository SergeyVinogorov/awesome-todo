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
      <ColumnTask
        v-for="(task, $taskIndex) of column.tasks"
        :key="$taskIndex"
        :task="task"
        :taskIndex="$taskIndex"
        :columnIndex="columnIndex"
        :column="column"
        :board="board"
        :openTask="openTask"
      />
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
import { elipseText } from "@/utils";
import AppButton from "@/components/AppButton";
import ColumnTask from "@/components/ColumnTask";
import movingRepeatedPropsMixin from "@/mixins/movingRepeatedPropsMixin";
export default {
  components: {
    AppButton,
    ColumnTask
  },
  mixins: [movingRepeatedPropsMixin],
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
    createTask(e, tasks) {
      this.$store.commit("CREATE_TASK", {
        tasks,
        name: e.target.value
      });
      e.target.value = "";
    }
  }
};
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