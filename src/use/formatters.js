export function formatPrice (value) {
  value = value ?? 0

  let val = (value).toFixed(0).replace(' ')
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' руб.'
}

export function plural (number, one, two, five) {
  let n = Math.abs(number)
  n %= 100
  if (n >= 5 && n <= 20) {
    return five
  }
  n %= 10
  if (n === 1) {
    return one
  }
  if (n >= 2 && n <= 4) {
    return two
  }
  return five
}
