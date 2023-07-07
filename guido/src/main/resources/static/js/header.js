/* ***** 헤더 검색 모달창 ***** */

/* header 자체 */
const mainSearchBox = document.querySelector('.main-search-box');
const searchBoxClickBox = document.querySelector('.search-box-click-box');

/* 클릭 전 버튼 */
const whereButton = document.querySelector('.where-button');
const whenButton = document.querySelector('.when-button');
const guestButton = document.querySelector('.guest-button');

/* 클릭 후 버튼 */
const whereButtonClick = document.querySelector('.where-btn-click');
const checkInButtonClick = document.querySelector('.in-btn-click');
const checkOutButtonClick = document.querySelector('.out-btn-click');
const guestButtonClick = document.querySelector('.guest-btn-click');

/* 모달창 */
const whereModal = document.querySelector('.where-modal');
const whenModal = document.querySelector('.datepicker');
const guestModal = document.querySelector('.guest-modal');

/* 모달창 배경 부분 */
const modalsBG = document.querySelector('.modal-background');

/* searchIcon.addEventListener('click', () => {
  mainSearchBox.style.display = 'none';
  searchBoxClickBox.style.display = 'block';
}); */



/* *** 헤더 열고 닫기 *** */
whereButton.addEventListener('click', () => {
  mainSearchBox.style.display = 'none';
  searchBoxClickBox.style.display = 'block';
  whereModal.style.display = 'block';
  /* toggleModal(whereModal); */
  modalsBG.style.display = 'block';
});

whenButton.addEventListener('click', () => {

  // let startDateInput = document.querySelector(".form-control");
  // startDateInput.click();

  mainSearchBox.style.display = 'none';
  searchBoxClickBox.style.display = 'block';
  // whenModal.style.display = 'block'; /* ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ */
  // /* toggleModal(whenModal); */
  // modalsBG.style.display = 'block';
});

guestButton.addEventListener('click', () => {
  mainSearchBox.style.display = 'none';
  searchBoxClickBox.style.display = 'block';
  guestModal.style.display = 'flex';
  /* toggleModal(guestModal); */
  modalsBG.style.display = 'block';
});



/* *** 헤더 모달창 열기 *** */
whereButtonClick.addEventListener('click', () => {
  whereModal.style.display = 'block';
  // whenModal.style.display = 'none';
  guestModal.style.display = 'none';
});

checkInButtonClick.addEventListener('click', () => {
  // whenModal.style.display = 'block';
  whereModal.style.display = 'none';
  guestModal.style.display = 'none';
});
checkOutButtonClick.addEventListener('click', () => {
  // whenModal.style.display = 'block';
  whereModal.style.display = 'none';
  guestModal.style.display = 'none';
});

guestButtonClick.addEventListener('click', () => {
  guestModal.style.display = 'flex';
  whereModal.style.display = 'none';
  // whenModal.style.display = 'none';
});


/* *********************************************************** */
// whereModal.addEventListener('click', (event) => {
//   const clickedElement = event.target;

//   // whereModal 내부의 값을 클릭한 경우
//   if (clickedElement.classList.contains('value')) {
//     whereModal.style.display = 'none';
//     checkInButtonClick.click(); // checkInButtonClick 버튼 클릭 시 이벤트 실행
//   }
// });

// checkInButtonClick.addEventListener('click', () => {
//   // 클릭 이벤트를 통해 모달창을 열 수 있는 input 태그를 찾습니다.
//   const inputElement = document.querySelector('.form-control');
//   inputElement.click();
// });

// 클릭 이벤트 핸들러 추가
// whereModal.addEventListener("click", e => {
//   if (e.target.tagName === "div") {
//     const clickedItem = e.target.textContent; 
//     document.querySelector(".where-modal").style.display = "none";
//     location.value = clickedItem; 
//   }
// });
/* *********************************************************** */


/* 모달 회색 바탕 닫기 */
// mainSearchBox.addEventListener('click', () => {
//   modalsBG.style.display = 'block';
// });

modalsBG.addEventListener('click', () => {
  mainSearchBox.style.display = 'flex';
  searchBoxClickBox.style.display = 'none';
  // whenModal.style.display = 'none';
  whereModal.style.display = 'none';
  guestModal.style.display = 'none';
  modalsBG.style.display = 'none';
});



/* *** 헤더 모달창 닫기 *** */

// document.addEventListener('DOMContentLoaded', function() {

//   var modals = document.querySelector('.modal-background');

//   modals.forEach(function(modal) {
//     modal.addEventListener('click', function(event) {
//       if (event.target === modal) {
//         modal.style.display = 'none';
//         mainSearchBox.style.display = 'flex';
//         searchBoxClickBox.style.display = 'none';
//       }
//     });
//   });
// });



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
    clickDivs.forEach(function(clickDiv) {
      clickDiv.classList.remove('clicked');
    });

    clickDivs[0].classList.add('clicked');
  });

  whenButton.addEventListener('click', function() {
    clickDivs.forEach(function(clickDiv) {
      clickDiv.classList.remove('clicked');
    });

    clickDivs[1].classList.add('clicked');
  });

  guestButton.addEventListener('click', function() {
    clickDivs.forEach(function(clickDiv) {
      clickDiv.classList.remove('clicked');
    });

    clickDivs[3].classList.add('clicked');
  });
});



/* ***** 헤더 위치 검색 ajax ***** */
document.addEventListener("DOMContentLoaded", () =>{

  const location = document.querySelector('input[name="location"]');
  const whereModal = document.querySelector(".locations");


  location.addEventListener("keyup", e => {

    const searchTerm = location.value.trim();

    if(searchTerm.length > 0){
      fetch("/common/locationSearch?location=" + searchTerm)
      .then(resp => resp.json())
      .then(locationList => {
        console.log(locationList);

        if(locationList.length > 0){

          whereModal.classList.remove("locations");
          whereModal.innerHTML = "";

          for(let list of locationList){
            const locationDiv = document.createElement("div");

            const locationImg = document.createElement("img");
            locationImg.src = "/images/icons/location_pin.svg";

            const locationText = document.createTextNode(list);

            locationDiv.appendChild(locationImg);
            locationDiv.appendChild(locationText);

            whereModal.appendChild(locationDiv);

            // whereModal 내 검색 값 클릭하면 모달창 닫히고 startday로 마우스 커서 옮겨감 
            locationDiv.addEventListener("click", () => {
              location.value = list; 
              document.querySelector(".where-modal").style.display = "none";
              document.querySelector('input[name="firstday"]').focus();
            });
          }

        }else{
          whereModal.classList.add("locations");
        }
      })
      .catch(err => console.log(err));

    }else{
      whereModal.classList.add("locations");
    }
  })
});



/* ***** 캘린더 ***** */
$(document).ready(function(){

  $('.input-daterange').datepicker({
      format: 'yyyy-mm-dd',
      todayHighlight: true,
      startDate: '0d'
  });
});



/* ************************************** 0707 ************************************** */
// startdayModal 내 검색 값 클릭하면 모달창 닫히고 lastday로 마우스 커서 옮겨감
locationDiv.addEventListener("click", () => {
  location.value = list; 
  document.querySelector(".where-modal").style.display = "none";
  document.querySelector('input[name="lastday"]').focus();
});
// lastdayModal 내 검색 값 클릭하면 모달창 닫히고 guests로 마우스 커서 옮겨감
locationDiv.addEventListener("click", () => {
  location.value = list; 
  document.querySelector(".where-modal").style.display = "none";
  document.querySelector('input[name="firstday"]').focus();
});
/* ************************************** 0707 ************************************** */



/* ***** 게스트 수 업다운 ***** */
const guestCountElement = document.querySelector('.main--right__guest-count');
const guestInput = document.querySelector('input[name="tourist"]');

// 감소 버튼 클릭 이벤트 처리
document.querySelector('.main--right__guest-minus').addEventListener('click', () => {
    let count = parseInt(guestCountElement.textContent);
    if (count > 0) {
        count--;
        guestCountElement.textContent = count;
        updateGuestText(count);
        guestInput.value = count; // input 태그에 값 설정
    }
});

// 증가 버튼 클릭 이벤트 처리
document.querySelector('.main--right__guest-plus').addEventListener('click', () => {
    let count = parseInt(guestCountElement.textContent);
    count++;
    guestCountElement.textContent = count;
    updateGuestText(count);
    guestInput.value = count; // input 태그에 값 설정
});

// 게스트 텍스트 업데이트 함수
function updateGuestText(count) {
    const guestText = document.querySelector('.guest-button-click input');
    guestText.textContent = `게스트 ${count}명`;
}



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





