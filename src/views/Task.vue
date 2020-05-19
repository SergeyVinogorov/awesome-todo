<template>
  <div class="task-view">
    <div class="task-body">
      <div class="task-status">
        <div class="task-status__label">
          <label class="task-status__switch" for="taskStatus">
            <input
              type="checkbox"
              id="taskStatus"
              @change="updateTaskStatus('status')"
            />
            <span class="slider round"></span>
          </label>
          <p
            class="task__title--status task-status__text"
            :class="task.status ? 'task__title--redy' : 'task__title--not-redy'"
          >
            {{ statusPrepare(task.status) }}
          </p>
        </div>

        <AppButton @click.native="$emit('closeAfterDelete')">Close</AppButton>
      </div>

      <input
        type="text"
        class="task-body__title"
        :value="task.name"
        @change="updateTaskProperty($event, 'name')"
        @keyup.enter="updateTaskProperty($event, 'name')"
      />

      <textarea
        class="task-body__text"
        :value="task.description"
        @change="updateTaskProperty($event, 'description')"
      />
      <div class="task-footer">
        <AppButton
          type="primary"
          class="task-footer__btn"
          @click.native="toggleMove"
          >Move</AppButton
        >
        <AppButton
          type="danger"
          class="task-footer__btn"
          @click.native="deleteTask()"
          >Delete task</AppButton
        >
      </div>
      <div class="task-footer__dropdawn" v-if="isMove">
        <ul class="task-footer__list">
          <li
            v-for="(column, $columnIndex) of board.columns"
            :key="$columnIndex"
            class="task-footer__item"
            @click="moveTask(column.tasks)"
          >
            {{ column.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from "../components/AppButton";
import { mapState } from "vuex";

export default {
  components: {
    AppButton
  },
  props: {
    task: Object,
    colIndex: Number,
    taskIndex: Number
  },
  data() {
    return {
      isMove: false
    };
  },
  computed: {
    ...mapState(["board"])
  },
  methods: {
    updateTaskProperty(e, key) {
      this.$store.commit("UPDATE_TASK", {
        task: this.task,
        key,
        value: e.target.value
      });
    },
    statusPrepare(status) {
      return status ? "Ready" : "Not ready";
    },
    updateTaskStatus(key) {
      this.$store.commit("UPDATE_STATUS", { task: this.task, key });
    },
    deleteTask() {
      this.$store.commit("DELETE_TASK", {
        keyColumn: this.colIndex,
        keyTasks: this.taskIndex
      });
      this.$emit("closeAfterDelete");
    },
    moveTask(toTasks) {
      const fromTasks = this.board.columns[this.colIndex].tasks;
      const taskIndex = this.taskIndex;
      this.$store.commit("MOVE_TASK", {
        fromColumn: fromTasks,
        toColumn: toTasks,
        taskIndex: taskIndex
      });
    },
    toggleMove() {
      this.isMove = !this.isMove;
    }
  }
};
</script>

<style lang="scss" scoped>
.task-view {
  position: relative;
  display: flex;
  background-color: #ffffff;
  box-shadow: 0px 0px 3px 0px #000000;
  max-width: 700px;
  width: 100%;
  border-radius: 6px;
}
.task-body {
  display: flex;
  flex-direction: column;
  padding: 1em;
  width: 100%;
  align-items: flex-start;
}
.task-body__title {
  display: block;
  font-weight: bold;
  height: 40px;
  padding: 5px;
  border: 1px solid lightgray;
  border-radius: 6px;
  margin-bottom: 1em;
  width: 100%;
  box-sizing: border-box;
}
.task-body__text {
  border: 1px solid lightgray;
  min-height: 118px !important;
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;
}
.task-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.task-status__label {
  display: flex;
  align-items: center;
}
.task-status__text {
  margin-left: 1em;
}
//task footer
.task-footer {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.task-footer__btn {
  margin-top: 1em;
}
.task-footer__item {
  list-style-type: none;
  padding: 0.5em;
  border: 2px solid teal;
  border-radius: 6px;
  margin-bottom: 1em;
  cursor: pointer;
}
.task-footer__list {
  padding-left: 0;
}
//switcher
.task-status__switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 32px;
}

.task-status__switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 24px;
  width: 24px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: teal;
}

input:focus + .slider {
  box-shadow: 0 0 1px teal;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 30px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
