/// <reference types="../types/my-types" />
/// <reference types="../types/lunalite-pixi-mz" />
import { NameWindowPositionComponent } from "./components/NameWindowPositionComponent";
import ComponentExecutor from "./core/ComponentExecutor";
import { getBitmapCommand } from "./commands/Bitmap.command";
import { getMainCommand } from "./commands/Main.command";

const executor = ComponentExecutor.getInstance();

executor
    /**
     * ? Bitmap
     * @description 텍스트에 그라데이션을 채우는 기능을 추가합니다.
     */
    .add("bitmap", getBitmapCommand())
    /**
     * ? Main
     * @description
     * 메인 엔트리 포인트입니다.
     */
    .add("main", getMainCommand())
    .ready("bitmap")
    .ready("main")
    .executeAll();
