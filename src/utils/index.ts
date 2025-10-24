import type { AuthFormErrors, AuthInFormData } from "../types";

export function validateSignIn(formData: AuthInFormData): AuthFormErrors {
  const errors: AuthFormErrors = {};

  if (!formData.email) {
    errors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!formData.password) {
    errors.password = "Password is required.";
  } else if (formData.password.length < 6) {
    errors.password = "Password must be at least 6 characters long.";
  }

  return errors;
}
