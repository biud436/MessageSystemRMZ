import { BaseComponent } from "./BaseComponent";

var RS: any = RS || {};

/**
 * @class BalloonWindowTransformComponent
 * @description
 * 말풍선 윈도우의 위치를 조정하기 위한 컴포넌트입니다.
 */
export class BalloonWindowTransformComponent extends BaseComponent {
  private _bWidth: number = 0;
  private _bHeight: number = 0;
  private _isUsedTextWidthEx: boolean = false;
  public transform!: PIXI.Transform;

  onReady(props: { [key: string]: any }) {
    super.onReady(props);
    this._bWidth = 0;
    this._bHeight = 0;
    this._isUsedTextWidthEx = false;
  }

  /**
   * 샌드박스 환경을 구성합니다.
   *
   * @param {String} text
   * @returns {Number}
   */
  calcBalloonRect(text: string) {
    let temp, baseWidth, tempText, height: number, min, pad, numOfLines;

    // drawTextEx를 사용하기 전에 현재 상태를 저장한다.
    this.save();

    temp = text;

    // 라인 갯수를 구하기 위해 텍스트를 줄바꿈 문자를 기준으로 나눈다.
    tempText = text.slice(0);
    tempText = tempText.split(/[\r\n]+/);
    numOfLines = tempText.length;

    pad = this.standardPadding() * 2;

    // 높이를 구한다.
    height = 0;
    tempText.forEach((i) => (height += this.calcBalloonRectHeight(i)));

    if (height <= 0) {
      // 높이를 구할 수 없었다면,
      height = this.fittingHeight(numOfLines);
    } else {
      // 높이를 구했다면
      height = height + pad;
    }

    const textPadding = this.textPadding();

    // 폭을 계산한다.
    let pw = 0;
    for (var i = 0; i < numOfLines; i++) {
      this._isUsedTextWidthEx = true;
      const x = this.drawTextEx(tempText[i]);
      this._isUsedTextWidthEx = false;
      if (x >= pw) {
        pw = x;
      }
    }

    baseWidth = pw;
    this._bWidth =
      baseWidth + pad + textPadding || RS.MessageSystem.Params.WIDTH;

    // 얼굴 이미지가 설정되어있다면 ?
    if ($gameMessage.faceName() !== "") {
      // 최소 높이를 설정한다.
      min = this.fittingHeight(4);
      // 기존 폭 값에 얼굴 이미지의 폭을 더한다.
      this._bWidth += this.newLineX() + pad;
      if (RS.MessageSystem.Params.faceDirection === 2) {
        this._bWidth += ImageManager.faceWidth;
      }
      // 높이 값이 최소 높이보다 작으면, 최소 높이 값으로 설정한다.
      if (height < min) height = height.clamp(min, height + (min - height));
    }

    const type = RS.MessageSystem.Params.choiceWindowStyle;

    // 선택지가 있고, XP 스타일로 설정했을 때
    if (type === "RMXP" && $gameMessage.isChoice()) {
      const maxLines = tempText.length;
      const maxChoices = $gameMessage.choices().length;
      const lineHeight = this.lineHeight();
      // 선택지 갯수를 확장했을 수도 있지만, 4개로 가정한다.
      height = height + maxChoices * lineHeight;
      // 선택지 윈도우의 폭이 말풍선보다 크면 제한을 둔다.
      if (this._choiceWindow.windowWidth() > this._bWidth) {
        this._bWidth = this._choiceWindow.windowWidth();
      }
    }

    this._bHeight = height;

    // this.drawTextEx() 사용하기 이전 상태로 복구한다.
    this.restore();
  }

  isActiveInBalloon() {
    const isValidBalloon = $gameMessage.getBalloon() === -2;
    if (isValidBalloon) {
      this.updatePlacement();
      return false;
    }
    return true;
  }

  setBalloonRect(data: { [key: string]: any }) {
    const ox = RS.MessageSystem.Params.windowOffset.x;
    const oy = RS.MessageSystem.Params.windowOffset.y;
    this.x = data.dx + ox;
    this.y = data.dy + oy;
    this.width = this._bWidth;
    this.height = this._bHeight;

    if (
      $gameMessage.faceName() &&
      RS.MessageSystem.Params.faceDirection === 2
    ) {
      this.drawMessageFace();
    }
  }

  setBalloonPlacement(data: { [key: string]: any }) {
    // 화면 좌측
    if (!data) return;
    if (data.mx - this._bWidth / 2 < 0) {
      data.dx = 0;
      data.tx = this.canvasToLocalX(data.mx);
    }

    // 화면 우측
    if (data.mx - this._bWidth / 2 > Graphics.boxWidth - this._bWidth) {
      data.dx = Graphics.boxWidth - this._bWidth;
      data.tx = this.canvasToLocalX(data.mx);
    }

    // 화면 상단
    if (data.my - this._bHeight - data.tileHeight / 2 < 0) {
      data.dy = data.my + data.tileHeight / 2;
      data.scaleY = -1;
      data.ty = this._height * data.scaleY + this._height;
      data.ny = this.y + this._bHeight + RS.MessageSystem.Params.nameWindowY;
    }

    // 화면 하단
    if (data.my - this._bHeight > Graphics.boxHeight - this._bHeight) {
      data.dy = Graphics.boxWidth - this._bHeight;
      data.ty = this._height;
    }

    return data;
  }

  updateSubBalloonElements(data: { [key: string]: any }) {
    // deprecated
  }

  updateBalloonPosition() {
    let data: { [key: string]: any } = {};

    if (!this.isActiveInBalloon()) return;

    // 말풍선 소유자의 화면 좌표
    const owner = $gameMap.getMsgOwner();

    data.mx = (owner as Game_Character).screenX();
    data.my = (owner as Game_Character).screenY();

    data.tx = this._bWidth / 2;
    data.ty = this._bHeight;
    data.scaleY = 1;
    data.tileHeight = $gameMessage.getBalloonPatternHeight();
    data.dx = data.mx - this._bWidth / 2;
    data.dy = data.my - this._bHeight - data.tileHeight;
    data.ny =
      this.y - this._nameWindow.height - RS.MessageSystem.Params.nameWindowY;

    data = <{ [key: string]: any }>(
      this.setBalloonPlacement(Object.create(data))
    );

    if (
      data.dx + RS.MessageSystem.Params.windowOffset.x !== this.x ||
      data.dy + RS.MessageSystem.Params.windowOffset.y !== this.y ||
      this._bWidth !== this.width ||
      this._bHeight !== this.height
    ) {
      // 말풍선 위치 및 크기 설정
      this.setBalloonRect(data);

      // 멈춤 표시 스프라이트 위치 조정
      this.updateSubBalloonElements(data);
    }
  }

  updateBalloonPositionInBattle() {
    if (!$gameParty.inBattle()) {
      // 전투 씬인지 확인
      console.warn("전투가 아닙니다");
      return;
    }
    if (!$gameSystem.isSideView()) {
      // 사이드뷰 전투인지 확인
      console.warn("사이드뷰 전투가 아닙니다.");
      return;
    }

    let data = <{ [key: string]: any }>{};

    // 타겟의 화면 좌표 설정
    let owner = $gameMap.getMsgOwner();
    if (!owner) {
      console.warn("owner 변수가 없습니다");
      return;
    }
    if (!owner.hasOwnProperty("type")) {
      console.warn("type 속성이 없습니다 : " + owner);
      return;
    }
    if (!owner.hasOwnProperty("id")) {
      console.warn("id 속성이 없습니다 : " + owner);
      return;
    }

    // 현재 씬이 전투 씬이 아닌 경우를 확인한다.
    let scene = SceneManager._scene;
    if (!(scene instanceof Scene_Battle)) {
      console.warn("전투 장면이 아닙니다");
      return false;
    }

    let parent;

    // 액터인가?
    if (owner.type === "actor") {
      parent = scene._spriteset._actorSprites; // 액터 스프라이트 군을 반환
    } else {
      parent = scene._spriteset._enemySprites; // 적 스프라이트 군을 반환
    }

    // 타겟 스프라이트를 id 값으로 찾는다.
    let tempBattlers = [];
    tempBattlers = parent;
    let target = tempBattlers[owner.id];
    if (!target) {
      console.warn("타겟이 없습니다");
      return;
    }

    // 이미 죽어있다면 메시지를 일반 메시지로 표시한다.
    if (
      (owner.type === "actor" && !(<Sprite_Actor>target)._actor.isAlive()) ||
      (owner.type === "enemy" && !(<Sprite_Enemy>target)._enemy.isAlive())
    ) {
      return;
    }

    data.mx = target.x;
    data.my = target.y;

    data.padY =
      owner.type === "actor"
        ? (target as Sprite_Actor)._mainSprite.bitmap.height / 6
        : target.bitmap.height;

    data.tx = this._width / 2;
    data.ty = this._height;

    data.scaleY = 1;
    data.tileHeight = $gameMessage.getBalloonPatternHeight();

    data.dx = data.mx - this._bWidth / 2;
    data.dy = data.my - this._bHeight - data.tileHeight - data.padY;

    data.ny =
      this.y - this._nameWindow.height - RS.MessageSystem.Params.nameWindowY;

    data = <{ [key: string]: any }>(
      this.setBalloonPlacement(Object.create(data))
    );

    // 말풍선 위치 및 크기 설정
    this.setBalloonRect(data);

    // 멈춤 표시 스프라이트 위치 조정
    this.updateSubBalloonElements(data);

    if (this.transform) this.updateTransform();
  }

  updateTransform(): void {
    this.messageWindow.updateTransform();
  }

  calcBalloonRectHeight(text: string) {
    // 상태 저장
    this.save();

    const messageWindow = this.messageWindow;
    const tempFontSize = this.contents.fontSize;

    const textState = messageWindow.createTextState(text, 0, 0, 0);
    textState.text = messageWindow.convertEscapeCharacters(text);
    textState.height = messageWindow.calcTextHeight(textState, false);

    // 상태 복구
    this.restore();

    messageWindow.setTextSize(tempFontSize);
    return textState.height;
  }
}
