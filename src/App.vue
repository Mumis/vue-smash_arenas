<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'app',
}

</script>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  #app {
    font-family: 'Montserrat', sans-serif;
    color: #2c3e50;
    background-color: rgb(219,236,236);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: rgb(79,192,141);
  }

  small {
    font-size: 14px;
  }

</style>
