/* 프로필 편집 버튼 위임 파일 -> 카메라 아이콘 */
const userProfileFile = document.querySelector("#userProfileFile");
const profileEditIcon = document.querySelector(".profile-edit-icon");
if(profileEditIcon!=null){
    profileEditIcon.addEventListener('click', () => userProfileFile.click());
}

/* 댓글 눌렀을 때 상세 페이지 */
const commentView = document.querySelector(".comment-view");
commentView.addEventListener("click",()=>{
    location.href="sellerReviewMore.html"
})