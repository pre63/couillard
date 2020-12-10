const assert = require('assert')
const { aim, launch, hit } = require('./index')

window = {}
window.document = {}
window.document.cookie = ''

const comp = () => 50
const expected = { experiment: 'welcome', allocation: 50, variants: ['A'], anonymousId: -1 }

aim('welcome', 50, ['A'], a => assert.deepStrictEqual(a, expected))

const Welcome = launch('welcome', 'A', a => assert.fail('should not be called.'), comp)

assert.strictEqual(typeof Welcome, 'function', 'Should be a function.')

const f = hit('welcome', 'A', a => true)
assert.strictEqual(f(), true, 'Should return true.')

console.log('Testing done.')
