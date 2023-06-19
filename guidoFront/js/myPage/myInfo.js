// //내정보 수정
// var modifyName = document.getElementById("modifyName");
// var modifyPw = document.getElementById("modifyPw");
// var modifyTel = document.getElementById("modifyTel");
// var modifyImage = document.getElementById("modifyImage");

// var username = document.getElementById("username");
// var userTel = document.getElementById("userTel");

// var profileInfoName = document.querySelector(".profile-info-name");
// var profileInfoPw = document.querySelector(".profile-info-pw");
// var profileInfoTel = document.querySelector(".profile-info-tel");
// var profileInfoImage = document.querySelector(".profile-info-image");

// var form1 = document.getElementById("username").nextElementSibling;
// var button = document.getElementById("inputFirstName").nextElementSibling;

// // 클릭 이벤트 방지
// var preventClick = function(e){
//     e.preventDefault(); 
//     e.stopPropagation(); return false; 

// // 실명 수정
// modifyName.addEventListener("click",()=>{
    
//     modifyName.classList.toggle("modify");
//     modifyName.classList.toggle("cancel");

//     if(modifyName.classList.contains("modify")){
//         modifyName.innerText = "수정";
//         form1.style.display = "none";
//         username.innerText = "유저이름";
//         // profileInfoPw.classList.remove("prevent");
//         // profileInfoTel.classList.prevent("prevent");
//         // profileInfoImage.classList.prevent("prevent");
//     }
//     if(modifyName.classList.contains("cancel")){
//         modifyPw.addEventListener('click',preventClick,true);
//         modifyTel.addEventListener('click',preventClick,true);
//         modifyImage.addEventListener('click',preventClick,true);
//         modifyName.innerText = "취소";
//         form1.style.display = "block";
//         username.innerText = "허가증이나 여권 등 여행 서류에 기재되어 있는 이름을 말합니다.";
//         // profileInfoPw.classList.add("prevent");
//         // profileInfoTel.classList.add("prevent");
//         // profileInfoImage.classList.add("prevent");

//     }


// // 비번 수정
// var originPwF = document.getElementById("originPwF");
// var inputOriginPw = document.getElementById("inputOriginPw");
// var newPwF = document.getElementById("newPwF");
// var inputNewPw = document.getElementById("inputNewPw");
// var checkNewPw = document.getElementById("checkNewPw");

// modifyPw.addEventListener("click",()=>{
//     modifyPw.classList.toggle("modify");
//     modifyPw.classList.toggle("cancel");

//     if(modifyPw.classList.contains("modify")){
//         modifyPw.innerText = "수정";
//         originPwF.style.display = "none";
//         newPwF.style.display = "none";

//     }
//     if(modifyPw.classList.contains("cancel")){

//         modifyPw.innerText = "취소";
//         originPwF.style.display = "block";
//         // 기존 비번 맞으면 
//         inputOriginPw.nextElementSibling.addEventListener("click",()=>{
//             // 비동기 추가하기
//             // 비번 재설정
//             originPwF.style.display = "none";
//             newPwF.style.display = "block";
//             // 비번 수정 비동기
//         })

//     }
    
// })

// 수정 누르면 hidden 나오고 나머지 요소 막음 + 컬러 연하게

const editInfoAreas = document.querySelectorAll(".edit-info-area");

// 모든 수정 영역
editInfoAreas.forEach((editArea)=>{
    const edit = editArea.querySelector(".edit");
    const cancel = editArea.querySelector(".cancel");
    const hiddenArea = editArea.querySelector(".hidden-area");
    const ment = editArea.querySelector(".ment");
    const changeMent = editArea.querySelector(".changeMent");
    const pwCheckBtn = editArea.querySelector(".pw-check-button");
    const pwChangekBtn = editArea.querySelector(".pw-change-button");
    
    // 수정 버튼 클릭
    edit.addEventListener('click',()=>{
        // 숨겨진 영역 보이고
        hiddenArea.style.display = "block";
        // 모든 수정 영역 접근
        editInfoAreas.forEach((area)=>{
            // 다른 수정 영역에 흐리게 + 클릭 방지
            if(area!=editArea){
                area.classList.add("prevent");
            }
        });
        // 현재 수정 영역 수정 버튼 취소 버튼으로
        edit.classList.add('hidden');
        cancel.classList.remove('hidden');
        // 수정 사항 정보 -> 설명
        changeMent.classList.remove('hidden');
        ment.classList.add('hidden');
    });

    // 취소 버튼 클릭
    cancel.addEventListener('click',()=>{
        
        // 영역 다시 숨기기
        hiddenArea.style.display = "none";
        // 다른 수정 영역
        editInfoAreas.forEach((area)=>{
            // 방지 해제
            area.classList.remove('prevent');
        });
        
        // 취소 버튼 숨김
        cancel.classList.add("hidden");
        // 수정 버튼 보임
        edit.classList.remove('hidden');
        // 수정 설명 -> 정보
        changeMent.classList.add('hidden');
        ment.classList.remove('hidden');
    });

});
