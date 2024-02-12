import { Executuor } from "../core/component-executor";

export function getGameMapCommand(): Executuor {
  return () => {
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

      const tileHeight = this.tileHeight();
      $gameMessage.setBalloonPatternHeight(tileHeight);
    };

    Game_Map.prototype.getMsgEvent = function () {
      return this._msgEvent;
    };

    Game_Map.prototype.setMsgEvent = function (ev) {
      this._msgEvent = ev;
    };
  };
}
