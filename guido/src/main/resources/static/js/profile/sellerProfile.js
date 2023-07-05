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

// let commentView; /* 판매자 답글 버튼 */
// let sellerReply; /* 답글 박스 */
// let replyEditBtn; /* 리뷰 수정 버튼 */
// let sellerReplyWirte; /* 리뷰 달기 박스 */

/* 리뷰 글자 길어질 때 더보기 버튼 보여주기 216글자 이상 */
function reviewMoreFn(){
    reviewContentList=document.querySelectorAll(".seller-profile-top .review-list li>pre");
    reviewContentMore=document.querySelectorAll(".seller-profile-top .review-list li>div:last-of-type>p");

    if(reviewContentList != null) {
        for (let i = 0; i < reviewContentList.length; i++) {
            if(reviewContentList[i].innerText.length>215){
                reviewContentMore[i].style.visibility="visible";
            }
        }
    }
}

document.addEventListener("DOMContentLoaded",()=>{

    reviewMoreFn(); /* 리뷰 글자 길어질 때 더보기 버튼 보여주기 216글자 이상 */

})

/* 리뷰 답글 노출 */
function reviewReplyFn (el) {

    /* 버튼 누르면 판매자가 리뷰에 대한 답글 달기 */
    // commentView = document.querySelectorAll(".comment-view");
    // replyEditBtn = document.querySelectorAll(".reply-edit");
    let sellerReply = el.parentElement.parentElement.nextElementSibling.lastElementChild;
    let sellerReplyWirte = el.parentElement.parentElement.nextElementSibling;

    if(sellerReply != null && sellerReply.className==='reply-edit') { // 답글이 있으면 수정 삭제 버튼 노출

        if(sellerReply.style.display!=='flex'){
            sellerReply.style.display="flex";
            sellerReply.previousElementSibling.lastElementChild.removeAttribute("readonly");
        } else {    
            sellerReply.style.display="none";
            sellerReply.previousElementSibling.lastElementChild.setAttribute("readonly",true);
        }

    } 
    if(sellerReplyWirte != null && sellerReplyWirte.className==='seller-reply-wirte') { // 답글이 없으면 댓글 달기 상자 노출
        
        if(sellerReplyWirte.style.display!=='flex'){
            if(sellerReplyWirte!=null) sellerReplyWirte.style.display="flex";
        } else {
            sellerReplyWirte.style.display="none";
        }
    }
    
}
/* 리뷰 답글 달기 */
function reviewReplyAddFn(e){

    let sellerReplyContent = e.target.parentElement.previousElementSibling.lastElementChild;
    if(sellerReplyContent.value.trim().length == 0){
        e.preventDefault();
        alert("내용을 입력해주세요.");
        sellerReplyContent.focus();
        sellerReplyContent.value = ""; // 띄어쓰기, 개행문자 제거
        return;
    }

    let reviewNo = e.target.parentElement.parentElement.previousElementSibling.getAttribute("data-reviewno");

    fetch("/profile/reviewReply",{
        method : "POST",
        headers : {"Content-Type" : "application/json"}, 
        body : JSON.stringify({
            "reviewNo" : reviewNo,
            "reviewMessage" : sellerReplyContent.value
        })
    })
    .then(resp => resp.json())
    .then(result => {

        if(result>0){
            alert("답글이 등록 되었습니다.");

        } else if (result=0){
            alert("답글 등록 실패");
        }
    })
    .catch(err=>{
        e.preventDefault();
        console.log(err);
    });

}

/* 리뷰 답글 수정 */
function reviewReplyEditFn(e){

    let sellerReplyContentEdit = e.target.parentElement.previousElementSibling.lastElementChild;
    if(sellerReplyContentEdit.value.trim().length == 0){
        e.preventDefault();
        alert("내용을 입력해주세요.");
        sellerReplyContentEdit.focus();
        sellerReplyContentEdit.value = ""; // 띄어쓰기, 개행문자 제거
        return;
    }

    let reviewNo = e.target.parentElement.parentElement.previousElementSibling.getAttribute("data-reviewno");

    fetch("/profile/reviewReplyEdit",{
        method : "POST",
        headers : {"Content-Type" : "application/json"}, 
        body : JSON.stringify({
            "reviewNo" : reviewNo,
            "reviewMessage" : sellerReplyContentEdit.value
        })
    })
    .then(resp => resp.json())
    .then(result => {

        if(result>0){
            alert("답글이 수정 되었습니다.");

        } else if (result=0){
            alert("답글 수정 실패");
        }
    })
    .catch(err=>{
        e.preventDefault();
        console.log(err);
    });

}

/* 리뷰 답글 삭제 */
function reviewReplyDelFn(e){

    let reviewNo = e.target.parentElement.parentElement.previousElementSibling.getAttribute("data-reviewno");

    if(confirm("답글을 삭제 하시겠습니까?")){

        fetch("/profile/reviewReplyDel",{
            method : "POST",
            headers : {"Content-Type" : "application/json"}, 
            body: reviewNo
        })
        .then(resp => resp.text())
        .then(result => {
    
            if(result>0){
                alert("답글이 삭제 되었습니다.");
    
            } else if (result=0){
                alert("답글 삭제 실패");
            }
        })
        .catch(err=>{
            e.preventDefault();
            console.log(err);
        });
    }

}

// 리뷰 긴 것 더보기 상세 조회
function moreReviewFn(el){

    /* 더보기 버튼 누르면 상세 조회 */
    moreAndReply = document.querySelector(".more-and-reply>p");
    reviewMoreModal=document.querySelector(".seller-profile-top .review-more-modal");

    reviewMoreModalTextArea = document.querySelector(".review-more-modal textarea");
    reviewMoreModalP = document.querySelector(".review-more-modal .sale-review-info>p");
    reviewerName = document.querySelector(".review-more-modal .reviewer-name");
    reviewerProfile = document.querySelector(".review-more-modal .reviewer");
    reviewerDate = document.querySelector(".review-more-modal .review-date");
    reviewerRating = document.querySelector(".review-more-modal .review-rating");

    // 리뷰 상세 조회 내용 넣기
    reviewMoreModalTextArea.innerText = el.parentElement.previousElementSibling.innerText;
    
    // 리뷰 상세 조회 상품 제목 넣기
    reviewMoreModalP.innerText = el.parentElement.previousElementSibling.previousElementSibling.lastElementChild.firstElementChild.innerText;
    
    // 리뷰 이름 넣기
    reviewerName.innerText = el.parentElement.previousElementSibling.previousElementSibling.firstElementChild.lastElementChild.innerText;
    
    // 리뷰 사진 넣기
    reviewerProfile.innerHTML = el.parentElement.previousElementSibling.previousElementSibling.firstElementChild.firstElementChild.innerHTML;
    
    // 리뷰 날짜 넣기
    reviewerDate.innerText = el.parentElement.previousElementSibling.previousElementSibling.lastElementChild.lastElementChild.innerText;
    
    // 리뷰 별점 넣기
    reviewerRating.innerHTML = el.parentElement.previousElementSibling.previousElementSibling.lastElementChild.lastElementChild.innerHTML;
    
    // 모달 열기
    reviewMoreModal.style.display="flex";
    
    // 모달 닫기
    reviewMoreModalClose = document.querySelector(".seller-profile-top .review-more-modal .review-modal-close");
    reviewMoreModalClose.addEventListener('click',e=>{
        e.preventDefault;
        reviewMoreModal.style.display="none";
    });

};
