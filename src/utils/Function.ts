import type { Ref } from 'vue'
import {
  validateFirstName,
  validateLastName,
  validateUsername,
  validateStatus
} from '../utils/Validation.ts'

export interface User {
  id: string
  username: string
  fullName: string
  status: string
  updatedAt: string
}

export function openCreateModalFn(
  showModal: Ref<boolean>,
  form: Ref<any>,
  selectStatus: Ref<string>
) {
  showModal.value = true
  form.value = {
    id: '', 
    firstName: '',
    lastName: '',
    username: '',
    updatedAt: ''
  }
  selectStatus.value = 'Choose status'
}
export function closeCreateModalFn(
  showModal: Ref<boolean>,
  firstNameError: Ref<string>,
  lastNameError: Ref<string>,
  usernameError: Ref<string>
) {
  showModal.value = false
  firstNameError.value = ''
  lastNameError.value = ''
  usernameError.value = ''
}

export function handleEditFn(
  user: User,
  form: Ref<any>,
  selectStatus: Ref<string>,
  showModal: Ref<boolean>
) {
  const [firstName, lastName] = user.fullName.split(' ')
  form.value = {
    id: user.id, 
    firstName,
    lastName,
    username: user.username,
    updatedAt: user.updatedAt
  }
  selectStatus.value = user.status
  showModal.value = true
}


export function handleSubmitFn(
  newUser: any,
  users: Ref<User[]>,
  firstNameError: Ref<string>,
  lastNameError: Ref<string>,
  usernameError: Ref<string>,
  statusError: Ref<string>,
  closeCreateModal: () => void
) {
  
  if (!newUser.firstName.trim()) {
    firstNameError.value = 'First name is required'
    return
  }
  if (!newUser.lastName.trim()) {
    lastNameError.value = 'Last name is required'
    return
  }
  if (!newUser.username.trim()) {
    usernameError.value = 'Username is required'
    return
  }
  if (!newUser.status || newUser.status === 'Choose status') {
    statusError.value = 'Status is required'
    return
  }

  const fullName = `${newUser.firstName} ${newUser.lastName}`

  const newUserData: User = {
    id: newUser.id || crypto.randomUUID(), // 
    username: newUser.username,
    fullName,
    status: newUser.status,
    updatedAt: newUser.updatedAt
  }

  const index = users.value.findIndex(user => user.id === newUserData.id)

  if (index !== -1) {
    users.value[index] = newUserData // update
  } else {
    users.value.push(newUserData) // create
  }

  localStorage.setItem('users', JSON.stringify(users.value))
  closeCreateModal()
}


export function toggleFiltersFn(showFilters: Ref<boolean>) {
  showFilters.value = !showFilters.value
}

export function handleDeleteRequestFn(
  user: User,
  selectedUser: Ref<User | null>,
  showConfirmModal: Ref<boolean>
) {
  selectedUser.value = user
  showConfirmModal.value = true
}

export function confirmDeleteFn(
  users: Ref<User[]>,
  selectedUser: Ref<User | null>,
  showConfirmModal: Ref<boolean>
) {
  if (selectedUser.value) {
    users.value = users.value.filter(u => u.username !== selectedUser.value?.username)
    localStorage.setItem('users', JSON.stringify(users.value))
  }
  showConfirmModal.value = false
  selectedUser.value = null
}

export function handleActiveFn(
  user: User,
  selectedUserForActive: Ref<User | null>,
  confirmActiveVisible: Ref<boolean>
) {
  selectedUserForActive.value = user
  confirmActiveVisible.value = true
}

export function confirmActiveFn(
  users: Ref<User[]>,
  selectedUserForActive: Ref<User | null>,
  confirmActiveVisible: Ref<boolean>
) {
  if (selectedUserForActive.value) {
    const index = users.value.findIndex(u => u.username === selectedUserForActive.value?.username)
    if (index !== -1) {
      users.value[index].status = 'Active'
      localStorage.setItem('users', JSON.stringify(users.value))
    }
  }
  confirmActiveVisible.value = false
}

export function cancelActiveFn(
  confirmActiveVisible: Ref<boolean>,
  selectedUserForActive: Ref<User | null>
) {
  confirmActiveVisible.value = false
  selectedUserForActive.value = null
}

export function handleLockFn(
  user: User,
  lockedUser: Ref<User | null>,
  showConfirmModal: Ref<boolean>
) {
  lockedUser.value = user
  showConfirmModal.value = true
}
