let currentPage = 0;
const prevBtn = document.querySelector('.back-btn');
const nextBtn = document.querySelector('.next-btn');
const sbmtBtn = document.getElementById('submitBtn');
const pages = document.getElementsByClassName('page');
const regionName = document.getElementById('regionName');

const progressBar = document.querySelector('.progress');
const btnContainer = document.getElementById('btnContainer');
// const tourBox = document.getElementbyClassName('tour-box');
var body = document.querySelector('body');
document.getElementById('page1').display = 'none';
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
  //   document.querySelector('.text2').innerHTML = '';
  //   typing2();
  // }
  // if (currentPage == 1) {
  //   // document.querySelector('.text5').innerHTML = '';
  //   // typing5();
  //   // tourThemeSelectCheck();
  //   // tourBoxCheck();
  // }
  if (currentPage == 0) {
    document.querySelector('.text3').innerHTML = '';
    // tourThemesCheck();
    // typing3();
  }
  if (currentPage == 2) {
    document.querySelector('.text4').innerHTML = '';
    // typing4();
  }
  if (currentPage == 4) {
    titleCharCheck();
    inputTitle.focus();
  }
  if (currentPage == 5) {
    contentCharCheck();
    inputContent.focus();
  }
  if (currentPage == 8) {
    disableNextButton();
  }
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

var selectedElement = null;
const tourThemeItems = document.querySelectorAll('[name="tourTheme"]');

function changeBackgroundColor(element) {
  if (selectedElement) {
    selectedElement.style.backgroundColor = '';
    selectedElement.style.borderColor = '';
  }
  f;
  if (selectedElement === element) {
    selectedElement = null;
  } else {
    selectedElement = element;
    element.style.backgroundColor = 'rgb(185, 215, 218)';
    element.style.borderColor = 'rgb(59, 119, 124)';
  }
  const tourBoxCheck = () => {
    let count = 0;
    tourThemeItems.forEach((element) => {
      if (count < 1 || count > 1) {
        nextBtn.disabled = true;
      } else {
        nextBtn.disabled = false;
      }
    });
  };
}
// 여행 테마 선택 체크박스

//2페이지일 때 width 800px로 조정
window.addEventListener('DOMContentLoaded', function () {
  var mainElement = document.getElementById('page2');
  if (mainElement) {
    mainElement.style.width = '800px';
  }
  var mainElement2 = document.getElementById('page1');
  if (mainElement2) {
    mainElement2.style.width = '750px';
  }
  var mainElement3 = document.getElementById('page4');
  if (mainElement3) {
    mainElement3.style.width = '800px';
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
  var mainElement10 = document.getElementById('page11');
  if (mainElement10) {
    mainElement10.style.width = '850px';
  }
  var mainElement14 = document.getElementById('page15');
  if (mainElement14) {
    mainElement14.style.width = '90%';
  }
});
//3페이지
const tourThemes = document.querySelectorAll('.theme-img');

// 4페이지
let minPrice = document.getElementById('minPrice');
let minFee = document.getElementById('minFee');
let minTotal = document.getElementById('minTotal');
let maxPrice = document.getElementById('maxPrice');
let maxFee = document.getElementById('maxFee');
let maxTotal = document.getElementById('maxTotal');

const minusBtn = document.querySelector('#minusBtn');
const plusBtn = document.querySelector('#plusBtn');

const priceRange = document.getElementById('priceRange');
const price = document.getElementById('price');

priceRange.addEventListener('input', function () {
  var result1 = document.getElementById('minResult');
  var value1 = parseInt(result1.innerHTML);
  var result2 = document.getElementById('maxResult');
  var value2 = parseInt(result2.innerHTML);

  price.textContent = priceRange.value;
  minPrice.innerText = '₩ ' + value1 * price.textContent + ' 원';
  minFee.innerText = '₩ ' + (value1 * price.textContent) / 10 + ' 원';
  minTotal.innerText = '₩ ' + value1 * price.textContent * 0.9 + ' 원';
  minPrice.innerText = '₩ ' + value1 * price.textContent + ' 원';
  minFee.innerText = '₩ ' + (value1 * price.textContent) / 10 + ' 원';
  minTotal.innerText = '₩ ' + value1 * price.textContent * 0.9 + ' 원';

  maxPrice.innerText = '₩ ' + value2 * price.textContent + ' 원';
  maxFee.innerText = '₩ ' + (value2 * price.textContent) / 10 + ' 원';
  maxTotal.innerText = '₩ ' + value2 * price.textContent * 0.9 + ' 원';
  maxPrice.innerText = '₩ ' + value2 * price.textContent + ' 원';
  maxFee.innerText = '₩ ' + (value2 * price.textContent) / 10 + ' 원';
  maxTotal.innerText = '₩ ' + value2 * price.textContent * 0.9 + ' 원';
});

function minusMin() {
  var result = document.getElementById('minResult');
  var value = parseInt(result.innerHTML);
  if (value > 0) {
    value--;
    result.innerHTML = value;
    document.getElementById('maxWarning').style.display = 'none';
  }

  minPrice.innerText = '₩ ' + value * price.textContent + ' 원';
  minFee.innerText = '₩ ' + (value * price.textContent) / 10 + ' 원';
  minTotal.innerText = '₩ ' + value * price.textContent * 0.9 + ' 원';
}

function plusMin() {
  var minResult = parseInt(document.getElementById('minResult').innerHTML);
  var maxResult = parseInt(document.getElementById('maxResult').innerHTML);
  var result = document.getElementById('minResult');
  var value = parseInt(result.innerHTML);

  if (minResult >= maxResult) {
    document.getElementById('maxWarning').style.display = 'flex';
  } else {
    value++;
    result.innerHTML = value;
    document.getElementById('maxWarning').style.display = 'none';
  }
  minPrice.innerText = '₩ ' + value * price.textContent + ' 원';
  minFee.innerText = '₩ ' + (value * price.textContent) / 10 + ' 원';
  minTotal.innerText = '₩ ' + value * price.textContent * 0.9 + ' 원';
}

function minusMax() {
  var minResult = parseInt(document.getElementById('minResult').innerHTML);
  var maxResult = parseInt(document.getElementById('maxResult').innerHTML);
  var result = document.getElementById('maxResult');
  var value = parseInt(result.innerHTML);

  if (maxResult > minResult) {
    if (value > 0) {
      value--;
      result.innerHTML = value;
    }
  } else {
    document.getElementById('maxWarning').style.display = 'flex';
  }
  maxPrice.innerText = '₩ ' + value * price.textContent + ' 원';
  maxFee.innerText = '₩ ' + (value * price.textContent) / 10 + ' 원';
  maxTotal.innerText = '₩ ' + value * price.textContent * 0.9 + ' 원';
}

function plusMax() {
  var minResult = parseInt(document.getElementById('minResult').innerHTML);
  var maxResult = parseInt(document.getElementById('maxResult').innerHTML);
  var result = document.getElementById('maxResult');
  var value = parseInt(result.innerHTML);
  value++;
  result.innerHTML = value;
  document.getElementById('maxWarning').style.display = 'none';
  if (maxResult > minResult) {
    document.getElementById('maxWarning').style.display = 'none';
  }
  maxPrice.innerText = '₩ ' + value * price.textContent + ' 원';
  maxFee.innerText = '₩ ' + (value * price.textContent) / 10 + ' 원';
  maxTotal.innerText = '₩ ' + value * price.textContent * 0.9 + ' 원';
}

//6페이지
const inputTitle = document.getElementById('inputTitle'); // 제목 input
const titleCountContainer = document.getElementById('titleCountContainer'); // 제목 글자 수 카운트컨테이너
const titleCharCount = document.getElementById('titleCharCount'); // 제목 글자 수 표시 div

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
    newInputElement.setAttribute('name', 'productAddPrice');
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
document.getElementById('feeInput').addEventListener('input', (e) => {
  addCommas(e.target);
  if (feeInput.value === '₩') {
    nextBtn.disabled = true;
  } else if (feeInput.value === '') {
    nextBtn.disabled = true;
  } else {
    nextBtn.disabled = false;
  }
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

//상품 수정 시 삭제된 이미지의 순서를 기록할 Set 객체 생성
const deleteSet = new Set(); // 순서x, 중복x
// -> x 버튼 클릭 시 순서를 한 번만 저장하는 용도

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

        deleteSet.delete(i);
        // border[i].style.border = 'none';
        // deleteImage[i].style.display = 'block';
        // addImage[i].style.display = 'none';
        // addImage2[i].style.display = 'none';
        // addImage3[i].style.display = 'none';
      };
    } else {
      // 선택 후 취소 되었을 때
      // -> 선택된 파일 없음 -> 미리보기 삭제

      preview[i].removeAttribute('src');
      // border[i].style.border = '2px dashed #ccc';
      // deleteImage[i].style.display = 'none';
      // addImage[i].style.display = 'block';
      // addImage2[i].style.display = 'block';
      // addImage3[i].style.display = 'block';
    }

    deleteImage[i].addEventListener('click', () => {
      if (preview[i].getAttribute('src') != '') {
        preview[i].removeAttribute('src');

        inputImage[i].value = '';
        // border[i].style.border = '2px dashed #ccc';

        deleteSet.add(i);
        // deleteImage[i].style.display = 'none';
        // addImage[i].style.display = 'block';
        // addImage2[i].style.display = 'block';
        // addImage3[i].style.display = 'block';
      }
    });
  });
}

// 이미지 업로드  5장 이상 업로드 시 이미지 업로드 요소 추가 생성
const imgId4 = document.getElementById('imgId4');
const imgId5 = document.getElementById('imgId5');
const imgId6 = document.getElementById('imgId6');
const imgId7 = document.getElementById('imgId7');
const imgId8 = document.getElementById('imgId8');

const productEditFrm = document.getElementById('productEditFrm');

productEditFrm.addEventListener('click', (e) => {
  // input type='hidden' 태그에
  //deleteSet에 저장된 값을 "1,2,3" 형태로 변경해서 저장
  document.querySelector("[name='deleteList']").value = Array.from(deleteSet);

  // e.preventDefault();
});
