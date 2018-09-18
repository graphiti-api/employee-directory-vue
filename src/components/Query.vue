<template>
  <div class="card query">
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Position</th>
          <th>Department</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="employee in employees" :key="employee.id">
          <td>{{ employee.firstName }} {{ employee.lastName }}</td>
          <td>{{ employee.age }}</td>
          <td>{{ employee.currentPosition.title }}</td>
          <td>{{ employee.currentPosition.department.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Employee } from "@/models"
import { Scope } from "spraypaint"

export default Vue.extend({
  name: 'query',
  data() {
    return {
      employees: [] as Employee[]
    }
  },
  created() {
    this.search()
  },
  computed: {
    scope(): Scope<typeof Employee> {
      return Employee
        .includes({ current_position: "department" })
    }
  },
  methods: {
    async search() {
      this.employees = (await this.scope.all()).data
    }
  }
});
</script>