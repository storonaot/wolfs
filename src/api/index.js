export const URL = 'https://76dd-46-216-112-219.ngrok.io'

export const APP_ID = 7964162

const getHeaders = () =>
  new Headers({
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: window.location.search.replace('?', ''),
  })

const toJSON = response => {
  if (response.ok) return response.json()
  console.error(response)

  return null
}

const defaultOptions = { headers: getHeaders() }

export const signIn = ({ first_name, last_name, avatar }) => {
  fetch(`${URL}/sign-in`, {
    ...defaultOptions,
    method: 'POST',
    body: JSON.stringify({ first_name, last_name, avatar }),
  }).then(toJSON)
}

export const getAds = ({ type }) =>
  fetch(`${URL}/api/ads/${type}`, {
    ...defaultOptions,
    mode: 'no-cors',
    method: 'GET',
  }).then(toJSON)
