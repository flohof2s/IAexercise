const { Subject } = require('rxjs');

class EventBus {
  constructor() {
    this._subject = new Subject();
  }
  emit(event) {
    this._subject.next(event);
  }
  subscribe(observer) {
    return this._subject.subscribe(observer);
  }
  asObservable() {
    return this._subject.asObservable();
  }
}

module.exports = new EventBus();