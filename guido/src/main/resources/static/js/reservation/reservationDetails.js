// 예약 날짜 계산
const reservationDateDiv = document.getElementById("reservationDate");
const orderDate = new Date(productDate);

if(package==1){

    reservationDateDiv.innerText = productDate + " [" + selectedTime + "]";
  
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



// 모달 창 토글
function toggleModal() {
  
  let modal = document.getElementById("cancelModal");
  
  modal.style.display = (modal.style.display === "block") ? "none" : "block";
  
}


// textarea 글자수 제한
const textarea = document.querySelector('.cancel--textarea');
const maxLength = 180; // 최대 글자수

function checkLength() {

  const lengthIndicator = document.getElementById('cancelReasonLength');

  const currentLength = textarea.value.length;
  lengthIndicator.textContent = currentLength;

  if (currentLength > maxLength) {
      lengthIndicator.style.color = 'red';
  } else {
      lengthIndicator.style.color = '';
  }

}


document.getElementById("realCancelBtn").addEventListener("click", (e)=>{

  if(textarea.value.length>maxLength){
    alert("작성 가능한 글자수를 초과합니다.");    
    e.preventDefault();
  }

})