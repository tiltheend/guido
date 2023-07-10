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

let reviewMoreBtn; /* 리뷰 더보기 버튼 */
let productMoreBtn; /* 상품 더보기 버튼 */

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
    reviewMoreBtnFn(); /* 리뷰 갯수 세서 3 이하면 버튼 없애고 4이상이면 출력하게 하기 */
    productwMoreBtnFn(); /* 상품 갯수 세서 3 이하면 버튼 없애고 4이상이면 출력하게 하기 */

})

// 리뷰 갯수 세서 3 이하면 버튼 없애고 4이상이면 출력하게 하기
function reviewMoreBtnFn(){
    reviewMoreBtn = document.querySelector(".review-list-more");

    let reviewCountSpan = document.querySelector(".seller-review>h1>span").innerText;
    
    if(reviewCountSpan<=3){
        reviewMoreBtn.style.display="none";
    } else {
        reviewMoreBtn.style.display="block";
    }
}

// 상품 갯수 세서 3 이하면 버튼 없애고 4이상이면 출력하게 하기
function productwMoreBtnFn(){
    productMoreBtn = document.querySelector(".sales-list-more");

    let productCountSpan = document.querySelector(".sales-list>div>h1>span").innerText;
    
    if(productCountSpan<=3){
        productMoreBtn.style.display="none";
    } else {
        productMoreBtn.style.display="block";
    }
}


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
    if(sellerReplyWirte != null && sellerReplyWirte.className==='seller-reply-write') { // 답글이 없으면 댓글 달기 상자 노출
        
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
            reviewListFn();
            reviewMoreBtnFn();

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
            reviewListFn();
            reviewMoreBtnFn();

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
                reviewListFn();
                reviewMoreBtnFn();
    
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
function moreReviewFn(e){

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
    reviewMoreModalTextArea.innerText = e.target.parentElement.previousElementSibling.innerText;
    
    // 리뷰 상세 조회 상품 제목 넣기
    reviewMoreModalP.innerText = e.target.parentElement.previousElementSibling.previousElementSibling.lastElementChild.firstElementChild.innerText;
    
    // 리뷰 이름 넣기
    reviewerName.innerText = e.target.parentElement.previousElementSibling.previousElementSibling.firstElementChild.lastElementChild.innerText;
    
    // 리뷰 사진 넣기
    reviewerProfile.innerHTML = e.target.parentElement.previousElementSibling.previousElementSibling.firstElementChild.firstElementChild.innerHTML;
    
    // 리뷰 날짜 넣기
    reviewerDate.innerText = e.target.parentElement.previousElementSibling.previousElementSibling.lastElementChild.lastElementChild.innerText;
    
    // 리뷰 별점 넣기
    reviewerRating.innerHTML = e.target.parentElement.previousElementSibling.previousElementSibling.lastElementChild.lastElementChild.innerHTML;
    // reviewMoreModal.innerHTML = e.target.parentElement.previousElementSibling.previousElementSibling.lastElementChild.lastElementChild.innerHTML;
    
    

    // 모달 열기
    reviewMoreModal.style.display="flex";
    
    // 모달 닫기
    reviewMoreModalClose = document.querySelector(".seller-profile-top .review-more-modal .review-modal-close");
    reviewMoreModalClose.addEventListener('click',e=>{
        e.preventDefault;
        reviewMoreModal.style.display="none";
    });

};




/* 비동기로 리뷰 목록 불러오기 (최신 3개) */
function reviewListFn(){

                
    let reviewList = document.querySelector('.seller-review .review-list');

    fetch("/profile/guideReviewList",{
        method : "POST",
        headers : {"Content-Type" : "application/json"}, 
        body : pageUserNo
    })
    .then(resp => resp.json())
    .then(guideReviewList => {

        if(guideReviewList.length >0){

            // 기존 리뷰 지우기
            let reviewListElements = document.querySelectorAll('.seller-review .review-list>li');
    
            reviewListElements.forEach(function(reviewListElement) {
                reviewListElement.parentNode.removeChild(reviewListElement);
            });
    
            // let reviewCount = newReviewList[0].reviewCount;
            // document.querySelector(".my-review>div>h1>span").innerText=reviewCount;

            for (let i = 0; i <guideReviewList.length; i++) {
                const review = guideReviewList[i];
    
                if(review == null) break;

                // <li> 요소를 생성합니다.
                const li = document.createElement('li');
                
                // 내부 <ul> 요소를 생성합니다.
                const innerUl = document.createElement('ul');
                const innerli1 = document.createElement('li');
                
                // 'reply-content' 클래스와 'reply-content' 속성을 추가합니다.
                innerli1.classList.add('reply-content');
                innerli1.setAttribute('data-reviewno', review.reviewNo);
                
                // 리뷰 남긴 사람 프로필을 포함한 <div>를 생성합니다.
                const innerliDiv = document.createElement('div');
                
                // 리뷰어 정보를 담은 <div>를 생성합니다.
                const reviewerDiv1 = document.createElement('div');
                const reviewerDiv2 = document.createElement('div');
                reviewerDiv2.classList.add('reviewer');
                
                // 프로필 사진을 담을 <img> 요소를 생성합니다.
                const profileImage = document.createElement('img');
                profileImage.src = review.profileImage?review.profileImage:"/images/userProfile/basicUser.png";
                profileImage.setAttribute('alt', 'profileImage');
                profileImage.classList.add('img-content');

                                
                const userProfileLink = document.createElement('a');
                userProfileLink.href = `/profile/${review.userNo}`;
                
                // 리뷰어 이름을 담은 <p> 요소를 생성합니다.
                const reviewerName = document.createElement('p');
                reviewerName.classList.add('reviewer-name');
                reviewerName.textContent = review.userName;


                innerli1.appendChild(innerliDiv);

                // 리뷰 남긴 사람 프로필
                innerliDiv.appendChild(reviewerDiv1);
                reviewerDiv1.appendChild(reviewerDiv2);
                reviewerDiv2.appendChild(profileImage);
                reviewerDiv1.appendChild(userProfileLink);
                userProfileLink.appendChild(reviewerName);
    
                // 리뷰 정보(제목+별점)
                const reviewerDiv3 = document.createElement('div');
                reviewerDiv3.classList.add('sale-review-info');

                // 상품 제목을 담은 <p> 요소를 생성합니다.
                const productName = document.createElement('p');
                productName.textContent = review.productName;
                
                // 리뷰 점수를 담은 <div>를 생성합니다.
                const reviewRating = document.createElement('div');
                reviewRating.classList.add('review-rating');
                
                // 리뷰 점수를 담은 <div>를 생성합니다.
                const reviewStar = document.createElement('div');
                reviewStar.classList.add('review-star');
                
                for (let j = 0; j < 10; j++) {
                    const starInput = document.createElement("input");
                    starInput.type = "radio";
                    starInput.id = `starpoint_${j + 1}`;
                    starInput.classList.add("star_radio");
                    starInput.value = (j + 1) * 0.5;
                    if (review.reviewStarsDouble === (j + 1) * 0.5) {
                        starInput.checked = true;
                        starInput.setAttribute("checked", "checked");
                    }
                    reviewStar.appendChild(starInput);
                }
                
                const starpointBgSpan = document.createElement("span");
                starpointBgSpan.classList.add("starpoint_bg");
                reviewStar.appendChild(starpointBgSpan);
            
                // 리뷰 날짜를 담은 <span> 요소를 생성합니다.
                const reviewDate = document.createElement('span');
                reviewDate.classList.add('review-date');
                reviewDate.textContent = review.createDate;

                // 리뷰 정보 상품 제목
                innerliDiv.appendChild(reviewerDiv3);
                reviewerDiv3.appendChild(productName);
                // 리뷰 정보 별점
                reviewerDiv3.appendChild(reviewRating);
                reviewRating.appendChild(reviewStar);
                // 리뷰 작성 날짜
                reviewRating.appendChild(reviewDate);


                // 리뷰 내용을 담은 <pre> 요소를 생성합니다.
                const reviewMessage = document.createElement('pre');
                reviewMessage.textContent = review.reviewMessage;

                // 리뷰 내용
                innerli1.appendChild(reviewMessage);

                // "더보기"와 "답글 보기"를 담은 <div>를 생성합니다.
                const moreAndReplyDiv = document.createElement('div');
                moreAndReplyDiv.classList.add('more-and-reply');

                // "더보기"를 담은 <p> 요소를 생성합니다.
                const moreButton = document.createElement('p');
                moreButton.textContent = '더보기 +';
                moreButton.addEventListener('click', e => {
                    moreReviewFn(e);
                });

                // 더보기 + 코맨트
                innerli1.appendChild(moreAndReplyDiv);
                moreAndReplyDiv.appendChild(moreButton);
                
                if(pageUserNo === loginUserNo) {

                    // "답글 보기"를 담은 <div>를 생성합니다.
                    const commentViewDiv = document.createElement('div');
                    commentViewDiv.classList.add('comment-view');
                    commentViewDiv.addEventListener('click', function() {
                        reviewReplyFn(this);
                    });

                    // "답글 보기" 아이콘 이미지를 담은 <img> 요소를 생성합니다.
                    const commentViewImg = document.createElement('img');
                    commentViewImg.src = '/images/profile/comment-view.png';
                    commentViewImg.setAttribute('alt', 'comment-view');

                    // "답글 보기" 아이콘 호버 이미지를 담은 <img> 요소를 생성합니다.
                    const commentViewHoverImg = document.createElement('img');
                    commentViewHoverImg.src = '/images/profile/comment-view_hover.png';
                    commentViewHoverImg.setAttribute('alt', 'comment-view_hover');

                    // 답글 버튼
                    moreAndReplyDiv.appendChild(commentViewDiv);
                    commentViewDiv.appendChild(commentViewImg);
                    commentViewDiv.appendChild(commentViewHoverImg);

                }

                // 답글을 담은 <li> 요소를 생성합니다.
                const replyLi = document.createElement('li');
                replyLi.classList.add('seller-reply');

                // 답글 아이콘 이미지를 담은 <img> 요소를 생성합니다.
                const replyIconImg1 = document.createElement('img');
                replyIconImg1.src = '/images/profile/replyIcon.png';
                replyIconImg1.setAttribute('alt', 'replyIcon');

                // 판매자 답글 내용을 담을 <textarea> 요소를 생성합니다.
                const sellerReplyContentTextarea = document.createElement('textarea');
                sellerReplyContentTextarea.setAttribute('name', 'sellerReplyContent');
                sellerReplyContentTextarea.setAttribute('id', 'sellerReplyContent');
                sellerReplyContentTextarea.setAttribute('maxlength', '200');
                sellerReplyContentTextarea.setAttribute('readonly', '');
                sellerReplyContentTextarea.textContent = review.reviewReply;

                // 판매자 답글을 담은 <div>를 생성합니다.
                const sellerReplyDiv = document.createElement('div');
                sellerReplyDiv.appendChild(replyIconImg1);
                sellerReplyDiv.appendChild(sellerReplyContentTextarea);

                let sellerReplyWriteLi;

                if(review.reviewReply != null){

                    if(pageUserNo === loginUserNo) {
                        // 답글 편집 버튼과 삭제 버튼을 담은 <div>를 생성합니다.
                    const replyEditDiv = document.createElement('div');
                    replyEditDiv.classList.add('reply-edit');
    
                    // 편집 버튼을 담은 <button>을 생성합니다.
                    const editButton = document.createElement('button');
                    editButton.textContent = 'Edit';
                    editButton.setAttribute('type', 'button');
                    // editButton.setAttribute('onclick', 'reviewReplyEditFn(event)');                editButton.setAttribute('onclick', 'reviewReplyEditFn(event)');
                    editButton.addEventListener('click', e => {
                        reviewReplyEditFn(e);
                    });
    
                    // 삭제 버튼을 담은 <button>을 생성합니다.
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.setAttribute('type', 'button');
                    deleteButton.addEventListener('click', e => {
                        reviewReplyDelFn(e);
                    });
    
                    // 편집 버튼과 삭제 버튼을 담은 <div>에 요소를 추가합니다.
                    replyEditDiv.appendChild(editButton);
                    replyEditDiv.appendChild(deleteButton);
    
                    // 판매자 답글을 담은 <li>에 요소를 추가합니다.
                    replyLi.appendChild(sellerReplyDiv);
                    replyLi.appendChild(replyEditDiv);

                    }
                    
                } else {

                    // 판매자 답글을 작성하는 <li>를 생성합니다.
                    sellerReplyWriteLi = document.createElement('li');
                    sellerReplyWriteLi.classList.add('seller-reply-write');
    
                    // 판매자 답글 작성을 위한 <div>를 생성합니다.
                    const sellerReplyWriteDiv1 = document.createElement('div');
                    const sellerReplyWriteDiv2 = document.createElement('div');
    
                    // 판매자 답글 아이콘 이미지를 담은 <img> 요소를 생성합니다.
                    const replyIconImg = document.createElement('img');
                    replyIconImg.src = '/images/profile/replyIcon.png';
                    replyIconImg.setAttribute('alt', 'replyIcon');
    
                    // 판매자 답글 작성을 위한 <textarea>를 생성합니다.
                    const sellerReplyTextarea = document.createElement('textarea');
                    sellerReplyTextarea.setAttribute('name', 'sellerReplyContent');
                    sellerReplyTextarea.setAttribute('id', 'sellerReplyContent');
    
                    // 판매자 답글 작성을 위한 <div>에 요소를 추가합니다.
                    sellerReplyWriteDiv1.appendChild(replyIconImg);
                    sellerReplyWriteDiv1.appendChild(sellerReplyTextarea);
    
                    // 판매자 답글 작성을 위한 <div>에 요소를 추가합니다.
                    sellerReplyWriteLi.appendChild(sellerReplyWriteDiv1);
                    sellerReplyWriteLi.appendChild(sellerReplyWriteDiv2);
    
                    if (pageUserNo === loginUserNo) {
                        // 판매자 답글 작성을 위한 "register" 버튼을 생성합니다.
                        const replySendButton = document.createElement('button');
                        replySendButton.classList.add('reply-send');
                        replySendButton.textContent = 'register';
                        replySendButton.addEventListener('click', function(event) {
                            reviewReplyAddFn(event);
                        });
        
                        // 판매자 답글 작성을 위한 <div>에 "register" 버튼을 추가합니다.
                        sellerReplyWriteDiv2.appendChild(replySendButton);
                    }
                }

                // <ul>에 리뷰 정보를 추가합니다.
                reviewList.appendChild(li);
                li.appendChild(innerUl);
                innerUl.appendChild(innerli1);
                
                // 답글 수정 박스
                if(review.reviewReply != null){
                    innerUl.appendChild(replyLi);
                };
                // 답글 작성 박스
                if(sellerReplyWriteLi != null){
                    innerUl.appendChild(sellerReplyWriteLi);
                }
                
            }

        }

    })
    .catch(err=>{
        console.log(err);
        reviewMoreBtn.style.display="none";
    });

};


reviewMoreBtn = document.querySelector(".seller-review .review-list-more");
/* 리뷰 더보기 js */
if(reviewMoreBtn !=null) {

    let reviewList = document.querySelector('.seller-review .review-list');

    reviewMoreBtn.addEventListener("click", e => {
        let startReviewNum = reviewList.childElementCount;
        // console.log(startReviewNum);

        fetch("/profile/guideReviewMore",{
            method : "POST",
            headers : {"Content-Type" : "application/json"}, 
            body : JSON.stringify({
                "startReviewNum" : startReviewNum,
                "userNo" : pageUserNo
            })
        })
        .then(resp => resp.json())
        .then(guideReviewList => {
    
            if (guideReviewList.length < 4) {
                reviewMoreBtn.style.display = "none";
            }
    
            if (guideReviewList.length > 0) {
                
                for (let i = 0; i < 3; i++) {
                    const review = guideReviewList[i];
    
                    if(review == null) break;

                    // <li> 요소를 생성합니다.
                    const li = document.createElement('li');
                    
                    // 내부 <ul> 요소를 생성합니다.
                    const innerUl = document.createElement('ul');
                    const innerli1 = document.createElement('li');
                    
                    // 'reply-content' 클래스와 'reply-content' 속성을 추가합니다.
                    innerli1.classList.add('reply-content');
                    innerli1.setAttribute('data-reviewno', review.reviewNo);
                    
                    // 리뷰 남긴 사람 프로필을 포함한 <div>를 생성합니다.
                    const innerliDiv = document.createElement('div');
                    
                    // 리뷰어 정보를 담은 <div>를 생성합니다.
                    const reviewerDiv1 = document.createElement('div');
                    const reviewerDiv2 = document.createElement('div');
                    reviewerDiv2.classList.add('reviewer');
                    
                    // 프로필 사진을 담을 <img> 요소를 생성합니다.
                    const profileImage = document.createElement('img');
                    profileImage.src = review.profileImage?review.profileImage:"/images/userProfile/basicUser.png";
                    profileImage.setAttribute('alt', 'profileImage');
                    profileImage.classList.add('img-content');

                    const userProfileLink = document.createElement('a');
                    userProfileLink.href = `/profile/${review.userNo}`;
                    
                    // 리뷰어 이름을 담은 <p> 요소를 생성합니다.
                    const reviewerName = document.createElement('p');
                    reviewerName.classList.add('reviewer-name');
                    reviewerName.textContent = review.userName;


                    innerli1.appendChild(innerliDiv);

                    // 리뷰 남긴 사람 프로필
                    innerliDiv.appendChild(reviewerDiv1);
                    reviewerDiv1.appendChild(reviewerDiv2);
                    reviewerDiv2.appendChild(profileImage);
                    reviewerDiv1.appendChild(userProfileLink);
                    userProfileLink.appendChild(reviewerName);
        
                    // 리뷰 정보(제목+별점)
                    const reviewerDiv3 = document.createElement('div');
                    reviewerDiv3.classList.add('sale-review-info');

                    // 상품 제목을 담은 <p> 요소를 생성합니다.
                    const productName = document.createElement('p');
                    productName.textContent = review.productName;
                    
                    // 리뷰 점수를 담은 <div>를 생성합니다.
                    const reviewRating = document.createElement('div');
                    reviewRating.classList.add('review-rating');
                    
                    // 리뷰 점수를 담은 <div>를 생성합니다.
                    const reviewStar = document.createElement('div');
                    reviewStar.classList.add('review-star');
                    
                    for (let j = 0; j < 10; j++) {
                        const starInput = document.createElement("input");
                        starInput.type = "radio";
                        starInput.id = `starpoint_${j + 1}`;
                        starInput.classList.add("star_radio");
                        starInput.value = (j + 1) * 0.5;
                        if (review.reviewStarsDouble === (j + 1) * 0.5) {
                            starInput.checked = true;
                            starInput.setAttribute("checked", "checked");
                        }
                        reviewStar.appendChild(starInput);
                    }
                    
                    const starpointBgSpan = document.createElement("span");
                    starpointBgSpan.classList.add("starpoint_bg");
                    reviewStar.appendChild(starpointBgSpan);
                
                    // 리뷰 날짜를 담은 <span> 요소를 생성합니다.
                    const reviewDate = document.createElement('span');
                    reviewDate.classList.add('review-date');
                    reviewDate.textContent = review.createDate;

                    // 리뷰 정보 상품 제목
                    innerliDiv.appendChild(reviewerDiv3);
                    reviewerDiv3.appendChild(productName);
                    // 리뷰 정보 별점
                    reviewerDiv3.appendChild(reviewRating);
                    reviewRating.appendChild(reviewStar);
                    // 리뷰 작성 날짜
                    reviewRating.appendChild(reviewDate);


                    // 리뷰 내용을 담은 <pre> 요소를 생성합니다.
                    const reviewMessage = document.createElement('pre');
                    reviewMessage.textContent = review.reviewMessage;

                    // 리뷰 내용
                    innerli1.appendChild(reviewMessage);

                    // "더보기"와 "답글 보기"를 담은 <div>를 생성합니다.
                    const moreAndReplyDiv = document.createElement('div');
                    moreAndReplyDiv.classList.add('more-and-reply');

                    // "더보기"를 담은 <p> 요소를 생성합니다.
                    const moreButton = document.createElement('p');
                    moreButton.textContent = '더보기 +';
                    moreButton.addEventListener('click', e => {
                        moreReviewFn(e);
                    });

                    // 더보기 + 코맨트
                    innerli1.appendChild(moreAndReplyDiv);
                    moreAndReplyDiv.appendChild(moreButton);
                    
                    if(pageUserNo === loginUserNo) {

                        // "답글 보기"를 담은 <div>를 생성합니다.
                        const commentViewDiv = document.createElement('div');
                        commentViewDiv.classList.add('comment-view');
                        commentViewDiv.addEventListener('click', function() {
                            reviewReplyFn(this);
                        });

                        // "답글 보기" 아이콘 이미지를 담은 <img> 요소를 생성합니다.
                        const commentViewImg = document.createElement('img');
                        commentViewImg.src = '/images/profile/comment-view.png';
                        commentViewImg.setAttribute('alt', 'comment-view');

                        // "답글 보기" 아이콘 호버 이미지를 담은 <img> 요소를 생성합니다.
                        const commentViewHoverImg = document.createElement('img');
                        commentViewHoverImg.src = '/images/review/comment-view_hover.png';
                        commentViewHoverImg.setAttribute('alt', 'comment-view_hover');

                        // 답글 버튼
                        moreAndReplyDiv.appendChild(commentViewDiv);
                        commentViewDiv.appendChild(commentViewImg);
                        commentViewDiv.appendChild(commentViewHoverImg);

                    }

                    // 답글을 담은 <li> 요소를 생성합니다.
                    const replyLi = document.createElement('li');
                    replyLi.classList.add('seller-reply');

                    // 답글 아이콘 이미지를 담은 <img> 요소를 생성합니다.
                    const replyIconImg1 = document.createElement('img');
                    replyIconImg1.src = '/images/profile/replyIcon.png';
                    replyIconImg1.setAttribute('alt', 'replyIcon');

                    // 판매자 답글 내용을 담을 <textarea> 요소를 생성합니다.
                    const sellerReplyContentTextarea = document.createElement('textarea');
                    sellerReplyContentTextarea.setAttribute('name', 'sellerReplyContent');
                    sellerReplyContentTextarea.setAttribute('id', 'sellerReplyContent');
                    sellerReplyContentTextarea.setAttribute('maxlength', '200');
                    sellerReplyContentTextarea.setAttribute('readonly', '');
                    sellerReplyContentTextarea.textContent = review.reviewReply;

                    // 판매자 답글을 담은 <div>를 생성합니다.
                    const sellerReplyDiv = document.createElement('div');
                    sellerReplyDiv.appendChild(replyIconImg1);
                    sellerReplyDiv.appendChild(sellerReplyContentTextarea);

                    let sellerReplyWriteLi;

                    if(review.reviewReply != null){

                        if(pageUserNo === loginUserNo) {
                            // 답글 편집 버튼과 삭제 버튼을 담은 <div>를 생성합니다.
                        const replyEditDiv = document.createElement('div');
                        replyEditDiv.classList.add('reply-edit');
        
                        // 편집 버튼을 담은 <button>을 생성합니다.
                        const editButton = document.createElement('button');
                        editButton.textContent = 'Edit';
                        editButton.setAttribute('type', 'button');
                        // editButton.setAttribute('onclick', 'reviewReplyEditFn(event)');                editButton.setAttribute('onclick', 'reviewReplyEditFn(event)');
                        editButton.addEventListener('click', e => {
                            reviewReplyEditFn(e);
                        });
        
                        // 삭제 버튼을 담은 <button>을 생성합니다.
                        const deleteButton = document.createElement('button');
                        deleteButton.textContent = 'Delete';
                        deleteButton.setAttribute('type', 'button');
                        deleteButton.addEventListener('click', e => {
                            reviewReplyDelFn(e);
                        });
        
                        // 편집 버튼과 삭제 버튼을 담은 <div>에 요소를 추가합니다.
                        replyEditDiv.appendChild(editButton);
                        replyEditDiv.appendChild(deleteButton);
        
                        // 판매자 답글을 담은 <li>에 요소를 추가합니다.
                        replyLi.appendChild(sellerReplyDiv);
                        replyLi.appendChild(replyEditDiv);

                        }
                        
                    } else {

                        // 판매자 답글을 작성하는 <li>를 생성합니다.
                        sellerReplyWriteLi = document.createElement('li');
                        sellerReplyWriteLi.classList.add('seller-reply-write');
        
                        // 판매자 답글 작성을 위한 <div>를 생성합니다.
                        const sellerReplyWriteDiv1 = document.createElement('div');
                        const sellerReplyWriteDiv2 = document.createElement('div');
        
                        // 판매자 답글 아이콘 이미지를 담은 <img> 요소를 생성합니다.
                        const replyIconImg = document.createElement('img');
                        replyIconImg.src = '/images/profile/replyIcon.png';
                        replyIconImg.setAttribute('alt', 'replyIcon');
        
                        // 판매자 답글 작성을 위한 <textarea>를 생성합니다.
                        const sellerReplyTextarea = document.createElement('textarea');
                        sellerReplyTextarea.setAttribute('name', 'sellerReplyContent');
                        sellerReplyTextarea.setAttribute('id', 'sellerReplyContent');
        
                        // 판매자 답글 작성을 위한 <div>에 요소를 추가합니다.
                        sellerReplyWriteDiv1.appendChild(replyIconImg);
                        sellerReplyWriteDiv1.appendChild(sellerReplyTextarea);
        
                        // 판매자 답글 작성을 위한 <div>에 요소를 추가합니다.
                        sellerReplyWriteLi.appendChild(sellerReplyWriteDiv1);
                        sellerReplyWriteLi.appendChild(sellerReplyWriteDiv2);
        
                        if (pageUserNo === loginUserNo) {
                            // 판매자 답글 작성을 위한 "register" 버튼을 생성합니다.
                            const replySendButton = document.createElement('button');
                            replySendButton.classList.add('reply-send');
                            replySendButton.textContent = 'register';
                            replySendButton.addEventListener('click', function(event) {
                                reviewReplyAddFn(event);
                            });
            
                            // 판매자 답글 작성을 위한 <div>에 "register" 버튼을 추가합니다.
                            sellerReplyWriteDiv2.appendChild(replySendButton);
                        }
                    }

                    // <ul>에 리뷰 정보를 추가합니다.
                    reviewList.appendChild(li);
                    li.appendChild(innerUl);
                    innerUl.appendChild(innerli1);
                    
                    // 답글 수정 박스
                    if(review.reviewReply != null){
                        innerUl.appendChild(replyLi);
                    };
                    // 답글 작성 박스
                    if(sellerReplyWriteLi != null){
                        innerUl.appendChild(sellerReplyWriteLi);
                    }
                    
                }
    
                reviewMoreFn();
            }
    
        })
        .catch(err=>{
            console.log(err);
            reviewMoreBtn.style.display="none";
        });
    
    });
}

/* 비동기로 상품 목록 불러오기 (최신 3개) */
function productListFn(e){

    productMoreBtn = document.querySelector(".sales-list-more");

    fetch("/profile/guideProductList",{
        method : "POST",
        headers : {"Content-Type" : "application/json"}, 
        body : pageUserNo
    })
    .then(resp => resp.json())
    .then(guideProductList => {

        let productList = document.querySelector('.sales-list-box');
        if(guideProductList.length >0){

            // 기존 리뷰 지우기
            let productListElements = document.querySelectorAll('.sales-list-box>li');
    
            productListElements.forEach(function(productListElement) {
            productListElement.parentNode.removeChild(productListElement);
            });
    
            // let reviewCount = newReviewList[0].reviewCount;
            // document.querySelector(".my-review>div>h1>span").innerText=reviewCount;
            
            for (let i = 0; i <guideProductList.length; i++) {
                const product = guideProductList[i];
    
                if(product == null) break;

                const liElement = document.createElement("li");

                const saleImgElement = document.createElement("div");
                saleImgElement.classList.add("sale-img");

                const aElement = document.createElement("a");
                aElement.href = "/productDetail/product/" + product.productNo;
                const imgElement = document.createElement("img");
                imgElement.src = product.thumbnail;
                imgElement.alt = "productImg";
                aElement.appendChild(imgElement);
                saleImgElement.appendChild(aElement);
                liElement.appendChild(saleImgElement);

                const saleContentElement = document.createElement("div");
                saleContentElement.classList.add("sale-content");

                const h2Element = document.createElement("h2");
                h2Element.innerText = product.productName;
                saleContentElement.appendChild(h2Element);

                const pElement = document.createElement("p");
                const locationImgElement = document.createElement("img");
                locationImgElement.src = "/images/profile/location.png";
                locationImgElement.alt = "location";
                pElement.appendChild(locationImgElement);
                pElement.appendChild(document.createTextNode(product.regionName));
                saleContentElement.appendChild(pElement);

                product.tourCourse.forEach(course => {
                    if (course.bossCourseFL === 'Y') {
                        const spanElement = document.createElement("span");
                        spanElement.innerText = " - " + course.courseName;
                        pElement.appendChild(spanElement);
                    }
                });

                const h3Element = document.createElement("h3");
                if (product.productPackage === 1) {
                    h3Element.innerText = "a " + product.tourDuration + "-hours day trip in " + product.regionName;
                } else if (product.productPackage > 1) {
                    h3Element.innerText = product.productPackage + " day trip in " + product.regionName;
                }
                saleContentElement.appendChild(h3Element);

                console.log(product);
                console.log(product.productDateList);
                if (product.productDateList.length > 0) {
                    const pElement2 = document.createElement("p");
                    const productDateBlock = document.createElement("block");
                    productDateBlock.innerText = product.productDateList[0].productDate;
                    pElement2.appendChild(productDateBlock);

                    if (product.productDateList.length > 1) {
                        const productDateBlock2 = document.createElement("block");
                        productDateBlock2.innerText = " ~ " + product.productDateList[product.productDateList.length - 1].productDate;
                        pElement2.appendChild(productDateBlock2);
                    }

                    saleContentElement.appendChild(pElement2);
                }

                const pElement3 = document.createElement("p");
                const languageImgElement = document.createElement("img");
                languageImgElement.src = "/images/profile/language.png";
                languageImgElement.alt = "language";
                pElement3.appendChild(languageImgElement);
                pElement3.appendChild(document.createTextNode("Guided language: " + product.guideLanguage));
            
                saleContentElement.appendChild(pElement3);

                const containerDiv = document.createElement('div');

                const starSpan = document.createElement('span');
                const starImage = document.createElement('img');
                starImage.src = '/images/profile/slideStar.png';
                starImage.alt = 'slideStar';
                starSpan.appendChild(starImage);

                const reviewSpan = document.createElement('span');
                const reviewStars = document.createTextNode(product.reviewStars);
                reviewSpan.appendChild(reviewStars);

                containerDiv.appendChild(starSpan);
                containerDiv.appendChild(reviewSpan);

                const priceH3 = document.createElement('h3');
                if (reservation.productPackage=='1') {
                const priceText = document.createTextNode(`₩ ${product.productPrice.toLocaleString()} / person`);
                    priceH3.appendChild(priceText);
                } else {
                const priceText = document.createTextNode(`₩ ${product.productPrice.toLocaleString()} / total`);
                    priceH3.appendChild(priceText);
                }

                containerDiv.appendChild(priceH3);

                saleContentElement.appendChild(containerDiv);

                liElement.appendChild(saleContentElement);
                productList.appendChild(liElement);

            }

        }

    })
    .catch(err=>{
        console.log(err);
        productMoreBtn.style.display="none";
    });

};

productMoreBtn = document.querySelector(".sales-list-more");

/* 상품 더보기 js */
if(productMoreBtn !=null) {
    let productList = document.querySelector('.sales-list-box');

    productMoreBtn.addEventListener("click", e => {
        let startReviewNum = productList.childElementCount;

        fetch("/profile/guideProductMore",{
            method : "POST",
            headers : {"Content-Type" : "application/json"}, 
            body : JSON.stringify({
                "startReviewNum" : startReviewNum,
                "userNo" : pageUserNo
            })
        })
        .then(resp => resp.json())
        .then(moreProductList => {

            if (moreProductList.length < 4) {
                productMoreBtn.style.display = "none";
            }
    
            if (moreProductList.length > 0) {
                console.log(1);
                for (let i = 0; i < 3; i++) {
                    const product = moreProductList[i];
                    console.log(product);
                    console.log(2);
                    if(product == null) break;
                    console.log(3);
                    const liElement = document.createElement("li");

                    const saleImgElement = document.createElement("div");
                    saleImgElement.classList.add("sale-img");

                    const aElement = document.createElement("a");
                    aElement.href = "/productDetail/product/" + product.productNo;
                    const imgElement = document.createElement("img");
                    imgElement.src = product.thumbnail;
                    imgElement.alt = "productImg";
                    aElement.appendChild(imgElement);
                    saleImgElement.appendChild(aElement);
                    liElement.appendChild(saleImgElement);

                    const saleContentElement = document.createElement("div");
                    saleContentElement.classList.add("sale-content");

                    const h2Element = document.createElement("h2");
                    h2Element.innerText = product.productName;
                    saleContentElement.appendChild(h2Element);

                    const pElement = document.createElement("p");
                    const locationImgElement = document.createElement("img");
                    locationImgElement.src = "/images/profile/location.png";
                    locationImgElement.alt = "location";
                    pElement.appendChild(locationImgElement);
                    pElement.appendChild(document.createTextNode(product.regionName));
                    saleContentElement.appendChild(pElement);

                    product.tourCourse.forEach(course => {
                        if (course.bossCourseFL === 'Y') {
                            const spanElement = document.createElement("span");
                            spanElement.innerText = " - " + course.courseName;
                            pElement.appendChild(spanElement);
                        }
                    });

                    const h3Element = document.createElement("h3");
                    if (product.productPackage === 1) {
                        h3Element.innerText = "a " + product.tourDuration + "-hours day trip in " + product.regionName;
                    } else if (product.productPackage > 1) {
                        h3Element.innerText = product.productPackage + " day trip in " + product.regionName;
                    }
                    saleContentElement.appendChild(h3Element);

                    console.log(product);
                    console.log(product.productDateList);
                    if (product.productDateList.length > 0) {
                        const pElement2 = document.createElement("p");
                        const productDateBlock = document.createElement("block");
                        productDateBlock.innerText = product.productDateList[0].productDate;
                        pElement2.appendChild(productDateBlock);

                        if (product.productDateList.length > 1) {
                            const productDateBlock2 = document.createElement("block");
                            productDateBlock2.innerText = " ~ " + product.productDateList[product.productDateList.length - 1].productDate;
                            pElement2.appendChild(productDateBlock2);
                        }

                        saleContentElement.appendChild(pElement2);
                    }
                    const pElement3 = document.createElement("p");
                    const languageImgElement = document.createElement("img");
                    languageImgElement.src = "/images/profile/language.png";
                    languageImgElement.alt = "language";
                    pElement3.appendChild(languageImgElement);
                    pElement3.appendChild(document.createTextNode("Guided language: " + product.guideLanguage));
                
                    saleContentElement.appendChild(pElement3);
    
                    const containerDiv = document.createElement('div');
    
                    const starSpan = document.createElement('span');
                    const starImage = document.createElement('img');
                    starImage.src = '/images/profile/slideStar.png';
                    starImage.alt = 'slideStar';
                    starSpan.appendChild(starImage);
    
                    const reviewSpan = document.createElement('span');
                    const reviewStars = document.createTextNode(product.reviewStars);
                    reviewSpan.appendChild(reviewStars);
    
                    containerDiv.appendChild(starSpan);
                    containerDiv.appendChild(reviewSpan);
    
                    const priceH3 = document.createElement('h3');
                    if (reservation.productPackage=='1') {
                    const priceText = document.createTextNode(`₩ ${product.productPrice.toLocaleString()} / person`);
                        priceH3.appendChild(priceText);
                    } else {
                    const priceText = document.createTextNode(`₩ ${product.productPrice.toLocaleString()} / total`);
                        priceH3.appendChild(priceText);
                    }
    
                    containerDiv.appendChild(priceH3);
    
                    saleContentElement.appendChild(containerDiv);
    
                    liElement.appendChild(saleContentElement);
                    productList.appendChild(liElement);
                }
    
                productwMoreBtnFn();
            }
    
        })
        .catch(err=>{
            console.log(err);
            productMoreBtn.style.display="none";
        });
    
    });
}

/* 자기 소개 수정 요소 */
let prBtn = document.querySelector('.pr-btn');
prBtn.addEventListener("click",()=>{
    let prEditBox = document.querySelector(".seller-profile-top .pr-edit");
    prEditBox.style.display = "grid";
})

/* 자기 소개 수정 */
function prEditFn(el){
    fetch("/profile/guideReservationList",{
        method : "POST",
        headers : {"Content-Type" : "application/json"}, 
        body : pageUserNo
    })
    .then(resp => resp.json())
    .then(result => {
        if(result>0){
            alert("자기 소개가 수정 되었습니다.");
        } else {
            alert("수정에 실패하였습니다.");
        }
    })
    .catch(err=>{
        console.log(err);
    });
}