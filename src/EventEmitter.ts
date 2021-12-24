/**
 * @class EventEmitter
 * @description
 * 이벤트를 전달하기 위한 클래스입니다.
 */
export class EventEmitter {
  constructor(private _listeners: { [key: string]: Function[] } = {}) {
    this._listeners = {};
  }

  on(eventName: string, func: Function) {
    if (!this._listeners[eventName]) {
      this._listeners[eventName] = [];
    }

    if (!func) {
      return;
    }

    if (func instanceof Function) {
      this._listeners[eventName].push(func);
    }
  }

  emit(eventName: string, ...args: any[]) {
    if (!this._listeners[eventName]) {
      return;
    }

    this._listeners[eventName].forEach((func) => {
      if (!(func instanceof Function)) {
        console.warn("호출된 이벤트 리스너가 함수가 아닙니다.");
        return;
      }
      func(...args);
    });
  }
}
