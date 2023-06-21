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

