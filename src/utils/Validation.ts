import type {Ref} from 'vue'

// Function to validate a company name
export function validateCompanyName(name: string, errorRef: Ref<string>): boolean {
    if (!name.trim()) {
      errorRef.value = 'Please enter Company Name before saving.'
      return false
    } else if (/[^a-zA-Z0-9\s]/.test(name)) {
      errorRef.value = 'Company Name can only contain letters, numbers, and spaces.'
      return false
    } else {
      errorRef.value = ''
      return true
    }
  }

// Function to validate an abbreviated name
export function validateAbbreviatedName (name: string, errorRef: Ref<string>): boolean {
    if (!name.trim()) {
      errorRef.value = 'Please enter Abbreviated Name before saving.'
      return false
    } else if (/[^a-zA-Z0-9\s]/.test(name)) {
      errorRef.value = 'Abbreviated Name can only contain letters, numbers, and spaces.'
      return false
    } else {
      errorRef.value = ''
      return true
    }
  }

//  Function to validate an email domain 
export function validateEmailDomain(email: string, errorRef: Ref<string>): boolean {
    const isValid = /^@[\w]+\.\w{2}$/.test(email.trim())
    if (!isValid) {
      errorRef.value = 'Email domain must start with @ and have 2 characters after the dot.'
      return false
    }
    errorRef.value = ''
    return true
  }

//  Function to validate a name field 
export function validateFirstName(value: string, errorRef: Ref<string>): boolean {
    if (!value.trim()) {
      errorRef.value = 'First name is required.'
      return false
    } else if (!/^[A-Za-z]+$/.test(value)) {
      errorRef.value = 'First name must contain only letters and no spaces or special characters.'
      return false
    }
    errorRef.value = ''
    return true
  }
  
  export function validateLastName(value: string, errorRef: Ref<string>): boolean {
    if (!value.trim()) {
      errorRef.value = 'Last name is required.'
      return false
    } else if (!/^[A-Za-z]+$/.test(value)) {
      errorRef.value = 'Last name must contain only letters and no spaces or special characters.'
      return false
    }
    errorRef.value = ''
    return true
  }

// Function to validate username 
export function validateUsername(username: string, errorRef: Ref<string>): boolean {
    if (!username.trim()) {
      errorRef.value = 'Username is required'
      return false
    }
    errorRef.value = ''
    return true
  }

// Function to validate a status field
export function validateStatus(status: string, errorRef: Ref<string>): boolean {
    if (status === 'Choose status') {
      errorRef.value = 'Status is required.'
      return false
    }
    errorRef.value = ''
    return true
  }
  