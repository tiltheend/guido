document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        // Tool Bar 목록 document : https://fullcalendar.io/docs/toolbar

        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth'
        },

        selectable: true,
        selectMirror: true,

        navLinks: true, // can click day/week names to navigate views
        editable: true,
        // Create new event
        select: function (arg) {
            Swal.fire({
                html: "<div class='mb-7'>Create new event?</div><div class='fw-bold mb-5'>Event Name:</div><input type='text' class='form-control' name='event_name' />",
                icon: "info",
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonText: "Yes, create it!",
                cancelButtonText: "No, return",
                customClass: {
                    confirmButton: "btn btn-primary",
                    cancelButton: "btn btn-active-light"
                }
            }).then(function (result) {
                if (result.value) {
                    var title = document.querySelector("input[name=;event_name']").value;
                    if (title) {
                        calendar.addEvent({
                            title: title,
                            start: arg.start,
                            end: arg.end,
                            allDay: arg.allDay
                        })
                    }
                    calendar.unselect()
                } else if (result.dismiss === "cancel") {
                    Swal.fire({
                        text: "Event creation was declined!.",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn btn-primary",
                        }
                    });
                }
            });
        },

        // Delete event
        eventClick: function (arg) {
            Swal.fire({
                text: "Are you sure you want to delete this event?",
                icon: "warning",
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, return",
                customClass: {
                    confirmButton: "btn btn-primary",
                    cancelButton: "btn btn-active-light"
                }
            }).then(function (result) {
                if (result.value) {
                    arg.event.remove()
                } else if (result.dismiss === "cancel") {
                    Swal.fire({
                        text: "Event was not deleted!.",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn btn-primary",
                        }
                    });
                }
            });
        },
        dayMaxEvents: true, // allow "more" link when too many events
        // 이벤트 객체 필드 document : https://fullcalendar.io/docs/event-object
        events: [
            {
            title: 'Moonlight trip to Changdeokgung Palace',
            start: '2023-06-08',
            end: '2023-06-11'
            , color : '#0F4957'
            , textColor : '#ffffffff'
            // title : 패키지명, start: 시작 날짜, end : 끝나는 날짜보다 하루 전, url : 클릭하면 이동할 수 있게 경로 지정 가능(=>게시글 url)
        },
        {
            title: 'Jeonju Hanok Village Food Tour',
            start: '2023-06-19',
            end: '2023-06-22'
            , color : '#C6DDDF'
            , textColor : '#000000'
        },
            {
                title: 'Hanam Misajeong Park Barbecue Beer Festival',
                start: '2023-06-13',
                end: '2023-06-15'
                , color : '#1C797D'
                , textColor : '#ffffffff'
            },
            {
                title: 'Lunch',
            start: '2022-07-12T12:00:00'
            },
            {
            title: 'Meeting',
            start: '2022-07-12T14:30:00'
            },
            {
            title: 'Happy Hour',
            start: '2022-07-12T17:30:00'
            },
            {
            title: 'Dinner',
            start: '2022-07-12T20:00:00'
            },
            {
            title: 'Birthday Party',
            start: '2022-07-13T07:00:00'
            }
        ]
    });

    calendar.render();
});