/* 구매 더보기 js */
const reservationMoreBtn = document.querySelector(".reservation-list-more");
const myReviewList = document.querySelector(".reservation-list-box");

document.addEventListener("DOMContentLoaded", () => {
    reservationListFn(); /* 날짜 출력 할려고 페이지 로딩 되면 예약 리스트 비동기 조회 */
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
                
                if(reservation == null) break;

                const li = document.createElement("li");

                // 예약 번호
                const reservationNumberDiv = document.createElement("div");
                const reservationNumberSpan1 = document.createElement("span");
                const reservationNumberSpan2 = document.createElement("span");
                reservationNumberSpan1.textContent = "예약 번호";
                const reservationNumberA = document.createElement("a");
                reservationNumberA.href = `/reservation/reservation_info?reservation_no=${reservation.reservationNo}`;
                reservationNumberSpan2.textContent = `${reservation.orderNumber}`;

                reservationNumberDiv.appendChild(reservationNumberSpan1);
                reservationNumberDiv.appendChild(reservationNumberA);
                reservationNumberA.appendChild(reservationNumberSpan2);

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
                if(reservation.productPackage=='1'){
                    if(reservation.optionName != null){
                        const orderDate = new Date(reservation.productDate);
                        const year = orderDate.getFullYear();
                        const month = String(orderDate.getMonth() + 1).padStart(2, '0');
                        const day = String(orderDate.getDate()).padStart(2, '0');
                        let optionText = reservation.optionName;

                        const startTime = optionText;
                        const endTime = addTime(optionText, reservation.tourDuration);
                        optionText = `${startTime}~${endTime}`;

                        dateH2.textContent = `${year}년 ${month}월 ${day}일 [${optionText}]`;

                    } else {
                        const orderDate = new Date(reservation.productDate);
                        const year = orderDate.getFullYear();
                        const month = String(orderDate.getMonth() + 1).padStart(2, '0');
                        const day = String(orderDate.getDate()).padStart(2, '0');
                        dateH2.textContent = `${year}년 ${month}월 ${day}일`;
                    }
                } else {
                    const orderDate = new Date(reservation.productDate);
    
                    const package = Number(reservation.productPackage);
    
                    // 투어 시작 날짜 계산
                    const newYear = orderDate.getFullYear();
                    const newMonth = String(orderDate.getMonth() + 1).padStart(2, "0");
                    const newDay = String(orderDate.getDate()).padStart(2, "0");
                    
                    const formattedDate = `${newYear}년 ${newMonth}월 ${newDay}일`;

                    orderDate.setDate(orderDate.getDate() + package - 1);
                    
                    const lastYear = orderDate.getFullYear();
                    const lastMonth = String(orderDate.getMonth() + 1).padStart(2, "0");
                    const lastDay = String(orderDate.getDate()).padStart(2, "0");

                    let twoDaysLater;
                    
                    if (lastYear !== newYear) {
                        twoDaysLater = `${lastYear}년 ${lastMonth}월 ${lastDay}일`;
                    } else {
                        twoDaysLater = `${lastMonth}월 ${lastDay}일`;
                    }
                    
                    dateH2.textContent = formattedDate + " ~ " + twoDaysLater;
                    
                }

                titleH2.textContent = reservation.productName;
                priceSpan1.textContent = "KRW";
                priceSpan2.textContent = reservation.totalPrice.toLocaleString() + ' / total';

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
    
        })
        .catch(err=>{
            console.log(err);
            reservationMoreBtn.style.display="none";
        });
    
    });
}

/* 비동기로 구매 목록 불러오기 (최신 3개) */
function reservationListFn(){

    fetch("/profile/newReservationList",{
        method : "POST",
        headers : {"Content-Type" : "application/json"}, 
        body : pageUserNo
    })
    .then(resp => resp.json())
    .then(newReservationList => {

        if(newReservationList.length >0){

            // 기존 상품 지우기
            let reservationListElements = document.querySelectorAll('.reservation-list-box>li');
    
            reservationListElements.forEach(function(reservationListElement) {
            reservationListElement.parentNode.removeChild(reservationListElement);
            });
    
            // let reservationCount = newReservationList[0].reservationCount;
            // document.querySelector(".reservation-list>div>h1>span").innerText=reservationCount;
            
            for (let i = 0; i <newReservationList.length; i++) {
                const reservation = newReservationList[i];

                if(reservation == null) break;

                const li = document.createElement("li");

                // 예약 번호
                const reservationNumberDiv = document.createElement("div");
                const reservationNumberSpan1 = document.createElement("span");
                const reservationNumberSpan2 = document.createElement("span");
                reservationNumberSpan1.textContent = "예약 번호";
                const reservationNumberA = document.createElement("a");
                reservationNumberA.href = `/reservation/reservation_info?reservation_no=${reservation.reservationNo}`;
                reservationNumberSpan2.textContent = `${reservation.orderNumber}`;

                reservationNumberDiv.appendChild(reservationNumberSpan1);
                reservationNumberDiv.appendChild(reservationNumberA);
                reservationNumberA.appendChild(reservationNumberSpan2);
                
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
                if(reservation.productPackage=='1'){
                    if(reservation.optionName != null){
                        const orderDate = new Date(reservation.productDate);
                        const year = orderDate.getFullYear();
                        const month = String(orderDate.getMonth() + 1).padStart(2, '0');
                        const day = String(orderDate.getDate()).padStart(2, '0');
                        let optionText = reservation.optionName;

                        const startTime = optionText;
                        const endTime = addTime(optionText, reservation.tourDuration);
                        optionText = `${startTime}~${endTime}`;
                        console.log(reservation.tourDuration);

                        dateH2.textContent = `${year}년 ${month}월 ${day}일 [${optionText}]`;

                    } else {
                        const orderDate = new Date(reservation.productDate);
                        const year = orderDate.getFullYear();
                        const month = String(orderDate.getMonth() + 1).padStart(2, '0');
                        const day = String(orderDate.getDate()).padStart(2, '0');
                        dateH2.textContent = `${year}년 ${month}월 ${day}일`;
                    }
                } else {
                    const orderDate = new Date(reservation.productDate);
    
                    const package = Number(reservation.productPackage);
    
                    // 투어 시작 날짜 계산
                    const newYear = orderDate.getFullYear();
                    const newMonth = String(orderDate.getMonth() + 1).padStart(2, "0");
                    const newDay = String(orderDate.getDate()).padStart(2, "0");
                    
                    const formattedDate = `${newYear}년 ${newMonth}월 ${newDay}일`;

                    orderDate.setDate(orderDate.getDate() + package - 1);
                    
                    const lastYear = orderDate.getFullYear();
                    const lastMonth = String(orderDate.getMonth() + 1).padStart(2, "0");
                    const lastDay = String(orderDate.getDate()).padStart(2, "0");

                    let twoDaysLater;
                    
                    if (lastYear !== newYear) {
                        twoDaysLater = `${lastYear}년 ${lastMonth}월 ${lastDay}일`;
                    } else {
                        twoDaysLater = `${lastMonth}월 ${lastDay}일`;
                    }
                    
                    dateH2.textContent = formattedDate + " ~ " + twoDaysLater;
                    
                }

                titleH2.textContent = reservation.productName;
                priceSpan1.textContent = "KRW";
                priceSpan2.textContent = reservation.totalPrice.toLocaleString() + ' / total';

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
                // const existingLiElements = myReviewList.querySelectorAll("li");
                // const lastLiElement = existingLiElements[existingLiElements.length - 1];
                // myReviewList.insertBefore(li, lastLiElement.nextSibling);
                document.querySelector(".reservation-list-box").append(li);
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


// 시간에 대해 지정된 시간만큼 더한 값을 반환하는 함수
function addTime(time, duration) {
    const [hour, minute] = time.split(':');
    const endTime = new Date();
    endTime.setHours(Number(hour));
    endTime.setMinutes(Number(minute));
    endTime.setMinutes(endTime.getMinutes() + duration * 60);
    return `${endTime.getHours()}:${endTime.getMinutes().toString().padStart(2, '0')}`;
}