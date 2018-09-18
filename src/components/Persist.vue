<template>
  <div class="persist card form clearfix" :class="{ success }">
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
        <div v-if="!position.isMarkedForDestruction" v-for="(position, index) in employee.positions" :key="position.id" class="row position">
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

          <div v-if="index !== 0 || employee.positions.length > 1" class="col-md-1">
            <button @click.prevent="removePosition(position)" type="button" class="float-right btn-add btn btn-default btn-xs">x</button>
          </div>
          <div class="col-md-1">
            <button @click.prevent="addPosition()" type="button" class="float-right btn-add btn btn-default btn-xs">+</button>
          </div>
        </div>
      </div>
        <button type="submit" class="float-right btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import EventBus from "@/event-bus"
import { Employee, Position, Department } from "@/models"

export default Vue.extend({
  name: 'persist',
  created() {
    EventBus.$on('employee_selected', (employeeId: string) => {
      this.loadEmployee(employeeId)
    })

    this.fetchDepartments()
  },
  data () {
    let employee = new Employee({
      positions: [new Position()]
    })

    return {
      employee,
      success: false as boolean,
      possibleDepartments: [] as Department[]
    }
  },
  methods: {
    async fetchDepartments() {
      this.possibleDepartments = (await Department.all()).data
    },
    async submit() {
      await this.employee.save({ with: { positions: "department" }})

      const success = await this.employee
        .save({ with: { positions: "department" }})
      if (success) {
        EventBus.$emit("employee_save", this.employee)
        this.success = true
        let reset = () => {
          this.success = false
        }
        setTimeout(reset, 2000)
      }
    },
    async loadEmployee(employeeId: string) {
      let { data } = await Employee
        .includes({ positions: "department" })
        .find(employeeId)
       if (data) this.employee = data
    },
    addPosition() {
      this.employee.positions.unshift(new Position())
    },
    removePosition(position: Position) {
      position.isMarkedForDestruction = true
    }
  }
});
</script>

<style lang="scss" scoped>
@keyframes colorchange {
  0%   {background: #C8E6C9;}
  100% {background: transparent;}
}

input + p, select + p {
  colr: red;
  float: left;
}
 select + p {
  margin-left: 15px;
}

.success {
  animation: colorchange 2000ms;
}
</style>