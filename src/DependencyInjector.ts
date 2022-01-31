import { Rectangle } from "pixi.js";
import { BalloonWindowTransformComponent } from "./BalloonWindowTransformComponent";
import { BaseComponent } from "./BaseComponent";
import { Component } from "./Component";
import { NameWindowPositionComponent } from "./NameWindowPositionComponent";

type BaseComponentName =
    | "NameWindowPositionComponent"
    | "BalloonWindowTransformComponent";

interface Class<T> {
    new (...args: any[]): T;
}

/**
 * 13만원 짜리 강의를 듣고 영감을 받아 만든 타입.
 */
type InjectFunctionWithInfer = <
    R = InstanceType<new (rect: Rectangle) => Window_Message>
>(
    messageWindow: R
) => InstanceType<new (messageWindow: R) => Component>;

/**
 * 13만원 짜리 강의를 듣고 만든 타입. 그만한 가치가 있나.
 * @function getComponentValue
 * @param item
 * @param key
 * @returns
 */
function getComponentValue<T, K extends keyof T>(item: T, key: K): T[K] {
    return item[key];
}

/**
 * @static
 * @class DependencyInjector
 * @description
 * 이 클래스는 MZ에서 MV에 의존성을 갖는 메소드를 실행하는데 필요한 컴포넌트를 주입합니다.
 * 또한 해당 컴포넌트를 안전한 샌드박스 환경에서 실행시키기 위해 사용됩니다.
 * 샌드박스 환경이라함은 MZ에서도 오류 없이 안전하게 동작한다는 것을 의미합니다.
 */
export class DependencyInjector {
    public static COMPONENTS: Array<InjectFunctionWithInfer> = [];

    public static _components: { [key: string]: Component } = {};
    private static _isDirty: Boolean = false;

    /**
     * inject all components inside the sandbox environment.
     *
     * @param messageWindow Specify the message window.
     * @returns void
     */
    public static inject(messageWindow: Window_Message): void {
        if (this._isDirty) {
            console.log("components are already injected");
            return;
        }

        if (DependencyInjector.COMPONENTS) {
            DependencyInjector.COMPONENTS.forEach(
                (createFunction: InjectFunctionWithInfer, i, a) => {
                    createFunction(messageWindow);
                }
            );
        }

        this._isDirty = true;
    }

    /**
     * get the component by name.
     *
     * @param name Specify the component name
     * @returns Component
     */
    public static getComponent<R extends BaseComponentName>(name: R) {
        return getComponentValue(DependencyInjector._components, name);
    }

    public static ready() {
        for (let name in this._components) {
            this._components[name].emit("ready");
        }
    }
}
