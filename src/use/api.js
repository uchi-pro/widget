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
    .catch(error => {
      alert('Не удалось получить список курсов.')
      console.error('Uchi.pro widget: не удалось получить список курсов:', error)
    })
}
