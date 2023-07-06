/* ---- 프로필 이미지 변경 ---- */
let profileImage; /* 프로필 이미지 들어가는 img 태그 */
let deleteImage; /* 기본 이미지 변경 */
let userProfileFile; /* 프로필 파일 input 태그 */
let profileEditIcon; /* 위임 받는 카메라 아이콘 */

document.addEventListener("DOMContentLoaded",()=>{

    /* 프로필 편집 버튼 위임 파일 -> 카메라 아이콘 */
    userProfileFile = document.querySelector("#userProfileFile");
    profileEditIcon = document.querySelector(".profile-edit-icon");
    if(profileEditIcon!=null){
        profileEditIcon.addEventListener('click', () => userProfileFile.click());
    }

    profileImage = document.querySelector(".img-content");
    deleteImage = document.querySelector(".profile-delete");

    let initCheck; // 초기 프로필 이미지 상태를 저장하는 변수
    // false == 기본 이미지, true == 이전 업로드 이미지

    let GuideCheck = false; // 초기 프로필 이미지 상태를 저장하는 변수

    // console.log(userType);

    if(userType == 'G' ){ // 가이드 인 경우 경고 메세지 출력용!!
        GuideCheck = true;
    }


    let deleteCheck = -1;
    // 프로필 이미지가 새로 업로드 되거나 삭제 되었음을 나타내는 변수
    // -1 == 초기값, 0 == 프로필 삭제(x버튼), 1 == 새 이미지 업로드

    let originalImage; // 초기 프로필 이미지 파일 경로 저장

    if(profileEditIcon != null){ // 화면에 imageInput이 있을 경우

        // 프로필 이미지가 출력되는 img태그의 src 속성을 저장
        originalImage = profileImage.getAttribute("src");

        // 회원 프로필 화면 진입 시
        // 현재 회원의 프로필 이미지 상태를 확인
        if(profileImage.getAttribute("src")=="/images/userProfile/basicUser.png"){
            // 기본 이미지인 경우
            initCheck = false;
        } else {
            initCheck = true;
        }

        // change 이벤트 : 값이 변했을 때
        // -input type = "file", "checkbox", "radio"에서 많이 사용
        // -text/number 형식 사용 가능
        // -> 이 때 input 값 입력 후 포커스를 잃었을 때 이전 값과 다르면  change 이벤트 발생
        userProfileFile.addEventListener("change",e=>{

        // 2MB로 최대 크기 제한
        const maxSize = 1*1024*1024*2; // 파일 최대 크키 지정
        // console.log(e.target); // input
        // console.log(e.target.value); // 업로드된 파일의 경로
        // console.log(e.target.files); // 업로드된 파일의 정보가 담긴 배열

        const file = e.target.files[0]; // 업로드한 파일의 정보가 담긴 객체

        // 파일을 한번 선택 후 취소 했을 때
        if(file == undefined){ 
            console.log("파일 선택이 취소됨");
            deleteCheck = -1; // 취소 == 파일 없음 == 초기 상태

            // 기존 프로필 이미지로 변경
            profileImage.setAttribute("src",originalImage);
            return;
        }

        if(file.size>maxSize){ // 선택된 파일의 크기가 최대 크기를 초과한 경우
            alert("2MB 이하의 이미지를 선택해주세요.");
            userProfileFile.value="";
            // input type="file" 태그에 대입할 수 있는 vaule는 "" 뿐이다.
            deleteCheck = -1; // 취소 == 파일 없음 == 초기 상태

            // 기존 프로필 이미지로 변경
            profileImage.setAttribute("src",originalImage);
            return;
        }

        // JS에서 파일을 읽는 객체
        // - 파일을 읽고 클라이언트 컴퓨터에 파일을 저장할 수 있음
        const reader = new FileReader();
        reader.readAsDataURL(file);
        // 매개변수에 작성된 파일을 읽어서 파일을 나타내는 URL을 result 속성으로 얻어올 수 있게 함.

        // 다 읽었을 때
        reader.onload = e => {
            // console.log(e.target);
            // console.log(e.target.result); // 읽은 파일의 URL

            const url = e.target.result;

            // 프로필 이미지(img) 태그에 src 속성으로 추가
            profileImage.setAttribute("src",url);

            deleteCheck=1;
        }

        });

        // x 버튼 클릭 시
        deleteImage.addEventListener("click",()=>{
            userProfileFile.value=""; // input type="file" value 삭제
            profileImage.setAttribute("src","/images/userProfile/basicUser.png");
            deleteCheck=0;
        });

        // #profileFrm이 제출 되었을 때
        document.querySelector(".profile-img-box").addEventListener("submit",e=>{
            // initCheck
            // 초기 프로필 이미지 상태를 저장하는 변수
            // false == 기본 이미지, true == 이전 업로드 이미지

            // deleteCheck
            // 프로필 이미지가 새로 업로드 되거나 삭제 되었음을 나타내는 변수
            // -1 == 초기값, 0 == 프로필 삭제(x버튼), 1 == 새 이미지 업로드
            let flag = true;

            // 프로필 이미지가 없다 -> 있다.
            if(!initCheck && deleteCheck==1) flag = false;

            // 이전 프로필 이미지가 있다 -> 삭제
            if(initCheck && deleteCheck==0) flag = false;

            // 이전 프로필 이미지가 있다 -> 새 이미지
            if(initCheck && deleteCheck == 1) flag = false;

            if(flag){ //
            e.preventDefault(); // form 기본 이벤트 제거
            alert("이미지 변경 후 클릭하세요.");
            }

            if(GuideCheck){ // 가이드만 경고 메세지 출력~~
                alert("가이드의 프로필이 얼굴이 잘 나온 사진이 아닐 경우 이용에 제재를 받을 수 있습니다.");
            }
        });


    }

})