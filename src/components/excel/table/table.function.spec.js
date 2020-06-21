import {createRange} from './table.function'

describe('table function', () => {

  test('create range from 1:1 to 2:2', () => {
    const range = createRange({row:1,cell:1}, {row:2,cell:2})
    expect(range).toEqual(expect.arrayContaining(['1:1', '1:2', '2:1', '2:2']))
  })
  test('create range from 2:2 to 1:1', () => {
    const range = createRange({row:2,cell:2}, {row:1,cell:1})
    expect(range).toEqual(expect.arrayContaining(['1:1', '1:2', '2:1', '2:2']))
  })
  test('create range from 1:1 to 1:2', () => {
    const range = createRange({row:1,cell:1}, {row:1,cell:2})
    expect(range).toEqual(expect.arrayContaining(['1:1', '1:2']))
  })
  test('create range from 1:2 to 1:1', () => {
    const range = createRange({row:1,cell:2}, {row:1,cell:1})
    expect(range).toEqual(expect.arrayContaining(['1:1', '1:2']))
  })
  test('create range from 1:1 to 2:1', () => {
    const range = createRange({row:1,cell:1}, {row:2,cell:1})
    expect(range).toEqual(expect.arrayContaining(['1:1', '2:1']))
  })
  test('create range from 2:1 to 1:1', () => {
    const range = createRange({row:2,cell:1}, {row:1,cell:1})
    expect(range).toEqual(expect.arrayContaining(['1:1', '2:1']))
  })
})