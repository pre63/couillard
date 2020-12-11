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
    aim: (n, a = 0, cb, vrs) => {
      if (!n) return np
      if (!S.e(pr + n)) {
        let vs = Object.keys(vrs),
          s = +(Math.random() * 100 < a),
          v = vs[Math.floor(Math.random() * 10) % vs.length]
        cb &&
          cb({ experiment: n, allocation: a, variant: v, variants: vs, anonymousId: S.g(anon)[0] })
        S.s(pr + n, s + ',' + v)
      }
      let [s, v] = S.g(pr + n)
      return s > 0 ? vrs[v] : vrs.default || np
    },
    launch: (n, cb) => {
      if (!S.e(pr + n)) return
      let [s, v] = S.g(pr + n)
      return s > 0 && cb && cb({ experiment: n, variant: v, anonymousId: S.g(anon)[0] })
    },
    hit: (n, cb) => cb && cb({ experiment: n, variant: S.g(pr + n)[1], anonymousId: S.g(anon)[0] })
  }
})()
