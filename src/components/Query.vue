<template>
  <div class="card query">
    <div class='search-controls'>
      <form v-on:submit.prevent="search()">
        <div class="row">
          <div class="col-md-6">
            <div class='form-group'>
              <input v-model="query.first_name.prefix" type='search' class='form-control' placeholder="First Name" />
            </div>
            <div class='form-group'>
              <input v-model="query.last_name.prefix" type='search' class='form-control' placeholder="Last Name" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="clearfix">
              <button class="btn btn-lg btn-primary float-right" type="submit">Search</button>
            </div>
          </div>
        </div>
      </form>
    </div>

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
import { Scope, WhereClause } from "spraypaint"

export default Vue.extend({
  name: 'query',
  data() {
    return {
      employees: [] as Employee[],
      query: {
        first_name: {},
        last_name: {}
      } as WhereClause
    }
  },
  created() {
    this.search()
  },
  computed: {
    scope(): Scope<typeof Employee> {
      return Employee
        .where(this.query)
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