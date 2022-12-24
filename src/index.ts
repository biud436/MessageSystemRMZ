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
    .addCommand("bitmap", getBitmapCommand())
    .addCommand("Game_Message", getGameCommandCommand())
    .addCommand("Sprite_Battler", getSpriteBattlerCommand())
    .addCommand("Window_Base", getWindowBaseCommand())
    .addCommand("Window_Message", getWindowMessageCommand())
    .addCommand("Game_Interpreter", getGameInterpreterCommand())
    .addCommand("Window_NameBox", getWindowNameBoxCommand())
    .addCommand("Game_Temp", getGameTempCommand())
    .addCommand("Game_Map", getGameMapCommand())
    .addCommand("main", getMainCommand())
    // execute commands
    .executeAll();
