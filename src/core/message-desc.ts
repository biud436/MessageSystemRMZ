export class MessageDesc {
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
    this.fontSize = $gameSystem.mainFontSize();
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

  save<T extends Window_Base>(messageWindow: T) {
    this.fontFace = messageWindow.contents.fontFace;
    this.fontSize = +messageWindow.contents.fontSize;
    this.fontBold = messageWindow.contents.fontBold;
    this.fontItalic = messageWindow.contents.fontItalic;
    this.textColor = messageWindow.contents.textColor;
    this.outlineColor = messageWindow.contents.outlineColor;
    this.outlineWidth = messageWindow.contents.outlineWidth;
    this.fontGradient = messageWindow.contents.fontGradient;
    this.highlightTextColor = messageWindow.contents.highlightTextColor;

    if ($gameMessage) {
      this.textSpeed = $gameMessage.getWaitTime();
    }

    this._isSaved = true;
  }

  restore<T extends Window_Base>(messageWindow: T) {
    if (!this._isSaved) return;
    if (!(messageWindow.contents instanceof Bitmap)) return;
    messageWindow.contents.fontFace = this.fontFace;
    messageWindow.contents.fontSize = this.fontSize;
    messageWindow.contents.fontBold = this.fontBold;
    messageWindow.contents.fontItalic = this.fontItalic;
    messageWindow.contents.textColor = this.textColor;
    messageWindow.contents.outlineColor = this.outlineColor;
    messageWindow.contents.outlineWidth = this.outlineWidth;
    messageWindow.contents.fontGradient = this.fontGradient;
    messageWindow.contents.highlightTextColor = this.highlightTextColor;
    if ($gameMessage) {
      $gameMessage.setWaitTime(this.textSpeed);
    }
    this._isSaved = false;
  }
}
