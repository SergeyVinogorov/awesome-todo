import Vue from "vue";
import Vuex from "vuex";
import defaultBoard from "./default-board.js";
import { uuid, saveStatePlugin } from "./utils";

Vue.use(Vuex);

const board = JSON.parse(localStorage.getItem("board")) || defaultBoard;

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    board,
  },
  mutations: {
    CREATE_TASK(state, { tasks, name }) {
      tasks.push({
        name,
        id: uuid(),
        description: "",
        status: false,
      });
    },
    CREATE_COLUMN(state, { name }) {
      state.board.columns.push({
        name,
        tasks: [],
      });
    },
    UPDATE_TASK(state, { task, key, value }) {
      task[key] = value;
    },
    UPDATE_COLUMN(state, { key, value }) {
      state.board.columns[key].name = value;
    },
    UPDATE_STATUS(state, { task, key }) {
      task[key] = !task[key];
    },
    MOVE_TASK(state, { fromColumn, toColumn, taskIndex }) {
      const taskToMove = fromColumn.splice(taskIndex, 1)[0];
      toColumn.push(taskToMove);
    },
    MOVE_COLUMN(state, { fromColumnIndex, toColumnIndex }) {
      const columnList = state.board.columns;

      const columnToMove = columnList.splice(fromColumnIndex, 1)[0];
      columnList.splice(toColumnIndex, 0, columnToMove);
    },
    DELETE_COLUMN(state, key) {
      let result = state.board.columns.filter((el, index) => {
        return index != key;
      });
      state.board.columns = result;
    },
    DELETE_TASK(state, { keyColumn, keyTasks }) {
      let result = state.board.columns[keyColumn].tasks.filter((el, index) => {
        return index != keyTasks;
      });
      state.board.columns[keyColumn].tasks = result;
    },
  },
  actions: {},
});
