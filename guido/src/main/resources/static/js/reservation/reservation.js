

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


    totalReservationCost.innerText = "KRW " + totalCost.toLocaleString();
    commission.innerText = "KRW " + fee.toLocaleString();
    totalPaymentCost.innerText = payment.toLocaleString();
    
    paymentBtn.innerText = payment.toLocaleString() + " won payment";

}

showTotalResevationCost();


  
/* 모달창 띄우기 */

// 모달 창 토글
function toggleModal(type) {
  
  let modal;

  /* 개인정보 수집, 이용 동의 */
  if(type=='ua')
    modal = document.getElementById("useAgreeModal");

  /* 결제 */
  if(type=='pm')
    modal = document.getElementById("paymentModal");
  
  /* 개인정보 3자 제공 동의 */
  if(type=='pa')
    modal = document.getElementById("provideAgreeModal");
  
  modal.style.display = (modal.style.display === "block") ? "none" : "block";
}



/* 예약하고자 하는 날짜 출력 */
const reservationDateDiv = document.querySelector(".reservation--date__decription>div");
const orderDate = new Date(reservationDate);

if(package==1){

    reservationDateDiv.innerText = reservationDate + " (" + selectedTime + ")";
  
}else{

  // 투어 마지막 날 계산
  const newYear = orderDate.getFullYear();
  const newMonth = ('0' + (orderDate.getMonth() + 1)).slice(-2);
  const newDay = ('0' + orderDate.getDate()).slice(-2);
  
  const formattedDate = newYear + '년 ' + newMonth + '월 ' + newDay + '일';
  
  
  orderDate.setDate(orderDate.getDate() + package-1);
  
  const lastYear = orderDate.getFullYear();
  const lastMonth = String(orderDate.getMonth() + 1).padStart(package-1, "0");
  const lastDay = String(orderDate.getDate()).padStart(package-1, "0");
  

let twoDaysLater;

if (lastYear !== newYear) {
  twoDaysLater = `${lastYear}년 ${lastMonth}월 ${lastDay}일`;
} else {
  twoDaysLater = `${lastMonth}월 ${lastDay}일`;
}
  
  reservationDateDiv.innerText = formattedDate + " ~ " + twoDaysLater;
}


  // 결제(포트원) 가맹점 식별 코드 
  
  
  // 결제 요청
  function requestCardPay() {
  
    IMP.init(impCode); 

  
    IMP.request_pay({
      pg: "kcp." + pgMid,     // 상점 ID
      pay_method: "card",
      merchant_uid: merchantUid,   // 주문번호
      name: productName,    // 상품명
      // amount: Number(totalPaymentCost.innerText),
      amount: 200,
      buyer_email: userEmail,
      buyer_name: loginUserName,
      buyer_tel: userTel,
      m_redirect_url : '{결제 완료 후 리디렉션 될 URL}' // 결제 완료 후 리디렉션 될 URL
    }, function (rsp) { // callback
      //rsp.imp_uid 값으로 결제 단건조회 API를 호출하여 결제결과를 판단합니다.

      console.log(rsp);

  });
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