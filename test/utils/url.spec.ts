import { buildURL, isURLSameOrigin, isAbsoluteURL, combineURL } from '../../src/utils/url'

describe('utils: url', () => {
  describe('combineURL', () => {
    test('should combine URL', () => {
      expect(combineURL('https://api.github.com', '/users')).toBe('https://api.github.com/users')
    })

    test('should remove duplicate slashes', () => {
      expect(combineURL('https://api.github.com/', '/users')).toBe('https://api.github.com/users')
    })

    test('should insert missing slash', () => {
      expect(combineURL('https://api.github.com', 'users')).toBe('https://api.github.com/users')
    })

    test('should not insert slash when relative url missing/empty', () => {
      expect(combineURL('https://api.github.com/users', '')).toBe('https://api.github.com/users')
    })

    test('should allow a single slash for relative url', () => {
      expect(combineURL('https://api.github.com/users', '/')).toBe('https://api.github.com/users/')
    })
  })

  describe('isAbsoluteURL', () => {
    test('should return true if URL begins with valid scheme name', () => {
      expect(isAbsoluteURL('https://api.github.com/users')).toBeTruthy()
      expect(isAbsoluteURL('custom-scheme-v1.0://example.com/')).toBeTruthy()
      expect(isAbsoluteURL('HTTP://example.com/')).toBeTruthy()
    })

    test('should return false if URL begins with invalid scheme name', () => {
      expect(isAbsoluteURL('123://example.com/')).toBeFalsy()
      expect(isAbsoluteURL('!valid://example.com/')).toBeFalsy()
    })

    test('should return true if URL is protocol-relative', () => {
      expect(isAbsoluteURL('//example.com/')).toBeTruthy()
    })

    test('should return false if URL is relative', () => {
      expect(isAbsoluteURL('/foo')).toBeFalsy()
      expect(isAbsoluteURL('foo')).toBeFalsy()
    })
  })

  describe('isURLSameOrigin', () => {
    test('no', () => {
      expect(isURLSameOrigin(window.location.href)).toBeTruthy()
      expect(isURLSameOrigin('https://github.com/axios/axios')).toBeFalsy()
    })
  })

  describe('buildURL', () => {
    test('no url', () => {
      expect(buildURL('', '')).toBe('')
    })

    test('no params', () => {
      expect(buildURL('/test/url', '')).toBe('/test/url')
    })

    test('get data', () => {
      let data = {
        param1: 134,
        param2: 'test'
      }
      expect(buildURL('/test/url', data)).toBe('/test/url?param1=134&param2=test')
    })
    test('should support special char params', () => {
      let data = {
        param1: '@$:+[,]',
        param2: 'test'
      }
      expect(buildURL('/test/url', data)).toBe('/test/url?param1=@$:+[,]&param2=test')
    })

    test('should support array params', () => {
      expect(
        buildURL('/foo', {
          foo: ['bar', 'baz']
        })
      ).toBe('/foo?foo[]=bar&foo[]=baz')
    })

    test('should support date params', () => {
      let t = new Date()
      expect(
        buildURL('/foo', {
          foo: [t]
        })
      ).toBe('/foo?foo[]=' + t.toISOString())
    })

    test('should correct discard url hash mark', () => {
      expect(buildURL('/foo?abc=123#321')).toBe('/foo?abc=123')
    })

    test('should correct searchParams ', () => {
      let paramsString = 'q=URLUtils.searchParams&topic=api'
      let searchParams = new URLSearchParams(paramsString)

      expect(buildURL('/foo', searchParams)).toBe('/foo?' + searchParams.toString())
    })
    test('should use serializer if provided', () => {
      const serializer = jest.fn(() => {
        return 'foo=bar'
      })
      const params = { foo: 'bar' }
      expect(buildURL('/foo', params, serializer)).toBe('/foo?foo=bar')
      expect(serializer).toHaveBeenCalled()
      expect(serializer).toHaveBeenCalledWith(params)
    })

    test('should support object params', () => {
      expect(
        buildURL('/foo', {
          foo: {
            bar: 'baz'
          }
        })
      ).toBe('/foo?foo=' + encodeURI('{"bar":"baz"}'))
    })
  })
})
