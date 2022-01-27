import { validateEmail } from "./validateEmail";

export function validateSignUp(details: {
  name: string;
  email: string;
}): boolean {
  if (details.name.match(/^ /)) {
    alert("Names cannot start with a space.");
    return false;
  } else if (details.name.match(/[^a-zA-Z ]/)) {
    alert("Names can only contain uppercase and lowercase letters.");
    return false;
  } else if (validateEmail(details.email)) {
    return true;
  } else {
    alert("Please enter a valid email address.");
    return false;
  }
}
