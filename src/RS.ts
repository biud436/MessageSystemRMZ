/***
 * 이것은 RPG Maker MV 호환성을 위해 존재하며 타입스크립트로 재작성되어야 합니다.
 */
import { Types } from "../types/parameters";

type TextCodeKey =
    | "COLOR"
    | "TEXT_SPEED"
    | "OUTLINE_COLOR"
    | "OUTLINE_WIDTH"
    | "INDENT"
    | "BOLD"
    | "ITALIC"
    | "NAME"
    | "GRADIENT"
    | "PARTY_MEMBER"
    | "PLAYER"
    | "VAR"
    | "ICON"
    | "INCREASE"
    | "DECREASE"
    | "GOLD"
    | "BALLOON"
    | "ALIGN"
    | "NUM"
    | "TEXT_SIZE"
    | "TAB"
    | "CARRIAGE_RETURN"
    | "PLAY_SE"
    | "SHOW_PICTURE"
    | "HIDE_PICTURE"
    | "ITEM"
    | "WEAPON"
    | "ARMOR"
    | "CLASSES"
    | "ENEMY"
    | "STATE"
    | "SKILL"
    | "FACE"
    | "FRIENDLY_TROOPS"
    | "ENEMY_TROOPS"
    | "WAIT_SEC_15"
    | "WAIT_SEC_60"
    | "START_PAUSE"
    | "LINE_SHOW_FAST_LT"
    | "LINE_SHOW_FAST_GT"
    | "PAUSE_SKIP"
    | "BOLD_START"
    | "BOLD_END"
    | "ITALIC_START"
    | "ITALIC_END"
    | "ALIGN_LEFT"
    | "ALIGN_CENTER"
    | "ALIGN_RIGHT"
    | "BOLD_START_CV"
    | "BOLD_END_CV"
    | "ITALIC_START_CV"
    | "ITALIC_END_CV"
    | "ALIGN_CLEAR"
    | "HIGHLIGHT_TEXT_COLOR"
    | "FACE_DIRECTION";

interface TextCodeEnum {
    ENUM: Record<TextCodeKey, number>;
}

type TextCode = Record<string, any> & TextCodeEnum;

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

Object.assign(RS.MessageSystem.Params, {
    isTempSpriteContainerVisibility: false,
    lineHeight: 36,
    windowOffset: new Point(0, 0),
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
});

//============================================================================
// Lazy Initialize Parameters (느린 초기화)
//============================================================================

var alias_Game_Temp_initialize = Game_Temp.prototype.initialize;
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
    var regData = ["Korean", "English", "Chinese", "Japanese"];
    regData.forEach(function (e, i, a) {
        var tcGroup = RS.MessageSystem.TextCodes[e];
        tcGroup = tcGroup.map((e: any, i: number, a: any[]) => {
            if (e === undefined) return;
            var data = [];
            var ret = "";
            for (var str of e) {
                if (/[a-zA-Z]/i) {
                    data.push(str);
                    continue;
                }
                var text = str.charCodeAt().toString(16);
                data.push("\\u" + "{" + text + "}");
            }
            ret = data.join("");
            return ret;
        });
        RS.MessageSystem.Reg[e][0] = undefined;
        RS.MessageSystem.Reg[e][1] = new RegExp(
            `(?:\x1bC|\x1b${tcGroup[1]})\\[(.+?)\\]`,
            "gi"
        ); // 색
        RS.MessageSystem.Reg[e][2] = new RegExp(
            `\x1b${tcGroup[2]}\\[(\\d+)\\]`,
            "gi"
        ); // 속도
        RS.MessageSystem.Reg[e][3] = new RegExp(
            `\x1b${tcGroup[3]}\\[(.+?)\\]`,
            "gi"
        ); // 테두리색
        RS.MessageSystem.Reg[e][4] = new RegExp(
            `\x1b${tcGroup[4]}\\[(\\d+)\\]`,
            "gi"
        ); // 테두리크기
        RS.MessageSystem.Reg[e][5] = new RegExp(
            `\x1b${tcGroup[5]}\\[(\\d+)\\]`,
            "gi"
        ); // 들여쓰기
        RS.MessageSystem.Reg[e][6] = new RegExp(`\x1b${tcGroup[6]}`, "gi"); // 굵게!
        RS.MessageSystem.Reg[e][7] = new RegExp(`\x1b${tcGroup[7]}`, "gi"); // 이탤릭!
        RS.MessageSystem.Reg[e][8] = new RegExp(
            `\x1b${tcGroup[8]}\\<(.+?)\\>`,
            "gi"
        ); // 이름
        RS.MessageSystem.Reg[e][9] = new RegExp(
            `\x1b${tcGroup[9]}\\<(.+)\\>`,
            "gi"
        ); // 그레디언트
        RS.MessageSystem.Reg[e][10] = new RegExp(
            `(?:\x1bP|\x1b${tcGroup[10]})\\[(\\d+)\\]`,
            "gi"
        ); // 파티원
        RS.MessageSystem.Reg[e][11] = new RegExp(
            `(?:\x1bN|\x1b${tcGroup[11]})\\[(\\d+)\\]`,
            "gi"
        ); // 주인공
        RS.MessageSystem.Reg[e][12] = new RegExp(
            `(?:\x1bV|\x1b${tcGroup[12]})\\[(\\d+)\\]`,
            "gi"
        ); // 변수
        RS.MessageSystem.Reg[e][13] = new RegExp(
            `(?:\x1bI|\x1b${tcGroup[13]})\\[(\\d+)\\]`,
            "g"
        ); // 아이콘
        RS.MessageSystem.Reg[e][14] = new RegExp(
            `(?:\x1b{|\x1b${tcGroup[14]})`,
            "gi"
        ); // 확대!
        RS.MessageSystem.Reg[e][15] = new RegExp(
            `(?:\x1b}|\x1b${tcGroup[15]})`,
            "gi"
        ); // 축소!
        RS.MessageSystem.Reg[e][16] = new RegExp(
            `(?:\x1bG|\x1b${tcGroup[16]})`,
            "gi"
        ); // 골드
        RS.MessageSystem.Reg[e][17] = new RegExp(
            `\x1b${tcGroup[17]}\\[(.*?)\\]`,
            "gi"
        ); // 말풍선
        RS.MessageSystem.Reg[e][18] = new RegExp(
            `\x1b${tcGroup[18]}\\[(\\d+)\\]`,
            "gi"
        ); // 정렬자
        RS.MessageSystem.Reg[e][19] = new RegExp(
            `\x1b${tcGroup[19]}\\[(\\d+)\\]`,
            "gi"
        ); // 숫자
        RS.MessageSystem.Reg[e][20] = new RegExp(
            `\x1b${tcGroup[20]}\\[(\\d+)\\]`,
            "gi"
        ); // 크기
        RS.MessageSystem.Reg[e][21] = new RegExp(`\x1b${tcGroup[21]}`, "gi"); // r
        RS.MessageSystem.Reg[e][22] = new RegExp(`\x1b${tcGroup[22]}`, "gi"); // t
        RS.MessageSystem.Reg[e][23] = new RegExp(
            `\x1b${tcGroup[23]}\\<(.+?)\\>`,
            "gi"
        ); // 효과음
        RS.MessageSystem.Reg[e][24] = new RegExp(
            `\x1b${tcGroup[24]}\\<(.+?)\\>`,
            "gi"
        ); // 그림 표시
        RS.MessageSystem.Reg[e][25] = new RegExp(
            `\x1b${tcGroup[25]}\\[(\\d+)\\]`,
            "gi"
        ); // 그림 제거
        RS.MessageSystem.Reg[e][26] = new RegExp(
            `(?:\x1b${tcGroup[26]})\\[(\\d+)\\]`,
            "g"
        ); // 아이템
        RS.MessageSystem.Reg[e][27] = new RegExp(
            `(?:\x1b${tcGroup[27]})\\[(\\d+)\\]`,
            "g"
        ); // 무기구
        RS.MessageSystem.Reg[e][28] = new RegExp(
            `(?:\x1b${tcGroup[28]})\\[(\\d+)\\]`,
            "g"
        ); // 방어구
        RS.MessageSystem.Reg[e][29] = new RegExp(
            `(?:\x1b${tcGroup[29]})\\[(\\d+)\\]`,
            "g"
        ); // 직업
        RS.MessageSystem.Reg[e][30] = new RegExp(
            `(?:\x1b${tcGroup[30]})\\[(\\d+)\\]`,
            "g"
        ); // 적군
        RS.MessageSystem.Reg[e][31] = new RegExp(
            `(?:\x1b${tcGroup[31]})\\[(\\d+)\\]`,
            "g"
        ); // 상태
        RS.MessageSystem.Reg[e][32] = new RegExp(
            `(?:\x1b${tcGroup[32]})\\[(\\d+)\\]`,
            "g"
        ); // 스킬
        RS.MessageSystem.Reg[e][33] = new RegExp(
            `\x1b${tcGroup[33]}\\<(.*)\\>`,
            "gi"
        ); // 얼굴
        RS.MessageSystem.Reg[e][34] = new RegExp(
            `(?:\x1b${tcGroup[34]})\\[(\\d+)\\]`,
            "gi"
        ); // 아군
        RS.MessageSystem.Reg[e][35] = new RegExp(
            `(?:\x1b${tcGroup[35]})\\[(\\d+)\\]`,
            "gi"
        ); // 적군

        RS.MessageSystem.Reg[e][36] = new RegExp(`\x1b${tcGroup[36]}`, "gi"); // [.]
        RS.MessageSystem.Reg[e][37] = new RegExp(`\x1b${tcGroup[37]}`, "gi"); // [|]
        RS.MessageSystem.Reg[e][38] = new RegExp(`\x1b${tcGroup[38]}`, "gi"); // [!]
        RS.MessageSystem.Reg[e][39] = new RegExp(`\x1b${tcGroup[39]}`, "gi"); // [<]
        RS.MessageSystem.Reg[e][40] = new RegExp(`\x1b${tcGroup[40]}`, "gi"); // [>]
        RS.MessageSystem.Reg[e][41] = new RegExp(`\x1b${tcGroup[41]}`, "gi"); // [\^]

        RS.MessageSystem.Reg[e][42] = new RegExp(`\x1b${tcGroup[42]}`, "gi"); // AS굵게!
        RS.MessageSystem.Reg[e][43] = new RegExp(`\x1b${tcGroup[43]}`, "gi"); // AE굵게!
        RS.MessageSystem.Reg[e][44] = new RegExp(`\x1b${tcGroup[44]}`, "gi"); // AS이탤릭!
        RS.MessageSystem.Reg[e][45] = new RegExp(`\x1b${tcGroup[45]}`, "gi"); // AE이탤릭!

        RS.MessageSystem.Reg[e][46] = new RegExp(`(?:<${tcGroup[46]}>)`, "gi"); // LEFT
        RS.MessageSystem.Reg[e][47] = new RegExp(`(?:<${tcGroup[47]}>)`, "gi"); // CENTER
        RS.MessageSystem.Reg[e][48] = new RegExp(`(?:<${tcGroup[48]}>)`, "gi"); // RIGHT

        RS.MessageSystem.Reg[e][49] = new RegExp(
            `(?:<[${tcGroup[49]}]>)`,
            "gi"
        ); // B
        RS.MessageSystem.Reg[e][50] = new RegExp(
            `(?:<\/[${tcGroup[50]}]>)`,
            "gi"
        ); // B
        RS.MessageSystem.Reg[e][51] = new RegExp(
            `(?:<[${tcGroup[51]}]>)`,
            "gi"
        ); // I
        RS.MessageSystem.Reg[e][52] = new RegExp(
            `(?:<\/[${tcGroup[52]}]>)`,
            "gi"
        ); // I
        RS.MessageSystem.Reg[e][53] = new RegExp(`\x1b${tcGroup[53]}`, "gi"); // AEND : ALIGN_CLEAR
        RS.MessageSystem.Reg[e][54] = new RegExp(
            `\x1b${tcGroup[54]}\\[(.*)\\]`,
            "gi"
        ); // \배경색[색상] \HC[색상]
        RS.MessageSystem.Reg[e][55] = new RegExp(
            `\x1b${tcGroup[55]}\\[(\\d+)\\]`,
            "gi"
        ); // \FD
    });
})();

RS.MessageSystem.initSystem = function () {
    var type = RS.MessageSystem.Params.langCode;
    var ret = false;
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
    var r = n & 255;
    var g = (n >> 8) & 255;
    var b = (n >> 16) & 255;
    var result = `rgba(${r},${g},${b},1)`;
    return result;
};

Color.baseColor = Color.getColor(16777215);

Color.getBaseColor = function () {
    return Color.baseColor;
};

Color.getUserCustomColor = function (str) {
    "use strict";

    var obj: any[] = RS.MessageSystem.Params.exTextColors;
    var ret = str;

    if (!(typeof obj[0] === "object")) return ret;
    if (!obj[0].hasOwnProperty("Color Name")) return ret;

    obj.forEach((e: any, i: number, arr: any[]) => {
        if (e["Color Name"] === str) {
            var r = parseInt(e["Red"]) || 0;
            var g = parseInt(e["Green"]) || 0;
            var b = parseInt(e["Blue"]) || 0;
            var a = parseFloat(e["Alpha"]) || 1.0;

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
    var ua = navigator.userAgent,
        tem,
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
