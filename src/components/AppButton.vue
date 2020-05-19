<template>
  <button type="button" class="button" :class="typeClasses">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String
    }
  },
  computed: {
    typeClasses() {
      switch (this.type) {
        case "danger":
          return "bg-red";
        case "primary":
          return "bg-teal";
        default:
          return "bg-empty";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.button {
  padding: 0.8em;
  color: #ffffff;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
}
.bg-red {
  background-color: indianred;
  border: 2px solid darken(indianred, 5%);
}
.bg-teal {
  background-color: teal;
  border: 2px solid darken(teal, 5%);
}
.bg-empty {
  background-color: #ffffff;
  border: 2px solid lightgray;
  color: gray;
}
</style>