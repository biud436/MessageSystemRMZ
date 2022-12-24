/// <reference types="../types/my-types" />
/// <reference types="../types/lunalite-pixi-mz" />
import { NameWindowPositionComponent } from "./components/NameWindowPositionComponent";
import ComponentExecutor from "./core/ComponentExecutor";
import { getBitmapCommand } from "./commands/Bitmap.command";
import { getMainCommand } from "./commands/Main.command";

const executor = ComponentExecutor.getInstance();

executor
    .add("bitmap", getBitmapCommand())
    .add("main", getMainCommand())
    .ready("bitmap")
    .ready("main")
    .executeAll();
