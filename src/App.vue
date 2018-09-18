<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import '~bootstrap/scss/bootstrap.scss';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.query {
  padding: 1rem;

  th a {
    cursor: pointer;
  }

  .meta {
    margin-top: 0.5rem;
  }

  .pagination {
    margin-left: 1rem;
    a {
      &:hover {
        color: darken(#90CAF9, 20%);
        cursor: pointer;
      }
      &:nth-child(2) {
        margin-left: 0.5rem;
      }
    }
  }
}

.persist {
  padding: 1rem;
}
</style>
