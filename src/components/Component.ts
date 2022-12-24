import { EventEmitter } from "../EventEmitter";

export type ComponentProp = {
    messageWindow: Window_Message;
    [key: string]: any;
};

/**
 * @class Component
 * @description
 * 컴포넌트를 구현하기 위한 클래스입니다.
 */
export class Component extends EventEmitter {
    public name?: string;
    private props?: ComponentProp;

    constructor(props: ComponentProp) {
        super();
        this.init(props);
    }

    init(props: ComponentProp) {
        this.props = props;

        this.on("ready", (props: ComponentProp) => this.onReady(props));
        this.on("mounted", (props: ComponentProp) => this.mounted(props));
        this.on("destroy", (props: ComponentProp) => this.onDestroy());
    }

    ready() {
        this.emit("ready", this.props);
    }

    destroy() {
        this.emit("destroy", this.props);
    }

    execute() {
        this.emit("mounted", this.props);
    }

    onReady(props: ComponentProp) {}
    onDestroy() {}
    mounted(props: ComponentProp) {}
}
