import { Executuor } from "../core/component-executor";
import { MessageDesc } from "../core/message-desc";
import { Color } from "../core/rs2";

export function getWindowBaseCommand(): Executuor {
  return () => {
    //============================================================================
    // Window_Base
    //============================================================================
    Window_Base.prototype.obtainEscapeCode = function (textState) {
      const regExp = RS.MessageSystem.Reg.defaultEscapeCode;
      const arr = regExp.exec(textState.text.slice(textState.index));
      if (arr) {
        textState.index += arr[0].length;
        return arr[0].toUpperCase();
      } else {
        return "";
      }
    };

    /**
     * 확장된 색상 변경 텍스트 코드 처리
     * \색[빨강]과 웹색상 처리를 위한 정규 표현식 처리
     * @param {}} textState
     */
    Window_Base.prototype.obtainNameColor = function (textState) {
      const arr = /\[(.+?)\]/gi.exec(textState.text.slice(textState.index));
      if (arr) {
        textState.index += arr[0].length;
        return Color.gmColor(arr[1]);
      } else {
        return ColorManager.textColor(0);
      }
    };

    Window_Base.prototype.changeTextColor = function (color) {
      const c = parseInt(color);
      // 색상 코드가 숫자인 경우
      if (c > 0 && c < 32) {
        color = ColorManager.textColor(color);
      }
      // if (!this._isUsedTextWidthEx) {
      this.contents.textColor = color;
      // }
    };

    const alias_Window_Base_processEscapeCharacter =
      Window_Base.prototype.processEscapeCharacter;
    Window_Base.prototype.processEscapeCharacter = function (code, textState) {
      const tcGroup = RS.MessageSystem.TextCodes.ENUM;
      const textCode = RS.MessageSystem.TextCodes.Main;
      switch (code) {
        case "C":
          this.changeTextColor(
            this.textColor(<number>this.obtainEscapeParam(textState))
          );
          break;
        case textCode[tcGroup.COLOR]:
          this.changeTextColor(this.obtainNameColor(<TextState>textState));
          break;
        case "I":
        case textCode[tcGroup.ICON]:
          this.processDrawIcon(
            <number>this.obtainEscapeParam(textState),
            textState
          );
          break;
        case "{":
        case textCode[tcGroup.INCREASE]:
          this.makeFontBigger();
          break;
        case "}":
        case textCode[tcGroup.DECREASE]:
          this.makeFontSmaller();
          break;
        case "AEND":
          $gameMessage.clearAlignLast();
          break;
        default:
          alias_Window_Base_processEscapeCharacter.call(this, code, textState);
          break;
      }
    };

    const alias_loadWindowskin = Window_Base.prototype.loadWindowskin;
    Window_Base.prototype.loadWindowskin = function () {
      alias_loadWindowskin.call(this);
      this.windowskin.addLoadListener(() => {
        Color.baseColor = ColorManager.textColor(0);
      });
    };

    Window_Base.prototype.getFontFace = function () {
      const langCode =
        RS.MessageSystem.Params.langCode || navigator.language.slice(0, 2);
      const fonts = RS.MessageSystem.Params.fonts[langCode];
      if (fonts) {
        return fonts;
      } else {
        return RS.MessageSystem.Params.fonts.default;
      }
    };

    Window_Base.prototype.drawTextEx = function (text, x, y, width) {
      this.save();
      this.resetFontSettings();
      const textState = this.createTextState(text, x, y, width);
      this.processAllText(textState);
      this.restore();
      return textState.outputWidth;
    };

    // Window_Base.prototype.processAllText = function (textState) {
    //     this._isUsedTextWidthEx = !textState.drawing;
    //     while (textState.index < textState.text.length) {
    //         this.processCharacter(textState);
    //     }
    //     this.flushTextState(textState);
    // };
    Window_Base.prototype.makeFontSmaller = function () {
      if (this.contents.fontSize >= RS.MessageSystem.Params.minFontSize) {
        this.contents.fontSize -= 12;
      }
    };

    Window_Base.prototype.resetFontSettings = function () {
      this.contents.fontFace = this.getFontFace();
      this.contents.fontSize = RS.MessageSystem.Params.fontSize;
      this.contents.fontBold = false;
      this.contents.fontItalic = false;
      this.contents.outlineWidth = RS.MessageSystem.Params.defaultOutlineWidth;
      this.contents.outlineColor = RS.MessageSystem.Params.defaultOutlineColor;

      this.contents.fontGradient = false;
      this.contents.highlightTextColor = null;
      this.resetTextColor();
    };

    Window_Base.prototype.makeFontBigger = function () {
      if (this.contents.fontSize <= RS.MessageSystem.Params.maxFontSize) {
        this.contents.fontSize += 12;
      }
    };

    Window_Base.prototype.save = function () {
      this._messageDesc = new MessageDesc();
      this._messageDesc.save(this);
      console.log(this._messageDesc);
    };

    Window_Base.prototype.restore = function () {
      if (!this._messageDesc) return;
      this._messageDesc.restore(this);
      this._messageDesc = undefined;
    };

    const alias_Window_Base_convertEscapeCharacters =
      Window_Base.prototype.convertEscapeCharacters;
    Window_Base.prototype.convertEscapeCharacters = function (text) {
      const regGroup = RS.MessageSystem.Reg.Group;
      const tcGroup = RS.MessageSystem.TextCodes.ENUM;
      const textCode = RS.MessageSystem.TextCodes.Main;

      text = alias_Window_Base_convertEscapeCharacters.call(this, text);
      text = text.replace(
        regGroup[tcGroup.VAR],
        function (...args: any[]): string {
          return $gameVariables.value(parseInt(<string>args[1])).toString();
        }.bind(this)
      );
      text = text.replace(
        regGroup[tcGroup.VAR],
        function (...args: any[]) {
          return $gameVariables.value(parseInt(args[1])).toString();
        }.bind(this)
      );
      text = text.replace(regGroup[tcGroup.PLAYER], (...args: any[]) => {
        return this.actorName(parseInt(args[1]));
      });
      text = text.replace(regGroup[tcGroup.PARTY_MEMBER], (...args: any[]) => {
        return this.partyMemberName(parseInt(args[1]));
      });
      text = text.replace(
        regGroup[tcGroup.NUM],
        function (...args: any[]) {
          return args[1].toComma();
        }.bind(this)
      );
      text = text.replace(regGroup[tcGroup.GOLD], TextManager.currencyUnit);
      text = text.replace(
        regGroup[tcGroup.CLASSES],
        function (...args: any[]) {
          return $dataClasses[parseInt(args[1])].name || "";
        }.bind(this)
      );
      text = text.replace(
        regGroup[tcGroup.ITEM],
        function (...args: any[]) {
          return $dataItems[parseInt(args[1])].name || "";
        }.bind(this)
      );
      text = text.replace(
        regGroup[tcGroup.WEAPON],
        function (...args: any[]) {
          return $dataWeapons[parseInt(args[1])].name || "";
        }.bind(this)
      );
      text = text.replace(
        regGroup[tcGroup.ARMOR],
        function (...args: any[]) {
          return $dataArmors[parseInt(args[1])].name || "";
        }.bind(this)
      );
      text = text.replace(
        regGroup[tcGroup.ENEMY],
        function (...args: any[]) {
          return $dataEnemies[parseInt(args[1])].name || "";
        }.bind(this)
      );
      text = text.replace(
        regGroup[tcGroup.STATE],
        function (...args: any[]) {
          return $dataStates[parseInt(args[1])].name || "";
        }.bind(this)
      );
      text = text.replace(
        regGroup[tcGroup.SKILL],
        function (...args: any[]) {
          return $dataSkills[parseInt(args[1])].name || "";
        }.bind(this)
      );
      text = text.replace(
        regGroup[tcGroup.ALIGN_LEFT],
        function () {
          return "\x1b" + textCode[tcGroup.ALIGN] + "[0]";
        }.bind(this)
      );
      text = text.replace(
        regGroup[tcGroup.ALIGN_CENTER],
        function () {
          return "\x1b" + textCode[tcGroup.ALIGN] + "[1]";
        }.bind(this)
      );
      text = text.replace(
        regGroup[tcGroup.ALIGN_RIGHT],
        function () {
          return "\x1b" + textCode[tcGroup.ALIGN] + "[2]";
        }.bind(this)
      );
      text = text.replace(regGroup[tcGroup.ALIGN], (...args: any[]) => {
        if (!this._isUsedTextWidthEx) {
          $gameMessage.setAlign(Number(args[1] || 0));
        }
        return "";
      });
      text = text.replace(
        /<\/LEFT>|<\/CENTER>|<\/RIGHT>/gi,
        function () {
          return regGroup[tcGroup.ALIGN_CLEAR].source;
        }.bind(this)
      );
      return text;
    };

    /**
     * @deprecated
     */
    Window_Base.prototype.textPadding = function () {
      return this.itemPadding();
    };

    Window_Base.prototype.newLineX = function (textState) {
      return this.textPadding();
    };

    Window_Base.prototype.processAlign = function (textState) {
      textState = textState || this._textState;

      const isArabic = textState.rtl;

      if (isArabic) {
        return;
      }

      if (textState.drawing) {
        switch ($gameMessage.getAlign()) {
          case 0:
            this.setAlignLeft(textState);
            break;
          case 1:
            this.setAlignCenter(textState);
            break;
          case 2:
            this.setAlignRight(textState);
            break;
        }
      }
    };

    const alias_Window_Base_processNewLine_align =
      Window_Base.prototype.processNewLine;
    Window_Base.prototype.processNewLine = function (textState) {
      alias_Window_Base_processNewLine_align.call(this, textState);
      this.processAlign(<TextState>textState);
    };

    Window_Base.prototype.setAlignLeft = function (textState) {
      textState.x = this.newLineX(textState);
      textState.startX = textState.x;
    };

    Window_Base.prototype.setAlignCenter = function (textState) {
      textState.x =
        (this.newLineX(textState) + this.contentsWidth()) / 2 -
        textState.px / 2;
      textState.startX = textState.x;
    };

    Window_Base.prototype.setAlignRight = function (textState) {
      // TODO: padding 값을 고려하지 않았습니다.
      textState.x = this.contentsWidth() - textState.outputWidth;
      textState.startX = textState.x;
    };
  };
}
