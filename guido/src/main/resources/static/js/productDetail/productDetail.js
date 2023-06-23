
let totalCost = document.getElementById("totalCost");

if(package==0){
    /* 총 금액 : n박 시 = productPrice */
    totalCost.innerText = Number(productPrice)*Number(guestCount);
}else{
    /* 총 금액 : 1박 시 = 인원수 * productPrice */
    totalCost.innerText = productPrice;
}



/* 네비게이션 메뉴 클릭 시 특정 위치로 이동 */
const menuLinks = document.querySelectorAll('.detail--right__scroll ul li a');
const menuLi = document.querySelectorAll('.detail--right__scroll>ul>li');

menuLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        const targetSectionId = this.getAttribute('href');
        const targetSection = document.querySelector(targetSectionId);
        const topOffset = targetSection.getBoundingClientRect().top + 1;
        window.scrollBy({ top: topOffset, behavior: 'smooth' });
    });
});



/* 예약 1박 시 인원 수 증가 버튼 클릭 이벤트 */
const plusBtn = document.querySelector(".detail--right__price-plus");
const minusBtn = document.querySelector(".detail--right__price-minus");


/* 증가 버튼 클릭 시 */
plusBtn.addEventListener("click", ()=>{
  
  const count = document.querySelector(".detail--right__price-count");

  /* 최대 인원수 제한 */
  count.innerText = Number(count.innerText) + 1;

}); 


/* 감소 버튼 클릭 시 */
minusBtn.addEventListener("click", ()=>{
  
    /* 인원 수 */
  const count = document.querySelector(".detail--right__price-count");
  
  /* 최소 인원수 제한 */
  if(Number(count.innerText)>1)
    count.innerText = Number(count.innerText) - 1;

});


const priceBtn = document.querySelectorAll(".priceBtn");

priceBtn.forEach((btn)=>{

    btn.addEventListener("click", ()=>{

        const count = Number(document.querySelector(".detail--right__price-count").innerText);
    
            /* 1박 이상 패키지 
                -> 인원 수 증감하는대로 1인당 금액 변동(product price/인원 수)  
                -> 총 금액 고정 (product price) 
            */
            if(package!=0){
                document.getElementById("eachCost").innerText = Math.ceil(productPrice/count);
            }
        
        
            /* 1박 패키지 
                ->  1인당 금액 고정(product price 값)
                -> 인원 수 증감하는대로 총 금액 변동 (product price * 인원 수)
            */
            if(package==0){
                document.getElementById("totalCost").innerText = productPrice*count;
            }
    
    });

});



/* 스크롤 시 사이드바 active 변동 */
window.addEventListener("scroll", ()=>{
    
    const scroll = window.scrollY;

    const section1 = scroll + document.getElementById("section1").getBoundingClientRect().top;
    const section2 = scroll + document.getElementById("section2").getBoundingClientRect().top;
    const section3 = scroll + document.getElementById("section3").getBoundingClientRect().top;
    const section4 = scroll + document.getElementById("section4").getBoundingClientRect().top;
    const section6 = scroll + document.getElementById("section6").getBoundingClientRect().top;
    
    if(document.getElementById("section5")!=null){
        var section5 = scroll + document.getElementById("section5").getBoundingClientRect().top;
    }

    menuLi.forEach(function(li){
        li.classList.remove('scroll--active');
    });


    if(scroll >= section1 && scroll < section2){

        menuLi[0].classList.add('scroll--active');
        
    }else if(scroll >= section2 && scroll < section3){
        
        menuLi[1].classList.add('scroll--active');

    }else if(scroll >= section3 && scroll < section4){
        
        menuLi[2].classList.add('scroll--active');

    }else if(scroll >= section4 && scroll < section6){
        
        if(document.getElementById("section5")!=null){
            
            if(scroll >= section4 && scroll < section5){
        
                menuLi[3].classList.add('scroll--active');
        
            }else if(scroll >= section5 && scroll < section6){
                
                menuLi[4].classList.add('scroll--active');
                
            }
            
        }else{
            menuLi[3].classList.add('scroll--active');
        }

    }else if(scroll >= section6){

        if(document.getElementById("section5")!=null){
            
            menuLi[5].classList.add('scroll--active');
            
        }else{
            
            menuLi[4].classList.add('scroll--active');
        }
        


    }

});





/* 리뷰 3줄 이상 넘어갈 시 말줄임표 */
// const reviewContent = document.querySelector(".detail--item__reivew-content");
// const lineHeight = parseInt(window.getComputedStyle(reviewContent).getPropertyValue('line-height'), 10);
// const maxHeight = lineHeight * 3; // 3줄의 높이

// const textLines = Math.floor(reviewContent.clientHeight / lineHeight);

// if (textLines > 3) {
//     while (textLines > 3) {
//         reviewContent.textContent = reviewContent.textContent.replace(/\W*\s(\S)*$/, '...');
//         textLines = Math.floor(reviewContent.clientHeight / lineHeight);
//     }
// }
