;(() => {
  const gen = () =>
      'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      }),
    pr = 'exp_',
    anon = pr + 'anon',
    np = () => null,
    M = a =>
      a !== null && a !== undefined
        ? {
            m: f => M(f(a)),
            c: f => f(a)
          }
        : { m: () => M(a), c: f => f(a) },
    S =
      typeof window !== 'undefined'
        ? {
            g: n =>
              M(document.cookie)
                .m(a => a.split('; '))
                .m(a => a.find(row => row.startsWith(n)))
                .m(a => a.split('='))
                .m(a => a[1])
                .m(a => a.split(','))
                .c(a => a),
            s: (a, b) => (document.cookie = a + '=' + b),
            e: a => document.cookie.indexOf(a) > -1
          }
        : { g: () => [-1, -1], s: np, e: np }

  S.e(anon) || S.s(anon, gen())

  module.exports = {
    aim: (n, all = 0, va = [], cb) => {
      if (!n) return
      S.e(pr + n) ||
        (cb && cb({ experiment: n, allocation: all, variants: va, anonymousId: S.g(anon)[0] }),
        S.s(
          pr + n,
          +(Math.random() * 100 < all) + ',' + va[Math.floor(Math.random() * 10) % va.length]
        ))
    },
    launch: (n, variant, cb, comp) => {
      exp = pr + n
      if (!S.e(exp)) return np
      let [s, v] = S.g(exp)
      let run = s > 0 && variant == v
      run && cb && cb({ experiment: n, variant, anonymousId: S.g(anon)[0] })
      return run ? comp : np
    },
    hit: (e, cb) => () =>
      cb && cb({ experiment: e, variant: S.g(pr + e)[1], anonymousId: S.g(anon)[0] })
  }
})()
