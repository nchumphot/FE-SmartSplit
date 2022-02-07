export function verifyAmount(str: string): boolean {
  if (str.match(/^[0-9]+$/)) {
    // checks for non-decimals
    return true;
  } else if (str.match(/^[0-9]+\.[0-9]{0,2}$/)) {
    // check for decimals
    return true;
  } else {
    return false;
  }
}
