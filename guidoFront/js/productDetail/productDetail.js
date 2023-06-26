
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


plusBtn.addEventListener("click", ()=>{
  
  const count = document.querySelector(".detail--right__price-count");

  /* 나중 가서 최대 인원수 제한 넣기 */
  count.innerText = Number(count.innerText) + 1;
  
}); 


minusBtn.addEventListener("click", ()=>{
  
  const count = document.querySelector(".detail--right__price-count");
  
  /* 최소 인원수도,.... 지금은 임의로 1 이상 */
  if(Number(count.innerText)>1)
    count.innerText = Number(count.innerText) - 1;


});



/* 스크롤 시 사이드바 active 변동 */
window.addEventListener("scroll", ()=>{
    
    const scroll = window.scrollY;

    const section1 = scroll + document.getElementById("section1").getBoundingClientRect().top;
    const section2 = scroll + document.getElementById("section2").getBoundingClientRect().top;
    const section3 = scroll + document.getElementById("section3").getBoundingClientRect().top;
    const section4 = scroll + document.getElementById("section4").getBoundingClientRect().top;
    const section5 = scroll + document.getElementById("section5").getBoundingClientRect().top;
    const section6 = scroll + document.getElementById("section6").getBoundingClientRect().top;


    menuLi.forEach(function(li){
        li.classList.remove('scroll--active');
    });


    if(scroll >= section1 && scroll < section2){

        menuLi[0].classList.add('scroll--active');
        
    }else if(scroll >= section2 && scroll < section3){
        
        menuLi[1].classList.add('scroll--active');

    }else if(scroll >= section3 && scroll < section4){
        
        menuLi[2].classList.add('scroll--active');

    }else if(scroll >= section4 && scroll < section5){
        
        menuLi[3].classList.add('scroll--active');

    }else if(scroll >= section5 && scroll < section6){
        
        menuLi[4].classList.add('scroll--active');

    }else if(scroll >= section6){
        
        menuLi[5].classList.add('scroll--active');

    }

});



console.log(wishOrNot);