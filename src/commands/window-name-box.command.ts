import { Executuor } from "../core/component-executor";

enum TextAlignment {
  RIGHT = "right",
  OPACITY0 = "opacity0",
  LEFT = "left",
  CENTER = "center",
  DEFAULT_OPACITY = "defaultOpacity",
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
        defaultOpacity: false,
      };
    };

    Window_NameBox.prototype.setName = function (name) {
      this.clearFlags();

      if (!name) {
        this._name = "";
        this.refresh();
        return;
      }

      const [nameRaw, nameCommand] = name.split(":");

      switch (nameCommand) {
        case TextAlignment.RIGHT:
          this._flag.isRight = true;
          break;
        case TextAlignment.OPACITY0:
          this._flag.isOpacity0 = true;
          break;
        case TextAlignment.LEFT:
          this._flag.isLeft = true;
          break;
        case TextAlignment.CENTER:
          this._flag.isCenter = true;
          break;
        case TextAlignment.DEFAULT_OPACITY:
          this._flag.defaultOpacity = true;
          break;
      }

      if (this._name !== nameRaw) {
        this._name = nameRaw;
        this.refresh();
      }
    };

    Window_NameBox.prototype.clearFlags = function () {
      this._flag = {
        isRight: false,
        isOpacity0: false,
        isCenter: false,
        isLeft: false,
        defaultOpacity: false,
      };
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

      if (this._flag.defaultOpacity) {
        this.opacity = this.translucentOpacity();
      } else if (this._flag.isOpacity0) {
        this.opacity = 0;
      }
    };
  };
}
