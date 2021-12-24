import { BaseComponent } from "./BaseComponent";

/**
 * @static
 * @class DependencyInjector
 * @description
 * 이 클래스는 MZ에서 MV에 의존성을 갖는 메소드를 실행하는데 필요한 컴포넌트를 주입합니다.
 * 또한 해당 컴포넌트를 안전한 샌드박스 환경에서 실행시키기 위해 사용됩니다.
 * 샌드박스 환경이라함은 MZ에서도 오류 없이 안전하게 동작한다는 것을 의미합니다.
 */
export class DependencyInjector {
  public static COMPONENTS: typeof BaseComponent[] = [];

  public static components: { [key: string]: BaseComponent } = {};
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
      DependencyInjector.COMPONENTS.forEach((component) => {
        this.components[component.name] = new component({
          messageWindow,
        });
      });
    }

    this._isDirty = true;
  }

  /**
   * get the component by name.
   *
   * @param name Specify the component name
   * @returns BaseComponent
   */
  public static getComponent<T extends BaseComponent>(name: string): T {
    return <T>this.components[name];
  }
}
