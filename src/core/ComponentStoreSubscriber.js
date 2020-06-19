export class ComponentStoreSubscriber {
  constructor(store) {
    this.store = store;
    this.subsrtibe = null;
    this.prevState = {}
  }

  componentSubscribe(component) {
    this.prevState = this.store.getState()

    this.subscribe = this.store.subscribe( state => {
      Object.keys(state).forEach( key => {
        if (!isEqual(this.prevState[key], state[key])) {
          component.forEach( comp => {
            if (comp.isWatching(key)) {
              const changes = {[key]: state[key]};
              comp.$storeChange(changes)
            }
          })
        }
      })
      this.prevState = this.store.getState()
    })
  }

  unsubscribeFromStore() {
    this.subsrtibe.unsubscribe()
  }
}

function isEqual(prevState, state) {
  if (typeof prevState === 'object' && typeof state === 'object') {
    return JSON.stringify(prevState) === JSON.stringify(state)
  }
  return prevState === state
}
