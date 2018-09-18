<template>
  <div class="home">
    <h1>Employee Directory</h1>

    <div class="row">
      <div class="col-md-6">
        <query />
      </div>
      <div class="col-md-6">
        <persist />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Query from "@/components/Query.vue"
import Persist from "@/components/Persist.vue"

export default Vue.extend({
  name: 'home',
  components: {
    Query,
    Persist
  }
});
</script>