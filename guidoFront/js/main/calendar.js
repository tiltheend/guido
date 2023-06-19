document.addEventListener('DOMContentLoaded', function () {
    buildCalendar();

    document
      .getElementById('btnPrevCalendar')
      .addEventListener('click', function (event) {
        prevCalendar();
      });

    document
      .getElementById('nextNextCalendar')
      .addEventListener('click', function (event) {
        nextCalendar();
      });
  });

  var toDay = new Date(); // @param 전역 변수, 오늘 날짜 / 내 컴퓨터 로컬을 기준으로 toDay에 Date 객체를 넣어줌
  var nowDate = new Date(); // @param 전역 변수, 실제 오늘날짜 고정값

  /**
   * @brief   이전달 버튼 클릭시
   */
  function prevCalendar() {
    this.toDay = new Date(
      toDay.getFullYear(),
      toDay.getMonth() - 1,
      toDay.getDate()
    );
    buildCalendar(); // @param 전월 캘린더 출력 요청
  }

  /**
   * @brief   다음달 버튼 클릭시
   */
  function nextCalendar() {
    this.toDay = new Date(
      toDay.getFullYear(),
      toDay.getMonth() + 1,
      toDay.getDate()
    );
    buildCalendar(); // @param 명월 캘린더 출력 요청
  }

  /**
   * @brief   캘린더 오픈
   * @details 날짜 값을 받아 캘린더 폼을 생성하고, 날짜값을 채워넣는다.
   */
  function buildCalendar() {
    let doMonth = new Date(toDay.getFullYear(), toDay.getMonth(), 1);
    let lastDate = new Date(toDay.getFullYear(), toDay.getMonth() + 1, 0);

    let tbCalendar = document.querySelector('.scriptCalendar > tbody');

    document.getElementById('calYear').innerText = toDay.getFullYear(); // @param YYYY월
    document.getElementById('calMonth').innerText = autoLeftPad(
      toDay.getMonth() + 1,
      2
    ); // @param MM월

    // @details 이전 캘린더의 출력결과가 남아있다면, 이전 캘린더를 삭제한다.
    while (tbCalendar.rows.length > 0) {
      tbCalendar.deleteRow(tbCalendar.rows.length - 1);
    }

    // @param 첫번째 개행
    let row = tbCalendar.insertRow();

    // @param 날짜가 표기될 열의 증가값
    let dom = 1;

    // @details 시작일의 요일값( doMonth.getDay() ) + 해당월의 전체일( lastDate.getDate())을  더해준 값에서
    //               7로 나눈값을 올림( Math.ceil() )하고 다시 시작일의 요일값( doMonth.getDay() )을 빼준다.
    let daysLength =
      Math.ceil((doMonth.getDay() + lastDate.getDate()) / 7) * 7 -
      doMonth.getDay();

    // @param 달력 출력
    // @details 시작값은 1일을 직접 지정하고 요일값( doMonth.getDay() )를 빼서 마이너스( - )로 for문을 시작한다.
    for (let day = 1 - doMonth.getDay(); daysLength >= day; day++) {
      let column = row.insertCell();

      // @param 평일( 전월일과 익월일의 데이터 제외 )
      if (Math.sign(day) == 1 && lastDate.getDate() >= day) {
        // @param 평일 날짜 데이터 삽입
        column.innerText = autoLeftPad(day, 2);

        // @param 일요일인 경우
        if (dom % 7 == 1) {
          column.style.color = 'black';
        }

        // @param 토요일인 경우
        if (dom % 7 == 0) {
          column.style.color = 'black';
          row = tbCalendar.insertRow(); // @param 토요일이 지나면 다시 가로 행을 한줄 추가한다.
        }
      }

      // @param 평일 전월일과 익월일의 데이터 날짜변경
      else {
        let exceptDay = new Date(
          doMonth.getFullYear(),
          doMonth.getMonth(),
          day
        );
        column.innerText = autoLeftPad(exceptDay.getDate(), 2);
        column.style.color = '#A9A9A9';
      }

      // @brief   전월, 명월 음영처리
      // @details 현재년과 선택 년도가 같은경우
      if (toDay.getFullYear() == nowDate.getFullYear()) {
        // @details 현재월과 선택월이 같은경우
        if (toDay.getMonth() == nowDate.getMonth()) {
          // @details 현재일보다 이전인 경우이면서 현재월에 포함되는 일인경우
          if (nowDate.getDate() > day && Math.sign(day) == 1) {
            column.style.backgroundColor = '#ffffff';
            column.style.textDecoration = 'line-through';
            column.style.color = '#C5C5C5';
          }

          // @details 현재일보다 이후이면서 현재월에 포함되는 일인경우
          else if (nowDate.getDate() < day && lastDate.getDate() >= day) {
            column.style.backgroundColor = '#FFFFFF';
            column.style.cursor = 'pointer';
            column.onclick = function () {
              calendarChoiceDay(this);
            };
          }

          // @details 현재일인 경우
        //   else if (nowDate.getDate() == day) {
        //     column.style.backgroundColor = '#1C797D';
        //     column.style.borderRadius = '50%';
        //     column.style.cursor = 'default'; // 클릭할 수 없도록 커서를 변경
        //     column.onclick = null; // 현재일 클릭 이벤트 핸들러 제거
        //   }

          // @details 현재월보다 이전인경우
        } else if (toDay.getMonth() < nowDate.getMonth()) {
          if (Math.sign(day) == 1 && day <= lastDate.getDate()) {
            column.style.backgroundColor = '#E5E5E5';
          }
        }

        // @details 현재월보다 이후인경우
        else {
          if (Math.sign(day) == 1 && day <= lastDate.getDate()) {
            column.style.backgroundColor = '#FFFFFF';
            column.style.cursor = 'pointer';
            column.onclick = function () {
              calendarChoiceDay(this);
            };
          }
        }
      }

      // @details 선택한년도가 현재년도보다 작은경우
      else if (toDay.getFullYear() < nowDate.getFullYear()) {
        if (Math.sign(day) == 1 && day <= lastDate.getDate()) {
          column.style.backgroundColor = '#E5E5E5';
        }
      }

      // @details 선택한년도가 현재년도보다 큰경우
      else {
        if (Math.sign(day) == 1 && day <= lastDate.getDate()) {
          column.style.backgroundColor = '#FFFFFF';
          column.style.cursor = 'pointer';
          column.onclick = function () {
            calendarChoiceDay(this);
          };
        }
      }
      dom++;
    }
  }

  /**
   * @brief   날짜 선택
   * @details 사용자가 선택한 날짜에 체크표시를 남긴다.
   */
  function calendarChoiceDay(column) {

    // 기존 선택일이 존재하는 경우
    if (document.getElementsByClassName('choiceDay')[0]) {
      
    // 금일인 경우
      if (
        document.getElementById('calMonth').innerText ==
          autoLeftPad(nowDate.getMonth() + 1, 2) &&
        document.getElementsByClassName('choiceDay')[0].innerText ==
          autoLeftPad(toDay.getDate(), 2)
      ) {
        document.getElementsByClassName(
          'choiceDay'
        )[0].style.backgroundColor = '#FFFFFF';


      } else {
        // 다른 날짜를 선택한 경우 초기화
        var choiceDays = document.getElementsByClassName('choiceDay');

        
        for (let j = 0; j < choiceDays.length; j++) {
          if (choiceDays[j] !== column) {
            choiceDays[j].style.backgroundColor = '#FFFFFF';
            choiceDays[j].style.borderRadius = '';
            choiceDays[j].style.color = '';
        

            /* 이전에 선택된 날짜의 다음 요소들 스타일 모두 지우기 */
            var choiceNextDay = choiceDays[j].nextSibling;

            const parent = choiceDays[j].parentElement; // choiceDays[j] (td)의 부모 요소(tr)
            const nextParent = parent.nextElementSibling; // choiceDays[j] (td)의 부모 요소의 다음 sibling(tr)

            const choiceDaySiblings = Array.from(parent.children); // 형제 요소들

            const index = choiceDaySiblings.indexOf(choiceDays[j]); // choiceDays[j] 요소의 인덱스

            const ancestor = parent.parentElement;  // 부모 요소의 부모
            const lastParent = ancestor.lastElementChild;   // 마지막 tr
            const lastChild = lastParent.lastChild.previousElementSibling;

            for (let i = 0; i < 2 && choiceNextDay; i++) {
                choiceNextDay.style.backgroundColor = '#FFFFFF';
                choiceNextDay.style.borderRadius = '';
                choiceNextDay.style.color = '';
                choiceNextDay.classList.remove('choiceDay');
                choiceNextDay = choiceNextDay.nextSibling;
            }


            /* 이전에 선택된 날짜가 금요일, 토요일인 경우 -> 다음 tr 태그(다음주)의 첫번째 두번째 td 스타일 변경 */
            if(index===5 && choiceDays[j]!=lastChild){

                let childTd = nextParent.children[0];

                childTd.style.backgroundColor = '#FFFFFF';
                childTd.style.borderRadius = '';
                childTd.style.color = '';
                childTd.classList.remove('choiceDay');
            }


            if(index===6 && choiceDays[j]!=lastChild){
                
                let childTd = nextParent.children[0];

                for (let i = 0; i < 2 && childTd; i++) {
                    childTd.style.backgroundColor = '#FFFFFF';
                    childTd.style.borderRadius = '';
                    childTd.style.color = '';
                    childTd.classList.remove('choiceDay');
                    childTd = childTd.nextSibling;
                }
        


            }

            choiceDays[j].classList.remove('choiceDay');

          }
        }

      }
      
    }

    
    const lastChild = column.parentElement.parentElement.lastChild.lastChild.previousElementSibling;  
    // column의 부모의 부모의 마지막 자식의 마지막 자식 요소

    

    // 선택일 체크 표시
    column.style.backgroundColor = '#0F4957';
    column.style.borderRadius = '50%';
    column.style.color = '#FFFFFF';
    column.classList.add('choiceDay');

    // 선택한 날짜 이후 2일까지 스타일 변경
    var nextDay = column.nextSibling;
    for (let i = 0; i < 2 && nextDay; i++) {
      nextDay.style.backgroundColor = '#b3afaf';
      nextDay.style.borderRadius = '50%';
      nextDay.style.color = '';
      nextDay.classList.remove('choiceDay');
      nextDay = nextDay.nextSibling;
    }


    
    const parentElement = column.parentElement; // column(td)의 부모 요소(tr)
    const nextSibling = parentElement.nextElementSibling; // column(td)의 부모 요소의 다음 sibling(tr)

    const siblings = Array.from(parentElement.children); // 형제 요소들

    const index = siblings.indexOf(column); // column 요소의 인덱스
    
    /* 금요일, 토요일 날짜 클릭 시 -> 다음 tr 태그(다음주)의 첫번째, 두번째 td 스타일 변경 */
    if (index === 5 && column!=lastChild) {
        // 순서가 5번째(금요일)나 6번째(토요일)인 경우 특정 작업 수행
        
        let firstTd = nextSibling.children[0];
        
        firstTd.style.backgroundColor = '#b3afaf';
        firstTd.style.borderRadius = '50%';
        firstTd.style.color = '';
        firstTd.classList.remove('choiceDay');
        
    }


    if(index === 6 && column!=lastChild){
        
        let firstTd = nextSibling.children[0];

        for (let i = 0; i < 2 && firstTd; i++) {
            firstTd.style.backgroundColor = '#b3afaf';
            firstTd.style.borderRadius = '50%';
            firstTd.style.color = '';
            firstTd.classList.remove('choiceDay');
            firstTd = firstTd.nextSibling;
        }


        return;
    }

  }


  /**
   * @brief   숫자 두자릿수( 00 ) 변경
   * @details 자릿수가 한자리인 ( 1, 2, 3등 )의 값을 10, 11, 12등과 같은 두자리수 형식으로 맞추기위해 0을 붙인다.
   * @param   num     앞에 0을 붙일 숫자 값
   * @param   digit   글자의 자릿수를 지정 ( 2자릿수인 경우 00, 3자릿수인 경우 000 … )
   */
  function autoLeftPad(num, digit) {
    if (String(num).length < digit) {
      num = new Array(digit - String(num).length + 1).join('0') + num;
    }
    return num;
  }