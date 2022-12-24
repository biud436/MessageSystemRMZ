/// <reference types="../types/my-types" />
/// <reference types="../types/lunalite-pixi-mz" />
import { NameWindowPositionComponent } from "./components/NameWindowPositionComponent";
import ComponentExecutor from "./core/ComponentExecutor";
import { getBitmapCommand } from "./commands/Bitmap.command";
import { getMainCommand } from "./commands/Main.command";
import { getGameCommandCommand } from "./commands/GameMessage.command";

const executor = ComponentExecutor.getInstance();

executor
    // commands
    .add("bitmap", getBitmapCommand())
    .add("gameMessage", getGameCommandCommand())
    .add("main", getMainCommand())
    // active commands
    .ready("bitmap")
    .ready("gameMessage")
    .ready("main")
    // execute commands
    .executeAll();
