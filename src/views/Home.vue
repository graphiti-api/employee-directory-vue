<template>
  <div class="home">
    <h1>Employee Directory</h1>
    <query />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Query from "@/components/Query.vue"

export default Vue.extend({
  name: 'home',
  components: {
    Query
  }
});
</script>