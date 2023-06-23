

/* ---- 긴 리뷰들만 더보기 상세 조회 모달 ---- */
let moreAndReply; /* 더보기 버튼 */
let reviewMoreModal; /* 더보기 모달 */
let reviewMoreModalTextArea; /* 리뷰 내용 */
let reviewMoreModalP; /* 리뷰 상품 제목 */
let reviewerName; /* 리뷰 단 사람 이름 */
let reviewerProfile; /* 리뷰 단 사람 사진 */
let reviewerDate; /* 리뷰 단 날짜 */
let reviewerRating; /* 리뷰 단 날짜 */
let reviewMoreModalClose; /* 더보기 닫기 */

/* ---- 리뷰 모달들 ---- */
let reviewContentList; /* 리뷰 글자 수(작성) */
let reviewContentMore; /* 리뷰 글자 수(수정) */

let addReview; /* 리뷰 열기 + */
let reviewWriteModal; /* 리뷰 모달 */
let reviewModalClose; /* 리뷰 닫기 */

let reviewEdit; /* 리뷰 수정 */
let reviewEditModal; /* 리뷰 수정 모달 */
let reviewEditModalClose; /* 리뷰 수정 닫기 */
let reviewSaleList; /* 리뷰 상품명 */
let reviewSaleListContent; /* 리뷰 작성 글 */
let reviewSaleListStar; /* 리뷰 별점 */

/* ---- 프로필 이미지 변경 ---- */
let profileImage; /* 프로필 이미지 들어가는 img 태그 */
let deleteImage; /* 기본 이미지 변경 */
let userProfileFile; /* 프로필 파일 input 태그 */
let profileEditIcon; /* 위임 받는 카메라 아이콘 */

document.addEventListener("DOMContentLoaded",()=>{

    /* 프로필 편집 버튼 위임 파일 -> 카메라 아이콘 */
    userProfileFile = document.querySelector("#userProfileFile");
    profileEditIcon = document.querySelector(".profile-edit-icon");
    if(profileEditIcon!=null){
        profileEditIcon.addEventListener('click', () => userProfileFile.click());
    }

    profileImage = document.querySelector(".img-content");
    deleteImage = document.querySelector(".profile-delete");

    let initCheck; // 초기 프로필 이미지 상태를 저장하는 변수
    // false == 기본 이미지, true == 이전 업로드 이미지

    let deleteCheck = -1;
    // 프로필 이미지가 새로 업로드 되거나 삭제 되었음을 나타내는 변수
    // -1 == 초기값, 0 == 프로필 삭제(x버튼), 1 == 새 이미지 업로드

    let originalImage; // 초기 프로필 이미지 파일 경로 저장

    if(profileEditIcon != null){ // 화면에 imageInput이 있을 경우

    // 프로필 이미지가 출력되는 img태그의 src 속성을 저장
    originalImage = profileImage.getAttribute("src");

    // 회원 프로필 화면 진입 시
    // 현재 회원의 프로필 이미지 상태를 확인
    if(profileImage.getAttribute("src")=="/images/profile/userProfile/basicUser.png"){
        // 기본 이미지인 경우
        initCheck = false;
    } else {
        initCheck = true;
    }

    // change 이벤트 : 값이 변했을 때
    // -input type = "file", "checkbox", "radio"에서 많이 사용
    // -text/number 형식 사용 가능
    // -> 이 때 input 값 입력 후 포커스를 잃었을 때 이전 값과 다르면  change 이벤트 발생
    userProfileFile.addEventListener("change",e=>{

    // 2MB로 최대 크기 제한
    const maxSize = 1*1024*1024*2; // 파일 최대 크키 지정
    console.log(e.target); // input
    console.log(e.target.value); // 업로드된 파일의 경로
    console.log(e.target.files); // 업로드된 파일의 정보가 담긴 배열

    const file = e.target.files[0]; // 업로드한 파일의 정보가 담긴 객체

    // 파일을 한번 선택 후 취소 했을 때
    if(file == undefined){ 
        console.log("파일 선택이 취소됨");
        deleteCheck = -1; // 취소 == 파일 없음 == 초기 상태

        // 기존 프로필 이미지로 변경
        profileImage.setAttribute("src",originalImage);
        return;
    }

    if(file.size>maxSize){ // 선택된 파일의 크기가 최대 크기를 초과한 경우
        alert("2MB 이하의 이미지를 선택해주세요.");
        userProfileFile.value="";
        // input type="file" 태그에 대입할 수 있는 vaule는 "" 뿐이다.
        deleteCheck = -1; // 취소 == 파일 없음 == 초기 상태

        // 기존 프로필 이미지로 변경
        profileImage.setAttribute("src",originalImage);
        return;
    }

    // JS에서 파일을 읽는 객체
    // - 파일을 읽고 클라이언트 컴퓨터에 파일을 저장할 수 있음
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // 매개변수에 작성된 파일을 읽어서 파일을 나타내는 URL을 result 속성으로 얻어올 수 있게 함.

    // 다 읽었을 때
    reader.onload = e => {
        // console.log(e.target);
        // console.log(e.target.result); // 읽은 파일의 URL

        const url = e.target.result;

        // 프로필 이미지(img) 태그에 src 속성으로 추가
        profileImage.setAttribute("src",url);

        deleteCheck=1;
    }

    });

    // x 버튼 클릭 시
    deleteImage.addEventListener("click",()=>{
        userProfileFile.value=""; // input type="file" value 삭제
        profileImage.setAttribute("src","/images/profile/userProfile/basicUser.png");
        deleteCheck=0;
    });

    // #profileFrm이 제출 되었을 때
    document.querySelector(".profile-img-box").addEventListener("submit",e=>{
    // initCheck
    // 초기 프로필 이미지 상태를 저장하는 변수
    // false == 기본 이미지, true == 이전 업로드 이미지

    // deleteCheck
    // 프로필 이미지가 새로 업로드 되거나 삭제 되었음을 나타내는 변수
    // -1 == 초기값, 0 == 프로필 삭제(x버튼), 1 == 새 이미지 업로드
    let flag = true;

    // 프로필 이미지가 없다 -> 있다.
    if(!initCheck && deleteCheck==1) flag = false;

    // 이전 프로필 이미지가 있다 -> 삭제
    if(initCheck && deleteCheck==0) flag = false;

    // 이전 프로필 이미지가 있다 -> 새 이미지
    if(initCheck && deleteCheck == 1) flag = false;

    if(flag){ //
    e.preventDefault(); // form 기본 이벤트 제거
    alert("이미지 변경 후 클릭하세요.");
    }
    });

}

    /* 리뷰 글자 길어질 때 더보기 버튼 보여주기 216글자 이상 */
    reviewContentList=document.querySelectorAll(".buyer-profile-top .review-list li>pre");
    reviewContentMore=document.querySelectorAll(".buyer-profile-top .review-list li>div:last-of-type>p");

    if(reviewContentList != null) {
        for (let i = 0; i < reviewContentList.length; i++) {
            if(reviewContentList[i].innerText.length>215){
                reviewContentMore[i].style.visibility="visible";
            }
        }
    }
    /* 더보기 버튼 누르면 상세 조회 */
    moreAndReply = document.querySelector(".more-and-reply>p");
    reviewMoreModal=document.querySelector(".buyer-profile-top .review-more-modal");

    reviewMoreModalTextArea = document.querySelector(".review-more-modal textarea");
    reviewMoreModalP = document.querySelector(".review-more-modal .sale-review-info>p");
    reviewerName = document.querySelector(".review-more-modal .reviewer-name");
    reviewerProfile = document.querySelector(".review-more-modal .reviewer");
    reviewerDate = document.querySelector(".review-more-modal .review-date");
    reviewerRating = document.querySelector(".review-more-modal .review-rating");

    if(moreAndReply != null){
        moreAndReply.addEventListener("click",()=>{
            // 리뷰 상세 조회 내용 넣기
            reviewMoreModalTextArea.innerText = moreAndReply.parentElement.previousElementSibling.innerText;
            
            // 리뷰 상세 조회 상품 제목 넣기
            reviewMoreModalP.innerText = moreAndReply.parentElement.previousElementSibling.previousElementSibling.lastElementChild.firstElementChild.innerText;
            
            // 리뷰 이름 넣기
            reviewerName.innerText = moreAndReply.parentElement.previousElementSibling.previousElementSibling.firstElementChild.lastElementChild.innerText;
            
            // 리뷰 사진 넣기
            reviewerProfile.innerHTML = moreAndReply.parentElement.previousElementSibling.previousElementSibling.firstElementChild.firstElementChild.innerHTML;
            
            // 리뷰 날짜 넣기
            reviewerDate.innerText = moreAndReply.parentElement.previousElementSibling.previousElementSibling.lastElementChild.lastElementChild.innerText;
            
            // 리뷰 별점 넣기
            reviewerRating.innerHTML = moreAndReply.parentElement.previousElementSibling.previousElementSibling.lastElementChild.lastElementChild.innerHTML;
            
            // 모달 열기
            reviewMoreModal.style.display="flex";
            
            // 모달 닫기
            reviewMoreModalClose = document.querySelector(".buyer-profile-top .review-more-modal .review-modal-close");
            reviewMoreModalClose.addEventListener('click',()=>{
                reviewMoreModal.style.display="none";
            });
        })
    }

    /* 리뷰 등록하기 */
    addReview = document.querySelector(".my-review>div>svg");
    reviewWriteModal = document.querySelector(".buyer-profile-top .review-write");

    // 리뷰 모달 열기
    if(addReview != null){
        reviewModalClose = document.querySelector(".review-modal-close");
        addReview.addEventListener('click',()=>{
            reviewWriteModal.style.display="flex";
            // 모달 닫기
            reviewModalClose.addEventListener('click',()=>{
                reviewWriteModal.style.display="none";
            });

        });
    }

    // 리뷰 수정 모달 열기
    reviewEdit=document.querySelector(".review-edit-btn");
    reviewEditModal=document.querySelector(".buyer-profile-top .review-edit");

    reviewSaleList=document.querySelector(".review-edit #reviewSaleList");
    reviewSaleListContent=document.querySelector(".review-edit #reviewContent");
    reviewSaleListStar=document.querySelector(".review-edit .score-star");
    

    if(reviewEdit != null){
        reviewEditModalClose = document.querySelector(".buyer-profile-top .review-edit .review-modal-close");
        reviewEdit.addEventListener('click',e=>{

            // 상품 제목 가져오기
            reviewSaleList.value=e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.lastElementChild.firstElementChild.innerText;
            
            // 리뷰 내용 가져오기
            reviewSaleListContent.value=e.target.parentElement.parentElement.previousElementSibling.innerText;
            let reviewSaleListContentCount = document.querySelector(".review-edit #count");
            reviewSaleListContentCount.innerText=reviewSaleListContent.value.length;


            // 별점 가져오기
            let checkedInput =e.target.parentElement.parentElement.parentElement.firstElementChild.lastElementChild.lastElementChild.firstElementChild.querySelector('.reply-content input[type="radio"]:checked').value;
            let reviewSaleListStarList = reviewSaleListStar.querySelectorAll('input[type="radio"]');
            let scoreSpan = document.querySelector('.review-edit .score-span');
            for(let i of reviewSaleListStarList){
                if(i.value==checkedInput){
                    i.checked=true;
                    scoreSpan.innerText=checkedInput;
                }
            }
            

            reviewEditModal.style.display="flex";
            // 모달 닫기
            reviewEditModalClose.addEventListener('click',()=>{
                reviewEditModal.style.display="none";
            });

        });
    }

    // 리뷰 글자수 제한 (500) 디비 바꾸기~~
    let reviewContent = document.querySelector(".review-write #reviewContent");
    let reviewCount = document.querySelector(".review-write #count");
    let reviewWrite = document.querySelector(".review-write .write-count");

    reviewContent.addEventListener("input",(e)=>{ // 리뷰 작성

        // e.target : 이벤트가 발생한 요소 (==#content)
        reviewCount.innerText=e.target.value.length;
        if(e.target.value.length>500){
            reviewCount.classList.add("error");
            reviewWrite.classList.add("error");
            document.querySelector(".review-write .write-count .over-error").style.fontSize="0.875rem";
        } else {
            reviewCount.classList.remove("error");
            reviewWrite.classList.remove("error");
            document.querySelector(".review-write .write-count .over-error").style.fontSize="0";
        }

    });

    // 리뷰 글자수 제한 (500) 디비 바꾸기~~
    let reviewContentEdit = document.querySelector(".review-edit #reviewContent");
    let reviewCountEdit = document.querySelector(".review-edit #count");
    let reviewWriteEdit = document.querySelector(".review-edit .write-count");

    reviewContentEdit.addEventListener("input",(e)=>{ // 리뷰 수정

        // e.target : 이벤트가 발생한 요소 (==#content)
        reviewCountEdit.innerText=e.target.value.length;
        if(e.target.value.length>500){
            reviewCountEdit.classList.add("error");
            reviewWriteEdit.classList.add("error");
            document.querySelector(".review-edit .write-count .over-error").style.fontSize="0.875rem";
        } else {
            reviewCountEdit.classList.remove("error");
            reviewWriteEdit.classList.remove("error");
            document.querySelector(".review-edit .write-count .over-error").style.fontSize="0";
        }

    });
    

    // 리뷰 별점 실시간 값 출력
    let starScoreList = document.getElementsByName('starScore');

    for(let i of starScoreList){
        i.addEventListener("input",()=>{
            document.querySelector('.review-write .score-span').innerText= i.value;
        });
    }

    let starScoreListEdit = document.querySelectorAll('.star_score');

    for(let i of starScoreListEdit){
        i.addEventListener("input",()=>{
            document.querySelector('.review-edit .score-span').innerText= i.value;
        });
    }
})
