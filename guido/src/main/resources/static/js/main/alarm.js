// ----------------------------------------------------------------------------------------------------------------

// sockjs를 이용한 WebSocket 구현

// 로그인이 되어 있을 경우에만
// /alarmSock 이라는 요청 주소로 통신할 수 있는  WebSocket 객체 생성
let alarmSock;

if(loginUserNo != ""){
	alarmSock = new SockJS("/alarm");
}
