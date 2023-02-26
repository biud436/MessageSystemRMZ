/***
 * 이것은 RPG Maker MV 호환성을 위해 존재하며 타입스크립트로 재작성되어야 합니다.
 */
import { Types } from "../../types/parameters";
import { TextCode, LanguageType, TC } from "./interfaces/RS.interface";

const pluginParams = $plugins.filter((i) => {
    return i.description.contains("<RS_MessageSystem>");
});

const pluginName = <Types.PluginName>(
    (pluginParams.length > 0 && pluginParams[0].name)
);
const parameters = <Types.PluginParameters>(
    (pluginParams.length > 0 && pluginParams[0].parameters)
);

const RS = <RS>{
    MessageSystem: <IMessageSytem>{},
};

RS.MessageSystem.jsonParse = function (str: string) {
    const retData = JSON.parse(str, (k, v) => {
        try {
            return RS.MessageSystem.jsonParse(v);
        } catch (e) {
            return v;
        }
    });

    return retData;
};

/**
 * @method popParameter
 */
RS.MessageSystem.popParameter = function (...args: any[]) {
    const k = Object.keys(args);
    let lastUsed = "";

    while (k.length > 0) {
        lastUsed = args[parseInt(<string>k.pop())];

        // @ts-ignore
        if (parameters[lastUsed]) return parameters[lastUsed];
    }

    return "";
};

RS.MessageSystem.Reg = {
    Default: [],
    Group: [],
    Korean: [],
    Chinese: [],
    English: [],
    Japanese: [],
};

enum MessageParams {
    FACE_START_ORIGIN_X = 168,
    NAME_WINDOW_WIDTH = 140,
    NAME_WINDOW_ROWS = 1,
    FONT_SIZE = 28,
    STD_PADDING = 18,
}

RS.MessageSystem.Params = {
    faceStartOriginX: MessageParams.FACE_START_ORIGIN_X,
    nameWindowWidth: MessageParams.NAME_WINDOW_WIDTH,
    nameWindowRows: MessageParams.NAME_WINDOW_ROWS,
    FONT_SIZE: MessageParams.FONT_SIZE,
    STD_PADDING: MessageParams.STD_PADDING,
    isValidShakingChoice: false,
    fontSize: Number(
        RS.MessageSystem.popParameter("Font Size", "글꼴 크기") || 28
    ),
    textSpeed: Number(
        RS.MessageSystem.popParameter("Text Speed", "기본 텍스트 출력 속도") ||
            0
    ),
    minFontSize: Number(
        RS.MessageSystem.popParameter("Text Min Size", "폰트 최소 크기") || 24
    ),
    maxFontSize: Number(
        RS.MessageSystem.popParameter("Text Max Size", "폰트 최대 크기") || 96
    ),
    textStartX: Number(
        RS.MessageSystem.popParameter("Text Start X", "텍스트 시작 X")
    ),
    numVisibleRows: Number(
        RS.MessageSystem.popParameter("numVisibleRows", "라인 갯수") || 4
    ),
    gradientColor1: String(
        RS.MessageSystem.popParameter(
            "gradientColor1",
            "그레디언트 시작 색상"
        ) || "#FFFFFF"
    ),
    gradientColor2: String(
        RS.MessageSystem.popParameter(
            "gradientColor2",
            "그레디언트 중간 색상"
        ) || "#F29661"
    ),
    gradientColor3: String(
        RS.MessageSystem.popParameter("gradientColor3", "그레디언트 끝 색상") ||
            "#CC3D3D"
    ),
    nameWindowX: Number(
        RS.MessageSystem.popParameter("Name Window X", "이름 윈도우 X") || 0
    ),
    nameWindowY: Number(
        RS.MessageSystem.popParameter("Name Window Y", "이름 윈도우 Y") || 0
    ),
    nameWindowStdPadding: Number(
        RS.MessageSystem.popParameter(
            "Name Window Inner Padding",
            "이름 윈도우 안쪽 여백"
        ) || 18
    ),
    namePositionTypeAtX:
        RS.MessageSystem.popParameter(
            "Name Window Position",
            "이름 윈도우 위치"
        ) || "left",
    faceOX: Number(
        RS.MessageSystem.popParameter("Big Face OX", "큰 페이스칩 OX") || 0
    ),
    faceOY: Number(
        RS.MessageSystem.popParameter("Big Face OY", "큰 페이스칩 OY") || 0
    ),
    faceSide: Boolean(
        RS.MessageSystem.popParameter(
            "Show Big Face Back",
            "대화창 뒤에 얼굴 표시"
        ) === "true" || false
    ),
    WIDTH: MessageParams.FONT_SIZE * 6 + MessageParams.STD_PADDING,
    HEIGHT: MessageParams.FONT_SIZE + MessageParams.STD_PADDING / 2,
    TabSize: Number(RS.MessageSystem.popParameter("Tab Size", "탭 크기")),
    backOpacity: Number(
        RS.MessageSystem.popParameter("back Opacity", "배경 그림의 투명도")
    ),
    translucentOpacity: Number(
        RS.MessageSystem.popParameter("translucent Opacity", "반투명도")
    ),
    defaultOpacity: Number(
        RS.MessageSystem.popParameter("default Opacity", "기본 투명도")
    ),
    contentsOpacity: Number(
        RS.MessageSystem.popParameter("contents Opacity", "내용의 투명도")
    ),
    defaultOutlineWidth: Number(
        RS.MessageSystem.popParameter("default outline width", "테두리 크기")
    ),
    defaultOutlineColor:
        RS.MessageSystem.popParameter("default outline Color", "테두리 색상") ||
        "white",
    fonts: {
        default: "rmmz-mainfont",
    },
    isTempSpriteContainerVisibility: false,
    lineHeight: 36,
    windowOffset: new Point(-4, -4),
    fontSmoothingEnabled: true,
    customFont: Boolean(
        RS.MessageSystem.popParameter(
            "Using Custom Font",
            "사용자 지정 폰트 사용 여부"
        ) === "true"
    ),
    customFontName: String(
        RS.MessageSystem.popParameter(
            "Custom Font Name",
            "사용자 지정 폰트명"
        ) || "GameFont"
    ),
    customFontSrc: String(
        RS.MessageSystem.popParameter(
            "Custom Font Src",
            "사용자 지정 폰트 경로"
        ) || "fonts/mplus-1m-regular.ttf"
    ),
    windowskin:
        RS.MessageSystem.popParameter(
            "Default Windowskin",
            "기본 윈도우스킨"
        ) || "Window",
    windowskinForNameWindow:
        RS.MessageSystem.popParameter("Name Windowskin", "이름 윈도우스킨") ||
        "Window",
    choiceWindowStyle: String(
        RS.MessageSystem.popParameter("Choice Style", "선택지 스타일") ||
            "default"
    ),
    defaultChoicePostion: parameters["Default Choice Position"] || "right",
    exTextColors: RS.MessageSystem.jsonParse(
        RS.MessageSystem.popParameter("Text Color", "텍스트 색상")
    ),
    isPlayTextSound: Boolean(
        RS.MessageSystem.popParameter(
            "Text Sound ON/OFF",
            "텍스트 효과음 재생 여부"
        ) === "true"
    ),
    pathTextSound: String(
        RS.MessageSystem.popParameter("Text Sound", "텍스트 효과음") ||
            "Cursor1.ogg"
    ),
    textSoundEval1: RS.MessageSystem.jsonParse(
        RS.MessageSystem.popParameter(
            "Text Sound Execution Condition",
            "텍스트 효과음 실행 조건"
        ) || "Math.randomInt(100) < 45"
    ),
    textSoundEval2: RS.MessageSystem.jsonParse(
        RS.MessageSystem.popParameter(
            "Text Sound Volume",
            "텍스트 효과음 볼륨"
        ) || "(0.4 + (RS.MessageSystem.randomNormal(0.8)[0])).clamp(0.0, 0.8)"
    ),
    textSoundInterval: parseInt(
        RS.MessageSystem.popParameter(
            "Text Sound Interval",
            "텍스트 사운드 재생 간격"
        )
    ),
    textSoundPoolSize: parseInt(
        RS.MessageSystem.popParameter(
            "텍스트 사운드 풀 크기",
            "Text Sound Pool Size"
        ) || 6
    ),
    langCode:
        RS.MessageSystem.popParameter("언어 코드", "Language Code") || "ko",
    preloadWindowskins: JSON.parse(parameters["preload windowskin"] || "[]"),
    isParagraphMinifier: Boolean(parameters["Paragraph Minifier"] === "true"),
    gradientStyle: parameters["Gradient Style"],
    faceOpacity: parseInt(parameters["face Opacity"] || 21),
    faceDirection: parseInt(parameters["face Direction"] || 0),
    DEBUG: (() => {
        return Utils.isNwjs() && Utils.isOptionValid("test");
    })(),
};

(() => {
    const systemFonts: Types.SystemFonts = RS.MessageSystem.jsonParse(
        parameters["systemFont"]
    );
    if (!RS.MessageSystem.Params.fonts) return;

    // ! 여기서부터 변환 시작해야함
    systemFonts.settings.forEach((i) => {
        const params = <{ [key: string]: any } | any>{};
        params[i.languageCode] = i.fontName;
        Object.assign(RS.MessageSystem.Params.fonts as {}, params);
    });
})();

//============================================================================
// Lazy Initialize Parameters (느린 초기화)
//============================================================================

const alias_Game_Temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function () {
    alias_Game_Temp_initialize.call(this);
    RS.MessageSystem.Params.windowWidth =
        eval(parameters["Window Width"]) || Graphics.boxWidth;
};

//============================================================================
// Multiple Language supports
//============================================================================

RS.MessageSystem.Reg.KoreanEscapeCode =
    /^[\$\.\|\^!><\{\}\\]|^[a-zA-Z가-힣]+[!]*/i;
RS.MessageSystem.Reg.ChineseEscapeCode =
    /^[\$\.\|\^!><\{\}\\]|^[a-zA-Z一-鼣]+[!]*/i;
RS.MessageSystem.Reg.EnglishEscapeCode = /^[\$\.\|\^!><\{\}\\]|^[A-Z]+[!]*/i;
RS.MessageSystem.Reg.JapaneseEscapeCode =
    /^[\$\.\|\^!><\{\}\\]|^[A-Z\u3040-\u309F\u30A0-\u30FF\u3300-\u33FF\u4E00-\u9FFF\uFF00-\uFFEF]+[!]*/i;
RS.MessageSystem.Reg.defaultEscapeCode =
    /^[\$\.\|\^!><\{\}\\]|^[A-Z가-힣]+[!]*/i;

RS.MessageSystem.TextCodes = (function () {
    const rowData = RS.MessageSystem.popParameter("Text Code", "텍스트 코드");
    const data = JSON.parse(rowData);
    const retData = <TextCode>{};

    retData.Korean = [undefined].concat(JSON.parse(data.Korean));
    retData.Chinese = [undefined].concat(JSON.parse(data.Chinese));
    retData.English = [undefined].concat(JSON.parse(data.English));
    retData.Japanese = [undefined].concat(JSON.parse(data.Japanese));

    return retData;
})();

RS.MessageSystem.TextCodes.Main = [];

RS.MessageSystem.TextCodes.ENUM = {
    COLOR: 1,
    TEXT_SPEED: 2,
    OUTLINE_COLOR: 3,
    OUTLINE_WIDTH: 4,
    INDENT: 5,
    BOLD: 6,
    ITALIC: 7,
    NAME: 8,
    GRADIENT: 9,
    PARTY_MEMBER: 10,
    PLAYER: 11,
    VAR: 12,
    ICON: 13,
    INCREASE: 14,
    DECREASE: 15,
    GOLD: 16,
    BALLOON: 17,
    ALIGN: 18,
    NUM: 19,
    TEXT_SIZE: 20,
    TAB: 21,
    CARRIAGE_RETURN: 22,
    PLAY_SE: 23,
    SHOW_PICTURE: 24,
    HIDE_PICTURE: 25,
    ITEM: 26,
    WEAPON: 27,
    ARMOR: 28,
    CLASSES: 29,
    ENEMY: 30,
    STATE: 31,
    SKILL: 32,
    FACE: 33,
    FRIENDLY_TROOPS: 34, // 여긴 2018.01.14에 추가됨
    ENEMY_TROOPS: 35,
    WAIT_SEC_15: 36, // .
    WAIT_SEC_60: 37, // |
    START_PAUSE: 38, // !
    LINE_SHOW_FAST_LT: 39, // <
    LINE_SHOW_FAST_GT: 40, // >
    PAUSE_SKIP: 41, // ^
    BOLD_START: 42, // <B>
    BOLD_END: 43, // </B>
    ITALIC_START: 44,
    ITALIC_END: 45,
    ALIGN_LEFT: 46,
    ALIGN_CENTER: 47,
    ALIGN_RIGHT: 48,
    BOLD_START_CV: 49,
    BOLD_END_CV: 50,
    ITALIC_START_CV: 51,
    ITALIC_END_CV: 52,
    ALIGN_CLEAR: 53, // AEND
    HIGHLIGHT_TEXT_COLOR: 54,
    FACE_DIRECTION: 55,
};

/**
 * 주어진 ID 값으로 텍스트 코드를 현지화하여 반환합니다.
 * @param {Number} idx
 */
RS.MessageSystem.getTextCode = function (idx: number) {
    const langCode = RS.MessageSystem.Params.langCode;

    if (langCode.match(/ko/)) {
        return RS.MessageSystem.TextCodes["Korean"][idx];
    }
    if (langCode.match(/zh/)) {
        return RS.MessageSystem.TextCodes["Chinese"][idx];
    }
    if (langCode.match(/en/)) {
        return RS.MessageSystem.TextCodes["English"][idx];
    }
    if (langCode.match(/ja/)) {
        return RS.MessageSystem.TextCodes["Japanese"][idx];
    }
    return RS.MessageSystem.TextCodes["English"][idx];
};

/**
 * 노트 태그를 읽습니다.
 * @memberof RS.MessageSystem
 * @param {Number} eventId
 * @return {Object} meta
 */
RS.MessageSystem.getEventComments = function (eventId: number, index: number) {
    let data = <Record<any, any>>{
        note: "",
        meta: {},
    };
    try {
        // 리스트를 가져옵니다.
        let list = $gameMap.event(eventId).list();

        // 바로 이전 인덱스에 노트 태그가 있었는 지 확인합니다.
        if (index < 0) index = 0;

        // 부모 이벤트 없이 호출되는 공통 이벤트가 있는 지 확인합니다.
        if (eventId <= 0) {
            var commonEvent = $gameTemp.reservedCommonEvent();
            if (commonEvent) {
                list = commonEvent.list;
                // 공통 이벤트는 한 번 설치된 후 클리어되므로 목록을 두 번 읽을 순 없으므로 예외 처리
                if (!list) {
                    return data;
                }
            }
        }

        let param = list[index];

        // 코멘트를 읽어옵니다.
        while (param && [108, 408].contains(param.code)) {
            data.note += param.parameters[0] + "\r\n";
            index--;
            param = list[index];
        }

        if (param && param.code === 108) {
            data.note += param.parameters[0] + "\r\n";

            index--;
            param = list[index];

            while (param.code === 408) {
                data.note += param.parameters[0] + "\r\n";
                index--;
                param = list[index];
            }

            if (param.code === 108) {
                data.note += param.parameters[0] + "\r\n";
            }
        }

        // 노트 태그를 추출합니다 (DataManager.extractMetadata의 변형입니다)
        const re = /<([^<>:]+)(:?)([^>]*)>/g;
        data.meta = {};
        for (;;) {
            const match = re.exec(data.note);
            if (match) {
                if (match[2] === ":") {
                    data.meta[match[1].trim()] = match[3];
                } else {
                    data.meta[match[1].trim()] = true;
                }
            } else {
                break;
            }
        }
    } catch (e) {
        // 리스트를 읽지 못할 경우 try-catch 문에 의해 예외 처리가 됩니다.
        return {
            note: "",
            meta: {},
        };
    }
    return data.meta;
};

(() => {
    "use strict";
    const regData = ["Korean", "English", "Chinese", "Japanese"];
    regData.forEach((e) => {
        let tcGroup = RS.MessageSystem.TextCodes[e];

        tcGroup = tcGroup.map((e: LanguageType) => {
            if (e === undefined) return;
            const data = [];
            let ret = "";
            for (const str of e) {
                if (/[a-zA-Z]/i) {
                    data.push(str);
                    continue;
                }
                const text = str.charCodeAt(0).toString(16);
                data.push("\\u" + "{" + text + "}");
            }
            ret = data.join("");
            return ret;
        });
        RS.MessageSystem.Reg[e][TC.UNKNOWN] = undefined;
        RS.MessageSystem.Reg[e][TC.COLOR] = new RegExp(
            `(?:\x1bC|\x1b${tcGroup[TC.COLOR]})\\[(.+?)\\]`,
            "gi"
        ); // 색
        RS.MessageSystem.Reg[e][TC.TEXT_SPEED] = new RegExp(
            `\x1b${tcGroup[TC.TEXT_SPEED]}\\[(\\d+)\\]`,
            "gi"
        ); // 속도
        RS.MessageSystem.Reg[e][TC.OUTLINE_COLOR] = new RegExp(
            `\x1b${tcGroup[TC.OUTLINE_COLOR]}\\[(.+?)\\]`,
            "gi"
        ); // 테두리색
        RS.MessageSystem.Reg[e][TC.OUTLINE_WIDTH] = new RegExp(
            `\x1b${tcGroup[TC.OUTLINE_WIDTH]}\\[(\\d+)\\]`,
            "gi"
        ); // 테두리크기
        RS.MessageSystem.Reg[e][TC.INDENT] = new RegExp(
            `\x1b${tcGroup[TC.INDENT]}\\[(\\d+)\\]`,
            "gi"
        ); // 들여쓰기
        RS.MessageSystem.Reg[e][TC.BOLD] = new RegExp(
            `\x1b${tcGroup[TC.BOLD]}`,
            "gi"
        ); // 굵게!
        RS.MessageSystem.Reg[e][TC.ITALIC] = new RegExp(
            `\x1b${tcGroup[TC.ITALIC]}`,
            "gi"
        ); // 이탤릭!
        RS.MessageSystem.Reg[e][TC.NAME] = new RegExp(
            `\x1b${tcGroup[TC.NAME]}\\<(.+?)\\>`,
            "gi"
        ); // 이름
        RS.MessageSystem.Reg[e][TC.GRADIENT] = new RegExp(
            `\x1b${tcGroup[TC.GRADIENT]}\\<(.+)\\>`,
            "gi"
        ); // 그레디언트
        RS.MessageSystem.Reg[e][TC.PARTY_MEMBER] = new RegExp(
            `(?:\x1bP|\x1b${tcGroup[TC.PARTY_MEMBER]})\\[(\\d+)\\]`,
            "gi"
        ); // 파티원
        RS.MessageSystem.Reg[e][TC.PLAYER] = new RegExp(
            `(?:\x1bN|\x1b${tcGroup[TC.PLAYER]})\\[(\\d+)\\]`,
            "gi"
        ); // 주인공
        RS.MessageSystem.Reg[e][TC.VAR] = new RegExp(
            `(?:\x1bV|\x1b${tcGroup[TC.VAR]})\\[(\\d+)\\]`,
            "gi"
        ); // 변수
        RS.MessageSystem.Reg[e][TC.ICON] = new RegExp(
            `(?:\x1bI|\x1b${tcGroup[TC.ICON]})\\[(\\d+)\\]`,
            "g"
        ); // 아이콘
        RS.MessageSystem.Reg[e][TC.INCREASE] = new RegExp(
            `(?:\x1b{|\x1b${tcGroup[TC.INCREASE]})`,
            "gi"
        ); // 확대!
        RS.MessageSystem.Reg[e][TC.DECREASE] = new RegExp(
            `(?:\x1b}|\x1b${tcGroup[TC.DECREASE]})`,
            "gi"
        ); // 축소!
        RS.MessageSystem.Reg[e][TC.GOLD] = new RegExp(
            `(?:\x1bG|\x1b${tcGroup[TC.GOLD]})`,
            "gi"
        ); // 골드
        RS.MessageSystem.Reg[e][TC.BALLOON] = new RegExp(
            `\x1b${tcGroup[TC.BALLOON]}\\[(.*?)\\]`,
            "gi"
        ); // 말풍선
        RS.MessageSystem.Reg[e][TC.ALIGN] = new RegExp(
            `\x1b${tcGroup[TC.ALIGN]}\\[(\\d+)\\]`,
            "gi"
        ); // 정렬자
        RS.MessageSystem.Reg[e][TC.NUM] = new RegExp(
            `\x1b${tcGroup[TC.NUM]}\\[(\\d+)\\]`,
            "gi"
        ); // 숫자
        RS.MessageSystem.Reg[e][TC.TEXT_SIZE] = new RegExp(
            `\x1b${tcGroup[TC.TEXT_SIZE]}\\[(\\d+)\\]`,
            "gi"
        ); // 크기
        RS.MessageSystem.Reg[e][TC.TAB] = new RegExp(
            `\x1b${tcGroup[TC.TAB]}`,
            "gi"
        ); // r
        RS.MessageSystem.Reg[e][TC.CARRIAGE_RETURN] = new RegExp(
            `\x1b${tcGroup[TC.CARRIAGE_RETURN]}`,
            "gi"
        ); // t
        RS.MessageSystem.Reg[e][TC.PLAY_SE] = new RegExp(
            `\x1b${tcGroup[TC.PLAY_SE]}\\<(.+?)\\>`,
            "gi"
        ); // 효과음
        RS.MessageSystem.Reg[e][TC.SHOW_PICTURE] = new RegExp(
            `\x1b${tcGroup[TC.SHOW_PICTURE]}\\<(.+?)\\>`,
            "gi"
        ); // 그림 표시
        RS.MessageSystem.Reg[e][TC.HIDE_PICTURE] = new RegExp(
            `\x1b${tcGroup[TC.HIDE_PICTURE]}\\[(\\d+)\\]`,
            "gi"
        ); // 그림 제거
        RS.MessageSystem.Reg[e][TC.ITEM] = new RegExp(
            `(?:\x1b${tcGroup[TC.ITEM]})\\[(\\d+)\\]`,
            "g"
        ); // 아이템
        RS.MessageSystem.Reg[e][TC.WEAPON] = new RegExp(
            `(?:\x1b${tcGroup[TC.WEAPON]})\\[(\\d+)\\]`,
            "g"
        ); // 무기구
        RS.MessageSystem.Reg[e][TC.ARMOR] = new RegExp(
            `(?:\x1b${tcGroup[TC.ARMOR]})\\[(\\d+)\\]`,
            "g"
        ); // 방어구
        RS.MessageSystem.Reg[e][TC.CLASSES] = new RegExp(
            `(?:\x1b${tcGroup[TC.CLASSES]})\\[(\\d+)\\]`,
            "g"
        ); // 직업
        RS.MessageSystem.Reg[e][TC.ENEMY] = new RegExp(
            `(?:\x1b${tcGroup[TC.ENEMY]})\\[(\\d+)\\]`,
            "g"
        ); // 적군
        RS.MessageSystem.Reg[e][TC.STATE] = new RegExp(
            `(?:\x1b${tcGroup[TC.STATE]})\\[(\\d+)\\]`,
            "g"
        ); // 상태
        RS.MessageSystem.Reg[e][TC.SKILL] = new RegExp(
            `(?:\x1b${tcGroup[TC.SKILL]})\\[(\\d+)\\]`,
            "g"
        ); // 스킬
        RS.MessageSystem.Reg[e][TC.FACE] = new RegExp(
            `\x1b${tcGroup[TC.FACE]}\\<(.*)\\>`,
            "gi"
        ); // 얼굴
        RS.MessageSystem.Reg[e][TC.FRIENDLY_TROOPS] = new RegExp(
            `(?:\x1b${tcGroup[TC.FRIENDLY_TROOPS]})\\[(\\d+)\\]`,
            "gi"
        ); // 아군
        RS.MessageSystem.Reg[e][TC.ENEMY_TROOPS] = new RegExp(
            `(?:\x1b${tcGroup[TC.ENEMY_TROOPS]})\\[(\\d+)\\]`,
            "gi"
        ); // 적군

        RS.MessageSystem.Reg[e][TC.WAIT_SEC_15] = new RegExp(
            `\x1b${tcGroup[TC.WAIT_SEC_15]}`,
            "gi"
        ); // [.]
        RS.MessageSystem.Reg[e][TC.WAIT_SEC_60] = new RegExp(
            `\x1b${tcGroup[TC.WAIT_SEC_60]}`,
            "gi"
        ); // [|]
        RS.MessageSystem.Reg[e][TC.START_PAUSE] = new RegExp(
            `\x1b${tcGroup[TC.START_PAUSE]}`,
            "gi"
        ); // [!]
        RS.MessageSystem.Reg[e][TC.LINE_SHOW_FAST_LT] = new RegExp(
            `\x1b${tcGroup[TC.LINE_SHOW_FAST_LT]}`,
            "gi"
        ); // [<]
        RS.MessageSystem.Reg[e][TC.LINE_SHOW_FAST_GT] = new RegExp(
            `\x1b${tcGroup[TC.LINE_SHOW_FAST_GT]}`,
            "gi"
        ); // [>]
        RS.MessageSystem.Reg[e][TC.PAUSE_SKIP] = new RegExp(
            `\x1b${tcGroup[TC.PAUSE_SKIP]}`,
            "gi"
        ); // [\^]

        RS.MessageSystem.Reg[e][TC.BOLD_START] = new RegExp(
            `\x1b${tcGroup[TC.BOLD_START]}`,
            "gi"
        ); // AS굵게!
        RS.MessageSystem.Reg[e][TC.BOLD_END] = new RegExp(
            `\x1b${tcGroup[TC.BOLD_END]}`,
            "gi"
        ); // AE굵게!
        RS.MessageSystem.Reg[e][TC.ITALIC_START] = new RegExp(
            `\x1b${tcGroup[TC.ITALIC_START]}`,
            "gi"
        ); // AS이탤릭!
        RS.MessageSystem.Reg[e][TC.ITALIC_END] = new RegExp(
            `\x1b${tcGroup[TC.ITALIC_END]}`,
            "gi"
        ); // AE이탤릭!

        RS.MessageSystem.Reg[e][TC.ALIGN_LEFT] = new RegExp(
            `(?:<${tcGroup[TC.ALIGN_LEFT]}>)`,
            "gi"
        ); // LEFT
        RS.MessageSystem.Reg[e][TC.ALIGN_CENTER] = new RegExp(
            `(?:<${tcGroup[TC.ALIGN_CENTER]}>)`,
            "gi"
        ); // CENTER
        RS.MessageSystem.Reg[e][TC.ALIGN_RIGHT] = new RegExp(
            `(?:<${tcGroup[TC.ALIGN_RIGHT]}>)`,
            "gi"
        ); // RIGHT

        RS.MessageSystem.Reg[e][TC.BOLD_START_CV] = new RegExp(
            `(?:<[${tcGroup[TC.BOLD_START_CV]}]>)`,
            "gi"
        ); // B
        RS.MessageSystem.Reg[e][TC.BOLD_END_CV] = new RegExp(
            `(?:<\/[${tcGroup[TC.BOLD_END_CV]}]>)`,
            "gi"
        ); // B
        RS.MessageSystem.Reg[e][TC.ITALIC_START_CV] = new RegExp(
            `(?:<[${tcGroup[TC.ITALIC_START_CV]}]>)`,
            "gi"
        ); // I
        RS.MessageSystem.Reg[e][TC.ITALIC_END_CV] = new RegExp(
            `(?:<\/[${tcGroup[TC.ITALIC_END_CV]}]>)`,
            "gi"
        ); // I
        RS.MessageSystem.Reg[e][TC.ALIGN_CLEAR] = new RegExp(
            `\x1b${tcGroup[TC.ALIGN_CLEAR]}`,
            "gi"
        ); // AEND : ALIGN_CLEAR
        RS.MessageSystem.Reg[e][TC.HIGHLIGHT_TEXT_COLOR] = new RegExp(
            `\x1b${tcGroup[TC.HIGHLIGHT_TEXT_COLOR]}\\[(.*)\\]`,
            "gi"
        ); // \배경색[색상] \HC[색상]
        RS.MessageSystem.Reg[e][TC.FACE_DIRECTION] = new RegExp(
            `\x1b${tcGroup[TC.FACE_DIRECTION]}\\[(\\d+)\\]`,
            "gi"
        ); // \FD
    });
})();

RS.MessageSystem.initSystem = function () {
    const type = RS.MessageSystem.Params.langCode;
    let ret = false;
    if (type.match(/ko/)) {
        RS.MessageSystem.Reg.Group = RS.MessageSystem.Reg.Korean;
        RS.MessageSystem.Reg.defaultEscapeCode =
            RS.MessageSystem.Reg.KoreanEscapeCode;
        RS.MessageSystem.TextCodes.Main = RS.MessageSystem.TextCodes.Korean;
        ret = true;
    }
    if (type.match(/zh/)) {
        RS.MessageSystem.Reg.Group = RS.MessageSystem.Reg.Chinese;
        RS.MessageSystem.Reg.defaultEscapeCode =
            RS.MessageSystem.Reg.ChineseEscapeCode;
        RS.MessageSystem.TextCodes.Main = RS.MessageSystem.TextCodes.Chinese;
        ret = true;
    }
    if (type.match(/en/)) {
        RS.MessageSystem.Reg.Group = RS.MessageSystem.Reg.English;
        RS.MessageSystem.Reg.defaultEscapeCode =
            RS.MessageSystem.Reg.EnglishEscapeCode;
        RS.MessageSystem.TextCodes.Main = RS.MessageSystem.TextCodes.English;
        ret = true;
    }
    if (type.match(/ja/)) {
        RS.MessageSystem.Reg.Group = RS.MessageSystem.Reg.Japanese;
        RS.MessageSystem.Reg.defaultEscapeCode =
            RS.MessageSystem.Reg.JapaneseEscapeCode;
        RS.MessageSystem.TextCodes.Main = RS.MessageSystem.TextCodes.Japanese;
        ret = true;
    }
    if (ret === false) {
        RS.MessageSystem.Reg.Group = RS.MessageSystem.Reg.English;
        RS.MessageSystem.Reg.defaultEscapeCode =
            RS.MessageSystem.Reg.EnglishEscapeCode;
        RS.MessageSystem.TextCodes.Main = RS.MessageSystem.TextCodes.English;
    }
};

//=============================================================================
// Color
//=============================================================================

interface IColor {
    getColor(c: number): string;
    baseColor: string;
    getBaseColor(): string;
    getUserCustomColor(str: string): string;
    gmColor(str: string): string;
}

export const Color = <IColor>{};

Color.getColor = function (n: number) {
    const r = n & 255;
    const g = (n >> 8) & 255;
    const b = (n >> 16) & 255;
    const result = `rgba(${r},${g},${b},1)`;
    return result;
};

Color.baseColor = Color.getColor(16777215);

Color.getBaseColor = function () {
    return Color.baseColor;
};

Color.getUserCustomColor = function (str) {
    "use strict";

    const obj: any[] = RS.MessageSystem.Params.exTextColors;
    let ret = str;

    if (!(typeof obj[0] === "object")) return ret;
    if (!obj[0].hasOwnProperty("Color Name")) return ret;

    obj.forEach((e: any, i: number, arr: any[]) => {
        if (e["Color Name"] === str) {
            const r = parseInt(e["Red"]) || 0;
            const g = parseInt(e["Green"]) || 0;
            const b = parseInt(e["Blue"]) || 0;
            const a = parseFloat(e["Alpha"]) || 1.0;

            ret = `rgba(${r},${g},${b},${a})`;
        }
    });

    return ret;
};

const KOREAN_COLORS: Record<string, string> = {
    청록: "rgba(0,255,255,1)",
    청록색: "rgba(0,255,255,1)",
    c_aqua: "rgba(0,255,255,1)",
    검은색: "rgba(0,0,0,1)",
    검정: "rgba(0,0,0,1)",
    c_black: "rgba(0,0,0,1)",
    파란색: "rgba(0,0,255,1)",
    파랑: "rgba(0,0,255,1)",
    c_blue: "rgba(0,0,255,1)",
    짙은회색: "rgba(64,64,64,1)",
    c_dkgray: "rgba(64,64,64,1)",
    자홍색: "rgba(255,0,255,1)",
    자홍: "rgba(255,0,255,1)",
    c_fuchsia: "rgba(255,0,255,1)",
    회색: "rgba(128,128,128,1)",
    c_gray: "rgba(128,128,128,1)",
    녹색: "rgba(0,128,0,1)",
    c_green: "rgba(0,128,0,1)",
    밝은녹색: "rgba(0,255,0,1)",
    라임: "rgba(0,255,0,1)",
    c_lime: "rgba(0,255,0,1)",
    밝은회색: "rgba(192,192,192,1)",
    c_ltgray: "rgba(192,192,192,1)",
    밤색: "rgba(128,0,0,1)",
    마룬: "rgba(128,0,0,1)",
    c_maroon: "rgba(128,0,0,1)",
    감청색: "rgba(0,0,128,1)",
    네이비: "rgba(0,0,128,1)",
    c_navy: "rgba(0,0,128,1)",
    황록색: "rgba(128,128,0,1)",
    올리브: "rgba(128,128,0,1)",
    c_olive: "rgba(128,128,0,1)",
    주황색: "rgba(255,160,64,1)",
    주황: "rgba(255,160,64,1)",
    오렌지: "rgba(255,160,64,1)",
    c_orange: "rgba(255,160,64,1)",
    보라색: "rgba(128,0,128,1)",
    보라: "rgba(128,0,128,1)",
    c_purple: "rgba(128,0,128,1)",
    빨간색: "rgba(255,0,0,1)",
    빨강: "rgba(255,0,0,1)",
    c_red: "rgba(255,0,0,1)",
    은색: "rgba(192,192,192,1)",
    은: "rgba(192,192,192,1)",
    c_silver: "rgba(192,192,192,1)",
    민트색: "rgba(0,128,128,1)",
    c_teal: "rgba(0,128,128,1)",
    흰색: "rgba(255,255,255,1)",
    흰: "rgba(255,255,255,1)",
    c_white: "rgba(255,255,255,1)",
    노란색: "rgba(255,255,0,1)",
    노랑: "rgba(255,255,0,1)",
    c_yellow: "rgba(255,255,0,1)",
};

const CHINESE_COLOR: Record<string, string> = {
    水色: "rgba(0,255,255,1)",
    c_aqua: "rgba(0,255,255,1)",
    黑色: "rgba(0,0,0,1)",
    c_black: "rgba(0,0,0,1)",
    蓝色: "rgba(0,0,255,1)",
    c_blue: "rgba(0,0,255,1)",
    深灰色: "rgba(64,64,64,1)",
    c_dkgray: "rgba(64,64,64,1)",
    紫红色: "rgba(255,0,255,1)",
    c_fuchsia: "rgba(255,0,255,1)",
    灰色: "rgba(128,128,128,1)",
    c_gray: "rgba(128,128,128,1)",
    绿色: "rgba(0,128,0,1)",
    c_green: "rgba(0,128,0,1)",
    浅绿色: "rgba(0,255,0,1)",
    c_lime: "rgba(0,255,0,1)",
    浅灰色: "rgba(192,192,192,1)",
    c_ltgray: "rgba(192,192,192,1)",
    栗色: "rgba(128,0,0,1)",
    c_maroon: "rgba(128,0,0,1)",
    绀青色: "rgba(0,0,128,1)",
    c_navy: "rgba(0,0,128,1)",
    黄绿色: "rgba(128,128,0,1)",
    c_olive: "rgba(128,128,0,1)",
    橙黄色: "rgba(255,160,64,1)",
    c_orange: "rgba(255,160,64,1)",
    紫色: "rgba(128,0,128,1)",
    c_purple: "rgba(128,0,128,1)",
    红色: "rgba(255,0,0,1)",
    c_red: "rgba(255,0,0,1)",
    银白色: "rgba(192,192,192,1)",
    c_silver: "rgba(192,192,192,1)",
    水鸭色: "rgba(0,128,128,1)",
    c_teal: "rgba(0,128,128,1)",
    白色: "rgba(255,255,255,1)",
    c_white: "rgba(255,255,255,1)",
    黄色: "rgba(255,255,0,1)",
    c_yellow: "rgba(255,255,0,1)",
};

const ENGLISH_COLOR: Record<string, string> = {
    AQUA: "rgba(0,255,255,1)",
    c_aqua: "rgba(0,255,255,1)",
    BLACK: "rgba(0,0,0,1)",
    c_black: "rgba(0,0,0,1)",
    BLUE: "rgba(0,0,255,1)",
    c_blue: "rgba(0,0,255,1)",
    DKGRAY: "rgba(64,64,64,1)",
    c_dkgray: "rgba(64,64,64,1)",
    FUCHSIA: "rgba(255,0,255,1)",
    c_fuchsia: "rgba(255,0,255,1)",
    GRAY: "rgba(128,128,128,1)",
    c_gray: "rgba(128,128,128,1)",
    GREEN: "rgba(0,128,0,1)",
    c_green: "rgba(0,128,0,1)",
    LIME: "rgba(0,255,0,1)",
    c_lime: "rgba(0,255,0,1)",
    LTGRAY: "rgba(192,192,192,1)",
    c_ltgray: "rgba(192,192,192,1)",
    MAROON: "rgba(128,0,0,1)",
    c_maroon: "rgba(128,0,0,1)",
    NAVY: "rgba(0,0,128,1)",
    c_navy: "rgba(0,0,128,1)",
    OLIVE: "rgba(128,128,0,1)",
    c_olive: "rgba(128,128,0,1)",
    ORANGE: "rgba(255,160,64,1)",
    c_orange: "rgba(255,160,64,1)",
    PURPLE: "rgba(128,0,128,1)",
    c_purple: "rgba(128,0,128,1)",
    RED: "rgba(255,0,0,1)",
    c_red: "rgba(255,0,0,1)",
    SILVER: "rgba(192,192,192,1)",
    c_silver: "rgba(192,192,192,1)",
    TEAL: "rgba(0,128,128,1)",
    c_teal: "rgba(0,128,128,1)",
    WHITE: "rgba(255,255,255,1)",
    c_white: "rgba(255,255,255,1)",
    YELLOW: "rgba(255,255,0,1)",
    c_yellow: "rgba(255,255,0,1)",
};

const JAPANESE_COLOR: Record<string, string> = {
    水色: "rgba(0,255,255,1)",
    アクア色: "rgba(0,255,255,1)",
    c_aqua: "rgba(0,255,255,1)",
    黑色: "rgba(0,0,0,1)",
    c_black: "rgba(0,0,0,1)",
    靑色: "rgba(0,0,255,1)",
    c_blue: "rgba(0,0,255,1)",
    ふか灰色: "rgba(64,64,64,1)",
    c_dkgray: "rgba(64,64,64,1)",
    紫紅色: "rgba(255,0,255,1)",
    c_fuchsia: "rgba(255,0,255,1)",
    灰色: "rgba(128,128,128,1)",
    c_gray: "rgba(128,128,128,1)",
    綠色: "rgba(0,128,0,1)",
    c_green: "rgba(0,128,0,1)",
    黃綠: "rgba(0,255,0,1)",
    c_lime: "rgba(0,255,0,1)",
    鼠色: "rgba(192,192,192,1)",
    c_ltgray: "rgba(192,192,192,1)",
    "―色": "rgba(128,0,0,1)",
    c_maroon: "rgba(128,0,0,1)",
    群青色: "rgba(0,0,128,1)",
    ネイビー: "rgba(0,0,128,1)",
    c_navy: "rgba(0,0,128,1)",
    黃綠色: "rgba(128,128,0,1)",
    オリーブ色: "rgba(128,128,0,1)",
    c_olive: "rgba(128,128,0,1)",
    橙色: "rgba(255,160,64,1)",
    オレンジ色: "rgba(255,160,64,1)",
    c_orange: "rgba(255,160,64,1)",
    紫色: "rgba(128,0,128,1)",
    c_purple: "rgba(128,0,128,1)",
    赤色: "rgba(255,0,0,1)",
    レッド: "rgba(255,0,0,1)",
    c_red: "rgba(255,0,0,1)",
    銀色: "rgba(192,192,192,1)",
    c_silver: "rgba(192,192,192,1)",
    ミント色: "rgba(0,128,128,1)",
    薄荷色: "rgba(0,128,128,1)",
    c_teal: "rgba(0,128,128,1)",
    白色: "rgba(255,255,255,1)",
    c_white: "rgba(255,255,255,1)",
    黃色: "rgba(255,255,0,1)",
    c_yellow: "rgba(255,255,0,1)",
};

RS.MessageSystem.getKoreanColor = function (str: string) {
    let color = KOREAN_COLORS[str];

    if (color) {
        return color;
    }

    if (["기본", "기본색", "c_normal"].contains(str)) {
        return Color.getBaseColor();
    }

    return Color.getUserCustomColor(str);
};

RS.MessageSystem.getChineseColor = function (str: string) {
    let color = CHINESE_COLOR[str];

    if (color) {
        return color;
    }

    if (["通常", "c_normal"].contains(str)) {
        return Color.getBaseColor();
    }

    return Color.getUserCustomColor(str);
};

RS.MessageSystem.getEnglishColor = function (str: string) {
    let color = ENGLISH_COLOR[str];

    if (color) {
        return color;
    }

    if ("c_normal" === str) {
        return Color.getBaseColor();
    }

    return Color.getUserCustomColor(str);
};

RS.MessageSystem.getJapaneseColor = function (str: string) {
    let color = JAPANESE_COLOR[str];

    if (color) {
        return color;
    }

    if (["基本色", "c_normal"].contains(str)) {
        return Color.getBaseColor();
    }

    return Color.getUserCustomColor(str);
};

RS.MessageSystem.getBrowser = function () {
    /* Refer to https://stackoverflow.com/a/16938481 */
    const ua = navigator.userAgent;
    let tem,
        M =
            ua.match(
                /(opera|chrome|edge|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
            ) || [];

    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];

        return {
            name: "IE",
            version: tem[1] || "",
        };
    }

    if (M[1] === "Chrome") {
        tem = ua.match(/\bOPR\/(\d+)/);
        if (tem != null) {
            return {
                name: "Opera",
                version: tem[1],
            };
        }

        tem = ua.match(/\bEdge\/(\d+)/);
        if (tem != null) {
            return {
                name: "Edge",
                version: tem[1],
            };
        }
    }

    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];

    if ((tem = ua.match(/version\/(\d+)/i)) != null) {
        M.splice(1, 1, tem[1]);
    }

    return {
        name: M[0],
        version: M[1],
    };
};

Color.gmColor = function (str: string) {
    const type = <string>RS.MessageSystem.Params.langCode;
    if (type.match(/ko/)) {
        return RS.MessageSystem.getKoreanColor(str);
    }
    if (type.match(/zh/)) {
        return RS.MessageSystem.getChineseColor(str);
    }
    if (type.match(/en/)) {
        return RS.MessageSystem.getEnglishColor(str);
    }
    if (type.match(/ja/)) {
        return RS.MessageSystem.getJapaneseColor(str);
    }
    return RS.MessageSystem.getEnglishColor(str);
};

window.RS = RS;
