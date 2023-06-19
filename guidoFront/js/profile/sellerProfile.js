/* 프로필 편집 버튼 위임 파일 -> 카메라 아이콘 */
const userProfileFile = document.querySelector("#userProfileFile");
const profileEditIcon = document.querySelector(".profile-edit-icon");
if(profileEditIcon!=null){
    profileEditIcon.addEventListener('click', () => userProfileFile.click());
}



let reviewContentList; /* 리뷰 글자 수 */
let reviewContentMore; /* 리뷰 글자 수 */

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

let commentView; /* 판매자 답글 버튼 */
let sellerReply; /* 답글 박스 */
let replyEditBtn; /* 리뷰 수정 버튼 */
let sellerReplyWirte; /* 리뷰 달기 박스 */

document.addEventListener("DOMContentLoaded",()=>{

    /* 리뷰 글자 길어질 때 더보기 버튼 보여주기 216글자 이상 */
    reviewContentList=document.querySelectorAll(".seller-profile-top .review-list li>pre");
    reviewContentMore=document.querySelectorAll(".seller-profile-top .review-list li>div:last-of-type>p");

    if(reviewContentList != null) {
        for (let i = 0; i < reviewContentList.length; i++) {
            if(reviewContentList[i].innerText.length>215){
                reviewContentMore[i].style.visibility="visible";
            }
        }
    }
    /* 더보기 버튼 누르면 상세 조회 */
    moreAndReply = document.querySelector(".more-and-reply>p");
    reviewMoreModal=document.querySelector(".seller-profile-top .review-more-modal");

    reviewMoreModalTextArea = document.querySelector(".review-more-modal textarea");
    reviewMoreModalP = document.querySelector(".review-more-modal .sale-review-info>p");
    reviewerName = document.querySelector(".review-more-modal .reviewer-name");
    reviewerProfile = document.querySelector(".review-more-modal .reviewer");
    reviewerDate = document.querySelector(".review-more-modal .review-date");

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
            
            // 모달 열기
            reviewMoreModal.style.display="flex";
            
            // 모달 닫기
            reviewMoreModalClose = document.querySelector(".seller-profile-top .review-more-modal .review-modal-close");
            reviewMoreModalClose.addEventListener('click',()=>{
                reviewMoreModal.style.display="none";
            });
        })
    }

    /* 버튼 누르면 판매자가 리뷰에 대한 답글 달기 */
    commentView = document.querySelectorAll(".comment-view");
    sellerReply = document.querySelectorAll(".seller-reply");
    replyEditBtn = document.querySelectorAll(".reply-edit");
    sellerReplyWirte = document.querySelectorAll(".seller-reply-wirte");

    // document.querySelectorAll(".seller-reply")[0].firstElementChild.lastElementChild.innerHTML;

    if(commentView != null) {
        if(sellerReply != null) { // 답글이 있으면 수정 삭제 버튼 노출
            for(let i = 0; i < commentView.length; i++){
                commentView[i].addEventListener("click",()=>{
                    if(replyEditBtn[i].style.display!=='flex'){
                        if(replyEditBtn!=null) replyEditBtn[i].style.display="flex";
                    } else {    
                        replyEditBtn[i].style.display="none";
                    }
                })
            }
            for(let i = 0; i < commentView.length; i++){
                commentView[i].addEventListener("click",()=>{
                    if(sellerReplyWirte[i].style.display!=='flex'){
                        if(sellerReplyWirte!=null) sellerReplyWirte[i].style.display="flex";
                    } else {
                        sellerReplyWirte[i].style.display="none";
                    }
                })
            }
        } else { // 답글이 없으면 댓글 달기 상자 노출

        }

    }


})
