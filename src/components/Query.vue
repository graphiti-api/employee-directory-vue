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

            <div class="meta">
              <div class="float-right pagination">
                <a v-if="hasPrevPage" @click="paginate(true)">&laquo; Prev</a>
                <a v-if="hasNextPage" @click="paginate()">Next &raquo;</a>
              </div>

              <span class="float-right total">Total: {{totalCount}}</span>
            </div>
          </div>
        </div>
      </form>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th><a @click="doSort('last_name')">Name</a></th>
          <th><a @click="doSort('age')">Age</a></th>
          <th><a @click="doSort('title')">Position</a></th>
          <th><a @click="doSort('department_name')">Department</a></th>
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
import { Scope, WhereClause, SortScope } from "spraypaint"

export default Vue.extend({
  name: 'query',
  data() {
    let sort : SortScope = {
      created_at: 'desc'
    }

    return {
      employees: [] as Employee[],
      sort,
      totalCount: null as number | null,
      currentPage: 1 as number,
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
        .order(this.sort)
        .page(this.currentPage)
        .per(10)
        .stats({ total: "count" })
        .includes({ current_position: "department" })
    },
    hasPrevPage() : boolean {
      return this.currentPage > 1
    },
    hasNextPage() : boolean {
      return (this.currentPage * 10) < (this.totalCount || 0)
    }
  },
  methods: {
    async search() {
      let { data, meta } = await this.scope.all()
      this.employees = data
      this.totalCount = meta.stats.total.count
    },
    doSort(attribute: string) {
      if (this.sort[attribute] && this.sort[attribute] === "desc") {
        this.sort = {[attribute]: "asc"}
      } else {
        this.sort = {[attribute]: "desc"}
      }
      this.search()
    },
    paginate(back: boolean = false) {
      let count = 1
      if (back) count = -1
      this.currentPage = this.currentPage + count
      this.search()
    },
  }
});
</script>

<style lang="scss" scoped>
.meta {
  margin-top: 0.5rem;
}

.pagination {
  margin-left: 1rem;

  a {
    &:hover {
      color: darken(#90CAF9, 20%);
    }

    &:nth-child(2) {
      margin-left: 0.5rem;
    }
  }
}
</style>