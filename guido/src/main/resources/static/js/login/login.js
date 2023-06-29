// 비밀번호 보이게안보이게 (눈깜빡)
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

// 비번 찾기 모달 
const show = document.querySelector('#show');
const modalWindow = document.querySelector('#modalWindow');
const modal = document.querySelector('#modal');
const close = document.querySelector('#close');
const sendEmailBtn = document.querySelector('#sendEmailBtn');

// 비번 찾기 모달 띄우기
show.addEventListener("click",()=>{
    modal1.style.display = "block";
})


// 임시 비번 이메일로 ajax

// 계정 이메일 입력 받아서 
const modalEmail = document.getElementById("modalEmail");
const errorMsg = document.querySelector(".inputError");

sendEmailBtn.addEventListener("click",e=>{

    // 비어있으면 이메일 입력해달라고 밑에 빨간 글씨 테두리도 빨갛게
    if(modalEmail.value.trim().length==0){
        modalEmail.style.border = "1px solid red";
        errorMsg.style.visibility = "visible";
        errorMsg.innerHTML = "이메일을 입력해주세요.";
        modalEmail.value="";
        modalEmail.focus();
        e.preventDefault();
        return;
    }else{
        // ajax로 계정 찾기 (get)
        fetch('/dupCheck/email?email=' + modalEmail.value.trim())
        .then(response=>response.text())
        .then(count=>{

            // 없는 계정이면 밑에 빨간 글씨 "존재하지 않는 계정입니다. 다시 한번 확인해주세요."
            if(count==0){
                modalEmail.style.border = "1px solid red";
                errorMsg.style.visibility = "visible";
                errorMsg.innerHTML = "존재하지 않는 계정입니다. 다시 한번 확인해주세요.";
            }else{
                // 있는 계정이면 임시 비밀번호 발송하기 ajax
                fetch('/sendEmail/tempPw?email=' + modalEmail.value.trim())
                .then(resp=>resp.text())
                .then(result=>{
                    // 메일 발송 성공 시
                    if(result>0){
                        // 다음 모달(이메일 전송 완료) 넘어가기
                        modal1.style.display = "none";
                        modal2.style.display = "block";
                    }else alert("임시 비밀번호 발송 실패. 다시 시도해주세요.");
                })
                .catch(err=>{
                    console.log("이메일 발송 에러 발생");
                    console.log(err);
                })
            }
        })
        .catch(err=>console.log(err));
    }

})

// 비번 찾기 - 이메일 입력 모달 x버튼
close.addEventListener("click",()=>{
    modal1.style.display = "none";
    modalEmail.value="";
    modalEmail.style.border = "1px solid #c5c5c5";
    errorMsg.innerHTML = "";
})
// 임시 비번 메일 전송 완료 x버튼
close2.addEventListener("click",()=>{
    modal2.style.display = "none";
    modalEmail.value="";
    modalEmail.style.border = "1px solid #c5c5c5";
    errorMsg.innerHTML = "";
    window.location.reload;

})
