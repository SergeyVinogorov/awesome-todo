<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 16px;
  height: 100vh;
  background-color: lightslategray;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
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
.task__title--redy {
  background-color: teal;
}
.task__title--not-redy {
  background-color: indianred;
}
.task__title--status {
  font-weight: 400;
  padding: 0.3em;
  border-radius: 4px;
  color: #ffffff;
}

.field-title {
  color: gray;
  font-weight: 500;
}
</style>
