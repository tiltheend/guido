// //내정보 수정
// var modifyName = document.getElementById("modifyName");
// var modifyPw = document.getElementById("modifyPw");
// var modifyTel = document.getElementById("modifyTel");
// var modifyImage = document.getElementById("modifyImage");

// var username = document.getElementById("username");
// var userTel = document.getElementById("userTel");

// var profileInfoName = document.querySelector(".profile-info-name");
// var profileInfoPw = document.querySelector(".profile-info-pw");
// var profileInfoTel = document.querySelector(".profile-info-tel");
// var profileInfoImage = document.querySelector(".profile-info-image");

// var form1 = document.getElementById("username").nextElementSibling;
// var button = document.getElementById("inputFirstName").nextElementSibling;

// // 클릭 이벤트 방지
// var preventClick = function(e){
//     e.preventDefault(); 
//     e.stopPropagation(); return false; 

// // 실명 수정
// modifyName.addEventListener("click",()=>{
    
//     modifyName.classList.toggle("modify");
//     modifyName.classList.toggle("cancel");

//     if(modifyName.classList.contains("modify")){
//         modifyName.innerText = "수정";
//         form1.style.display = "none";
//         username.innerText = "유저이름";
//         // profileInfoPw.classList.remove("prevent");
//         // profileInfoTel.classList.prevent("prevent");
//         // profileInfoImage.classList.prevent("prevent");
//     }
//     if(modifyName.classList.contains("cancel")){
//         modifyPw.addEventListener('click',preventClick,true);
//         modifyTel.addEventListener('click',preventClick,true);
//         modifyImage.addEventListener('click',preventClick,true);
//         modifyName.innerText = "취소";
//         form1.style.display = "block";
//         username.innerText = "허가증이나 여권 등 여행 서류에 기재되어 있는 이름을 말합니다.";
//         // profileInfoPw.classList.add("prevent");
//         // profileInfoTel.classList.add("prevent");
//         // profileInfoImage.classList.add("prevent");

//     }


// // 비번 수정
// var originPwF = document.getElementById("originPwF");
// var inputOriginPw = document.getElementById("inputOriginPw");
// var newPwF = document.getElementById("newPwF");
// var inputNewPw = document.getElementById("inputNewPw");
// var checkNewPw = document.getElementById("checkNewPw");

// modifyPw.addEventListener("click",()=>{
//     modifyPw.classList.toggle("modify");
//     modifyPw.classList.toggle("cancel");

//     if(modifyPw.classList.contains("modify")){
//         modifyPw.innerText = "수정";
//         originPwF.style.display = "none";
//         newPwF.style.display = "none";

//     }
//     if(modifyPw.classList.contains("cancel")){

//         modifyPw.innerText = "취소";
//         originPwF.style.display = "block";
//         // 기존 비번 맞으면 
//         inputOriginPw.nextElementSibling.addEventListener("click",()=>{
//             // 비동기 추가하기
//             // 비번 재설정
//             originPwF.style.display = "none";
//             newPwF.style.display = "block";
//             // 비번 수정 비동기
//         })

//     }
    
// })

// 수정 누르면 hidden 나오고 나머지 요소 막음 + 컬러 연하게

const editInfoAreas = document.querySelectorAll(".edit-info-area");

// *모든 수정 영역
editInfoAreas.forEach((editArea)=>{
    const edit = editArea.querySelector(".edit");
    const cancel = editArea.querySelector(".cancel");
    const hiddenArea = editArea.querySelector(".hidden-area");
    const ment = editArea.querySelector(".ment");
    const changeMent = editArea.querySelector(".changeMent");
    const pwCheckBtn = editArea.querySelector(".pw-check-button");
    const pwChangekBtn = editArea.querySelector(".pw-change-button");
    
    // 수정 버튼 클릭
    edit.addEventListener('click',()=>{
        // 숨겨진 영역 보이고
        hiddenArea.style.display = "block";
        // 모든 수정 영역 접근
        editInfoAreas.forEach((area)=>{
            // 다른 수정 영역에 흐리게 + 클릭 방지
            if(area!=editArea){
                area.classList.add("prevent");
            }
        });
        // 현재 수정 영역 수정 버튼 취소 버튼으로
        edit.classList.add('hidden');
        cancel.classList.remove('hidden');
        // 수정 사항 정보 -> 설명
        changeMent.classList.remove('hidden');
        ment.classList.add('hidden');
    });

    // 취소 버튼 클릭
    cancel.addEventListener('click',()=>{
        
        // 영역 다시 숨기기
        hiddenArea.style.display = "none";
        // 다른 수정 영역
        editInfoAreas.forEach((area)=>{
            // 방지 해제
            area.classList.remove('prevent');
        });
        
        // 취소 버튼 숨김
        cancel.classList.add("hidden");
        // 수정 버튼 보임
        edit.classList.remove('hidden');
        // 수정 설명 -> 정보
        changeMent.classList.add('hidden');
        ment.classList.remove('hidden');
    });

});

// -------------------------------
// 유효성 검사

const chk = {
    "email" : false,
    "inputAuth" : false,
    "originPw" : false,
    "password" : false,
    "checkPassword" : false,
    "lastName" : false,
    "firstName" : false,
    "phone" : false,
    "passportNo" : false,
    "primaryLanguage" : false,
    "infoAgree1" : false,
    "infoAgree2" : false
};

// 여권상 이름 검사, 변경
// 이름 검사
const lastName = document.getElementById("lastName");
const firstName = document.getElementById("firstName");
const nameMessage1 = document.getElementById("nameMessage1");
const nameMessage2 = document.getElementById("nameMessage2");

// 유효성 검사
// 하나 이상의 영어 알파벳, 공백, 마침표, 작은따옴표, 대시가 포함된 문자열
const nameRegex = /^[a-zA-Z\s.'-]+$/;

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
    }else{ // 여권상 영문 아닐 때
        nameMessage1.innerText = "여권상 영문명으로 작성해주세요.";
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
        nameMessage2.innerText = "여권상 영문명으로 작성해주세요.";
        nameMessage2.classList.add("name-error");
        nameMessage2.classList.remove("possible-message");
        chk.firstName = false;
    }else{
        nameMessage2.innerText = "";
        chk.firstName = true;
    }
});

// 이름 변경 
const nameBtn = document.getElementById("nameBtn");

nameBtn.addEventListener("click",e=>{
    if(!(chk.firstName&&chk.lastName)){
        e.preventDefault();
        return;
    }

    const userName = lastName.value + " " + firstName.value; 

    fetch("/edit/name",{
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify(userName)
    })
    .then(resp => resp.json())
    .then(loginUser => {
        if(!loginUser){ //실패하면
            alert("이름 수정에 실패했습니다. 다시 시도해주세요.");
        }
        if(loginUser){
            lastName.value="";
            firstName.value="";
            nameMessage1.innerText="";
            nameMessage1.classList.remove("possible-message");
            nameMessage1.classList.remove("error-message");
            nameMessage2.innerText="";
            nameMessage2.classList.remove("possible-message");
            nameMessage2.classList.remove("error-message");
            alert("이름이 변경되었습니다.");
            
            document.getElementById("getName").innerText = loginUser.userName;
            // 바로 다시 버튼 눌리는 거 방지
        }
    })
    .catch(e=>console.log(e));
    chk.firstName = false;
    chk.lastName = false;
});


// 비밀번호 변경

// 기존 비번 확인
const originPw = document.getElementById("originPw");
const originPwChkBtn = document.getElementById("originPwChkBtn");
const newPwMent = document.getElementById("newPwMent");
const newPwPart = document.getElementById("newPwPart");

originPw.addEventListener("input",()=>{
    if(originPw.value.trim().length==0){
        originPw.value = "";
        chk.originPw = false;
        return;
    }else{
        chk.originPw = true;
    }
})

originPwChkBtn.addEventListener("click",e=>{
    if(!chk.originPw){
        e.preventDefault();
        return;
    }

    fetch("/edit/checkOriginPw",{
        method : "post",
        headers : {"Content-Type":"application/json"},
        body : JSON.stringify(originPw.value)
    })
    .then(resp=>resp.text())
    .then(confirm=>{
        if(confirm==0){
            alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
            originPw.value="";
            originPw.focus();
        }
        if(confirm>0){
            newPwMent.style.display = "block";
            newPwPart.style.display = "block";
            chk.originPw = false;
        }
    })
    .catch(e=>console.log(e));
});

// 새 비밀번호 검사
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
        "";
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
        "유효한 형식의 비밀번호를 입력해주세요.";
        pwMessage.classList.add("error-message");
        pwMessage.classList.remove("possible-message");
        pwMessage.classList.remove("normal-message");
        password.focus();
        chk.password = false;
    }
});

// 새 비밀번호 확인 검사
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

// 비번 변경
const changePwBtn = document.getElementById("changePwBtn");

changePwBtn.addEventListener("click",e=>{
    if(!(chk.password&&chk.checkPassword)){
        e.preventDefault();
        return;
    } else {
        fetch("/edit/password",{
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify(password.value)
        })
        .then(resp => resp.text())
        .then(result => {
            if(result==0){ //실패하면
                alert("비밀번호 수정에 실패했습니다. 다시 시도해주세요.");
            } 
            if(result>0){
                alert("비밀번호가 수정되었습니다.");
                originPw.value="";
                newPwMent.style.display = "none";
                newPwPart.style.display = "none";
            }
        })
        .catch(e=>console.log(e));
        chk.originPw = false;
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
    }
    if(phoneRegex.test(phone.value)){
        phoneMessage.innerText = "국가를 다시 한번 확인해주세요.";
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

telBtn.addEventListener("click",()=>{
    if(!(chk.phone)){
        e.preventDefault();
        return;
    }
    const userTel = countryNo.value + " " + phone.value;
    console.log(userTel);
    const getUserTel = document.getElementById("getUserTel");

    fetch("/edit/phone",{
        method : 'post',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify({
            "userTel" : userTel,
            "countryCode": countryCode.value
        })
    })
    .then(resp=>resp.json())
    .then(loginUser=>{
        if(!loginUser){ // 실패
            alert("전화번호 수정에 실패했습니다. 다시 시도해주세요.");
        }
        if(loginUser){
            phone.value = "";
            phoneMessage.innerText = "";
            phoneMessage.classList.remove("error-message");
            phoneMessage.classList.remove("possible-message");
            alert("전화번호가 수정되었습니다.");
            getUserTel.innerText = loginUser.userTel;
        }
    })
    .catch(e=>{console.log(e)});
    chk.phone = false;
});

// 비상 연락처
const emergencyCo = document.querySelector("#emergencyCo");
const emergCoMessage = document.querySelector("#emergCoMessage");
const getEmergencyContact = document.querySelector("#getEmergencyContact");
const emgBtn = document.querySelector("#emgBtn");

emergencyCo.addEventListener("focus",()=>{
    emergCoMessage.innerText = "Twitter, Facebook, Instagram 등 SNS 주소도 가능합니다.";
    emergCoMessage.classList.add("normal-message");
});

emergencyCo.addEventListener("input",()=>{
    if(emergencyCo.value.trim().length==0){
        emergencyCo.value="";
    }
});

emgBtn.addEventListener("click",()=>{
    if(emergencyCo.value.trim().length==0){
        emergencyCo.value="";
        return;
    }
    fetch("/edit/emergencyContact",{
        method : 'post',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify(emergencyCo.value)
    })
    .then(resp=>resp.json())
    .then(loginUser=>{
        if(loginUser){ // 성공하면
            alert("비상 연락처가 등록되었습니다.");
            emergencyCo.value="";
            getEmergencyContact.innerText = loginUser.emergencyContact;
            emergCoMessage.innerText = "";
            emergCoMessage.classList.remove("normal-message");
        }
        if(!loginUser){
            alert("비상 연락처 등록에 실패했습니다. 다시 시도해주세요.");
            emergencyCo.focus();
            return;
        }
    })
    .catch(e=>{console.log(e)});
});

// 여권 번호
const passportNo = document.getElementById("passportNo");
const passportMessage = document.getElementById("passportMessage");
const passPortBtn = document.getElementById("passPortBtn");
const getPassport = document.getElementById("getPassport");

passportNo.addEventListener("input",()=>{
    if(passportNo.value.trim().length==0){
        passportNo.value="";
        passportMessage.innerText="";
        chk.passportNo = false;
        return;
    }else{
        chk.passportNo = true;
    }
});
passPortBtn.addEventListener("click",e=>{
    if(!chk.passportNo){
        e.preventDefault();
        return;
    }
    fetch("/edit/passport",{
        method : 'post',
        headers : {'Cotent-Type':'application/json'},
        body : JSON.stringify(passportNo.value)
    })
    .then(resp=>resp.json())
    .then(loginUser=>{
        if(loginUser){ // 성공하면
            alert("여권 번호가 수정되었습니다. 임시 여권인 경우 여권 재발급 후 정상 여권 번호를 다시 등록해주세요.");
            getPassport.innerText = loginUser.passportNo;
            passportNo.value = "";
            passportMessage.innerText="";
        }
        if(!loginUser){
            alert("여권 번호 수정에 실패했습니다. 다시 시도해주세요.");
            passportNo.focus();
        }
    })
    .catch(e=>console.log(e));
    chk.passportNo = false;
});

// 주 사용 언어
// 영어로 작성해주세요.
const primaryLanguage = document.getElementById("primaryLanguage");
const pLanguageMessage = document.getElementById("pLanguageMessage");
const langBtn = document.getElementById("langBtn");
const getLang = document.getElementById("getLang");

const engRegex = /^[A-Za-z]+$/; // 영어 검사

primaryLanguage.addEventListener("input",()=>{
    if(primaryLanguage.value.trim().length==0){
        primaryLanguage.value="";
        pLanguageMessage.innerText="";
        chk.primaryLanguage = false;
        return;
    }
    if(!engRegex.test(primaryLanguage.value)){
        pLanguageMessage.innerText = "영어로 1개만 작성해주세요.";
        pLanguageMessage.classList.add("error-message");
        pLanguageMessage.classList.remove("possible-message");
            chk.primaryLanguage = false;
    }else{
        pLanguageMessage.innerText="";
        chk.primaryLanguage = true;
    }    
});   

langBtn.addEventListener("click",e=>{
    if(!chk.primaryLanguage){
        e.preventDefault();
        return;
    }
    fetch("/edit/primaryLanguage",{
        method : 'post',
        headers : {'Cotent-Type':'application/json'},
        body : JSON.stringify(primaryLanguage.value)
    })
    .then(resp=>resp.json())
    .then(loginUser=>{
        if(loginUser){
            getLang.innerText = loginUser.primaryLanguage;
            primaryLanguage.value = "";
            pLanguageMessage.innerText="";
            pLanguageMessage.classList.remove("possible-message");
            pLanguageMessage.classList.remove("remove-message");
            alert("주 사용 언어가 수정되었습니다.");
        }
        if(!loginUser){
            alert("주 사용 언어 수정에 실패했습니다. 다시 시도해주세요.");
            primaryLanguage.focus();
        }
    })
    .catch(e=>console.log(e));
    chk.primaryLanguage;
});



