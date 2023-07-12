// sockjs를 이용한 WebSocket 구현

// 로그인이 되어 있을 경우에만
// /alarmSock 이라는 요청 주소로 통신할 수 있는  WebSocket 객체 생성
let alarmSock;

if(loginUser != null){
	alarmSock = new SockJS("/alarm");
}

/* 회원 유형 (가이드 G / 여행객 T) */


// 관심상품 등록 알람
function sendWish(productNo, productName){

	// 매개 변수 JS객체에 저장
	let obj = {};

	obj.senderNo = loginUser.userNo;
	// obj.userName = userName;
	obj.productNo = productNo;
	obj.productName = productName;
	// 관심상품 등록 개수
	obj.notificationType = "L";

	console.log(obj);

	alarmSock.send(JSON.stringify(obj));
}


// 리뷰 등록 알람
function sendReview(productNo, productName){

	let obj = {};

	obj.senderNo = loginUser.userNo; 
	// obj.userName = userName; 
	obj.productNo = productNo; 
	obj.productName = productName; 
	obj.notificationType = "R";

	console.log(obj);

	alarmSock.send(JSON.stringify(obj));
}


// 예약 완료 알람
function sendReservation(productNo, productName){

	let obj = {};

	obj.senderNo = loginUser.userNo;
	// obj.userName = userName; 
	obj.productNo = productNo; 
	obj.productName = productName; 
	obj.notificationType = "O";

	console.log(obj);

	alarmSock.send(JSON.stringify(obj));
}




/* alarmSock.onmessage = function(e) {

	// e : 이벤트 객체, e.data : 전달 받은 메시지(JSON)

	const obj = JSON.parse(e.data);
	console.log(`보낸 사람 : ${obj.senderNo} / ${obj.notificationContent}`);

	// 알림 내용을 표시할 요소 선택
	const alarmModalContent = document.querySelector('.alarm-modal-content');

	// 알림 내용을 요소에 설정
	alarmModalContent.textContent = obj.notificationContent;
}
 */

// 웹소켓 새로 온 알림
window.addEventListener('DOMContentLoaded', function() {
    // 알림 내용을 표시할 요소 선택
    const alarmModalContent = document.querySelector('.alarm-modal-content');

    alarmSock.onmessage = function(e) {
        alarmModalContent.innerHTML = "";

        const obj = JSON.parse(e.data);
        console.log(`보낸 사람: ${obj.senderNo} / ${obj.notificationContent}`);

        // 이미지 경로를 저장할 변수
        let imageSrc = '';

        // 이미지 경로 설정
        if (obj.notificationType === 'L') {
            imageSrc = '/images/icons/alarm_wish.png';
        } else {
            imageSrc = '/images/icons/alarm_guide.png';
        }

        // 이미지 요소와 알림 내용을 포함하는 HTML 생성
        const contentWithImage = `<div><img src="${imageSrc}"><span>${obj.notificationContent}</span></div>`;

        // 알림 내용을 요소에 설정
        alarmModalContent.innerHTML = contentWithImage;
    };

	alarmFn(); // 함수 확인
});


// 누적 알림 10개 조회
function alarmFn(){

	alarmModalBox = document.querySelector(".alarm-modal");
	// alarmModalBox.innerHTML = "";

	fetch("/alarm/send")
	.then(resp => resp.json())
	.then(alarmList => {

		if(alarmList.length > 0){
			for(let alarm of alarmList){

				// 각 알림에 대한 처리 수행
				const notificationContent = alarm.notificationContent;
				const senderNo = alarm.senderNo;
				const notificationType = alarm.notificationType;
			
				// console.log('누적 알림 : ' + notificationContent);
				
				const alarmContent = document.createElement("div");

				/* const alarmClose = document.createElement("div");
				alarmClose.classList.add("alarm-modal-close");
				alarmContent.appendChild(alarmClose); */

				const image = document.createElement("img");
				let imageSrc = '';
				if (notificationType === 'L') {
					imageSrc = "/images/icons/alarm_wish.png";
				} else {
					imageSrc = "/images/icons/alarm_guide.png";
				}
				image.src = imageSrc;
				image.alt = "알림 이미지";
				alarmContent.appendChild(image);
			
				const text = document.createElement("span");
				text.textContent = notificationContent;
				alarmContent.appendChild(text);
			
				alarmModalBox.appendChild(alarmContent);
			}
		}

		else{
			alarmModalBox.innerHTML = "<div><p> 받은 알림이 없습니다.</p></div>"
		}
	})
	.catch(err => {
		console.log(err);
	})
}


