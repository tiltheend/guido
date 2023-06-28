
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

if(package==1){
  
  reservationDateDiv.innerText = reservationDate;
  
}else{
  
  reservationDate.setDate(reservationDate.getDate() + 2);
  
  const month = String(createDt.getMonth() + 1).padStart(2, "0");
  const day = String(createDt.getDate()).padStart(2, "0");
  
  const twoDaysLater = `${month}-${day}`;
  
  reservationDateDiv.innerText = reservationDate + " - " + twoDaysLater;
}



const guestsMinusBtn = document.getElementById("guestsMinusBtn");
const guestsPlusBtn = document.getElementById("guestsPlusBtn");


maxTourist
minTourist
