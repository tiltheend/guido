
const reservatonDate = document.getElementById("reservatonDate");
let laterDate = new Date(productDate);
const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
let dayOfWeek = daysOfWeek[laterDate.getDay()];

if(package==1){

    reservatonDate.innerText = productDate + "(" + dayOfWeek+ ") " + optionName;
    
}else{

    let outputText = productDate + "(" + dayOfWeek + ") ~";

    // 마지막 날짜 계산
    laterDate.setDate(laterDate.getDate() + (package-1));
    laterDate = laterDate.toISOString().slice(0, 10);
    
    dayOfWeek = daysOfWeek[laterDate.getDay()];

    reservatonDate.innerText = outputText + laterDate + "(" + dayOfWeek + ") ";
}



let modal = document.getElementById("faceImgModal");

// 모달 창 토글
function toggleModal() {
    modal.style.display = (modal.style.display === "block") ? "none" : "block";
}

modal.addEventListener('click', ()=>{
    toggleModal();
});