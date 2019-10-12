import { transformRequest, transformResponse } from '../../src/utils/data'

describe('utils: data', () => {
  test('transformRequest obj data', () => {
    let objData = {
      params: 123
    }
    expect(transformRequest(objData)).toBe(JSON.stringify(objData))
  })
  test('transformRequest not obj data', () => {
    let data = new Blob()
    expect(transformRequest(data)).toBe(data)
  })

  /**
   * todo 老是搞不准
   */
  // test('transformResponse string data', () => {
  //   let data = {
  //     a: 123
  //   }

  //   expect(transformRequest(data)).toEqual("{\"a\": 123}")
  // })
  test('transformResponse string data', () => {
    const data = '{a: 2}'
    expect(transformResponse(data)).toBe('{a: 2}')
  })

  test('transformResponse no string data', () => {
    let data = new Blob()
    expect(transformResponse(data)).toBe(data)
  })
})
