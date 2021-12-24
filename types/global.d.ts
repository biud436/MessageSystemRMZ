export declare global {
  interface Array<T> {
    contains(value: T): boolean;
  }
  interface String {
    contains(value: string): boolean;
  }

  interface Number {
    clamp(min: number, max: number): number;
  }

  interface Bitmap {
    fontBold: boolean;
    fontGradient: boolean;
    highlightTextColor: Required<string | null>;
    _context: CanvasRenderingContext2D;
    _baseTexture: PIXI.BaseTexture;

    initialize(width: number, height: number): void;
    setGradient(
      text: string,
      color1: string,
      color2: string,
      color3: string,
      tx: number,
      ty: number
    ): void;
    setGradientStyle(
      text: string,
      color1: string,
      color2: string,
      color3: string,
      tx: number,
      ty: number
    ): CanvasGradient;
    _makeFontNameText(): string;
    _drawTextBody(text: string, tx: number, ty: number, maxWidth: number): void;
  }

  interface Game_Message {
    _waitTime: number;
    _gradientText: string;
    _balloon: number;
    _align: number[];
    _balloonPatternHeight: number;
    _lastAlign: number;
    _maxLine: number;

    setWaitTime(time: number): void;
    setGradientText(text: string): void;
    getWaitTime: () => number;
    getGradientText: () => string;
    getMaxLine: () => number;
    setMaxLine(maxLine: number): void;
    setBalloon(n: number): void;
    getBalloon(n?: number): number;
    setAlign: (n: number) => void;
    getAlign: (n?: number) => number;
    clearAlignLast(n?: number): void;
    setBalloonPatternHeight(value: number): void;
    getBalloonPatternHeight: () => number;
    isRTL: () => boolean;
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

    getMsgOwner(): MsgOwner;
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

  interface Window_Message extends Window_Base {
    new (...args: any): Window_Message;

    _pauseSignSprite: Sprite;
    _width: number;
    _height: number;
    _backBuffer: {
      buffer: Bitmap;
      textState: TextState | null;
      isDirty: boolean;
    };
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
    processEscapeCharacter(code: string, textState: TextState | string): void;
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
    setFaceZIndex(index: number): void;
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
    command101(): boolean;
    multiLineAddMessage(): void;
    initLineHeight(): void;
    isMultiLine(): boolean;
    addLineHeight(): void;
  }

  export interface MessageDesc {
    save(contents: Bitmap): void;
    restore(contents: Bitmap): void;
  }

  export interface Scene_Map {
    _spriteset: Spriteset_Map;
  }

  export interface Scene_Battle {
    _spriteset: Spriteset_Battle;
  }
}
