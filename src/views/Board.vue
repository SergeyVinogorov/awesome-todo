<template>
  <div class="board">
    <div class="search-container">
      <div class="search-btn">
        <AppButton type="primary" @click.native="searchToggle">{{
          isSearch ? "Close search" : "Open Search"
        }}</AppButton>
      </div>

      <SearchTask :board="board" :openTask="openModal" v-if="isSearch" />
    </div>
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
import Task from "@/views/Task";
import AppButton from "@/components/AppButton";
import BoardColumn from "@/components/BoardColumn";
import SearchTask from "@/views/SearchTask";
export default {
  components: {
    Task,
    AppButton,
    BoardColumn,
    SearchTask,
  },
  data() {
    return {
      localTask: {},
      colIndex: null,
      taskIndex: null,
      newColumnName: "",
      isSearch: false,
    };
  },
  computed: {
    ...mapState(["board"]),
    isTaskOpen() {
      return Object.keys(this.localTask).length > 0;
    },
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
        name: this.newColumnName,
      });
      this.newColumnName = "";
    },
    searchToggle() {
      this.isSearch = !this.isSearch;
    },
  },
};
</script>

<style lang="scss" scoped>
.board {
  padding: 1em;
  display: flex;
  flex-direction: column;
  max-width: 1950px;
  margin: 0 auto;
  background-color: lightslategray;
  position: relative;
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
.search-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.search-btn {
  align-self: flex-start;
  margin-bottom: 1em;
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
