import { Color } from "../core/RS";
import { DependencyInjector } from "../core/DependencyInjector";
import { BalloonWindowTransformComponent } from "../components/BalloonWindowTransformComponent";
import { Executuor } from "../core/ComponentExecutor";

/**
 * ? Main
 * @description
 * 메인 엔트리 포인트입니다.
 */
export function getMainCommand(): Executuor {
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

        //============================================================================
        // Game_Map
        //============================================================================
        const alias_Game_Map_initialize = Game_Map.prototype.initialize;
        Game_Map.prototype.initialize = function () {
            alias_Game_Map_initialize.call(this);
            this._msgOwner = $gamePlayer;
            this._msgEvent = 0;
        };

        Game_Map.prototype.getMsgOwner = function () {
            return this._msgOwner;
        };

        /**
         * @method setMsgOwner
         * @param o {Game_Event | Game_Player}
         */
        Game_Map.prototype.setMsgOwner = function (o) {
            this._msgOwner = o;
            $gameMessage.setBalloonPatternHeight(this.tileHeight());
        };

        Game_Map.prototype.getMsgEvent = function () {
            return this._msgEvent;
        };

        Game_Map.prototype.setMsgEvent = function (ev) {
            this._msgEvent = ev;
        };

        /// ======================================================================
        /// DI
        /// ======================================================================
        const alias_Scene_Message_associateWindows__enrtyPoint =
            Scene_Message.prototype.associateWindows;
        Scene_Message.prototype.associateWindows = function () {
            alias_Scene_Message_associateWindows__enrtyPoint.call(this);
            const messageWindow = this._messageWindow;
            DependencyInjector.injectMessageWindow(messageWindow);
            DependencyInjector.ready();
        };

        Scene_Message.prototype.messageWindowRect = function () {
            const ww = Graphics.width;
            const wh = this.calcWindowHeight(4, false) + 8;
            const wx = (Graphics.height - ww) / 2;
            const wy = 0;
            return new Rectangle(wx, wy, ww, wh);
        };

        const alias_Scene_Message_terminate = Scene_Message.prototype.terminate;
        Scene_Message.prototype.terminate = function () {
            alias_Scene_Message_terminate.call(this);
            DependencyInjector.ejectMessageWindow();
        };

        RS.MessageSystem.initSystem();

        // ! [DEBUG]
        if (RS.MessageSystem.Params.DEBUG) {
            SceneManager.showDevTools();
            const win = nw.Window.get();
            win.moveTo(window.outerWidth / 3, 153);
        }
    };
}
