// 전체 약관 동의
function selectAll(selectAll)  {
    console.log(document.getElementById("checkAll").checked);
    const checkboxes 
        = document.querySelectorAll('input[type="checkbox"]');
    console.log(checkboxes);
    checkboxes.forEach((checkbox) => {
        console.log(checkbox);
        checkbox.checked = selectAll.checked
        console.log(checkbox.checked);
    })
}

// ------------ 유효성 검사 ------------

// tourist(구매자)용 회원가입
// 항목 작성했는지 체크 - 모두 작성해야 가입 진행
const chk = {
    "email" : false,
    "auth" : false,
    "password" : false,
    "pwCheck" : false,
    "gender" : false,
    "name" : false,
    "contact" : false,
    "emergencyCo" : false,
    "passport" : false
};

// 이메일 유효성 검사
const email = document.getElementById("email");
const emailMessage = document.getElementById("emailMessage");

// 이메일 입력중 검사
email.addEventListener("input",()=>{
    if(email.value.trim().length == 0){
        email.value = "";
        emailMessage.innerText = "";
        email.style.border = "1px solid #1c797d";
        emailMessage.classList.remove("error-message","possible-message")
        chk.email = false;
        return;
    }
    // 정규 표현식
    const regex = /^[A-Za-z\d\-\_]{4,}@[가-힣\w\-\_]+(\.\w+){1,3}$/;
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(regex.test(email.value)){
        // 정규표현식 통과 -> 이메일 중복 검사
        fetch('/dupCheck/email?email='+email.value)
        .then(resp=>resp.text())
        .then(count=>{
            if(count==0){
                emailMessage.innerText="사용 가능한 이메일입니다.";
                email.style.border = "1px solid #1c797d";
                emailMessage.classList.add("possible-message");
                emailMessage.classList.remove("error-message");
                chk.email = true;

            }else{
                emailMessage.innerText="이미 사용 중인 이메일입니다.";
                email.style.border = "1px solid rgba(255, 0, 0, 0.77)"
                emailMessage.classList.add("error-message");
                emailMessage.classList.remove("possible-message");
                chk.email = false;
            }
        })
        .catch(err=>console.log(err));
    }else{
        emailMessage.innerText="올바른 이메일 형식으로 작성해주세요."
        email.style.border = "1px solid rgba(255, 0, 0, 0.77)"
        emailMessage.classList.add("error-message");
        emailMessage.classList.remove("possible-message");
        chk.email=false;
    }
});

// 이메일로 인증번호 보내기

// 인증 번호 발송
const sendAuthBtn = document.getElementById("sendAuthBtn");
// 인증 번호 입력 타이머
const authMessage = document.getElementById("authMessage");
let authTimer;
let authMin;
let authSec;
// 인증 번호 발송 성공 이메일 저장
let authenticEmail;

sendAuthBtn.addEventListener("click",()=>{
    authMin = 9;
    authSec = 59;

    chk.auth = false;

    if(chk.email){ // 사용 가능한 이메일
        // 인증번호 이메일로 보내기 ajax
        fetch("/sendEmail/authEmail?email="+email.value)
        .then(resp=>resp.text())
        .then(result=>{
            if(result>0){ // 이메일 전송 됐으면
                console.log("인증 번호 발송 성공");
                authenticEmail = email.value;
            }else{ // 이메일 전송 실패
                console.log("인증 번호 발송 실패");
            }
        })
        .catch(error=>{
            console.log(error);
            console.log("이메일 전송 에러 발생");
        });

        alert("인증번호가 발송 되었습니다. 이메일을 확인해주세요.");

        authMessage.innerText = "10:00";
        authMessage.classList.add("for-authTimer");
        // authMessage.classList.remove("possible-message");

        authTimer = window.setInterval(()=>{
            authMessage.innerText = (authMin<10 ? "0"+authMin : authMin) + ":" + (authSec<10 ? "0"+authSec : authSec);
            
            // 남은 시간 0분 0초
            if(authMin==0 && authSec==0){
                chk.auth = false;
                clearInterval(authTimer);
                return;
            }

            // 분 숫자 감소
            if(authSec==0){
                authSec = 60;
                authMin--;
            }

            authSec--;

        },1000)
        
    }else{
        alert("사용 가능한 이메일을 작성해주세요.");
        email.focus();
    }
});

// 인증 번호 확인
const inputAuth = document.querySelector("#inputAuth");
const checkAuthBtn = document.querySelector("#checkAuthBtn");

checkAuthBtn.addEventListener("click",()=>{
    if(authMin>0 || authSec>0){ // 유효 시간 내
        // 여러 값 보낼 때
        const dataMap = {"inputAuth":inputAuth.value, "email":authenticEmail}
        const query = new URLSearchParams(dataMap).toString();
        fetch("/sendEmail/checkAuthKey?" + query)
        .then(resp=>resp.text())
        .then(result=>{
            if(result>0){
                // alert("인증 완료 되었습니다.");
                clearInterval(authTimer);
                authMessage.innerText = "인증 완료 되었습니다.";
                authMessage.classList.add("possible-message");
                authMessage.classList.remove("for-authTimer");
                chk.auth = true;
            }else{
                alert("인증번호가 일치하지 않습니다.");
                chk.auth = false;
            }
        })
        .catch(err=>console.log(err));
    }else{
        alert("인증 시간이 만료되었습니다. 인증 번호를 다시 발급 받으세요.");
    }
});


