import { Executuor } from "../core/component-executor";

enum TextAlignment {
  RIGHT = ":right",
  OPACITY0 = ":opacity0",
  LEFT = ":left",
  CENTER = ":center",
}

export function getWindowNameBoxCommand(): Executuor {
  return () => {
    const _Window_NameBox_initialize = Window_NameBox.prototype
      .initialize as () => void;
    Window_NameBox.prototype.initialize = function () {
      _Window_NameBox_initialize.call(this);

      this._flag = {
        isRight: false,
        isOpacity0: false,
        isCenter: false,
        isLeft: false,
      };
    };

    Window_NameBox.prototype.setName = function (name) {
      // change a name box window position to center.
      if (name.includes(TextAlignment.RIGHT)) {
        name = name.replace(TextAlignment.RIGHT, "");
        this._flag.isRight = true;
      } else {
        this._flag.isRight = false;
      }

      // changes the opacity is to 0.
      if (name.includes(TextAlignment.OPACITY0)) {
        name = name.replace(TextAlignment.OPACITY0, "");
        this._flag.isOpacity0 = true;
      } else {
        this._flag.isOpacity0 = false;
      }

      // changes the name box window position to left.
      if (name.includes(TextAlignment.CENTER)) {
        name = name.replace(TextAlignment.CENTER, "");
        this._flag.isCenter = true;
      } else {
        this._flag.isCenter = false;
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
      if ($gameMessage.isRTL() || this._flag.isRight) {
        this.x = messageWindow.x + messageWindow.width - this.width;
      } else {
        this.x = messageWindow.x;
      }

      if (this._flag.isCenter) {
        this.x = messageWindow.x + (messageWindow.width - this.width) / 2;
      }

      if (messageWindow.y > 0) {
        this.y = messageWindow.y - this.height;
      } else {
        this.y = messageWindow.y + messageWindow.height;
      }
    };
  };
}
