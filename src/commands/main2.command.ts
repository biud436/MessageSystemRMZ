import { Color } from "../core/rs2";
import { DependencyInjector } from "../core/dependency-injector";
import { BalloonWindowTransformComponent } from "../components/balloon-window-transform.component";
import ComponentExecutor, { Executuor } from "../core/component-executor";

/**
 * ? Main
 * @description
 * 메인 엔트리 포인트입니다.
 */
export function getMainCommand(): Executuor {
  return () => {
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

    const alias_Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function () {
      alias_Scene_Map_start.call(this);
      ComponentExecutor.getInstance().executeLazyCommandAll();
    };
  };
}
