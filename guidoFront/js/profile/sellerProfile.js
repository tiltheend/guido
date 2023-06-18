/* 프로필 편집 버튼 위임 파일 -> 카메라 아이콘 */
const userProfileFile = document.querySelector("#userProfileFile");
const profileEditIcon = document.querySelector(".profile-edit-icon");
if(profileEditIcon!=null){
    profileEditIcon.addEventListener('click', () => userProfileFile.click());
}



let reviewContentList; /* 리뷰 글자 수 */
let reviewContentMore; /* 리뷰 글자 수 */

let moreAndReply; /* 더보기 버튼 */
let reviewMoreModal; /* 더보기 모달 */
let reviewMoreModalClose; /* 더보기 닫기 */
let replyContent; /* 리뷰 요소 */

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


    if(moreAndReply != null){
        moreAndReply.addEventListener("click",()=>{
            reviewMoreModal.firstElementChild.firstElementChild.innerHTML;
            reviewMoreModal.firstElementChild.firstElementChild.innerHTML;

            reviewMoreModal.style.display="flex";
            
            reviewMoreModalClose = document.querySelector(".seller-profile-top .review-more-modal .review-modal-close");
            // 모달 닫기
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
