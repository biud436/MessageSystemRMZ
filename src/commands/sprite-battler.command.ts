import { Executuor } from "../core/component-executor";

export function getSpriteBattlerCommand(): Executuor {
  return () => {
    //============================================================================
    // Sprite_Battler
    //============================================================================
    Sprite_Battler.prototype.screenX = function () {
      return this.x || 0;
    };

    Sprite_Battler.prototype.screenY = function () {
      return this.y || 0;
    };
  };
}
