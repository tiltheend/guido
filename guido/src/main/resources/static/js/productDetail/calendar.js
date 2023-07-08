// 선택된 예약 날짜
let reservationDate;


// 로딩되는 시점의 년, 월을 이용해서 달력 초기 생성
let currentDate = new Date();
// let nowYear = currentDate.getFullYear();
// let nowMonth = currentDate.getMonth() + 1;

const today = currentDate.toISOString().split("T")[0];

// 월 이름 배열
const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];


const fewNights = product.productPackage;
/* 예약 가능 날짜 */
let availableDates = product.productDateList.map(item => item.productDate);

// 오늘 날짜 이전의 날짜는 선택할 수 없도록 배열 필터링
availableDates = availableDates.filter(date => date >= today);


// 예약 가능한 전체 일정 중 첫번째 일정의 년, 월을 이용해서 달력 초기 생성
let date = new Date(availableDates[0]);
let currentYear = date.getFullYear();
let currentMonth = date.getMonth() + 1;


createCalendar(currentYear, currentMonth, availableDates, fewNights);


// 달력 만들기 함수
function createCalendar(year, month, availableDates, fewNights) {


    // 달력 상단 년,월 작성 부분
    const yearMonth = document.querySelector(".year-month");
    yearMonth.textContent = `${monthNames[currentMonth - 1]} ${year}`;

    // 달력에 일이 출력되는 tobody
    const calendarBody = document.querySelector('.calendar-table > tbody');
    calendarBody.innerHTML = ''; // 이전 내용 삭제

    // 전달 받은 매개변수를 이용해서 매개변수에 맞는 년,월의 1일을 나타내는 Date 객체 생성
    // ex) year = 2023, month = 6  -> 2023년 6월 1일
    const date = new Date(year, month - 1, 1); // Date 객체에서 달(month)는 0~11로 표현됨


    // 매개변수로 전달 받은 년,월에 일 수(마지막 일)를 반환
    const daysInMonth = new Date(year, month, 0).getDate();

    // 생성된 Date() 객체가 나타내는 년, 월 1일의 요일 조회 (일 == 0, 월 == 1, ...)
    // -> 여기서 얻은 값을 이용해 1일이 시작되는 index로 사용
    const firstDayIndex = date.getDay();

    // 현재 날짜를 변수에 기록
    let currentDay = 1;

    // 다음달 날짜 출력용 변수
    let nextMonthDay = 1;

    // 달력의 주(행)을 생성하는 for문 (6행)
    for (let i = 0; i <= 5; i++) {
        const row = document.createElement('tr'); // 행 생성

        // 달력의 일(열)을 생성하는 for문 (7열)
        for (let j = 0; j <= 6; j++) {
            const cell = document.createElement('td'); // 열 생성

            // 열 안을 꽉 채우는 div 생성
            const cellBox = document.createElement('div');


            // 5행 7열의 달력을 만들기 때문에 총 35칸이 생성됨

            if (i === 0 && j < firstDayIndex) { // 0 번째 행이면서 j값이 1일이 시작되는 인덱스 미만인 경우 
                
                const daysInPrevMonth = new Date(year, month-1, 0).getDate();
                
                // cellBox.textContent = ''; // 빈칸

                cellBox.textContent = daysInPrevMonth - (firstDayIndex -1) + j; 
                cellBox.classList.add("inactive"); 
                cellBox.classList.add("pnday");
                
                
            } else if (currentDay > daysInMonth) { // 현재 날짜가 마지막 일을 초과하면 

                // cellBox.textContent = ''; // 빈칸

                cellBox.textContent = nextMonthDay++; 

                cellBox.classList.add("inactive"); 
                cellBox.classList.add("pnday");

            } else { // 일을 출력해야 되는 상황인 경우

                cellBox.textContent = currentDay; // 현재 일을 대입

                const y = currentYear;
                const m = currentMonth < 10 ? "0" + currentMonth : currentMonth;
                const d = currentDay < 10 ? "0" + currentDay : currentDay;

                const temp = `${y}-${m}-${d}`;

                if(availableDates.indexOf(temp) == -1 ){
                    cellBox.classList.add("inactive"); // 클래스 추가 (마우스오버가 불가능해짐)
                }else{
                    cellBox.classList.add("active"); // 클래스 추가 (마우스오버가 가능해짐)

                    cellBox.addEventListener("click", e => {

                        if(document.querySelector(".start-day") != null){
                            document.querySelector(".start-day").classList.remove("start-day");

                            if(fewNights!=1){
                                document.querySelector(".last-day").classList.remove("last-day");
                                document.querySelectorAll(".select-day-td").forEach( td => td.classList.remove("select-day-td"));
                            }

                        }


                        const start = e.currentTarget;

                        let parentTd = e.currentTarget.parentElement;

                        const tdList = parentTd.parentElement.children;
                        let startIndex = 0;

                        for(let i=0 ; i<tdList.length ; i++){
                            if(tdList[i] == parentTd){
                                startIndex = i;
                                break;
                            }
                        }

                    
                        for(let i=0 ; i<fewNights ; i++){
                            
                            if(i == 0){
                                start.classList.add("start-day");
                                parentTd.classList.add("start-day-td");
                            
                            } else if(fewNights!=1 && i == fewNights-1){
                                parentTd.children[0].classList.add("last-day");
                                parentTd.classList.add("last-day-td");

                            } 

                            if(fewNights!=1)
                                parentTd.classList.add("select-day-td");

                        
                            if(6- i> startIndex){  // 한 주에 지정된 fewNight(몇일짜리 일정)를 모두 선택할 수 있을 때
                                parentTd = parentTd.nextElementSibling; 

                            } else {  // 한 주에 지정된 fewNight(몇일짜리 일정)를 모두 선택할 수 없을 때
                                startIndex = 0;
                                parentTd = parentTd.parentElement.nextElementSibling.children[0];

                            }
                        }


                        // 한 주에 지정된 fewNight(몇일짜리 일정)를 모두 선택할 수 없을 때

                    });
                }

                currentDay++; // 현재 일 증가
            
                cell.addEventListener("click", ()=>{

                    const dateHidden = document.getElementById("dateHidden");      // 선택한 날짜 input value에 할당
                    reservationDate = y + "-" + m + "-" + d;

                    dateHidden.value = reservationDate;

                    
                    // 1박의 경우 옵션 불러오기
                    if(fewNights==1 && cell.classList.contains('start-day-td')){
                        document.querySelector(".detail--right__option").style.display = "block";
                        selectOptionList(reservationDate);
                    }
                    
                    if(!cell.classList.contains('start-day-td')){
                        document.querySelector(".detail--right__option").style.display = "none";
                    }

                })
            
            }

            cell.append(cellBox);
            row.append(cell);
        }

        calendarBody.append(row);
    }

}

// 화살표 클릭 시 동작
const prevMonth = document.querySelector(".calendar-arrow.prev-month");
const nextMonth = document.querySelector(".calendar-arrow.next-month");

prevMonth.addEventListener("click", () => {

    currentMonth--;
    if (currentMonth < 1) {
        currentYear--;
        currentMonth = 12;
    }
    
    selectCalendarDates(currentYear, currentMonth);

});

nextMonth.addEventListener("click", () => {


    currentMonth++;
    if (currentMonth > 12) {
        currentYear++;
        currentMonth = 1;
    }
    
    selectCalendarDates(currentYear, currentMonth);
});


// 월 별 예약 가능 날짜(일정) 조회하기
function selectCalendarDates(year, month){
    
        
        // 비동기로 값 불러오기
        fetch("/productDetail/calendarDates?year=" + year + "&month=" + month + "&productNo=" + product.productNo)
        .then(resp=>resp.json())
        .then(result =>{
            
            let availableDates =  result.map(item => item.productDate);

            // 오늘 날짜 이전의 날짜는 선택할 수 없도록 배열 필터링
            availableDates = availableDates.filter(date => date >= today);

            createCalendar(year, month, availableDates, fewNights);
    
        }).catch(err=>{
            console.log(err);
        })

}


// 1박 상품의 경우 optionList 조회하기
function selectOptionList(reservationDate){

    fetch("/productDetail/getOptionInfo?productNo=" + product.productNo + "&productDate=" + reservationDate)
    .then(resp=>resp.json())
    .then(result=>{

        const optionNames = result.map(obj => obj.optionName);
        const optionRestCounts = result.map(obj => obj.optionRestCount);
        const optionNos = result.map(obj => obj.optionNo);

        createOptionList(optionNames, optionRestCounts, optionNos);

    }).catch(err=>console.log(err))
}


function createOptionList(optionNames, optionRestCounts, optionNos){

    const containerDiv = document.querySelector(".detail--right__option");

    containerDiv.innerHTML = '';


    const titleSpan = document.createElement("span");
    titleSpan.innerText = "Option";

    containerDiv.appendChild(titleSpan);

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("detail--item__option");

    for(let i=0; i<optionNames.length; i++){
    
        const radioInput = document.createElement("input");
        radioInput.type = "radio";
        radioInput.name = "option";
        radioInput.id = "option" + (i+1);
        radioInput.value = optionNos[i];

        if(optionRestCounts[i]==0)
            radioInput.disabled;

        const label = document.createElement("label");
        label.classList.add("option--active");
        label.setAttribute("for", "option" + (i+1));
        label.innerText = optionNames[i] + " (" + optionRestCounts[i] + " left) ";

        itemDiv.appendChild(radioInput);
        itemDiv.appendChild(label);
    }

    containerDiv.appendChild(itemDiv);

}


