

/* 전화번호 입력 필드 읽기 전용으로 변경 */
document.getElementById("phone").setAttribute("disabled", true);
document.getElementById("phone").setAttribute("style", "padding-left: 85px;");


const plusBtn = document.getElementById("guestsPlusBtn");
const minusBtn = document.getElementById("guestsMinusBtn");
const guestsQnt = document.getElementById("guestsQnt");

/* 증가 버튼 클릭 시 */
plusBtn.addEventListener("click", ()=>{
  

    /* 최대 인원 수 제한 */
    if(Number(guestsQnt.innerText)<maxTourist)
    guestsQnt.innerText = Number(guestsQnt.innerText) + 1;
    
  }); 
  
  
  /* 감소 버튼 클릭 시 */
  minusBtn.addEventListener("click", ()=>{
    
    /* 최소 인원 수 제한 */
    if(Number(guestsQnt.innerText)>minTourist)
    guestsQnt.innerText = Number(guestsQnt.innerText) - 1;
  
  
  });


  /* 결제 금액 변동 */
  
const guestBtn = document.querySelectorAll(".guestBtn");
const paymentBtn = document.querySelector(".reservation--btn__bottom");   // 결제 버튼
const totalReservationCost = document.getElementById("totalReservationCost");   // 총 주문 금액
const commission = document.getElementById("commission");   // 수수료
const totalPaymentCost = document.getElementById("totalPaymentCost");   // 총 결제 금액

/* 증감 버튼 클릭 시 */
guestBtn.forEach((btn)=>{

    btn.addEventListener("click", ()=>{
      showTotalResevationCost();
    });  

});    


const cardAmount = document.getElementById("cardAmount");

/* 총 금액 초기 세팅 & 변동 */
function showTotalResevationCost(){


    let totalCost;
    let fee;
    let payment;

    if(package==1){
      /* 당일 투어의 경우 총 금액 = 상품 금액 x 게스트 수 */
      totalCost = Number(guestsQnt.innerText) * price;
    
    }else{
      /* 당일 투어가 아닌 경우 총 금액 = 상품 금액 */
      totalCost = price;
    }

    /* 수수료 계산 */
    fee = totalCost * 0.1;

    /* 총 결제 금액 계산 */
    payment = fee + totalCost;


    // 카드 결제 시 필요한 amount hidden 태그 값에 저장
    cardAmount.value = payment;


    totalReservationCost.innerText = "KRW " + totalCost.toLocaleString();
    commission.innerText = "KRW " + fee.toLocaleString();
    totalPaymentCost.innerText = payment.toLocaleString();
    
    paymentBtn.innerText = payment.toLocaleString() + " won payment";

}

showTotalResevationCost();


  

// 모달 창 토글

function toggleModal() {
  
  let modal = document.getElementById("paymentModal");
  const modalCost = document.querySelector(".modal--content__cost");
  
  modal.style.display = (modal.style.display === "block") ? "none" : "block";
  modalCost.innerText = totalPaymentCost.innerText;
}


/* 예약하고자 하는 날짜 출력 */
const reservationDateDiv = document.querySelector(".reservation--date__decription>div");
const orderDate = new Date(reservationDate.productDate);
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

let dayOfWeek = orderDate.getDay();
let weekday = weekdays[dayOfWeek];
let firstFormattedDate = orderDate.toLocaleDateString('en-US', {day: 'numeric', month: 'long', year: 'numeric' });

if(package==1){

    reservationDateDiv.innerText = firstFormattedDate + " (" + weekday + ")   " + selectedTime;
  
}else{

/* N일 투어의 경우 마지막날 계산 필요 */

const firstYear = orderDate.getFullYear();
  
let nDaysLater = new Date(reservationDate.productDate);
nDaysLater.setDate(nDaysLater.getDate() + (package-1));

const lastYear = nDaysLater.getFullYear();

/* 6 july, 2023 (Sun) 형식으로 변경 */
if (lastYear !== firstYear)
  firstFormattedDate = orderDate.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
else
  firstFormattedDate = orderDate.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short'});


  /* 마지막 날 요일 구하기 */
 dayOfWeek = nDaysLater.getDay();
 weekday = weekdays[dayOfWeek];


  nDaysLater = nDaysLater.toLocaleDateString('en-US', { day: 'numeric', month: 'short',  weekday: 'short', year: 'numeric' });

  reservationDateDiv.innerText = firstFormattedDate + " - " + nDaysLater;
}

const emergencyContact = document.getElementById("emergencyContact").value;
const requestContent = document.getElementById("request").value;

  
  // 결제 요청
  var IMP = window.IMP;
  IMP.init(impCode); 

  //  카드결제
  function requestCardPay() {

  
    IMP.request_pay({
      pg: "html5_inicis." + pgMid,     // 상점 ID
      pay_method: "card",
      merchant_uid: createRandomOrderNum(),   // 주문번호
      name: productName,    // 상품명
      amount: cardAmount.value,    // 금액
      buyer_email: userEmail,
      buyer_name: userName,
      buyer_tel: userTel,
    }, 

  function (rsp){   // callback
    if(rsp.success){
        // 결제 성공 시 로직 : 결제 승인

        const data = {
            "impUid": rsp.imp_uid,
            "orderNumber": rsp.merchant_uid,
            "totalPrice": cardAmount.value,
            "productName": rsp.name,
            "paymentMethod": 'C',
            "guestCount": Number(guestsQnt.innerText),
            "productNo": productNo,
            "userNo": userNo,
            "productDateNo": reservationDate.productDateNo,    // 캘린더에서 선택된 날짜
            "optionNo": optionNo,
            "requestContent": requestContent,
            "emergencyContact" : emergencyContact
        }


        paymentComplete(data);

        
    }else{
      // 결제 실패 시 로직
      alert(`결제에 실패하였습니다. 에러 내용: ${rsp.error_msg}`);
      window.location.reload(); 
    }

  });
}


// 결제 완료
function paymentComplete(data){
  fetch("/reservation/payment/complete", {
    method : "POST",
    headers : {"Content-Type" : "application/json"},
    body : JSON.stringify(data)
  })
  .then(resp=>resp.text())
  .then(result=>{
    
    if(result!='성공'){
      alert(result);
    }
    else{
      location.replace("/reservation/order_result?order_id=" + data.orderNumber);
      sendReservation(productNo, productName); // 예약 완료 알림
    }
    
  })
  .catch(err=>{
    console.log(err);
    alert(err);
  })
}




// 주문번호 랜덤 생성
function createRandomOrderNum(){
  const date = new Date;
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	
	let orderNum = year + month + day + "-";
	for(let i=0;i<6;i++) {
		orderNum += Math.floor(Math.random() * 9);	
	}

	return orderNum;
}



// 결제 수단 선택에 따른 결제 진행 버튼 변동
paypal.Buttons().render('#paypal-buttons-container');

// 라디오 버튼 change 이벤트 설정
document.querySelectorAll('input[name=payment]')
    .forEach(function (el) {
    el.addEventListener('change', function (event) {

        // 결제 수단으로 페이팔 선택됐을 때 페이팔 버튼이 보이도록
        if (event.target.value === 'paypal') {
        document.body.querySelector('#nowPay')
            .style.display = 'none';
        document.body.querySelector('#paypal-buttons-container')
            .style.display = 'block';
        }

        // 결제 수단으로 카드가 선택됐을 때 결제하기 버튼이 보이도록
        if (event.target.value === 'card') {
        document.body.querySelector('#nowPay')
            .style.display = 'block';
        document.body.querySelector('#paypal-buttons-container')
            .style.display = 'none';
        }
    });
});


// 페이팔 결제
function requestPaypalPay(){
  // fetch('/paypal/submit')
  //   .then(function(response) {
  //       if (response.ok) {
  //           return response.text();
  //       }
  //       throw new Error('Network response was not ok.');
  //   })
  //   .then(function(data) {
  //       // 응답 처리
  //   })
  //   .catch(function(error) {
  //       // 에러 처리
  //   });
}


/* 유의사항 전체 동의 */
// 마지막 체크박스가 변경되었을 때 전체 동의 체크박스 상태 업데이트
function updateCheckAll() {
  const toucheckboxes = document.querySelectorAll("input[type='checkbox']");
  const lastCheckbox = toucheckboxes[toucheckboxes.length - 1];

  // 마지막 체크박스의 상태에 따라 모든 체크박스를 업데이트
  if (lastCheckbox.checked) {
    toucheckboxes.forEach(function(checkbox) {
      checkbox.checked = true;
    });
  } else {
    toucheckboxes.forEach(function(checkbox) {
      checkbox.checked = false;
    });
  }
}

// 마지막 체크박스의 변경 이벤트에 updateCheckAll 함수 연결
const touAllCheck = document.getElementById("touAllCheck"); // 여기에 마지막 체크박스의 id를 입력해야 합니다.

touAllCheck.addEventListener("change", updateCheckAll);




// 라디오 버튼과 체크박스의 상태 변화를 감지하여 제출 버튼 활성화
function checkFormStatus() {
  const touRadioBtn = document.querySelectorAll("input[type='radio']");
  const touCheckBoxes = document.querySelectorAll("input[type='checkbox']");

  // 라디오 버튼과 체크박스 중 하나라도 선택되었는지 확인
  const radioSelected = Array.from(touRadioBtn).some(function(radio) {
    return radio.checked;
  });

  const checkboxesChecked = Array.from(touCheckBoxes).every(function(checkbox) {
    return checkbox.checked;
  });

  // 제출 버튼 활성화 상태 업데이트
  if (radioSelected && checkboxesChecked) {
    paymentBtn.disabled = false;
  } else {
    paymentBtn.disabled = true;
  }
}

// 라디오 버튼과 체크박스의 변경 이벤트에 checkFormStatus 함수 연결
const touRadioBtn = document.querySelectorAll("input[type='radio']");
const touCheckBoxes = document.querySelectorAll("input[type='checkbox']");
const formElements = [...touRadioBtn, ...touCheckBoxes];
formElements.forEach(function(element) {
  element.addEventListener("change", checkFormStatus);
});


const details = document.querySelectorAll('.tou--detail');
details.forEach(function(detail) {
  detail.addEventListener('click', function() {
    const content = this.parentElement.parentElement.nextElementSibling;
    content.classList.toggle('open');
  });
});


// textarea 글자수 제한
function checkLength(el) {

  const maxLength = 600; // 최대 글자수

  if (el.value.length > maxLength) {
    el.value = el.value.substring(0, maxLength);
  }
}