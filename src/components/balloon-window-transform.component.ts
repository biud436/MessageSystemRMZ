import { BaseComponent } from "./base.component";
import { ComponentProp } from "../core/component2";

export type BalloonRectData = {
  /**
   *
   */
  mx: number;
  /**
   *
   */
  my: number;
  /**
   *
   */
  tx: number;
  /**
   *
   */
  ty: number;
  /**
   *
   */
  tileHeight: number;
  /**
   * Sets or gets `dx` that means the destination x coordinate.
   */
  dx: number;
  /**
   * Sets or gets `dy` that means the destination y coordinate.
   */
  dy: number;
  /**
   * Gets or sets the value related for the name window.
   */
  ny: number;
  /**
   *
   */
  scaleY: number;
  /**
   * Gets or sets the padding value (like value named `padding-bottom`)
   * `screenX`와 `screenY`는 `right-bottom`에 위치하므로 `height` 만큼 빼야 합니다.
   */
  padY: number;
};

/**
 * @class BalloonWindowTransformComponent
 * @description
 * 말풍선 윈도우의 위치를 조정하기 위한 컴포넌트입니다.
 */
export class BalloonWindowTransformComponent extends BaseComponent {
  private _bWidth: number = 0;
  private _bHeight: number = 0;
  public transform!: PIXI.Transform;

  onReady(props: ComponentProp) {
    super.onReady(props);
    this._bWidth = this.width;
    this._bHeight = this.height;
  }

  /**
   * 말풍선 영역의 크기를 계산합니다.
   *
   * @param {String} text
   * @returns {Number}
   */
  calcBalloonRect(text: string) {
    // {
    //     let temp: string,
    //         baseWidth: number,
    //         tempText: string[],
    //         height: number,
    //         min: number,
    //         pad: number,
    //         numOfLines: number;
    //     // drawTextEx를 사용하기 전에 현재 상태를 저장한다.
    //     this.save();

    //     temp = text;

    //     // 라인 갯수를 구하기 위해 텍스트를 줄바꿈 문자를 기준으로 나눈다.
    //     const copyText = text.slice(0);
    //     tempText = copyText.split(/[\r\n]+/);
    //     numOfLines = tempText.length;

    //     pad = this.standardPadding() * 2;

    //     // 높이를 구한다.
    //     height = 0;
    //     tempText.forEach((i) => (height += this.calcBalloonRectHeight(i)));

    //     if (height <= 0) {
    //         // 높이를 구할 수 없었다면,
    //         height = this.fittingHeight(numOfLines);
    //     } else {
    //         // 높이를 구했다면
    //         height = height + pad;
    //     }

    //     const textPadding = this.textPadding();

    //     // 폭을 계산한다.
    //     let pw = 0;
    //     for (var i = 0; i < numOfLines; i++) {
    //         this._isUsedTextWidthEx = true;
    //         const x = this.drawTextEx(tempText[i]);
    //         this._isUsedTextWidthEx = false;
    //         if (x >= pw) {
    //             pw = x;
    //         }
    //     }

    //     baseWidth = pw;
    //     this._bWidth =
    //         baseWidth + pad + textPadding || RS.MessageSystem.Params.WIDTH;

    //     // 얼굴 이미지가 설정되어있다면 ?
    //     if ($gameMessage.faceName() !== "") {
    //         // 최소 높이를 설정한다.
    //         min = this.fittingHeight(4);
    //         // 기존 폭 값에 얼굴 이미지의 폭을 더한다.
    //         this._bWidth += this.newLineX() + pad;
    //         if (RS.MessageSystem.Params.faceDirection === 2) {
    //             this._bWidth += ImageManager.faceWidth;
    //         }
    //         // 높이 값이 최소 높이보다 작으면, 최소 높이 값으로 설정한다.
    //         if (height < min)
    //             height = height.clamp(min, height + (min - height));
    //     }

    //     const type = RS.MessageSystem.Params.choiceWindowStyle;

    //     // 선택지가 있고, XP 스타일로 설정했을 때
    //     if (type === "RMXP" && $gameMessage.isChoice()) {
    //         const maxLines = tempText.length;
    //         const maxChoices = $gameMessage.choices().length;
    //         const lineHeight = this.lineHeight();
    //         // 선택지 갯수를 확장했을 수도 있지만, 4개로 가정한다.
    //         height = height + maxChoices * lineHeight;
    //         // 선택지 윈도우의 폭이 말풍선보다 크면 제한을 둔다.
    //         if (this._choiceWindow.windowWidth() > this._bWidth) {
    //             this._bWidth = this._choiceWindow.windowWidth();
    //         }
    //     }

    //     this.restore();
    // }
    this.save();

    {
      // TODO: 얼굴 이미지 설정 체크
      // TODO: 인라인 선택지 모드인지 체크

      const rect = this.textSizeEx(text);
      const padding = this.standardPadding();
      this._bWidth = rect.width + padding * 2;
      this._bHeight = Math.max(
        rect.height + padding * 2,
        this.fittingHeight(1)
      );
      // this.drawTextEx() 사용하기 이전 상태로 복구한다.
    }
    this.restore();
  }

  textSizeEx(text: string): TextSizeRect {
    this.messageWindow._isUsedTextWidthEx = true;
    const rect = this.messageWindow.textSizeEx(text);
    this.messageWindow._isUsedTextWidthEx = false;

    return rect;
  }

  /**
   * @override
   */
  updatePlacement() {
    this.messageWindow.updatePlacement();
  }

  isActiveInBalloon() {
    const isInValidBalloon = $gameMessage.getBalloon() === -2;
    if (isInValidBalloon) {
      this.updatePlacement();
      return false;
    }
    return true;
  }

  setBalloonRect(data: BalloonRectData) {
    const faceName = $gameMessage.faceName();
    const faceDirection = RS.MessageSystem.Params.faceDirection;

    const ox = RS.MessageSystem.Params.windowOffset.x;
    const oy = RS.MessageSystem.Params.windowOffset.y;
    this.x = data.dx + ox;
    this.y = data.dy + oy;
    this.width = this._bWidth;
    this.height = this._bHeight;

    if (faceName && faceDirection === 2) {
      this.drawMessageFace();
    }
  }

  setBalloonPlacement(data: BalloonRectData): BalloonRectData | void {
    const gw = Graphics.width;
    const gh = Graphics.height;
    const bw = Graphics.boxWidth;
    const bh = Graphics.boxHeight;

    console.log("setBalloonPlacement() + " + JSON.stringify(data));
    // 화면 좌측
    if (!data) return;
    if (data.mx - this._bWidth / 2 < 0) {
      data.dx = 0;
      data.tx = this.canvasToLocalX(data.mx);
    }

    // 화면 우측
    if (data.mx - this._bWidth / 2 > bw - this._bWidth) {
      data.dx = bw - this._bWidth;
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
    if (data.my - this._bHeight > bh - this._bHeight) {
      data.dy = bh - this._bHeight;
      data.ty = this._height;
    }

    return data;
  }

  /**
   * Updates position of the pause sprite and the name window.
   *
   * @param data
   */
  updateSubBalloonElements(data: BalloonRectData) {
    const _pauseSignSprite = this.messageWindow._pauseSignSprite;
    if (_pauseSignSprite) {
      _pauseSignSprite.move(data.tx, data.ty);
      _pauseSignSprite.scale.y = data.scaleY;
    }
    this._nameWindow.y = data.ny;
  }

  getNameWindowY(): number {
    const ny =
      this.y - this._nameWindow.height - RS.MessageSystem.Params.nameWindowY;

    return ny ? ny : 0;
  }

  // canvasToLocalX(x: number) {
  //     let node: any = this.messageWindow;
  //     while (node) {
  //         x -= node.x;
  //         node = <Sprite>node.parent;
  //     }
  //     return x;
  // }

  // canvasToLocalY(y: number) {
  //     let node: any = this.messageWindow;
  //     while (node) {
  //         y -= node.y;
  //         node = node.parent;
  //     }
  //     return y;
  // }

  updateBalloonPosition(): never | void {
    console.log(
      "============ DEBUG updateBalloonPosition() ===================="
    );

    let data = <BalloonRectData>{};

    if (!this.isActiveInBalloon()) return;

    // 말풍선 소유자의 화면 좌표
    const owner = <Game_Character>$gameMap.getMsgOwner();

    if (!owner) {
      console.warn($gameMap.getMsgOwner());
      throw new Error("말풍선 소유자가 없습니다.");
    }

    data.mx = owner.screenX();
    data.my = owner.screenY();

    console.log("%d %d", data.mx, data.my);

    data.tx = this._bWidth / 2;
    data.ty = this._bHeight;
    data.scaleY = 1;
    data.tileHeight = $gameMessage.getBalloonPatternHeight();
    data.dx = data.mx - this._bWidth / 2;
    data.dy = data.my - this._bHeight - data.tileHeight;
    data.ny = this.getNameWindowY();

    console.log(JSON.stringify(data));

    data = <BalloonRectData>this.setBalloonPlacement(data);

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

    let data = <BalloonRectData>{};

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

    data = <BalloonRectData>this.setBalloonPlacement(data);

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
