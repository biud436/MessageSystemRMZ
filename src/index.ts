/// <reference types="../types/my-types" />
/// <reference types="../types/lunalite-pixi-mz" />
import ComponentExecutor from "./core/ComponentExecutor";
import { getBitmapCommand } from "./commands/Bitmap.command";
import { getMainCommand } from "./commands/Main.command";
import { getGameCommandCommand } from "./commands/GameMessage.command";
import { getSpriteBattlerCommand } from "./commands/SpriteBattler.command";

const executor = ComponentExecutor.getInstance();

executor
    // commands
    .add("bitmap", getBitmapCommand())
    .add("Game_Message", getGameCommandCommand())
    .add("Sprite_Battler", getSpriteBattlerCommand())
    .add("main", getMainCommand())
    // active commands
    .ready("bitmap")
    .ready("Game_Message")
    .ready("Sprite_Battler")
    .ready("main")
    // execute commands
    .executeAll();
