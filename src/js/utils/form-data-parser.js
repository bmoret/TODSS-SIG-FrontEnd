export function parseForm(form) {
  if (form instanceof HTMLFormElement) {
    let data = {}
    new FormData(form).forEach((value, key) => data[key] = value);
    return data;
  }
  return {};
}