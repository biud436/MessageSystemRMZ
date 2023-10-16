import { Executuor } from "../core/component-executor";

export function getWindowNameBoxCommand(): Executuor {
  return () => {
    //============================================================================
    // Window_NameBox
    //============================================================================
    Window_NameBox.prototype.updatePlacement = function () {
      this.width = this.windowWidth();
      this.height = this.windowHeight();
      const messageWindow = this._messageWindow;
      if ($gameMessage.isRTL()) {
        this.x = messageWindow.x + messageWindow.width - this.width;
      } else {
        this.x = messageWindow.x;
      }
      if (messageWindow.y > 0) {
        this.y = messageWindow.y - this.height;
      } else {
        this.y = messageWindow.y + messageWindow.height;
      }
    };
  };
}
