export function validateEmail(email: string): boolean {
  return email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/) !== null;
}
