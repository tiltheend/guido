let addReview; /* 리뷰 열기 + */
let reviewWriteModal; /* 리뷰 모달 */
let reviewModalClose; /* 리뷰 닫기 */

let reviewEdit; /* 리뷰 수정 */
let reviewEditModal; /* 리뷰 수정 모달 */
let reviewEditModalClose; /* 리뷰 수정 닫기 */

document.addEventListener("DOMContentLoaded",()=>{
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

    reviewEdit=document.querySelector(".review-edit-btn");
    reviewEditModal=document.querySelector(".buyer-profile-top .review-edit");
    // 리뷰 수정 모달 열기
    if(reviewEdit != null){
        reviewEditModalClose = document.querySelector(".buyer-profile-top .review-edit");
        reviewEdit.addEventListener('click',()=>{
            reviewEditModal.style.display="flex";
            // 모달 닫기
            reviewModalClose.addEventListener('click',()=>{
                reviewEditModalClose.style.display="none";
            });

        });
    }

    // 리뷰 글자수 제한 (500) 디비 바꾸기~~
    let reviewContent = document.getElementById("reviewContent");
    let reviewCount = document.querySelector(".review-write #count");
    let reviewWrite = document.querySelector(".write-count");

    reviewContent.addEventListener("input",(e)=>{

        // e.target : 이벤트가 발생한 요소 (==#content)
        reviewCount.innerText=e.target.value.length;
        if(e.target.value.length>500){
            reviewCount.classList.add("error");
            reviewWrite.classList.add("error");
            document.querySelector(".write-count .over-error").style.fontSize="0.875rem";
        } else {
            reviewCount.classList.remove("error");
            reviewWrite.classList.remove("error");
            document.querySelector(".write-count .over-error").style.fontSize="0";
        }

    });

    // 리뷰 별점 실시간 값 출력
    const starScoreList = document.getElementsByName('starScore');

    for(let i of starScoreList){
        i.addEventListener("input",()=>{
            document.querySelector('.review-write .score-span').innerText= i.value;
        });
    }

    const starScoreListEdit = document.querySelectorAll('.star_score');

    for(let i of starScoreListEdit){
        i.addEventListener("input",()=>{
            document.querySelector('.review-edit .score-span').innerText= i.value;
        });
    }
})
