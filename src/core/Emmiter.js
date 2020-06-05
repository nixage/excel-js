export class Emmiter {
  constructor() {
    this.listener = []
  }

  emit(eventName, ...args) {
    const event = this.listener.filter(listener => listener.event === eventName);
    event.forEach( event => {
      event.fn(...args)
    })
  }

  subscribe(eventName, fn) {
    this.listener.push({event: eventName, fn});
    return {
      unsubscribe: () => {
        this.listener = this.listener.filter(el => el.event !== eventName);
      }
    }
  }
}
