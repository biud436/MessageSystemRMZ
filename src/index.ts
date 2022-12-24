/// <reference types="../types/my-types" />
/// <reference types="../types/lunalite-pixi-mz" />
import ComponentExecutor from "./core/ComponentExecutor";
import { getBitmapCommand } from "./commands/Bitmap.command";
import { getMainCommand } from "./commands/Main.command";
import { getGameCommandCommand } from "./commands/GameMessage.command";
import { getSpriteBattlerCommand } from "./commands/SpriteBattler.command";
import { getWindowBaseCommand } from "./commands/WindowBase.command";
import { getWindowMessageCommand } from "./commands/WindowMessage.command";
import { getGameInterpreterCommand } from "./commands/GameInterpreter.command";
import { getWindowNameBoxCommand } from "./commands/WindowNameBox.command";

const executor = ComponentExecutor.getInstance();

executor
    // commands
    .add("bitmap", getBitmapCommand())
    .add("Game_Message", getGameCommandCommand())
    .add("Sprite_Battler", getSpriteBattlerCommand())
    .add("Window_Base", getWindowBaseCommand())
    .add("Window_Message", getWindowMessageCommand())
    .add("Game_Interpreter", getGameInterpreterCommand())
    .add("Window_NameBox", getWindowNameBoxCommand())
    .add("main", getMainCommand())
    // active commands
    .ready("bitmap")
    .ready("Game_Message")
    .ready("Sprite_Battler")
    .ready("Window_Base")
    .ready("Window_Message")
    .ready("Game_Interpreter")
    .ready("Window_NameBox")
    .ready("main")
    // execute commands
    .executeAll();
