const assert = require('assert')
const { aim, launch, hit } = require('./index')

window = {}
window.document = {}
window.document.cookie = ''

const expected = {
  experiment: 'welcome',
  allocation: 50,
  variant: 'A',
  variants: ['A', 'B', 'default'],
  anonymousId: -1
}

const Welcome = aim('welcome', 50, a => assert.deepStrictEqual({ ...a, variant: 'A' }, expected), {
  A: () => 50,
  B: () => 100,
  default: () => null
})

assert.strictEqual(typeof Welcome, 'function', 'Should be a function.')
assert.strictEqual(Welcome(), null, 'Should be null.')

launch('welcome', a => assert.fail('should not be called.'))

const t = hit('welcome', () => true)
assert.strictEqual(t, true, 'Should return true.')

console.log('Testing done.')
