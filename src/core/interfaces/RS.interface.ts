export type TextCodeKey =
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

export const TC = {
    UNKNOWN: 0,
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
    FRIENDLY_TROOPS: 34,
    ENEMY_TROOPS: 35,
    WAIT_SEC_15: 36,
    WAIT_SEC_60: 37,
    START_PAUSE: 38,
    LINE_SHOW_FAST_LT: 39,
    LINE_SHOW_FAST_GT: 40,
    PAUSE_SKIP: 41,
    BOLD_START: 42,
    BOLD_END: 43,
    ITALIC_START: 44,
    ITALIC_END: 45,
    ALIGN_LEFT: 46,
    ALIGN_CENTER: 47,
    ALIGN_RIGHT: 48,
    BOLD_START_CV: 49,
    BOLD_END_CV: 50,
    ITALIC_START_CV: 51,
    ITALIC_END_CV: 52,
    ALIGN_CLEAR: 53,
    HIGHLIGHT_TEXT_COLOR: 54,
    FACE_DIRECTION: 55,
};

export interface TextCodeEnum {
    ENUM: Record<TextCodeKey, number>;
}

const textCodeRegData = ["Korean", "English", "Chinese", "Japanese"];

export type LanguageType = typeof textCodeRegData[number];

export interface TextCodeMain {
    Main: Array<string>;
    [key: string]: Array<any>;
}

export type TextCode = Record<string, any> & TextCodeEnum & TextCodeMain;
