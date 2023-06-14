
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

const modalsBG = document.querySelectorAll('.modal');

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





/* ***** 메인 슬라이드 ***** */
const slides = document.querySelector('.slides'); 
const slideImg = document.querySelectorAll('.slides li'); 
let currentIdx = 0; // 현재 슬라이드 index
const slideCount = slideImg.length; // 슬라이드 개수
const prev = document.querySelector('.prev'); // 이전 버튼
const next = document.querySelector('.next'); // 다음 버튼
const slideWidth = 1280; // 한개의 슬라이드 넓이
const interval = 5000; // 슬라이드 전환 간격(5초)

// 슬라이드 복사
slides.innerHTML += slides.innerHTML;

const slideTotalCount = slideCount * 2; // 복사한 슬라이드까지 포함한 전체 슬라이드 개수
let slideTimer = null;

// 전체 슬라이드 컨테이너 넓이 설정
slides.style.width = slideWidth * slideCount + 'px';

function moveSlide(num) {
  slides.style.left = -num * slideWidth + 'px';
  currentIdx = num;
}

function startSlideShow(){
  setInterval(function (){
    if(currentIdx !== slideCount - 1){
      moveSlide(currentIdx + 1);
    } else{
      moveSlide(0)
    }
  }, interval)
}

prev.addEventListener('click', function () {
  /*첫 번째 슬라이드로 표시 됐을때는 
  이전 버튼 눌러도 아무런 반응 없게 하기 위해 
  currentIdx !==0일때만 moveSlide 함수 불러옴 */

  if (currentIdx !== 0) {
    moveSlide(currentIdx - 1);
  } else{
    moveSlide(slideCount - 1);
  }
});

next.addEventListener('click', function () {
  /* 마지막 슬라이드로 표시 됐을때는 
  다음 버튼 눌러도 아무런 반응 없게 하기 위해
  currentIdx !==slideCount - 1 일때만 
  moveSlide 함수 불러옴 */
  if (currentIdx !== slideCount - 1) {
    moveSlide(currentIdx + 1);
  } else{
    moveSlide(0); // 현재 슬라이드 마지막 슬라이드인 경우 처음 슬라이드로 이동
  }
});

startSlideShow(); // 슬라이드 자동 전환





/* ***** 게시글 슬라이드 ***** */
const postSlides = document.querySelector('.post-img-area'); 
const postSlideImg = document.querySelectorAll('.post-img-area li'); 
let postCurrentIdx = 0; // 현재 슬라이드 index
const postSlideCount = postSlideImg.length; // 슬라이드 개수
const mainPrev = document.querySelector('.main-prev'); // 이전 버튼
const mainNext = document.querySelector('.main-next'); // 다음 버튼
const postSlideWidth = 296; // 한개의 슬라이드 넓이
const postSlideMargin = 0; // 슬라이드간의 margin 값

// 전체 슬라이드 컨테이너 넓이 설정
postSlides.style.width = (postSlideWidth + postSlideMargin) * postSlideCount + 'px';

function movePostSlide(num) {
  postSlides.style.left = -num * 296 + 'px';
  postCurrentIdx = num;
}

mainPrev.addEventListener('click', function () {
  if (postCurrentIdx !== 0) {
    movePostSlide(postCurrentIdx - 1);
  } else{
    movePostSlide(postSlideCount - 1);
  }
});

mainNext.addEventListener('click', function () {

  if (postCurrentIdx !== postSlideCount - 1) {
    movePostSlide(postCurrentIdx + 1);
  } else{
    movePostSlide(0);
  }
});



/* *** 위시리스트 하트 *** */
function toggleHeart() {
  var heartIcon = event.target;
  heartIcon.classList.toggle("selected");
}





/* ***** 메인 검색 clicked css ***** */
document.addEventListener('DOMContentLoaded', function() {
  var clickDivs = document.querySelectorAll('.click-div');
  clickDivs.forEach(function(clickDiv) {
    clickDiv.addEventListener('click', function() {
      // 모든 .click-div 요소의 클래스 제거
      clickDivs.forEach(function(div) {
        div.classList.remove('clicked');
      });

      // 클릭된 div에만 .clicked 클래스 추가
      this.classList.toggle('clicked');
    });
  });
});


document.addEventListener('DOMContentLoaded', function() {
  var whereButton = document.querySelector('.where-button');
  var whenButton = document.querySelector('.when-button');
  var guestButton = document.querySelector('.guest-button');
  var clickDivs = document.querySelectorAll('.click-div');

  whereButton.addEventListener('click', function() {
    // 모든 clickDivs 요소에서 .clicked 클래스 제거
    clickDivs.forEach(function(clickDiv) {
      clickDiv.classList.remove('clicked');
    });

    // 첫 번째 clickDiv에 .clicked 클래스 추가
    clickDivs[0].classList.add('clicked');
  });

  whenButton.addEventListener('click', function() {
    // 모든 clickDivs 요소에서 .clicked 클래스 제거
    clickDivs.forEach(function(clickDiv) {
      clickDiv.classList.remove('clicked');
    });

    // 두 번째 clickDiv에 .clicked 클래스 추가
    clickDivs[1].classList.add('clicked');
  });

  guestButton.addEventListener('click', function() {
    // 모든 clickDivs 요소에서 .clicked 클래스 제거
    clickDivs.forEach(function(clickDiv) {
      clickDiv.classList.remove('clicked');
    });

    // 네 번째 clickDiv에 .clicked 클래스 추가
    clickDivs[3].classList.add('clicked');
  });
});
