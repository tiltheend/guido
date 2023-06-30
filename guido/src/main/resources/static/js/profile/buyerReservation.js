/* 구매 더보기 js */
const reservationMoreBtn = document.querySelector(".reservation-list-more");
const myReviewList = document.querySelector(".reservation-list-box");

document.addEventListener("DOMContentLoaded", () => {
    reservationMoreBtnFn(); /* 더보기 버튼 css */
});

if(reservationMoreBtn !=null) {
    reservationMoreBtn.addEventListener("click", e => {
        let startReservationNum = myReviewList.childElementCount;
        console.log(startReservationNum);
        fetch("/profile/myReservationMore",{
            method : "POST",
            headers : {"Content-Type" : "application/json"}, 
            body : startReservationNum
        })
        .then(resp => resp.json())
        .then(myReservationMore => {
            console.log("더보기 성공쓰~~");
            
            if (myReservationMore.length < 4) {
                reservationMoreBtn.style.display = "none";
            }
    
            for (let i = 0; i <myReservationMore.length; i++) {
                const reservation = myReservationMore[i];
    
                if(reservation == null) break;
                console.log("더보기"+reservation);
                reservationMoreBtnFn();
            }

    
        })
        .catch(err=>{
            console.log(err);
            reservationMoreBtn.style.display="none";
        });
    
    });
}

/* 비동기로 구매 목록 불러오기 (최신 3개) */
function reviewListFn(){

    fetch("/profile/newReservationList",{
        method : "POST",
        headers : {"Content-Type" : "application/json"}, 
        body : pageUserNo
    })
    .then(resp => resp.json())
    .then(newReservationList => {

        console.log("비동기 조회 성공쓰~~");
        if(newReservationList.length >0){

            // 기존 리뷰 지우기
            let reservationListElements = document.querySelectorAll('.reservation-list-box>li');
    
            reservationListElements.forEach(function(reservationListElement) {
            reservationListElement.parentNode.removeChild(reservationListElement);
            });
    
            let reservationCount = newReservationList[0].reservationCount;
            document.querySelector(".reservation-list>div>h1>span").innerText=reservationCount;
            
            for (let i = 0; i <newReservationList.length; i++) {
                const reservation = newReservationList[i];
    
                if(reservation == null) break;
                console.log("비동기"+reservation);

                reservationMoreBtnFn();
            }

        }

    })
    .catch(err=>{
        console.log(err);
        reservationMoreBtn.style.display="none";
    });

};

//  구매 갯수 세서 3 이하면 버튼 없애고 4이상이면 출력하게 하기
function reservationMoreBtnFn(){
    let reservationCountSpan = document.querySelector(".reservation-list>div>h1>span").innerText;
    
    if(reservationCountSpan<=3){
        reservationMoreBtn.style.display="none";
    } else {
        reservationMoreBtn.style.display="block";
    }
}