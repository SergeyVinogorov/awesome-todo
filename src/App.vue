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
</style>
