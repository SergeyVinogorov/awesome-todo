<template>
  <div class="board">
    <div class="board-container">
      <BoardColumn
        v-for="(column, $columnIndex) of board.columns"
        :key="$columnIndex"
        :column="column"
        :columnIndex="$columnIndex"
        :board="board"
        :openTask="openModal"
      />

      <div class="column newColumn">
        <input
          type="text"
          class="newColumn__title"
          placeholder="New column name"
          v-model="newColumnName"
          @keyup.enter="createColumn"
        />
      </div>
    </div>
    <div class="task-bg" v-if="isTaskOpen" @click.self="close">
      <Task
        :task="localTask"
        :colIndex="colIndex"
        :taskIndex="taskIndex"
        @closeAfterDelete="this.close"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { elipseText } from "@/utils";
import Task from "./Task";
import AppButton from "@/components/AppButton";
import BoardColumn from "@/components/BoardColumn";
export default {
  components: {
    Task,
    AppButton,
    BoardColumn
  },
  data() {
    return {
      localTask: {},
      colIndex: null,
      taskIndex: null,
      newColumnName: ""
    };
  },
  computed: {
    ...mapState(["board"]),
    isTaskOpen() {
      return Object.keys(this.localTask).length > 0;
    }
  },
  filters: {
    crop: function(value) {
      return elipseText(value, 100);
    }
  },
  methods: {
    openModal(task, colIndex, taskIndex) {
      this.colIndex = colIndex;
      this.taskIndex = taskIndex;
      this.localTask = task;
    },
    close() {
      this.localTask = {};
      this.taskIndex = null;
      this.colIndex = null;
    },
    createColumn() {
      this.$store.commit("CREATE_COLUMN", {
        name: this.newColumnName
      });
      this.newColumnName = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.board {
  padding: 1em;
  display: flex;
  max-width: 1950px;
  margin: 0 auto;
  background-color: lightslategray;
}
.board-container {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}
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
.task-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
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
.input-title {
  font-weight: bold;
  display: block;
  background-color: transparent;
  border: none;
  font-size: 1em;
  width: 100%;
  box-sizing: border-box;
}
.newColumn__title {
  padding: 1em;
  border: 2px solid lightgray;
  border-radius: 6px;
}
@media screen and (max-width: 768px) {
  .board-container {
    justify-content: center;
  }
  .column {
    margin-right: 0;
  }
}
</style>
