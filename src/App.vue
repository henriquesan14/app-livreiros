<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  font-family: "Lato", sans-serif;
}

.card{
  border: 1px solid #c8ced3 !important;
}

.card-header{
  background-color:#f0f3f5 !important;
  color: #23282c;
}

body {
  margin: 0;
}

#app {
  height: 100vh;
  background-color: #efefef;
}

.header-card {
  display: flex;
  justify-content: space-between;
  align-items: center;

  h5{
    font-size: 1rem;
  }

  span{
    font-size: 0.875rem;
  }
}

h5.card-title{
  text-align: center;
  font-size: 1rem;
}

.tooltip { pointer-events: none; }
</style>
