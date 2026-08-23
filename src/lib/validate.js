const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[0-9+\-()\s]{7,20}$/

export function validateEnquiry(data) {
  const errors = {}

  if (!data.name?.trim()) errors.name = 'Please enter your name.'
  if (!data.email?.trim()) {
    errors.email = 'Please enter your email.'
  } else if (!EMAIL_RE.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!data.phone?.trim()) {
    errors.phone = 'Please enter your phone number.'
  } else if (!PHONE_RE.test(data.phone.trim())) {
    errors.phone = 'Please enter a valid phone number.'
  }
  if (!data.projectType) errors.projectType = 'Please select a project type.'
  if (!data.description?.trim() || data.description.trim().length < 20) {
    errors.description = 'Please tell us a little more (at least 20 characters).'
  }
  if (!data.platforms || data.platforms.length === 0) {
    errors.platforms = 'Please select at least one platform.'
  }

  return errors
}
