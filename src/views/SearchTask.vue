<template>
  <div class="search">
    <div class="search-wrapper">
      <div class="search-wrapper__item">
        <p class="field-title">
          Task name:
        </p>
        <div class="search__input-wrapper">
          <input
            type="text"
            v-model="search"
            placeholder="Search title.."
            class="search__input"
          />
        </div>
      </div>
      <div class=" search-wrapper__item">
        <div class="search__select">
          <p class="field-title">
            Select status:
          </p>
          <AppButton
            :type="isOpen ? 'primary' : ''"
            class="search__filter-btn"
            @click.native="isOpen = !isOpen"
            >{{ filterBtn }}</AppButton
          >
          <ul class="search__select-options" v-if="isOpen">
            <li @click="optionToggle('isReady')" class="search__select-item">
              Ready
            </li>
            <li @click="optionToggle('isNotReady')" class="search__select-item">
              Not ready
            </li>
            <li @click="optionToggle('isAll')" class="search__select-item">
              All
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="search__task-wrapper">
      <div
        class="task search__task"
        v-for="task in filteredTask"
        @click="openModal(task.task, task.colIndex, task.taskIndex)"
      >
        <div class="task__title">
          <p class="task__title-name">
            {{ task.task.name }}
          </p>
          <p
            class="task__title--status"
            :class="
              task.task.status ? 'task__title--redy' : 'task__title--not-redy'
            "
          >
            {{ statusPrepare(task.task.status) }}
          </p>
        </div>
        <p v-if="task.description" class="task__description">
          {{ task.task.description | crop }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from "@/components/AppButton";
export default {
  components: {
    AppButton,
  },
  props: {
    board: {
      type: Object,
      required: true,
    },
    openTask: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      search: "",
      taskList: [],
      isReady: false,
      isNotReady: false,
      isAll: true,
      isOpen: false,
    };
  },
  mounted() {
    this.board.columns.map((el, index) => {
      let colIndex = index;
      el.tasks.map((task, taskIndex) => {
        let result = {
          colIndex: colIndex,
          task: task,
          taskIndex: taskIndex,
        };
        this.taskList.push(result);
      });
    });
  },
  filters: {
    crop: function(value) {
      return elipseText(value, 100);
    },
  },
  computed: {
    filteredTask() {
      if (this.isAll) {
        return this.taskList.filter((taskName) => {
          return taskName.task.name
            .toLowerCase()
            .includes(this.search.toLowerCase());
        });
      } else if (this.isReady) {
        return this.taskList.filter((taskName) => {
          if (taskName.task.status) {
            return taskName.task.name
              .toLowerCase()
              .includes(this.search.toLowerCase());
          }
        });
      } else if (this.isNotReady) {
        return this.taskList.filter((taskName) => {
          if (!taskName.task.status) {
            return taskName.task.name
              .toLowerCase()
              .includes(this.search.toLowerCase());
          }
        });
      }
    },
    filterBtn() {
      switch (true) {
        case this.isAll:
          return "All";
        case this.isReady:
          return "Ready";
        case this.isNotReady:
          return "Not ready";
      }
    },
  },
  methods: {
    openModal(task, colIndex, taskIndex) {
      this.openTask(task, colIndex, taskIndex);
    },
    optionToggle(key) {
      switch (key) {
        case "isAll":
          this.isAll = true;
          this.isReady = false;
          this.isNotReady = false;
          this.isOpen = false;
          break;
        case "isReady":
          this.isAll = false;
          this.isReady = true;
          this.isNotReady = false;
          this.isOpen = false;
          break;
        case "isNotReady":
          this.isAll = false;
          this.isReady = false;
          this.isNotReady = true;
          this.isOpen = false;
          break;
      }
    },
    statusPrepare(status) {
      return status ? "Ready" : "Not ready";
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  margin-bottom: 1em;
  max-width: 800px;
  padding: 1em;
  background-color: lightgray;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.search-wrapper {
  display: flex;
}
.search-wrapper__item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.search__input-wrapper {
  margin-bottom: 1em;
  width: 100%;
  display: flex;
  align-items: flex-start;
}
.search__input {
  padding: 1em;
  max-width: 300px;
  width: 100%;
  box-sizing: border-box;
  border: 2px solid gray;
  border-radius: 6px;
}
.search__task-wrapper {
  max-width: 600px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.search__filter-btn {
  margin: 0 1em;
  &:nth-child(2) {
    margin-right: 0px;
  }
}
.search__select-options {
  padding-left: 0;
}
.search__select-item {
  list-style: none;
  padding: 0.5em;
  background-color: #ffffff;
  border: 1px solid lightgray;
  cursor: pointer;
}
.search__task {
  max-width: 300px;
  width: 100%;
}
.highlightText {
  color: teal;
}
@media screen and (max-width: 768px) {
  .search_task-wrapper {
    button {
      margin-bottom: 1em;
    }
  }
}
</style>
