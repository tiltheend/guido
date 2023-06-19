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