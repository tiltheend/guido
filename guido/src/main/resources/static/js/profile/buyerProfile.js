let scrollPosition=0; /* 현재 스크롤 위치 저장 */

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

let reviewAddSubmit; /* 리뷰 등록 */
let selectElement; /* 리뷰 쓰려는 상품의 상품 번호, 일정 번호 */
let reviewContent; /* 리뷰 내용 등록 */
let reviewContentEdit; /* 리뷰 내용 수정 */


let selectedStarScore; /* 리뷰작성 별점 input */
let selectedScore; /* 별점 등록 */
let selectedScoreEdit; /* 별점 수정 */

let reviewEdit; /* 리뷰 수정 */
let reviewEditModal; /* 리뷰 수정 모달 */
let reviewEditModalClose; /* 리뷰 수정 닫기 */
let reviewSaleList; /* 리뷰 상품명 */
let reviewSaleListContent; /* 리뷰 작성 글 */
let reviewSaleListStar; /* 리뷰 별점 */


/* 리뷰 글자 길어질 때 더보기 버튼 보여주기 216글자 이상 */
function reviewMoreFn(){
    reviewContentList=document.querySelectorAll(".buyer-profile-top .review-list li>pre");
    reviewContentMore=document.querySelectorAll(".buyer-profile-top .review-list li>div:last-of-type>p");

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

    /* 리뷰 등록하기 */
    addReview = document.querySelector(".my-review>div>svg");
    reviewWriteModal = document.querySelector(".buyer-profile-top .review-write");

    // 리뷰 등록 모달 열기
    if(addReview != null){
        reviewModalClose = document.querySelector(".review-write .review-modal-close");
        addReview.addEventListener('click',()=>{
            reviewWriteModal.style.display="flex";

            // 라디오 버튼 초기 선택 해제
            Array.from(document.querySelectorAll(".review-write input[name='starScore']")).forEach(radioButton => radioButton.checked = false);
            document.querySelector('.review-write .score-span').innerText="0.0";
            // 모달 닫기
            reviewModalClose.addEventListener('click',()=>{
                reviewWriteModal.style.display="none";
                selectElement = document.querySelector(".review-write #reviewSaleList");
                selectElement.selectedIndex = 0; // 선택 초기화
                
                checkObj.selectElement = false;
                checkObj.selectedStarScore = false;

                selectedScore=null;
            });

        });
    }

    // 리뷰 글자수 제한 (500) 디비 바꾸기~~
    let reviewContentNum = document.querySelector(".review-write #reviewContent");
    let reviewCount = document.querySelector(".review-write #count");
    let reviewWrite = document.querySelector(".review-write .write-count");

    if(reviewContentNum != null){

        reviewContentNum.addEventListener("input",(e)=>{ // 리뷰 작성

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
    }

    // 리뷰 글자수 제한 (500) 디비 바꾸기~~
    let reviewContentEditNum = document.querySelector(".review-edit #reviewContent");
    let reviewCountEdit = document.querySelector(".review-edit #count");
    let reviewWriteEdit = document.querySelector(".review-edit .write-count");


    if(reviewContentEditNum != null){
        
        reviewContentEditNum.addEventListener("input",(e)=>{ // 리뷰 수정
    
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
    }

    

    // 리뷰 별점 실시간 값 출력
    let starScoreList = document.getElementsByName('starScore');

    if(starScoreList !=null) {
        for(let i of starScoreList){
            i.addEventListener("input",()=>{
                document.querySelector('.review-write .score-span').innerText= i.value;
            });
        }
    }

    let starScoreListEdit = document.querySelectorAll('.star_score');

    if(starScoreListEdit !=null) {
        for(let i of starScoreListEdit){
            i.addEventListener("input",()=>{
                document.querySelector('.review-edit .score-span').innerText= i.value;
            });
        }
    }

})

// 리뷰 긴 것 더보기 상세 조회
function moreReviewFn(el){
    /* 더보기 버튼 누르면 상세 조회 */
    // moreAndReply = document.querySelector(".more-and-reply>p");
    reviewMoreModal=document.querySelector(".buyer-profile-top .review-more-modal");

    reviewMoreModalTextArea = document.querySelector(".review-more-modal textarea");
    reviewMoreModalP = document.querySelector(".review-more-modal .sale-review-info>p");
    reviewerName = document.querySelector(".review-more-modal .reviewer-name");
    reviewerProfile = document.querySelector(".review-more-modal .reviewer");
    reviewerDate = document.querySelector(".review-more-modal .review-date");
    reviewerRating = document.querySelector(".review-more-modal .review-rating");

    // 리뷰 상세 조회 내용 넣기
    reviewMoreModalTextArea.innerText = el.parentElement.previousElementSibling.innerText;
    
    // 리뷰 상세 조회 상품 제목 넣기 el.parentElement.previousElementSibling.previousElementSibling.lastElementChild.firstElementChild.innerText;
    reviewMoreModalP.innerText = 
    
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
    reviewMoreModalClose = document.querySelector(".buyer-profile-top .review-more-modal .review-modal-close");
    reviewMoreModalClose.addEventListener('click',e=>{
        e.preventDefault;

        reviewMoreModal.style.display="none";
    });
}


/* 리뷰 더보기 js */
const reviewMoreBtn = document.querySelector(".review-list-more");
const myReviewList = document.querySelector(".review-list>li");

if(reviewMoreBtn !=null) {
    reviewMoreBtn.addEventListener("click", e => {
        let startReviewNum = myReviewList.childElementCount;
        
        fetch("/profile/myReviewMore",{
            method : "POST",
            headers : {"Content-Type" : "application/json"}, 
            body : JSON.stringify({
                "startReviewNum" : startReviewNum,
                "pageUserNo" : pageUserNo
            })
        })
        .then(resp => resp.json())
        .then(moreReviewList => {
    
            if (moreReviewList.length < 4) {
                reviewMoreBtn.style.display = "none";
            }
    
            if (moreReviewList.length > 0) {
                
                for (let i = 0; i < 3; i++) {
                    const review = moreReviewList[i];
    
                    if(review == null) break;
    
                    // 새로운 리뷰 아이템 생성
                    const newReviewItemUl = document.createElement("ul");
    
                    const newReviewItem = document.createElement("li");
                    newReviewItem.classList.add("reply-content");
    
                    // 리뷰 작성자 프로필 영역
                    const firstDiv = document.createElement("div");
                    const profileDiv = document.createElement("div");
                    const reviewerDiv = document.createElement("div");
                    reviewerDiv.classList.add("reviewer");
                    const imgContent = document.createElement("img");
                    imgContent.alt = "profileImage";
                    imgContent.classList.add("img-content");
                    imgContent.src = review.profileImage?review.profileImage:"/images/userProfile/basicUser.png";
                    reviewerDiv.appendChild(imgContent);
                    const reviewerName = document.createElement("p");
                    reviewerName.classList.add("reviewer-name");
                    reviewerName.textContent = review.userName;
                    profileDiv.appendChild(reviewerDiv);
                    profileDiv.appendChild(reviewerName);
                    firstDiv.appendChild(profileDiv);
    
                    console.log(review.reviewStarsDouble);
                    // 상품 정보 영역 (별점 + 날짜)
                    const saleReviewInfoDiv = document.createElement("div");
                    saleReviewInfoDiv.classList.add("sale-review-info");
                    const productName = document.createElement("p");
                    productName.textContent = review.productName;
                    productName.setAttribute("data-productno", review.productNo);
                    const reviewRatingDiv = document.createElement("div");
                    reviewRatingDiv.classList.add("review-rating");
                    const reviewStarDiv = document.createElement("div");
                    reviewStarDiv.classList.add("review-star");
                    for (let j = 0; j < 10; j++) {
                        const starInput = document.createElement("input");
                        starInput.type = "radio";
                        starInput.id = `starpoint_${j + 1}`;
                        starInput.classList.add("star_radio");
                        starInput.value = (j + 1) * 0.5;
                        if (review.reviewStarsDouble === (j + 1) * 0.5) {
                            // console.log(review.reviewStarsDouble);
                            starInput.checked = true;
                        }
                        // starInput.checked = review.reviewStarsDouble === (j + 1) * 0.5;
                        reviewStarDiv.appendChild(starInput);
                    }
                    const starpointBgSpan = document.createElement("span");
                    starpointBgSpan.classList.add("starpoint_bg");
                    
                    const reviewDateSpan = document.createElement("span");
                    reviewDateSpan.classList.add("review-date");
                    reviewDateSpan.textContent = review.createDate;
                    
                    reviewStarDiv.appendChild(starpointBgSpan);
                    
                    reviewRatingDiv.appendChild(reviewStarDiv);
                    reviewRatingDiv.appendChild(reviewDateSpan);
    
                    saleReviewInfoDiv.appendChild(productName);
                    saleReviewInfoDiv.appendChild(reviewRatingDiv);
    
    
                    // 리뷰 내용
                    const preReviewMessage = document.createElement("pre");
                    preReviewMessage.textContent = review.reviewMessage;
                    // 더보기 및 수정, 삭제 버튼
                    const moreAndReplyDiv = document.createElement("div");
                    moreAndReplyDiv.classList.add("more-and-reply");
                    const moreBtn = document.createElement("p");
                    moreBtn.textContent = "더보기 +";
                    // moreBtn.onclick = moreReviewFn.bind(this);
                    moreBtn.onclick = function() {
                        moreReviewFn(moreBtn);
                    };
                    const myReviewEditDiv = document.createElement("div");
                    myReviewEditDiv.classList.add("myreview-edit");
    
                    if (pageUserNo === loginUserNo) {
                        const editBtn = document.createElement("button");
                        editBtn.classList.add("review-edit-btn");
                        editBtn.textContent = "Edit";
                        //editBtn.onclick = reviewEditFn.bind(this);
                        editBtn.onclick = function() {
                            reviewEditFn(editBtn);
                        };
                        const deleteBtn = document.createElement("button");
                        deleteBtn.classList.add("review-delete-btn");
                        deleteBtn.textContent = "Delete";
                        deleteBtn.onclick = function() {
                            reviewDelFn(deleteBtn);
                        };
                        myReviewEditDiv.appendChild(editBtn);
                        myReviewEditDiv.appendChild(deleteBtn);
                    }
                    moreAndReplyDiv.appendChild(moreBtn);
                    moreAndReplyDiv.appendChild(myReviewEditDiv);
                    firstDiv.appendChild(saleReviewInfoDiv);
    
                    // 새로운 리뷰 아이템에 요소들 추가
                    // newReviewItem.appendChild(profileDiv);
                    newReviewItem.appendChild(firstDiv);
                    // newReviewItem.appendChild(saleReviewInfoDiv);
                    newReviewItem.appendChild(preReviewMessage);
                    newReviewItem.appendChild(moreAndReplyDiv);
    
                    // 리뷰 아이템을 리뷰 리스트에 추가
                    newReviewItemUl.appendChild(newReviewItem);
                    myReviewList.appendChild(newReviewItemUl);
                    
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

// 리뷰 갯수 세서 3 이하면 버튼 없애고 4이상이면 출력하게 하기
function reviewMoreBtnFn(){
    let reviewCountSpan = document.querySelector(".my-review>div>h1>span").innerText;
    
    if(reviewCountSpan<=3){
        reviewMoreBtn.style.display="none";
    } else {
        reviewMoreBtn.style.display="block";
    }
}


let checkObj = {
    selectElement : false,
    selectedStarScore : false,
    reviewContent : false
};

// 리뷰 쓰려는 상품의 상품 번호, 일정 번호
selectElement = document.querySelector(".review-write #reviewSaleList");
let productNo;
let productDtNo;
// 상품 선택
selectElement.addEventListener("change", function() {
    // 선택된 option 요소
    let selectedOption = this.options[this.selectedIndex];
    
    // 속성 값 가져오기
    productNo = selectedOption.getAttribute("data-productno");
    productDtNo = selectedOption.getAttribute("data-productdtno");

    if(productNo){
        if(productDtNo){
            checkObj.selectElement = true;
        }
    }
});

// 별점
selectedStarScore = document.querySelectorAll(".review-write input[name='starScore']");
// 라디오 버튼 체크 변경 이벤트 처리
selectedStarScore.forEach(star => {
    star.addEventListener("change", () => {
        if (star.checked) {
            selectedScore = star.value;
            if(selectedScore) checkObj.selectedStarScore = true;
        }
    });
});

/* 리뷰 등록 */
function reviewAddFn(e){
    

    if(!checkObj.selectElement){
        e.preventDefault();
        alert("상품을 선택해주세요.")
        return;
    }

    reviewContent = document.querySelector(".review-write #reviewContent").value;
    if(reviewContent.trim().length == 0){
        e.preventDefault();
        alert("내용을 입력해주세요.");
        document.querySelector(".review-write #reviewContent").focus();
        reviewContent = ""; // 띄어쓰기, 개행문자 제거
        return;
    }
    checkObj.reviewContent = true;

    if(!checkObj.selectedStarScore){
        e.preventDefault();
        alert("별점을 선택해주세요.");
        return;
    }

    if(confirm("리뷰 등록하시겠습니까?")){

        fetch("/profile/addReview",{
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({
                "productNo" : productNo,
                "productDtNo" : productDtNo,
                "reviewMessage" : reviewContent,
                "reviewStarsDouble" : selectedScore
            })
        })
        .then(resp => resp.text())
        .then(result => {
            
            if(result>0){
                alert("리뷰가 등록 되었습니다.");

                reviewWriteModal.style.display="none";

                reviewListFn();
                reviewMoreBtnFn();
                // location.href='/profile/'+loginUserNo;

            } else if (result=0){
                alert("리뷰 작성 실패");
            }

        })
        .catch(err=>{
            console.log(err);
            reviewContent = "";
            // 구매 상품 초기화
            selectElement = document.querySelector(".review-write #reviewSaleList");
            selectElement.selectedIndex = 0; // 선택 초기화
            // 라디오 버튼 초기 선택 해제
            Array.from(document.querySelectorAll(".review-write input[name='starScore']")).forEach(radioButton => radioButton.checked = false);
            document.querySelector('.review-write .score-span').innerText="0.0";
        });

    } else {
        e.preventDefault();
        return;
    }
}

// reviewAddSubmit = document.querySelector(".review-write .review-add-submit");

// reviewAddSubmit.addEventListener("click", e => {});

/* 비동기로 리뷰 목록 불러오기 (최신 3개) */
function reviewListFn(e){

    fetch("/profile/newReviewList",{
        method : "POST",
        headers : {"Content-Type" : "application/json"}, 
        body : pageUserNo
    })
    .then(resp => resp.json())
    .then(newReviewList => {

        if(newReviewList.length >0){

            // 기존 리뷰 지우기
            let reviewListElements = document.querySelectorAll('.review-list>li>ul');
    
            reviewListElements.forEach(function(reviewListElement) {
            reviewListElement.parentNode.removeChild(reviewListElement);
            });
    
            let reviewCount = newReviewList[0].reviewCount;
            document.querySelector(".my-review>div>h1>span").innerText=reviewCount;
            
            for (let i = 0; i <newReviewList.length; i++) {
                const review = newReviewList[i];
    
                if(review == null) break;
    
                // 새로운 리뷰 아이템 생성
                const newReviewItemUl = document.createElement("ul");
    
                const newReviewItem = document.createElement("li");
                newReviewItem.classList.add("reply-content");
    
                // 리뷰 작성자 프로필 영역
                const firstDiv = document.createElement("div");
                const profileDiv = document.createElement("div");
                const reviewerDiv = document.createElement("div");
                reviewerDiv.classList.add("reviewer");
                const imgContent = document.createElement("img");
                imgContent.alt = "profileImage";
                imgContent.classList.add("img-content");
                imgContent.src = review.profileImage?review.profileImage:"/images/userProfile/basicUser.png";
                reviewerDiv.appendChild(imgContent);
                const reviewerName = document.createElement("p");
                reviewerName.classList.add("reviewer-name");
                reviewerName.textContent = review.userName;
                profileDiv.appendChild(reviewerDiv);
                profileDiv.appendChild(reviewerName);
                firstDiv.appendChild(profileDiv);
    
                console.log(review.reviewStarsDouble);
                // 상품 정보 영역 (별점 + 날짜)
                const saleReviewInfoDiv = document.createElement("div");
                saleReviewInfoDiv.classList.add("sale-review-info");
                const productName = document.createElement("p");
                productName.textContent = review.productName;
                productName.setAttribute("data-productno", review.productNo);
                const reviewRatingDiv = document.createElement("div");
                reviewRatingDiv.classList.add("review-rating");
                const reviewStarDiv = document.createElement("div");
                reviewStarDiv.classList.add("review-star");
                for (let j = 0; j < 10; j++) {
                    const starInput = document.createElement("input");
                    starInput.type = "radio";
                    starInput.id = `starpoint_${j + 1}`;
                    starInput.classList.add("star_radio");
                    starInput.value = (j + 1) * 0.5;
                    if (review.reviewStarsDouble === (j + 1) * 0.5) {
                        // console.log(review.reviewStarsDouble);
                        starInput.checked = true;
                    }
                    // starInput.checked = review.reviewStarsDouble === (j + 1) * 0.5;
                    reviewStarDiv.appendChild(starInput);
                }
                const starpointBgSpan = document.createElement("span");
                starpointBgSpan.classList.add("starpoint_bg");
                
                const reviewDateSpan = document.createElement("span");
                reviewDateSpan.classList.add("review-date");
                reviewDateSpan.textContent = review.createDate;
                
                reviewStarDiv.appendChild(starpointBgSpan);
                
                reviewRatingDiv.appendChild(reviewStarDiv);
                reviewRatingDiv.appendChild(reviewDateSpan);
    
                saleReviewInfoDiv.appendChild(productName);
                saleReviewInfoDiv.appendChild(reviewRatingDiv);
    
    
                // 리뷰 내용
                const preReviewMessage = document.createElement("pre");
                preReviewMessage.textContent = review.reviewMessage;
                // 더보기 및 수정, 삭제 버튼
                const moreAndReplyDiv = document.createElement("div");
                moreAndReplyDiv.classList.add("more-and-reply");
                const moreBtn = document.createElement("p");
                moreBtn.textContent = "더보기 +";
                moreBtn.onclick = function() {
                    moreReviewFn(moreBtn);
                };
                const myReviewEditDiv = document.createElement("div");
                myReviewEditDiv.classList.add("myreview-edit");
    
                if (pageUserNo === loginUserNo) {
                    const editBtn = document.createElement("button");
                    editBtn.classList.add("review-edit-btn");
                    editBtn.textContent = "Edit";
                    editBtn.onclick = function() {
                        reviewEditFn(editBtn);
                    };
                    const deleteBtn = document.createElement("button");
                    deleteBtn.classList.add("review-delete-btn");
                    deleteBtn.textContent = "Delete";
                    deleteBtn.onclick = function() {
                        reviewDelFn(deleteBtn);
                    };
                    myReviewEditDiv.appendChild(editBtn);
                    myReviewEditDiv.appendChild(deleteBtn);
                }
                moreAndReplyDiv.appendChild(moreBtn);
                moreAndReplyDiv.appendChild(myReviewEditDiv);
                firstDiv.appendChild(saleReviewInfoDiv);
    
                // 새로운 리뷰 아이템에 요소들 추가
                // newReviewItem.appendChild(profileDiv);
                newReviewItem.appendChild(firstDiv);
                // newReviewItem.appendChild(saleReviewInfoDiv);
                newReviewItem.appendChild(preReviewMessage);
                newReviewItem.appendChild(moreAndReplyDiv);
    
                // 리뷰 아이템을 리뷰 리스트에 추가
                newReviewItemUl.appendChild(newReviewItem);
                myReviewList.appendChild(newReviewItemUl);
                
                reviewMoreFn();
                reviewMoreBtnFn();
            }

        }

    })
    .catch(err=>{
        console.log(err);
        reviewMoreBtn.style.display="none";
    });

};

/* 리뷰 삭제 */
function reviewDelFn(el){
    // 리뷰 지우려는 상품의 상품 번호
    let productNo;

    // 속성 값 가져오기
    productNo = el.parentElement.parentElement.previousElementSibling.previousElementSibling.children[1].firstElementChild.getAttribute("data-productNo");

    if(confirm("정말로 삭제 하시겠습니까?")){

    fetch("/profile/reviewDel",{
        method : "POST",
        headers : {"Content-Type" : "application/json"}, 
        body : productNo
    })
    .then(resp => resp.text())
    .then(result => {
        reviewMoreBtnFn();
        if(result>0){
            alert("리뷰가 삭제 되었습니다.");

            reviewListFn();
            // location.href='/profile/'+loginUserNo;

        } else if (result=0){
            alert("리뷰 삭제 실패");
        }
    })
        .catch(err=>{
            console.log(err);
        });

    }

}


// 리뷰 수정 모달 열기
function reviewEditFn(el){

    // 리뷰 수정 모달 열기
    // reviewEdit=document.querySelector(".review-edit-btn");
    reviewEditModal=document.querySelector(".buyer-profile-top .review-edit");

    reviewSaleList=document.querySelector(".review-edit #reviewSaleList");
    reviewSaleListContent=document.querySelector(".review-edit #reviewContent");
    reviewSaleListStar=document.querySelector(".review-edit .score-star");

    reviewEditModalClose = document.querySelector(".buyer-profile-top .review-edit .review-modal-close");

    // 상품 제목 가져오기
    reviewSaleList.value=el.parentElement.parentElement.previousElementSibling.previousElementSibling.lastElementChild.firstElementChild.innerText;
    reviewSaleList.setAttribute("data-productno", el.parentElement.parentElement.previousElementSibling.previousElementSibling.lastElementChild.firstElementChild.getAttribute("data-productno"));
    
    // 리뷰 내용 가져오기
    reviewSaleListContent.value=el.parentElement.parentElement.previousElementSibling.innerText;
    let reviewSaleListContentCount = document.querySelector(".review-edit #count");
    reviewSaleListContentCount.innerText=reviewSaleListContent.value.length;


    // 별점 가져오기
    let checkedInput =el.parentElement.parentElement.parentElement.firstElementChild.lastElementChild.lastElementChild.firstElementChild.querySelector('.reply-content input[type="radio"]:checked').value;
    let reviewSaleListStarList = reviewSaleListStar.querySelectorAll('input[type="radio"]');
    let scoreSpan = document.querySelector('.review-edit .score-span');
    for(let i of reviewSaleListStarList){
        if(i.value==checkedInput){
            i.checked=true;
            scoreSpan.innerText=checkedInput;
        }
    }
    
    
    reviewEditModal.style.display="flex";

    // 현재 스크롤 위치 저장
    // scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    // 스크롤 위치 고정
    // document.body.style.overflow = "hidden";
    // document.documentElement.scrollTop = scrollPosition;

    // 모달 닫기
    reviewEditModalClose.addEventListener('click',e=>{

        e.preventDefault;
        reviewEditModal.style.display="none";
        // document.body.style.overflow = "";
        // window.scrollTo(0, scrollPosition);

    });

}

// 리뷰 수정
function reviewEditSubmitFn(e){
    // 리뷰 지우려는 상품의 상품 번호
    let productNoEdit;

    // 속성 값 가져오기
    productNoEdit = e.target.parentElement.parentElement.firstElementChild.nextElementSibling.getAttribute("data-productno");

    // 별점
    let editStarScore = document.querySelectorAll(".review-edit input[name='starScore']");
    selectedScoreEdit = document.querySelector('.review-edit .score-span').innerText;

    // 라디오 버튼 체크 변경 이벤트 처리
    editStarScore.forEach(star => {
        star.addEventListener("change", () => {
            if (star.checked) {
                selectedScoreEdit = star.value;
            }
        });
    });

    reviewContentEdit = document.querySelector(".review-edit #reviewContent").value;
    if(reviewContentEdit.trim().length == 0){
        e.preventDefault();
        alert("내용을 입력해주세요.");
        document.querySelector(".review-edit #reviewContent").focus();
        reviewContentEdit = ""; // 띄어쓰기, 개행문자 제거
        return;
    }

    console.log(reviewContentEdit);

    if(selectedScoreEdit==0.0){
        e.preventDefault();
        alert("별점을 선택해주세요.");
        return;
    }


    if(confirm("수정 하시겠습니까?")){
        fetch("/profile/reviewEdit",{
            method : "POST",
            headers : {"Content-Type" : "application/json"}, 
            body : JSON.stringify({
                "productNo" : productNoEdit,
                "reviewMessage" : reviewContentEdit,
                "reviewStarsDouble" : selectedScoreEdit
            })
        })
        .then(resp => resp.text())
        .then(result => {

            if(result>0){
                alert("리뷰가 수정 되었습니다.");

                reviewEditModal.style.display="none";

                reviewListFn();

                // location.href='/profile/'+loginUserNo;

            } else if (result=0){
                alert("리뷰 수정 실패");
                e.preventDefault();
            }
        })
        .catch(err=>{
            e.preventDefault();
            console.log(err);
        });
    
    } else {
        e.preventDefault();
        return;
    }

}