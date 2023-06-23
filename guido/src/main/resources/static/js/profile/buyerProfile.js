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


document.addEventListener("DOMContentLoaded",()=>{

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
