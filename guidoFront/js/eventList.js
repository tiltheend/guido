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

const modalsBG = document.querySelectorAll('.modal');


/* *** 헤더 검색 모달창 *** */
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
modalsBG.forEach(modal => {
    modal.addEventListener('click', () => {
        modal.style.display = 'none';
        mainSearchBox.style.display = 'flex';
        searchBoxClickBox.style.display = 'none';
    });
});
