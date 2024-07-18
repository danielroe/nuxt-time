document.querySelectorAll('[data-n-time]').forEach((el) => {
  const toCamelCase = (name, index) => {
    if (index > 0) {
      return name[0].toUpperCase() + name.slice(1)
    }
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

  if (options.relative) {
    const now = new Date()
    const diffInSeconds = (date.getTime() - now.getTime()) / 1000
    const diffInMinutes = diffInSeconds / 60
    const diffInHours = diffInMinutes / 60
    const diffInDays = diffInHours / 24
    const formatter = new Intl.RelativeTimeFormat(options.locale, options)
    if (Math.abs(diffInSeconds) < 60) {
      el.textContent = formatter.format(Math.round(diffInSeconds), 'second')
    }
    else if (Math.abs(diffInMinutes) < 60) {
      el.textContent = formatter.format(Math.round(diffInMinutes), 'minute')
    }
    else if (Math.abs(diffInHours) < 24) {
      el.textContent = formatter.format(Math.round(diffInHours), 'hour')
    }
    else {
      el.textContent = formatter.format(Math.round(diffInDays), 'day')
    }
  }
  else {
    const formatter = new Intl.DateTimeFormat(options.locale, options)
    el.textContent = formatter.format(date)
  }
})
