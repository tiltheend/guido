
let totalCost = document.getElementById("totalCost");

// 총금액 표기하는 div가 존재할 때만
if(document.querySelector(".detail--right__price-total")!=null){
    
    if(package==0){
        /* 총 금액 : 1박 시 = 인원수 * productPrice */
        totalCost.innerText = Number(product.productPrice)*Number(guestCount);
    }else{
        /* 총 금액 : n박 시 = productPrice */
        totalCost.innerText = product.productPrice;
    }



    /* 예약 인원 수 증가 버튼 클릭 이벤트 */
    const plusBtn = document.querySelector(".detail--right__price-plus");
    const minusBtn = document.querySelector(".detail--right__price-minus");
    
    
    /* 증가 버튼 클릭 시 */
    plusBtn.addEventListener("click", ()=>{
      
      const count = document.querySelector(".detail--right__price-count");
    
      count.innerText = Number(count.innerText) + 1;
    
    }); 
    
    
    /* 감소 버튼 클릭 시 */
    minusBtn.addEventListener("click", ()=>{
      
        /* 인원 수 */
      const count = document.querySelector(".detail--right__price-count");
      
      /* 최소 인원수 제한 */
      if(Number(count.innerText)>1){
          count.innerText = Number(count.innerText) - 1;
      }
    
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


        /* 비로그인 유저 예약 막기 */
        if(loginUserNo == null){
            alert("로그인 후 이용 가능합니다.");
            return;
        }

        /* 게스트 수 최소 인원 미만 */
        if(inputGuestCount.innerText<product.minTourist){
            e.preventDefault();
            alert("최소 " + product.minTourist + "명 이상 예약 가능합니다");
            return;
        }
        
        /* 게스트 수 최대 인원 초과 */
        if(inputGuestCount.innerText>product.maxTourist){
            e.preventDefault();
            alert("예약 가능한 최대 인원 수를 초과합니다.");
            return;
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
                return;
            }
        }

        /* 여행객이 아닌 경우 */
        if(loginUserType!='T'){
            alert("tourist 계정으로 접속해주세요");
            e.preventDefault();
            return;
        }

        /* 얼굴 인증사진을 등록하지 않았을 경우 */
        if(faceImg==null){
            toggleModal();
            e.preventDefault();
        }


        
        
        const guestHidden = document.getElementById("guestHidden");
        const dateHidden = document.getElementById("dateHidden");
        
        guestHidden.value = inputGuestCount.innerText;
        
        /* 날짜 미선택 시 */
        if(dateHidden.value==""){
            alert("날짜를 선택해주세요!");
            e.preventDefault();
            return;
        }


        /* 당일 투어의 경우 옵션 미선택 시 */
        if(package==0){
            const radios = document.querySelectorAll('input[type="radio"][name="option"]');
            let checked = false;

            radios.forEach(radio => {
                if (radio.checked) {
                checked = true;
                }
            });

            if (!checked) {
                alert("옵션을 선택해주세요.");
                e.preventDefault();
            }
        }

    });


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
if(document.getElementById("wishHeart")!=null){
    
    const wishHeart = document.getElementById("wishHeart");
    let check;      // 관심상품 등록 여부

    let productNo = document.querySelector('.detail--text__title').getAttribute('data-productno');
    let productName = document.querySelector('.detail--text__title').getAttribute('data-productname');
    console.log(productNo);
    console.log(productName);

    /* 관심 상품 등록O */
    if (wishHeart.checked) {
        check = 1;
    } else {
        /* 관심 상품 등록X */
        check = 0;
    }
    
    const wishData = {"productNo" : productNo, "userNo": loginUserNo, "check": check};
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
            
            // sendWish(productNo, productName); // 관심상품 등록 알림

    
        })
        .catch(err=>{
            console.log(err);
        })
    });

}





// 모달 창 토글
function toggleModal() {
    let faceModal = document.getElementById("faceImgModal");
    faceModal.style.display = (faceModal.style.display === "block") ? "none" : "block";
}




/* 인증 사진 모달 저장 버튼 클릭 시 */
const faceImgUploadBtn = document.getElementById("faceImgUpload");      // 저장 버튼
const realUpload = document.querySelector(".real-upload");  // input 태그
const upload = document.querySelector(".upload");   // img 태그

let initCheck;  // 초기 프로필 이미지 상태 저장
let deleteCheck = -1;  // 프로필 이미지 새로 업로드 or 삭제되었음을 나타냄
let originalImage;     // 초기 프로필 이미지 파일의 경로 저장


// 내상점 닫기 버튼 클릭 시
document.querySelector(".close").addEventListener("click", ()=>{

    upload.setAttribute("src", "/images/productDetail/faceImg2.jpg");
    realUpload.value="";
});
    

    if(realUpload!=null){
        
        originalImage = upload.getAttribute("src");
        
        if(originalImage == "/images/productDetail/faceImg2.jpg"){
            initCheck = false;
        }else{
            initCheck = true;
        }

    }
    
    upload.addEventListener("click", ()=> realUpload.click());
    
    realUpload.addEventListener("change", e=>{
        
        const maxSize = 1* 1024 * 1024 * 2;
        const file = e.target.files[0];     // 업로드한 파일의 정보

        if(file==undefined){
            deleteCheck = -1;   // 취소==파일없음
            upload.setAttribute("src", originalImage);
            return;
        }

        if(file.size>maxSize){
            alert("2MB 이하의 이미지를 선택해주세요");

            realUpload.value="";
            deleteCheck = -1;   //취소==파일없음

            upload.setAttribute("src", originalImage);
            return;
        }


        const reader = new FileReader();
        reader.readAsDataURL(file);


        reader.onload = e =>{
            const url = e.target.result;
            upload.setAttribute("src", url);
            deleteCheck = 1;
        }
        
    });


/* 여행 코스 지도 */
function showTourcourseMap(latitude, longitude, number){

    let geocoder = new kakao.maps.services.Geocoder();

    let coord = new kakao.maps.LatLng(latitude, longitude);

    
    let callback = function(result, status) {
            if (status === kakao.maps.services.Status.OK) {

                createMap(result[0].address.address_name, coord);

            }else if(status === kakao.maps.services.Status.ZERO_RESULT){
                
                geocoder.coord2RegionCode(coord.getLng(), coord.getLat(), function(result, status) {
                    createMap(result[0].address_name, coord);
                })
            }
    };

    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);


    function createMap(addressName, coordinates){
        
        
        const mapContainer = document.getElementById('tourcourseMap' + number), // 지도의 중심좌표
            mapOption = { 
                center: new kakao.maps.LatLng(coordinates.getLat(), coordinates.getLng()), // 지도의 중심좌표
                draggable: false,   // 지도 이동 막기
                level: 3 // 지도의 확대 레벨
            }; 
        
            const map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성
        
            // 지도에 마커를 표시 
            const marker = new kakao.maps.Marker({
                map: map, 
                position: new kakao.maps.LatLng(coordinates.getLat(), coordinates.getLng())
            });
        
        
            // 커스텀 오버레이에 표시할 컨텐츠 입니다
            const content = '<div class="map--wrap">' + 
                        '    <div class="map--info">' + 
                        '        <div class="map--body">' + 
                        '            <div class="map--desc">' + 
                        '                <div class="map--ellipsis">' + addressName + '</div>' + 
                        '            </div>' + 
                        '        </div>' + 
                        '    </div>' +    
                        '</div>';
            
            // 마커 위에 커스텀오버레이를 표시
            const overlay = new kakao.maps.CustomOverlay({
                content: content,
                map: map,
                position: marker.getPosition()
            });


            map.setCenter(coord);
            map.setLevel(2);
            map.relayout();
            map.setLevel(3);
            map.relayout();

    }

}


/* 모든 투어 코스 마커를 모아둔 지도 */
if(Object.keys(product.tourCourse).length != 0){

    let mainCourseX;
    let mainCourseY;

    /* bossCourseFL = Y인 tourCourse의 좌표가 지도의 중심 좌표*/
    product.tourCourse.forEach(course => {
        if(course.bossCourseFL='Y'){
            mainCourseX = course.latitude;
            mainCourseY = course.longitude;
        }
    });
    
    /* 모든 여행 코스 좌표를 모아둔 지도 */
    let mapContainer = document.getElementById('location--map'), // 지도를 표시할 div  
        mapOption = { 
            center: new kakao.maps.LatLng(mainCourseX, mainCourseY), // 지도의 중심좌표
            level: 5 // 지도의 확대 레벨
        };
    
    let locationMap = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성
    
    // 마커를 표시할 위치와 내용을 가지고 있는 객체 배열입니다 
    const positions = product.tourCourse.map(function(course) {
        let courseName = course.courseName;
        let latitude = course.latitude;
        let longitude = course.longitude;
    
        return {
            content: '<div class="customOverlay">' + courseName + '</div>', 
            latlng: new kakao.maps.LatLng(latitude, longitude)
        };
    });
    
    
    var boundsPositions = [];


    for (let i = 0; i < positions.length; i ++) {
        // 마커를 생성
        let marker = new kakao.maps.Marker({
            map: locationMap, // 마커를 표시할 지도
            position: positions[i].latlng // 마커의 위치
        });


         // 마커에 표시할 커스텀 오버레이를 생성 
        let customOverlay = new kakao.maps.CustomOverlay({
            content: positions[i].content, // 인포윈도우에 표시할 내용
            map : locationMap,
            position: marker.getPosition()
        });

        
        // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록
        // 이벤트 리스너로는 클로저를 만들어 등록 
        // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
        kakao.maps.event.addListener(marker, 'mouseover', ()=>{
            customOverlay.setMap(locationMap);
        });
        
        kakao.maps.event.addListener(marker, 'mouseout', ()=>{
            customOverlay.setMap(null);
        });
        
        customOverlay.setMap(null);


        // 아래 배열의 좌표들이 모두 보이게 지도 범위를 재설정
        boundsPositions.push(positions[i].latlng);
    }


    // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성
    const bounds = new kakao.maps.LatLngBounds();

    for (let i = 0; i < boundsPositions.length; i++) {
        // LatLngBounds 객체에 좌표를 추가
        bounds.extend(boundsPositions[i]);

        // LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정
        // 이때 지도의 중심좌표와 레벨이 변경될 수 있음
        locationMap.setBounds(bounds);
    }
        
    
    /* 줌 레벨 설정 */
    let zoomControl = new kakao.maps.ZoomControl();
    locationMap.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);


    window.addEventListener('resize', function() {
        locationMap.setBounds(bounds);
    });

}


/* 블라인드 게시글 스크롤 막기 처리 */
if(product.productState=='B'){
    document.querySelector("body").style.overflow = 'hidden';
}


if(document.getElementById('editBtn')!=null){

    document.getElementById('editBtn').addEventListener('click', function () {
        location.href = location.pathname + '/edit';
    });
}

if (document.getElementById('deleteBtn') != null) {
    document.getElementById('deleteBtn').addEventListener('click', function () {
        location.href = location.pathname + '/delete';
    });
}




/* 일정 소개 예약 가능한 일자 첫번째~마지막번째 세팅 */
// 21 Jun, 2023 - 24 Jun, 2023

let allDates = product.productDateList.map(item => item.productDate);

let firstDate = allDates[0];
let lastDate = allDates[allDates.length-1];

firstDate = new Date(firstDate);
lastDate = new Date(lastDate);

firstDate = firstDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
lastDate = lastDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

document.querySelector(".detail--text__date-second").innerText = firstDate + " - " + lastDate;



/* 슬라이드 사진 클릭 시 크게 보기 팝업 */
const slideImages = document.getElementsByClassName("detail--silde__item-img");

Array.from(slideImages).forEach(function(slide){
    slide.addEventListener("click", ()=>{

        const modal = document.querySelector(".modal2");
        const modal_img = document.querySelector(".modal_content2");
        const span = document.querySelector(".close2");

        modalDisplay("block");
        modal_img.src = slide.getAttribute("src");

        span.addEventListener('click', ()=>{
        modalDisplay("none");
        });

        modal.addEventListener('click', ()=>{
        modalDisplay("none");
        });

        function modalDisplay(text){
        modal.style.display = text;
        }
    })
});


/* 총 일정 확인 캘린더 */
const fullCalendar = document.querySelector(".detail--calendar__date");

document.addEventListener('DOMContentLoaded', function() {

    let events = allProductDateList.map(function(item) {

        return {
            start : item.productDate,
            end : calculateLastDate(item.productDate),
            overlap: false,
            display: 'background'
        }
    });


    let calendar = new FullCalendar.Calendar(fullCalendar, {
        initialView: 'dayGridMonth',
        initialDate: allProductDateList[0].productDate,
        headerToolbar:{
            left: 'prev',
            center: 'title',
            right: 'next'
        },
        events : events
    });
    calendar.render();

});


/* 마지막 날짜 계산 */
function calculateLastDate(productDate){

    const package = product.productPackage;
    let lastDate = new Date(productDate);

    lastDate.setDate(lastDate.getDate() + package);
    const year = lastDate.getFullYear();
    const month = String(lastDate.getMonth() + 1).padStart(2, "0");
    const day = String(lastDate.getDate()).padStart(2, "0");
    lastDate = `${year}-${month}-${day}`;
    
    return lastDate;
}

