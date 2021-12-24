import { EventEmitter } from "./EventEmitter";

/**
 * @class Component
 * @description
 * 컴포넌트를 구현하기 위한 클래스입니다.
 */
export class Component extends EventEmitter {
  constructor(props: { [key: string]: any }) {
    super();
    this.init(props);
  }

  init(props: { [key: string]: any }) {
    this.on("ready", () => this.onReady(props));
    this.on("mounted", () => this.mounted(props));
    this.on("destroy", () => this.onDestroy());
  }

  ready() {
    this.emit("ready");
  }

  destroy() {
    this.emit("destroy");
  }

  execute() {
    this.emit("mounted");
  }

  onReady(props: { [key: string]: any }) {}
  onDestroy() {}
  mounted(props: { [key: string]: any }) {}
}
