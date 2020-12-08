const Maybe = a =>
  a !== null && a !== undefined
    ? {
        map: f => Maybe(f(a)),
        chain: f => f(a)
      }
    : { map: () => Maybe(a), chain: f => f(a) }

const storage =
  typeof window !== 'undefined'
    ? {
        get: name =>
          Maybe(document.cookie)
            .map(a => a.split('; '))
            .map(a => a.find(row => row.startsWith('experiment_' + name)))
            .map(a => a.split('='))
            .map(a => a[1])
            .map(a => a.split(','))
            .chain(a => a),
        set: (name, a) => {
          document.cookie = 'experiment_' + name + '=' + a[0] + ',' + a[1]
        }
      }
    : { get: () => [-1, -1], set: () => {} }

const aim = (name = 'noname', percentage = 0, variants = []) =>
  storage.get(name) ||
  storage.set(name, [
    Math.floor(Math.random() * percentage) % 2,
    variants[Math.floor(Math.random() * 10) % variants.length]
  ])

const launch = (name = 'noname', variant, component) => {
  const [show, variant2] = storage.get(name)
  return show > 0 && variant == variant2 ? component : () => null
}

module.exports = { aim, launch }
