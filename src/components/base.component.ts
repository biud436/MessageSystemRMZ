import { Component, ComponentProp } from "../core/component2";

/**
 * @class BaseComponent
 * @description
 * 샌드박스 환경에서 MV 메소드를 호출하여 이전 버전에 대한 안전성을 제공합니다.
 */
export class BaseComponent extends Component {
  private _messageWindow!: Window_Message;

  constructor(props: ComponentProp) {
    super(props);
  }

  onReady(props: ComponentProp) {
    // if the message window is valid from passed props.
    if (!("messageWindow" in props)) {
      console.error("messageWindow is not defined");
      return;
    }

    console.log("On Ready 이벤트가 실행되었습니다.");

    /**
     * @type {Window_Message}
     */
    this._messageWindow = props.messageWindow;
  }

  // Getters
  get messageWindow() {
    return this._messageWindow;
  }

  get contents() {
    return this._messageWindow.contents;
  }

  /**
   * @returns {Window_NameBox}
   */
  get _nameWindow(): never | Window_NameBox {
    const isNameWindowOK = this._messageWindow._nameBoxWindow;
    if (!isNameWindowOK) {
      throw new Error(
        "이름 윈도우가 아직 정의되지 않았습니다. DI를 제대로된 시점에 하시기 바랍니다."
      );
    }

    return this._messageWindow._nameBoxWindow;
  }

  get _choiceWindow() {
    return this._messageWindow._choiceListWindow
      ? this._messageWindow._choiceListWindow
      : {
          windowWidth: () => 0,
          windowHeight: () => 0,
        };
  }

  save(): void {
    this._messageWindow.save();
  }

  restore(): void {
    this._messageWindow.restore();
  }

  standardPadding() {
    // 패딩을 업데이트해야 합니다 (MZ에서 달라진 부분입니다)
    // 꼭 체크할 필요는 없지만...
    this._messageWindow.updatePadding();
    const padding = this._messageWindow.padding || 12;

    return padding;
  }

  textPadding() {
    // textPadding()의 구현입니다.
    return this._messageWindow.itemPadding() || 6;
  }

  newLineX() {
    return this._messageWindow.newLineX();
  }

  fittingHeight(numLines: number) {
    return this._messageWindow.fittingHeight(numLines);
  }

  drawTextEx(text: string) {
    const box = this._messageWindow.textSizeEx(text);
    return box.width;
  }

  lineHeight() {
    return this._messageWindow.lineHeight();
  }

  updatePlacement() {}

  drawMessageFace() {
    this._messageWindow.drawMessageFace();
  }

  set x(value: number) {
    this._messageWindow.x = value;
  }

  set y(value: number) {
    this._messageWindow.y = value;
  }

  set width(value: number) {
    this._messageWindow.width = value;
  }

  set height(value: number) {
    this._messageWindow.height = value;
  }

  get width() {
    return this._messageWindow.width;
  }

  get _width() {
    return this._messageWindow.width;
  }

  get height() {
    return this._messageWindow.height;
  }

  get _height() {
    return this._messageWindow.height;
  }

  canvasToLocalX(x: number) {
    return x;
  }

  canvasToLocalY(y: number) {
    return y;
  }
}
