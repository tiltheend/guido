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