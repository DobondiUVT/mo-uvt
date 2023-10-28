export function isEqualInsensitiveStrings(a: any, b: any) {
  return a.toString().toLowerCase() === b.toString().toLowerCase();
}