export function camelToDashCase(str) {
  return str.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
}

export function toLineStyle(style = {}) {
  return Object.keys(style)
      .map( key => `${camelToDashCase(key)}: ${style[key]}`)
      .join(';');
}

export function debounce(fn, time = 300) {
  let timeout;

  return function(...args) {
    clearTimeout(timeout)
    timeout = setTimeout( () => {
      // eslint-disable-next-line no-invalid-this
      fn.apply(this, args)
    }, time)
  }
}

export function parse(value='') {
  if (value.startsWith('=')) {
    try {
      console.log(eval(value.slice(1)))
      return eval(value.slice(1))
    } catch {
      console.log(value)
      return value
    }
  }
  console.log(value)
  return value
}
