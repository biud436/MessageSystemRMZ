/// <reference types="../types/my-types" />
/// <reference types="../types/lunalite-pixi-mz" />
import { RS, Color } from "./RS";
import { DependencyInjector } from "./DependencyInjector";
import { BalloonWindowTransformComponent } from "./BalloonWindowTransformComponent";
import { NameWindowPositionComponent } from "./NameWindowPositionComponent";
import ComponentExecutor from "./ComponentExecutor";

const executor = ComponentExecutor.getInstance();

executor
    /**
     * ? Bitmap
     * @description 텍스트에 그라데이션을 채우는 기능을 추가합니다.
     */
    .add("bitmap", () => {
        const alias_Bitmap_initialize = Bitmap.prototype.initialize;
        Bitmap.prototype.initialize = function (width: number, height: number) {
            alias_Bitmap_initialize.call(this, width, height);
            this.fontBold = false;
            this.fontGradient = false;
            this.highlightTextColor = null;
        };

        Bitmap.prototype.setGradient = function (
            text,
            color1,
            color2,
            color3,
            tx,
            ty
        ) {
            const context = this._context;
            const tWidth = this.measureTextWidth(text);
            context.save();
            const gradient = context.createLinearGradient(
                tx,
                0,
                tx + tWidth,
                0
            );
            gradient.addColorStop(0, color1);
            gradient.addColorStop(0.6, color2);
            gradient.addColorStop(1, color3);
            context.restore();

            this._baseTexture.update();

            return gradient;
        };

        Bitmap.prototype.setGradientStyle = function (
            text,
            color1,
            color2,
            color3,
            tx,
            ty
        ) {
            const context = this._context;
            const width = this.measureTextWidth(text);
            const height = RS.MessageSystem.Params.lineHeight;
            let grd;

            context.save();

            const style = RS.MessageSystem.Params.gradientStyle;

            if (style !== "radial") {
                if (style.contains("horizontal")) {
                    grd = context.createLinearGradient(tx, 0, tx + width, 0);
                } else {
                    grd = context.createLinearGradient(tx, 0, 0, ty + height);
                }
            } else {
                const ws = width * 0.5;
                const hs = height * 0.5;
                grd = context.createRadialGradient(ws, hs, 0.0, ws, hs, ws);
            }

            if (style === "radial") {
                grd.addColorStop(0.0, color1);
                grd.addColorStop(1.0, color2);
            } else if (style.contains("axial")) {
                grd.addColorStop(0.0, color1);
                grd.addColorStop(0.5, color2);
                grd.addColorStop(1.0, color3);
            } else {
                grd.addColorStop(0.0, color1);
                grd.addColorStop(1.0, color2);
            }

            context.restore();

            this._baseTexture.update();

            return grd;
        };

        Bitmap.prototype._makeFontNameText = function () {
            return (
                (this.fontItalic ? "Italic " : "") +
                (this.fontBold ? "bold " : "") +
                this.fontSize +
                "px " +
                this.fontFace
            );
        };

        Bitmap.prototype._drawTextBody = function (text, tx, ty, maxWidth) {
            const context = this._context;
            context.save(); // 드로잉 상태 저장
            context.imageSmoothingEnabled =
                RS.MessageSystem.Params.fontSmoothingEnabled;

            if (this.fontGradient) {
                var gradient = this.setGradientStyle(
                    text,
                    RS.MessageSystem.Params.gradientColor1,
                    RS.MessageSystem.Params.gradientColor2,
                    RS.MessageSystem.Params.gradientColor3,
                    tx,
                    ty
                );
                context.fillStyle = gradient;
            } else {
                context.fillStyle = this.textColor;
            }
            context.fillText(text, tx, ty, maxWidth);
            context.fillStyle = this.textColor;
            context.restore();
        };
    })
    /**
     * ? Main
     * @description
     * 메인 엔트리 포인트입니다.
     */
    .add("main", () => {
        //============================================================================
        // Game_Message
        //============================================================================
        const alias_Game_Message_clear = Game_Message.prototype.clear;
        Game_Message.prototype.clear = function () {
            alias_Game_Message_clear.call(this);
            this._waitTime = 0;
            this._gradientText = "";
            this._balloon = -2;
            this._align = [];
            this._balloonPatternHeight = 0;
            this._lastAlign = -1;
        };

        Game_Message.prototype.setWaitTime = function (time) {
            this._waitTime = time;
        };

        Game_Message.prototype.setGradientText = function (text) {
            this._gradientText = text;
        };

        Game_Message.prototype.getWaitTime = function () {
            return this._waitTime || 0;
        };

        Game_Message.prototype.getGradientText = function () {
            return this._gradientText;
        };

        Game_Message.prototype.getMaxLine = function () {
            return this._maxLine;
        };

        Game_Message.prototype.setMaxLine = function (maxLine) {
            this._maxLine = maxLine;
            RS.MessageSystem.Params.numVisibleRows = maxLine;
        };

        Game_Message.prototype.setBalloon = function (n) {
            this._balloon = n;
        };

        Game_Message.prototype.getBalloon = function (n) {
            return this._balloon;
        };

        Game_Message.prototype.setAlign = function (n) {
            this._align = this._align || [];
            this._lastAlign = n; // 마지막 정렬 위치 기억
            this._align.push(n);
        };

        Game_Message.prototype.getAlign = function (n) {
            const last = this._align.shift();
            if (last === undefined) {
                return this._lastAlign;
            }
            return last;
        };

        Game_Message.prototype.clearAlignLast = function (n) {
            this._lastAlign = -1;
        };

        Game_Message.prototype.setBalloonPatternHeight = function (
            value: number
        ) {
            this._balloonPatternHeight = value;
        };

        Game_Message.prototype.getBalloonPatternHeight = function () {
            return this._balloonPatternHeight;
        };

        //============================================================================
        // Sprite_Battler
        //============================================================================

        Sprite_Battler.prototype.screenX = function () {
            return this.x || 0;
        };

        Sprite_Battler.prototype.screenY = function () {
            return this.y || 0;
        };

        //============================================================================
        // MessageDesc
        //============================================================================

        class MessageDesc {
            public fontFace: string;
            public fontSize: number;
            public fontBold: boolean;
            public fontItalic: boolean;
            public textColor: string;
            public outlineColor: string;
            public outlineWidth: number;
            public fontGradient: boolean;
            public highlightTextColor: string | null;
            public textSpeed: number;

            private _isSaved: boolean;

            constructor() {
                this.fontFace = "Nanum Gothic";
                this.fontSize = 12;
                this.fontBold = false;
                this.fontItalic = false;
                this.textColor = "#000";
                this.outlineColor = "#fff";
                this.outlineWidth = 1;
                this.fontGradient = false;
                this.highlightTextColor = null;
                this.textSpeed = 1;

                this._isSaved = false;
            }

            /**
             *
             * @param {Bitmap} contents
             */
            save(contents: Bitmap) {
                this.fontFace = contents.fontFace;
                this.fontSize = contents.fontSize;
                this.fontBold = contents.fontBold;
                this.fontItalic = contents.fontItalic;
                this.textColor = contents.textColor;
                this.outlineColor = contents.outlineColor;
                this.outlineWidth = contents.outlineWidth;
                this.fontGradient = contents.fontGradient;
                this.highlightTextColor = contents.highlightTextColor;

                if ($gameMessage) {
                    this.textSpeed = $gameMessage.getWaitTime();
                }

                this._isSaved = true;
            }

            restore(contents: Bitmap) {
                if (!this._isSaved) return;
                if (!(contents instanceof Bitmap)) return;
                contents.fontFace = this.fontFace;
                contents.fontSize = this.fontSize;
                contents.fontBold = this.fontBold;
                contents.fontItalic = this.fontItalic;
                contents.textColor = this.textColor;
                contents.outlineColor = this.outlineColor;
                contents.outlineWidth = this.outlineWidth;
                contents.fontGradient = this.fontGradient;
                contents.highlightTextColor = this.highlightTextColor;
                if ($gameMessage) {
                    $gameMessage.setWaitTime(this.textSpeed);
                }
                this._isSaved = false;
            }
        }

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
            const arr = /\[(.+?)\]/gi.exec(
                textState.text.slice(textState.index)
            );
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
            if (!this._isUsedTextWidthEx) {
                this.contents.textColor = color;
            }
        };

        const alias_Window_Base_processEscapeCharacter =
            Window_Base.prototype.processEscapeCharacter;
        Window_Base.prototype.processEscapeCharacter = function (
            code,
            textState
        ) {
            const tcGroup = RS.MessageSystem.TextCodes.ENUM;
            const textCode = RS.MessageSystem.TextCodes.Main;
            switch (code) {
                case "C":
                    this.changeTextColor(
                        this.textColor(
                            <number>this.obtainEscapeParam(textState)
                        )
                    );
                    break;
                case textCode[tcGroup.COLOR]:
                    this.changeTextColor(
                        this.obtainNameColor(<TextState>textState)
                    );
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
                    alias_Window_Base_processEscapeCharacter.call(
                        this,
                        code,
                        textState
                    );
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
                RS.MessageSystem.Params.langCode ||
                navigator.language.slice(0, 2);
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

        Window_Base.prototype.processAllText = function (textState) {
            this._isUsedTextWidthEx = !textState.drawing;
            while (textState.index < textState.text.length) {
                this.processCharacter(textState);
            }
            this.flushTextState(textState);
        };

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
            this.contents.outlineWidth =
                RS.MessageSystem.Params.defaultOutlineWidth;
            this.contents.outlineColor =
                RS.MessageSystem.Params.defaultOutlineColor;
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
            this._messageDesc.save(this.contents);
        };

        Window_Base.prototype.restore = function () {
            if (!this._messageDesc) return;
            this._messageDesc.restore(this.contents);
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
                    return $gameVariables
                        .value(parseInt(<string>args[1]))
                        .toString();
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
            text = text.replace(
                regGroup[tcGroup.PARTY_MEMBER],
                (...args: any[]) => {
                    return this.partyMemberName(parseInt(args[1]));
                }
            );
            text = text.replace(
                regGroup[tcGroup.NUM],
                function (...args: any[]) {
                    return args[1].toComma();
                }.bind(this)
            );
            text = text.replace(
                regGroup[tcGroup.GOLD],
                TextManager.currencyUnit
            );
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

            // 아랍어 인가?
            if (textState.rtl) {
                return;
            }

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
            const padding = this.textPadding();
            textState.x =
                (this.newLineX(textState) + this.contentsWidth() + padding) /
                    2 -
                textState.outputWidth / 2;
            textState.startX = textState.x;
        };

        Window_Base.prototype.setAlignRight = function (textState) {
            const padding = this.textPadding();
            textState.x =
                this.contentsWidth() - padding - textState.outputWidth;
            textState.startX = textState.x;
        };

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
                    $gameMessage.setWaitTime(
                        <number>this.obtainEscapeParam(textState)
                    );
                    break;
                case textCode[tcGroup.TEXT_SIZE]:
                    this.setTextSize(<number>this.obtainEscapeParam(textState));
                    break;
                case textCode[tcGroup.OUTLINE_COLOR]:
                    this.setStrokeColor(
                        this.obtainNameColor(<TextState>textState)
                    );
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
                    this.showPicture(
                        this.obtainSoundName(<TextState>textState)
                    );
                    this.startWait(15);
                case textCode[tcGroup.HIDE_PICTURE]:
                    if (this._isUsedTextWidthEx) break;
                    this.erasePicture(
                        <number>this.obtainEscapeParam(textState)
                    );
                    this.startWait(15);
                case textCode[tcGroup.FACE]:
                    if (this._isUsedTextWidthEx) break;
                    var params = this.obtainSoundName(
                        <TextState>textState
                    ).split(",");
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
            textState.x += <number>this.obtainEscapeParam(textState);
        };

        Window_Message.prototype.setHighlightTextColor = function (
            ...args: any[]
        ) {
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
        Window_Message.prototype.createTextState = function (
            text,
            x,
            y,
            width
        ) {
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
            alias_Window_Message_processNewLinePW.call(this, textState);
            // 내부 버퍼의 위치를 시작 지점으로 초기화한다.
            (<TextState>textState).px =
                textState.startX || (<TextState>textState).x;
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
                const c = textState.buffer.substr(
                    textState.buffer.length - 1,
                    1
                );
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
            let isValid =
                $gameMessage.getBalloon() === -2 &&
                !this._isUsedTextWidthEx &&
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
            if (contents.highlightTextColor !== null) {
                const contentW = Math.floor(w * 2) + 1.0;
                const contentH = this.lineHeight();

                // 배경 버퍼의 생성
                this._backBuffer = {
                    buffer: new Bitmap(contentW, contentH),
                    textState: null,
                    isDirty: false,
                };

                const { px, py } = <TextState>textState;

                // 배경 버퍼는 내부 버퍼의 초기 위치로부터 계산된다.
                this._backBuffer.buffer.fillAll(contents.highlightTextColor);
                // 이 플래그가 활성화되어있다면 flushTextState에서 그리기 처리를 해야 한다.
                this._backBuffer.isDirty = true;
                this._backBuffer.textState = textState;
            }
        };

        const alias_Window_Message_flushTextState =
            Window_Message.prototype.flushTextState;
        Window_Message.prototype.flushTextState = function (textState) {
            // 기본 지연 시간 설정
            if (
                !this._showFast &&
                !this.isEndOfText(textState) &&
                !this._isUsedTextWidthEx
            ) {
                this.startWait($gameMessage.getWaitTime() || 0);
            }

            // 배경색의 처리
            if (
                !this._isUsedTextWidthEx &&
                this._backBuffer &&
                this._backBuffer.isDirty
            ) {
                if (textState.drawing) {
                    /**
                     * @type {Bitmap}
                     */
                    const bitmap = this._backBuffer.buffer;
                    const tx = (<TextState>textState).px;
                    const ty = (<TextState>textState).py;
                    const x = (<TextState>textState).x;
                    const y = (<TextState>textState).y;
                    const w = bitmap.width;
                    const h = bitmap.height;

                    this.contents.blt(bitmap, 0, 0, w, h, x, y);
                    this._backBuffer.isDirty = false;
                }
            }
            alias_Window_Message_flushTextState.call(this, textState);
        };

        // [X] Window_Message.prototype.createSubWindows
        // [X] RS.MessageSystem.Params.extraSubWindows = [];
        // [X] Window_Message.prototype.subWindows

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

        Window_Message.prototype.updatePlacement = function () {
            // TODO: try-catch statement will be deleted later.
            try {
                const goldWindow = this._goldWindow;
                this._positionType = $gameMessage.positionType();

                // 말풍선 모드가 아니라면 X좌표를 화면 중앙에 맞춘다.
                if ($gameMessage.getBalloon() === -2) {
                    this.x =
                        Graphics.boxWidth / 2 -
                        this.width / 2 +
                        RS.MessageSystem.Params.windowOffset.x;
                    this.y =
                        (this._positionType *
                            (Graphics.boxHeight - this.height)) /
                            2 +
                        RS.MessageSystem.Params.windowOffset.y;
                } else {
                    if (SceneManager._scene instanceof Scene_Map) {
                        (<BalloonWindowTransformComponent>(
                            DependencyInjector.getComponent(
                                "BalloonWindowTransformComponent"
                            )
                        )).updateBalloonPosition();
                        // this.updateBalloonPosition();
                    }
                }

                // 골드 윈도우의 위치 설정
                if (goldWindow) {
                    const minGoldY = goldWindow.height;
                    this._goldWindow.y =
                        this.y > minGoldY
                            ? 0
                            : Graphics.boxHeight - goldWindow.height;
                }

                // 투명도 업데이트
                this.updateDefaultOpacity();
                this.updateContentsOpacity();
                this.updateBigFaceOpacity();

                // 이름 윈도우 업데이트

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
            } catch (e) {
                console.log("!------ updatePlacement error ------!");
                console.error(e);
            }
        };

        const alias_Window_Message_convertEscapeCharacters =
            Window_Message.prototype.convertEscapeCharacters;
        Window_Message.prototype.convertEscapeCharacters = function (text) {
            const tcGroup = RS.MessageSystem.TextCodes.ENUM;
            const textCode = RS.MessageSystem.TextCodes.Main;
            const regGroup = RS.MessageSystem.Reg.Group;
            text = alias_Window_Message_convertEscapeCharacters.call(
                this,
                text
            );
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
            text = text.replace(regGroup[tcGroup.NAME], (...args) => {
                let retName = args[1];

                if (retName.endsWith(":left")) {
                    retName = retName.replace(":left", "");
                    RS.MessageSystem.Params.namePositionTypeAtX = "left";
                }
                if (retName.endsWith(":auto")) {
                    retName = retName.replace(":auto", "");
                    RS.MessageSystem.Params.namePositionTypeAtX = "auto";
                }
                if (retName.endsWith(":center")) {
                    retName = retName.replace(":center", "");
                    RS.MessageSystem.Params.namePositionTypeAtX = "center";
                }
                if (retName.endsWith(":opacity0")) {
                    retName = retName.replace(":opacity0", "");
                    RS.MessageSystem.Params.namePositionTypeAtX = "opacity0";
                }
                if (retName.endsWith(":defaultOpacity")) {
                    retName = retName.replace(":defaultOpacity", "");
                    RS.MessageSystem.Params.namePositionTypeAtX =
                        "defaultOpacity";
                }
                if (retName.endsWith(":right")) {
                    retName = retName.replace(":right", "");
                    RS.MessageSystem.Params.namePositionTypeAtX = "right";
                }
                (this._nameWindow as any).drawName(retName);
                return "";
            });
            text = text.replace(
                regGroup[tcGroup.BALLOON],
                function () {
                    const value = Number(arguments[1] || -2);
                    if ($gameParty.inBattle()) {
                        $gameMessage.setBalloon(
                            // @ts-ignore
                            value < 0
                                ? "ENEMIES : " + Math.abs(value)
                                : "ACTORS : " + value
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

        const alias_Window_Message_initialize =
            Window_Message.prototype.initialize;
        Window_Message.prototype.initialize = function (rect) {
            DependencyInjector.COMPONENTS = [];
            DependencyInjector.COMPONENTS.push((messageWindow) => {
                const name = BalloonWindowTransformComponent.name;
                DependencyInjector._components[name] =
                    new BalloonWindowTransformComponent(messageWindow);
            });
            DependencyInjector.COMPONENTS.push((messageWindow) => {
                const name = NameWindowPositionComponent.name;
                DependencyInjector._components[name] =
                    new NameWindowPositionComponent(messageWindow);
            });
            DependencyInjector.inject(this);

            alias_Window_Message_initialize.call(this, rect);
            $gameTemp.setMSHeightFunc(this.setHeight.bind(this));
            this.setHeight(RS.MessageSystem.Params.numVisibleRows);
            this.createFaceContents();
            this.on("removed", this.removeEventHandler, this);
            this.on("onLoadWindowskin", this.onLoadWindowskin, this);
        };

        const alias_Window_Message_startMessage =
            Window_Message.prototype.startMessage;
        Window_Message.prototype.startMessage = function () {
            DependencyInjector.ready();
            alias_Window_Message_startMessage.call(this);
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
                if (RS.MessageSystem.Params.faceDirection === 2) return 0;
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
                            $gameMap.setMsgOwner(
                                this.getSpriteEnemies(parseInt(RegExp.$1))
                            );
                        }
                        if (/(?:ACTORS)[ ]*:(.*)/.test(sign.toString())) {
                            // 아군
                            $gameMap.setMsgOwner(
                                this.getSpriteActors(parseInt(RegExp.$1))
                            );
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

                    // prettier-ignore
                    if ((this._textSoundInterval--) <= 0) {
              AudioManager.playStaticSe(< rm.types.AudioParameters >{
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

        // Game_Interpreter.prototype.command101 = function () {
        //     if (!$gameMessage.isBusy()) {
        //         $gameMap.setMsgEvent(this.character(this._eventId > 0 ? 0 : -1));
        //         $gameMessage.setFaceImage(this._params[0], this._params[1]);
        //         $gameMessage.setBackground(this._params[2]);
        //         $gameMessage.setPositionType(this._params[3]);

        //         this.processMessageParams(this._eventId, this._index);

        //         if (this.isMultiLine()) {
        //             this.multiLineAddMessage();
        //         } else {
        //             while (this.nextEventCode() === 401) {
        //                 // Text data
        //                 this._index++;
        //                 $gameMessage.add(this.currentCommand().parameters[0]);
        //             }
        //         }

        //         switch (this.nextEventCode()) {
        //             case 102: // Show Choices
        //                 this._index++;
        //                 this.setupChoices(this.currentCommand().parameters);
        //                 break;
        //             case 103: // Input Number
        //                 this._index++;
        //                 this.setupNumInput(this.currentCommand().parameters);
        //                 break;
        //             case 104: // Select Item
        //                 this._index++;
        //                 this.setupItemChoice(this.currentCommand().parameters);
        //                 break;
        //         }
        //         this._index++;
        //         this.setWaitMode("message");
        //     }
        //     return false;
        // };

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

        RS.MessageSystem.initSystem();

        // ! [DEBUG]
        nw.Window.get().showDevTools();
        const win = nw.Window.get();
        win.moveTo(window.outerWidth / 3, 153);
    })
    .ready("bitmap")
    .ready("main")
    .executeAll();
