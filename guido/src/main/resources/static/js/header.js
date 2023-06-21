
/* ***** 헤더 검색 모달창 ***** */
const mainSearchBox = document.querySelector('.main-search-box');
const searchBoxClickBox = document.querySelector('.search-box-click-box');

const whereButton = document.querySelector('.where-button');
const whenButton = document.querySelector('.when-button');
const guestButton = document.querySelector('.guest-button');
/* const searchIcon = document.querySelector('.search-icon'); */

const whereButtonClick = document.querySelector('.where-btn-click');
const checkInButtonClick = document.querySelector('.in-btn-click');
const checkOutButtonClick = document.querySelector('.out-btn-click');
const guestButtonClick = document.querySelector('.guest-btn-click');

const whereModal = document.querySelector('.where-modal-bg');
const whenModal = document.querySelector('.when-modal-bg');
const guestModal = document.querySelector('.guest-modal-bg');

const modalsBG = document.querySelectorAll('.modal');

/* searchIcon.addEventListener('click', () => {
  mainSearchBox.style.display = 'none';
  searchBoxClickBox.style.display = 'block';
}); */

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


/* *** 게스트 수 업다운 *** */
// 마이너스 버튼 클릭 이벤트 핸들러
document.querySelector('.main--right__guest-minus').addEventListener('click', function() {
  // 현재 게스트 수 가져오기
  var guestCountElement = document.querySelector('.main--right__guest-count');
  var guestCount = parseInt(guestCountElement.innerHTML);

  // 게스트 수가 0보다 크면 감소시키기
  if (guestCount > 0) {
    guestCount--;
    guestCountElement.innerHTML = guestCount;
  }
});

// 플러스 버튼 클릭 이벤트 핸들러
document.querySelector('.main--right__guest-plus').addEventListener('click', function() {
  // 현재 게스트 수 가져오기
  var guestCountElement = document.querySelector('.main--right__guest-count');
  var guestCount = parseInt(guestCountElement.innerHTML);

  // 게스트 수 증가시키기
  guestCount++;
  guestCountElement.innerHTML = guestCount;
});

/* 
function toggleModal(modal) {
  modal.classList.toggle('show');
} 
*/


/* *** 모달창 닫기 *** */
/* const modalsBG = document.querySelectorAll('.modal'); */

/* modalsBG.forEach(modal => {
  modal.addEventListener('click', () => {
    modal.style.display = 'none';
    mainSearchBox.style.display = 'flex';
    searchBoxClickBox.style.display = 'none';
  });
}); */

document.addEventListener('DOMContentLoaded', function() {
  // 모달 요소들을 가져옵니다.
  var modals = document.querySelectorAll('.modal');

  // 각 모달 요소에 이벤트 리스너를 추가합니다.
  modals.forEach(function(modal) {
    // 모달 이외의 영역을 클릭하면 모달이 닫히도록 합니다.
    modal.addEventListener('click', function(event) {
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

