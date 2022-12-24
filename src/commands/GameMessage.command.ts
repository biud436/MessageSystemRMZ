import { Executuor } from "../core/ComponentExecutor";

export function getGameCommandCommand(): Executuor {
    return () => {
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
    };
}
