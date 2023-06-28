

const plusBtn = document.getElementById("guestsPlusBtn");
const minusBtn = document.getElementById("guestsMinusBtn");

plusBtn.addEventListener("click", ()=>{
  
    const guestsQnt = document.getElementById("guestsQnt");

    /* 나중 가서 최대 인원수 제한 넣기 */
    guestsQnt.innerText = Number(guestsQnt.innerText) + 1;
    
  }); 
  
  
  minusBtn.addEventListener("click", ()=>{
    
    const guestsQnt = document.getElementById("guestsQnt");
    
    /* 최소 인원수도,.... 지금은 임의로 1 이상 */
    if(Number(guestsQnt.innerText)>1)
    guestsQnt.innerText = Number(guestsQnt.innerText) - 1;
  
  
  });


  /* 연락처 value 넣기 */
  // document.getElementById("phone").value = loginUserTel;


/* 결제 버튼을 클릭했을 때 약관동의 미체크 시 제출 막기 */
  const paymentBtn = document.querySelector(".reservation--btn__bottom");

  paymentBtn.addEventListener("click", (e)=>{
    
    if(document.querySelector("input[type='checkbox']").checked == false)
      e.preventDefault();
  });



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