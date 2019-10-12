import {
  isDate,
  isObject,
  isPlainObject,
  isFormData,
  isURLSearchParams
} from '../../src/utils/isType'
describe('utils: isType', () => {
  test('date', () => {
    let date1 = new Date()
    let date2 = '1234'
    expect(isDate(date1)).toBeTruthy()
    expect(isDate(date2)).toBeFalsy()
  })

  test('object', () => {
    let obj1 = Object.create(null)
    let obj2 = '234'
    expect(isObject(obj1)).toBeTruthy()
    expect(isObject(obj2)).toBeFalsy()
  })

  test('isPlainObject', () => {
    let obj1 = Object.create(null)
    let obj2 = '234'
    expect(isPlainObject(obj1)).toBeTruthy()
    expect(isPlainObject(obj2)).toBeFalsy()
  })

  test('isFormData', () => {
    let obj1 = new FormData()
    let obj2 = '234'
    expect(isFormData(obj1)).toBeTruthy()
    expect(isFormData(obj2)).toBeFalsy()
  })

  test('isURLSearchParams', () => {
    let url = new URL('https://example.com?foo=1&bar=2')
    let obj1 = new URLSearchParams(url.search)
    let obj2 = '234'
    expect(isURLSearchParams(obj1)).toBeTruthy()
    expect(isURLSearchParams(obj2)).toBeFalsy()
  })
})
