

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
  document.getElementById("phone").value = loginUserTel;