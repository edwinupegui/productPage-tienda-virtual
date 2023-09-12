import { KeyboardEvent } from 'react'

const whitespaceValidation = (value: string) =>
  /^(?!\s)/.test(value) || 'Este campo no puede contener espacios al inicio.'

export const EMAIL_VALIDATION = {
  validate: {
    isValid: (value: string) =>
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value
      ) || 'El correo electrónico no es válido.',
    whitespace: whitespaceValidation,
  },
}

export const NAME_VALIDATION = {
  validate: {
    isValid: (value: string) =>
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]*$/.test(value) ||
      'Este campo no debe contener caracteres especiales.',
    whitespace: whitespaceValidation,
  },
  minLength: {
    value: 3,
    message: 'Este campo debe contener mínimo 3 caracteres.',
  },
}

export const NUMBER_MULTIPLES_THOUSAND = {
  validate: {
    isValid: (value: string) =>
      /^[1-9]\d*000$/.test(value) ||
      'Sólo puede ingresar números múltiplos de 1000.',
  },
}

export const NUMBER_VALIDATION = {
  validate: {
    isValid: (value: string) =>
      /^[0-9]+$/.test(value) || 'Sólo puede ingresar números.',
  },
  maxLength: {
    value: 10,
    message: 'Este campo no puede contener más de 10 caracteres.',
  },
}

export const DOCUMENT_VALIDATION = {
  validate: {
    isValid: (value: string) =>
      /^[0-9]+$/.test(value) || 'Sólo puede ingresar números.',
  },
  maxLength: {
    value: 10,
    message: 'Este campo no puede contener más de 10 caracteres.',
  },
  minLength: {
    value: 6,
    message: 'Este campo debe contener mínimo 6 caracteres.',
  },
}

export const REFERENCE_NUMBER = {
  validate: {
    isValid: (value: string) =>
      /^[0-9a-zA-Z_-]+$/.test(value) ||
      'Sólo puede ingresar números, letras y los caracteres especiales - y _ .',
    whitespace: whitespaceValidation,
  },
  maxLength: {
    value: 20,
    message: 'Este campo no puede contener más de 20 caracteres.',
  },
  minLength: {
    value: 6,
    message: 'Este campo debe contener mínimo 6 caracteres.',
  },
}

export const PHONE_VALIDATION = {
  validate: {
    isValid: (value: string) =>
      /^[0-9]+$/.test(value) || 'Sólo puede ingresar números.',
    whitespace: whitespaceValidation,
  },
  maxLength: {
    value: 10,
    message: 'Este campo no puede contener más de 10 caracteres.',
  },
  minLength: {
    value: 10,
    message: 'Este campo debe contener mínimo 10 caracteres.',
  },
}

export const ADDRESS_VALIDATION = {
  validate: {
    isValid: (value: string) =>
      /^[a-zA-Z0-9\s#ñ\-.,á-ú]*$/.test(value) ||
      'Ingrese una dirección válida.',
    whitespace: whitespaceValidation,
  },
}

export const ADDRESS_COMPS_VALIDATION = (
  fieldName: string,
  maxLength = 30,
  firstLetter = false
) => ({
  maxLength: {
    value: maxLength,
    message: `El ${fieldName} no puede contener más de ${maxLength} caracteres.`,
  },
  validate: {
    isValid: (value: string) =>
      /^[A-Za-z0-9ñÑ\s]+$/.test(value) ||
      `El ${fieldName} solo puede contener números y letras`,
    firstCharacter: (value: string) => {
      if (firstLetter) {
        return (
          /^[A-Za-z0-9\d][A-Za-z0-9\s]*$/.test(value) ||
          `El ${fieldName} debe iniciar con una letra o un número`
        )
      } else {
        return (
          /^[\d][A-Za-z0-9\s]*$/.test(value) ||
          `El ${fieldName} debe iniciar con un número`
        )
      }
    },
    noInitialSpaces: (value: string) =>
      /^\S.*$/.test(value) || `El ${fieldName} no puede iniciar con espacios`,
  },
})
export const PASSWORD_VALIDATION = {
  validate: {
    isValid: (value: string) =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$,@$!%.#*?&])([A-Za-z\d$,@$!%.#*?&]|[^ ]){8,30}$/.test(
        value
      ) || 'Ingrese una contraseña válida.',
    whitespace: whitespaceValidation,
  },
}

export const MAX_LENGTH_TEXT = 120

export const WHITE_SPACE_VALIDATION = (
  event: KeyboardEvent<HTMLInputElement>
) => {
  if (event.keyCode === 32) {
    event.preventDefault()
  }
}
