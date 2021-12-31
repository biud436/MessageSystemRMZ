interface DataLinkSet {
    callbackFunction: Function;
    active: boolean;
}

/**
 * @class ComponentExecutor
 * @author biud436
 */
export class ComponentExecutor {
    public static INSTANCE: ComponentExecutor = new ComponentExecutor();
    private _components: Record<string, DataLinkSet> = {};

    public static getInstance(): ComponentExecutor {
        return ComponentExecutor.INSTANCE;
    }

    public add(name: string, func: Function): ComponentExecutor {
        if (name === "") {
            let startChar = 97;
            let endChar = 122;
            let len = 7;

            for (let i = 0; i < len; i++) {
                name += String.fromCharCode(
                    Math.floor(Math.random() * (endChar - startChar)) +
                        startChar
                );
            }
        }

        this._components[name] = <DataLinkSet>{
            callbackFunction: func,
            active: false,
        };

        return this;
    }

    public wrap(name: string, func: Function): ComponentExecutor {
        return this.add(name, func);
    }

    public get(name: string): Function {
        const prop = this._components[name];

        return prop.callbackFunction;
    }

    public active(name: string): ComponentExecutor {
        const prop = this._components[name];

        prop.active = true;

        return this;
    }

    public deactive(name: string): ComponentExecutor {
        const prop = this._components[name];

        prop.active = false;

        return this;
    }

    public ready(name: string): ComponentExecutor {
        return this.active(name);
    }

    public executeAll() {
        for (const key in this._components) {
            const prop = this._components[key];

            if (prop.active) {
                const currentCallback = this.get(key);

                if (currentCallback instanceof Function) {
                    currentCallback();
                }
            }
        }
    }
}
