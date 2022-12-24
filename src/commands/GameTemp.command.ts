import { Executuor } from "../core/ComponentExecutor";

export function getGameTempCommand(): Executuor {
    return () => {
        //============================================================================
        // Game_Temp
        //============================================================================
        Game_Temp.prototype.setMSHeightFunc = function (func) {
            this._callMSHeightFunc = func;
        };

        Game_Temp.prototype.setMaxLine = function (n) {
            if (this._callMSHeightFunc) this._callMSHeightFunc(n);
        };
    };
}
