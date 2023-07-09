let currentPage = 0;
const prevBtn = document.querySelector('.back-btn');
const nextBtn = document.querySelector('.next-btn');
const sbmtBtn = document.getElementById('submitBtn');
const pages = document.getElementsByClassName('page');
const regionName = document.getElementById('regionName');
const themeList = document.getElementsByClassName('theme-list');

const progressBar = document.querySelector('.progress');
const btnContainer = document.getElementById('btnContainer');
// const tourBox = document.getElementbyClassName('tour-box');
var body = document.querySelector('body');
// sbmtBtn.classList.add('.hidden');
const updatePage = () => {
  nextBtn.disabled = false;

  progressBar.style.width = ((currentPage + 1) / pages.length) * 100 + '%';
  for (let i = 0; i < pages.length; i++)
    if (i == currentPage) {
      pages[i].classList.add('current', 'show');
    } else {
      pages[i].classList.remove('current');
    }

  prevBtn.style.display = 'block';

  // if (currentPage == 0) {
  // }
  // if (currentPage == 1) {
  //   document.querySelector('.text2').innerHTML = '';
  //   typing2();
  //   updateNextBtnCity();
  // }
  // if (currentPage == 2) {
  //   document.querySelector('.text6').innerHTML = '';
  //   typing6();
  //   init();
  //   // checkTourCourse();
  // }
  // if (currentPage == 3) {
  //   updateNextBtnState();
  //   document.querySelector('.text3').innerHTML = '';
  //   typing3();
  // }
  // if (currentPage == 4) {
  //   document.querySelector('.text5').innerHTML = '';
  //   typing5();
  //   disableNextButtonCheckNum();
  //   disableNextButtonCheckNum2();
  // }
  // if (currentPage == 5) {
  //   document.querySelector('.text4').innerHTML = '';
  //   typing4();
  //   disableNextButtonFeeInput();
  // }
  // if (currentPage == 6) {
  //   document.querySelector('.text7').innerHTML = '';
  //   typing7();
  //   checkImage();
  // }
  // if (currentPage == 7) {
  //   document.querySelector('.text8').innerHTML = '';
  //   typing8();
  //   titleCharCheck();
  //   inputTitle.focus();
  // }
  // if (currentPage == 8) {
  //   document.querySelector('.text9').innerHTML = '';
  //   typing9();
  //   contentCharCheck();
  //   inputContent.focus();
  // }
  // if (currentPage == 11) {
  //   disableNextButton();
  // }
};

prevBtn.addEventListener('click', () => {
  if (currentPage > 0) currentPage--;
  updatePage();
});

nextBtn.addEventListener('click', () => {
  if (currentPage < pages.length) currentPage++;
  updatePage();
});

updatePage();

// 당일투어 클릭 시 productyPackage = 1 (value = 1 로 지정)
const onedayTourValue = document.querySelector('#onedayTour');
function updateTourValue() {
  onedayTourValue.setAttribute('name', 'productPackage');
  onedayTourValue.value = '1';
}
function updateTourValue2() {
  onedayTourValue.value = '';
  onedayTourValue.removeAttribute('name');
}

function updateTourValue3() {
  onedayTourValue.removeAttribute('name');
  inputTimeHidden.removeAttribute('name');
}
var selectedElement = null;
const tourThemeItems = document.querySelectorAll('[name="tourTheme"]');

// const checkTheme = () => {
//   nextBtn.disabled = true;
//   for (var i = 0; i < themeList.length; i++) {
//     themeList[i].addEventListener('change', function () {
//       let isChecked = false;

//       for (let j = 0; j < themeList.length; j++) {
//         if (themeList[j].checked) {
//           isChecked = true;
//           break;
//         }
//       }
//       nextBtn.disabled = !isChecked;
//     });
//   }
// };
function updateNextBtnState() {
  let isChecked = false;
  for (let i = 0; i < themeList.length; i++) {
    if (themeList[i].checked) {
      isChecked = true;
      break;
    }
  }
  nextBtn.disabled = !isChecked;
}

for (let i = 0; i < themeList.length; i++) {
  themeList[i].addEventListener('change', updateNextBtnState);
}

const tourTypes = document.querySelectorAll('.tour-type');
const inputTourDay = document.querySelector('#tourDay');
const inputTourTime = document.querySelector('#tourTime');
const inputDay = document.querySelector('#inputDay');
const inputDayHidden = document.querySelector('#inputDayHidden');
const inputTime = document.querySelector('#inputTime');
const inputTimeHidden = document.querySelector('#inputTimeHidden');
const inputWarning = document.querySelector('#inputWarning');
// 초기값 설정

tourTypes.forEach(function (tourType) {
  tourType.addEventListener('click', function () {
    // 배경색 초기화
    tourTypes.forEach(function (type) {
      type.style.backgroundColor = '';
      type.style.borderColor = '';
    });

    // 클릭한 span 요소의 배경색 변경
    this.style.backgroundColor = 'rgb(185, 215, 218)';
    this.style.borderColor = 'rgb(59, 119, 124)';

    // Check if the clicked span is the "1박 이상 패키지"
    if (this.innerText === '1박 이상 패키지') {
      inputTourDay.style.display = 'block';

      // Check if the input value is not empty
      if (inputDay.value !== '') {
        nextBtn.disabled = false;
      } else {
        nextBtn.disabled = true;
      }
    } else {
      inputTourDay.style.display = 'none';
      nextBtn.disabled = false;
    }

    if (this.innerText === '당일투어') {
      inputTourTime.style.display = 'block';

      // Check if the input value is not empty
      if (inputTimeHidden.value !== '') {
        nextBtn.disabled = false;
      } else {
        nextBtn.disabled = true;
      }
    } else {
      inputTourTime.style.display = 'none';
      // nextBtn.disabled = false;
    }
  });

  nextBtn.disabled = true;
});
inputDay.addEventListener('input', function () {
  if (this.value !== '') {
    inputTime.value = '';
    inputDayHidden.value = inputDay.value;
    inputDay.addEventListener('input', function () {
      const value = inputDay.value;

      if (!value || isNaN(value)) {
        inputDay.style.borderColor = 'red';
        inputDay.style.backgroundColor = 'rgb(255,232,232)';
        inputWarning.style.display = 'flex';
        nextBtn.disabled = true;
      } else {
        inputDay.style.backgroundColor = '';
        inputWarning.style.display = 'none';
        inputDay.style.borderColor = 'white';
        inputDay.style.backgroundColor = 'white';
      }
    });
    nextBtn.disabled = false;
  } else {
    nextBtn.disabled = true;
  }
});
inputTime.addEventListener('input', function () {
  if (this.value !== '') {
    inputDay.value = '';
    inputTimeHidden.value = inputTime.value;
    inputTime.addEventListener('input', function () {
      const value = inputTime.value;

      if (!value || isNaN(value)) {
        inputTime.style.borderColor = 'red';
        inputTime.style.backgroundColor = 'rgb(255,232,232)';
        inputWarning.style.display = 'flex';
        nextBtn.disabled = true;
      } else {
        inputTime.style.backgroundColor = '';
        inputWarning.style.display = 'none';
        inputTime.style.borderColor = 'white';
        inputTime.style.backgroundColor = 'white';
      }
    });
    nextBtn.disabled = false;
  } else {
    nextBtn.disabled = true;
  }
});

// 여행 테마 선택 체크박스

// 지도

const textElements = document.getElementsByClassName('TEXT');
const clickElements = document.getElementsByClassName('OUTLINE');
const city = document.getElementById('space');
const checkSpace = document.getElementById('checkSpace');

for (let i = 0; i < clickElements.length; i++) {
  clickElements[i].addEventListener('click', () => {
    // 기존 클릭한 요소의 효과 초기화
    for (let j = 0; j < clickElements.length; j++) {
      if (i !== j) {
        clickElements[j].style.fill = '#333';
        clickElements[j].style.transform = 'none';

        clickElements[j].style.fill = '#333';
        clickElements[j].style.transform = 'none';
      }
    }

    // 선택한 요소에 효과 설정
    city.innerText = textElements[i].innerHTML;
    regionName.value = city.innerText;
    clickElements[i].style.fill = 'rgb(59, 119, 124)';
  });

  textElements[i].addEventListener('click', () => {
    // 기존 클릭한 요소의 효과 초기화
    for (let j = 0; j < clickElements.length; j++) {
      if (i !== j) {
        clickElements[j].style.fill = '#333';
        s;
        clickElements[j].style.transform = 'none';
      } else {
        clickElements[j].style.fill = 'rgb(59, 119, 124)';
      }
      city.innerText = textElements[i].innerHTML;
      regionName.value = city.innerText;
    }

    // 선택한 요소에 효과 설정
    city.innerText = textElements[i].innerHTML;
    clickElements[i].style.fill = 'rgb(59, 119, 124)';
    checkSpace.innerText = textElements[i].innerHTML;
  });
}
for (let i = 0; i < clickElements.length; i++) {
  textElements[i].addEventListener('mouseover', () => {
    clickElements[i].style.fill = 'rebeccapurple';
  });
  textElements[i].addEventListener('mouseout', () => {
    clickElements[i].style.fill = '#333';
  });
}

// function disableNextButton() {
//   nextBtn.disabled = true;
// }
//2페이지일 때 width 800px로 조정
window.addEventListener('DOMContentLoaded', function () {
  var mainElement = document.getElementById('page2');
  if (mainElement) {
    mainElement.style.width = '800px';
  }
  var mainElement2 = document.getElementById('page3');
  if (mainElement2) {
    mainElement2.style.width = '750px';
  }
  var mainElement3 = document.getElementById('page4');
  if (mainElement3) {
    mainElement3.style.width = '500px';
  }
  var mainElement4 = document.getElementById('page5');
  if (mainElement4) {
    mainElement4.style.width = '600px';
  }
  var mainElement5 = document.getElementById('page6');
  if (mainElement5) {
    mainElement5.style.width = '700px';
  }
  var mainElement7 = document.getElementById('page8');
  if (mainElement7) {
    mainElement7.style.width = '800px';
  }
  var mainElement8 = document.getElementById('page9');
  if (mainElement8) {
    mainElement8.style.width = '850px';
  }
  var mainElement9 = document.getElementById('page10');
  if (mainElement9) {
    mainElement9.style.width = '850px';
  }
  var mainElement12 = document.getElementById('page13');
  if (mainElement12) {
    mainElement12.style.width = '750px';
  }
  var mainElement10 = document.getElementById('page11');
  if (mainElement10) {
    mainElement10.style.width = '850px';
  }
  var mainElement14 = document.getElementById('page15');
  if (mainElement14) {
    mainElement14.style.width = '70%';
  }
});
//3페이지
const tourThemes = document.querySelectorAll('.theme-img');

//6페이지
const inputTitle = document.getElementById('inputTitle'); // 제목 input
const titleCountContainer = document.getElementById('titleCountContainer'); // 제목 글자 수 카운트컨테이너
const titleCharCount = document.getElementById('titleCharCount'); // 제목 글자 수 표시 div
const checkName = document.getElementById('checkName');

const titleWarning = document.querySelector('#titleWarning');
// 타이틀 입력에 따른 다음 버튼 활성화/비활성화
const titleCharCheck = () => {
  const remainingChars = inputTitle.value.length;
  titleCharCount.textContent = String(remainingChars);
  if (remainingChars > 75) {
    titleCountContainer.classList.add('red');
    inputTitle.style.borderColor = 'red';
    inputTitle.style.backgroundColor = 'rgb(255,232,232)';
    nextBtn.disabled = true;
    titleWarning.style.display = 'flex';
  } else if (remainingChars == 0) {
    inputTitle.style.backgroundColor = '';
    nextBtn.disabled = true;
  } else if (remainingChars > 0) {
    inputTitle.style.backgroundColor = '#b1d8da';
    titleWarning.style.display = 'none';
    inputTitle.style.borderColor = 'black';
    titleCountContainer.classList.remove('red');
    nextBtn.disabled = false;
    checkName.innerText = inputTitle.value;
    checkModalName.innerText = inputTitle.value;
  } else {
    titleCountContainer.classList.remove('red');
    inputTitle.style.borderColor = 'black';
    inputTitle.style.backgroundColor = '';
    nextBtn.disabled = false;
    titleWarning.style.display = 'none';
  }
};

inputTitle.addEventListener('input', titleCharCheck);

const inputContent = document.getElementById('inputContent'); // 제목 input
const contentCountContainer = document.getElementById('contentCountContainer'); // 제목 글자 수 카운트컨테이너
const contentCharCount = document.getElementById('contentCharCount'); // 제목 글자 수 표시 div

const contentWarning = document.querySelector('#contentWarning');
// 타이틀 입력에 따른 다음 버튼 활성화/비활성화
const contentCharCheck = () => {
  const remainingChars2 = inputContent.value.length;
  contentCharCount.textContent = String(remainingChars2);
  if (remainingChars2 > 1000) {
    contentCountContainer.classList.add('red');
    inputContent.style.borderColor = 'red';
    inputContent.style.backgroundColor = 'rgb(255,232,232)';
    nextBtn.disabled = true;
    contentWarning.style.display = 'flex';
  } else if (remainingChars2 == 0) {
    nextBtn.disabled = true;
    inputContent.style.backgroundColor = '';
    contentCountContainer.classList.remove('red');
    inputContent.style.borderColor = 'black';
    contentWarning.style.display = 'none';
  } else if (remainingChars2 > 0) {
    inputContent.style.backgroundColor = '#b1d8da';
    contentCountContainer.classList.remove('red');
    contentWarning.style.display = 'none';
    inputContent.style.borderColor = 'black';
    nextBtn.disabled = false;
    checkModalContent.innerText = inputContent.value;
  } else {
    contentCountContainer.classList.remove('red');
    inputContent.style.borderColor = 'black';
    inputContent.style.backgroundColor = 'white';
    nextBtn.disabled = false;
    contentWarning.style.display = 'none';
  }
};
inputContent.addEventListener('input', contentCharCheck);

const checkbox = document.getElementById('refundCheck');
function disableNextButtonFeeInput() {
  if (feeInput.value == '') {
    nextBtn.disabled = true;
  }
}
function disableNextButton() {
  // Check if the checkbox is checked
  if (!checkbox.checked) {
    // Enable the next button
    nextBtn.disabled = true;
  } else {
    // Disable the next button
    nextBtn.disabled = false;
  }
}
function disabledThemeList() {
  for (let i = 0; i < themeList.length; i++) {
    if (!themeList[i].checked) {
      nextBtn.disabled = true;
    } else {
      nextBtn.disabled = false;
    }
  }
}

function disableNextButtonCheckNum() {
  // Check if the checkbox is checked
  if (maxInput.value == '' || minInput.value == '') {
    // Enable the next button
    nextBtn.disabled = true;
  } else {
    // Disable the next button
    nextBtn.disabled = false;
  }
}
function disableNextButtonCheckNum2() {
  if (maxInput2.value == '') {
    nextBtn.disabled = true;
  } else {
    nextBtn.disabled = false;
  }
}

// Add an event listener to the checkbox
checkbox.addEventListener('change', disableNextButton);

window.addEventListener('resize', function () {
  if (window.innerHeight <= 800) {
    var confirmTextContainer = document.querySelector('#page10');
    var greetingContainer = document.querySelector('#greeting');
    // confirmTextContainer.style.transform = 'scale(0.8)';
    // greetingContainer.style.marginTop = '50px';
  } else {
    var confirmTextContainer = document.querySelector('#page10');
    var greetingContainer = document.querySelector('#greeting');
    // confirmTextContainer.style.transform = 'none';
    // greetingContainer.style.marginTop = '130px';
  }
});

//8페이지(구매 시 유의 사항(추가비용 입력)
function addElement() {
  var input = document.getElementById('addPrice');
  var value = input.value;

  if (value !== '') {
    var container = document.getElementById('add-container');
    var warningMessage = document.querySelector('#addWarning');

    // Check if the value already exists in the container
    var existingElements = container.getElementsByClassName('added-element');
    for (var i = 0; i < existingElements.length; i++) {
      if (existingElements[i].textContent === value) {
        warningMessage.style.display = 'flex';
        return;
      }
    }

    // Hide the warning message if input value has changed
    if (warningMessage.style.display === 'flex') {
      warningMessage.style.display = 'none';
    }

    var newElement = document.createElement('label');
    newElement.classList.add('added-element');

    var newInputElement = document.createElement('input');
    newInputElement.setAttribute('name', 'productAddNotes');
    newInputElement.setAttribute('type', 'hidden');

    var deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa-sharp', 'fa-solid', 'fa-xmark');
    deleteIcon.style.color = '#000000';

    deleteIcon.addEventListener('click', function (e) {
      e.stopPropagation();
      deleteIcon.parentNode.remove();
    });

    newElement.innerHTML = value;
    newElement.appendChild(deleteIcon);

    newInputElement.value = value;

    container.appendChild(newElement);
    container.appendChild(newInputElement);

    input.value = '';
  }
}

var input = document.getElementById('addPrice');
input.addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    addElement();
  }
});

var addBtn = document.querySelector('#addBtn');
addBtn.addEventListener('click', function (event) {
  event.preventDefault();
  addElement();
});

//상품 검토 모달창
function openModal() {
  var modal = document.getElementById('modal');
  modal.style.display = 'block';
}

function closeModal() {
  var modal = document.getElementById('modal');
  modal.style.display = 'none';
}

window.onclick = function (event) {
  var modal = document.getElementById('modal');
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};
// 요금설정

//숫자 이외 텍스트(문자포함) 막기

// $('#feeInput').on('keydown', (e) => {
//   let keyCode = e.keyCode || e.which;
//   let allowedKeys = [8, 37, 39]; // 백스페이스(8), 왼쪽 화살표(37), 오른쪽 화살표(39)

//   if (
//     !(
//       (keyCode >= 48 && keyCode <= 57) || // 0-9
//       (keyCode >= 96 && keyCode <= 105) || // Numpad 0-9
//       allowedKeys.includes(keyCode)
//     )
//   ) {
//     e.preventDefault();
//   }
// });
$('#inputDay').on('input', (e) => {
  let v = e.currentTarget.value;
  if (/[ㄱ-힣]+/.test(v)) {
    e.currentTarget.value = v.replaceAll(/[ㄱ-힣]+/g, '');
  } else {
    e.currentTarget.value = v.replace(/[a-zA-Z]+|[^\w\s]|_/g, '');
  }
});
$('#inputTime').on('input', (e) => {
  let v = e.currentTarget.value;
  if (/[ㄱ-힣]+/.test(v)) {
    e.currentTarget.value = v.replaceAll(/[ㄱ-힣]+/g, '');
  } else {
    e.currentTarget.value = v.replace(/[a-zA-Z]+|[^\w\s]|_/g, '');
  }
});

$('#feeInput').on('input', (e) => {
  let v = e.currentTarget.value;
  if (/[ㄱ-힣]+/.test(v)) {
    e.currentTarget.value = v.replaceAll(/[ㄱ-힣]+/g, '');
  } else {
    e.currentTarget.value = v.replace(/[a-zA-Z]+|[^\w\s]|_/g, '');
  }
});

function addCommas(input) {
  let value = input.value.replace(/\D/g, ''); // 숫자 외의 문자 제거
  let formattedValue = '';

  while (value.length > 3) {
    formattedValue = ',' + value.slice(-3) + formattedValue;
    value = value.slice(0, -3);
  }
  formattedValue = '₩' + value + formattedValue;
  input.value = formattedValue;
}
const minPrice = document.querySelector('#minPrice');
const minTotal = document.querySelector('#minTotal');
const maxTotal2 = document.querySelector('#maxTotal2');
const maxFee2 = document.querySelector('#maxFee2');
const maxPrice2 = document.querySelector('#maxPrice2');
const checkFee = document.querySelector('#checkFee');
const productPrice = document.querySelector(
  '#page13 > div.set-fee > div > input[type=hidden]:nth-child(2)'
);
document.getElementById('feeInput').addEventListener('input', (e) => {
  addCommas(e.target);
  if (feeInput.value === '₩') {
    nextBtn.disabled = true;
  } else if (feeInput.value === '') {
    nextBtn.disabled = true;
  } else {
    nextBtn.disabled = false;
  }
  var value = feeInput.value;
  minPrice.innerText =
    '₩ ' +
    parseInt(value.replace(/[^0-9]/g, '') * minInput.value).toLocaleString() +
    '원';

  //최소수입
  minFee.innerText =
    '₩ ' +
    parseInt(
      (value.replace(/[^0-9]/g, '') * minInput.value) / 10
    ).toLocaleString() +
    '원';
  minTotal.innerText =
    '₩ ' +
    parseInt(
      value.replace(/[^0-9]/g, '') * minInput.value * 0.9
    ).toLocaleString() +
    '원';

  // 최대수입
  maxPrice.innerText =
    '₩ ' +
    parseInt(value.replace(/[^0-9]/g, '') * maxInput.value).toLocaleString() +
    '원';

  maxFee.innerText =
    '₩ ' +
    parseInt(
      (value.replace(/[^0-9]/g, '') * maxInput.value) / 10
    ).toLocaleString() +
    '원';
  maxTotal.innerText =
    '₩ ' +
    parseInt(
      value.replace(/[^0-9]/g, '') * maxInput.value * 0.9
    ).toLocaleString() +
    '원';

  //1박 이상 투어
  maxPrice2.innerText =
    '₩ ' + parseInt(value.replace(/[^0-9]/g, '')).toLocaleString() + '원';

  maxFee2.innerText =
    '₩ ' + parseInt(value.replace(/[^0-9]/g, '') / 10).toLocaleString() + '원';
  maxTotal2.innerText =
    '₩ ' + parseInt(value.replace(/[^0-9]/g, '') * 0.9).toLocaleString() + '원';
  checkFee.innerText =
    '₩ ' + parseInt(value.replace(/[^0-9]/g, '')).toLocaleString() + '원';
});

document.getElementById('feeInput').addEventListener('change', (e) => {
  minTotal.backgroundColor = 'red';
});

function addCurrencySymbol(input) {
  let value = input.value.replace(/[₩]/g, ''); // 기존의 ₩ 기호 제거
  let formattedValue = '₩' + value;
  input.value = formattedValue;
}

document.getElementById('feeInput').addEventListener('input', (e) => {
  addCurrencySymbol(e.target);
  document.getElementsByName('productPrice')[0].value = feeInput.value.replace(
    /[^0-9]/g,
    ''
  );
});

document.getElementById('feeInput').addEventListener('click', (e) => {
  if (e.target.clicked) {
    e.target.style.backgroundColor = 'red';
  } else {
    e.target.style.backgroundColor = '';
  }
});
document.addEventListener('click', (e) => {
  var input = document.getElementById('feeInput');

  // 입력 필드 이외의 요소를 클릭한 경우 배경색 초기화
  if (e.target !== input) {
    input.style.backgroundColor = '';
  }
});
const feeInput = document.getElementById('feeInput');
feeInput.addEventListener('click', (e) => {
  var input = document.getElementById('feeInput');
  var currentColor = input.style.borderColor;

  if (currentColor === 'red') {
    e.target.style.borderColor = 'black';
  } else {
    e.target.style.borderColor = 'lightgray';
  }
});
feeInput.addEventListener('keydown', (e) => {
  maxTotal2.style.backgroundColor = '#408c8c';
  maxTotal2.style.color = 'white';
  maxTotal2.style.transitionDuration = '0.3s';
});
feeInput.addEventListener('keyup', (e) => {
  maxTotal2.style.backgroundColor = 'white';
  maxTotal2.style.color = 'black';
  maxTotal2.style.transitionDuration = '0.3s';
});

// .replace(/[^0-9]/g, '');

// "document.getElementsByName('productPrice')[0].value" = extractedNumber;
//이미지 업로드
const preview = document.getElementsByClassName('preview');
const inputImage = document.getElementsByClassName('input-image');
const deleteImage = document.getElementsByClassName('delete-image');
const border = document.querySelectorAll('.productImg > label');
const addImage = document.querySelectorAll('.add-image');
const addImage2 = document.querySelectorAll('.add-image2');
const addImage3 = document.querySelectorAll('.add-image3');
const checkImg = document.querySelector('#checkImg');
const checkModalImg = document.querySelector('#checkModalImg');
const checkModalContent = document.querySelector('#checkModalContent');
const checkModalName = document.querySelector('#checkModalName');

for (let i = 0; i < inputImage.length; i++) {
  //파일이 선택되거나, 선택 후 취소 되었을 때
  inputImage[i].addEventListener('change', (e) => {
    const file = e.target.files[0]; // 선택된 파일의 데이터
    if (file != undefined) {
      // 파일이 선택 되었을 때
      const reader = new FileReader(); // 파일을 읽는 객체

      reader.readAsDataURL(file);
      // 지정된 파일을 읽은 후 result 변수에 url 형식으로 저장

      reader.onload = (e) => {
        // 파일을 다 읽은 후 수행
        preview[i].setAttribute('src', e.target.result);
        border[i].style.border = 'none';
        deleteImage[i].style.display = 'block';
        addImage[i].style.display = 'none';
        addImage2[i].style.display = 'none';
        addImage3[i].style.display = 'none';
        checkImg.src = preview[0].getAttribute('src');
        checkModalImg.src = preview[0].getAttribute('src');
      };
    } else {
      // 선택 후 취소 되었을 때
      // -> 선택된 파일 없음 -> 미리보기 삭제

      preview[i].removeAttribute('src');
      border[i].style.border = '2px dashed #ccc';
      deleteImage[i].style.display = 'none';
      addImage[i].style.display = 'block';
      addImage2[i].style.display = 'block';
      addImage3[i].style.display = 'block';
    }

    deleteImage[i].addEventListener('click', () => {
      if (preview[i].getAttribute('src') != '') {
        preview[i].removeAttribute('src');

        inputImage[i].value = '';
        border[i].style.border = '2px dashed #ccc';
        deleteImage[i].style.display = 'none';
        addImage[i].style.display = 'block';
        addImage2[i].style.display = 'block';
        addImage3[i].style.display = 'block';
      }
    });
  });
}
// 초기 상태에서 이벤트를 강제로 발생시킴
const changeEvent = new Event('change');
inputImage[4].dispatchEvent(changeEvent);
inputImage[5].dispatchEvent(changeEvent);
const plusImage = document.querySelectorAll('.plus-image');
for (let i = 0; i < 5; i++) {
  inputImage[i].addEventListener('change', () => {
    let allImagesSelected = true;
    for (let j = 0; j < 5; j++) {
      if (preview[j].getAttribute('src') === '') {
        allImagesSelected = false;
        break;
      }
    }

    if (allImagesSelected) {
      for (let i = 0; i < plusImage.length; i++) {
        plusImage[i].style.display = 'inline-block';
      }
      nextBtn.disabled = false;
    } else {
      nextBtn.disabled = true;
    }
  });
}

const checkImage = () => {
  for (let i = 0; i < 5; i++) {
    if (preview[i].getAttribute('src') == '') {
      nextBtn.disabled = true;
    }
  }
};
const checkTourCourse = () => {
  if (tourCourse.length == 0) {
    nextBtn.disabled = true;
  }
};
// document
//   .getElementsByClassName('create-course')[0]
//   .addEventListener('change', () => {
//     if (tourCourse.length == 0) {
//       nextBtn.disabled = true;
//     } else {
//       nextBtn.disabled = false;
//     }
//   });
// 이미지 업로드  5장 이상 업로드 시 이미지 업로드 요소 추가
const imgId1 = document.getElementById('imgId1');
const imgId2 = document.getElementById('imgId2');
const imgId3 = document.getElementById('imgId3');
const imgId4 = document.getElementById('imgId4');
const imgId5 = document.getElementById('imgId5');
const imgId6 = document.getElementById('imgId6');
const imgId7 = document.getElementById('imgId7');
const imgId8 = document.getElementById('imgId8');

$('#minInput').on('input', (e) => {
  let v = e.currentTarget.value;
  if (/[ㄱ-힣]+/.test(v)) {
    e.currentTarget.value = v.replaceAll(/[ㄱ-힣]+/g, '');
  } else {
    e.currentTarget.value = v.replace(/[a-zA-Z]+|[^\w\s]|_/g, '');
  }
});
$('#maxInput').on('input', (e) => {
  let v = e.currentTarget.value;
  if (/[ㄱ-힣]+/.test(v)) {
    e.currentTarget.value = v.replaceAll(/[ㄱ-힣]+/g, '');
  } else {
    e.currentTarget.value = v.replace(/[a-zA-Z]+|[^\w\s]|_/g, '');
  }
});
$('#maxInput2').on('input', (e) => {
  let v = e.currentTarget.value;
  if (/[ㄱ-힣]+/.test(v)) {
    e.currentTarget.value = v.replaceAll(/[ㄱ-힣]+/g, '');
  } else {
    e.currentTarget.value = v.replace(/[a-zA-Z]+|[^\w\s]|_/g, '');
  }
});
const minInput = document.getElementById('minInput');
const maxInput = document.getElementById('maxInput');
const maxMinWarn = document.getElementById('maxMinWarn');
const minTouristNum = document.querySelectorAll('.minTouristNum');
const maxTouristNum = document.querySelectorAll('.maxTouristNum');
const maxTouristNum2 = document.querySelectorAll('.maxTouristNum2');
const maxInput2 = document.getElementById('maxInput2');
const maxTouristName = document.querySelector('[name="maxTourist"]');
const minTouristName = document.querySelector('[name="minTourist"]');
const minFeeNone = document.querySelectorAll('.min-fee-none');
const dayFee = document.querySelector('.day-fee');

function validateMinMaxInput() {
  maxInput2.style.display = 'none';
  const minVal = Number(minInput.value);
  const maxVal = Number(maxInput.value);

  if (
    minVal <= maxVal &&
    minVal !== 0 &&
    maxVal !== 0 &&
    minInput.value !== '' &&
    maxInput.value !== ''
    // minVal &&
    // maxVal <= 30
  ) {
    maxMinWarn.style.display = 'none';
    nextBtn.disabled = false;
    minInput.style.backgroundColor = '#b1d8da';
    maxInput.style.backgroundColor = '#b1d8da';
  } else {
    nextBtn.disabled = true;
    maxMinWarn.style.display = 'block';
    minInput.style.backgroundColor = 'rgb(252, 171, 171)';
  }
  maxTouristName.value = maxVal;
  minTouristName.value = minVal;
}
inputDay.addEventListener('input', () => {
  if (inputDay.value > 0) {
    minTouristNum[0].style.display = 'none';
    minTouristNum[1].style.display = 'none';
    minInput.style.display = 'none';
    maxTouristNum[0].style.display = 'none';
    maxTouristNum[1].style.display = 'none';
    maxInput.style.display = 'none';
    maxTouristNum2[0].style.display = 'block';
    maxTouristNum2[1].style.display = 'block';
    minFeeNone[0].style.display = 'none';
    minFeeNone[1].style.display = 'none';
    dayFee.style.display = 'flex';
  } else {
    minTouristNum[0].style.display = 'block';
    minTouristNum[1].style.display = 'block';
    minFeeNone[0].style.display = 'flex';
    minFeeNone[1].style.display = 'flex';
    dayFee.style.display = 'none';
  }
  maxTouristName.value = '';
  minTouristName.value = '';
});

inputTime.addEventListener('input', () => {
  if (inputTime.value > 0) {
    minTouristNum[0].style.display = 'block';
    minTouristNum[1].style.display = 'block';
    minInput.style.display = 'block';
    maxTouristNum[0].style.display = 'block';
    maxTouristNum[1].style.display = 'block';
    maxInput.style.display = 'block';
    maxTouristNum2[0].style.display = 'none';
    maxTouristNum2[1].style.display = 'none';
    minFeeNone[0].style.display = 'flex';
    minFeeNone[1].style.display = 'flex';
    dayFee.style.display = 'none';
  } else {
    minTouristNum[0].style.display = 'none';
    minTouristNum[1].style.display = 'none';
    minFeeNone[0].style.display = 'none';
    minFeeNone[1].style.display = 'none';
    dayFee.style.display = 'flex';
  }
  maxTouristName.value = '';
});

minInput.addEventListener('input', validateMinMaxInput);
maxInput.addEventListener('input', validateMinMaxInput);
maxInput2.addEventListener('input', validateMinMaxInput2);
function validateMinMaxInput2() {
  const maxVal2 = Number(maxInput2.value);

  if (maxVal2 > 0) {
    nextBtn.disabled = false;
    maxInput2.style.backgroundColor = '#b1d8da';
  } else {
    nextBtn.disabled = true;
    maxInput2.style.backgroundColor = 'rgb(252, 171, 171)';
  }
  maxTouristName.value = maxVal2;
  minTouristName.value = 1;
}

const form = document.getElementById('productUploadFrm');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById('tourCourse').value = JSON.stringify(tourCourse);
  document.getElementById('productDate').value = JSON.stringify(productDate);
  console.log(document.getElementById('tourCourse').value);
  console.log(document.getElementById('productDate').value);
  // form.submit();
});
