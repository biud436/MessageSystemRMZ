import { Point } from "pixi.js";
import { isParameter, NumericLiteral } from "typescript";
import { TextCode } from "../src/core/RS";
export declare global {
    interface Array<T> {
        /**
         * 배열에 매개변수로 전달된 값이 있는지 확인합니다.
         * @param value
         */
        contains(value: T): boolean;
    }
    interface String {
        /**
         * 문자열에 매개변수로 전달된 값이 있는지 확인합니다.
         * @param value
         */
        contains(value: string): boolean;
    }

    interface Number {
        /**
         * 숫자 값을 min과 max 사이로 제한합니다.
         * @param min
         * @param max
         */
        clamp(min: number, max: number): number;
    }

    interface Bitmap {
        /**
         * 폰트가 굵게 설정되어있는지 여부
         */
        fontBold: boolean;
        /**
         * 폰트를 그레디언트로 그려야 하는지 여부
         */
        fontGradient: boolean;
        /**
         * 폰트 배경색.
         */
        highlightTextColor: Required<string | null>;
        /**
         * CanvasRenderingContext2D 객체.
         */
        _context: CanvasRenderingContext2D;
        /**
         * 기본 텍스쳐
         */
        _baseTexture: PIXI.BaseTexture;
        /**
         * 비트맵 객체를 생성합니다.
         *
         * @param width
         * @param height
         */
        initialize(width: number, height: number): void;
        /**
         * 그레디언트를 설정합니다.
         *
         * @param text
         * @param color1
         * @param color2
         * @param color3
         * @param tx
         * @param ty
         */
        setGradient(
            text: string,
            color1: string,
            color2: string,
            color3: string,
            tx: number,
            ty: number
        ): void;
        /**
         * 그레디언트의 스타일을 설정합니다.
         * @param text
         * @param color1
         * @param color2
         * @param color3
         * @param tx
         * @param ty
         */
        setGradientStyle(
            text: string,
            color1: string,
            color2: string,
            color3: string,
            tx: number,
            ty: number
        ): CanvasGradient;
        /**
         * 폰트 이름을 가져옵니다. 이탤릭, 굵게, 폰트 크기, font-family 정보가 포함되어야 합니다.
         */
        _makeFontNameText(): string;
        /**
         * 텍스트를 그려냅니다.
         * @param text
         * @param tx
         * @param ty
         * @param maxWidth 텍스트가 그려질 텍스쳐의 가로 길이를 지정하세요.
         */
        _drawTextBody(
            text: string,
            tx: number,
            ty: number,
            maxWidth: number
        ): void;
    }

    interface Game_Message {
        /**
         * Sets or gets wait time when using waiting mode.
         */
        _waitTime: number;
        /**
         * Sets or gets the message text when using gradient text mode.
         */
        _gradientText: string;
        /**
         * 말풍선 표시 위치를 설정하거나 가져옵니다.
         * -1 이면 player,
         * 0 이면 이 이벤트(this event)이며,
         * 1 이상이면 맵에 있는 특정 이벤트(specific event)를 나타냅니다.
         * -2면 normal window로 표시됩니다.
         */
        _balloon: number;
        /**
         * 정렬 배열. left, center, right 정렬을 나타내는 숫자를 저장하여 차례대로 꺼내 처리합니다.
         */
        _align: number[];

        /**
         * Gets or sets the height of map tile. This is used to calculate the position of balloon.
         */
        _balloonPatternHeight: number;
        /**
         * 마지막 정렬 위치
         */
        _lastAlign: number;
        /**
         * 최대 라인
         */
        _maxLine: number;

        /**
         * Sets the wait time
         * @param time
         */
        setWaitTime(time: number): void;
        /**
         * Sets the message text in gradient text mode will use.
         * @param text
         */
        setGradientText(text: string): void;
        /**
         * Gets the wait time.
         */
        getWaitTime: () => number;
        /**
         * Gets the message text in gradient text mode will use.
         */
        getGradientText: () => string;
        /**
         * Gets the length of message lines.
         */
        getMaxLine: () => number;
        /**
         * Sets the length of message lines.
         * @param maxLine
         */
        setMaxLine(maxLine: number): void;
        /**
         * Sets the balloon position.
         * if -1, the message window will be shown on the player.
         * else if 0, the message window will be shown on the current event.
         * else the event id is 1 or above, the message window will be shown on the specific event.
         * if the n is -2, the message window will be displayed as normal window.
         * @param n -2 (normal), -1 (player), 0 (current event), 1 or more (any event).
         */
        setBalloon(n: number): void;
        /**
         * Gets the balloon position.
         * if -1, the message window will be shown on the player.
         * else if 0, the message window will be shown on the current event.
         * else the event id is 1 or above, the message window will be shown on the specific event.
         * if the n is -2, the message window will be displayed as normal window.
         * @param n -2 (normal), -1 (player), 0 (current event), 1 or more (any event).
         */
        getBalloon(n?: number): number;
        setAlign: (n: number) => void;
        getAlign: (n?: number) => number;
        clearAlignLast(n?: number): void;
        /**
         * Sets the height of map tile.
         */
        setBalloonPatternHeight(value: number): void;
        /**
         * Gets the height of mpa tile.
         */
        getBalloonPatternHeight: () => number;
        /**
         * Checks whether the message window should be displayed the text as right to left.
         */
        isRTL: () => boolean;

        /**
         * Sets the name of current speaker in the name box above message window.
         * @param speakerName
         */
        setSpeakerName(speakerName: string): void;
    }

    interface Game_Temp {
        _callMSHeightFunc: Function;
        setMSHeightFunc(func: Function): void;
        setMaxLine(maxLine: number): void;
    }

    interface Game_CharacterBase {
        id: number;
        type: string;
    }

    type BalloonSpriteType = "actor" | "enemy";
    interface IBalloonSpriteTarget {
        type: BalloonSpriteType;
        id: number;
    }

    type MsgOwner =
        | Game_CharacterBase
        | IBalloonSpriteTarget
        | Game_Event
        | Game_Player
        | null;

    type MsgEvent = Number | Game_Event | Game_Character;

    type NameWindowPositon =
        | "right"
        | "center"
        | "left"
        | "opacity0"
        | "defaultOpacity"
        | "auto";

    namespace EventCommand {
        type MetaKey =
            | "윈도우 스킨"
            | "이름 윈도우 스킨"
            | "라인 높이"
            | "폰트 크기"
            | "라인"
            | "텍스트 시작 X"
            | "큰 페이스칩 OX"
            | "큰 페이스칩 OY"
            | "대화창 뒤에 얼굴 표시"
            | "대화창 투명도"
            | "텍스트 효과음 재생 여부"
            | "기본 텍스트 출력 속도";

        type CommentMeta = Record<MetaKey, any>;
    }

    interface Game_Map {
        _msgOwner: MsgOwner;
        _msgEvent: MsgEvent;

        getMsgOwner(): MsgOwner | null;
        setMsgOwner(o: MsgOwner): void;
        getMsgEvent(): MsgEvent;
        setMsgEvent(ev: MsgEvent): void;
    }

    interface Sprite_Battler {
        screenX: () => number;
        screenY: () => number;
    }

    type TextState = rm.types.TextState & {
        x: number;
        y: number;
        px: number;
        py: number;
    };

    interface Window_Base {
        new (...args: any): Window_Base;

        _isUsedTextWidthEx: boolean;
        contents: Bitmap;
        _messageDesc: MessageDesc | undefined;
        _textState: TextState;

        obtainEscapeCode(textState: any): string;
        obtainNameColor(textState: TextState): string;
        changeTextColor(color: any): void;
        loadWindowskin(): void;
        getFontFace(): string;
        save(): void;
        restore(): void;
        createTextState(
            text: string,
            x: number,
            y: number,
            width: number
        ): TextState;
        itemPadding(): number;
        newLineX(textState: TextState): number;
        processNewLine(textState: TextState): void;
        processNewLine(textState: rm.types.TextState): void;
        processAlign(textState: TextState): void;
        setAlignLeft(textState: TextState): void;
        setAlignCenter(textState: TextState): void;
        setAlignRight(textState: TextState): void;
    }

    interface BackgroundBuffer {
        buffer: Bitmap;
        textState: TextState;
        isDirty: boolean;
        x: number;
        y: number;
    }

    type MessageEventMap = "added" | "removed" | "onLoadWindowskin";

    interface Window_Message extends Window_Base {
        new (...args: any): Window_Message;

        on(
            event: MessageEventMap,
            fn: (displayObject: DisplayObject) => void,
            context?: any
        ): this;

        _pauseSignSprite: Sprite;
        _width: number;
        _height: number;
        _backBuffer: BackgroundBuffer;
        _showFast: boolean;
        _faceContents: Sprite;
        _goldWindow: Window_Gold;
        _positionType: number;
        _nameWindow: InstanceType<Window_Base>;
        _nameBoxWindow: Window_NameBox;
        _choiceListWindow: Window_ChoiceList;
        _isDirtyWindowskin: boolean;
        _textSoundInterval: number;

        obtainTextSpeed(textState: TextState): number;
        obtainGradientText(textState: TextState): string;
        obtainSoundName(textState: TextState): string;
        processEscapeCharacter(code: string, textState: TextState): void;
        processEscapeCharacter(
            code: string,
            textState: TextState | string
        ): void;
        processCharacter(textState: TextState): void;
        setTextSize(textSize: number): void;
        setStrokeColor(color: string): void;
        setTextIndent(textState: TextState): void;
        setStrokeWidth(strokeWidth: number): void;
        setTextBold(bold: boolean): void;
        setTextItalic(italic: boolean): void;
        setTextGradient(textState: TextState | rm.types.TextState): void;
        setHighlightTextColor(color: string): void;
        playSe(soundName: string): void;
        showPicture<T extends Object>(param: T): void;
        showPicture(param: string): void;
        erasePicture(picId: number): void;
        resetGradient(textState: TextState): void;
        processWordWrap(
            textState: TextState,
            w: number,
            width: number,
            isValid: boolean
        ): void;
        needsNewPage(textState: TextState): boolean;
        processNormalCharacterProxy(textState: TextState, c: string): void;
        isEndOfText: (textState: TextState | rm.types.TextState) => boolean;
        updateBigFaceOpacity(): void;
        fadeInOutFaceContents(): void;
        updateBalloonPosition(): void;
        updateDefaultOpacity(): void;
        updateContentsOpacity(): void;
        setFaceZIndex(index?: number): void;
        setHeight: (n: number) => void;
        createFaceContents(): void;
        removeEventHandler: () => void;
        onLoadWindowskin: () => void;
        removeFaceContents: () => void;
        isValidBigFace(faceName: string): RegExpExecArray | null;
        updateNameWindow(): void;
        shouldBreakHere(text: string): boolean;
        getSpriteActors(sign: number): IBalloonSpriteTarget | null;
        getSpriteEnemies(sign: number): IBalloonSpriteTarget | null;
        setupOwner(sign: number): void;
        resizeMessageSystem(): void;
        resizeMessageSystem(...args: args[]): void;

        /**
         * @method getDefaultWindowRect
         * @description
         * RPG Maker MZ에서는 Rectangle 데이터가 Window_Message 내부에 커플링(coupling) 되어있지 않습니다.
         * 따라서 scene에서 Rectangle 데이터가 주입(inject) 됩니다.
         */
        getDefaultWindowRect(): PIXI.Rectangle;
        /** @deprecated */
        windowWidth(): number;
        /** @deprecated */
        windowHeight(): number;

        /**
         * BalloonWindowTransformComponent를 이용하여 샌드박스 환경에서 calcBalloonRect를 실행합니다.
         * @param text
         */
        calcBalloonRect(text: string): void;

        updateBalloonPositionInBattle(): void;

        isAlreadyDrawnFace(): Bitmap | boolean;
        clearFaceBitmap(): void;
        redrawFaceImage(): void;

        /**
         * start the message window using balloon window mode.
         * @param sign
         */
        openBalloon(sign: number): void;

        /**
         * 새로운 라인이 시작되기 전에 이전 라인에 그려야 할 배경색을 마저 그리는 기능입니다.
         */
        flushTextBackgbround(textState: TextState): void;

        /**
         *
         */
        getDefaultSizeOption(): SizeOption;
    }

    export interface Scene_Base {
        calcWindowHeight(numLines: number, selectable?: boolean);
    }

    interface SizeOption {
        maxSW: number;
        maxSH: number;
        maxWidth: number;
        maxHeight: number;
        maxY: number;
        maxX: number;
    }

    export interface Window_NameBox extends Window_Base {
        _name: string;
        _messageWindow: Window_Message;

        new (...args: any): Window_NameBox;
    }

    export interface Game_Interpreter {
        _lineHeight: number;

        processMessageParams(eventId: number, index: number): void;
        isValidMultiLine(): boolean;
        command101(params: any): boolean;
        multiLineAddMessage(): void;
        initLineHeight(): void;
        isMultiLine(): boolean;
        addLineHeight(): void;
    }

    export interface MessageDesc {
        save(messageWindow: Window_Base): void;
        restore(messageWindow: Window_Base): void;
    }

    export interface Scene_Map {
        _spriteset: Spriteset_Map;
    }

    export interface Scene_Message {
        _messageWindow: Window_Message;

        messageWindowRect(): PIXI.Rectangle;
    }

    export interface Scene_Battle {
        _spriteset: Spriteset_Battle;
    }

    namespace Parameter {
        export interface Fonts {
            [key: string]: string;
            default: string;
        }

        export type NamePositionKeyMap =
            | "left"
            | "auto"
            | "center"
            | "opacity0"
            | "defaultOpacity"
            | "right";
    }

    /**
     * Gets the data that returns using a method nemd `textSizeEx` in the `Window_Base` class.
     */
    export type TextSizeRect = {
        width: number;
        height: number;
    };

    export interface MessageSystemParams {
        faceStartOriginX: number;
        nameWindowWidth: number;
        nameWindowRows: number;
        FONT_SIZE: number;
        STD_PADDING: number;
        isValidShakingChoice: boolean;
        fontSize: number;
        textSpeed: number;
        minFontSize: number;
        maxFontSize: number;
        textStartX: number;
        numVisibleRows: number;
        gradientColor1: Color;
        gradientColor2: Color;
        gradientColor3: Color;
        nameWindowX: number;
        nameWindowY: number;
        nameWindowStdPadding: number;
        namePositionTypeAtX: Parameter.NamePositionKeyMap;
        faceOX: number;
        faceOY: number;
        faceSide: boolean;
        WIDTH: number;
        HEIGHT: number;
        TabSize: number;
        backOpacity: number;
        translucentOpacity: Opacity;
        defaultOpacity: number;
        contentsOpacity: number;
        defaultOutlineWidth: number;
        defaultOutlineColor: Color;
        fonts: Parameter.Fonts;
        [key: string]: any;
        isTempSpriteContainerVisibility: boolean;
        lineHeight: number;
        windowOffset: PIXI.Point;
        fontSmoothingEnabled: boolean;
        customFont: Boolean;
        customFontName: string;
        customFontSrc: string;
        windowskin: string;
        windowskinForNameWindow: string;
        choiceWindowStyle: string;
        defaultChoicePostion: string;
        exTextColors: any[];
        isPlayTextSound: boolean;
        pathTextSound: string;
        textSoundEval1: string;
        textSoundEval2: string;
        textSoundInterval: number;
        textSoundPoolSize: number;
        langCode: string;
        preloadWindowskins: string[];
        isParagraphMinifier: boolean;
        gradientStyle: string;
        faceOpacity: number;
        faceDirection: number;
        DEBUG: boolean;
    }

    export interface IMessageSytem {
        jsonParse: (str: string) => any;
        popParameter: (...args: any[]) => any;
        getTextCode: (idx: number) => string;
        getEventComments: (
            eventId: number,
            index: number
        ) => EventCommand.CommentMeta;
        initSystem(): void;
        getKoreanColor(str: string): string;
        getChineseColor(str: string): string;
        getEnglishColor(str: string): string;
        getJapaneseColor(str: string): string;
        getBrowser(str: string): {
            name: string;
            version: string;
        };
        Reg: Record<string, any>;
        TextCodes: TextCode;
        Params: MessageSystemParams;
    }

    export interface RS {
        MessageSystem: IMessageSytem;
    }

    declare var nw: any;
    interface Window {
        RS: RS;
    }
    declare var RS: RS;
}
