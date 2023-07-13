/* 예약 더보기 js */
const reservationMoreBtn = document.querySelector(".reservation-list-more");
const myReservationList = document.querySelector(".reservation-list-box");

document.addEventListener("DOMContentLoaded", () => {
    reservationMoreBtnFn(); /* 더보기 버튼 css */
    reservationListFn(); /* 날짜 출력 할려고 페이지 로딩 되면 예약 리스트 비동기 조회 */
});

if(reservationMoreBtn !=null) {
    reservationMoreBtn.addEventListener("click", e => {
        let startReservationNum = myReservationList.childElementCount;

        fetch("/profile/guideMoreReservationList",{
            method : "POST",
            headers : {"Content-Type" : "application/json"}, 
            body : JSON.stringify({
                "startReservationNum" : startReservationNum,
                "userNo" : pageUserNo
                })
            })
        .then(resp => resp.json())
        .then(guideReservationList => {
            
            if (guideReservationList.length < 4) {
                reservationMoreBtn.style.display = "none";
            }
    
            for (let i = 0; i <3; i++) {
                const reservation = guideReservationList[i];
                
                if(reservation == null) break;

                const li = document.createElement('li');
                li.setAttribute('data-reservationno',reservation.reservationNo);
                li.addEventListener('click', function() {
                    gotoGuideRFn(this);
                });

                const saleImgDiv = document.createElement('div');
                saleImgDiv.classList.add('sale-img');

                const thumbnailImg = document.createElement('img');
                thumbnailImg.src = reservation.thumbnail;
                thumbnailImg.alt = 'thumbnail';
                saleImgDiv.appendChild(thumbnailImg);

                const guestProfileImgDiv = document.createElement('div');
                guestProfileImgDiv.classList.add('guest-profile-img');

                // const userProfileLink = document.createElement('a');
                // userProfileLink.href = `/profile/${reservation.userNo}`;

                const profileImage = document.createElement('img');
                profileImage.src = reservation.faceImg ? reservation.faceImg : '/images/userProfile/basicUser.png';
                profileImage.alt = 'profileImage';
                profileImage.classList.add('img-content');

                // userProfileLink.appendChild(profileImage);
                guestProfileImgDiv.appendChild(profileImage);

                saleImgDiv.appendChild(guestProfileImgDiv);
                li.appendChild(saleImgDiv);

                const saleContentDiv = document.createElement('div');
                saleContentDiv.classList.add('sale-content');

                // const productLink = document.createElement('a');
                // productLink.href = `/productDetail/product/${reservation.productNo}`;

                const productNameH3 = document.createElement('h3');
                productNameH3.textContent = reservation.productName;
                // productLink.appendChild(productNameH3);
                saleContentDiv.appendChild(productNameH3);

                const dateH2 = document.createElement('h3');
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
                saleContentDiv.appendChild(dateH2);

                const totalPriceH3 = document.createElement('h3');
                const totalPriceSpan = document.createElement('span');
                totalPriceSpan.textContent = `KRW ${reservation.totalPrice.toLocaleString()} / total`;
                totalPriceH3.appendChild(totalPriceSpan);
                saleContentDiv.appendChild(totalPriceH3);

                // 구매 관련
                let payStateDiv = document.createElement('div');
                payStateDiv.classList.add('pay-state');

                let span = document.createElement('span');
                span.textContent = '주문 처리 : ';

                const state = reservation.reservationState;
                // const stateSpan = document.createElement("span");
                if (state === 'Y') {
                    span.textContent += "예약 완료";
                } else if (state === 'N') {
                    span.textContent += "예약 취소";
                } else if (state === 'D') {
                    span.textContent += "구매확정 완료";
                }
                span.textContent += ` ( ${reservation.createDate } ) `;

                payStateDiv.appendChild(span);

                saleContentDiv.appendChild(payStateDiv);

                const languageP = document.createElement('p');
                const languageImg = document.createElement('img');
                languageImg.src = '/images/profile/language.png';
                languageImg.alt = 'language';
                const languageText = document.createTextNode(`Tourist language: ${reservation.primaryLanguage}`);
                languageP.appendChild(languageImg);
                languageP.appendChild(languageText);
                saleContentDiv.appendChild(languageP);

                const guestDiv = document.createElement('div');

                const guestCountH2 = document.createElement('h2');
                const guestCountSpan = document.createElement('span');
                guestCountSpan.textContent = reservation.guestCount;
                guestCountH2.appendChild(guestCountSpan);
                guestCountH2.textContent += ' Guests';
                guestDiv.appendChild(guestCountH2);

                const userNameP = document.createElement('p');
                const userNameSpan = document.createElement('span');
                userNameSpan.textContent = reservation.userName;
                const guestChattingImg = document.createElement('img');
                guestChattingImg.src = '/images/profile/guestChatting.png';
                guestChattingImg.alt = 'guestChatting';
                userNameP.appendChild(userNameSpan);
                // userNameP.appendChild(guestChattingImg);
                guestDiv.appendChild(userNameP);

                saleContentDiv.appendChild(guestDiv);
                li.appendChild(saleContentDiv);

                document.querySelector(".reservation-list-box").append(li);
            }
    
        })
        .catch(err=>{
            console.log(err);
            reservationMoreBtn.style.display="none";
        });
    
    });
}

/* 비동기로 예약 목록 불러오기 (최신 3개) */
function reservationListFn(){

    fetch("/profile/guideReservationList",{
        method : "POST",
        headers : {"Content-Type" : "application/json"}, 
        body : pageUserNo
    })
    .then(resp => resp.json())
    .then(guideReservationList => {

        if(guideReservationList.length >0){

            // 기존 상품 지우기
            let reservationListElements = document.querySelectorAll('.reservation-list-box>li');
    
            reservationListElements.forEach(function(reservationListElement) {
            reservationListElement.parentNode.removeChild(reservationListElement);
            });
    
            // let reservationCount = newReservationList[0].reservationCount;
            // document.querySelector(".reservation-list>div>h1>span").innerText=reservationCount;
            
            for (let i = 0; i <guideReservationList.length; i++) {
                const reservation = guideReservationList[i];

                if(reservation == null) break;

                const li = document.createElement('li');
                li.setAttribute('data-reservationno',reservation.reservationNo);
                li.addEventListener('click', function() {
                    gotoGuideRFn(this);
                });

                const saleImgDiv = document.createElement('div');
                saleImgDiv.classList.add('sale-img');

                const thumbnailImg = document.createElement('img');
                thumbnailImg.src = reservation.thumbnail;
                thumbnailImg.alt = 'thumbnail';
                saleImgDiv.appendChild(thumbnailImg);

                const guestProfileImgDiv = document.createElement('div');
                guestProfileImgDiv.classList.add('guest-profile-img');

                // const userProfileLink = document.createElement('a');
                // userProfileLink.href = `/profile/${reservation.userNo}`;

                const profileImage = document.createElement('img');
                profileImage.src = reservation.faceImg ? reservation.faceImg : '/images/userProfile/basicUser.png';
                profileImage.alt = 'profileImage';
                profileImage.classList.add('img-content');

                // userProfileLink.appendChild(profileImage);
                guestProfileImgDiv.appendChild(profileImage);

                saleImgDiv.appendChild(guestProfileImgDiv);
                li.appendChild(saleImgDiv);

                const saleContentDiv = document.createElement('div');
                saleContentDiv.classList.add('sale-content');

                // const productLink = document.createElement('a');
                // productLink.href = `/productDetail/product/${reservation.productNo}`;

                const productNameH3 = document.createElement('h3');
                productNameH3.textContent = reservation.productName;
                // productLink.appendChild(productNameH3);
                saleContentDiv.appendChild(productNameH3);


                const dateH2 = document.createElement('h3');
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
                saleContentDiv.appendChild(dateH2);

                const totalPriceH3 = document.createElement('h3');
                const totalPriceSpan = document.createElement('span');
                totalPriceSpan.textContent = `KRW ${reservation.totalPrice.toLocaleString()} / total`;
                totalPriceH3.appendChild(totalPriceSpan);
                saleContentDiv.appendChild(totalPriceH3);

                // 구매 관련
                let payStateDiv = document.createElement('div');
                payStateDiv.classList.add('pay-state');

                let span = document.createElement('span');
                span.textContent = '주문 처리 : ';

                const state = reservation.reservationState;
                // const stateSpan = document.createElement("span");
                if (state === 'Y') {
                    span.textContent += "예약 완료";
                } else if (state === 'N') {
                    span.textContent += "예약 취소";
                } else if (state === 'D') {
                    span.textContent += "구매확정 완료";
                }
                span.textContent += ` ( ${reservation.createDate } ) `;

                payStateDiv.appendChild(span);

                saleContentDiv.appendChild(payStateDiv);

                const languageP = document.createElement('p');
                const languageImg = document.createElement('img');
                languageImg.src = '/images/profile/language.png';
                languageImg.alt = 'language';
                const languageText = document.createTextNode(`Tourist language: ${reservation.primaryLanguage}`);
                languageP.appendChild(languageImg);
                languageP.appendChild(languageText);
                saleContentDiv.appendChild(languageP);

                const guestDiv = document.createElement('div');

                const guestCountH2 = document.createElement('h2');
                const guestCountSpan = document.createElement('span');
                guestCountSpan.textContent = reservation.guestCount;
                guestCountH2.appendChild(guestCountSpan);
                guestCountH2.textContent += ' Guests';
                guestDiv.appendChild(guestCountH2);

                const userNameP = document.createElement('p');
                const userNameSpan = document.createElement('span');
                userNameSpan.textContent = reservation.userName;
                const guestChattingImg = document.createElement('img');
                guestChattingImg.src = '/images/profile/guestChatting.png';
                guestChattingImg.alt = 'guestChatting';
                userNameP.appendChild(userNameSpan);
                // userNameP.appendChild(guestChattingImg);
                guestDiv.appendChild(userNameP);

                saleContentDiv.appendChild(guestDiv);
                li.appendChild(saleContentDiv);

                document.querySelector(".reservation-list-box").append(li);
            }

        }

    })
    .catch(err=>{
        console.log(err);
        reservationMoreBtn.style.display="none";
    });

};


//  예약 갯수 세서 3 이하면 버튼 없애고 4이상이면 출력하게 하기
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

// 가이드 예약 페이지 보기
function gotoGuideRFn(el){
    let reservationNo = el.getAttribute('data-reservationno');
    location.href="/reservation/reservation_list?reservation_no="+reservationNo;
}

