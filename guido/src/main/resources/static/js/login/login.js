// 비밀번호 보이게안보이게
// const password = document.getElementById("password");
const showOrNotPwImg = document.getElementById("showOrNotPw");

showOrNotPwImg.addEventListener("click",()=>{
    password.classList.toggle("invisible");
    password.classList.toggle("visible");
    if(password.classList.contains("invisible")){
        showOrNotPwImg.src = "/images/signUp/invisible.png";
        password.type = "password";
    }
    if(password.classList.contains("visible")) {
        showOrNotPwImg.src = "/images/signUp/visible.png";
        password.type = "text"
    }
});

// 로그인 폼 비어있으면 제출 방지
const loginForm = document.querySelector("#loginForm");
const email = document.querySelector("#email");
const loginBtn = document.querySelector(".login-btn");

if(loginForm != null){
    loginBtn.addEventListener("click",(e)=>{
        if(email.value.trim().length==0){
            alert("이메일을 입력해주세요.");
            email.value="";
            email.focus();
            e.preventDefault();
            return;
        }
        if(password.value.trim().length==0){
            alert("비밀번호를 입력해주세요.");
            password.value="";
            password.focus();
            e.preventDefault();
            return;
        }
    });
}

// 비번 찾기 모달
var show = document.querySelector('#show');
var modalWindow = document.querySelector('#modalWindow');
var modal = document.querySelector('#modal');
var close = document.querySelector('#close');
var sendEmailBtn = document.querySelector('#sendEmailBtn');

show.addEventListener("click",()=>{
    modal1.style.display = "block";
})
sendEmailBtn.addEventListener("click",()=>{
    modal1.style.display = "none";
    modal2.style.display = "block";
})
close.addEventListener("click",()=>{
    modal1.style.display = "none";
})
close2.addEventListener("click",()=>{
    modal2.style.display = "none";
})

// 아이디 저장
// 자바스크립트로 쿠키 얻어오기
function getCookie(key){
    const cookies = document.cookie;

    const cookieList = cookies.split(";").map(cookie=>cookie.split("="));

    const obj = {};
    for(let i=0; i<cookieList.length; i++){
        obj[cookieList[i][0]]=cookieList[i][1];
    }
    return obj[key];
}
// 쿠키에 rememberId가 있을 경우
if(document.querySelector("input[name='userEmail']")!=null){
    const rememberId = getCookie("rememberId");
    if(rememberId != undefined){
        document.querySelector("input[name='userEmail']").value = rememberId;
        document.querySelector("input[name='rememberId']").checked = true;
    }
}

