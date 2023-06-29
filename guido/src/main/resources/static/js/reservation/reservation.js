
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



/* 결제 버튼을 클릭했을 때 약관동의 미체크 시 제출 막기 */
  paymentBtn.addEventListener("click", (e)=>{
    
    if(document.querySelector("input[type='checkbox']").checked == false){
      alert("약관 동의에 체크해주세요");
      e.preventDefault();
    }
  });



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
  IMP.init(impCode); 



// // 결제 요청
// function requestPay() {

//   IMP.request_pay({
//     pg: "kcp.{상점ID}",
//     pay_method: "card",
//     merchant_uid: "ORD20180131-0000011",   // 주문번호
//     name: "노르웨이 회전 의자",
//     amount: 64900,                         // 숫자 타입
//     buyer_email: "gildong@gmail.com",
//     buyer_name: "홍길동",
//     buyer_tel: "010-4242-4242",
//     buyer_addr: "서울특별시 강남구 신사동",
//     buyer_postcode: "01181"
//   }, function (rsp) { // callback
//     //rsp.imp_uid 값으로 결제 단건조회 API를 호출하여 결제결과를 판단합니다.

//   });
// }