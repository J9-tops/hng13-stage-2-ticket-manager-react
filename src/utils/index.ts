import type {
  AuthFormErrors,
  AuthInFormData,
  TicketFormData,
  TicketFormErrors,
} from "../types";

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

export const getAvatarForAssignee = (assignee: string) => {
  const avatars: { [key: string]: string } = {
    "Jane Smith":
      "https://lh3.googleusercontent.com/aida-public/AB6AXuArShpw6PWEaDouaw3iHOM6Sw3K1OKcwMiHDDSp6WQUOpFJktwpvXf0zeklYgpZbt0K9XdP-QPTCh_D6Ec555VePeeJAPtLqsbVprpBQ4Vk1RSWM92eK0VsY3o4xgc9RcBsPi-cEfGfDUTpDKa7qpaTgsKao4iVDxxmujBs6JCC6rfYgUdm8PY6PTLTPBDSVJ6eZUxXSZYcXSC97LmboylPvQ1Sq59rPiZYZIup0r31qeehSI0ZKUOyRfBBUYrpOM2PbMthNFGqueed",
    "John Doe":
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC7WmZ3NXZ0ZNmZvI-yPmh5KI7aoa4suo0fBTuZOeHsG-ZrR1fiOoih8MH7OrJt1YO6TkPoPfmeP0OZHF_HaEtd7Va1mqiYZEU5AOYvKTEgeoBc3f3yQwXjIs0yeKdC47fJKSFVxFLyZkA-6ncjmhLZEzQEZd97I-mNFFvflptmptRU3--c57VozJHBS0B5gxTnGVr5A2QoSOOt4aH0yGyjnYG39yaOX4EaYBdyt7x8DsLQBCh9TxpQFtr9FH0cpSU1n5pNnnaM46s6",
    "Alice Johnson":
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD-7meYACmVV_nk6UcoAVM2t68i4vLGCEFGliosDSG6SAK8VA24LG5YBcktn6GQNNbVRA7zARfbkTCvTztLokEgyFilTA7dBN1g20ZzoObV87tcKgJoxvd0rQXV-B3lZYOu6e6RSE19ARvGQI-HuFdUjwhnKyVe0bSuycwxm7eFQ8Lrw5JZ7vLH15SN4-ZAysEnPkWaA129G9xT_eAlRyb0IpYNBpgCGsWjStjUTUHKQbmdUPNi1-_OwnBaRdQ3l9LNOD8FpPMarr_w",
  };
  return avatars[assignee] || avatars["Jane Smith"];
};

export function validateTicketForm(formData: TicketFormData): TicketFormErrors {
  const errors: TicketFormErrors = {};

  if (!formData.title.trim()) {
    errors.title = "Title is required.";
  } else if (formData.title.trim().length < 3) {
    errors.title = "Title must be at least 3 characters long.";
  }

  if (formData.description && formData.description.trim().length < 5) {
    errors.description = "Description must be at least 5 characters long.";
  }

  if (!formData?.assignee?.trim()) {
    errors.assignee = "Please select an assignee.";
  }

  if (!["Low", "Medium", "High"].includes(formData?.priority ?? "")) {
    errors.priority = "Invalid priority selected.";
  }

  if (!["Open", "In Progress", "Closed"].includes(formData?.status ?? "")) {
    errors.status = "Invalid status selected.";
  }

  return errors;
}
