# Kakaotalk rasberry pi control

## 1. 개요
Facebook의 CEO인 MARK ZUCKERBERG가 개인 프로젝트로
Building Jarvis라는 개인비서를 만들었는데
Facebook Messenger를 이용해서 홈 기기를 제어하는 것을 보고
카카오톡으로도 할 수 있지 않을까하는 생각에 제작하게 되었습니다.

## 2. 구조
구조는아래와 같은 방식으로 이루어져 있으며,
테스트는 Kakaotalk 메시지를 보내면 라즈베리파이에 불이 들어오도록 하였습니다.

Kakaotalk - Heroku - Firebase - Rasberry Pi

## 3. 관련 정보
* 홍콩과기대 김성훈 교수님께서 진행한 프로젝트를 참고하였습니다.  
https://github.com/hunkim/line-papago-bot#heroku
* 하이제니스님의  블로그도 참고하였습니다.  
https://github.com/chandong83/kakao_autoreply_wirh_naver_papago

## 4. 실행 방법
* Firbase에 가입하여 프로젝트 생성 후 Cloud Messaging 탭의 Server Key를 확인한다.  
* 라즈베리파이에 Android Things를 설치한다.  
* 라즈베리파이에 Firebase Cloud Messaging QuickStart app을 설치한다.  
- https://github.com/firebase/quickstart-android/tree/master/messaging  
  여기의 MainActivity에서 나오는 token 값을 app.js의 firebase app token 에 입력한다.  
  MyFirebaseMessagingService.java의 onMessageReceived에서 라즈베리파이에 불이 들어오도록 설정한다.  
* heroku/app.js 파일에서 firebase server key, naver id, secret, firebase app token을 입력한다.  
heroku(https://www.heroku.com/)에서 설명을 따라서 가입을 하고, node.js 파일을 업로드한다.  
* 카카오톡 플러스친구(https://center-pf.kakao.com/) 에서 새 플러스친구 만들기를하고  
  스마트 채팅에서 앱URL에 heroku에서 생성한 server URL을 넣는다.  
