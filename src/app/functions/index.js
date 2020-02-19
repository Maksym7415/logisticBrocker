function dive(strings, ...values) {
  let obj = values[0]
  for(let key of strings[1].split('.')) {
    if(obj && key && typeof obj === 'object') {
      obj = obj[key]
    } else return undefined
  }
  return obj
}

export { dive }
