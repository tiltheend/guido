const secessionForm = document.getElementById("secessionForm");
secessionForm.addEventListener("submit",e=>{
    // 탈퇴 동의
    const agree = document.getElementById("secessionAgree");
    if(!agree.checked){
        alert("탈퇴를 원하실 경우 탈퇴 약관에 동의해주세요");
        e.preventDefault();
    }
    
    // 탈퇴 사유
    const reasons = document.querySelectorAll('[name="secessionReason"]')
    let chk = false;
    for(var i=0; i<reasons.length; i++){
        if(reasons[i].checked == true){
            chk = true;
        }
    }
    if(chk==false){
        alert("탈퇴 사유를 선택해주세요.");
        e.preventDefault();
    }
});

// 탈퇴 사유 직접 입력

