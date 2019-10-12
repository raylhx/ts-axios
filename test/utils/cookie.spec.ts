import { cookie } from '../../src/utils/cookie'
describe('utils: cookie', () => {
  test('should read cookies', () => {
    document.cookie = 'test=123'
    expect(cookie.read('test')).toBe('123')
  })
  test('cookie null', () => {
    document.cookie = 'text=321'
    expect(cookie.read('noText')).toBeNull()
  })
})
