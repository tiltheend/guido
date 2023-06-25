


let totalCost = document.getElementById("totalCost");

if(package==0){
    /* 총 금액 : n박 시 = productPrice */
    totalCost.innerText = Number(product.productPrice)*Number(guestCount);
}else{
    /* 총 금액 : 1박 시 = 인원수 * productPrice */
    totalCost.innerText = product.productPrice;
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
            document.getElementById("eachCost").innerText = Math.ceil(product.productPrice/count);
        }
    
    
        /* 1박 패키지 
            ->  1인당 금액 고정(product price 값)
            -> 인원 수 증감하는대로 총 금액 변동 (product price * 인원 수)
        */
        if(package==0){
            document.getElementById("totalCost").innerText = product.productPrice*count;
        }


        guestCountWarning(count);

    
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



/* 관심상품 등록/제거 처리 */
const wishHeart = document.getElementById("wishHeart");
let check;      // 관심상품 등록 여부

/* 관심 상품 등록O */
if (wishHeart.checked) {
    check = 1;
} else {
    /* 관심 상품 등록X */
    check = 0;
}

const wishData = {"productNo" : product.productNo, "userNo": 18, "check": check};
// const wishData = {"productNo" : productNo, "userNo": loginUserNo, "check": check};


wishHeart.addEventListener("click", ()=> {
    
    fetch("/productDetail/updateWish",{
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(wishData)
    })
    .then(resp=>resp.text())
    .then(result=>{

        if(result==0){
            console.log("관심상품 등록 실패");
        }

    })
    .catch(err=>{
        console.log(err);
    })
});


/* 게스트 최대/최소 인원 수 경고 */
const inputGuestCount = document.querySelector(".detail--right__price-count");

function guestCountWarning(count){
        
    if(count<product.minTourist || count>product.maxTourist){
        inputGuestCount.style.color = 'red';
    }else{
        inputGuestCount.style.color = '#000000';
    }
}



guestCountWarning(guestCount);


const reserveBtn = document.getElementById("reserveBtn");

/* 예약 버튼 클릭 시 게스트 최대 최소 인원 수 기준을 충족하지 못하면 제출 막기 */
reserveBtn.addEventListener("click", e=>{
    
    /* 게스트 수 최소 인원 미만 */
    if(inputGuestCount.innerText<product.minTourist){
        e.preventDefault();
        alert("최소 " + product.minTourist + "명 이상 예약 가능합니다.");
    }
    
    /* 게스트 수 최대 인원 초과 */
    if(inputGuestCount.innerText>product.maxTourist){
        e.preventDefault();
        alert("예약 가능한 최대 인원 수를 초과합니다.");
    }
    

    /* 게스트 수가 옵션 여분을 초과할 시 */
    if(Object.keys(product.optionList).length != 0){
        
        const options = document.getElementsByName("option");
        let selectedOption;
        let optionRestCount;

        for (let i = 0; i < options.length; i++) {
            if (options[i].checked) {
                selectedOption = options[i].value;
                break;
            }
        }
        
        for (let i = 0; i < options.length; i++) {
            
            if(product.optionList[i].optionNo == selectedOption){
                optionRestCount = product.optionList[i].optionRestCount;
                break;
            }
        }


        if(optionRestCount<inputGuestCount.innerText){
            alert("현재 예약 가능한 인원 수를 초과합니다");
            e.preventDefault();
        }


    }

});



document.querySelectorAll(".panel-default>.panel-heading a").forEach((dropdownBtn)=>{

    dropdownBtn.addEventListener("click", ()=>{

            var geocoder = new kakao.maps.services.Geocoder();

            var coord = new kakao.maps.LatLng(35.815329818853414, 127.14976741791679);
            var callback = function(result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    createMap(result[0].address.address_name, coord);
                }
            };

            geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);


            function createMap(addressName, coordinates){
                
                
                var mapContainer = document.getElementById('tourcourseMap'), // 지도의 중심좌표
                    mapOption = { 
                        center: new kakao.maps.LatLng(coordinates.getLat(), coordinates.getLng()), // 지도의 중심좌표
                        draggable: false,   // 지도 이동 막기
                        level: 3 // 지도의 확대 레벨
                    }; 
                
                var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
                
                // 지도에 마커를 표시합니다 
                var marker = new kakao.maps.Marker({
                    map: map, 
                    position: new kakao.maps.LatLng(coordinates.getLat(), coordinates.getLng())
                });
                
                
                // 커스텀 오버레이에 표시할 컨텐츠 입니다
                // 커스텀 오버레이는 아래와 같이 사용자가 자유롭게 컨텐츠를 구성하고 이벤트를 제어할 수 있기 때문에
                // 별도의 이벤트 메소드를 제공하지 않습니다 
                var content = '<div class="map--wrap">' + 
                            '    <div class="map--info">' + 
                            '        <div class="map--title">' + 
                            '            카카오 스페이스닷원' + 
                            '        </div>' + 
                            '        <div class="map--body">' + 
                            '            <div class="map--desc">' + 
                            '                <div class="map--ellipsis">' + addressName + '</div>' + 
                            '            </div>' + 
                            '        </div>' + 
                            '    </div>' +    
                            '</div>';
                
                // 마커 위에 커스텀오버레이를 표시합니다
                // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
                var overlay = new kakao.maps.CustomOverlay({
                    content: content,
                    map: map,
                    position: marker.getPosition()
                });
            }
        
        map.setCenter(coord);
        map.setLevel(2);
        map.relayout();
        map.setLevel(3);
        map.relayout();

    })

})
