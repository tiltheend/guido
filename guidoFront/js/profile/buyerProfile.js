/* 리뷰 등록하기 */
const addReview = document.querySelector(".my-review>div>svg");
const reviewWriteModal = document.querySelector(".buyer-profile-top .review-write");
const reviewModalClose = document.querySelector("review-modal-close");

// 리뷰 모달 열기
if(addReview != null){
    addReview.addEventListener('click',()=>{
        reviewWriteModal.style.display="flex";
        // 모달 닫기
        reviewModalClose.addEventListener('click',()=>{
            reviewWriteModal.style.display="none";
        });

    });
}