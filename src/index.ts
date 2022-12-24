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
import { getGameTempCommand } from "./commands/GameTemp.command";
import { getGameMapCommand } from "./commands/GameMap.command";

const executor = ComponentExecutor.getInstance();

executor
    // commands
    .inject("bitmap", getBitmapCommand())
    .inject("Game_Message", getGameCommandCommand())
    .inject("Sprite_Battler", getSpriteBattlerCommand())
    .inject("Window_Base", getWindowBaseCommand())
    .inject("Window_Message", getWindowMessageCommand())
    .inject("Game_Interpreter", getGameInterpreterCommand())
    .inject("Window_NameBox", getWindowNameBoxCommand())
    .inject("Game_Temp", getGameTempCommand())
    .inject("Game_Map", getGameMapCommand())
    .inject("main", getMainCommand())
    // execute commands
    .executeAll();
