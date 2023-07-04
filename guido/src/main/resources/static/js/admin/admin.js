/********************************* 체크박스 로직 *********************************/
const checkAllCheckbox = document.querySelector('#checkAll');
const checkboxes = document.querySelectorAll('.checkbox');
const table = document.querySelector('#table');

// '전체 선택 체크박스' 값 변화시 이벤트
checkAllCheckbox.addEventListener('change', () => {
    toggleCheckboxes(checkAllCheckbox.checked);
});

// 체크박스 상태 변경 함수
function toggleCheckboxes(checked) {
    checkboxes.forEach((checkbox) => {
        checkbox.checked = checked;
    });
}

// 부모 요소에 이벤트 리스너 등록하여 이벤트 위임 사용
table.addEventListener('change', (event) => {
    if (event.target.classList.contains('checkbox')) {
        if (!event.target.checked) {
            checkAllCheckbox.checked = false;
        }
    }
});
/*********************************************************************************/

function approveGuide(userNoList) {
    if(!confirm(userNoList+'번 가이드 승인처리 하시겠습니까?')){
        return;
    }
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/admin/approveGuide');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if(xhr.status === 200) {
            alert('승인 성공하였습니다.');
        } else {
            alert('승인 실패');
        }
        location.reload()
    };
    xhr.send(JSON.stringify(userNoList));
}

const rowBtns = document.querySelectorAll('.row-btn');
if(rowBtns !== null)
    rowBtns.forEach(btn => {
        btn.addEventListener('click',() => {
            const userNo = [btn.closest('tr').querySelector('.checkbox').value];
            approveGuide(userNo);
        });
    });

const approveBtn = document.querySelector('.approve-checked');
if(approveBtn !== null)
    approveBtn.addEventListener('click', () => {
        const userNoList = [];
        checkboxes.forEach(checkbox => {
            if(checkbox.checked) {
                userNoList.push(checkbox.value);
            }
        })
        if(userNoList.length !== 0)
            approveGuide(userNoList);
        else
            alert('선택된 체크박스가 없습니다.')
    })

/*********************************************************************************/
function setMainBanner(eventNo, order) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/admin/setMainBanner');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if(xhr.status === 200) {
            alert('성공하였습니다.');
        } else {
            alert('실패');
        }
        location.reload()
    };
    xhr.send(JSON.stringify({'eventNo':eventNo,'order':order}));
}

const setMainBannerBtn = document.querySelectorAll('.set-main-banner');
let selectedEventNo = document.getElementById('selectedEventNo');
setMainBannerBtn.forEach(btn=>{
    btn.addEventListener('click', () => {
        const eventNo = btn.closest('tr').querySelector('.checkbox').value;
        selectedEventNo.innerText=eventNo;
        const modal = document.getElementById("modal");
        modal.style.display = "block";
    
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none"; // 모달 숨기기
            }
        }
    });
})

const modalSubmit = document.querySelector('.modal-submit');
const modalCancel = document.querySelector('.modal-cancel');
const modalSelect = document.querySelector('#modalSelect');
if(modalSubmit !== null)
    modalSubmit.addEventListener('click',()=>{
        if(modalSelect.value === '') {
            alert('순서가 선택되지 않았습니다.');
            return;
        }
        setMainBanner(selectedEventNo.innerText,modalSelect.value);
    })
if(modalCancel !== null)
    modalCancel.addEventListener('click',()=>{
        modal.style.display = "none"; // 모달 숨기기
    })


const mainBanner = document.querySelectorAll('.main-banner');

mainBanner.forEach(btn => {
    btn.addEventListener('click', ()=>{
        const eventNo = btn.closest('tr').querySelector('.checkbox').value;
        if(confirm(eventNo+'번 이벤트를 메인배너에서 제외합니다.'))
            setMainBanner(eventNo,null);
    })
})

function eventBlind(eventNoList) {
    if(!confirm(eventNoList+'번 이벤트를 블라인드처리 하시겠습니까?')){
        return;
    }
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/admin/eventBlind');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if(xhr.status === 200) {
            alert('성공하였습니다.');
        } else {
            alert('실패');
        }
        location.reload()
    };
    xhr.send(JSON.stringify(eventNoList));
}


const eventBlindBtns = document.querySelectorAll('.event-blind-btn');
if(eventBlindBtns !== null )
    eventBlindBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const eventNo = [btn.closest('tr').querySelector('.checkbox').value];
            eventBlind(eventNo);
        })
    })
const blindBtn = document.querySelector('#blindBtn');
if(blindBtn !== null)
    blindBtn.addEventListener('click', () => {
        const eventNoList = [];
        checkboxes.forEach(checkbox => {
            if(checkbox.checked) {
                eventNoList.push(checkbox.value);
            }
        })
        if(eventNoList.length !== 0)
            eventBlind(eventNoList);
        else
            alert('선택된 체크박스가 없습니다.')
    })

function eventBlindCancel (eventNoList) {
    if(!confirm(eventNoList+'번 이벤트를 블라인드해제 하시겠습니까?')){
        return;
    }
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/admin/eventBlindCancel');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if(xhr.status === 200) {
            alert('성공하였습니다.');
        } else {
            alert('실패');
        }
        location.reload()
    };
    xhr.send(JSON.stringify(eventNoList));
}


const eventBlindCancelBtns = document.querySelectorAll('.event-blind-cancel-btn');
if(eventBlindCancelBtns !== null )
    eventBlindCancelBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const eventNo = [btn.closest('tr').querySelector('.checkbox').value];
            eventBlindCancel(eventNo);
        })
    })
    const blindCancelBtn = document.querySelector('#blindCancelBtn');
    if(blindCancelBtn !== null)
    blindCancelBtn.addEventListener('click', () => {
            const eventNoList = [];
            checkboxes.forEach(checkbox => {
                if(checkbox.checked) {
                    eventNoList.push(checkbox.value);
                }
            })
            if(eventNoList.length !== 0)
                eventBlindCancel(eventNoList);
            else
                alert('선택된 체크박스가 없습니다.')
        })


/*********************************************************************************/