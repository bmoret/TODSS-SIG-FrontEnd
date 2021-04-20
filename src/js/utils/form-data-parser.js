
export function jsonParseForm(form) {
  if (form instanceof HTMLFormElement) {
    let data = {}
    new FormData(form).forEach((value, key) => data[key] = value);
    return JSON.stringify(data);
  }
  return {};
}