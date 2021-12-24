namespace RS {
  export interface TextCodes {}

  type MessageLangType =
    | "Default"
    | "Group"
    | "Korean"
    | "Chinese"
    | "English"
    | "Japanese"
    | "KoreanEscapeCode"
    | "ChineseEscapeCode"
    | "EnglishEscapeCode"
    | "JapaneseEscapeCode"
    | "defaultEscapeCode";

  export interface MessageSystem {
    TextCodes: TextCodes;
    jsonParse(str: string): any;
    popParameter(...args: any[]): any;
    Reg: Record<MessageLangType, any>;
    Params: Record<any, any>;
  }

  export interface Impl {
    TextCodes: TextCodes;
    MessageSystem: MessageSystem;
  }
}
