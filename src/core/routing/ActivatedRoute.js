export class ActivatedRoute {
  static get path() {
    return window.location.hash.slice(1)
  }
  static get param() {
    return window.location.hash.split('/')[1]
  }
}
