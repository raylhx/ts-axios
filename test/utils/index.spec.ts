import { extend, deepMerge } from '../../src/utils'
describe('utils: index', () => {
  describe('extend', () => {
    test('should be mutable', () => {
      const a = Object.create(null)
      const b = { foo: 123 }

      extend(a, b)

      expect(a.foo).toBe(123)
    })

    test('should extend properties', function() {
      const a = { foo: 123, bar: 456 }
      const b = { bar: 789 }
      const c = extend(a, b)

      expect(c.foo).toBe(123)
      expect(c.bar).toBe(789)
    })
  })

  describe('deepmerge', () => {
    test('should be immutable', () => {
      const a = Object.create(null)
      const b: any = { foo: 123 }
      const c: any = { bar: 456 }

      deepMerge(a, b, c)

      expect(typeof a.foo).toBe('undefined')
      expect(typeof a.bar).toBe('undefined')
      expect(typeof b.bar).toBe('undefined')
      expect(typeof c.foo).toBe('undefined')
    })
    test('should deepmerge properties', () => {
      const a = { foo: 6666666 }
      const b = { foo: 123 }
      const c = { bar: 456 }
      const d = deepMerge(a, b, c)

      expect(d.foo).toBe(123)
      expect(d.bar).toBe(456)
    })

    test('should deepmerge recursively', () => {
      const a = { foo: { bar: 123 } }
      const b = { foo: { baz: 456 }, bar: { qux: 789 } }
      const c = deepMerge(a, b)
      expect(c).toEqual({
        foo: {
          baz: 456,
          bar: 123
        },
        bar: {
          qux: 789
        }
      })
    })
  })
})
