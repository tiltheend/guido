/* 슬라이드 */
$('.single-item').slick({
    dots : true,
    dotsClass : "slick-dots"
});


let boardSlide; /* 게시글 슬라이드 박스 */
let boardSlideBtn; /* 게시글 슬라이드 btn */

let wishHeart; /* 위시 하트 */

document.addEventListener("DOMContentLoaded", () => {
    /* 슬라이드 화살표 커스텀 */
    // 내가 만든 버튼
    const boardSlidePrevious = document.querySelectorAll(".slick-slide-next");
    const boardSlideNext = document.querySelectorAll(".slick-slide-pre");

    // 원래 버튼
    const boardSlidePreviousOriginal = document.querySelectorAll(".slick-prev");
    const boardSlideNextOriginal = document.querySelectorAll(".slick-next");

    if (boardSlidePrevious.length > 0) {
        for (let i = 0; i < boardSlidePrevious.length; i++) {
        boardSlidePrevious[i].addEventListener('click', () => boardSlidePreviousOriginal[i].click());
        }
    }

    if (boardSlideNext.length > 0) {
        for (let i = 0; i < boardSlideNext.length; i++) {
        boardSlideNext[i].addEventListener('click', () => boardSlideNextOriginal[i].click());
        }
    }

    /* 호버하면 슬라이드 넘기는 버튼 나오기 */
    boardSlide = document.querySelectorAll(".slider");
    boardSlideBtn = document.querySelectorAll(".slide-btn");

    if (boardSlide.length > 0) {
        for (let i = 0; i < boardSlide.length; i++) {
            boardSlide[i].addEventListener('mouseover', () => {
                boardSlideBtn[i].style.display="block";
            });
            boardSlideBtn[i].addEventListener('mouseover', () => {
                boardSlideBtn[i].style.display="block";
            });
        }
        for (let i = 0; i < boardSlide.length; i++) {
            boardSlide[i].addEventListener('mouseout', () => {
                boardSlideBtn[i].style.display="none";
            });
        }
    }

    /* 하트 색 바꾸기 */
    // wishHeart = document.querySelectorAll(".add-wish-heart");

    // for (let i = 0; i < wishHeart.length; i++) {
    //     wishHeart[i].addEventListener('mouseout', () => {
    //         heartIcon[i].classList.toggle(".wish-heart-none");
    //     });
    // }


});


