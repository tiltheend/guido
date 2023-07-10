/* 슬라이드 */
$('.single-item').slick({
    dots : true,
    dotsClass : "slick-dots"
});


let boardSlide; /* 게시글 슬라이드 박스 */
let boardSlideBtn; /* 게시글 슬라이드 btn */

let wishHeart; /* 위시 하트 */
let slickDot; /* 슬라이드 도트 */


document.addEventListener("DOMContentLoaded", () => {


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

    /* 호버하면 슬라이드 도트 나오게 */
    slickDot = document.querySelectorAll(".slick-dots");
    if (boardSlide.length > 0) {
        
        for (let i = 0; i < boardSlide.length; i++) {
            slickDot[i].style.display="none";
            boardSlide[i].addEventListener('mouseover', () => {
                slickDot[i].style.display="block";
            });
            slickDot[i].addEventListener('mouseover', () => {
                slickDot[i].style.display="block";
            });
            boardSlideBtn[i].addEventListener('mouseover', () => {
                slickDot[i].style.display="block";
            });
        }
        for (let i = 0; i < boardSlide.length; i++) {
            boardSlide[i].addEventListener('mouseout', () => {
                slickDot[i].style.display="none";
            });
        }
    }


});

/* 슬라이드 화살표 커스텀 */
function slidePreFn(el){

    let boardSlidePreviousOriginal = el.parentElement.previousElementSibling.firstElementChild;
    boardSlidePreviousOriginal.click();
}

function slideNextFn(el){

    let boardSlideNextOriginal = el.parentElement.previousElementSibling.lastElementChild.previousElementSibling;
    boardSlideNextOriginal.click();
}


// 하트 색 바꾸기
function toggleHeart() {
    let heartIcon = event.target;
    // heartIcon.setAtrribute("src",'');
    // heartIcon.classList.toggle("selected");
    
    /* 관심상품 등록/제거 처리 */
    if(document.querySelector(".heart-icon")!=null){
        
        let check;      // 관심상품 등록 여부
        
        let productNo = heartIcon.parentElement.parentElement.firstElementChild.getAttribute("data-productno");

        /* 관심 상품 등록 O */
        if (heartIcon.classList.contains("selected")) {
            check = 1;
        } else {
            /* 관심 상품 등록X */
            check = 0;
        }
        
        let wishData = {"productNo" : productNo, "userNo": loginUserNo, "check": check};

        fetch("/profile/updateWish",{
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(wishData)
        })
        .then(resp=>resp.text())
        .then(result=>{
    
            if(result==1){
                if (heartIcon.classList.contains("selected")) {
                    heartIcon.classList.remove("selected");
                } else {
                    heartIcon.classList.add("selected");
                }
                console.log("위시 성공?");
            } else {
                console.log("관심상품 등록 실패");
            }
    
        })
        .catch(err=>{
            console.log(err);
        })

    }
}

