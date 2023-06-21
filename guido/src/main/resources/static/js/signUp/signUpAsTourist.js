// tourist(구매자)용 회원가입
// 항목 작성했는지 체크 - 모두 작성해야 가입 진행
const chk = {
    "email" : false,
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
        chk.email = false;
        return;
    }
    // 정규 표현식
    const regEx = /^[A-Za-z\d\-\_]{4,}@[가-힣\w\-\_]+(\.\w+){1,3}$/;

    if(regEx.test(email.value)){

        fetch('/dupCheck/email?email='+email.value)
        .then(resp=>resp.text())
        .then(count=>{
            if(count==0){
                emailMessage.innerText="사용 가능 이메일"

            }
        })
    }


});