/// <reference types="../types/lunalite-pixi-mz" />
import { Types } from "../types/parameters";
import { BalloonWindowTransformComponent } from "./BalloonWindowTransformComponent";
import { BaseComponent } from "./BaseComponent";
import { DependencyInjector } from "./DependencyInjector";
import { EventEmitter } from "./EventEmitter";
import { NameWindowPositionComponent } from "./NameWindowPositionComponent";

var Imported = <any>(Imported || {});
Imported.RS_MessageSystem = true;

var RS: any = RS || {};

(($) => {
  "use strict";

  const pluginParams = $plugins.filter((i) => {
    return i.description.contains("<RS_MessageSystem>");
  });

  const pluginName = <Types.PluginName>(
    (pluginParams.length > 0 && pluginParams[0].name)
  );
  const parameters = <Types.PluginParameters>(
    (pluginParams.length > 0 && pluginParams[0].parameters)
  );

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

  RS.MessageSystem.TextCodes = {};

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
      RS.MessageSystem.popParameter("Text Speed", "기본 텍스트 출력 속도") || 0
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
      RS.MessageSystem.popParameter("gradientColor1", "그레디언트 시작 색상") ||
        "#FFFFFF"
    ),
    gradientColor2: String(
      RS.MessageSystem.popParameter("gradientColor2", "그레디언트 중간 색상") ||
        "#F29661"
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
      RS.MessageSystem.popParameter("Custom Font Name", "사용자 지정 폰트명") ||
        "GameFont"
    ),
    customFontSrc: String(
      RS.MessageSystem.popParameter(
        "Custom Font Src",
        "사용자 지정 폰트 경로"
      ) || "fonts/mplus-1m-regular.ttf"
    ),
    windowskin:
      RS.MessageSystem.popParameter("Default Windowskin", "기본 윈도우스킨") ||
      "Window",
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
    const retData = <Record<string, any>>{};

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
  RS.MessageSystem.getEventComments = function (
    eventId: number,
    index: number
  ) {
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

      RS.MessageSystem.Reg[e][49] = new RegExp(`(?:<[${tcGroup[49]}]>)`, "gi"); // B
      RS.MessageSystem.Reg[e][50] = new RegExp(
        `(?:<\/[${tcGroup[50]}]>)`,
        "gi"
      ); // B
      RS.MessageSystem.Reg[e][51] = new RegExp(`(?:<[${tcGroup[51]}]>)`, "gi"); // I
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

  const Color = <IColor>{};

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
    var type = RS.MessageSystem.Params.langCode;
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

  //============================================================================
  // Bitmap
  //============================================================================

  var alias_Bitmap_initialize = Bitmap.prototype.initialize;
  Bitmap.prototype.initialize = function (width: number, height: number) {
    alias_Bitmap_initialize.call(this, width, height);
    this.fontBold = false;
    this.fontGradient = false;
    this.highlightTextColor = null;
  };

  Bitmap.prototype.setGradient = function (
    text,
    color1,
    color2,
    color3,
    tx,
    ty
  ) {
    var context = this._context;
    var tWidth = this.measureTextWidth(text);
    context.save();
    var gradient = context.createLinearGradient(tx, 0, tx + tWidth, 0);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(0.6, color2);
    gradient.addColorStop(1, color3);
    context.restore();

    this._baseTexture.update();

    return gradient;
  };

  Bitmap.prototype.setGradientStyle = function (
    text,
    color1,
    color2,
    color3,
    tx,
    ty
  ) {
    var context = this._context;
    var width = this.measureTextWidth(text);
    var height = RS.MessageSystem.Params.lineHeight;
    var grd;

    context.save();

    var style = RS.MessageSystem.Params.gradientStyle;

    if (style !== "radial") {
      if (style.contains("horizontal")) {
        grd = context.createLinearGradient(tx, 0, tx + width, 0);
      } else {
        grd = context.createLinearGradient(tx, 0, 0, ty + height);
      }
    } else {
      var ws = width * 0.5;
      var hs = height * 0.5;
      grd = context.createRadialGradient(ws, hs, 0.0, ws, hs, ws);
    }

    if (style === "radial") {
      grd.addColorStop(0.0, color1);
      grd.addColorStop(1.0, color2);
    } else if (style.contains("axial")) {
      grd.addColorStop(0.0, color1);
      grd.addColorStop(0.5, color2);
      grd.addColorStop(1.0, color3);
    } else {
      grd.addColorStop(0.0, color1);
      grd.addColorStop(1.0, color2);
    }

    context.restore();

    this._baseTexture.update();

    return grd;
  };

  Bitmap.prototype._makeFontNameText = function () {
    return (
      (this.fontItalic ? "Italic " : "") +
      (this.fontBold ? "bold " : "") +
      this.fontSize +
      "px " +
      this.fontFace
    );
  };

  Bitmap.prototype._drawTextBody = function (text, tx, ty, maxWidth) {
    const context = this._context;
    context.save(); // 드로잉 상태 저장
    context.imageSmoothingEnabled =
      RS.MessageSystem.Params.fontSmoothingEnabled;

    if (this.fontGradient) {
      var gradient = this.setGradientStyle(
        text,
        RS.MessageSystem.Params.gradientColor1,
        RS.MessageSystem.Params.gradientColor2,
        RS.MessageSystem.Params.gradientColor3,
        tx,
        ty
      );
      context.fillStyle = gradient;
    } else {
      context.fillStyle = this.textColor;
    }
    context.fillText(text, tx, ty, maxWidth);
    context.fillStyle = this.textColor;
    context.restore();
  };

  //============================================================================
  // Game_Message
  //============================================================================

  var alias_Game_Message_clear = Game_Message.prototype.clear;
  Game_Message.prototype.clear = function () {
    alias_Game_Message_clear.call(this);
    this._waitTime = 0;
    this._gradientText = "";
    this._balloon = -2;
    this._align = [];
    this._balloonPatternHeight = 0;
    this._lastAlign = -1;
  };

  Game_Message.prototype.setWaitTime = function (time) {
    this._waitTime = time;
  };

  Game_Message.prototype.setGradientText = function (text) {
    this._gradientText = text;
  };

  Game_Message.prototype.getWaitTime = function () {
    return this._waitTime || 0;
  };

  Game_Message.prototype.getGradientText = function () {
    return this._gradientText;
  };

  Game_Message.prototype.getMaxLine = function () {
    return this._maxLine;
  };

  Game_Message.prototype.setMaxLine = function (maxLine) {
    this._maxLine = maxLine;
    RS.MessageSystem.Params.numVisibleRows = maxLine;
  };

  Game_Message.prototype.setBalloon = function (n) {
    this._balloon = n;
  };

  Game_Message.prototype.getBalloon = function (n) {
    return this._balloon;
  };

  Game_Message.prototype.setAlign = function (n) {
    this._align = this._align || [];
    this._lastAlign = n; // 마지막 정렬 위치 기억
    this._align.push(n);
  };

  Game_Message.prototype.getAlign = function (n) {
    const last = this._align.shift();
    if (last === undefined) {
      return this._lastAlign;
    }
    return last;
  };

  Game_Message.prototype.clearAlignLast = function (n) {
    this._lastAlign = -1;
  };

  Game_Message.prototype.setBalloonPatternHeight = function (value: number) {
    this._balloonPatternHeight = value;
  };

  Game_Message.prototype.getBalloonPatternHeight = function () {
    return this._balloonPatternHeight;
  };

  //============================================================================
  // Sprite_Battler
  //============================================================================

  Sprite_Battler.prototype.screenX = function () {
    return this.x || 0;
  };

  Sprite_Battler.prototype.screenY = function () {
    return this.y || 0;
  };

  //============================================================================
  // MessageDesc
  //============================================================================

  class MessageDesc {
    public fontFace: string;
    public fontSize: number;
    public fontBold: boolean;
    public fontItalic: boolean;
    public textColor: string;
    public outlineColor: string;
    public outlineWidth: number;
    public fontGradient: boolean;
    public highlightTextColor: string | null;
    public textSpeed: number;

    private _isSaved: boolean;

    constructor() {
      this.fontFace = "Nanum Gothic";
      this.fontSize = 12;
      this.fontBold = false;
      this.fontItalic = false;
      this.textColor = "#000";
      this.outlineColor = "#fff";
      this.outlineWidth = 1;
      this.fontGradient = false;
      this.highlightTextColor = null;
      this.textSpeed = 1;

      this._isSaved = false;
    }

    /**
     *
     * @param {Bitmap} contents
     */
    save(contents: Bitmap) {
      this.fontFace = contents.fontFace;
      this.fontSize = contents.fontSize;
      this.fontBold = contents.fontBold;
      this.fontItalic = contents.fontItalic;
      this.textColor = contents.textColor;
      this.outlineColor = contents.outlineColor;
      this.outlineWidth = contents.outlineWidth;
      this.fontGradient = contents.fontGradient;
      this.highlightTextColor = contents.highlightTextColor;

      if ($gameMessage) {
        this.textSpeed = $gameMessage.getWaitTime();
      }

      this._isSaved = true;
    }

    restore(contents: Bitmap) {
      if (!this._isSaved) return;
      if (!(contents instanceof Bitmap)) return;
      contents.fontFace = this.fontFace;
      contents.fontSize = this.fontSize;
      contents.fontBold = this.fontBold;
      contents.fontItalic = this.fontItalic;
      contents.textColor = this.textColor;
      contents.outlineColor = this.outlineColor;
      contents.outlineWidth = this.outlineWidth;
      contents.fontGradient = this.fontGradient;
      contents.highlightTextColor = this.highlightTextColor;
      if ($gameMessage) {
        $gameMessage.setWaitTime(this.textSpeed);
      }
      this._isSaved = false;
    }
  }

  //============================================================================
  // Window_Base
  //============================================================================

  Window_Base.prototype.obtainEscapeCode = function (textState) {
    var regExp = RS.MessageSystem.Reg.defaultEscapeCode;
    var arr = regExp.exec(textState.text.slice(textState.index));
    if (arr) {
      textState.index += arr[0].length;
      return arr[0].toUpperCase();
    } else {
      return "";
    }
  };

  /**
   * 확장된 색상 변경 텍스트 코드 처리
   * \색[빨강]과 웹색상 처리를 위한 정규 표현식 처리
   * @param {}} textState
   */
  Window_Base.prototype.obtainNameColor = function (textState) {
    var arr = /\[(.+?)\]/gi.exec(textState.text.slice(textState.index));
    if (arr) {
      textState.index += arr[0].length;
      return Color.gmColor(arr[1]);
    } else {
      return ColorManager.textColor(0);
    }
  };

  Window_Base.prototype.changeTextColor = function (color) {
    var c = parseInt(color);
    // 색상 코드가 숫자인 경우
    if (c > 0 && c < 32) {
      color = ColorManager.textColor(color);
    }
    if (!this._isUsedTextWidthEx) {
      this.contents.textColor = color;
    }
  };

  var alias_Window_Base_processEscapeCharacter =
    Window_Base.prototype.processEscapeCharacter;
  Window_Base.prototype.processEscapeCharacter = function (code, textState) {
    var tcGroup = RS.MessageSystem.TextCodes.ENUM;
    var textCode = RS.MessageSystem.TextCodes.Main;
    switch (code) {
      case "C":
        this.changeTextColor(
          this.textColor(<number>this.obtainEscapeParam(textState))
        );
        break;
      case textCode[tcGroup.COLOR]:
        this.changeTextColor(this.obtainNameColor(<TextState>textState));
        break;
      case "I":
      case textCode[tcGroup.ICON]:
        this.processDrawIcon(
          <number>this.obtainEscapeParam(textState),
          textState
        );
        break;
      case "{":
      case textCode[tcGroup.INCREASE]:
        this.makeFontBigger();
        break;
      case "}":
      case textCode[tcGroup.DECREASE]:
        this.makeFontSmaller();
        break;
      case "AEND":
        $gameMessage.clearAlignLast();
        break;
      default:
        alias_Window_Base_processEscapeCharacter.call(this, code, textState);
        break;
    }
  };

  var alias_loadWindowskin = Window_Base.prototype.loadWindowskin;
  Window_Base.prototype.loadWindowskin = function () {
    alias_loadWindowskin.call(this);
    this.windowskin.addLoadListener(() => {
      Color.baseColor = ColorManager.textColor(0);
    });
  };

  Window_Base.prototype.getFontFace = function () {
    var langCode =
      RS.MessageSystem.Params.langCode || navigator.language.slice(0, 2);
    var fonts = RS.MessageSystem.Params.fonts[langCode];
    if (fonts) {
      return fonts;
    } else {
      return RS.MessageSystem.Params.fonts.default;
    }
  };

  Window_Base.prototype.drawTextEx = function (text, x, y, width) {
    this.save();
    this.resetFontSettings();
    const textState = this.createTextState(text, x, y, width);
    this.processAllText(textState);
    this.restore();
    return textState.outputWidth;
  };

  Window_Base.prototype.processAllText = function (textState) {
    this._isUsedTextWidthEx = !textState.drawing;
    while (textState.index < textState.text.length) {
      this.processCharacter(textState);
    }
    this.flushTextState(textState);
  };

  Window_Base.prototype.makeFontSmaller = function () {
    if (this.contents.fontSize >= RS.MessageSystem.Params.minFontSize) {
      this.contents.fontSize -= 12;
    }
  };

  Window_Base.prototype.resetFontSettings = function () {
    this.contents.fontFace = this.getFontFace();
    this.contents.fontSize = RS.MessageSystem.Params.fontSize;
    this.contents.fontBold = false;
    this.contents.fontItalic = false;
    this.contents.outlineWidth = RS.MessageSystem.Params.defaultOutlineWidth;
    this.contents.outlineColor = RS.MessageSystem.Params.defaultOutlineColor;
    this.contents.fontGradient = false;
    this.contents.highlightTextColor = null;
    this.resetTextColor();
  };

  Window_Base.prototype.makeFontBigger = function () {
    if (this.contents.fontSize <= RS.MessageSystem.Params.maxFontSize) {
      this.contents.fontSize += 12;
    }
  };

  Window_Base.prototype.save = function () {
    this._messageDesc = new MessageDesc();
    this._messageDesc.save(this.contents);
  };

  Window_Base.prototype.restore = function () {
    if (!this._messageDesc) return;
    this._messageDesc.restore(this.contents);
    this._messageDesc = undefined;
  };

  var alias_Window_Base_convertEscapeCharacters =
    Window_Base.prototype.convertEscapeCharacters;
  Window_Base.prototype.convertEscapeCharacters = function (text) {
    const regGroup = RS.MessageSystem.Reg.Group;
    const tcGroup = RS.MessageSystem.TextCodes.ENUM;
    const textCode = RS.MessageSystem.TextCodes.Main;

    text = alias_Window_Base_convertEscapeCharacters.call(this, text);
    text = text.replace(
      regGroup[tcGroup.VAR],
      function (...args: any[]): string {
        return $gameVariables.value(parseInt(<string>args[1])).toString();
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.VAR],
      function (...args: any[]) {
        return $gameVariables.value(parseInt(args[1])).toString();
      }.bind(this)
    );
    text = text.replace(regGroup[tcGroup.PLAYER], (...args: any[]) => {
      return this.actorName(parseInt(args[1]));
    });
    text = text.replace(regGroup[tcGroup.PARTY_MEMBER], (...args: any[]) => {
      return this.partyMemberName(parseInt(args[1]));
    });
    text = text.replace(
      regGroup[tcGroup.NUM],
      function (...args: any[]) {
        return args[1].toComma();
      }.bind(this)
    );
    text = text.replace(regGroup[tcGroup.GOLD], TextManager.currencyUnit);
    text = text.replace(
      regGroup[tcGroup.CLASSES],
      function (...args: any[]) {
        return $dataClasses[parseInt(args[1])].name || "";
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.ITEM],
      function (...args: any[]) {
        return $dataItems[parseInt(args[1])].name || "";
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.WEAPON],
      function (...args: any[]) {
        return $dataWeapons[parseInt(args[1])].name || "";
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.ARMOR],
      function (...args: any[]) {
        return $dataArmors[parseInt(args[1])].name || "";
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.ENEMY],
      function (...args: any[]) {
        return $dataEnemies[parseInt(args[1])].name || "";
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.STATE],
      function (...args: any[]) {
        return $dataStates[parseInt(args[1])].name || "";
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.SKILL],
      function (...args: any[]) {
        return $dataSkills[parseInt(args[1])].name || "";
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.ALIGN_LEFT],
      function () {
        return "\x1b" + textCode[tcGroup.ALIGN] + "[0]";
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.ALIGN_CENTER],
      function () {
        return "\x1b" + textCode[tcGroup.ALIGN] + "[1]";
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.ALIGN_RIGHT],
      function () {
        return "\x1b" + textCode[tcGroup.ALIGN] + "[2]";
      }.bind(this)
    );
    text = text.replace(regGroup[tcGroup.ALIGN], (...args: any[]) => {
      if (!this._isUsedTextWidthEx) {
        $gameMessage.setAlign(Number(args[1] || 0));
      }
      return "";
    });
    text = text.replace(
      /<\/LEFT>|<\/CENTER>|<\/RIGHT>/gi,
      function () {
        return regGroup[tcGroup.ALIGN_CLEAR].source;
      }.bind(this)
    );
    return text;
  };

  /**
   * @deprecated
   */
  Window_Base.prototype.textPadding = function () {
    return this.itemPadding();
  };

  Window_Base.prototype.newLineX = function (textState) {
    return this.textPadding();
  };

  Window_Base.prototype.processAlign = function (textState) {
    textState = textState || this._textState;

    // 아랍어 인가?
    if (textState.rtl) {
      return;
    }

    switch ($gameMessage.getAlign()) {
      case 0:
        this.setAlignLeft(textState);
        break;
      case 1:
        this.setAlignCenter(textState);
        break;
      case 2:
        this.setAlignRight(textState);
        break;
    }
  };

  var alias_Window_Base_processNewLine_align =
    Window_Base.prototype.processNewLine;
  Window_Base.prototype.processNewLine = function (textState) {
    alias_Window_Base_processNewLine_align.call(this, textState);
    this.processAlign(<TextState>textState);
  };

  Window_Base.prototype.setAlignLeft = function (textState) {
    textState.x = this.newLineX(textState);
    textState.startX = textState.x;
  };

  Window_Base.prototype.setAlignCenter = function (textState) {
    var padding = this.textPadding();
    textState.x =
      (this.newLineX(textState) + this.contentsWidth() + padding) / 2 -
      textState.outputWidth / 2;
    textState.startX = textState.x;
  };

  Window_Base.prototype.setAlignRight = function (textState) {
    var padding = this.textPadding();
    textState.x = this.contentsWidth() - padding - textState.outputWidth;
    textState.startX = textState.x;
  };

  //============================================================================
  // Window_Message
  //============================================================================

  Window_Message.prototype.obtainTextSpeed = function (textState) {
    var arr = /\[(\d+)\]/.exec(textState.text.slice(textState.index));
    if (arr) {
      textState.index += arr[0].length;
      return parseInt(arr[1]);
    } else {
      return 0;
    }
  };

  Window_Message.prototype.obtainGradientText = function (textState) {
    var arr = /^<(.+?)>/.exec(textState.text.slice(textState.index));
    if (arr) {
      textState.index += arr[0].length;
      return String(arr[1]);
    } else {
      return "Empty Text";
    }
  };

  Window_Message.prototype.obtainSoundName = function (textState) {
    var arr = /\<(.+?)\>/.exec(textState.text.slice(textState.index));
    if (arr) {
      textState.index += arr[0].length;
      return String(arr[1]);
    } else {
      return "";
    }
  };

  var alias_Window_Message_processEscapeCharacter =
    Window_Message.prototype.processEscapeCharacter;
  Window_Message.prototype.processEscapeCharacter = function (
    code,
    textState: TextState | string
  ) {
    var tcGroup = RS.MessageSystem.TextCodes.ENUM;
    var textCode = RS.MessageSystem.TextCodes.Main;
    switch (code) {
      case textCode[tcGroup.TEXT_SPEED]:
        $gameMessage.setWaitTime(<number>this.obtainEscapeParam(textState));
        break;
      case textCode[tcGroup.TEXT_SIZE]:
        this.setTextSize(<number>this.obtainEscapeParam(textState));
        break;
      case textCode[tcGroup.OUTLINE_COLOR]:
        this.setStrokeColor(this.obtainNameColor(<TextState>textState));
        break;
      case textCode[tcGroup.INDENT]:
        this.setTextIndent(<TextState>textState);
        break;
      case textCode[tcGroup.OUTLINE_WIDTH]:
        this.setStrokeWidth(
          <number>this.obtainEscapeParam(<TextState>textState)
        );
        break;
      case textCode[tcGroup.BOLD]:
        this.setTextBold(!this.contents.fontBold);
        break;
      case textCode[tcGroup.BOLD_START]:
        this.setTextBold(true);
        break;
      case textCode[tcGroup.BOLD_END]:
        this.setTextBold(false);
        break;
      case textCode[tcGroup.ITALIC]:
        this.setTextItalic(!this.contents.fontItalic);
        break;
      case textCode[tcGroup.ITALIC_START]:
        this.setTextItalic(true);
        break;
      case textCode[tcGroup.ITALIC_END]:
        this.setTextItalic(false);
        break;
      case textCode[tcGroup.GRADIENT]:
        this.setTextGradient(<TextState>textState);
        break;
      case textCode[tcGroup.HIGHLIGHT_TEXT_COLOR]:
        this.setHighlightTextColor(this.obtainNameColor(<TextState>textState));
        break;
      case textCode[tcGroup.TAB]:
        (<TextState>textState).x += Number(
          this.textWidth("A") * RS.MessageSystem.Params.TabSize
        );
        break;
      case textCode[tcGroup.CARRIAGE_RETURN]:
        (<TextState>textState).x = Number((textState as TextState).startX || 0);
        if (!this._isUsedTextWidthEx) this.startWait(1);
        break;
      case textCode[tcGroup.PLAY_SE]:
        if (!this._isUsedTextWidthEx)
          this.playSe(this.obtainSoundName(<TextState>textState));
        break;
      case textCode[tcGroup.SHOW_PICTURE]:
        if (this._isUsedTextWidthEx) break;
        this.showPicture(this.obtainSoundName(<TextState>textState));
        this.startWait(15);
      case textCode[tcGroup.HIDE_PICTURE]:
        if (this._isUsedTextWidthEx) break;
        this.erasePicture(<number>this.obtainEscapeParam(textState));
        this.startWait(15);
      case textCode[tcGroup.FACE]:
        if (this._isUsedTextWidthEx) break;
        var params = this.obtainSoundName(<TextState>textState).split(",");
        // this.redrawFaceImage(textState, params[0], params[1], 0, 0);
        this.startWait(1);
        break;
      default:
        alias_Window_Message_processEscapeCharacter.call(this, code, textState);
        break;
    }
  };

  Window_Message.prototype.setTextItalic = function (...args) {
    this.contents.fontItalic = args[0];
  };

  Window_Message.prototype.setTextBold = function (...args) {
    this.contents.fontBold = args[0];
  };

  Window_Message.prototype.setTextSize = function (...args) {
    this.contents.fontSize = args[0].clamp(
      RS.MessageSystem.Params.minFontSize,
      RS.MessageSystem.Params.maxFontSize
    );
  };

  Window_Message.prototype.setStrokeWidth = function (...args) {
    this.contents.outlineWidth = args[0];
  };

  Window_Message.prototype.setStrokeColor = function (...args) {
    this.contents.outlineColor = args[0];
  };

  Window_Message.prototype.setTextIndent = function (textState) {
    textState.x += <number>this.obtainEscapeParam(textState);
  };

  Window_Message.prototype.setHighlightTextColor = function (...args: any[]) {
    let color: any = args[0];
    if (color === "null" || color === "없음") {
      color = null;
    }
    this.contents.highlightTextColor = color;
  };

  Window_Message.prototype.setTextGradient = function (textState) {
    // TODO: 여기에서는 텍스트를 그리지 않는다.
    // TODO: 그레디언트 모드임을 명시하고 flush 단계에서 한 번에 그려야 한다 (배경색도 마찬가지이다)
    this.contents.fontGradient = true;
  };

  Window_Message.prototype.playSe = function (seName) {
    var realName = seName.trim();
    var data = <rm.types.AudioParameters>{
      name: realName,
      pan: 0,
      pitch: 100,
      volume: (<any>ConfigManager).seVolume,
    };
    AudioManager.playSe(data);
  };

  Window_Message.prototype.showPicture = function (param: string) {
    const raw = param.split(",").map((e) => {
      return e.trim();
    });

    let params = [
      Number(raw[0]),
      raw[1],
      Number(raw[2]),
      Number(raw[3]),
      Number(raw[4]),
      100,
      100,
      255,
      0,
    ];
    let ret = true;

    // 모든 요소 검증
    if (params) {
      params.forEach(function (e, i, a) {
        if (e === undefined || e === null) {
          ret = false;
        }
      });
    }
    // 검증 결과가 참이라면 그림 표시
    if (ret) {
      $gameScreen.showPicture.apply($gameScreen, <any>params);
      return true;
    }
    return false;
  };

  Window_Message.prototype.erasePicture = function (picId) {
    if (typeof picId !== "number") return;
    $gameScreen.erasePicture(picId);
  };

  // 구조가 변경된 메서드
  Window_Message.prototype.resetFontSettings = function () {
    Window_Base.prototype.resetFontSettings.call(this);

    // pause 아이콘 표시 위치 초기화
    if (this._pauseSignSprite) {
      this._pauseSignSprite.move(this._width / 2, this._height);
      this._pauseSignSprite.scale.y = 1;
    }

    $gameMessage.setWaitTime(RS.MessageSystem.Params.textSpeed);
  };

  // 새로 추가된 메서드
  Window_Message.prototype.resetGradient = function (textState) {
    this.contents.fontGradient = false;
  };

  // 폰트 사이즈 설정 메서드는 MZ에서 없다
  Window_Message.prototype.numVisibleRows = function () {
    return RS.MessageSystem.Params.numVisibleRows;
  };

  /**
   * Create text state included px and py values for text word wrapping.
   */
  const alias_Window_Message_createTextState =
    Window_Message.prototype.createTextState;
  Window_Message.prototype.createTextState = function (text, x, y, width) {
    let textState = alias_Window_Message_createTextState.call(
      this,
      text,
      x,
      y,
      width
    );

    const px = textState.x;
    const py = textState.y;

    // mixin
    Object.assign(textState, {
      px,
      py,
    });

    return textState;
  };

  Window_Message.prototype.processWordWrap = function (
    textState,
    w,
    width,
    isValid
  ) {
    const px = <Required<number>>textState.px;

    if (Math.floor(px + w * 2) > width) {
      if (isValid) {
        this.processNewLine(textState);
        if (this.needsNewPage(textState)) {
          this.startPause();
        }
      }
    }
  };

  const alias_Window_Message_processNewLinePW =
    Window_Message.prototype.processNewLine;
  Window_Message.prototype.processNewLine = function (textState) {
    alias_Window_Message_processNewLinePW.call(this, textState);
    // 내부 버퍼의 위치를 시작 지점으로 초기화한다.
    (<TextState>textState).px = textState.startX || (<TextState>textState).x;
  };

  /**
   * ! Override
   * @param {Object} textState
   */
  Window_Message.prototype.processCharacter = function (textState) {
    const c = textState.text[textState.index++];
    if (c.charCodeAt(0) < 0x20) {
      this.flushTextState(textState);
      this.processControlCharacter(textState, c);
    } else {
      textState.buffer += c;

      // 내부 버퍼의 위치를 누적 계산한다.
      textState.px += this.textWidth(c);
    }
  };

  const alias_Window_Message_processCharacter =
    Window_Message.prototype.processCharacter;
  Window_Message.prototype.processCharacter = function (textState) {
    // 이전 텍스트의 길이를 계산한다.
    let isDirty = false;
    const preBuffer = textState.buffer || "";
    let preLen = preBuffer.length;

    alias_Window_Message_processCharacter.call(this, textState);

    // 새로운 텍스트가 이후에 있는가?
    // 그게 문자인지 제어 문자인지는 이 로직에선 알 수 없다.
    const postBuffer = textState.buffer || "";
    const postLen = postBuffer.length;
    if (preLen !== postLen) {
      isDirty = true;
    }

    if (isDirty) {
      // 끝에 있는 글자를 가지고 온다.
      // 하지만 제어 문자인지는 확인하지 않는다.
      // 제어 문자 여부는 메인 로직에서 판단하게 둔다.
      const c = textState.buffer.substr(textState.buffer.length - 1, 1);
      this.processNormalCharacterProxy(textState, c);
    }
  };

  /**
   * MZ에서는 processNormalCharacter의 구현이 없다.
   * 하지만, 자동 개행이나 사운드 재생 그리고 배경색 묘화를 위해 위치 계산이 필요하다.
   * 이 때문에 추가한 메서드이며, 텍스트의 묘화를 하진 않는다.
   * @param {*} textState
   * @param {*} c
   */
  Window_Message.prototype.processNormalCharacterProxy = function (
    textState,
    c
  ) {
    // MZ에서는 텍스트 상태(textState)가 다음 제어 문자가 등장해야 flush 처리된다.
    // 따라서 이곳에서는 텍스트가 그려질 수 없다.
    const w = this.textWidth(c);
    let width = this.contentsWidth();

    // 일반 메시지 모드에서만 동작 한다.
    let isValid =
      $gameMessage.getBalloon() === -2 &&
      !this._isUsedTextWidthEx &&
      RS.MessageSystem.Params.isParagraphMinifier;

    // 소수점 자리를 버려야 정확히 계산된다.
    this.processWordWrap(textState, w, width, isValid);

    const contents = this.contents;
    const faceName = $gameMessage.faceName();

    // if the faceName is not empty and the face direction is to right?
    if (faceName !== "") {
      width = contents.width - ImageManager.faceWidth;
      isValid = RS.MessageSystem.Params.faceDirection === 2;
      this.processWordWrap(textState, w, width, isValid);
    }

    // 배경색의 위치를 계산하고 비트맵 인스턴스를 생성한다.
    if (contents.highlightTextColor !== null) {
      const contentW = Math.floor(w * 2) + 1.0;
      const contentH = this.lineHeight();

      // 배경 버퍼의 생성
      this._backBuffer = {
        buffer: new Bitmap(contentW, contentH),
        textState: null,
        isDirty: false,
      };

      const { px, py } = <TextState>textState;

      // 배경 버퍼는 내부 버퍼의 초기 위치로부터 계산된다.
      this._backBuffer.buffer.fillAll(contents.highlightTextColor);
      // 이 플래그가 활성화되어있다면 flushTextState에서 그리기 처리를 해야 한다.
      this._backBuffer.isDirty = true;
      this._backBuffer.textState = textState;
    }
  };

  const alias_Window_Message_flushTextState =
    Window_Message.prototype.flushTextState;
  Window_Message.prototype.flushTextState = function (textState) {
    // 기본 지연 시간 설정
    if (
      !this._showFast &&
      !this.isEndOfText(textState) &&
      !this._isUsedTextWidthEx
    ) {
      this.startWait($gameMessage.getWaitTime() || 0);
    }

    // 배경색의 처리
    if (
      !this._isUsedTextWidthEx &&
      this._backBuffer &&
      this._backBuffer.isDirty
    ) {
      if (textState.drawing) {
        /**
         * @type {Bitmap}
         */
        const bitmap = this._backBuffer.buffer;
        const tx = (<TextState>textState).px;
        const ty = (<TextState>textState).py;
        const x = (<TextState>textState).x;
        const y = (<TextState>textState).y;
        const w = bitmap.width;
        const h = bitmap.height;

        this.contents.blt(bitmap, 0, 0, w, h, x, y);
        this._backBuffer.isDirty = false;
      }
    }
    alias_Window_Message_flushTextState.call(this, textState);
  };

  // [X] Window_Message.prototype.createSubWindows
  // [X] RS.MessageSystem.Params.extraSubWindows = [];
  // [X] Window_Message.prototype.subWindows

  Window_Message.prototype.updateBigFaceOpacity = function () {
    if (!this._faceContents) {
      return;
    }
    let { faceOpacity } = RS.MessageSystem.Params;
    if (!faceOpacity) faceOpacity = 255;
    const value = faceOpacity.clamp(0, 255);
    this._faceContents.opacity = value;
  };

  Window_Message.prototype.fadeInOutFaceContents = function () {
    if (!this._faceContents) {
      return;
    }

    const isValid = this.isOpening() || this.isClosing();
    if (isValid) {
      const openness = (this.openness || 0).clamp(0, 255);
      this._faceContents.scale.y = openness / 255;
      this._faceContents.y =
        (this._faceContents.height / 2) * (1 - this.openness / 255);
    }
  };

  const alias_Window_Message_checkToNotClose =
    Window_Message.prototype.checkToNotClose;
  Window_Message.prototype.checkToNotClose = function () {
    this.fadeInOutFaceContents();
    alias_Window_Message_checkToNotClose.call(this);
  };

  Window_Message.prototype.updatePlacement = function () {
    // TODO: try-catch statement will be deleted later.
    try {
      const goldWindow = this._goldWindow;
      this._positionType = $gameMessage.positionType();

      // 말풍선 모드가 아니라면 X좌표를 화면 중앙에 맞춘다.
      if ($gameMessage.getBalloon() === -2) {
        this.x =
          Graphics.boxWidth / 2 -
          this.width / 2 +
          RS.MessageSystem.Params.windowOffset.x;
        this.y =
          (this._positionType * (Graphics.boxHeight - this.height)) / 2 +
          RS.MessageSystem.Params.windowOffset.y;
      } else {
        if (SceneManager._scene instanceof Scene_Map)
          this.updateBalloonPosition();
      }

      // 골드 윈도우의 위치 설정
      const minGoldY = goldWindow.height;
      this._goldWindow.y =
        this.y > minGoldY ? 0 : Graphics.boxHeight - goldWindow.height;

      // 투명도 업데이트
      this.updateDefaultOpacity();
      this.updateContentsOpacity();
      this.updateBigFaceOpacity();

      // 이름 윈도우 업데이트

      // 얼굴 이미지의 Z-Index 업데이트
      if ($gameMessage.faceName() !== "") {
        const isBigFace = /^Big_/.exec($gameMessage.faceName());
        const backIndex = 2;

        if (RS.MessageSystem.Params.faceSide) {
          this.setFaceZIndex(isBigFace ? 0 : backIndex);
        } else {
          this.setFaceZIndex(backIndex);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const alias_Window_Message_convertEscapeCharacters =
    Window_Message.prototype.convertEscapeCharacters;
  Window_Message.prototype.convertEscapeCharacters = function (text) {
    const tcGroup = RS.MessageSystem.TextCodes.ENUM;
    const textCode = RS.MessageSystem.TextCodes.Main;
    const regGroup = RS.MessageSystem.Reg.Group;
    text = alias_Window_Message_convertEscapeCharacters.call(this, text);
    text = text.replace(
      regGroup[tcGroup.BOLD_START_CV],
      function () {
        return regGroup[tcGroup.BOLD_START].source;
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.BOLD_END_CV],
      function () {
        return regGroup[tcGroup.BOLD_END].source;
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.ITALIC_START_CV],
      function () {
        return regGroup[tcGroup.ITALIC_START].source;
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.ITALIC_END_CV],
      function () {
        return regGroup[tcGroup.ITALIC_END].source;
      }.bind(this)
    );
    text = text.replace(regGroup[tcGroup.NAME], (...args) => {
      let retName = args[1];

      if (retName.endsWith(":left")) {
        retName = retName.replace(":left", "");
        RS.MessageSystem.Params.namePositionTypeAtX = "left";
      }
      if (retName.endsWith(":auto")) {
        retName = retName.replace(":auto", "");
        RS.MessageSystem.Params.namePositionTypeAtX = "auto";
      }
      if (retName.endsWith(":center")) {
        retName = retName.replace(":center", "");
        RS.MessageSystem.Params.namePositionTypeAtX = "center";
      }
      if (retName.endsWith(":opacity0")) {
        retName = retName.replace(":opacity0", "");
        RS.MessageSystem.Params.namePositionTypeAtX = "opacity0";
      }
      if (retName.endsWith(":defaultOpacity")) {
        retName = retName.replace(":defaultOpacity", "");
        RS.MessageSystem.Params.namePositionTypeAtX = "defaultOpacity";
      }
      if (retName.endsWith(":right")) {
        retName = retName.replace(":right", "");
        RS.MessageSystem.Params.namePositionTypeAtX = "right";
      }
      (this._nameWindow as any).drawName(retName);
      return "";
    });
    text = text.replace(
      regGroup[tcGroup.BALLOON],
      function () {
        const value = Number(arguments[1] || -2);
        if ($gameParty.inBattle()) {
          $gameMessage.setBalloon(
            // @ts-ignore
            value < 0 ? "ENEMIES : " + Math.abs(value) : "ACTORS : " + value
          );
        } else {
          $gameMessage.setBalloon(value);
        }
        return "";
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.FRIENDLY_TROOPS],
      function () {
        var value = Number(arguments[1] || 0);
        $gameMessage.setBalloon(
          // @ts-ignore
          "ACTORS : " + value
        );
        return "";
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.ENEMY_TROOPS],
      function () {
        var value = Number(arguments[1] || 0);
        $gameMessage.setBalloon(
          // @ts-ignore
          "ENEMIES : " + value
        );
        return "";
      }.bind(this)
    );
    text = text.replace(regGroup[tcGroup.FACE_DIRECTION], () => {
      var value = Number(arguments[1] || 0);
      if (!this._isUsedTextWidthEx) {
        RS.MessageSystem.Params.faceDirection = value;
      }
      return "";
    });
    return text;
  };

  // Window_Message.prototype.terminateMessage

  Window_Message.prototype.setHeight = function (n) {
    this.contents.clear();
    $gameMessage.setMaxLine(n);
    this.height = this.fittingHeight(n);
    this.createContents();
    this.updatePlacement();
  };

  const alias_Window_Message_initialize = Window_Message.prototype.initialize;
  Window_Message.prototype.initialize = function (rect) {
    alias_Window_Message_initialize.call(this, rect);
    $gameTemp.setMSHeightFunc(this.setHeight.bind(this));
    this.setHeight(RS.MessageSystem.Params.numVisibleRows);
    this.createFaceContents();
    this.on("removed", this.removeEventHandler, this);
    this.on("onLoadWindowskin", this.onLoadWindowskin, this);
  };

  Window_Message.prototype.removeEventHandler = function () {
    this.off("onLoadWindowskin", this.onLoadWindowskin, this);
  };

  /**
   * TODO: ColorManager.textColor의 대체 구현.
   *
   * @param {Number} n
   * @returns
   */
  Window_Message.prototype.textColor = function (n) {
    const windowskin = this.windowskin;
    if (!windowskin.isReady()) {
      // Set the default text color if the windowskin is not ready.
      return Color.baseColor;
    }
    const px = 96 + (n % 8) * 12 + 6;
    const py = 144 + Math.floor(n / 8) * 12 + 6;
    return windowskin.getPixel(px, py);
  };

  Window_Message.prototype.onLoadWindowskin = function () {
    Color.baseColor = this.textColor(0);
    this.changeTextColor(Color.baseColor);
  };

  Window_Message.prototype.loadWindowskin = function () {
    const bitmap = ImageManager.loadSystem(RS.MessageSystem.Params.windowskin);

    // if the windowskin is changed?
    if (bitmap !== this.windowskin) {
      this.windowskin = bitmap;
      this._isDirtyWindowskin = false;
      this.windowskin.addLoadListener(() => {
        this._isDirtyWindowskin = true;
      });
      if (!this.contents) {
        this.createContents();
      }
      // Set the default text color if the windowskin didn't load yet.
      this.changeTextColor(Color.baseColor);

      if (!this.windowskin.isReady()) {
        return setTimeout(() => this.loadWindowskin(), 10);
      }
    }
  };

  var _Window_Message_updateLoading = Window_Message.prototype.updateLoading;
  Window_Message.prototype.updateLoading = function () {
    let ret = true;

    if (this._isDirtyWindowskin) {
      Color.baseColor = ColorManager.textColor(0);
      this.changeTextColor(Color.baseColor);
      this._isDirtyWindowskin = false;
      ret = true;
    }
    return _Window_Message_updateLoading.call(this) && ret;
  };

  Window_Message.prototype.needsNewPage = function (textState) {
    return (
      !this.isEndOfText(textState) &&
      textState.y + textState.height > this.contentsHeight()
    );
  };

  Window_Message.prototype.createFaceContents = function () {
    this._faceContents = new Sprite();
    this._faceContents.x = 0;
    this._faceContents.y = 0;

    this.addChildAt(this._faceContents, 2);
    return this._faceContents;
  };

  Window_Message.prototype.removeFaceContents = function () {
    if (this._faceContents) this.removeChild(this._faceContents);
  };

  /**
   * 큰 얼굴 이미지가 설정되었을 때 텍스트 시작 위치
   */
  Window_Message.prototype.newLineX = function () {
    const reg = /^Big_/i;
    const faceName = $gameMessage.faceName();
    const faceIndex = $gameMessage.faceIndex();
    if (reg.exec(faceName)) {
      var faceStartX = RS.MessageSystem.Params.faceSide
        ? 0
        : RS.MessageSystem.Params.textStartX;
      return faceIndex > 0 ? 0 : faceStartX;
    } else {
      if (RS.MessageSystem.Params.faceDirection === 2) return 0;
      return faceName ? RS.MessageSystem.Params.faceStartOriginX : 0;
    }
  };

  // TODO: 큰 얼굴 이미지 구현 필요

  /**
   * @param {String} faceName
   */
  Window_Message.prototype.isValidBigFace = function (faceName) {
    var reg = /^Big_/i;
    return reg.exec(faceName);
  };

  /**
   * TODO: deprecated
   */
  Window_Message.prototype.updateNameWindow = function () {};

  /**
   * Window 구성 스프라이트 _windowBackSprite의 투명도를 조절합니다.
   * TODO: deprecated
   * @method standardBackOpacity
   */
  Window_Message.prototype.standardBackOpacity = function () {
    return RS.MessageSystem.Params.backOpacity;
  };

  /**
   * Bitmap의 context.globalAlpha 값을 변경합니다.
   * @method translucentOpacity
   */
  Window_Message.prototype.translucentOpacity = function () {
    return RS.MessageSystem.Params.translucentOpacity;
  };

  /**
   * 윈도우를 구성하는 모든 객체의 투명도를 변경합니다.
   * @method updateDefaultOpacity
   */
  Window_Message.prototype.updateDefaultOpacity = function () {
    this.opacity = RS.MessageSystem.Params.defaultOpacity;
  };

  /**
   * Window 구성 스프라이트 _windowContentsSprite의 투명도를 변경합니다.
   * @method updateContentsOpacity
   */
  Window_Message.prototype.updateContentsOpacity = function () {
    this.contentsOpacity = RS.MessageSystem.Params.contentsOpacity;
  };

  Window_Message.prototype.getSpriteActors = function (
    sign: number
  ): IBalloonSpriteTarget | null {
    if (!$gameParty.members()) return null;
    const max = $gameParty.members().length;
    sign = sign.clamp(0, max);

    return {
      type: "actor",
      id: sign - 1,
    };
  };

  Window_Message.prototype.getSpriteEnemies = function (
    sign: number
  ): IBalloonSpriteTarget | null {
    if (!$gameTroop.members()) return null;
    const max = $gameTroop.members().length;
    sign = sign.clamp(0, max);

    return {
      type: "enemy",
      id: sign - 1,
    };
  };

  Window_Message.prototype.setupOwner = function (sign) {
    switch (sign) {
      case -1: // 플레이어
        $gameMap.setMsgOwner($gamePlayer);
        break;
      case 0: // 이 이벤트
        $gameMap.setMsgOwner(<Game_Event>$gameMap.getMsgEvent());
        break;
      default:
        if (SceneManager._scene instanceof Scene_Battle) {
          // 전투 중인가?
          if (/(?:ENEMIES)[ ]*:(.*)/.test(sign.toString())) {
            // 적
            $gameMap.setMsgOwner(this.getSpriteEnemies(parseInt(RegExp.$1)));
          }
          if (/(?:ACTORS)[ ]*:(.*)/.test(sign.toString())) {
            // 아군
            $gameMap.setMsgOwner(this.getSpriteActors(parseInt(RegExp.$1)));
          }
        } else {
          // 맵 이벤트
          $gameMap.setMsgOwner($gameMap.event(sign));
        }
        break;
    }
  };

  const alias_Window_Message_shouldBreakHere =
    Window_Message.prototype.shouldBreakHere;
  Window_Message.prototype.shouldBreakHere = function (text) {
    const isBreakCharacter = alias_Window_Message_shouldBreakHere.call(
      this,
      text
    );

    if (isBreakCharacter) {
      if (RS.MessageSystem.Params.isPlayTextSound) {
        const interval = RS.MessageSystem.Params.textSoundInterval;

        // prettier-ignore
        if ((this._textSoundInterval--) <= 0) {
              AudioManager.playStaticSe(< rm.types.AudioParameters >{
                  name: RS.MessageSystem.popParameter(
                      "Text Sound",
                      "텍스트 효과음"
                  ),
                  pan: 0,
                  pitch: 100,
                  volume: 90,
              });
              this._textSoundInterval = interval;
          }
      }
    }

    return isBreakCharacter;
  };

  //============================================================================
  // Components
  //============================================================================

  DependencyInjector.COMPONENTS.push(BalloonWindowTransformComponent);
  DependencyInjector.COMPONENTS.push(NameWindowPositionComponent);

  //============================================================================
  // Game_Interpreter
  //============================================================================

  Game_Interpreter.prototype.processMessageParams = function (
    eventId: number,
    index: number
  ) {
    const meta = <EventCommand.CommentMeta>(
      RS.MessageSystem.getEventComments(eventId, index - 1)
    );
    if (meta["윈도우 스킨"]) {
      RS.MessageSystem.Params.windowskin =
        meta["윈도우 스킨"].trim() || "Window";
      ImageManager.loadSystem(RS.MessageSystem.Params.windowskin);
    }
    if (meta["이름 윈도우 스킨"]) {
      RS.MessageSystem.Params.windowskinForNameWindow =
        meta["이름 윈도우 스킨"].trim() || "Window";
      ImageManager.loadSystem(RS.MessageSystem.Params.windowskinForNameWindow);
    }
    if (meta["라인 높이"]) {
      RS.MessageSystem.Params.lineHeight = parseInt(meta["라인 높이"]);
    }
    if (meta["폰트 크기"]) {
      RS.MessageSystem.Params.fontSize = parseInt(meta["폰트 크기"]);
    }
    if (meta["라인"]) {
      RS.MessageSystem.Params.numVisibleRows = parseInt(meta["라인"]);
    }
    if (meta["텍스트 시작 X"]) {
      RS.MessageSystem.Params.textStartX = parseInt(meta["텍스트 시작 X"]);
    }
    if (meta["큰 페이스칩 OX"]) {
      RS.MessageSystem.Params.faceOX = Number(meta["큰 페이스칩 OX"]);
    }
    if (meta["큰 페이스칩 OY"]) {
      RS.MessageSystem.Params.faceOY = Number(meta["큰 페이스칩 OY"]);
    }
    if (meta["대화창 뒤에 얼굴 표시"]) {
      RS.MessageSystem.Params.faceSide = Boolean(
        meta["대화창 뒤에 얼굴 표시"] === "true"
      );
    }
    if (meta["대화창 투명도"]) {
      RS.MessageSystem.Params.defaultOpacity = parseInt(meta["대화창 투명도"]);
    }
    if (meta["텍스트 효과음 재생 여부"]) {
      RS.MessageSystem.Params.isPlayTextSound = Boolean(
        meta["텍스트 효과음 재생 여부"] === "true"
      );
    }
    if (meta["기본 텍스트 출력 속도"]) {
      RS.MessageSystem.Params.textSpeed = Number(meta["기본 텍스트 출력 속도"]);
    }
  };

  Game_Interpreter.prototype.isValidMultiLine = function () {
    const codes = [];
    let prevCode = 401;
    let lineCount = 0;
    for (var i = 1; i < 8; i++) {
      const currentCommand = this._list[this._index + i];
      if (currentCommand) {
        const code = currentCommand.code;
        codes.push(code);
        prevCode = code;
        if ([101, 401].contains(code)) {
          lineCount++;
        }
      }
    }
    if (codes.contains(102)) {
      return false;
    } else if (codes.contains(103)) {
      return false;
    } else if ($gameMessage.getMaxLine() <= 4) {
      return false;
    } else if (lineCount <= 4) {
      return false;
    } else if (RS.MessageSystem.Params.choiceWindowStyle == "RMXP") {
      return false;
    } else {
      return true;
    }
  };

  Game_Interpreter.prototype.command101 = function () {
    if (!$gameMessage.isBusy()) {
      $gameMap.setMsgEvent(this.character(this._eventId > 0 ? 0 : -1));
      $gameMessage.setFaceImage(this._params[0], this._params[1]);
      $gameMessage.setBackground(this._params[2]);
      $gameMessage.setPositionType(this._params[3]);

      this.processMessageParams(this._eventId, this._index);

      if (this.isMultiLine()) {
        this.multiLineAddMessage();
      } else {
        while (this.nextEventCode() === 401) {
          // Text data
          this._index++;
          $gameMessage.add(this.currentCommand().parameters[0]);
        }
      }

      switch (this.nextEventCode()) {
        case 102: // Show Choices
          this._index++;
          this.setupChoices(this.currentCommand().parameters);
          break;
        case 103: // Input Number
          this._index++;
          this.setupNumInput(this.currentCommand().parameters);
          break;
        case 104: // Select Item
          this._index++;
          this.setupItemChoice(this.currentCommand().parameters);
          break;
      }
      this._index++;
      this.setWaitMode("message");
    }
    return false;
  };

  Game_Interpreter.prototype.multiLineAddMessage = function () {
    this.initLineHeight();

    while ($gameMessage._texts.length < $gameMessage.getMaxLine()) {
      while (this.nextEventCode() === 401) {
        this._index++;
        $gameMessage.add(this.currentCommand().parameters[0]);
        this.addLineHeight();
        if (this._lineHeight >= $gameMessage.getMaxLine()) {
          break;
        }
      }
      if (this.nextEventCode() !== 101) {
        break;
      }
    }

    // 커맨드 코드 401번이 아직 남아있는 상황이라면,
    // 다음 인덱스로 넘겨야 선택지가 제대로 동작한다.
    while (this.nextEventCode() === 401) {
      this._index++;
    }
  };

  Game_Interpreter.prototype.initLineHeight = function () {
    this._lineHeight = 0;
  };

  Game_Interpreter.prototype.isMultiLine = function () {
    return this.isValidMultiLine();
  };

  Game_Interpreter.prototype.addLineHeight = function () {
    this._lineHeight++;
    if (this.nextEventCode() === 101) {
      this._index++;
    }
  };

  //============================================================================
  // Window_NameBox
  //============================================================================

  Window_NameBox.prototype.updatePlacement = function () {
    this.width = this.windowWidth();
    this.height = this.windowHeight();
    const messageWindow = this._messageWindow;
    if ($gameMessage.isRTL()) {
      this.x = messageWindow.x + messageWindow.width - this.width;
    } else {
      this.x = messageWindow.x;
    }
    if (messageWindow.y > 0) {
      this.y = messageWindow.y - this.height;
    } else {
      this.y = messageWindow.y + messageWindow.height;
    }
  };

  //============================================================================
  // Game_Temp
  //============================================================================

  Game_Temp.prototype.setMSHeightFunc = function (func) {
    this._callMSHeightFunc = func;
  };

  Game_Temp.prototype.setMaxLine = function (n) {
    if (this._callMSHeightFunc) this._callMSHeightFunc(n);
  };

  //============================================================================
  // Game_Map
  //============================================================================

  var alias_Game_Map_initialize = Game_Map.prototype.initialize;
  Game_Map.prototype.initialize = function () {
    alias_Game_Map_initialize.call(this);
    this._msgOwner = $gamePlayer;
    this._msgEvent = 0;
  };

  Game_Map.prototype.getMsgOwner = function () {
    return this._msgOwner;
  };

  /**
   * @method setMsgOwner
   * @param o {Game_Event | Game_Player}
   */
  Game_Map.prototype.setMsgOwner = function (o) {
    this._msgOwner = o;
    $gameMessage.setBalloonPatternHeight(this.tileHeight());
  };

  Game_Map.prototype.getMsgEvent = function () {
    return this._msgEvent;
  };

  Game_Map.prototype.setMsgEvent = function (ev) {
    this._msgEvent = ev;
  };

  RS.MessageSystem.initSystem();
})(RS.MessageSystem);
