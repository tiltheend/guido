
/* 예약 날짜 */
const reservationDate = document.getElementById("reservationDate");

let date = new Date(createDate);
let formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
let outputDate;

/* 1박의 경우 */
if(package==1){
    outputDate = formattedDate + ". " + optionName;
}else{
    outputDate = formattedDate + " - ";

    date.setDate(date.getDate() + 3); 
    formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    outputDate = outputDate + formattedDate;
}

reservationDate.innerText = outputDate;