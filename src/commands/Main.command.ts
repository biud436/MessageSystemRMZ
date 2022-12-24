import { Color } from "../core/RS";
import { DependencyInjector } from "../core/DependencyInjector";
import { BalloonWindowTransformComponent } from "../components/BalloonWindowTransformComponent";

/**
 * ? Main
 * @description
 * 메인 엔트리 포인트입니다.
 */
export function getMainCommand(): Function {
    return () => {
        //============================================================================
        // Game_Interpreter
        //============================================================================
        Game_Interpreter.prototype.processMessageParams = function (
            eventId: number,
            index: number
        ) {
            const meta = <EventCommand.CommentMeta>(
                RS.MessageSystem.getEventComments(eventId, index - 1)
            );
            if (meta["윈도우 스킨"]) {
                RS.MessageSystem.Params.windowskin =
                    meta["윈도우 스킨"].trim() || "Window";
                ImageManager.loadSystem(RS.MessageSystem.Params.windowskin);
            }
            if (meta["이름 윈도우 스킨"]) {
                RS.MessageSystem.Params.windowskinForNameWindow =
                    meta["이름 윈도우 스킨"].trim() || "Window";
                ImageManager.loadSystem(
                    RS.MessageSystem.Params.windowskinForNameWindow
                );
            }
            if (meta["라인 높이"]) {
                RS.MessageSystem.Params.lineHeight = parseInt(
                    meta["라인 높이"]
                );
            }
            if (meta["폰트 크기"]) {
                RS.MessageSystem.Params.fontSize = parseInt(meta["폰트 크기"]);
            }
            if (meta["라인"]) {
                RS.MessageSystem.Params.numVisibleRows = parseInt(meta["라인"]);
            }
            if (meta["텍스트 시작 X"]) {
                RS.MessageSystem.Params.textStartX = parseInt(
                    meta["텍스트 시작 X"]
                );
            }
            if (meta["큰 페이스칩 OX"]) {
                RS.MessageSystem.Params.faceOX = Number(meta["큰 페이스칩 OX"]);
            }
            if (meta["큰 페이스칩 OY"]) {
                RS.MessageSystem.Params.faceOY = Number(meta["큰 페이스칩 OY"]);
            }
            if (meta["대화창 뒤에 얼굴 표시"]) {
                RS.MessageSystem.Params.faceSide = Boolean(
                    meta["대화창 뒤에 얼굴 표시"] === "true"
                );
            }
            if (meta["대화창 투명도"]) {
                RS.MessageSystem.Params.defaultOpacity = parseInt(
                    meta["대화창 투명도"]
                );
            }
            if (meta["텍스트 효과음 재생 여부"]) {
                RS.MessageSystem.Params.isPlayTextSound = Boolean(
                    meta["텍스트 효과음 재생 여부"] === "true"
                );
            }
            if (meta["기본 텍스트 출력 속도"]) {
                RS.MessageSystem.Params.textSpeed = Number(
                    meta["기본 텍스트 출력 속도"]
                );
            }
        };

        Game_Interpreter.prototype.isValidMultiLine = function () {
            const codes = [];
            let prevCode = 401;
            let lineCount = 0;
            for (let i = 1; i < 8; i++) {
                const currentCommand = this._list[this._index + i];
                if (currentCommand) {
                    const code = currentCommand.code;
                    codes.push(code);
                    prevCode = code;
                    if ([101, 401].contains(code)) {
                        lineCount++;
                    }
                }
            }
            if (codes.contains(102)) {
                return false;
            } else if (codes.contains(103)) {
                return false;
            } else if ($gameMessage.getMaxLine() <= 4) {
                return false;
            } else if (lineCount <= 4) {
                return false;
            } else if (RS.MessageSystem.Params.choiceWindowStyle == "RMXP") {
                return false;
            } else {
                return true;
            }
        };

        Game_Interpreter.prototype.command101 = function (params) {
            if ($gameMessage.isBusy()) {
                return false;
            }

            $gameMap.setMsgEvent(this.character(this._eventId > 0 ? 0 : -1));
            $gameMessage.setFaceImage(params[0], params[1]);
            $gameMessage.setBackground(params[2]);
            $gameMessage.setPositionType(params[3]);
            $gameMessage.setSpeakerName(params[4]);

            this.processMessageParams(this._eventId, this._index);

            if (this.isMultiLine()) {
                this.multiLineAddMessage();
            } else {
                while (this.nextEventCode() === 401) {
                    // Text data
                    this._index++;
                    $gameMessage.add(this.currentCommand().parameters[0]);
                }
            }

            switch (this.nextEventCode()) {
                case 102: // Show Choices
                    this._index++;
                    this.setupChoices(this.currentCommand().parameters);
                    break;
                case 103: // Input Number
                    this._index++;
                    this.setupNumInput(this.currentCommand().parameters);
                    break;
                case 104: // Select Item
                    this._index++;
                    this.setupItemChoice(this.currentCommand().parameters);
                    break;
            }
            this.setWaitMode("message");
            return true;
        };

        Game_Interpreter.prototype.multiLineAddMessage = function () {
            this.initLineHeight();

            while ($gameMessage._texts.length < $gameMessage.getMaxLine()) {
                while (this.nextEventCode() === 401) {
                    this._index++;
                    $gameMessage.add(this.currentCommand().parameters[0]);
                    this.addLineHeight();
                    if (this._lineHeight >= $gameMessage.getMaxLine()) {
                        break;
                    }
                }
                if (this.nextEventCode() !== 101) {
                    break;
                }
            }

            // 커맨드 코드 401번이 아직 남아있는 상황이라면,
            // 다음 인덱스로 넘겨야 선택지가 제대로 동작한다.
            while (this.nextEventCode() === 401) {
                this._index++;
            }
        };

        Game_Interpreter.prototype.initLineHeight = function () {
            this._lineHeight = 0;
        };

        Game_Interpreter.prototype.isMultiLine = function () {
            return this.isValidMultiLine();
        };

        Game_Interpreter.prototype.addLineHeight = function () {
            this._lineHeight++;
            if (this.nextEventCode() === 101) {
                this._index++;
            }
        };

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
