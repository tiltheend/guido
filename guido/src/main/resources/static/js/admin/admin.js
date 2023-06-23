/********************************* 체크박스 로직 *********************************/

// /* 전체 선택 체크박스 */
// const checkAll = document.querySelector('#checkAll');

// /* 체크박스 리스트 */
// const checkboxes = document.querySelectorAll('.checkbox');

// // '전체 선택 체크박스' 값 변화시 이벤트
// checkAll.addEventListener('change', () => {
//     if (checkAll.checked) { // '전체 선택 체크박스' 체크시 모든 체크박스 체크
//         checkboxes.forEach(checkBox => {
//             checkBox.checked = true;
//         })
//     } else { // '전체 선택 체크박스' 체크 해제시 모든 체크박스 체크 해제
//         checkboxes.forEach(checkBox => {
//             checkBox.checked = false;
//         });
//     }
// });

// // 체크박스 리스트
// checkboxes.forEach(checkbox => {
//     checkbox.addEventListener('change', e => { // 체크박스 값 변화시 이벤트
//         // 체크박스 체크 해제시 
//         if (!e.target.checked) {
//             // '전체 선택 체크박스' 체크 해제
//             checkAll.checked = false;
//         }
//     });
// });

/*********************************************************************************/


const selectAllCheckbox = document.querySelector('#checkAll');
const checkboxList = document.querySelectorAll('.checkbox');
const table = document.querySelector('#table');

// '전체 선택 체크박스' 값 변화시 이벤트
selectAllCheckbox.addEventListener('change', () => {
    toggleCheckboxes(selectAllCheckbox.checked);
});

// 체크박스 상태 변경 함수
function toggleCheckboxes(checked) {
    checkboxList.forEach((checkbox) => {
        checkbox.checked = checked;
    });
}

// 부모 요소에 이벤트 리스너 등록하여 이벤트 위임 사용
table.addEventListener('change', (event) => {
    if (event.target.classList.contains('checkbox')) {
        if (!event.target.checked) {
            selectAllCheckbox.checked = false;
        }
    }
});