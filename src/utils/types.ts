export type UserStatus = 'Active' | 'Pending' | 'Activation expired'

// data for both user and employee
export interface BaseUser {
  id?: string
  firstName: string
  lastName: string
  username: string
  email: string
}

export interface UserForm extends BaseUser {
  updatedAt?: string
  status: UserStatus
}

export interface EmployeeForm extends BaseUser {
  tel: string
  mobile: string
  dob: string
  gender: string
  department: string
  jobTitle: string
  position: string
  grade: string
  probationDate: string
  officialDate: string
  avatar?: string
}
