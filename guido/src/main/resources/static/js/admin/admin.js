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
function setMainBanner(eventNo, order) {
    const xhr = new XMLHttpRequest();
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

function blindAction(action, noList) {
    let confirmMessage;
    let url;

    if (pageName === 'eventList') {
        confirmMessage = '이벤트를 ';
        url = 'event';
    } else if (pageName === 'productManagement') {
        confirmMessage = '상품을 ';
        url = 'product';
    }

    confirmMessage += action=='Blind'?'블라인드':'블라인드 해제';

    if (!confirm(noList + '번 ' + confirmMessage + ' 하시겠습니까?')) {
        return;
    }

    const endpoint = `/admin/${url}${action}`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(noList)
    };

    fetch(endpoint, options)
        .then(response => {
            if (response.ok)
                alert('성공하였습니다.');
            else
                alert('실패');
            location.reload();
        })
        .catch(error => {
            console.error('오류 발생:', error);
        });
}

function handleBlindButtonClick(event) {
    const checkbox = event.target.closest('tr').querySelector('.checkbox');
    const no = [checkbox.value];
    blindAction('Blind', no);
}

function handleBlindCancelButtonClick(event) {
    const checkbox = event.target.closest('tr').querySelector('.checkbox');
    const no = [checkbox.value];
    blindAction('BlindCancel', no);
}

function handleBatchBlindButtonClick() {
    const checkedCheckboxes = Array.from(document.querySelectorAll('.checkbox:checked'));
    const noList = checkedCheckboxes.map(checkbox => checkbox.value);

    if (noList.length !== 0)
        blindAction('Blind', noList);
    else
        alert('선택된 체크박스가 없습니다.');
}

function handleBatchBlindCancelButtonClick() {
    const checkedCheckboxes = Array.from(document.querySelectorAll('.checkbox:checked'));
    const noList = checkedCheckboxes.map(checkbox => checkbox.value);

    if (noList.length !== 0) 
        blindAction('BlindCancel', noList);
    else 
        alert('선택된 체크박스가 없습니다.');
}

const blindBtns = document.querySelectorAll('.blind-btn');
if (blindBtns !== null) 
    blindBtns.forEach(btn => {
        btn.addEventListener('click', handleBlindButtonClick);
    });

const blindCancelBtns = document.querySelectorAll('.blind-cancel-btn');
if (blindCancelBtns !== null) 
    blindCancelBtns.forEach(btn => {
        btn.addEventListener('click', handleBlindCancelButtonClick);
    });

const blindBtn = document.querySelector('#blindBtn');
if (blindBtn !== null) 
    blindBtn.addEventListener('click', handleBatchBlindButtonClick);

const blindCancelBtn = document.querySelector('#blindCancelBtn');
if (blindCancelBtn !== null) 
    blindCancelBtn.addEventListener('click', handleBatchBlindCancelButtonClick);

/*********************************************************************************/

function setUserState(action,userNoList) {
    const endpoint = '/admin/setUserState';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userNoList : userNoList,
            state : action === '탈퇴' ? 'D' : action === '블락' ? 'B' : 'N'
        })
    };
    fetch(endpoint, options)
        .then(response => {
            if (response.ok)
                alert('성공하였습니다.');
            else
                alert('실패');
            location.reload();
        })
        .catch(error => {
            console.error('오류 발생:', error);
        });
}

function checkedBtnHandler(action) {
    const userNoList = Array.from(document.querySelectorAll('.checkbox:checked')).map(checkbox => checkbox.value);
    if(userNoList.length === 0) {
        alert('선택된 체크박스가 없습니다.');
        return;
    }
    if (!confirm(userNoList + '번 유저 ' + action + '처리 하시겠습니까?'))
        return;
    setUserState(action,userNoList);
}

secessionBtn = document.getElementById('secessionBtn');
if(secessionBtn != null)
    secessionBtn.addEventListener('click',() => {
        checkedBtnHandler("탈퇴");
    })
blockBtn = document.getElementById('blockBtn');
if(blockBtn != null)
    blockBtn.addEventListener('click',() => {
        checkedBtnHandler("블락");
    })
normalBtn = document.getElementById('normalBtn');
if(normalBtn != null)
    normalBtn.addEventListener('click',() => {
        checkedBtnHandler("해제");
    })
approveBtn = document.getElementById('approveBtn');
if(approveBtn != null)
    approveBtn.addEventListener('click',() => {
        checkedBtnHandler("승인");
    })

const approveBtns = document.querySelectorAll('.approve-btn');
if(approveBtns != null)
    approveBtns.forEach(btn => {
        btn.addEventListener('click',() => {
            const userNo = [btn.closest('tr').querySelector('.checkbox').value];
            setUserState("승인",userNo);
        });
    });