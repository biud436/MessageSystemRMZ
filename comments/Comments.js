//================================================================
// RS_MessageSystem.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2021 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @target MZ
 * @plugindesc <RS_MessageSystem>
 * @author biud436
 * @url https://biud436.tistory.com/
 *
 * @param Font Size
 * @type number
 * @desc Specifies the text size as integer type.
 * (default : 26)
 * @default 26
 *
 * @param numVisibleRows
 * @type number
 * @desc Sets the number of rows to indicate in a message window.
 * @default 4
 * @min 1
 * @param gradientColor1
 * @desc Sets needed gradient color for the start point of the gradient text.
 * @default #FFFFFF
 *
 * @param gradientColor2
 * @desc Sets needed gradient color for the middle point of the gradient text.
 * @default #F29661
 *
 * @param gradientColor3
 * @desc Sets needed gradient color for the ended point of the gradient text.
 * @default #CC3D3D
 *
 * @param Text Speed
 * @type number
 * @desc Sets the default text speed
 * @default 0
 * @min 0
 *
 * @param Text Min Size
 * @type number
 * @desc limits the text size by specifying the minimum text size when using the text code called '\}'.
 * @default 24
 *
 * @param Text Max Size
 * @type number
 * @desc limits the text size by specifying the maximum text size when using the text code called '\{'.
 * @default 96
 *
 * @param Text Start X
 * @type number
 * @desc The starting x position of the text in case of using a large face bitmap.
 * @default 6
 *
 * @param Bust Option
 *
 * @param Big Face OX
 * @parent Bust Option
 * @type number
 * @desc Sets the large face bitmap's offset x
 * @default 0
 *
 * @param Big Face OY
 * @parent Bust Option
 * @type number
 * @desc Sets the large face bitmap's offset y
 * @default 0
 *
 * @param face Opacity
 * @parent Bust Option
 * @text Big Face Opacity
 * @type number
 * @desc Set the opacity of the large face.
 * (0 - 255)
 * @default 255
 *
 * @param Show Big Face Back
 * @text Face Z-Index
 * @parent Bust Option
 * @type boolean
 * @desc if true, the bust image'll show behind the background of the message window.
 * @default false
 * @on true
 * @off false
 *
 * @param face Direction
 * @parent Bust Option
 * @text Face Position
 * @type select
 * @desc Specify the position of the normal face image.
 * @default 0
 * @option Left
 * @value 0
 * @option Right
 * @value 2
 *
 * @param Tab Size
 * @type number
 * @desc Sets the maximum width for tabs.
 * @default 4
 *
 * @param back Opacity
 * @type number
 * @desc Sets the opacity of the message window for backgrounds.
 * @default 192
 *
 * @param default Opacity
 * @type number
 * @desc Sets the default opacity of the message window.
 * @default 255
 *
 * @param contents Opacity
 * @type number
 * @desc Sets the opacity of the message window for all contents.
 * @default 255
 *
 * @param translucent Opacity
 * @type number
 * @desc Sets the translucent opacity of the message window.
 * @default 160
 *
 * @param default outline width
 * @type number
 * @desc Specifies the maximum width for text borders.
 * @default 2
 *
 * @param default outline Color
 * @desc Specifies the color for text borders.
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param Default Windowskin
 * @desc Specifies a window skin to message window
 * @require 1
 * @default Window
 * @dir img/system/
 * @type file
 *
 * @param System Font Settings
 *
 * @param systemFont
 * @parent System Font Settings
 * @text System Font
 * @type struct<SystemFont>
 * @desc The font is setting up as the system font.
 * @default {"settings":"[\"{\\\"languageCode\\\":\\\"ko\\\",\\\"fontName\\\":\\\"나눔고딕, Dotum, AppleGothic, sans-serif\\\"}\",\"{\\\"languageCode\\\":\\\"zh\\\",\\\"fontName\\\":\\\"SimHei, Heiti TC, sans-serif\\\"}\"]"}
 *
 * @param Custom Font
 *
 * @param Using Custom Font
 * @parent Custom Font
 * @type boolean
 * @desc Do you wish to use a custom font?
 * @default false
 *
 * @param Custom Font Name
 * @parent Custom Font
 * @desc Specifies the name for fonts
 * @default NanumBrush
 *
 * @param Custom Font Src
 * @parent Custom Font
 * @desc Specifies the file path for fonts
 * @default fonts/NanumBrush.ttf
 *
 * @param Choice Window
 *
 * @param Choice Style
 * @parent Choice Window
 * @type select
 * @desc Can change as the desired choice window style
 * @default default
 * @option RMXP Style
 * @value RMXP
 * @option Default Style
 * @value default
 *
 * @param Default Choice Position
 * @parent Choice Window
 * @type select
 * @desc Set the position of the choice window.
 * @default right
 * @option Right (Default)
 * @value right
 * @option Middle (Center)
 * @value middle
 * @option Left
 * @value left
 *
 * @param Name Window
 *
 * @param Name Windowskin
 * @parent Name Window
 * @desc Specifies a window skin for a name window
 * @require 1
 * @default Window
 * @dir img/system/
 * @type file
 *
 * @param Name Window X
 * @parent Name Window
 * @type number
 * @desc Sets the name window's offset x by dx.
 * @default 0
 *
 * @param Name Window Y
 * @parent Name Window
 * @type number
 * @desc Sets the name window's offset y by dy.
 * @default 0
 *
 * @param Name Window Inner Padding
 * @parent Name Window
 * @type number
 * @desc Sets the name window's inner padding
 * @default 10
 *
 * @param Name Window Position
 * @parent Name Window
 * @type select
 * @desc The name window's position sets up as certain position in message window
 * @default left
 * @option Top of left (default)
 * @value left
 * @option Top of right
 * @value right
 *
 * @param Text Color
 * @type struct<TextColor>[]
 * @desc This allows you to add desired text color.
 * @default ["{\"Color Name\":\"c_lviolet \",\"Red\":\"200\",\"Green\":\"191\",\"Blue\":\"231\",\"Alpha\":\"1.0\"}"]
 *
 * @param Text Code
 * @type struct<TextCode>
 * @desc Can change with desired text codes
 * @default {"Korean":"[\"색\",\"속도\",\"테두리색\",\"테두리크기\",\"들여쓰기\",\"굵게!\",\"이탤릭!\",\"이름\",\"그레디언트\",\"파티원\",\"주인공\",\"변수\",\"아이콘\",\"확대!\",\"축소!\",\"골드\",\"말풍선\",\"정렬자\",\"숫자\",\"크기\",\"탭!\",\"캐리지리턴!\",\"효과음\",\"그림표시\",\"그림제거\",\"아이템\",\"무기구\",\"방어구\",\"직업\",\"적군\",\"상태\",\"스킬\",\"얼굴\",\"아군\",\"적그룹\",\"[.]\",\"[|]\",\"[!]\",\"[<]\",\"[>]\",\"[\\\\^]\",\"AS굵게!\",\"AE굵게!\",\"AS이탤릭!\",\"AE이탤릭!\",\"LEFT\",\"CENTER\",\"RIGHT\",\"B\",\"B\",\"I\",\"I\",\"AEND\",\"배경색\",\"FD\"]","Chinese":"[\"色\",\"速度\",\"轮廓颜色\",\"轮廓宽度\",\"缩进\",\"加粗!\",\"倾斜!\",\"名字\",\"渐变颜色\",\"队伍成员\",\"角色\",\"变量\",\"图标\",\"增大!\",\"减少!\",\"金币\",\"对话框\",\"对齐\",\"数\",\"大小\",\"TAB!\",\"CR!\",\"音效播放\",\"显示图像\",\"隐藏图像\",\"道具\",\"武器\",\"装甲\",\"职业\",\"敌人\",\"状态\",\"技能\",\"脸\",\"我军\",\"敌人组\",\"[.]\",\"[|]\",\"[!]\",\"[<]\",\"[>]\",\"[\\\\^]\",\"AS加粗!\",\"AE加粗!\",\"AS倾斜!\",\"AE倾斜!\",\"左\",\"中間\",\"右\",\"B\",\"B\",\"I\",\"I\",\"AEND\",\"HC\",\"FD\"]","English":"[\"COLOR\",\"TEXT_SPEED\",\"OUTLINE_COLOR\",\"OUTLINE_WIDTH\",\"INDENT\",\"BOLD!\",\"ITALIC!\",\"NAME\",\"GRADIENT\",\"PARTY_MEMBER\",\"PLAYER\",\"VAR\",\"ICON\",\"INCREASE!\",\"DECREASE!\",\"GOLD\",\"BALLOON\",\"ALIGN\",\"NUM\",\"TEXT_SIZE\",\"TAB!\",\"CR!\",\"PLAY_SE\",\"SHOW_PICTURE\",\"HIDE_PICTURE\",\"ITEM\",\"WEAPON\",\"ARMOR\",\"CLASSES\",\"ENEMY\",\"STATE\",\"SKILL\",\"FACE\",\"FRIENDLY_TROOPS\",\"ENEMY_TROOPS\",\"[.]\",\"[|]\",\"[!]\",\"[<]\",\"[>]\",\"[\\\\^]\",\"ASBOLD!\",\"AEBOLD!\",\"ASITALIC!\",\"AEITALIC!\",\"LEFT\",\"CENTER\",\"RIGHT\",\"B\",\"B\",\"I\",\"I\",\"AEND\",\"HC\",\"FD\"]","Japanese":"[\"色\",\"テキストスピード\",\"輪郭の色\",\"輪郭のサイズ\",\"インデント\",\"太字!\",\"斜体!\",\"名前\",\"グラデーション\",\"パーティーメンバー\",\"アクタ\",\"変数\",\"アイコン\",\"INCREASE!\",\"DECREASE!\",\"通貨単位表示\",\"フキダシ\",\"整列\",\"数字\",\"テキストのサイズ\",\"TAB!\",\"CR!\",\"効果音\",\"ピクチャの表示\",\"ピクチャの消去\",\"アイテム\",\"武器\",\"防具\",\"職業\",\"敵キャラ\",\"ステート\",\"スキル\",\"顔\",\"FRIENDLY_TROOPS\",\"ENEMY_TROOPS\",\"[.]\",\"[|]\",\"[!]\",\"[<]\",\"[>]\",\"[\\\\^]\",\"AS太字!\",\"AE太字!\",\"AS斜体!\",\"AE斜体!\",\"LEFT\",\"CENTER\",\"RIGHT\",\"B\",\"B\",\"I\",\"I\",\"AEND\",\"HC\",\"FD\"]"}
 *
 * @param Sound Effects
 *
 * @param Text Sound ON/OFF
 * @parent Sound Effects
 * @type boolean
 * @default true
 *
 * @param Text Sound
 * @parent Sound Effects
 * @type file
 * @dir audio/se/
 * @desc Plays back the text sound when processing for each text.
 * @default Cursor1
 * @require 1
 *
 * @param Text Sound Execution Condition
 * @parent Sound Effects
 * @type note
 * @desc Make the probability to play the text sound.
 * @default "Math.randomInt(100) < 45"
 *
 * @param Text Sound Pool Size
 * @parent Sound Effects
 * @type number
 * @desc Specify the size of the text sound pool.
 * @default 2
 * @min 1
 *
 * @param Text Sound Interval
 * @parent Sound Effects
 * @type number
 * @desc Specify the text sound interval.
 * @default 2
 * @min 1
 *
 * @param Text Sound Volume
 * @parent Sound Effects
 * @type note
 * @desc Make the volume of the text sound by the random value that is float between 0.0 and 1.0
 * @default "0.4"
 *
 * @param Language Code
 * @type select
 * @desc Specify the language code of the text codes.
 * @default en
 * @option English
 * @value en
 * @option Korean
 * @value ko
 * @option Japanese
 * @value ja
 * @option Chinese
 * @value zh
 *
 * @param preload windowskin
 * @require 1
 * @dir img/system/
 * @type file[]
 * @desc preload windowskin files
 * @default
 *
 * @param Window Width
 * @text Window Width
 * @type string
 * @desc Specify the window width
 * (Graphics.width is the same as the screen width)
 * @default Graphics.width
 *
 * @param Gradient Style
 * @text Gradient Style
 * @type select
 * @desc Specify the gradient style.
 * @default linear-horizontal
 * @option linear-horizontal
 * @value linear-horizontal
 * @option axial-horizontal
 * @value axial-horizontal
 * @option linear-vertical
 * @value linear-vertical
 * @option axial-vertical
 * @value axial-vertical
 * @option radial
 * @value radial
 *
 * @param Paragraph Minifier
 * @text Automatic New Line
 * @type boolean
 * @desc Specify whether the word wrap is used.
 * (The default value is to false)
 * @default false
 * @on true
 * @off false
 *
 * @help
 * //! ===================================================================
 * //! Introduction
 * //! ===================================================================
 * This plugin allows you to use text codes in English, Korean, Chinese, Japanese.
 *
 * To send me general feedback, simply send an e-mail to biud436(gmail.com)
 * and mention the plugin name via the subject of your message.
 *
 * But, This plugin also provide the text codes in English instead of Korean.
 * To use the text codes in English,
 * You must set with 'en' in the plugin parameter named 'Language Code'
 *
 * English Text Codes :
 *
 *   \COLOR[html_color_name]
 *   \TEXT_SPEED[value]
 *   \OUTLINE_COLOR[color_name]
 *   \OUTLINE_WIDTH[value]
 *   \INDENT[value]
 *   \BOLD!
 *   \ITALIC!
 *   \NAME<event_name>
 *   \GRADIENT<text>
 *   \PARTY_MEMBER[nth]
 *   \PLAYER[nth]
 *   \VAR[nth]
 *   \ICON[nth]
 *   \INCREASE!
 *   \DECREASE!
 *   \GOLD
 *   \BALLOON[event_id]
 *   \BALLOON[0]
 *   \BALLOON[-1]
 *   \ALIGN[1]
 *   \ALIGN[2]
 *   \NUM[number]
 *   \TEXT_SIZE[number]
 *   \TAB!
 *   \CR!
 *   \PLAY_SE<se_name>
 *   \SHOW_PICTURE<nth, picture_name, origin_number, x, y>
 *   \HIDE_PICTURE[nth]
 *   \ITEM[nth]
 *   \WEAPON[nth]
 *   \ARMOR[nth]
 *   \CLASSES[nth]
 *   \ENEMY[nth]
 *   \STATE[nth]
 *   \SKILL[nth]
 *   \FACE<face_name,face_index>
 *   \FRIENDLY_TROOPS[nth]
 *   \ENEMY_TROOPS[nth]
 *   <B></B>
 *   <I></I>
 *   <LEFT></LEFT>
 *   <CENTER></CENTER>
 *   <RIGHT></RIGHT>
 *   \HC[color_name]
 *   \FD[face_position]
 *
 * //? ===================================================================
 * //? Opening the name window
 * //? ===================================================================
 * The name window is executed once before all the text codes start.
 * and automatically transforms the name window to fit the width of the text area.
 *
 * To open the name window, do as follows.
 * You put the name text between Less-than sign and Greater-than sign.
 *
 * \NAME<text>
 *
 * You can add a certain command by attaching a colon(:) at the end of the name text.
 * To change the position of the name window, as follows.
 *
 * \NAME<text:left>
 * \NAME<text:right>
 * \NAME<text:center>
 *
 * To change the opacity of the name window, as follows.
 *
 * \NAME<text:opacity0>
 * \NAME<text:defaultOpacity>
 *
 * To set the name window above the speech balloon, as follows
 *
 * \BALLOON[0]\NAME<eric>\COLOR[red]hello?
 *
 * To change the text color in the name window, as follows
 *
 * \NAME<\COLOR[red]eric>
 *
 * //? ===================================================================
 * //? Opening the speech balloon window
 * //? ===================================================================
 * The speech balloon window is executed once before all the text codes start.
 * and transforms the message window to fit with a target sprite and changes the position of it, too.
 *
 * To create a new speech balloon window and indicate, do as follows.
 *
 * You put the index between square brackets.
 * if the index sets to 0, it'll set to a current event.
 * if the index sets to -1, it'll set to a player.
 *
 * \BALLOON[event_id]
 * \BALLOON[0] ** current event
 * \BALLOON[-1] ** player
 *
 * In the battle, To indicate the window in above the battler, do as follows.
 * it can obtain the nth battler of the party members and indicate the message window.
 *
 * \FRIENDLY_TROOPS[nth]
 * \FRIENDLY_TROOPS[1] is the same as \BALLOON[1] and it can obtain the second FRIENDLY battler.
 * \FRIENDLY_TROOPS[2] is the same as \BALLOON[2]
 *
 * This can obtain the nth battler of the enemy troops and indicate the message window.
 *
 * \ENEMY_TROOPS[nth]
 * \ENEMY_TROOPS[1] is the same as \BALLOON[-1]
 * \ENEMY_TROOPS[2] is the same as \BALLOON[-2]
 *
 * Note that it will appear as the normal message window if the battler is in a dead state or does not exist.
 *
 * \BALLOON[1] // party member 1
 * \BALLOON[2] // party member 2
 * \BALLOON[3] // party member 3
 * \BALLOON[4] // party member 4
 * \BALLOON[5] // if the party member 5 is not existed, the target sets as party member 4.
 * \BALLOON[-1] // enemy 1
 * \BALLOON[-2] // enemy 2
 *
 * In the battle, it must put a negative or positive numbers between square brackets.
 * if you put to 0, it indicates as the normal message window.
 *
 * \BALLOON[0] // normal message window
 *
 * //? ===================================================================
 * //? Changing the text speed.
 * //? ===================================================================
 * This text code is applied once in the one page so in the other page has been invalid.
 *
 * To change the text speed in the message window, as follows.
 *
 * \TEXT_SPEED[frame]
 *
 * You put the speed value between square brackets.
 * if the value is to 0, The text will be drawn without delay.
 * if the value is to 1, The text will be drawn every 1 frame.
 *
 * Note that it will be reset with initial value when starting the next page.
 *
 * //? ===================================================================
 * //? Making the bold and the italic text.
 * //? ===================================================================
 * To change the font setting, it is possible to do bold and italic
 * settings by using a html tag such as <B></B><I></I>.
 *
 * For Example, you could use the following things.
 *
 * \BALLOON[0]\NAME<Wanderers>Hello. <B>Eric.</B> <I>Welcome to the game.</I>
 *
 * //? ===================================================================
 * //? Indenting the text
 * //? ===================================================================
 * To indent the text in the current page, as follows.
 * you can put the number for indent between square brackets.
 *
 * \INDENT[value]
 *
 * For instance, you are possible to use as follows.
 *
 * \indent[10]Leaves change their color in the fall
 *
 * Notice that the indent settings resets with initial value in the next page starts up.
 *
 * //? ===================================================================
 * //? A Text Alingment
 * //? ===================================================================
 * You can use a html tag such as <CENTER>, <LEFT>, <RIGHT> in the message window.
 * For instance, You can use as follows.
 *
 * <CENTER>The god appeared in the from of a fairy</CENTER>
 * <RIGHT>The robbers hid in the bushes and fell on me from four sides.</RIGHT>
 *
 * //? ===================================================================
 * //? Setting the standing CG.
 * //? ===================================================================
 * This plugin allows you to show up the large face image on the message window.
 *
 * To set the large face image that means the standing CG,
 * You must place Big_*.png that starts with prefix called Big_ from the img/faces folder
 * on your root project folder.
 *
 * so it will be going to create using img/faces/Big_*.png
 *
 * and then you select the face index that can set the position of it.
 *
 * The face image has an index, as follows:
 *
 *  0 1 2 3
 *  4 5 6 7
 *
 * For instance,
 * if the face index is to 0, the face image will show up on the left of message window.
 * if the face index is to 1 or more, the face image will show up on the right of message window.
 *
 * To change a standing CG after the message window starts up, you can use this text code.
 *
 * \FACE<face_name,face_index>
 *
 * You put the face name and face index between Less-than sign and Greater-than sign, as follows
 *
 * \FACE<Big_ScaredActor,0>
 *
 * But, this text code should be used for a special purpose.
 * You should preload the face image because loading image is the asynchronous.
 * Otherwise, You will not be going to show anything.
 *
 * //? ===================================================================
 * //? Changing the position of face image.
 * //? ===================================================================
 * To change the face image to the right side of message window, as follows.
 *
 * You can use the text code called \FD[2] or
 * use the plugin command called 'Message facePos 2'
 *
 * To show up the face image again to the left side on the message window,
 * You can use the text code called \FD[0] or use the plugin command called 'Message facePos 0'
 *
 * //? ===================================================================
 * //? Dealing with colors
 * //? ===================================================================
 * You can various color code such as web hex code or built-in color.
 * it can use them everywhere that can use text codes.
 *
 * \COLOR[c_red]
 * \COLOR[c_silver]
 * \COLOR[c_normal]
 * \COLOR[#ffffff]
 * \COLOR[aqua]
 * \COLOR[rgb(255, 0, 0)]
 *
 * \OUTLINE_COLOR[color_name]
 *
 * To change the background color of your text area, do as follows.
 * \HC[color_name]
 *
 * To use web colors, you must pass hex format like as #RRGGBB.
 * For example, the lime color is to \COLOR[#00FF00] or \COLOR[lime]
 *
 * //! ===================================================================
 * //! Plugin Commands
 * //! ===================================================================
 *
 * Changes the text speed. The n is the delay frame of each character:
 *
 *  Message textSpeed [n]
 *
 *  Message fontSize [n]
 *
 * Changes the offset position of the message window. the n is the number value:
 *
 *  Message offsetX [n]
 *  Message offsetY [n]
 *
 *  Message minFontSize [n]
 *  Message maxFontSize [n]
 *
 * Changes the number of lines in which it appears on the message window.
 * Notice that the number of lines must restore as default value after changing lines:
 *
 *  Message line [n]
 *
 *  Message textStartX [n]
 *
 * Changes the offset or the padding of the name window in which it appears above the message window.
 *  Message name x [n]
 *  Message name y [n]
 *  Message name padding [n]
 *
 * Changes the windowskin in which it appears on the name window.
 * Notice that you need to preload the window skin before starting the name window.
 * if not, it can fail to correctly get the text color table inside the window skin.
 *  Message name windowskin [...]
 *
 * Changes the offset of the large face image in which it appears on the screen.
 *  Message faceOX [n]
 *  Message faceOY [n]
 *
 * Changes the large face image's z-index in which it appears on the message window.
 * if the z-index is to 0, the face image will show up in front of the message window.
 * if it is to -1, the face image will show up behind the background image of the message window.
 *
 *  Message faceZ -1
 *  Message faceZ [n]
 *
 * Changes the position of the normal face image in which it appears on the message window.
 * By default, the face image will be located at the left side of the message window.
 * if you use this plugin command, you can change the position of the face image.
 * if the value is to 2, it will be located at the right side of the message window.
 * if the value is t0 0, it will be located at the left side of the message window.
 *
 *  Message facePos [n]
 *
 * Changes the size of the tab, which adds a space when you are used the text code called '\TAB!'
 *  Message setTabSize [n]
 *
 *  Message backgroundOpacity [n]
 *  Message contentsOpacity [n]
 *
 * Changes the windowskin in which it appears on the message window.
 * Notice that you need to preload the window skin before starting the message window.
 * if not, it can fail to correctly get the text color table inside the window skin.
 *
 *  Message windowskin [...]
 *
 * Changes the word wrap settings.
 * if true, it will be going to remove a custom line break in all of lines and it fills the texts finely.
 *
 *  Message minifier true
 *  Message minifier false
 *
 */
/*~struct~TextCode:
 *
 * @param Korean
 * @type string[]
 * @desc Can specify the desired text code as Korean.
 * (This will be used when the system language is in Korean)
 * @default ["색","속도","테두리색","테두리크기","들여쓰기","굵게!","이탤릭!","이름","그레디언트","파티원","주인공","변수","아이콘","확대!","축소!","골드","말풍선","정렬자","숫자","크기","탭!","캐리지리턴!","효과음","그림표시","그림제거","아이템","무기구","방어구","직업","적군","상태","스킬","얼굴","아군","적그룹","[.]","[|]","[!]","[<]","[>]","[\\^]","AS굵게!","AE굵게!","AS이탤릭!","AE이탤릭!","LEFT","CENTER","RIGHT","B","B","I","I","AEND","배경색","FD"]
 *
 * @param Chinese
 * @type string[]
 * @desc Can specify the desired text code as Chinese
 * (This will be used when the system language is in Chinese)
 * @default ["色","速度","轮廓颜色","轮廓宽度","缩进","加粗!","倾斜!","名字","渐变颜色","队伍成员","角色","变量","图标","增大!","减少!","金币","对话框","对齐","数","大小","TAB!","CR!","音效播放","显示图像","隐藏图像","道具","武器","装甲","职业","敌人","状态","技能","脸","我军","敌人组","[.]","[|]","[!]","[<]","[>]","[\\^]","AS加粗!","AE加粗!","AS倾斜!","AE倾斜!","左","中間","右","B","B","I","I","AEND", "HC", "FD"]
 *
 * @param English
 * @type string[]
 * @desc Can specify the desired text code as English
 * (This will be used when the system language is to English)
 * @default ["COLOR","TEXT_SPEED","OUTLINE_COLOR","OUTLINE_WIDTH","INDENT","BOLD!","ITALIC!","NAME","GRADIENT","PARTY_MEMBER","PLAYER","VAR","ICON","INCREASE!","DECREASE!","GOLD","BALLOON","ALIGN","NUM","TEXT_SIZE","TAB!","CR!","PLAY_SE","SHOW_PICTURE","HIDE_PICTURE","ITEM","WEAPON","ARMOR","CLASSES","ENEMY","STATE","SKILL","FACE","FRIENDLY_TROOPS","ENEMY_TROOPS","[.]","[|]","[!]","[<]","[>]","[\\^]","ASBOLD!","AEBOLD!","ASITALIC!","AEITALIC!","LEFT","CENTER","RIGHT","B","B","I","I","AEND", "HC", "FD"]
 *
 * @param Japanese
 * @type string[]
 * @desc To work this, Note that you can set the system lanuage is to Japanese.
 * @default ["色","テキストスピード","輪郭の色","輪郭のサイズ","インデント","太字!","斜体!","名前","グラデーション","パーティーメンバー","アクタ","変数","アイコン","INCREASE!","DECREASE!","通貨単位表示","フキダシ","整列","数字","テキストのサイズ","TAB!","CR!","効果音","ピクチャの表示","ピクチャの消去","アイテム","武器","防具","職業","敵キャラ","ステート","スキル","顔","FRIENDLY_TROOPS","ENEMY_TROOPS","[.]","[|]","[!]","[<]","[>]","[\\^]","AS太字!","AE太字!","AS斜体!","AE斜体!","LEFT","CENTER","RIGHT","B","B","I","I","AEND", "HC", "FD"]
 *
 */
/*~struct~TextColor:
 *
 * @param Color Name
 * @desc Specify desired color name
 * @default
 *
 * @param Red
 * @type number
 * @desc 0 ~ 255
 * @min 0
 * @max 255
 * @default 0
 *
 * @param Green
 * @type number
 * @desc 0 ~ 255
 * @min 0
 * @max 255
 * @default 0
 *
 * @param Blue
 * @type number
 * @desc 0 ~ 255
 * @min 0
 * @max 255
 * @default 0
 *
 * @param Alpha
 * @type number
 * @desc 0.0 ~ 1.0
 * @min 0
 * @max 1
 * @decimals 1
 * @default 1.0
 *
 */
/*~struct~SystemFont:
 *
 * @param settings
 * @text Settings
 * @type struct<SystemFontDescriptor>[]
 * @desc Set the font for each language.
 * @default ["{\"languageCode\":\"ko\",\"fontName\":\"나눔고딕, Dotum, AppleGothic, sans-serif\"}","{\"languageCode\":\"zh\",\"fontName\":\"SimHei, Heiti TC, sans-serif\"}"]
 *
 */
/*~struct~SystemFontDescriptor:
 *
 * @param languageCode
 * @text Language Code
 * @desc Please enter the language code.
 * @default en
 *
 * @param fontName
 * @text Font Name
 * @desc Specify multiple fonts. (Separated by commas)
 * @default GameFont
 *
 */
/*:ko
 * @target MZ
 * @plugindesc <RS_MessageSystem>
 * @author biud436
 * @url https://biud436.tistory.com
 *
 * @param 글꼴 크기
 * @type number
 * @desc 글꼴의 크기를 정수로 지정하세요
 * 기본 값 : 26
 * @default 26
 *
 * @param 라인 갯수
 * @type number
 * @desc 라인 갯수
 * @default 4
 * @min 1
 * 
 * @param 그레디언트 시작 색상
 * @desc 그레디언트 시작 색상
 * @default #FFFFFF
 *
 * @param 그레디언트 중간 색상
 * @desc 그레디언트 중간 색상
 * @default #F29661
 *
 * @param 그레디언트 끝 색상
 * @desc 그레디언트 끝 색상
 * @default #CC3D3D
 *
 * @param 기본 텍스트 출력 속도
 * @type number
 * @desc 기본 값 : 0 프레임
 * @default 0
 *
 * @param 폰트 최소 크기
 * @type number
 * @desc \}로 텍스트 크기를 한 단계 줄일 때 최소 크기를 제한합니다
 * @default 24
 *
 * @param 폰트 최대 크기
 * @type number
 * @desc \{로 텍스트 크기를 한 단계 키울 때 최대 크기를 제한합니다
 * @default 96
 * 
 * @param 큰 페이스칩
 *
 * @param 텍스트 시작 X
 * @parent 큰 페이스칩
 * @type number
 * @desc 큰 페이스칩이 설정되어있을 때 텍스트 시작 좌표를 정수로 기입하세요.
 * @default 6
 *
 * @param 큰 페이스칩 OX
 * @parent 큰 페이스칩
 * @type number
 * @desc 큰 페이스칩의 오프셋 X
 * @default 0
 * @min -1280
 *
 * @param 큰 페이스칩 OY
 * @parent 큰 페이스칩
 * @type number
 * @desc 큰 페이스칩의 오프셋 Y
 * @default 0
 * @min -1280
 * 
 * @param face Opacity
 * @text 큰 페이스칩 투명도
 * @parent 큰 페이스칩
 * @type number
 * @desc 큰 페이스칩의 투명도를 조절합니다.
 * (0 - 255)
 * @default 255
 *
 * @param 대화창 뒤에 얼굴 표시
 * @type boolean
 * @parent 큰 페이스칩
 * @desc 큰 페이스칩을 메시지창의 뒷면에 표시합니다.
 * 예 - true   아니오 - false
 * @default false
 * @on 대화창 뒤에
 * @off 대화창을 가림
 * 
 * @param face Direction
 * @text 얼굴 이미지의 위치
 * @type select
 * @parent 큰 페이스칩
 * @desc 일반 얼굴 이미지의 위치를 설정합니다.
 * @default 0
 * @option 왼쪽
 * @value 0
 * @option 오른쪽
 * @value 2
 *
 * @param 탭 크기
 * @type number
 * @desc 탭 크기
 * @default 4
 *
 * @param 배경 그림의 투명도
 * @type number
 * @desc 대화창 배경의 투명도입니다
 * @default 192
 * @min 0
 * @max 255
 *
 * @param 기본 투명도
 * @type number
 * @desc 대화창의 기본적인 투명도 값입니다
 * @default 255
 * @min 0
 * @max 255
 *
 * @param 내용의 투명도
 * @type number
 * @desc 대화창 컨텐츠의 투명도 값입니다
 * @default 255
 * @min 0
 * @max 255
 *
 * @param 반투명도
 * @type number
 * @desc 대화창의 반투명도를 조절합니다.
 * @default 160
 * @min 0
 * @max 255
 *
 * @param 테두리 크기
 * @type number
 * @desc 텍스트의 테두리 크기를 정수로 지정하세요
 * @default 2
 * @min 0
 *
 * @param 테두리 색상
 * @desc 텍스트의 테두리 색상을 웹컬러 규격으로 지정하세요
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param 기본 윈도우스킨
 * @desc 기본 윈도우의 윈도우 스킨을 지정하세요
 * @require 1
 * @default Window
 * @dir img/system/
 * @type file
 *
 * @param System Font Settings
 * @text 시스템 폰트 설정
 * 
 * @param systemFont
 * @parent System Font Settings
 * @text 시스템 폰트
 * @type struct<SystemFont>
 * @desc 사용자 컴퓨터에 설치된 폰트로 구성합니다.
 * @default {"settings":"[\"{\\\"languageCode\\\":\\\"ko\\\",\\\"fontName\\\":\\\"나눔고딕, Dotum, AppleGothic, sans-serif\\\"}\",\"{\\\"languageCode\\\":\\\"zh\\\",\\\"fontName\\\":\\\"SimHei, Heiti TC, sans-serif\\\"}\"]"}
 *
 * @param 커스텀 폰트
 *
 * @param 사용자 지정 폰트 사용 여부
 * @parent 커스텀 폰트
 * @type boolean
 * @desc 사용자 지정 폰트를 사용하시겠습니까?
 * 예 - true   아니오 - false
 * @default false
 * @on 사용
 * @off 사용하지 않음
 *
 * @param 사용자 지정 폰트명
 * @parent 커스텀 폰트
 * @desc Font의 이름을 작성하세요
 * @default NanumBrush
 *
 * @param 사용자 지정 폰트 경로
 * @parent 커스텀 폰트
 * @desc 사용자 지정 Font의 경로를 지정하세요
 * @default fonts/NanumBrush.ttf
 *
 * @param 선택지 표시
 *
 * @param 선택지 스타일
 * @parent 선택지 표시
 * @type select
 * @desc 선택지 창의 스타일을 설정할 수 있습니다
 * (숫자 입력은 XP 스타일로 나오지 않습니다.)
 * @default default
 * @option RMXP 스타일
 * @value RMXP
 * @option 기본 스타일 (MV, VXA)
 * @value default
 * 
 * @param Default Choice Position
 * @parent 선택지 표시
 * @type select
 * @desc 선택지의 위치를 설정할 수 있습니다.
 * @default right
 * @option 우측 (기본)
 * @value right
 * @option 중앙
 * @value middle
 * @option 왼쪽
 * @value left
 *
 * @param 이름 윈도우
 *
 * @param 이름 윈도우스킨
 * @parent 이름 윈도우
 * @desc 이름 윈도우의 윈도우 스킨을 지정하세요
 * @require 1
 * @default Window
 * @dir img/system/
 * @type file
 *
 * @param 이름 윈도우 X
 * @parent 이름 윈도우
 * @type number
 * @desc 대화창의 좌표를 기준으로 오프셋 됩니다
 * @default 0
 *
 * @param 이름 윈도우 Y
 * @parent 이름 윈도우
 * @type number
 * @desc 대화창의 좌표를 기준으로 오프셋 됩니다
 * @default 0
 *
 * @param 이름 윈도우 안쪽 여백
 * @parent 이름 윈도우
 * @type number
 * @desc 이름 윈도우 안쪽 여백
 * @default 10
 *
 * @param 이름 윈도우 위치
 * @parent 이름 윈도우
 * @type select
 * @desc 이름 윈도우 위치를 지정합니다.
 * @default left
 * @option 왼쪽-위 (기본)
 * @value left
 * @option 오른쪽-위
 * @value right
 *
 * @param 텍스트 색상
 * @type struct<TextColor>[]
 * @desc 사용자 정의 텍스트 색상을 추가합니다.
 * @default ["{\"Color Name\":\"연한보라\",\"Red\":\"200\",\"Green\":\"191\",\"Blue\":\"231\",\"Alpha\":\"1.0\"}"]
 *
 * @param 텍스트 코드
 * @type struct<TextCode>
 * @desc 텍스트 코드 변경
 * @default {"Korean":"[\"색\",\"속도\",\"테두리색\",\"테두리크기\",\"들여쓰기\",\"굵게!\",\"이탤릭!\",\"이름\",\"그레디언트\",\"파티원\",\"주인공\",\"변수\",\"아이콘\",\"확대!\",\"축소!\",\"골드\",\"말풍선\",\"정렬자\",\"숫자\",\"크기\",\"탭!\",\"캐리지리턴!\",\"효과음\",\"그림표시\",\"그림제거\",\"아이템\",\"무기구\",\"방어구\",\"직업\",\"적군\",\"상태\",\"스킬\",\"얼굴\",\"아군\",\"적그룹\",\"[.]\",\"[|]\",\"[!]\",\"[<]\",\"[>]\",\"[\\\\^]\",\"AS굵게!\",\"AE굵게!\",\"AS이탤릭!\",\"AE이탤릭!\",\"LEFT\",\"CENTER\",\"RIGHT\",\"B\",\"B\",\"I\",\"I\",\"AEND\",\"배경색\",\"FD\"]","Chinese":"[\"色\",\"速度\",\"轮廓颜色\",\"轮廓宽度\",\"缩进\",\"加粗!\",\"倾斜!\",\"名字\",\"渐变颜色\",\"队伍成员\",\"角色\",\"变量\",\"图标\",\"增大!\",\"减少!\",\"金币\",\"对话框\",\"对齐\",\"数\",\"大小\",\"TAB!\",\"CR!\",\"音效播放\",\"显示图像\",\"隐藏图像\",\"道具\",\"武器\",\"装甲\",\"职业\",\"敌人\",\"状态\",\"技能\",\"脸\",\"我军\",\"敌人组\",\"[.]\",\"[|]\",\"[!]\",\"[<]\",\"[>]\",\"[\\\\^]\",\"AS加粗!\",\"AE加粗!\",\"AS倾斜!\",\"AE倾斜!\",\"左\",\"中間\",\"右\",\"B\",\"B\",\"I\",\"I\",\"AEND\",\"HC\",\"FD\"]","English":"[\"COLOR\",\"TEXT_SPEED\",\"OUTLINE_COLOR\",\"OUTLINE_WIDTH\",\"INDENT\",\"BOLD!\",\"ITALIC!\",\"NAME\",\"GRADIENT\",\"PARTY_MEMBER\",\"PLAYER\",\"VAR\",\"ICON\",\"INCREASE!\",\"DECREASE!\",\"GOLD\",\"BALLOON\",\"ALIGN\",\"NUM\",\"TEXT_SIZE\",\"TAB!\",\"CR!\",\"PLAY_SE\",\"SHOW_PICTURE\",\"HIDE_PICTURE\",\"ITEM\",\"WEAPON\",\"ARMOR\",\"CLASSES\",\"ENEMY\",\"STATE\",\"SKILL\",\"FACE\",\"FRIENDLY_TROOPS\",\"ENEMY_TROOPS\",\"[.]\",\"[|]\",\"[!]\",\"[<]\",\"[>]\",\"[\\\\^]\",\"ASBOLD!\",\"AEBOLD!\",\"ASITALIC!\",\"AEITALIC!\",\"LEFT\",\"CENTER\",\"RIGHT\",\"B\",\"B\",\"I\",\"I\",\"AEND\",\"HC\",\"FD\"]","Japanese":"[\"色\",\"テキストスピード\",\"輪郭の色\",\"輪郭のサイズ\",\"インデント\",\"太字!\",\"斜体!\",\"名前\",\"グラデーション\",\"パーティーメンバー\",\"アクタ\",\"変数\",\"アイコン\",\"INCREASE!\",\"DECREASE!\",\"通貨単位表示\",\"フキダシ\",\"整列\",\"数字\",\"テキストのサイズ\",\"TAB!\",\"CR!\",\"効果音\",\"ピクチャの表示\",\"ピクチャの消去\",\"アイテム\",\"武器\",\"防具\",\"職業\",\"敵キャラ\",\"ステート\",\"スキル\",\"顔\",\"FRIENDLY_TROOPS\",\"ENEMY_TROOPS\",\"[.]\",\"[|]\",\"[!]\",\"[<]\",\"[>]\",\"[\\\\^]\",\"AS太字!\",\"AE太字!\",\"AS斜体!\",\"AE斜体!\",\"LEFT\",\"CENTER\",\"RIGHT\",\"B\",\"B\",\"I\",\"I\",\"AEND\",\"HC\",\"FD\"]"}
 *
 * @param 효과음 재생
 *
 * @param 텍스트 효과음 재생 여부
 * @parent 효과음 재생
 * @type boolean
 * @default true
 * @on 재생합니다.
 * @off 재생하지 않습니다.
 *
 * @param 텍스트 효과음
 * @parent 효과음 재생
 * @type file
 * @dir audio/se/
 * @desc 텍스트 처리 시 특정 사운드를 같이 재생합니다.
 * @default Cursor1
 * @require 1
 * 
 * @param 텍스트 효과음 실행 조건
 * @parent 효과음 재생
 * @type note
 * @desc 텍스트 효과음이 재생될 확률을 만듭니다.
 * @default "Math.randomInt(100) < 45"
 *
 * @param 텍스트 사운드 풀 크기
 * @parent 효과음 재생
 * @type number
 * @desc 사운드 풀의 크기를 지정합니다.
 * @default 2
 * @min 1
 * 
 * @param 텍스트 사운드 재생 간격
 * @parent 효과음 재생
 * @type number
 * @desc 사운드 재생 간격를 설정합니다.
 * @default 2
 * @min 1
 * 
 * @param 텍스트 효과음 볼륨
 * @parent 효과음 재생
 * @type note
 * @desc 텍스트 효과음의 볼륨을 정합니다. (0.0 ~ 1.0 사이)
 * @default "0.4"
 *
 * @param 언어 코드
 * @type select
 * @desc 사용할 텍스트 코드의 언어 코드를 입력하세요
 * @default ko
 * @option English
 * @value en
 * @option Korean
 * @value ko
 * @option Japanese
 * @value ja
 * @option Chinese
 * @value zh
 * 
 * @param preload windowskin
 * @text 윈도우스킨 프리로드
 * @require 1
 * @dir img/system/
 * @type file[]
 * @desc 윈도우 스킨을 프리 로드합니다.
 * @default
 * 
 * @param Window Width
 * @text 윈도우 폭
 * @type string
 * @desc 윈도우 폭 지정
 * (Graphics.width는 화면 가로 길이)
 * @default Graphics.width
 * 
 * @param Gradient Style
 * @text 그레디언트 스타일
 * @type select
 * @desc 그레디언트 스타일을 지정합니다.
 * @default linear-horizontal
 * @option 선형 (가로)
 * @value linear-horizontal
 * @option 축형 (가로)
 * @value axial-horizontal
 * @option 선형 (세로)
 * @value linear-vertical
 * @option 축형 (세로)
 * @value axial-vertical
 * @option 방사선
 * @value radial
 * 
 * @param Paragraph Minifier
 * @text 자동 개행 여부
 * @type boolean
 * @desc 자동 개행 여부를 설정하십시오
 * (기본 값은 false)
 * @default false
 * @on 자동 개행 설정
 * @off 미설정
 *
 * @help
 * =============================================================================
 * 플러그인 커맨드
 * =============================================================================
 * 이 플러그인은 아래와 같은 플러그인 커맨드를 제공합니다.
 *
 * - 텍스트의 속도는 0에서 가장 빠르고, 프레임 단위로 지정할 수 있습니다.
 * 메시지 텍스트속도 number
 *
 * 메시지 폰트크기 number
 * 메시지 폰트최소크기 number
 * 메시지 폰트최대크기 number
 *
 * - 그레디언트 텍스트로 색상을 변경할 수 있습니다.
 * 메시지 그레디언트 color1 color2 color3
 *
 * - 라인 수를 바꿀 수 있는 플러그인 명령입니다.
 * 메시지 라인 number
 * 메시지 시작위치 number
 *
 * 메시지 이름윈도우 x number
 * 메시지 이름윈도우 y number
 * 메시지 이름윈도우 padding number
 * 메시지 이름윈도우 윈도우스킨 skin_name
 *
 * 메시지 큰페이스칩X number
 * 메시지 큰페이스칩Y number
 *
 * number가 -1이면 메시지 창이 페이스칩을 가리고, 다른 값이면 가리지 않습니다:
 * 메시지 큰페이스칩Z number
 *
 * 배경투명도의 경우, 주의 사항이 있습니다.
 * 255로 설정하면 완전히 불투명해야 하지만 기본 이미지의 알파 채널 자체가 반투명하여
 * 완전 불투명하게 표시되지 않습니다. 완전 불투명하게 표시하려면 이미지의 알파 채널도
 * 불투명해야 합니다.
 * 
 * 메시지 탭크기 number
 * 메시지 배경투명도 number
 * 메시지 컨텐츠투명도 number
 * 
 * 윈도우 스킨 노트 태그의 경우, 프리로드 기능을 사용해야만 정상적으로 폰트 색상이 설정됩니다.
 *
 * 메시지 윈도우스킨 skin_name
 * 
 * 텍스트가 대화창보다 더 길게 넘어가면 자동으로 줄바꿈 처리를 합니다.
 * 또한 불필요한 개행 문자를 없애고 문단을 최대한 최소화하여 메시지 창에서 보이게 만듭니다.
 * 메시지 문단최소화 true
 * 
 * 개행 문자를 그대로 두고, 자동으로 줄바꿈 처리를 하지 않습니다.
 * 메시지 문단최소화 false
 * 
 * 문단 최소화가 true(ON)인 상태에서 정렬자를 사용하면 정렬자가 제대로 동작하지 않을 수 있
 * 으니 주의 하시기 바랍니다.
 * 
 * 말풍선 모드나 일반 메시지 창의 오프셋을 조정할 수 있습니다.
 * 
 * 메시지 오프셋X number
 * 메시지 오프셋Y number
 * 
 * 얼굴 이미지의 정렬 위치를 바꾸려면 다음과 같은 플러그인 명령을 호출하세요.
 * 왼쪽 정렬은 0을, 오른쪽 정렬은 2를 인자 값으로 전달하세요.
 * 
 * 메시지 페이스칩위치 0
 * 메시지 페이스칩위치 2
 *
 * =============================================================================
 * 큰 페이스칩 설정
 * =============================================================================
 * 페이스칩을 img/faces 에 넣고 페이스칩의 이름을 Big_ 으로 시작하게 하면 됩니다.
 *
 * 단, 선택 창이 왼쪽 위에 놓으면 페이스칩이 메시지 창의 왼쪽에 표시됩니다.
 * (아닌 경우에는 오른쪽에 표시할 것입니다)
 *
 * - 페이스칩이 메시지 창에 가려지게 설정하려면 플러그인 매개변수 값을 바꾸세요.
 *
 * =============================================================================
 * 노트 태그(Note Tags)
 * =============================================================================
 * 문장의 표시가 시작되기 전에 메시지 설정을 노트 태그로 바꾸는 기능입니다.
 * ※유의사항 : 문장의 표시 바로 위에 있는 노트 커맨드 2개만 읽어옵니다.
 * 
 * 윈도우 스킨 노트 태그의 경우, 프리로드 기능을 사용해야만 정상적으로 폰트 색상이 설정됩니다.
 * 
 * <윈도우 스킨:Window>
 * <이름 윈도우 스킨:Window>
 * <라인 높이:36>
 * <폰트 크기:28>
 * <텍스트 시작 X:256>
 * <큰 페이스칩 OX:0>
 * <큰 페이스칩 OY:0>
 * <대화창 뒤에 얼굴 표시:true>
 * <대화창 투명도:255>
 * <텍스트 효과음 재생 여부:true>
 * <기본 텍스트 출력 속도:0>
 * 
 * =============================================================================
 * 텍스트 코드(Text Code)
 * =============================================================================
 *
 * 다양한 색상 코드를 사용할 수 있습니다. 
 * 미리 입력된 색을 사용할 수도 있고 웹 색상을 설정할 수도 있습니다. 
 * 이것은 최상위 클래스에 정의되므로 어느 창에서나 사용할 수 있습니다.
 * 다만 텍스트 코드를 처리하는 창에서만 사용해야 합니다:
 *
 *   \색[색상명]
 *   \테두리색[색상명]
 *   \배경색[색상명]
 * 
 * 사용 가능한 색상은 다음과 같습니다.
 * 
 * \색[기본색] - 이 색은 기본 윈도우 스킨 하단 색상 테이블에 위치한 0번 색과 같습니다.
 * \색[청록]
 * \색[검은색]
 * \색[파란색]
 * \색[짙은회색]
 * \색[자홍색]
 * \색[회색]
 * \색[녹색]
 * \색[밝은녹색]
 * \색[밝은회색]
 * \색[밤색]
 * \색[감청색]
 * \색[황록색]
 * \색[주황색]
 * \색[보라색]
 * \색[빨간색]
 * \색[은색]
 * \색[민트색]
 * \색[흰색]
 * \색[노란색]
 * \색[기본]
 * \색[청록색]
 * \색[검정]
 * \색[파랑]
 * \색[c_dkgray]
 * \색[자홍]
 * \색[c_gray]
 * \색[c_green]
 * \색[라임]
 * \색[c_ltgray]
 * \색[마룬]
 * \색[네이비]
 * \색[올리브]
 * \색[주황]
 * \색[보라]
 * \색[빨강]
 * \색[은]
 * \색[c_teal]
 * \색[흰]
 * \색[노랑]
 * \색[오렌지]
 * \색[c_orange]
 * \색[c_aqua]
 * \색[c_black]
 * \색[c_blue]
 * \색[c_fuchsia]
 * \색[c_lime]
 * \색[c_maroon]
 * \색[c_navy]
 * \색[c_olive]
 * \색[c_purple]
 * \색[red]
 * \색[c_red]
 * \색[c_silver]
 * \색[white]
 * \색[c_white]
 * \색[c_yellow]
 * \색[c_normal]
 * 
 * 미리 정의한 색상 말고도 다른 색상을 사용하려면 이렇게 하면 됩니다.
 * 
 * \색[#ffffff] 과 \색[white]는 흰색입니다.
 * \색[rgb(255, 0, 0)]과 \색[red] 그리고 \색[#ff0000]은 빨강색입니다.
 * \색[aqua], \색[lime] 등 브라우저에 기본 정의된 색상 테이블에서도 가져올 수 있습니다.
 * 
 * 텍스트 출력 속도를 조절하려면 이것을 쓰면 되는데, 값은 대기 프레임 단위입니다
 * 가장 빠른 속도는 0프레임입니다:
 
 *   \속도[값]
 *
 * 이름 윈도우를 띄우려면 아래 텍스트 코드를 사용하세요, 색상 변경 텍스트 코드도 사용할
 * 수 있습니다. 이름 윈도우는 폭과 높이를 알아서 맞춰줍니다. 아래와 같이 뒤에 콜론(:)을
 * 붙이는 방식으로 이름 윈도우의 위치를 바꿀 수도 있습니다.
 *
 *   \이름<이벤트명>
 *   \이름<이벤트명:right>
 *   \이름<이벤트명:left>
 *   \이름<\색[red]이벤트명>
 *   \이름<\색[주황]러닝은빛>
 *
 * 그레디언트 텍스트를 만드는 텍스트 코드입니다. 기본 색상 값은 플러그인 매개변수에서
 * 변경이 가능합니다. 세밀한 설정은 불가능합니다.
 *
 *   \그레디언트<텍스트>
 *
 * 설명 할 필요가 없는 텍스트 코드들:
 *
 *   \테두리크기[값]
 *   \들여쓰기[값]
 *   \파티원[번호]
 *   \파티원[번호]
 *   \변수[번호]
 *   \아이콘[번호]
 *
 * 지금까지 텍스트를 굵게 하는 명령과 기울이는 명령은 다음과 같았습니다.
 *
 *   \굵게!
 *   \이탤릭!
 * 
 * 하지만 너무 가독성이 좋지 않았기 때문에 태그처럼 사용할 수 있게 했습니다.
 * 
 * 예를 들면 :)
 * 
 * <B>유령의 저택</B>에 함부로 들어가선 안돼.
 * <I>정신력</I> 문제는 아니야.
 * 
 * 이렇게 간단히 쓸 수 있게 되었습니다. 
 * 하지만 왜 영어일까요?
 * 태그는 만국 공통이자 일종의 약속이므로 한글로 번역하지 않았습니다.
 * 
 * 글자의 크기를 확대하거나 축소하는 기능입니다 (\{, \}와 같습니다):
 *   \확대!
 *   \축소!
 *
 * 골드 윈도우를 표시합니다:
 *
 *   \골드
 *
 * 말풍선 메시지 창을 만들 수 있는 기능입니다. 0은 이 이벤트, -1은 플레이어입니다:
 *
 *   \말풍선[이벤트의 ID]
 *   \말풍선[0]
 *   \말풍선[-1]
 * 
 * 전투에서는 \말풍선[배틀러의 ID]의 배틀러 ID 값에 음수 값을 전달하면 적 배틀러에 말풍선을 띄우고, 
 * 양수 값을 전달할 경우, 아군에게 띄웁니다.
 * 
 * 음수 또는 양수를 전달해야 하므로 ID 값은 0이 될 수 없습니다.
 * 
 * 복잡하게 느껴진다면 \말풍선[인덱스] 대신 \아군[인덱스], \적그룹[인덱스]을 사용하세요.
 * 
 * 왼쪽, 중앙 또는 오른쪽에 텍스트를 정렬할 수 있습니다. 
 * 정렬은 각 라인이 시작될 때 한 번씩 이뤄집니다.
 * 정렬자는 스택 방식이므로 각 라인에 하나씩 사용 바랍니다.
 * 
 *   \정렬자[0]
 *   \정렬자[1]
 *   \정렬자[2]
 * 
 * 조금 어렵게 느껴진다면 태그를 사용해보세요.
 * 
 * <left>안녕하세요?</left>
 * <right>식사는 하셨나요?</right>
 * <center>지금 저녁 식사를 먹으려고 합니다. </center>
 * 
 * 태그는 대화가 시작되면 실제 텍스트 코드로 변환됩니다.
 * 예를 들어, <left>는 \정렬자[0]으로 변경됩니다.
 * 
 * HTML 태그는 만국 공통이므로 우리말로 번역하지 않았습니다.
 * 유사한 기능일 뿐 실제 HTML 태그와는 다릅니다.
 * 
 * 숫자 값에 엑셀 통화 서식 문자를 적용합니다: (예: 10,000)
 *
 *   \숫자[숫자]
 *
 * 텍스트의 크기를 변경할 수 있습니다:
 *
 *   \크기[숫자]
 *
 * 탭과 캐리지 리턴 기능입니다.
 * 캐리지리턴을 사용하면 겹침 글자를 사용할 수 있습니다.
 *
 *   \탭! : 탭의 크기는 8 입니다.
 *   \캐리지리턴! : X를 시작 위치로 되돌립니다.
 *
 * 효과음을 재생하는 기능으로 SE 파일을 재생합니다:
 *
 *   \효과음<효과음명>
 *
 * 이벤트 편집창의 기본 그림을 제어할 수 있는 텍스트 코드입니다:
 *
 *   \그림표시<그림번호, 그림이름, 원점번호, X좌표, Y좌표>
 *   \그림제거[그림번호]
 *
 * 다음 텍스트 코드가있으면 메시지 시스템에서 데이터베이스 항목명으로 대체됩니다:
 *
 *   \아이템[번호]
 *   \무기구[번호]
 *   \방어구[번호]
 *   \직업[번호]
 *   \적군[번호]
 *   \상태[번호]
 *   \스킬[번호]
 *
 * 얼굴 이미지를 메시지 표시 도중에 바꾸려면 다음 텍스트 코드를 사용하시기 바랍니다.
 * '얼굴_이미지_이름'은 페이스칩의 이름을 말하고, 인덱스는 페이스칩 선택 창에서
 * 각 얼굴에 붙는 번호입니다. 0부터 시작하고 가장 왼쪽 위에 있는 얼굴이 0번입니다:
 *
 *   \얼굴<얼굴_이미지_이름, 얼굴_이미지_인덱스>
 *
 * 전투 중 플레이어 또는 아군 파티원에게 말풍선을 띄우고 싶다면 다음 텍스트 코드를 사용
 * 하세요.
 *
 *   \아군[아군_인덱스]
 *
 * 전투 중 적 파티 일원 중 하나가 말풍선으로 대화를 나눠야 한다면, 다음 텍스트 코드를 사용
 * 하세요.
 *
 *   \적그룹[적군_인덱스]
 *
 * 대화 중에 배틀러가 전투 불능 상태가 되면 일반 대화창으로 표시됩니다.
 * 
 * 얼굴 이미지의 위치를 오른쪽으로 변경하려면 다음 텍스트 코드를 사용하세요.
 * 
 *   \FD[2]
 * 
 * 얼굴 이미지의 위치를 왼쪽으로 변경하려면 다음 텍스트 코드를 사용하세요.
 * 
 *   \FD[0]
 */
/*~struct~TextCode:ko
 *
 * @param Korean
 * @type string[]
 * @desc 시스템 언어가 한국어(우리나라 말)일 경우에만 동작합니다.
 * @default ["색","속도","테두리색","테두리크기","들여쓰기","굵게!","이탤릭!","이름","그레디언트","파티원","주인공","변수","아이콘","확대!","축소!","골드","말풍선","정렬자","숫자","크기","탭!","캐리지리턴!","효과음","그림표시","그림제거","아이템","무기구","방어구","직업","적군","상태","스킬","얼굴","아군","적그룹","[.]","[|]","[!]","[<]","[>]","[\\^]","AS굵게!","AE굵게!","AS이탤릭!","AE이탤릭!","LEFT","CENTER","RIGHT","B","B","I","I","AEND","배경색","FD"]
 *
 * @param Chinese
 * @type string[]
 * @desc 시스템 언어가 중국어로 설정되어있을 때에만 동작합니다
 * @default ["色","速度","轮廓颜色","轮廓宽度","缩进","加粗!","倾斜!","名字","渐变颜色","队伍成员","角色","变量","图标","增大!","减少!","金币","对话框","对齐","数","大小","TAB!","CR!","音效播放","显示图像","隐藏图像","道具","武器","装甲","职业","敌人","状态","技能","脸","我军","敌人组","[.]","[|]","[!]","[<]","[>]","[\\^]","AS加粗!","AE加粗!","AS倾斜!","AE倾斜!","左","中間","右","B","B","I","I","AEND","HC","FD"]
 *
 * @param English
 * @type string[]
 * @desc 시스템 언어가 '영어'로 설정되어있을 때에만 동작합니다.
 * @default ["COLOR","TEXT_SPEED","OUTLINE_COLOR","OUTLINE_WIDTH","INDENT","BOLD!","ITALIC!","NAME","GRADIENT","PARTY_MEMBER","PLAYER","VAR","ICON","INCREASE!","DECREASE!","GOLD","BALLOON","ALIGN","NUM","TEXT_SIZE","TAB!","CR!","PLAY_SE","SHOW_PICTURE","HIDE_PICTURE","ITEM","WEAPON","ARMOR","CLASSES","ENEMY","STATE","SKILL","FACE","FRIENDLY_TROOPS","ENEMY_TROOPS","[.]","[|]","[!]","[<]","[>]","[\\^]","ASBOLD!","AEBOLD!","ASITALIC!","AEITALIC!","LEFT","CENTER","RIGHT","B","B","I","I","AEND","HC","FD"]
 *
 * @param Japanese
 * @type string[]
 * @desc 시스템 언어가 '일본어'일 때에만 동작합니다.
 * @default ["色","テキストスピード","輪郭の色","輪郭のサイズ","インデント","太字!","斜体!","名前","グラデーション","パーティーメンバー","アクタ","変数","アイコン","INCREASE!","DECREASE!","通貨単位表示","フキダシ","整列","数字","テキストのサイズ","TAB!","CR!","効果音","ピクチャの表示","ピクチャの消去","アイテム","武器","防具","職業","敵キャラ","ステート","スキル","顔","FRIENDLY_TROOPS","ENEMY_TROOPS","[.]","[|]","[!]","[<]","[>]","[\\^]","AS太字!","AE太字!","AS斜体!","AE斜体!","LEFT","CENTER","RIGHT","B","B","I","I","AEND","HC","FD"]
 *
 */
/*~struct~TextColor:ko
 *
 * @param Color Name
 * @text 색상명
 * @desc 텍스트 코드에서 호출하게 될 색상명을 기입하세요
 * @default
 *
 * @param Red
 * @type number
 * @text 빨강
 * @desc 0 ~ 255
 * @min 0
 * @max 255
 * @default 0
 *
 * @param Green
 * @type number
 * @text 녹색
 * @desc 0 ~ 255
 * @min 0
 * @max 255
 * @default 0
 *
 * @param Blue
 * @type number
 * @text 파랑
 * @desc 0 ~ 255
 * @min 0
 * @max 255
 * @default 0
 *
 * @param Alpha
 * @type number
 * @text 투명도
 * @desc 0.0 ~ 1.0 사이의 실수값
 * @min 0
 * @max 1
 * @decimals 1
 * @default 1.0
 *
 */
/*~struct~SystemFont:ko
 *
 * @param settings
 * @text 시스템 폰트 설정
 * @type struct<SystemFontDescriptor>[]
 * @desc 언어 별 폰트를 설정합니다.
 * @default ["{\"languageCode\":\"ko\",\"fontName\":\"나눔고딕, Dotum, AppleGothic, sans-serif\"}","{\"languageCode\":\"zh\",\"fontName\":\"SimHei, Heiti TC, sans-serif\"}"]
 *
 */
/*~struct~SystemFontDescriptor:ko
 *
 * @param languageCode
 * @text 언어 코드
 * @desc 언어 코드를 기입해주세요. 한국어는 ko입니다.
 * @default ko
 *
 * @param fontName
 * @text 폰트명
 * @desc 여러 개의 폰트를 쓸 수 있습니다. (콤마로 구분합니다)
 * @default 나눔고딕, Dotum, AppleGothic, sans-serif
 *
 */
