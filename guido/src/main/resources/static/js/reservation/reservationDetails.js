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


function cancelPay(){

  console.log(reservation);
}