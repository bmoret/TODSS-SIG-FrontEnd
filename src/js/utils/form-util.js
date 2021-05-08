
export function parseForm(form) {
  if (form instanceof HTMLFormElement) {
    let data = {}
    new FormData(form).forEach((value, key) => data[key] = value);
    return data;
  }
  return {};
}
export function isValidForm(form) {
  if (form.checkValidity()) return true;
  let list = form.querySelectorAll(':invalid');
  return list.forEach(item => item.setAttribute("invalid", ''))
}
