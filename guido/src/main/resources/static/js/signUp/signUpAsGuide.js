// 유효성 검사용 chk

// tourist(구매자)용 회원가입
// 항목 작성했는지 체크 - 모두 작성해야 가입 진행
const chk = {
    "email" : false,
    "inputAuth" : false,
    "password" : false,
    "checkPassword" : false,
    "lastName" : false,
    "firstName" : false,
    "phone" : false,
    "languageSkill" : false,
    "confirmationNo" : false,
    "infoAgree1" : false,
    "infoAgree2" : false
};


// 약관 설명 펼치기
const arrow1 = document.querySelector("#arrow1");
const terms1 = document.getElementById("terms1");

// 스크롤 위치 고정
document.body.style.overflow = "hidden";
const scrollPosition = document.documentElement.scrollTop;

arrow1.addEventListener("click",()=>{
    arrow1.classList.toggle("upArrow");
    arrow1.classList.toggle("downArrow");
    if(arrow1.classList.contains("downArrow")){
        terms1.style.display = "none";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollPosition);
    }else{
        terms1.style.display = "block";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollPosition);
    }
});

const arrow2 = document.querySelector("#arrow2");
const terms2 = document.getElementById("terms2");

arrow2.addEventListener("click",()=>{
    arrow2.classList.toggle("upArrow");
    arrow2.classList.toggle("downArrow");
    if(arrow2.classList.contains("downArrow")){
        terms2.style.display = "none";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollPosition);
    }else{
        terms2.style.display = "block";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollPosition);
    }
});
// const arrow3 = document.querySelector("#arrow3");
// const terms3 = document.getElementById("terms3");
// arrow3.addEventListener("click",()=>{
//     arrow3.classList.toggle("upArrow");
//     arrow3.classList.toggle("downArrow");
//     if(arrow3.classList.contains("downArrow")){
//         terms3.style.display = "none";
//     }else{
//         terms3.style.display = "block";
//     }
// });


// ------------ 유효성 검사 ------------

 // 구글 이메일 input value로 set

const authLable = document.querySelector('label[for="inputAuth"]');
const authPart = document.querySelector(".authPart");
const sendAuthBtn = document.getElementById("sendAuthBtn");

const email = document.getElementById("email");
const emailMessage = document.getElementById("emailMessage");

if(googleEmail){
    email.validity.valid = true;
}
if(email.value==googleEmail){
    chk.email=true;
    chk.inputAuth=true;
    sendAuthBtn.style.display="none";
    authPart.style.display="none";
}


// 이메일 유효성 검사

// 이메일 입력중 검사
email.addEventListener("input",()=>{
    if(email.value.trim().length == 0){
        email.value = "";
        emailMessage.innerText = "";
        emailMessage.classList.remove("error-message","possible-message")
        chk.email = false;
        return;
    }
    // 정규 표현식
    const emailRegex = /^[A-Za-z\d\-\_]{4,}@[가-힣\w\-\_]+(\.\w+){1,3}$/;
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(emailRegex.test(email.value)){
        // 정규표현식 통과 -> 이메일 중복 검사
        fetch('/dupCheck/email?email='+email.value)
        .then(resp=>resp.text())
        .then(count=>{
            if(count==0){
                emailMessage.innerText="사용 가능한 이메일입니다.";
                emailMessage.classList.add("possible-message");
                emailMessage.classList.remove("error-message");
                chk.email = true;

            }else{
                emailMessage.innerText="이미 사용 중인 이메일입니다.";
                emailMessage.classList.add("error-message");
                emailMessage.classList.remove("possible-message");
                chk.email = false;
            }
        })
        .catch(err=>console.log(err));
    }else{
        emailMessage.innerText="올바른 이메일 형식으로 작성해주세요."
        emailMessage.classList.add("error-message");
        emailMessage.classList.remove("possible-message");
        chk.email=false;
    }
});

// 이메일로 인증번호 보내기

// 인증 번호 발송

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

    chk.inputAuth = false;

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
                chk.inputAuth = false;
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
                chk.inputAuth = true;
            }else{
                alert("인증번호가 일치하지 않습니다.");
                chk.inputAuth = false;
            }
        })
        .catch(err=>console.log(err));
    }else{
        alert("인증 시간이 만료되었습니다. 인증 번호를 다시 발급 받으세요.");
    }
});

// 비밀번호 검사
// 영어 소문자,숫자,특수기호를 포함한 10~16자리 비밀번호
const pwRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{10,16}$/
;
const password = document.getElementById("password");
const pwMessage = document.getElementById("pwMessage");

password.addEventListener("input",()=>{
    if(password.value.trim().length==0){
        password.value="";
        chk.password=false;
        pwMessage.innerHTML =
        "영어 소문자, 숫자, 특수문자(@,$,!,%,*,?,&)를 포함한 10~20자의 <br>비밀번호를 입력해주세요.";
        pwMessage.classList.add("normal-message");
        pwMessage.classList.remove("possible-message");
        pwMessage.classList.remove("error-message");
        return;
    }
    
    if(pwRegex.test(password.value)){
        pwMessage.innerText="유효한 형식의 비밀번호입니다.";
        pwMessage.classList.add("possible-message");
        pwMessage.classList.remove("error-message");
        pwMessage.classList.remove("normal-message");
        chk.password = true;
        
    }else{
        pwMessage.innerHTML =
        "영어 소문자, 숫자, 특수문자(@,$,!,%,*,?,&)를 포함한 10~20자의 <br>비밀번호를 입력해주세요.";
        pwMessage.classList.add("error-message");
        pwMessage.classList.remove("possible-message");
        pwMessage.classList.remove("normal-message");
        password.focus();
        chk.password = false;
    }
});

// 비밀번호 확인 검사
const checkPassword = document.getElementById("checkPassword");
const chkPwMessage = document.getElementById("chkPwMessage");
checkPassword.addEventListener("input",()=>{
    if(checkPassword.value.trim().length==0){
        checkPassword.value="";
        chkPwMessage.innerText=""; 
        chk.checkPassword=false;
        return;
    }
    if(password.value == checkPassword.value){
        chkPwMessage.innerText = "비밀번호가 일치합니다.";
        chkPwMessage.classList.add("possible-message");
        chkPwMessage.classList.remove("error-message");
        chk.checkPassword=true;
    }else{
        chkPwMessage.innerText = "비밀번호가 일치하지 않습니다.";
        chkPwMessage.classList.add("error-message");
        chkPwMessage.classList.remove("possible-message");
        chk.checkPassword=false;

    }
});

// 이름 검사
const lastName = document.getElementById("lastName");
const firstName = document.getElementById("firstName");
const nameMessage1 = document.getElementById("nameMessage1");
const nameMessage2 = document.getElementById("nameMessage2");
// 한글or영어로만.
const nameRegex = /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]+$/
;

lastName.addEventListener("input",()=>{
    if(lastName.value.trim().length==0){
        lastName.value="";
        nameMessage1.innerText="";
        chk.lastName = false;
        return;
    }
    if(nameRegex.test(lastName.value)){
        nameMessage1.innerText = "";
        chk.lastName = true;
    }else{ 
        nameMessage1.innerText = "영어 혹은 한글로만 작성해주세요.";
        nameMessage1.classList.add("name-error");
        nameMessage1.classList.remove("possible-message");
        chk.lastName = false;
    }
});

firstName.addEventListener("input",()=>{
    if(firstName.value.trim().length==0){
        firstName.value="";
        nameMessage2.innerText="";
        chk.firstName = false;
        return;
    }
    if(!nameRegex.test(firstName.value)){
        nameMessage2.innerText = "영어 혹은 한글로만 작성해주세요.";
        nameMessage2.classList.add("name-error");
        nameMessage2.classList.remove("possible-message");
        chk.firstName = false;
    }else{
        nameMessage2.innerText = "";
        chk.firstName = true;
    }
});

// 국제 번호
// 국가를 다시 한번 확인해주세요
const phone = document.getElementById("phone");
const phoneMessage = document.getElementById("phoneMessage");
// 숫자, 특수문자만
const phoneRegex = /^[0-9!@#$%^&*()+-]+$/;


phone.addEventListener("input",()=>{
    if(phone.value.trim().length==0){
        phone.value = "";
        phoneMessage.innerText = "";
        chk.phone = false;
        return;    
    }
    if(phoneRegex.test(phone.value)){
        phoneMessage.innerText = "국가(대한민국)를 다시 한번 확인해주세요.";
        phoneMessage.classList.add("possible-message");
        phoneMessage.classList.remove("error-message");
        chk.phone = true;
    }else{
        phoneMessage.innerText = "숫자, 특수문자만 입력할 수 있습니다."
        phoneMessage.classList.remove("possible-message");
        phoneMessage.classList.add("error-message");
        chk.phone = false;

    }
});


// 관광 통역 안내사 확인증 번호
// 기본) 회원가입 완료 시, 입력하신 번호로 가이드의 자격을 확인, 승인합니다
const confirmationNo = document.getElementById("confirmationNo");
const confirmationNoMessage = document.getElementById("confirmationNoMessage");
confirmationNo.addEventListener("focus",()=>{
    confirmationNoMessage.innerText = "회원가입 완료 시, 입력하신 번호로 가이드의 자격을 확인, 승인합니다.";
    confirmationNoMessage.classList.add("normal-message");
    confirmationNo.addEventListener("input",()=>{
        if(confirmationNo.value.trim().length==0){
            confirmationNo.value="";
            chk.confirmationNo = false;
            return;
        }else{
            chk.confirmationNo = true;
        }
    });
});

// 구사 가능 언어
// err)영어로 작성해주세요, 기본) 1개 이상 작성 시 ','로 구분해주세요. (ex. English, Korean, French)
const languageSkill = document.getElementById("languageSkill");
const languageSkillMessage = document.getElementById("languageSkillMessage");
const skillRegex = /^[a-zA-Z,]+$/; // 영어, ',' 검사

languageSkill.addEventListener("input",()=>{
    if(languageSkill.value.trim().length==0){
        languageSkill.value="";
        languageSkillMessage.innerText="1개 이상 작성 시 ','로 구분해주세요. (ex. English,Korean,French)";
        languageSkillMessage.classList.add("normal-message");
        languageSkillMessage.classList.remove("error-message");
        chk.languageSkill = false;
        return;
    }
    if(!skillRegex.test(languageSkill.value)){
        languageSkillMessage.innerText = "영어로 작성해주세요.";
        languageSkillMessage.classList.add("error-message");
        languageSkillMessage.classList.remove("normal-message");
        chk.languageSkill = false;
    }else{
        languageSkillMessage.innerText="1개 이상 작성 시 ','로 구분해주세요. (ex. English,Korean,French)";
        languageSkillMessage.classList.add("normal-message");
        languageSkillMessage.classList.remove("error-message");
        chk.languageSkill = true;
    }    
});    
languageSkill.addEventListener("focusout",()=>{
    confirmationNoMessage.innerText = "";
    confirmationNoMessage.classList.remove("normal-message");
});

// 약관 동의 체크

const infoAgree1 = document.getElementById("infoAgree1");
const infoAgree2 = document.getElementById("infoAgree2");

// 전체 약관 동의

const checkAllLabel = document.getElementById("checkAllLabel");
const checkAll = document.getElementById("checkAll");

const checkboxes = document.querySelectorAll('input[type="checkbox"]:not(#checkAll)');

// 전체 동의 체크박스
checkAllLabel.addEventListener('click', function() {
    const isChecked = checkAll.checked;

  // 하위 체크박스들의 상태를 전체 동의 체크박스와 동일하게 설정  
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = !(isChecked);
        if(infoAgree1.checked) chk.infoAgree1 = true;
        else chk.infoAgree1 = false;
        if(infoAgree2.checked) chk.infoAgree2 = true;
        else chk.infoAgree2 = false;
    });    
    
});    

// 하위 체크박스 클릭 이벤트 리스너 등록
checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('click', function() {
    // 하위 체크박스 중 하나라도 해제되었을 때 전체 동의 체크박스도 체크 해제    
        if (!this.checked) {
            checkAll.checked = false;
        }    
    });    
});    


// input 다 채워지면(유효성 검사는 x) 회원가입 버튼 색상 변경
// +체크 추가
const signUpBtn = document.getElementById("signUpBtn");
// input
const validity = {email, inputAuth, password, checkPassword, lastName, firstName, phone, languageSkill,confirmationNo};
for(let valid in validity)
validity[valid].addEventListener('input',chagneSignupBtn);

// 제출 버튼 유효화
infoAgree1.addEventListener('change',chagneSignupBtn);
infoAgree2.addEventListener('change',chagneSignupBtn);
checkAll.addEventListener('change', chagneSignupBtn);

function chagneSignupBtn(){
    if (email.validity.valid&&
        checkPassword.validity.valid&&
        lastName.validity.valid&&
        firstName.validity.valid&&
        phone.validity.valid&&
        languageSkill.validity.valid&&
        confirmationNo.validity.valid&&
        password.validity.valid
        &&
        infoAgree1.checked&&
        infoAgree2.checked
        ){
            signUpBtn.style.backgroundColor = "#1c797d";
        }else{
            signUpBtn.style.backgroundColor = "#c5c5c5";
        }
}
    
// 필수 입력 검사
const signUpForm = document.getElementById("signUpForm");

signUpForm.addEventListener("submit",e=>{
    if (!(
        email.validity.valid &&
        password.validity.valid &&
        checkPassword.validity.valid &&
        lastName.validity.valid &&
        firstName.validity.valid &&
        phone.validity.valid &&
        languageSkill.validity.valid &&
        confirmationNo.validity.valid &&
        infoAgree1.checked &&
        infoAgree2.checked
        )
    ) {
        e.preventDefault(); // 제출을 막음
        return;
    }

    for(let key in chk){
        if(!chk[key]){
            switch(key){
                case "email":
                    alert("이메일을 확인해주세요"); break;
                case "inputAuth":
                    alert("이메일 인증을 완료해주세요"); break;
                case "password":
                    alert("비밀번호를 확인해주세요"); break;
                case "checkPassword":
                    alert("비밀번호와 일치하는지 확인해주세요"); break;
                case "lastName":
                    alert("이름을 확인해주세요"); break;
                case "firstName":
                    alert("이름을 확인해주세요"); break;
                case "phone":
                    alert("연락처를 확인해주세요"); break;
                case "languageSkill":
                    alert("구사 가능 언어를 작성해주세요"); break;
                case "confirmationNo":
                    alert("관광 통역 안내사 확인증 번호를 입력해주세요"); break;
                case "infoAgree1":
                    alert("이용약관에 동의해주세요"); break;
                case "infoAgree2":
                    alert("개인정보 수집 및 이용에 동의해주세요"); break;
            }
            document.getElementById(key).focus();
            e.preventDefault();
            return;
        }
    }
});






