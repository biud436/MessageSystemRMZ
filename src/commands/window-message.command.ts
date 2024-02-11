import { BalloonWindowTransformComponent } from "../components/balloon-window-transform.component";
import { Executuor } from "../core/component-executor";
import { DependencyInjector } from "../core/dependency-injector";
import { Color } from "../core/rs2";

export function getWindowMessageCommand(): Executuor {
  return () => {
    //============================================================================
    // Window_Message
    //============================================================================
    Window_Message.prototype.obtainTextSpeed = function (textState) {
      const arr = /\[(\d+)\]/.exec(textState.text.slice(textState.index));
      if (arr) {
        textState.index += arr[0].length;
        return parseInt(arr[1]);
      } else {
        return 0;
      }
    };

    Window_Message.prototype.obtainGradientText = function (textState) {
      const arr = /^<(.+?)>/.exec(textState.text.slice(textState.index));
      if (arr) {
        textState.index += arr[0].length;
        return String(arr[1]);
      } else {
        return "Empty Text";
      }
    };

    Window_Message.prototype.obtainSoundName = function (textState) {
      const arr = /\<(.+?)\>/.exec(textState.text.slice(textState.index));
      if (arr) {
        textState.index += arr[0].length;
        return String(arr[1]);
      } else {
        return "";
      }
    };

    const alias_Window_Message_processEscapeCharacter =
      Window_Message.prototype.processEscapeCharacter;
    Window_Message.prototype.processEscapeCharacter = function (
      code,
      textState: TextState | string
    ) {
      const tcGroup = RS.MessageSystem.TextCodes.ENUM;
      const textCode = RS.MessageSystem.TextCodes.Main;
      switch (code) {
        case textCode[tcGroup.TEXT_SPEED]:
          $gameMessage.setWaitTime(<number>this.obtainEscapeParam(textState));
          break;
        case textCode[tcGroup.TEXT_SIZE]:
          this.setTextSize(<number>this.obtainEscapeParam(textState));
          break;
        case textCode[tcGroup.OUTLINE_COLOR]:
          this.setStrokeColor(this.obtainNameColor(<TextState>textState));
          break;
        case textCode[tcGroup.INDENT]:
          this.setTextIndent(<TextState>textState);
          break;
        case textCode[tcGroup.OUTLINE_WIDTH]:
          this.setStrokeWidth(
            <number>this.obtainEscapeParam(<TextState>textState)
          );
          break;
        case textCode[tcGroup.BOLD]:
          this.setTextBold(!this.contents.fontBold);
          break;
        case textCode[tcGroup.BOLD_START]:
          this.setTextBold(true);
          break;
        case textCode[tcGroup.BOLD_END]:
          this.setTextBold(false);
          break;
        case textCode[tcGroup.ITALIC]:
          this.setTextItalic(!this.contents.fontItalic);
          break;
        case textCode[tcGroup.ITALIC_START]:
          this.setTextItalic(true);
          break;
        case textCode[tcGroup.ITALIC_END]:
          this.setTextItalic(false);
          break;
        case textCode[tcGroup.GRADIENT]:
          this.setTextGradient(<TextState>textState);
          break;
        case textCode[tcGroup.HIGHLIGHT_TEXT_COLOR]:
          this.setHighlightTextColor(
            this.obtainNameColor(<TextState>textState)
          );
          break;
        case textCode[tcGroup.TAB]:
          (<TextState>textState).x += Number(
            this.textWidth("A") * RS.MessageSystem.Params.TabSize
          );
          break;
        case textCode[tcGroup.CARRIAGE_RETURN]:
          (<TextState>textState).x = Number(
            (textState as TextState).startX || 0
          );
          if (!this._isUsedTextWidthEx) this.startWait(1);
          break;
        case textCode[tcGroup.PLAY_SE]:
          if (!this._isUsedTextWidthEx)
            this.playSe(this.obtainSoundName(<TextState>textState));
          break;
        case textCode[tcGroup.SHOW_PICTURE]:
          if (this._isUsedTextWidthEx) break;
          this.showPicture(this.obtainSoundName(<TextState>textState));
          this.startWait(15);
        case textCode[tcGroup.HIDE_PICTURE]:
          if (this._isUsedTextWidthEx) break;
          this.erasePicture(<number>this.obtainEscapeParam(textState));
          this.startWait(15);
        case textCode[tcGroup.FACE]:
          if (this._isUsedTextWidthEx) break;
          const params = this.obtainSoundName(<TextState>textState).split(",");
          // this.redrawFaceImage(textState, params[0], params[1], 0, 0);
          this.startWait(1);
          break;
        default:
          alias_Window_Message_processEscapeCharacter.call(
            this,
            code,
            textState
          );
          break;
      }
    };

    Window_Message.prototype.setTextItalic = function (...args) {
      this.contents.fontItalic = args[0];
    };

    Window_Message.prototype.setTextBold = function (...args) {
      this.contents.fontBold = args[0];
    };

    Window_Message.prototype.setTextSize = function (...args) {
      this.contents.fontSize = args[0].clamp(
        RS.MessageSystem.Params.minFontSize,
        RS.MessageSystem.Params.maxFontSize
      );
    };

    Window_Message.prototype.setStrokeWidth = function (...args) {
      this.contents.outlineWidth = args[0];
    };

    Window_Message.prototype.setStrokeColor = function (...args) {
      this.contents.outlineColor = args[0];
    };

    Window_Message.prototype.setTextIndent = function (textState) {
      const value = parseInt(<string>this.obtainEscapeParam(textState));
      textState.x += value;
    };

    Window_Message.prototype.setHighlightTextColor = function (...args: any[]) {
      let color: any = args[0];
      if (color === "null" || color === "없음") {
        color = null;
      }
      this.contents.highlightTextColor = color;
    };

    Window_Message.prototype.setTextGradient = function (textState) {
      // TODO: 여기에서는 텍스트를 그리지 않는다.
      // TODO: 그레디언트 모드임을 명시하고 flush 단계에서 한 번에 그려야 한다 (배경색도 마찬가지이다)
      this.contents.fontGradient = true;

      const arr = /^<(.+?)>/.exec(textState.text.slice(textState.index));

      if (arr) {
        textState.targetX += arr[0].length;
      }
    };

    Window_Message.prototype.playSe = function (seName) {
      const realName = seName.trim();
      const data = <rm.types.AudioParameters>{
        name: realName,
        pan: 0,
        pitch: 100,
        volume: (<any>ConfigManager).seVolume,
      };
      AudioManager.playSe(data);
    };

    Window_Message.prototype.showPicture = function (param: string) {
      const raw = param.split(",").map((e) => {
        return e.trim();
      });

      let params = [
        Number(raw[0]),
        raw[1],
        Number(raw[2]),
        Number(raw[3]),
        Number(raw[4]),
        100,
        100,
        255,
        0,
      ];
      let ret = true;

      // 모든 요소 검증
      if (params) {
        params.forEach((e, i, a) => {
          if (e === undefined || e === null) {
            ret = false;
          }
        });
      }
      // 검증 결과가 참이라면 그림 표시
      if (ret) {
        $gameScreen.showPicture.apply($gameScreen, <any>params);
        return true;
      }
      return false;
    };

    Window_Message.prototype.erasePicture = function (picId) {
      if (typeof picId !== "number") return;
      $gameScreen.erasePicture(picId);
    };

    // 구조가 변경된 메서드
    Window_Message.prototype.resetFontSettings = function () {
      Window_Base.prototype.resetFontSettings.call(this);

      // pause 아이콘 표시 위치 초기화
      if (this._pauseSignSprite) {
        this._pauseSignSprite.move(this._width / 2, this._height);
        this._pauseSignSprite.scale.y = 1;
      }

      $gameMessage.setWaitTime(RS.MessageSystem.Params.textSpeed);
    };

    // 새로 추가된 메서드
    Window_Message.prototype.resetGradient = function (textState) {
      this.contents.fontGradient = false;
      textState.targetX = textState.x;
    };

    // 폰트 사이즈 설정 메서드는 MZ에서 없다
    Window_Message.prototype.numVisibleRows = function () {
      return RS.MessageSystem.Params.numVisibleRows;
    };

    /**
     * Create text state included px and py values for text word wrapping.
     */
    const alias_Window_Message_createTextState =
      Window_Message.prototype.createTextState;
    Window_Message.prototype.createTextState = function (text, x, y, width) {
      let textState = alias_Window_Message_createTextState.call(
        this,
        text,
        x,
        y,
        width
      );

      const px = textState.x;
      const py = textState.y;

      // mixin
      Object.assign(textState, {
        px,
        py,
      });

      return textState;
    };

    Window_Message.prototype.processWordWrap = function (
      textState,
      w,
      width,
      isValid
    ) {
      const px = <Required<number>>textState.px;

      if (Math.floor(px + w * 2) > width) {
        if (isValid) {
          this.processNewLine(textState);
          if (this.needsNewPage(textState)) {
            this.startPause();
          }
        }
      }
    };

    const alias_Window_Message_processNewLinePW =
      Window_Message.prototype.processNewLine;
    Window_Message.prototype.processNewLine = function (textState) {
      // 내부 버퍼의 위치를 시작 지점으로 초기화한다.
      (<TextState>textState).px = textState.startX || (<TextState>textState).x;

      // background buffer 초기화
      if (this._backBuffer && this._backBuffer.isDirty) {
        const backTextState = this._backBuffer.textState;
      }

      alias_Window_Message_processNewLinePW.call(this, textState);
    };

    /**
     * ! Override
     * @param {Object} textState
     */
    Window_Message.prototype.processCharacter = function (textState) {
      const c = textState.text[textState.index++];
      if (c.charCodeAt(0) < 0x20) {
        this.flushTextState(textState);
        this.processControlCharacter(textState, c);
      } else {
        textState.buffer += c;

        // 내부 버퍼의 위치를 누적 계산한다.
        textState.px += this.textWidth(c);
      }
    };

    const alias_Window_Message_processCharacter =
      Window_Message.prototype.processCharacter;
    Window_Message.prototype.processCharacter = function (textState) {
      // 이전 텍스트의 길이를 계산한다.
      let isDirty = false;
      const preBuffer = textState.buffer || "";
      let preLen = preBuffer.length;

      alias_Window_Message_processCharacter.call(this, textState);

      // 새로운 텍스트가 이후에 있는가?
      // 그게 문자인지 제어 문자인지는 이 로직에선 알 수 없다.
      const postBuffer = textState.buffer || "";
      const postLen = postBuffer.length;
      if (preLen !== postLen) {
        isDirty = true;
      }

      if (isDirty) {
        // 끝에 있는 글자를 가지고 온다.
        // 하지만 제어 문자인지는 확인하지 않는다.
        // 제어 문자 여부는 메인 로직에서 판단하게 둔다.
        const c = textState.buffer.substr(textState.buffer.length - 1, 1);
        this.processNormalCharacterProxy(textState, c);
      }
    };

    /**
     * MZ에서는 processNormalCharacter의 구현이 없다.
     * 하지만, 자동 개행이나 사운드 재생 그리고 배경색 묘화를 위해 위치 계산이 필요하다.
     * 이 때문에 추가한 메서드이며, 텍스트의 묘화를 하진 않는다.
     * @param {*} textState
     * @param {*} c
     */
    Window_Message.prototype.processNormalCharacterProxy = function (
      textState,
      c
    ) {
      // MZ에서는 텍스트 상태(textState)가 다음 제어 문자가 등장해야 flush 처리된다.
      // 따라서 이곳에서는 텍스트가 그려질 수 없다.
      const w = this.textWidth(c);
      let width = this.contentsWidth();

      // 일반 메시지 모드에서만 동작 한다.
      const isNormalMessageWindow = $gameMessage.getBalloon() === -2;
      const isRealDrawingMode = textState.drawing;
      let isValid =
        isNormalMessageWindow &&
        isRealDrawingMode &&
        RS.MessageSystem.Params.isParagraphMinifier;

      // 소수점 자리를 버려야 정확히 계산된다.
      this.processWordWrap(textState, w, width, isValid);

      const contents = this.contents;
      const faceName = $gameMessage.faceName();

      // if the faceName is not empty and the face direction is to right?
      if (faceName !== "") {
        width = contents.width - ImageManager.faceWidth;
        isValid = RS.MessageSystem.Params.faceDirection === 2;
        this.processWordWrap(textState, w, width, isValid);
      }

      // 배경색의 위치를 계산하고 비트맵 인스턴스를 생성한다.
      const isValidTextBackground = contents.highlightTextColor !== null;
      if (isValidTextBackground) {
        const contentW = Math.floor(w * 2) + 1.0;
        const contentH = this.lineHeight();

        // 내부 버퍼의 텍스트 위치를 받아옵니다 (글자 하나의 버퍼 위치)
        const { px, py } = <TextState>textState;

        // 배경 버퍼의 생성
        this._backBuffer = {
          buffer: new Bitmap(contentW, contentH),
          textState: textState,
          isDirty: false,
          x: px,
          y: py,
        };

        // 배경 버퍼는 내부 버퍼의 초기 위치로부터 계산된다.
        this._backBuffer.buffer.fillAll(<string>contents.highlightTextColor);
        // 이 플래그가 활성화되어있다면 flushTextState에서 그리기 처리를 해야 한다.
        this._backBuffer.isDirty = true;
        this._backBuffer.textState = textState;
      }
    };

    const alias_Window_Message_flushTextState =
      Window_Message.prototype.flushTextState;
    Window_Message.prototype.flushTextState = function (textState: TextState) {
      const isDrawing = textState.drawing; // !this._isUsedTextWidthEx와 같은 효과
      const isSlowTextMode =
        !this._showFast && !this.isEndOfText(textState) && isDrawing;
      const isDrawingTextBackground =
        isDrawing && this._backBuffer && this._backBuffer.isDirty;

      if (isSlowTextMode) {
        this.startWait($gameMessage.getWaitTime() || 0);
      }

      // 텍스트 코드를 만나면, flush가 시작되는데 배경색의 시작 라인이 달라지면,
      // 다음 라인까지 배경색이 제대로 그려지지 않게 됩니다.
      // 이는 MZ에서는 버퍼 방식이기 때문에 한 글자씩 배경색이 그려지지 않기 때문입니다.
      // 따라서 라인이 달라질 때, flushBackground를 해줘야 합니다.
      if (isDrawingTextBackground && isDrawing) {
        const backBuffer = this._backBuffer;
        const bitmap = backBuffer.buffer;
        const backTextState = backBuffer.textState!;

        if (backTextState.py !== textState.y) {
          this._backBuffer.isDirty = false;
          alias_Window_Message_flushTextState.call(this, textState);
          return;
        }
        let tx = backBuffer.x;
        let ty = backBuffer.y;
        const x = textState.x;
        const y = textState.y;
        const w = Math.min(this.innerWidth, Math.floor(bitmap.width));
        const h = Math.min(this.innerHeight, Math.floor(bitmap.height));

        this._backBuffer.isDirty = false;
      }

      alias_Window_Message_flushTextState.call(this, textState);
    };

    /**
     * 새로운 라인이 시작되기 전에 이전 라인에 그려야 할 배경색을 마저 그리는 기능입니다.
     */
    Window_Message.prototype.flushTextBackgbround = function (
      textState: TextState
    ) {};

    Window_Message.prototype.updateBigFaceOpacity = function () {
      if (!this._faceContents) {
        return;
      }
      let { faceOpacity } = RS.MessageSystem.Params;
      if (!faceOpacity) faceOpacity = 255;
      const value = faceOpacity.clamp(0, 255);
      this._faceContents.opacity = value;
    };

    Window_Message.prototype.fadeInOutFaceContents = function () {
      if (!this._faceContents) {
        return;
      }

      const isValid = this.isOpening() || this.isClosing();
      if (isValid) {
        const openness = (this.openness || 0).clamp(0, 255);
        this._faceContents.scale.y = openness / 255;
        this._faceContents.y =
          (this._faceContents.height / 2) * (1 - this.openness / 255);
      }
    };

    const alias_Window_Message_checkToNotClose =
      Window_Message.prototype.checkToNotClose;
    Window_Message.prototype.checkToNotClose = function () {
      this.fadeInOutFaceContents();
      alias_Window_Message_checkToNotClose.call(this);
    };

    Window_Message.prototype.updateBalloonPosition = function () {
      // Get the component
      const component = <BalloonWindowTransformComponent>(
        DependencyInjector.getComponent("BalloonWindowTransformComponent")
      );
      if (component) {
        component.updateBalloonPosition();
      }
    };

    Window_Message.prototype.getDefaultSizeOption = function () {
      const isMobileDevice = Utils.isMobileDevice();
      const maxSW = isMobileDevice
        ? window.outerWidth
        : window.screen.availWidth;
      const maxSH = isMobileDevice
        ? window.outerHeight
        : window.screen.availHeight;
      const maxWidth = this.width;
      const maxHeight = this.height;

      return {
        maxSW,
        maxSH,
        maxWidth,
        maxHeight,
        maxY: maxSH - maxHeight,
        maxX: maxSW - maxWidth,
      };
    };

    Window_Message.prototype.updatePlacement = function () {
      const goldWindow = this._goldWindow;
      const isNormalWindowMode = $gameMessage.getBalloon() === -2;
      const isValidSceneIsMap = SceneManager._scene instanceof Scene_Map;
      this._positionType = $gameMessage.positionType();

      // 말풍선 모드가 아니라면 X좌표를 화면 중앙에 맞춘다.
      if (isNormalWindowMode) {
        const { maxWidth, maxHeight, maxX, maxY } = this.getDefaultSizeOption();

        const desiredX =
          Graphics.width / 2 -
          maxWidth / 2 +
          RS.MessageSystem.Params.windowOffset.x;
        const desiredY =
          (this._positionType * (Graphics.height - maxHeight)) / 2 +
          RS.MessageSystem.Params.windowOffset.y;

        this.x = Math.min(desiredX, maxX);
        this.y = Math.min(desiredY, maxY);
      } else {
        if (isValidSceneIsMap) {
          this.updateBalloonPosition();
        }
      }

      // 골드 윈도우의 위치 설정
      if (goldWindow) {
        const minGoldY = goldWindow.height;
        this._goldWindow.y =
          this.y > minGoldY ? 0 : Graphics.height - goldWindow.height;
      }

      // 투명도 업데이트
      this.updateDefaultOpacity();
      this.updateContentsOpacity();
      this.updateBigFaceOpacity();

      // 이름 윈도우 업데이트
      // if (this._nameBoxWindow.isOpen() || this.areSettingsChanged()) {
      //     this.updateNameWindow();
      // }
      // 얼굴 이미지의 Z-Index 업데이트
      if ($gameMessage.faceName() !== "") {
        const isBigFace = /^Big_/.exec($gameMessage.faceName());
        const backIndex = 2;

        if (RS.MessageSystem.Params.faceSide) {
          this.setFaceZIndex(isBigFace ? 0 : backIndex);
        } else {
          this.setFaceZIndex(backIndex);
        }
      }
    };

    Window_Message.prototype.isAlreadyDrawnFace = function () {
      return this._faceContents.bitmap || this.newLineX() > 0;
    };

    Window_Message.prototype.setFaceZIndex = function (zIndex = 0) {
      const parent = this.parent;
      const isFaceSide = RS.MessageSystem.Params.faceSide;

      if (parent && isFaceSide) {
        this.setChildIndex(this._faceContents, zIndex);
      }
    };

    Window_Message.prototype.clearFaceBitmap = function () {
      if (!this._faceContents) {
        return;
      }
      if (this._faceContents.bitmap) {
        // @ts-ignore
        this._faceContents.bitmap = null;
      }
    };

    const alias_Window_Message_convertEscapeCharacters =
      Window_Message.prototype.convertEscapeCharacters;
    Window_Message.prototype.convertEscapeCharacters = function (text) {
      const tcGroup = RS.MessageSystem.TextCodes.ENUM;
      const textCode = RS.MessageSystem.TextCodes.Main;
      const regGroup = RS.MessageSystem.Reg.Group;
      text = alias_Window_Message_convertEscapeCharacters.call(this, text);
      text = text.replace(
        regGroup[tcGroup.BOLD_START_CV],
        function () {
          return regGroup[tcGroup.BOLD_START].source;
        }.bind(this)
      );
      text = text.replace(
        regGroup[tcGroup.BOLD_END_CV],
        function () {
          return regGroup[tcGroup.BOLD_END].source;
        }.bind(this)
      );
      text = text.replace(
        regGroup[tcGroup.ITALIC_START_CV],
        function () {
          return regGroup[tcGroup.ITALIC_START].source;
        }.bind(this)
      );
      text = text.replace(
        regGroup[tcGroup.ITALIC_END_CV],
        function () {
          return regGroup[tcGroup.ITALIC_END].source;
        }.bind(this)
      );
      text = text.replace(
        regGroup[tcGroup.BALLOON],
        function () {
          const value = Number(arguments[1] || -2);
          if ($gameParty.inBattle()) {
            $gameMessage.setBalloon(
              // @ts-ignore
              value < 0 ? "ENEMIES : " + Math.abs(value) : "ACTORS : " + value
            );
          } else {
            $gameMessage.setBalloon(value);
          }
          return "";
        }.bind(this)
      );
      text = text.replace(
        regGroup[tcGroup.FRIENDLY_TROOPS],
        function () {
          const value = Number(arguments[1] || 0);
          $gameMessage.setBalloon(
            // @ts-ignore
            "ACTORS : " + value
          );
          return "";
        }.bind(this)
      );
      text = text.replace(
        regGroup[tcGroup.ENEMY_TROOPS],
        function () {
          const value = Number(arguments[1] || 0);
          $gameMessage.setBalloon(
            // @ts-ignore
            "ENEMIES : " + value
          );
          return "";
        }.bind(this)
      );
      text = text.replace(regGroup[tcGroup.FACE_DIRECTION], () => {
        const value = Number(arguments[1] || 0);
        if (!this._isUsedTextWidthEx) {
          RS.MessageSystem.Params.faceDirection = value;
        }
        return "";
      });
      return text;
    };

    // Window_Message.prototype.terminateMessage
    Window_Message.prototype.setHeight = function (n) {
      this.contents.clear();
      $gameMessage.setMaxLine(n);
      this.height = this.fittingHeight(n);
      this.createContents();
      this.updatePlacement();
    };

    const alias_Window_Message_initialize = Window_Message.prototype.initialize;
    Window_Message.prototype.initialize = function (rect) {
      alias_Window_Message_initialize.call(this, rect);
      $gameTemp.setMSHeightFunc(this.setHeight.bind(this));
      this.setHeight(RS.MessageSystem.Params.numVisibleRows);
      this.createFaceContents();
      this.on("removed", this.removeEventHandler, this);
      this.on("onLoadWindowskin", this.onLoadWindowskin, this);
    };

    Window_Message.prototype.calcBalloonRect = function (text: string) {
      const component = <BalloonWindowTransformComponent>(
        DependencyInjector.getComponent("BalloonWindowTransformComponent")
      );
      component.calcBalloonRect(text);
    };

    const alias_Window_Message_newPage = Window_Message.prototype.newPage;
    Window_Message.prototype.newPage = function (textState) {
      this.setFaceZIndex();
      this.clearFaceBitmap();
      this.loadWindowskin();
      this.emit("onLoadWindowskin");
      this.openBalloon($gameMessage.getBalloon());
      alias_Window_Message_newPage.call(this, textState);
    };

    Window_Message.prototype.updateBalloonPositionInBattle = function () {
      const component = <BalloonWindowTransformComponent>(
        DependencyInjector.getComponent("BalloonWindowTransformComponent")
      );
      if (component) {
        component.updateBalloonPositionInBattle();
      }
    };

    Window_Message.prototype.openBalloon = function (sign) {
      // 말풍선 모드가 아니면 빠져나간다.
      if (sign === -2) {
        this.resizeMessageSystem();
        return;
      }

      this.setupOwner(sign);

      const isBattleScene = SceneManager._scene instanceof Scene_Battle;
      // 전투 중일 경우
      if (isBattleScene) {
        this.updateBalloonPositionInBattle();
      } else {
        this.updateBalloonPosition();
      }
    };

    /**
     * 1. start
     */
    const alias_Window_Message_startMessage =
      Window_Message.prototype.startMessage;
    Window_Message.prototype.startMessage = function () {
      const text = $gameMessage.allText();
      const textState = this.createTextState(text, 0, 0, 0);
      textState.x = this.newLineX(textState);
      textState.startX = textState.x;
      this._textState = textState;

      // 말풍선 영역을 계산합니다.
      let tempText = textState.text.slice(0);
      if (
        $gameMessage.getBalloon() === -2 &&
        RS.MessageSystem.Params.isParagraphMinifier
      ) {
        tempText = tempText.replace(/[\r\n]+/gm, " ");
      }
      // ! BUG의 원인
      this.calcBalloonRect(tempText);

      this.newPage(this._textState);

      // width 와 height를 재설정한다.
      this.resizeMessageSystem("no reset");

      this.updatePlacement();
      this.updateBackground();
      this.open();
      this._nameBoxWindow.start();
    };

    Window_Message.prototype.getDefaultWindowRect = function () {
      return Scene_Message.prototype.messageWindowRect();
    };

    Window_Message.prototype.windowWidth = function () {
      const rect = this.getDefaultWindowRect();
      return rect.width;
    };

    Window_Message.prototype.windowHeight = function () {
      const rect = this.getDefaultWindowRect();
      return rect.height;
    };

    Window_Message.prototype.resizeMessageSystem = function (...args: any[]) {
      const isResetOwner: Boolean = !(args.length > 0);

      const isBattleScene = SceneManager._scene instanceof Scene_Battle;
      if (!isResetOwner && isBattleScene) {
        return;
      }

      const n = $gameMessage.positionType();
      const ox = RS.MessageSystem.Params.windowOffset.x;
      const oy = RS.MessageSystem.Params.windowOffset.y;

      const windowRect = {
        width: this.windowWidth(),
        height: this.windowHeight(),
      };
      const x = Graphics.width / 2 - windowRect.width / 2 + ox;
      const y = (n * (Graphics.height - windowRect.height)) / 2 + oy;
      const width = windowRect.width;
      const height = windowRect.height;

      if (x !== this.x) this.x = x;
      if (y !== this.y) this.y = y;
      if (width !== this.width || height !== this.height) {
        this.width = width;
        this.height = height;
      }

      if (isResetOwner) {
        $gameMap.setMsgOwner($gamePlayer);
      }
    };

    Window_Message.prototype.removeEventHandler = function () {
      this.off("onLoadWindowskin", this.onLoadWindowskin, this);
    };

    /**
     * TODO: ColorManager.textColor의 대체 구현.
     *
     * @param {Number} n
     * @returns
     */
    Window_Message.prototype.textColor = function (n) {
      const windowskin = this.windowskin;
      if (!windowskin.isReady()) {
        // Set the default text color if the windowskin is not ready.
        return Color.baseColor;
      }
      const px = 96 + (n % 8) * 12 + 6;
      const py = 144 + Math.floor(n / 8) * 12 + 6;
      return windowskin.getPixel(px, py);
    };

    Window_Message.prototype.onLoadWindowskin = function () {
      Color.baseColor = this.textColor(0);
      this.changeTextColor(Color.baseColor);
    };

    Window_Message.prototype.loadWindowskin = function () {
      const bitmap = ImageManager.loadSystem(
        RS.MessageSystem.Params.windowskin
      );

      // if the windowskin is changed?
      if (bitmap !== this.windowskin) {
        this.windowskin = bitmap;
        this._isDirtyWindowskin = false;
        this.windowskin.addLoadListener(() => {
          this._isDirtyWindowskin = true;
        });
        if (!this.contents) {
          this.createContents();
        }
        // Set the default text color if the windowskin didn't load yet.
        this.changeTextColor(Color.baseColor);

        if (!this.windowskin.isReady()) {
          return setTimeout(() => this.loadWindowskin(), 10);
        }
      }
    };

    const _Window_Message_updateLoading =
      Window_Message.prototype.updateLoading;
    Window_Message.prototype.updateLoading = function () {
      let ret = true;

      if (this._isDirtyWindowskin) {
        Color.baseColor = ColorManager.textColor(0);
        this.changeTextColor(Color.baseColor);
        this._isDirtyWindowskin = false;
        ret = true;
      }
      return _Window_Message_updateLoading.call(this) && ret;
    };

    Window_Message.prototype.needsNewPage = function (textState) {
      return (
        !this.isEndOfText(textState) &&
        textState.y + textState.height > this.contentsHeight()
      );
    };

    Window_Message.prototype.createFaceContents = function () {
      this._faceContents = new Sprite();
      this._faceContents.x = 0;
      this._faceContents.y = 0;

      this.addChildAt(this._faceContents, 2);
      return this._faceContents;
    };

    Window_Message.prototype.removeFaceContents = function () {
      if (this._faceContents) this.removeChild(this._faceContents);
    };

    /**
     * 큰 얼굴 이미지가 설정되었을 때 텍스트 시작 위치
     */
    Window_Message.prototype.newLineX = function () {
      const reg = /^Big_/i;
      const faceName = $gameMessage.faceName();
      const faceIndex = $gameMessage.faceIndex();
      if (reg.exec(faceName)) {
        var faceStartX = RS.MessageSystem.Params.faceSide
          ? 0
          : RS.MessageSystem.Params.textStartX;
        return faceIndex > 0 ? 0 : faceStartX;
      } else {
        const isRightDirection = RS.MessageSystem.Params.faceDirection === 2;
        if (isRightDirection) {
          return 0;
        }
        return faceName ? RS.MessageSystem.Params.faceStartOriginX : 0;
      }
    };

    // TODO: 큰 얼굴 이미지 구현 필요
    /**
     * @param {String} faceName
     */
    Window_Message.prototype.isValidBigFace = function (faceName) {
      const reg = /^Big_/i;
      return reg.exec(faceName);
    };

    /**
     * TODO: deprecated
     */
    Window_Message.prototype.updateNameWindow = function () {};

    /**
     * Window 구성 스프라이트 _windowBackSprite의 투명도를 조절합니다.
     * TODO: deprecated
     * @method standardBackOpacity
     */
    Window_Message.prototype.standardBackOpacity = function () {
      return RS.MessageSystem.Params.backOpacity;
    };

    /**
     * Bitmap의 context.globalAlpha 값을 변경합니다.
     * @method translucentOpacity
     */
    Window_Message.prototype.translucentOpacity = function () {
      return RS.MessageSystem.Params.translucentOpacity;
    };

    /**
     * 윈도우를 구성하는 모든 객체의 투명도를 변경합니다.
     * @method updateDefaultOpacity
     */
    Window_Message.prototype.updateDefaultOpacity = function () {
      this.opacity = RS.MessageSystem.Params.defaultOpacity;
    };

    /**
     * Window 구성 스프라이트 _windowContentsSprite의 투명도를 변경합니다.
     * @method updateContentsOpacity
     */
    Window_Message.prototype.updateContentsOpacity = function () {
      this.contentsOpacity = RS.MessageSystem.Params.contentsOpacity;
    };

    Window_Message.prototype.getSpriteActors = function (
      sign: number
    ): IBalloonSpriteTarget | null {
      if (!$gameParty.members()) return null;
      const max = $gameParty.members().length;
      sign = sign.clamp(0, max);

      return {
        type: "actor",
        id: sign - 1,
      };
    };

    Window_Message.prototype.getSpriteEnemies = function (
      sign: number
    ): IBalloonSpriteTarget | null {
      if (!$gameTroop.members()) return null;
      const max = $gameTroop.members().length;
      sign = sign.clamp(0, max);

      return {
        type: "enemy",
        id: sign - 1,
      };
    };

    Window_Message.prototype.setupOwner = function (sign) {
      switch (sign) {
        case -1: // 플레이어
          $gameMap.setMsgOwner($gamePlayer);
          break;
        case 0: // 이 이벤트
          $gameMap.setMsgOwner(<Game_Event>$gameMap.getMsgEvent());
          break;
        default:
          if (SceneManager._scene instanceof Scene_Battle) {
            // 전투 중인가?
            if (/(?:ENEMIES)[ ]*:(.*)/.test(sign.toString())) {
              // 적
              $gameMap.setMsgOwner(this.getSpriteEnemies(parseInt(RegExp.$1)));
            }
            if (/(?:ACTORS)[ ]*:(.*)/.test(sign.toString())) {
              // 아군
              $gameMap.setMsgOwner(this.getSpriteActors(parseInt(RegExp.$1)));
            }
          } else {
            // 맵 이벤트
            $gameMap.setMsgOwner($gameMap.event(sign));
          }
          break;
      }
    };

    const alias_Window_Message_shouldBreakHere =
      Window_Message.prototype.shouldBreakHere;
    Window_Message.prototype.shouldBreakHere = function (text) {
      const isBreakCharacter = alias_Window_Message_shouldBreakHere.call(
        this,
        text
      );

      if (isBreakCharacter) {
        if (RS.MessageSystem.Params.isPlayTextSound) {
          const interval = RS.MessageSystem.Params.textSoundInterval;

          if (this._textSoundInterval-- <= 0) {
            AudioManager.playStaticSe(<rm.types.AudioParameters>{
              name: RS.MessageSystem.popParameter(
                "Text Sound",
                "텍스트 효과음"
              ),
              pan: 0,
              pitch: 100,
              volume: 90,
            });
            this._textSoundInterval = interval;
          }
        }
      }

      return isBreakCharacter;
    };
  };
}
