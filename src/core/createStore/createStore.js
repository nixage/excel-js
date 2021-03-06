export function createStore(reducer, initialState = {}) {
  let state = reducer(initialState, {type: 'INIT'});
  let listener = [];

  return {
    subscribe(fn) {
      listener.push(fn)
      return {
        unsubscribe() {
          listener = listener.filter( el => el !== fn)
        }
      }
    },
    dispatch(action) {
      state = reducer(state, action);
      listener.forEach( el => el(state))
    },
    getState() {
      return state
    }

  }
}
