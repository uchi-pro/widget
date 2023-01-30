let baseUrl = ''

export function getBaseUrl () {
  return baseUrl
}

export function setBaseUrl (newBaseUrl) {
  baseUrl = newBaseUrl
}

export function fetchWidgetData () {
  return fetch(`${baseUrl}/shop/courses`, {
    headers: {
      'Accept': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => {
      if (!Array.isArray(data.courses)) {
        throw new Error('В ответе сервера отсутствует поле курсов')
      }
      return data.courses
    })
}
