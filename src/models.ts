import {
  SpraypaintBase,
  Model,
  Attr,
  HasMany,
  HasOne,
  BelongsTo
} from "spraypaint"

@Model()
export class ApplicationRecord extends SpraypaintBase {
  static baseUrl = "/"
  static apiNamespace = "api/v1"
}

@Model()
export class Employee extends ApplicationRecord {
  static jsonapiType = "employees"

  foos: string[]

  @Attr() firstName: string
  @Attr() lastName: string
  @Attr() age: number

  @HasMany() positions: Position[]
  @HasOne() currentPosition: Position

  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }
}

@Model()
export class Position extends ApplicationRecord {
  static jsonapiType = "positions"

  @Attr() title: string
  @Attr() historicalIndex: number

  @BelongsTo() department: Department
}

@Model()
export class Department extends ApplicationRecord {
  static jsonapiType = "departments"

  @Attr() name: string
}