
/* 슬라이드 */
$('.single-item').slick({
    dots: true,
    dotsClass: "slick-dots"
});


let boardSlide; /* 게시글 슬라이드 박스 */
let boardSlideBtn; /* 게시글 슬라이드 btn */

let wishHeart; /* 위시 하트 */
let slickDot; /* 슬라이드 도트 */


document.addEventListener("DOMContentLoaded", () => {
    /* 슬라이드 화살표 커스텀 */
    // 내가 만든 버튼
    const boardSlidePrevious = document.querySelectorAll(".slick-slide-pre");
    const boardSlideNext = document.querySelectorAll(".slick-slide-next");

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
                boardSlideBtn[i].style.display = "block";
            });
            boardSlideBtn[i].addEventListener('mouseover', () => {
                boardSlideBtn[i].style.display = "block";
            });
        }
        for (let i = 0; i < boardSlide.length; i++) {
            boardSlide[i].addEventListener('mouseout', () => {
                boardSlideBtn[i].style.display = "none";
            });
        }
    }

    /* 호버하면 슬라이드 도트 나오게 */
    // slickDot = document.querySelectorAll(".slick-dots");
    // if (boardSlide.length > 0) {

    //     for (let i = 0; i < boardSlide.length; i++) {
    //         slickDot[i].style.display = "none";
    //         boardSlide[i].addEventListener('mouseover', () => {
    //             slickDot[i].style.display = "block";
    //         });
    //         slickDot[i].addEventListener('mouseover', () => {
    //             slickDot[i].style.display = "block";
    //         });
    //         boardSlideBtn[i].addEventListener('mouseover', () => {
    //             slickDot[i].style.display = "block";
    //         });
    //     }
    //     for (let i = 0; i < boardSlide.length; i++) {
    //         boardSlide[i].addEventListener('mouseout', () => {
    //             slickDot[i].style.display = "none";
    //         });
    //     }
    // }

});       

// 하트 색 바꾸기
function toggleHeart() {
    let heartIcon = event.target;
    // heartIcon.setAtrribute("src",'');
    heartIcon.classList.toggle("selected");
}




// 테마 검색 상품 목록 조회

function loadProductByTheme(themeCode) {

    fetch("/common/index/" + themeCode)
        .then(response => response.json())
        .then(themeProdList => {
            console.log(themeProdList);

            const productListContainer = document.getElementById("productListContainer");
            productListContainer.innerHTML = "";

            for (let themeProduct of themeProdList) {
                const productRow = document.createElement("li");
                productRow.classList.add("product-row");

                const singleItem = document.createElement("div");
                singleItem.classList.add("slider");
                singleItem.classList.add("single-item");

                const productImage = document.createElement("div");
                productImage.classList.add("productImage");

                for (let image of themeProduct.imageList) {
                    const img = document.createElement("img");
                    img.setAttribute("src", image.filePath);
                    productImage.appendChild(img);
                }

                singleItem.appendChild(productImage);
                productRow.appendChild(singleItem);

                const slideBtn = document.createElement("div");
                slideBtn.classList.add("slide-btn");

                const slideNextImg = document.createElement("img");
                slideNextImg.setAttribute("src", "/images/profile/NextBtn.png");
                slideNextImg.setAttribute("alt", "slideNext");
                slideNextImg.classList.add("slick-slide-next");
                slideBtn.appendChild(slideNextImg);

                const slidePreImg = document.createElement("img");
                slidePreImg.setAttribute("src", "/images/profile/PreBtn.png");
                slidePreImg.setAttribute("alt", "slidePre");
                slidePreImg.classList.add("slick-slide-pre");
                slideBtn.appendChild(slidePreImg);

                productRow.appendChild(slideBtn);

                const addWishHeart = document.createElement("div");
                addWishHeart.classList.add("add-wish-heart");

                const heartIcon = document.createElement("img");
                heartIcon.classList.add("heart-icon");
                heartIcon.setAttribute("src", "/images/profile/empty.png");
                heartIcon.setAttribute("onclick", "toggleHeart()");
                addWishHeart.appendChild(heartIcon);

                productRow.appendChild(addWishHeart);

                const salesText = document.createElement("div");
                salesText.classList.add("sales-text");

                const productNameDiv = document.createElement("div");

                const productName = document.createElement("p");
                productName.textContent = themeProduct.productName;
                productNameDiv.appendChild(productName);

                const reviewDiv = document.createElement("div");
                
                const reviewStarImg = document.createElement("img");
                reviewStarImg.setAttribute("src", "/images/profile/slideStar.png");
                reviewStarImg.setAttribute("alt", "slideStar");
                reviewDiv.appendChild(reviewStarImg);
                
                const reviewStars = document.createElement("span");
                reviewStars.textContent = themeProduct.reviewStars;
                reviewDiv.appendChild(reviewStars);
                
                productNameDiv.appendChild(reviewDiv);

                salesText.appendChild(productNameDiv);
/* ---------------- */

                const regionDiv = document.createElement("div");

                const locationImg = document.createElement("img");
                locationImg.setAttribute("src", "/images/profile/location.png");
                locationImg.setAttribute("alt", "location");
                regionDiv.appendChild(locationImg);

                const regionName = document.createElement("span");
                regionName.textContent = themeProduct.regionName;
                regionDiv.appendChild(regionName);

                salesText.appendChild(regionDiv);

                const priceDiv = document.createElement("div");

                const priceText = document.createElement("p");
                priceText.innerHTML = '₩ ${themeProduct.productPrice} / total';
                priceDiv.appendChild(priceText);

                salesText.appendChild(priceDiv);

                productRow.appendChild(salesText); 

                productListContainer.appendChild(productRow);
            }
        })
        .catch(e => { console.log(e) });
}






















/* function loadProductByTheme(themeCode){
    
    var productListContainer = document.getElementById("productListContainer");
    productListContainer.innerHTML = "";

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/common/index" + themeCode, true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhr.onreadystatechange = function(){
        if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status === 200){
                var response = JSON.parse(xhr.responseText); // JSON 데이터 파싱
                productListContainer.innerHTML = xhr.responseText;
            }else{
                console.error("Ajax request failed");
            }
        }
    };
    xhr.send();
}

var themeIconLinks = document.getElementsByClassName("theme-icon-link");
Array.from(themeIconLinks).forEach(function (link) {
    link.addEventListener("click", function(event) {
        event.preventDefault(); 
        var themeCode = this.getAttribute("data-theme-code");
        loadProductByTheme(themeCode); 
    });
}); */




