// 예약 날짜 계산
const reservationDateDiv = document.getElementById("reservationDate");
const orderDate = new Date(productDate);
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

let dayOfWeek = orderDate.getDay();
let weekday = weekdays[dayOfWeek];
let firstFormattedDate = orderDate.toLocaleDateString('en-US', {day: 'numeric', month: 'short', year: 'numeric' });

/* 당일 투어의 경우 */
if(package==1){

    reservationDateDiv.innerText = firstFormattedDate + " (" + weekday + ") " + selectedTime;
  
}else{

  /* N일 투어의 경우 마지막날 계산 필요 */

  const firstYear = orderDate.getFullYear();
  
  let nDaysLater = new Date(productDate);
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