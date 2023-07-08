
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

    date.setDate(date.getDate() + (package-1)); 
    formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    outputDate = outputDate + formattedDate;
}

reservationDate.innerText = outputDate;


const guest = document.getElementById("guest");
let outputGuest;

if(guest==1){
    outputGuest = guestCount + " guest"
}else{
    outputGuest = guestCount + " guests"
}

guest.innerText = outputGuest;