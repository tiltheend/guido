
const reservationDate = document.getElementById("reservationDate");
let laterDate = new Date(productDate);
const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
let dayOfWeek = daysOfWeek[laterDate.getDay()];

if(package==1){

    reservationDate.innerText = productDate + "(" + dayOfWeek+ ") " + optionName;
    
}else{

    let outputText = productDate + "(" + dayOfWeek + ") ~ ";

    // 마지막 날짜 계산
    laterDate.setDate(laterDate.getDate() + (package-1));
    
    dayOfWeek = daysOfWeek[laterDate.getDay()];

    // 원하는 형식으로 변환
    const year = laterDate.getFullYear();
    const month = String(laterDate.getMonth() + 1).padStart(2, "0");
    const day = String(laterDate.getDate()).padStart(2, "0");

    laterDate = `${year}-${month}-${day}`;

    reservationDate.innerText = outputText + laterDate + "(" + dayOfWeek + ") ";
}



let modal = document.getElementById("faceImgModal");

// 모달 창 토글
function toggleModal() {
    modal.style.display = (modal.style.display === "block") ? "none" : "block";
}

modal.addEventListener('click', ()=>{
    toggleModal();
});