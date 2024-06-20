export const loginDetailsConstraint = {
  email: {
    email: {
      message: '^Provide a valid email address'
    }
  },
  password: {
    length: {
      message: '^Enter your password',
      minimum: 1
    },
    presence: true
  }
}

export const validateEmail = {
  email: {
    email: {
      message: '^Provide a valid email address'
    }
  }
}

export const signupDetailsConstraint = {
  dob: {
    presence: true
  },
  email: {
    email: {
      message: '^Provide a valid email address'
    }
  },
  firstName: {
    length: {
      message: '^Enter your First Name',
      minimum: 1
    },
    presence: true
  },
  lastName: {
    length: {
      message: '^Enter your Last Name',
      minimum: 1
    },
    presence: true
  },
  phone: {
    length: {
      message: '^Provide a valid Phone Number',
      minimum: 1
    },
    presence: true
  }
}

export const validatePassword = {
  password: {
    format: {
      message: '^Can only match certain characters',
      pattern:
        /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^?&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
    },
    length: {
      message: '^Minimum of 8 characters',
      minimum: 8
    }
  }
}

export const checkPassword = (password: string) => {
  let errors = {
    hasSpecialCharacters: null as any,
    hasUpperCaseCharacter: null as any,
    isLongerThan8: null as any
  }
  if (password.length >= 8) {
    errors = { ...errors, isLongerThan8: true }
  }
  if (/[A-Z]/.test(password)) {
    errors = { ...errors, hasUpperCaseCharacter: true }
  }
  if (/[^\w\s]/.test(password)) {
    errors = { ...errors, hasSpecialCharacters: true }
  }
  return errors
}
