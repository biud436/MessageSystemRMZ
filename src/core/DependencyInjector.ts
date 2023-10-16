import { Rectangle } from "pixi.js";
import { BalloonWindowTransformComponent } from "../components/balloon-window-transform.component";
import { BaseComponent } from "../components/base.component";
import { Component } from "./component";
import { NameWindowPositionComponent } from "../components/name-window-position.component";

export type BaseComponentName =
  | "NameWindowPositionComponent"
  | "BalloonWindowTransformComponent";

export interface Class<T> {
  new (...args: any[]): T;
}

export type InjectFunctionWithInfer = <
  R = InstanceType<new (rect: Rectangle) => Window_Message>
>(
  messageWindow: R
) => BaseComponent;

/**
 * @function getComponentValue
 * @param item
 * @param key
 * @returns
 */
export function getComponentValue<T, K extends keyof T>(item: T, key: K): T[K] {
  return item[key];
}

/**
 * @static
 * @class DependencyInjector
 * @description
 * This class allows you to inject components that needs to execute a method that has a certain dependency in the RPG Maker MZ.
 * 또한 해당 컴포넌트를 안전한 샌드박스 환경에서 실행시키기 위해 사용됩니다.
 * 샌드박스 환경이라함은 MZ에서도 오류 없이 안전하게 동작한다는 것을 의미합니다.
 */
export class DependencyInjector {
  public static COMPONENTS?: [
    BalloonWindowTransformComponent,
    NameWindowPositionComponent
  ];

  public static _components: { [key: string]: Component } = {};
  private static _isDirty: Boolean = false;

  private static _messageWindow?: Window_Message | undefined;

  public static injectMessageWindow(messageWindow: Window_Message) {
    // 주입할 메시지 윈도우 클래스의 인스턴스를 가져옵니다.
    DependencyInjector._messageWindow = messageWindow;
    DependencyInjector.inject(messageWindow);
  }

  public static ejectMessageWindow() {
    if (DependencyInjector._isDirty) {
      DependencyInjector._messageWindow = undefined;
      DependencyInjector.COMPONENTS = undefined;
      DependencyInjector._isDirty = false;
    }
  }

  /**
   * inject all components inside the sandbox environment.
   *
   * @param messageWindow Specify the message window.
   * @returns void
   */
  private static inject(messageWindow: Window_Message): void {
    if (DependencyInjector._isDirty) {
      console.log("components are already injected");
      return;
    }

    // 컴포넌트에 메시지 윈도우를 주입합니다.
    DependencyInjector.COMPONENTS = [
      new BalloonWindowTransformComponent({ messageWindow }),
      new NameWindowPositionComponent({ messageWindow }),
    ];

    DependencyInjector._isDirty = true;
  }

  /**
   * get the component by name.
   *
   * @param name Specify the component name
   * @returns Component
   */
  public static getComponent<R extends BaseComponentName>(
    name: R
  ): BalloonWindowTransformComponent | NameWindowPositionComponent | undefined {
    const items = DependencyInjector.COMPONENTS!.filter((e) => {
      return e instanceof DependencyInjector.getComponentClass(name);
    });

    return items.pop();
  }

  static getComponentClass(name: BaseComponentName): typeof BaseComponent {
    switch (name) {
      case "BalloonWindowTransformComponent":
        return BalloonWindowTransformComponent;
      case "NameWindowPositionComponent":
        return NameWindowPositionComponent;
      default:
        return BaseComponent;
    }
  }

  public static ready() {
    if (DependencyInjector.COMPONENTS) {
      DependencyInjector.COMPONENTS.forEach((component) => {
        component.ready();
      });
    }
  }
}
