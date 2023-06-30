// 미리보기 관련 요소 모두 얻어오기

// add 5개
const addLabel = document.getElementsByClassName("add-label");
// img 5개
const previews = document.getElementsByClassName("preview");
// file 5개
const inputImages = document.getElementsByClassName("input-image");
// x버튼 5개
const deleteBtn = document.getElementsByClassName("delete-btn");
for(let i=0 ; i<inputImages.length ; i++){
    // 파일이 선택되거나, 선택 후 취소 되었을 때
    inputImages[i].addEventListener('change', e => {
        const file = e.target.files[0]; // 선택된 파일의 데이터
        if(file != undefined){ // 파일이 선택되었을 때
            const reader = new FileReader(); // 파일을 읽는 객체
            reader.readAsDataURL(file);
            // 지정된 파일을 읽은 후 result 변수에 URL 형식으로 저장
            reader.onload = e => { // 파일을 다 읽은 후 수행
                previews[i].setAttribute("src",e.target.result);
                previews[i].classList.remove("hidden");
                addLabel[i].classList.add("hidden");
            }
        } else { // 파일 선택 후 취소 되었을 때
                // -> 선택된 파일 없음 -> 미리보기 삭제
            previews[i].removeAttribute("src");
            previews[i].classList.add("hidden");
            addLabel[i].classList.remove("hidden");
        }
    })
    // 미리보기 삭제 버튼(X버튼) 클릭 시
    deleteBtn[i].addEventListener('click', () => {
        // 미리보기 이미지가 있을 경우
        if(previews[i].getAttribute("src") != ""){
            // preview의 src속성 지우기(미리보기 삭제)
            previews[i].removeAttribute("src");
            previews[i].classList.add("hidden");
            addLabel[i].classList.remove("hidden");
            // inputImage Value 비우기(파일 경로 삭제)
            inputImages[i].value="";
        }
    })
}




const slideArea = document.querySelector('.img-slide-area');
const imgArea = document.querySelector('.img-area');
const imgBoxes = document.querySelectorAll('.img-box');
const leftBtn = document.querySelector('.img-slide-left-btn');
const rightBtn = document.querySelector('.img-slide-right-btn');
let currentIndex = 0;
const slideWidth = imgBoxes[0].offsetWidth;
let touchStartX = 0;
let touchMoveX = 0;

function slideLeft() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = 0;
    }
    slideImages();
}

function slideRight() {
    currentIndex++;
    slideImages();
}

function slideImages() {
    const slideDistance = slideWidth * currentIndex;
    imgArea.style.transform = `translateX(${-slideDistance}px)`;
    const end = imgArea.offsetWidth - slideArea.offsetWidth;
    if(slideDistance > end) {
        imgArea.style.transform = `translateX(-${end}px)`;
        currentIndex = end / slideWidth;
    }
}

function handleTouchStart(event) {
touchStartX = event.touches[0].clientX;
}

function handleTouchMove(event) {
touchMoveX = event.touches[0].clientX;
}

function handleTouchEnd() {
const touchDistance = touchMoveX - touchStartX;
const threshold = slideWidth / 2;

if (touchDistance > threshold) {
    slideLeft();
} else if (touchDistance < -threshold) {
    slideRight();
}
}
leftBtn.addEventListener('click', slideLeft);
rightBtn.addEventListener('click', slideRight);
slideArea.addEventListener('touchstart', handleTouchStart);
slideArea.addEventListener('touchmove', handleTouchMove);
slideArea.addEventListener('touchend', handleTouchEnd);


/* 이벤트 시작 일을 오늘 날짜로 설정 */
document.getElementById('today').value = new Date().toISOString().split('T')[0];



Coloris({
    // parent: '.demo',
    theme: 'pill',     //default, large, polaroid, pill
    themeMode: 'light',   //light , dark 모드
    margin: 2,            //입력 필드와 색선택시 사이 여백
    alpha: false,          //불투명도 조절
    format: 'hex',        //포맷  hex rgb hsl auto mixed
    formatToggle: true,   //포맷 토글
    clearButton: true,
    clearLabel: '초기화',
    closeButton: true,
    closeLabel: '닫기',
    inline: false,
    defaultColor: '#000000',
});