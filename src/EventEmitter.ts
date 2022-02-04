// 함수 타입
type FunctionLike = Function;
// 이벤트 키 타입
type EventKey = string;

/**
 * 이벤트 리스터를 정의합니다.
 */
type VMEventListener = { [key: EventKey]: Function[] };

/**
 * @class EventEmitter
 * @description
 * 이벤트를 전달하기 위한 클래스입니다.
 */
export class EventEmitter {
    constructor(private _listeners: VMEventListener = {}) {
        this._listeners = {};
    }

    /**
     * 호출할 이벤트를 등록합니다.
     *
     * @param eventName 호출할 이벤트 명
     * @param func
     * @returns
     */
    on(eventName: string, func: FunctionLike) {
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

    /**
     * 등록된 이벤트를 호출합니다.
     *
     * @param eventName 호출할 이벤트 명
     * @param args
     * @returns
     */
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
