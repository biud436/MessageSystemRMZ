import { BaseComponent } from "./BaseComponent";

/**
 * @class NamwWindowPositionComponent
 * @description
 * 이름 윈도우의 X좌표를 재설정합니다.
 */
export class NameWindowPositionComponent extends BaseComponent {
    setOpacity(value: number) {
        let opacity = value;
        if (typeof opacity !== "number") {
            opacity = Number(opacity);
        }
        if (isNaN(opacity)) {
            opacity = 255;
        }
        this._nameWindow.opacity = value;
    }

    updatePositionX() {
        // 이름 윈도우가 없다면
        if (!this._nameWindow) {
            return;
        }

        const mx = this.x;
        const w = this.width;
        const nw = this._nameWindow.width;

        const position = <NameWindowPositon>(
            RS.MessageSystem.Params.namePositionTypeAtX
        );

        const nx = RS.MessageSystem.Params.nameWindowX;

        let newX = mx + nx;

        switch (position) {
            case "right":
                newX = mx + w - nw - nx;
                break;
            case "center":
                newX = mx + w / 2 - nw / 2 - nx;
                break;
            case "left":
                newX = mx + nx;
                break;
            case "opacity0":
                this.setOpacity(0);
                break;
            case "defaultOpacity":
                this.setOpacity(RS.MessageSystem.Params.defaultOpacity);
                break;
            case "auto":
                newX = this.x + this.newLineX() + nx;
                break;
        }

        this._nameWindow.x = newX;
    }

    updatePositionY() {
        const ox = RS.MessageSystem.Params.windowOffset.x;
        const oy = RS.MessageSystem.Params.windowOffset.y;
        const positionType = $gameMessage.positionType();
        const ballonOwnerType = $gameMessage.getBalloon();

        this.updatePositionX();

        // 메시지 윈도우가 상단이고, 말풍선 모드가 아니라면
        if (positionType === 0 && ballonOwnerType === -2) {
            // 최상단의 위치
            const topY = 0;

            this._nameWindow.y = topY + oy;

            // 이름 윈도우가 열렸는 지 여부에 따라 메시지 윈도우의 Y 좌표를 설정합니다.
            this.y = this._nameWindow.isOpen()
                ? topY +
                  this._nameWindow.height +
                  RS.MessageSystem.Params.nameWindowY +
                  oy
                : topY + oy;
        } else {
            this._nameWindow.y =
                this.y -
                this._nameWindow.height -
                RS.MessageSystem.Params.nameWindowY;
        }
    }
}
