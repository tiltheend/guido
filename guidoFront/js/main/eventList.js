/* ***** 헤더 검색 모달창 ***** */
const mainSearchBox = document.querySelector('.main-search-box');
const searchBoxClickBox = document.querySelector('.search-box-click-box');

const whereButton = document.querySelector('.where-button');
const whenButton = document.querySelector('.when-button');
const guestButton = document.querySelector('.guest-button');

const whereButtonClick = document.querySelector('.where-button-click');
const checkInButtonClick = document.querySelector('.check-in-button-click');
const checkOutButtonClick = document.querySelector('.check-out-button-click');
const guestButtonClick = document.querySelector('.guest-button-click');

const whereModal = document.querySelector('.where-modal-bg');
const whenModal = document.querySelector('.when-modal-bg');
const guestModal = document.querySelector('.guest-modal-bg');


whereButton.addEventListener('click', () => {
    mainSearchBox.style.display = 'none';
    searchBoxClickBox.style.display = 'block';
    whereModal.style.display = 'block';
    /* toggleModal(whereModal); */
});

whenButton.addEventListener('click', () => {
    mainSearchBox.style.display = 'none';
    searchBoxClickBox.style.display = 'block';
    whenModal.style.display = 'block';
    /* toggleModal(whenModal); */
});

guestButton.addEventListener('click', () => {
    mainSearchBox.style.display = 'none';
    searchBoxClickBox.style.display = 'block';
    guestModal.style.display = 'block';
    /* toggleModal(guestModal); */
});


/* *** 헤더 검색 추가 모달창 *** */
whereButtonClick.addEventListener('click', () => {
    whereModal.style.display = 'block';
    whenModal.style.display = 'none';
    guestModal.style.display = 'none';
});

checkInButtonClick.addEventListener('click', () => {
    whenModal.style.display = 'block';
    whereModal.style.display = 'none';
    guestModal.style.display = 'none';
});
checkOutButtonClick.addEventListener('click', () => {
    whenModal.style.display = 'block';
    whereModal.style.display = 'none';
    guestModal.style.display = 'none';
});

guestButtonClick.addEventListener('click', () => {
    guestModal.style.display = 'block';
    whereModal.style.display = 'none';
    whenModal.style.display = 'none';
});

/* 
function toggleModal(modal) {
    modal.classList.toggle('show');
} 
*/


/* *** 모달창 닫기 *** */
const modalsBG = document.querySelectorAll('.modal');

/* modalsBG.forEach(modal => {
    modal.addEventListener('click', () => {
    modal.style.display = 'none';
    mainSearchBox.style.display = 'flex';
    searchBoxClickBox.style.display = 'none';
    });
}); */

document.addEventListener('DOMContentLoaded', function () {
    // 모달 요소들을 가져옵니다.
    var modals = document.querySelectorAll('.modal');

    // 각 모달 요소에 이벤트 리스너를 추가합니다.
    modals.forEach(function (modal) {
        // 모달 이외의 영역을 클릭하면 모달이 닫히도록 합니다.
        modal.addEventListener('click', function (event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                mainSearchBox.style.display = 'flex';
                searchBoxClickBox.style.display = 'none';
            }
        });
    });
});





/* ***** 메인 헤더 아이콘 모달창 ***** */
const alarmIcon = document.querySelector(".alarm-icon");
const mypageIcon = document.querySelector(".mypage-icon");

const alarmModal = document.querySelector(".alarm-modal");
const mypageModal = document.querySelector(".mypage-modal");

const mypageModalClose = document.querySelector(".mypage-modal-close");
const alarmModalClose = document.querySelector(".alarm-modal-close");

alarmIcon.addEventListener("click", () => {
    if (alarmModal.style.display === "block") {
        alarmModal.style.display = "none";
    } else {
        alarmModal.style.display = "block";
        mypageModal.style.display = "none";
    }
});

mypageIcon.addEventListener("click", () => {
    if (mypageModal.style.display === "block") {
        mypageModal.style.display = "none";
    } else {
        mypageModal.style.display = "block";
        alarmModal.style.display = "none";
    }
});

alarmModalClose.addEventListener("click", () => {
    alarmModal.style.display = "none";
});

mypageModalClose.addEventListener("click", () => {
    mypageModal.style.display = "none";
});
