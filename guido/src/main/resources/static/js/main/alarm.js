// sockjs를 이용한 WebSocket 구현

// 로그인이 되어 있을 경우에만
// /alarmSock 이라는 요청 주소로 통신할 수 있는  WebSocket 객체 생성
let alarmSock;

if(loginUser != null){
	alarmSock = new SockJS("/alarm");
}
// let alarmSock = new SockJS("/alarm");

/* 
	회원 유형 
	가이드 : G
	여행객 : T
*/

// 리뷰 등록 알람
function sendReview(productNo, productName){

	// [가이드]
	// 리뷰 등록 : (상품 이름) 상품에 리뷰가 작성되었습니다.
	// -> 마이페이지 해당 상품에 리뷰로 이동

	// [여행객]
	// 리뷰 등록 : (판매자 이름)님이 댓글을 작성하였습니다.

	// 매개 변수 JS객체에 저장
	let obj = {};

	obj.senderNo = loginUserNo; // 보낸 회원 번호
	// obj.userName = userName; // 보낸 회원 이름
	obj.productNo = productNo; // 상품 번호
	obj.productName = productName; // 상품 이름
	obj.notificationType = "R";

	// console.log(obj);

	alarmSock.send(JSON.stringify(obj));
}


// 관심상품 등록 알람
function sendWish(productNo, productName){

	// [가이드]
	// 관심상품 등록 : (상품 이름) 상품이 총 #건 관심상품으로 등록되었습니다.
	// -> 해당 상품 상세 페이지로 이동

	let obj = {};

	obj.senderNo = loginUserNo;
	// obj.userName = userName;
	obj.productNo = productNo;
	obj.productName = productName;
	// 관심상품 등록 개수
	obj.notificationType = "L";

	// console.log(obj);

	alarmSock.send(JSON.stringify(obj));
}


// 예약 완료 알람
function sendReservation(productNo, productName){

	// [가이드]
	// - 예약 완료 : (상품 이름) 상품이 예약되었습니다.
	// 	-> 판매자 예약완료 페이지로 이동
	
	// [여행객]
	// - 예약 완료 : (상품 이름)의 예약이 완료되었습니다.

	// 매개 변수 JS객체에 저장
	let obj = {};

	obj.senderNo = loginUserNo; // 보낸 회원 번호
	// obj.userName = userName; // 보낸 회원 이름
	obj.productNo = productNo; // 상품 번호
	obj.productName = productName; // 상품 이름
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
window.addEventListener('DOMContentLoaded', function() {
    // 알림 내용을 표시할 요소 선택
    const alarmModalContent = document.querySelector('.alarm-modal-content');

    alarmSock.onmessage = function(e) {

		alarmModalContent.innerHTML = "";

        const obj = JSON.parse(e.data);
        console.log(`보낸 사람 : ${obj.senderNo} / ${obj.notificationContent}`);

        // 알림 내용을 요소에 설정
        //alarmModalContent.textContent = obj.notificationContent;
		const contentWithImage = `<img src="/images/icons/alarm_wish.svg" alt=""> ${obj.notificationContent}`;
        alarmModalContent.innerHTML = contentWithImage;
    };

	alarmFn(); // 함수 확인
});



function alarmFn(){

	alarmModalBox = document.querySelector(".alarm-modal");
	// alarmModalBox.innerHTML = "";

	fetch("/alarm/send")
	.then(resp => resp.json())
	.then(alarmList => {

		if(alarmList.length > 0){
			for(let alarm of alarmList){

				// // 각 알림에 대한 처리 수행
				// const notificationContent = alarm.notificationContent;
				// const senderNo = alarm.senderNo;

				// console.log('누적 알림 : ' + notificationContent);

				// // 예시: 알림 내용과 보낸 사람 정보를 표시
				// const alarmContent = document.createElement("div");
				// alarmContent.textContent = `${notificationContent}`;

				// alarmModalBox.appendChild(alarmContent);


				// 각 알림에 대한 처리 수행
				const notificationContent = alarm.notificationContent;
				const senderNo = alarm.senderNo;
			
				console.log('누적 알림 : ' + notificationContent);
			
				// 예시: 알림 내용과 보낸 사람 정보를 표시
				const alarmContent = document.createElement("div");
				const image = document.createElement("img");
				image.src = "/images/icons/alarm_wish.svg";
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