// Define the script as a string
const scriptString = `
document.querySelectorAll('[data-n-time]').forEach(el => {
  const date = new Date(el.getAttribute('datetime'));
  const options = {};
  for (const name of el.getAttributeNames()) {
    if (name.startsWith('data-')) {
      options[name.slice(5)] = el.getAttribute(name);
    }
  }
  const formatter = new Intl.DateTimeFormat(options.locale, options);
  el.textContent = formatter.format(date)
})
`.replace(/\s+/g, ' ') 

export default scriptString
