export const storeAccessToken = (token) => {
  localStorage.setItem("access_token", token)
}
export const storeRefreshToken = (token) => {
  localStorage.setItem("refresh_token", token)
}

export const retrieveAccessToken = () => {
  return localStorage.getItem("access_token");
}

