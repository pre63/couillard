const { aim, launch } = require('./index')

window = {}
window.document = {}
window.document.cookie = ''

aim('welcome', 50, ['A'])
launch('welcome', 'A', () => null)

aim('welcome', 50, ['A', 'B'])
launch('welcome', 'A', () => null)
launch('welcome', 'B', () => null)
