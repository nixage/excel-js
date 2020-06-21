import {createStore} from './createStore'

const initState = {
  count: 0
}

const reducer = (state = initState, action) => {
  if (action.type === 'ADD') {
    return {...state, count: state.count + 1}
  }
  return {...state}
}

describe('createStore Test', () => {
  let store
  let handler
  beforeEach( () => {
    store = createStore( reducer, initState)
    handler = jest.fn()
  })

  test('store shoud be defined', () => {
    expect(store).toBeDefined()
  })

  test('store return object', () => {
    expect(store).toBeInstanceOf(Object)
  })

  test('state shoud be changed', () => {
    store.dispatch({type: 'ADD'})
    
    expect(store.getState()).not.toEqual(initState)
    expect(store.getState().count).toBe(1)
  })

  test('should return default state', () => {
    expect(store.getState()).toEqual(initState)
  })

  test('shoud call subscriber func', () => {
    store.subscribe(handler)
    store.dispatch({type: 'ADD'})

    expect(handler).toHaveBeenCalled()
  })

  test('should NOT call sub if unsubscribe', () => {
    const sub = store.subscribe(handler)
    sub.unsubscribe()
    store.dispatch({type: 'ADD'})
    expect(handler).not.toHaveBeenCalled()
  })
})

