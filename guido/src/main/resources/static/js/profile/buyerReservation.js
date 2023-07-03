/* 구매 더보기 js */
const reservationMoreBtn = document.querySelector(".reservation-list-more");
const myReviewList = document.querySelector(".reservation-list-box");

document.addEventListener("DOMContentLoaded", () => {
    reservationMoreBtnFn(); /* 더보기 버튼 css */
});



if(reservationMoreBtn !=null) {
    reservationMoreBtn.addEventListener("click", e => {
        let startReservationNum = myReviewList.childElementCount;

        fetch("/profile/myReservationMore",{
            method : "POST",
            headers : {"Content-Type" : "application/json"}, 
            body : startReservationNum
        })
        .then(resp => resp.json())
        .then(myReservationMore => {
            
            if (myReservationMore.length < 4) {
                reservationMoreBtn.style.display = "none";
            }
    
            for (let i = 0; i <3; i++) {
                const reservation = myReservationMore[i];
                
               // if(reservation == null) break;

                const li = document.createElement("li");

                // 예약 번호
                const reservationNumberDiv = document.createElement("div");
                const reservationNumberSpan1 = document.createElement("span");
                const reservationNumberSpan2 = document.createElement("span");
                reservationNumberSpan1.textContent = "예약 번호";
                reservationNumberSpan2.textContent = "12345678-12345678";
                // 나중에 예약 번호로 바꾸기

                reservationNumberDiv.appendChild(reservationNumberSpan1);
                reservationNumberDiv.appendChild(reservationNumberSpan2);

                li.appendChild(reservationNumberDiv);

                // 주문 처리
                const orderProcessingDiv = document.createElement("div");
                const orderProcessingSpan = document.createElement("span");
                orderProcessingSpan.textContent = "주문 처리";
                orderProcessingDiv.appendChild(orderProcessingSpan);
                
                // 예약 상태
                // const stateDiv = document.createElement("div");
                const state = reservation.reservationState;
                const stateSpan = document.createElement("span");
                if (state === 'Y') {
                    stateSpan.textContent = "예약 완료";
                } else if (state === 'N') {
                    stateSpan.textContent = "예약 취소";
                } else if (state === 'D') {
                    stateSpan.textContent = "구매확정 완료";
                }
                orderProcessingDiv.appendChild(stateSpan);

                li.appendChild(orderProcessingDiv);
                // li.appendChild(stateDiv);

                // 이미지 및 내용 요소
                const imageDiv = document.createElement("div");
                imageDiv.className = "reservation-img";
                const imageLink = document.createElement("a");
                const image = document.createElement("img");
                const contentDiv = document.createElement("div");
                contentDiv.className = "reservation-content";
                const dateH2 = document.createElement("h2");
                const titleH2 = document.createElement("h2");
                const priceSpan1 = document.createElement("span");
                const priceSpan2 = document.createElement("span");

                imageLink.href = `/productDetail/product/${reservation.productNo}`;
                image.src = reservation.thumbnail;
                image.alt = "reservationImg";
                dateH2.textContent = reservation.productDate;
                titleH2.textContent = reservation.productName;
                priceSpan1.textContent = "KRW";
                priceSpan2.textContent = "000,000";
                // 나중에 가격 바꾸기!

                imageLink.appendChild(image);
                imageDiv.appendChild(imageLink);
                contentDiv.appendChild(dateH2);
                contentDiv.appendChild(titleH2);
                contentDiv.appendChild(priceSpan1);
                contentDiv.appendChild(priceSpan2);

                const flexDiv = document.createElement("div");
                flexDiv.className = "flex-direction-row";
                flexDiv.appendChild(imageDiv);
                flexDiv.appendChild(contentDiv);

                li.appendChild(flexDiv);

                // 기존 li 요소 뒤에 추가
                const existingLiElements = myReviewList.querySelectorAll("li");
                const lastLiElement = existingLiElements[existingLiElements.length - 1];
                myReviewList.insertBefore(li, lastLiElement.nextSibling);
                
            }

            reservationMoreBtnFn();
    
        })
        .catch(err=>{
            console.log(err);
            reservationMoreBtn.style.display="none";
        });
    
    });
}

/* 비동기로 구매 목록 불러오기 (최신 3개) 
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

                reservationMoreBtnFn();
            }

        }

    })
    .catch(err=>{
        console.log(err);
        reservationMoreBtn.style.display="none";
    });

};
*/

//  구매 갯수 세서 3 이하면 버튼 없애고 4이상이면 출력하게 하기
function reservationMoreBtnFn(){
    let reservationCountSpan = document.querySelector(".reservation-list>div>h1>span").innerText;
    
    if(reservationCountSpan<=3){
        reservationMoreBtn.style.display="none";
    } else {
        reservationMoreBtn.style.display="block";
    }
}