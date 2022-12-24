/// <reference types="../types/my-types" />
/// <reference types="../types/lunalite-pixi-mz" />
import { NameWindowPositionComponent } from "./NameWindowPositionComponent";
import ComponentExecutor from "./ComponentExecutor";
import { processBitmap } from "./BitmapHandler";
import { processMain } from "./MainHandler";

const executor = ComponentExecutor.getInstance();

executor
    /**
     * ? Bitmap
     * @description 텍스트에 그라데이션을 채우는 기능을 추가합니다.
     */
    .add("bitmap", processBitmap())
    /**
     * ? Main
     * @description
     * 메인 엔트리 포인트입니다.
     */
    .add("main", processMain())
    .ready("bitmap")
    .ready("main")
    .executeAll();
