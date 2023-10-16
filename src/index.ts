/// <reference types="../types/my-types" />
/// <reference types="../types/lunalite-pixi-mz" />
import ComponentExecutor from "./core/component-executor";
import { getBitmapCommand } from "./commands/bitmap.command";
import { getMainCommand } from "./commands/main.command";
import { getGameCommandCommand } from "./commands/game-message.command";
import { getSpriteBattlerCommand } from "./commands/sprite-battler.command";
import { getWindowBaseCommand } from "./commands/window-base.command";
import { getWindowMessageCommand } from "./commands/window-message.command";
import { getGameInterpreterCommand } from "./commands/game-interpreter.command";
import { getWindowNameBoxCommand } from "./commands/window-name-box.command";
import { getGameTempCommand } from "./commands/game-temp.command";
import { getGameMapCommand } from "./commands/game-map.command";
import { getDefaultCommandTest } from "./__test__/default-command.test";

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
  .lazy("test", getDefaultCommandTest())
  // execute commands
  .executeAll();
