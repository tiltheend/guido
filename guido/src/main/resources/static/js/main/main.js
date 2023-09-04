

/* 슬라이드 */
$('.single-item').slick({
    dots: true,
    dotsClass: "slick-dots"
});



window.addEventListener("DOMContentLoaded", () => {
    slideHover();
});


/* 슬라이드 화살표 커스텀 */
function slidePreFn(el){
    let boardSlidePreviousOriginal = el.parentElement.previousElementSibling.lastElementChild.firstElementChild;
    boardSlidePreviousOriginal.click();
}

function slideNextFn(el){
    let boardSlideNextOriginal = el.parentElement.previousElementSibling.lastElementChild.lastElementChild.previousElementSibling;
    boardSlideNextOriginal.click();
}

// 하트 색 바꾸기
if(loginUserNo != null){
    if(userType != null){
        if(userType == "T"){
            function toggleHeart(btn) {
                let heartIcon = btn;
                // heartIcon.setAtrribute("src",'');
                // heartIcon.classList.toggle("selected");
                
                /* 관심상품 등록/제거 처리 */
                if(document.querySelector(".heart-icon")!=null){
                    
                    let check;      // 관심상품 등록 여부
                    // console.log(check);
            
                    let productNo = heartIcon.parentElement.parentElement.firstElementChild.lastElementChild.getAttribute("data-productno");
                    // console.log(productNo);
                    // console.log(loginUserNo);
            
                    let productName = btn.parentElement.nextElementSibling.children[0].children[0].innerText;
                    console.log(productName);
            
                    if (heartIcon.classList.contains("selected")) {
                        check = 1; // 관심상품 등록 O
                    } else {
                        check = 0; // 관심상품 등록 X
                    }
                    
                    let wishData = {"productNo" : productNo, "userNo": loginUserNo, "check": check};
            
                    const selected = document.querySelectorAll(`[data-productno='${productNo}']`);
            
                    // console.log(selected);
            
                    fetch("/common/updateWishList",{
                        method : "POST",
                        headers : {"Content-Type" : "application/json"},
                        body : JSON.stringify(wishData)
                    })
                    .then(resp=>resp.text())
                    .then(result=>{
            
                        if(result==1){
                            if (heartIcon.classList.contains("selected")) {
                                heartIcon.classList.remove("selected");
                                for(i of selected){
                                    i.parentElement.nextSibling.nextSibling.nextElementSibling.firstElementChild.classList.remove("selected");
                                }
                            } else {
                                heartIcon.classList.add("selected");
                                for(i of selected){
                                    i.parentElement.nextSibling.nextSibling.nextElementSibling.firstElementChild.classList.add("selected");
                                }
                                sendWish(productNo, productName); // 관심상품 등록 알림
                            }
                            // console.log("관심상품 등록 성공");
            
                        } else {
                            // console.log("관심상품 등록 실패");
                            alert("관심상품 등록 실패");
                        }
                
                    })
                    .catch(err=>{
                        console.log(err);
                    })
                }
            }
        }
    }
}

if(loginUserNo == null){
    let heartList = document.querySelectorAll(".heart-icon")
    for(let heart of heartList){
        heart.addEventListener("click", () => {
            alert("로그인 후 사용하세요.");
        })
    }
}



// 상품 제목 "..."
/* document.addEventListener("DOMContentLoaded", function() {
    var productNameElements = document.querySelectorAll(".product-name");
    if (productNameElements) {
        productNameElements.forEach(function(element) {
            var productName = element.innerText;
            if (productName.length > 23) {
                productName = productName.substring(0, 23) + "...";
                element.innerText = productName;
            }
        });
    }
}); */



// 테마 검색 상품 목록 조회
function loadProductByTheme(themeCode) {

    fetch("/common/home/" + themeCode)
    .then(response => response.json())
    .then(themeProdList => {
        console.log(themeProdList);

        
        let moreBtn = document.querySelector(".post-more-first button");
        if(moreBtn!=null){
            moreBtn.style.display = "none";
        }

        const productListContainer = document.getElementById("productListContainer");
        productListContainer.innerHTML = "";

        for (let themeProduct of themeProdList) {
            const productRow = document.createElement("li");
            productRow.classList.add("product-row");
            
            const slideWrapper = document.createElement("div");
            slideWrapper.classList.add("slider-wrapper");

            const skeletonDiv = document.createElement("div");
            slideWrapper.appendChild(skeletonDiv);

            const singleItem = document.createElement("div");
            singleItem.classList.add("slider");
            singleItem.classList.add("single-item");
            singleItem.setAttribute("data-productno", themeProduct.productNo);

            if(themeProduct.imageList){
                for (let image of themeProduct.imageList) {
                    let div = document.createElement("div");
                    div.classList.add("productImage");
                    
                    let imgLink = document.createElement("a");
                    imgLink.setAttribute("href", "/productDetail/product/" + themeProduct.productNo);
    
                    let img = document.createElement("img");
                    img.setAttribute("src", image.filePath);
                    imgLink.appendChild(img);
    
                    div.appendChild(imgLink);
                    singleItem.appendChild(div);
                }
            }

            slideWrapper.appendChild(singleItem);
            productRow.appendChild(slideWrapper);

            const slideBtn = document.createElement("div");
            slideBtn.classList.add("slide-btn");

            const slideNextImg = document.createElement("img");
            slideNextImg.setAttribute("src", "/images/profile/NextBtn.png");
            slideNextImg.setAttribute("alt", "slideNext");
            slideNextImg.classList.add("slick-slide-next");
            slideNextImg.setAttribute("onclick", "slideNextFn(this)");
            slideBtn.appendChild(slideNextImg);

            const slidePreImg = document.createElement("img");
            slidePreImg.setAttribute("src", "/images/profile/PreBtn.png");
            slidePreImg.setAttribute("alt", "slidePre");
            slidePreImg.classList.add("slick-slide-pre");
            slidePreImg.setAttribute("onclick", "slidePreFn(this)");
            slideBtn.appendChild(slidePreImg);

            productRow.appendChild(slideBtn);

            const addWishHeart = document.createElement("div");
            addWishHeart.classList.add("add-wish-heart");
            
            const wish = themeProduct.wishOrNot;
            console.log(wish);

            if (loginUserNo != 0) { // 로그인 상태인 경우

                const heartIcon = document.createElement("img");
                heartIcon.classList.add("heart-icon");
                heartIcon.setAttribute("onclick", "toggleHeart(this)");
                heartIcon.setAttribute("src", "/images/profile/empty.png");
                addWishHeart.appendChild(heartIcon);
                if(wish!=null){
                    if (wish == 1) {
                        heartIcon.classList.add("selected");
                    }
                }
            } 
            else { // 로그인 상태가 아닌 경우
                const heartIcon = document.createElement("img");
                heartIcon.classList.add("heart-icon");
                // heartIcon.setAttribute("onclick", "toggleHeart(this)");
                heartIcon.setAttribute("src", "/images/profile/empty.png");
                addWishHeart.appendChild(heartIcon);
            }

            productRow.appendChild(addWishHeart);

            const salesText = document.createElement("div");
            salesText.classList.add("sales-text");

            const productNameDiv = document.createElement("div");
            productNameDiv.classList.add("product-name"); 

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

            const regionDiv = document.createElement("div");

            const locationImg = document.createElement("img");
            locationImg.setAttribute("src", "/images/profile/location.png");
            locationImg.setAttribute("alt", "location");
            regionDiv.appendChild(locationImg);

            const regionName = document.createElement("span");
            regionName.textContent = themeProduct.regionName;
            regionDiv.appendChild(regionName);

            salesText.appendChild(regionDiv);
            
            
            const skeletonDiv2 = document.createElement("div");
            salesText.appendChild(skeletonDiv2);

            const priceDiv = document.createElement("div");

            const priceText = document.createElement("p");

            const formattedPrice = new Intl.NumberFormat('en-US').format(themeProduct.productPrice);
            priceText.innerHTML = `₩ ${formattedPrice} / total`;
            priceDiv.appendChild(priceText);

            salesText.appendChild(priceDiv);

            productRow.appendChild(salesText); 

            // const priceDiv = document.createElement("div");
            // const priceText = document.createElement("p");

            // switch (product.productPackage) {
            // case 1:
            //     const formattedTotalPrice = new Intl.NumberFormat('en-US').format(product.productPrice);
            //     priceText.innerHTML = `₩ ${formattedTotalPrice} / total`;
            //     break;
            // default:
            //     const formattedPrice = new Intl.NumberFormat('en-US').format(product.productPrice);
            //     priceText.innerHTML = `₩ ${formattedPrice} / each`;
            //     break;
            // }

            // priceDiv.appendChild(priceText);
            // salesText.appendChild(priceDiv);

            // productRow.appendChild(salesText);

            productListContainer.appendChild(productRow);

        }
        
        // 슬라이드 라이브러리 초기화
        $('.single-item').not('.slick-initialized').slick({
            dots: true,
            dotsClass: "slick-dots"
        });
        

        slideHover();

    })
    .catch(e => { console.log(e) });
    
    
}



function slideHover(){
    
    let boardSlide; /* 게시글 슬라이드 박스 */
    let boardSlideBtn; /* 게시글 슬라이드 btn */
    
    let slickDot; /* 슬라이드 도트 */

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

}



/* 스켈레톤 로딩 */

// 스켈레톤 요소
const skeletonItem = document.querySelectorAll('.skeleton_loading');
// 스켈레톤 요소 전체 삭제
const hideskeleton = () => {
    skeletonItem.forEach(element => {
        $(element).fadeOut();
    });
};

// 실제 코드 (실제로 사용될 코드)
window.onload = hideskeleton;

