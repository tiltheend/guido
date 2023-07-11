
document.addEventListener('DOMContentLoaded', function () {

    fetch('/fullCalendar/sellerScheduleList')
    .then(resp => resp.json())
    .then(data => {

        let calendarEl = document.getElementById('calendar');
        let events = [];

        console.log(data);
        if (data != null) {
            for (let i of data) {
                let startDate = i.start.slice(0, 10); // 날짜 부분만 추출
                let endDate = i.end.slice(0, 10); // 날짜 부분만 추출

                events.push({
                title: i.title,
                start: startDate,
                end: endDate,
                color: i.color,
                textColor : i.textColor,
                url : i.url
                });
            }
        }

        console.log(events);
        let calendar = new FullCalendar.Calendar(calendarEl, {
            // defaultDate: new Date(),
            // initialDate: '2023-07-09',
            // initialView: 'timeGridWeek',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth'
            },
            selectable: true,
            selectMirror: true,
    
            navLinks: true, // can click day/week names to navigate views
            // editable: true, // 드래그

            dayMaxEvents: true,

            events: events
        });

        calendar.render();

    })
    .catch(err=>{
        console.log(err);
    });

});

// YYYY-MM-DD 형식으로 날짜 포맷하는 함수
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}


// document.addEventListener('DOMContentLoaded', function() {
// var calendarEl = document.getElementById('calendar');
// // new FullCalendar.Calendar(대상 DOM객체, {속성:속성값, 속성2:속성값2..})

// var calendar = new FullCalendar.Calendar(calendarEl, {
//     headerToolbar: {
//     left: 'prev,next today',
//     center: 'title',
//     right: 'dayGridMonth,timeGridWeek,timeGridDay'
//     },
//     // initialDate: '2021-04-12', // 초기 로딩 날짜.
//     navLinks: true, // can click day/week names to navigate views
//     selectable: true,
//     selectMirror: true,
//     // 이벤트명 : function(){} : 각 날짜에 대한 이벤트를 통해 처리할 내용..
//     select: function(arg) {
//         console.log(arg);

//     var title = prompt('입력할 일정:');
// // title 값이 있을때, 화면에 calendar.addEvent() json형식으로 일정을 추가
//     if (title) {
//         calendar.addEvent({
//         title: title,
//         start: arg.start,
//         end: arg.end,
//         allDay: arg.allDay,
//         backgroundColor:"yellow",
//         textColor:"blue"
//         })
//     }
//     calendar.unselect()
//     },
//     eventClick: function(arg) {
//         // 있는 일정 클릭시,
//         console.log("#등록된 일정 클릭#");
//         console.log(arg.event);
        
//     if (confirm('Are you sure you want to delete this event?')) {
//         arg.event.remove()
//     }
//     },
//     editable: true,
//     dayMaxEvents: true, // allow "more" link when too many events
//     events: function(info, successCallback, failureCallback){
//         // ajax 처리로 데이터를 로딩 시킨다.
//         $.ajax({
//             type:"get",
//             url:"/fullCalendar/sellerScheduleList",
//             dataType:"json"  
//         });
//     }
//     //================ ajax데이터 불러올 부분 =====================//
// });

// calendar.render();
// });
