document.querySelectorAll('[data-n-time]').forEach((el) => {
  const toCamelCase = (name, index) => {
    if (index > 0) { return name[0].toUpperCase() + name.slice(1) }
    return name
  }

  const date = new Date(el.getAttribute('datetime'))
  const options = {}
  for (const name of el.getAttributeNames()) {
    if (name.startsWith('data-')) {
      const optionName = name.slice(5).split('-').map(toCamelCase).join('')
      options[optionName] = el.getAttribute(name)
    }
  }

  const formatter = new Intl.DateTimeFormat(options.locale, options)
  el.textContent = formatter.format(date)
})
