import { Executuor } from "../core/component-executor";

export function getWindowNameBoxCommand(): Executuor {
  return () => {
    const _Window_NameBox_initialize = Window_NameBox.prototype
      .initialize as () => void;
    Window_NameBox.prototype.initialize = function () {
      _Window_NameBox_initialize.call(this);

      this._isRight = false;
    };

    Window_NameBox.prototype.setName = function (name) {
      if (name.includes(":right")) {
        name = name.replace(":right", "");
        this._isRight = true;
      } else {
        this._isRight = false;
      }

      if (this._name !== name) {
        this._name = name;
        this.refresh();
      }
    };

    //============================================================================
    // Window_NameBox
    //============================================================================
    Window_NameBox.prototype.updatePlacement = function () {
      this.width = this.windowWidth();
      this.height = this.windowHeight();
      const messageWindow = this._messageWindow;
      if ($gameMessage.isRTL() || this._isRight) {
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
