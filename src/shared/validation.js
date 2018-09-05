export const checkValidity = (value, rules) => {
  if (!rules) {
    return true
  }

  let isValid = true
  if (rules.required) {
    isValid = isValid && value.trim().length > 0
  }
  if (rules.minLength) {
    isValid = isValid && value.length >= rules.minLength
  }
  if (rules.maxLength) {
    isValid = isValid && value.length <= rules.maxLength
  }

  return isValid
}
