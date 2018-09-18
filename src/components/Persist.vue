<template>
  <div class="persist card form clearfix">
    <h3>Persist</h3>
    <form @submit.prevent="submit()">
      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <input v-model="employee.firstName" type="text" class="form-control" placeholder="First Name" />
            <p v-if="employee.errors.firstName">{{ employee.errors.firstName.message }}</p>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <input v-model="employee.age" type="text" class="form-control" placeholder="Age" />
            <p v-if="employee.errors.age">{{ employee.errors.age.message }}</p>
          </div>
        </div>
        <div class="col-md-5">
          <div class="form-group">
            <input v-model="employee.lastName" type="text" class="form-control" placeholder="Last Name" />
            <p v-if="employee.errors.lastName">{{ employee.errors.lastName.message }}</p>
          </div>
        </div>
      </div>
        <div class="positions">
        <div v-for="(position, index) in employee.positions" :key="position.id" class="row position">
          <div class="col-md-4">
            <div class="form-group">
              <input v-model="position.title" type="text" class="form-control" placeholder="Title" />
              <p v-if="position.errors.title">{{ position.errors.title.message }}</p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <select v-model="position.department" class="form-control">
                <option disabled :value="undefined">Select a Department</option>

                <option v-for="department in possibleDepartments" :key="department.id" :value="department">
                  {{ department.name }}
                </option>
              </select>
              <p v-if="position.errors.department">{{ position.errors.department.message }}</p>
            </div>
          </div>
        </div>
      </div>
        <button type="submit" class="float-right btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Employee, Position, Department } from "@/models"

export default Vue.extend({
  name: 'persist',
  created() {
    this.fetchDepartments()
  },
  data () {
    let employee = new Employee({
      positions: [new Position()]
    })

    return {
      employee,
      possibleDepartments: [] as Department[]
    }
  },
  methods: {
    async fetchDepartments() {
      this.possibleDepartments = (await Department.all()).data
    },
    async submit() {
      await this.employee.save({ with: { positions: "department" }})
    }
  }
});
</script>

<style lang="scss" scoped>
input + p, select + p {
  color: red;
  float: left;
}
 select + p {
  margin-left: 15px;
}
</style>