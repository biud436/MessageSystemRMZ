:exclamation: **This is still under development**

![WebPackWorkflow](https://github.com/biud436/MessageSystemRMZ/actions/workflows/webpack.yml/badge.svg)

# Introduction

This plugin package includes helpful features to get you on your way to create your game in RPG Maker MZ.

![image](https://user-images.githubusercontent.com/13586185/152173839-79931cee-7fff-442d-a2e1-069cce1932ce.png)

# How to build

`yarn` is a new package manager. To build this plugin directly, You should install `yarn` or `npm` first after installing `Node.js`. I recommand a package manager called 'yarn' because it is more stable and easy to use.

## Mac

In case of using on `MacOS`, you can use a below command to install yarn.

```sh
brew install node
brew install yarn
```

To build this plugin, you need to run the following command:

```
yarn install
yarn build
cd ./dist
open .
```

https://user-images.githubusercontent.com/13586185/151744058-28915439-666c-4126-8125-506de6566782.mov

# Check List

- [x] \색[색상명] : Change Color
- [x] \테두리색[색상명] : Change Outline Color
- [x] \배경색[색상명] : Change Background Color
- [x] \속도[값]
- [x] \그레디언트<텍스트>
- [x] 이름 윈도우를 창 오른쪽에 표시
- [x] 이름 윈도우 텍스트 색상 변경
- [ ] \테두리크기[값]
- [ ] \들여쓰기[값]
- [ ] \파티원[번호]
- [ ] \파티원[번호]
- [x] \변수[번호]
- [x] \아이콘[번호]
- [ ] \굵게!
- [ ] \이탤릭!
- [x] `<B></B>`
- [x] `<I></I>`
- [ ] \확대!
- [ ] \축소!
- [ ] \골드
- [x] \말풍선[이벤트의 ID]
- [ ] \말풍선[0]
- [ ] \말풍선[-1]
- [ ] \아군[인덱스]
- [ ] \적그룹[인덱스]
- [ ] \정렬자[0]
- [x] \정렬자[1]
- [ ] \정렬자[2]
- [ ] `<left>안녕하세요?</left>`
- [ ] `<right>식사는 하셨나요?</right>`
- [ ] ` <center>지금 저녁 식사를 먹으려고 합니다. </center>`
- [ ] \숫자[숫자]
- [ ] \크기[숫자]
- [ ] \탭!
- [ ] \캐리지리턴!
- [ ] \효과음<효과음명>
- [ ] \그림표시<그림번호, 그림이름, 원점번호, X좌표, Y좌표>
- [ ] \그림제거[그림번호]
- [ ] \아이템[번호]
- [ ] \무기구[번호]
- [ ] \방어구[번호]
- [ ] \직업[번호]
- [ ] \적군[번호]
- [ ] \상태[번호]
- [ ] \스킬[번호]
- [ ] \얼굴<얼굴*이미지*이름, 얼굴*이미지*인덱스>
- [ ] \아군[아군_인덱스]
- [ ] \적그룹[적군_인덱스]
- [ ] \FD[2]
- [ ] \FD[0]
- [ ] \C[색상명]
- [ ] \I[아이콘_인덱스]
- [ ] \PX[숫자]
- [ ] \PY[숫자]
- [ ] \FS[숫자]
- [ ] `\{` : Increase Font Size
- [ ] `\}` : Decrease Font Size
- [ ] `\$` : Draw Gold Window
- [ ] `\.` : Wait 1/4 second
- [ ] `\|` : Wait 1 second
- [ ] `\!` : Wait for button input
- [ ] `\>` : Show Text Instantly
- [ ] `\<` : Show Text Letter by Letter
- [ ] `\^` : Do not wait for input after this

# Credit and Thanks

Biud436.

# Terms of Use

Free for commercial and non-commercial use.

# License

The MIT License (MIT)
