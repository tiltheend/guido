window.onload = function () {
  buildCalendar();
}; // 웹 페이지가 로드되면 buildCalendar 실행

let nowMonth = new Date(); // 현재 달을 페이지를 로드한 날의 달로 초기화
let today = new Date(); // 페이지를 로드한 날짜를 저장
today.setHours(0, 0, 0, 0); // 비교 편의를 위해 today의 시간을 초기화

// 달력 생성 : 해당 달에 맞춰 테이블을 만들고, 날짜를 채워 넣는다.
function buildCalendar() {
  let firstDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1); // 이번달 1일
  let lastDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 0); // 이번달 마지막날

  let tbody_Calendar = document.querySelector('.Calendar > tbody');
  document.getElementById('calYear').innerText = nowMonth.getFullYear(); // 연도 숫자 갱신
  document.getElementById('calMonth').innerText = leftPad(
    nowMonth.getMonth() + 1
  ); // 월 숫자 갱신

  while (tbody_Calendar.rows.length > 0) {
    // 이전 출력결과가 남아있는 경우 초기화
    tbody_Calendar.deleteRow(tbody_Calendar.rows.length - 1);
  }

  let nowRow = tbody_Calendar.insertRow(); // 첫번째 행 추가

  for (let j = 0; j < firstDate.getDay(); j++) {
    // 이번달 1일의 요일만큼
    let nowColumn = nowRow.insertCell(); // 열 추가
  }

  for (
    let nowDay = firstDate;
    nowDay <= lastDate;
    nowDay.setDate(nowDay.getDate() + 1)
  ) {
    // day는 날짜를 저장하는 변수, 이번달 마지막날까지 증가시키며 반복

    let nowColumn = nowRow.insertCell(); // 새 열을 추가하고

    let newDIV = document.createElement('p');
    newDIV.innerHTML = leftPad(nowDay.getDate()); // 추가한 열에 날짜 입력
    nowColumn.appendChild(newDIV);

    if (nowDay.getDay() == 6) {
      // 토요일인 경우
      nowRow = tbody_Calendar.insertRow(); // 새로운 행 추가
    }

    if (
      nowDay.getFullYear() == today.getFullYear() &&
      nowDay.getMonth() == today.getMonth() &&
      nowDay.getDate() == today.getDate()
    ) {
      // 오늘인 경우
      newDIV.className = 'today';
      newDIV.onclick = function () {
        choiceDate(this);
      };
    } else {
      // 미래인 경우
      newDIV.className = 'futureDay';
      newDIV.onclick = function () {
        choiceDate(this);
      };
    }
  }
}
// 선택한 날짜 productDate 객체 배열 형태로 담기
// const productDate = [];
const productOption = [];
const createDateDiv = document.getElementById('createDate');
// const checkboxes = document.querySelectorAll('.optionName-item');
const optionName = [];
let lastClickedElement = null;

// 날짜 선택
function choiceDate(newDIV) {
  // 기존에 선택한 날짜가 있으면
  const selectedDate =
    leftPad(nowMonth.getMonth() + 1) + '-' + newDIV.innerHTML;
  console.log(selectedDate);

  if (newDIV.classList.contains('choiceDay')) {
    alert('이미 선택된 날짜입니다.');
    return;
  }

  const createDateElement = document.createElement('span');
  createDateElement.innerText = selectedDate;
  createDateDiv.appendChild(createDateElement);

  // 선택된 날짜가 이전에 선택한 날짜와 동일한지 확인합니다.

  newDIV.classList.add('choiceDay'); // 선택된 날짜에 "choiceDay" class 추가

  // 체크박스 요소들을 가져온다
  const checkboxes = document.querySelectorAll('.option-name');
  // 옵션 이름들을 저장할 배열
  let selectedTimes = [];

  // 체크박스 상태가 변경될 때 실행되는 함수
  function handleCheckboxChange(event) {
    const checkbox = event.target;
    const label = checkbox.nextElementSibling; // 체크박스 다음에 위치한 label 요소

    if (checkbox.checked) {
      // 체크박스가 선택된 경우
      selectedTimes.push(label.innerText);
    } else {
      // 체크박스가 선택 해제된 경우
      const index = selectedTimes.indexOf(label.innerText);
      if (index !== -1) {
        selectedTimes.splice(index, 1);
      }
    }

    // optionName 값을 업데이트
    const optionNameValue = selectedTimes.join(','); // 선택된 시간들을 쉼표로 구분하여 문자열로 변환
    dateObject.optionName = optionNameValue;
  }

  // 체크박스 요소에 이벤트 리스너 추가
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', handleCheckboxChange);
  });

  const dateObject = {
    productDate: nowMonth.getFullYear() + '-' + selectedDate,
    optionName: '',
    availability: 'Y',
    optionRestCount: maxInput.value,
  };

  productOption.push(dateObject);
}

// 이전달 버튼 클릭
function prevCalendar() {
  nowMonth = new Date(
    nowMonth.getFullYear(),
    nowMonth.getMonth() - 1,
    nowMonth.getDate()
  ); // 현재 달을 1 감소
  buildCalendar(); // 달력 다시 생성

  // 이전에 선택한 요소가 있으면 해당 요소에 "choiceDay" class 추가
  if (lastClickedElement) {
    lastClickedElement.classList.add('choiceDay');
  }
}
// 다음달 버튼 클릭
function nextCalendar() {
  nowMonth = new Date(
    nowMonth.getFullYear(),
    nowMonth.getMonth() + 1,
    nowMonth.getDate()
  ); // 현재 달을 1 증가
  buildCalendar(); // 달력 다시 생성

  // 이전에 선택한 요소가 있으면 해당 요소에 "choiceDay" class 추가
}

// input값이 한자리 숫자인 경우 앞에 '0' 붙혀주는 함수
function leftPad(value) {
  if (value < 10) {
    value = '0' + value;
    return value;
  }
  return value;
}
