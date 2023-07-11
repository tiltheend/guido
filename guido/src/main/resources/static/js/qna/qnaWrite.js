
const qnaButton = document.getElementById("qnaButton");
const qnaEmail = document.querySelector("input[name='qnaEmail' ");
const qnaTitle = document.querySelector("input[name='qnaTitle' ");
const qnaContent = document.querySelector("textarea[name='qnaContent' ");


var fileNo = 0;
var filesArr = new Array();


// 드래그 앤 드롭 이벤트 핸들러 등록
const label = document.querySelector('.file--label');
label.addEventListener('dragenter', handleDragEnter, false);
label.addEventListener('dragover', handleDragOver, false);
label.addEventListener('drop', handleFileDrop, false);

// 드래그 진입 시 스타일 변경
function handleDragEnter(event) {
    event.stopPropagation();
    event.preventDefault();
    label.classList.add('dragover');
}

// 드래그 오버 시 스타일 변경
function handleDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
}

// 파일 드롭 시 처리
function handleFileDrop(event) {
    event.stopPropagation();
    event.preventDefault();
    label.classList.remove('dragover');

    const files = event.dataTransfer.files;
    // input 요소의 파일 값을 업데이트
    const inputElement = document.getElementById('file');
    inputElement.files = files;

    // addFile 함수를 호출하여 파일 추가 및 처리
    addFile(inputElement);
}


/* 첨부파일 추가 */
function addFile(obj){

    let maxFileCnt = 3;   // 첨부파일 최대 개수
    let attFileCnt = document.querySelectorAll('.filebox').length;    // 기존 추가된 첨부파일 개수
    let remainFileCnt = maxFileCnt - attFileCnt;    // 추가로 첨부가능한 개수
    let curFileCnt = obj.files.length;  // 현재 선택된 첨부파일 개수

    // 첨부파일 개수 확인
    if (curFileCnt > remainFileCnt) {
        alert("첨부파일은 최대 " + maxFileCnt + "개 까지 첨부 가능합니다.");
    }

    for (let i = 0; i < Math.min(curFileCnt, remainFileCnt); i++) {

        const file = obj.files[i];

        const fileSize = getByteSize(file.size);

        // 첨부파일 검증
        if (validation(file)) {
            // 파일 배열에 담기
            let reader = new FileReader();
            reader.onload = function () {
                filesArr.push(file);
            };
            reader.readAsDataURL(file)

            // 목록 추가
            const fileDiv = document.createElement("div");
            fileDiv.setAttribute("id", "file" + fileNo);
            fileDiv.classList.add("filebox");


            const firstDiv = document.createElement("div");
            firstDiv.classList.add("filebox-first-div");

            const cropDiv = document.createElement("div");
            cropDiv.classList.add("file--img__crop");

            const firstImg = document.createElement("img");
            // 사진 icon
            firstImg.setAttribute("src", "/images/qna/upload_img_icon.png");
            cropDiv.append(firstImg);

            firstDiv.append(cropDiv);

            const secondDiv = document.createElement("div");
            const fileNameDiv = document.createElement("div");
            const sizeDiv = document.createElement("div");

            secondDiv.classList.add("filebox-second-div");

            fileNameDiv.classList.add("name");
            fileNameDiv.innerText = file.name;

            sizeDiv.innerText = fileSize;

            secondDiv.append(fileNameDiv);
            secondDiv.append(sizeDiv);

            fileDiv.append(firstDiv);
            fileDiv.append(secondDiv);

            
            const aTag = document.createElement("a");
            aTag.classList.add("delete");
            aTag.setAttribute("onclick", "deleteFile(" + fileNo + ");");
            
            const deleteIcon = document.createElement("img");
            deleteIcon.setAttribute("src", "/images/qna/x_icon.png");
            deleteIcon.classList.add("delete--icon");

            aTag.appendChild(deleteIcon);
            fileDiv.append(aTag);
            
            document.querySelector('.file-list').append(fileDiv);


            fileNo++;
        } else {
            continue;
        }
    }
    // 초기화
    document.querySelector("input[type=file]").value = "";
}

/* 첨부파일 검증 */
function validation(obj){
    const fileTypes = ['image/gif', 'image/jpeg', 'image/png'];
    if (obj.name.length > 100) {
        alert("파일명은 100자 이하로 제한됩니다.");
        return false;
    } else if (obj.size > (10 * 1024 * 1024)) {
        alert("최대 파일 용량인 10MB를 초과하는 파일이 존재합니다.");
        return false;
    } else if (obj.name.lastIndexOf('.') == -1) {
        alert("확장자가 없는 파일이 존재합니다.");
        return false;
    } else if (!fileTypes.includes(obj.type)) {
        alert("첨부가 불가능한 파일 확장자입니다.");
        return false;
    } else {
        return true;
    }
}

/* 첨부파일 삭제 */
function deleteFile(num) {
    document.querySelector("#file" + num).remove();
    filesArr[num].is_delete = true;
}

/* 폼 전송 */
function submitForm() {
    // 폼데이터 담기
    var form = document.querySelector("form");
    var formData = new FormData(form);

    for (var i = 0; i < filesArr.length; i++) {
        // 삭제되지 않은 파일만 폼데이터에 담기
        if (!filesArr[i].is_delete) {
            formData.append("attach_files", filesArr[i]);
        }
    }

    formData.append("qnaEmail", qnaEmail.value);
    formData.append("qnaTitle", qnaTitle.value);
    formData.append("qnaContent", qnaContent.value);


    fetch('/qna/insertQna', {
        method: 'POST',
        body: formData,
        headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
            // 'Content-Type' : 'multipart/form-data'
        }
        })
        .then(function (response) {
            if (response.ok) {
            alert("문의가 접수되었습니다.");

            } else {
            throw new Error('에러가 발생 하였습니다.');
            }
        })
        .catch(function (error) {
            alert(error.message);
        });
}




/* 사진 크기 구하기 */
const getByteSize = (size) => {
    const byteUnits = ["KB", "MB", "GB", "TB"];
  
    for (let i = 0; i < byteUnits.length; i++) {
      size = Math.floor(size / 1024);
  
      if (size < 1024) return size.toFixed(1) + byteUnits[i];
    }
  };
  



  /* 제출 버튼이 클릭 됐을 때 */
qnaButton.addEventListener("click", (e)=>{

    if(qnaEmail.value==''){
        alert("이메일을 입력해주세요");
        qnaEmail.focus();
        e.preventDefault();
        return;
    }
    
    
    if(checkId(qnaEmail)){
        alert("이메일 형식이 올바르지 않습니다");
        qnaEmail.focus();
        e.preventDefault();
        return;
    }

    if(qnaTitle.value==''){
        alert("문의 제목을 입력해주세요");
        e.preventDefault();
        qnaTitle.focus();
        return;
    }

    if(qnaContent.value==''){
        alert("문의 내용을 입력해주세요");
        e.preventDefault();
        qnaContent.focus();
        return;
    }

    if(qnaContent.value.length>1000){
        alert("작성 가능한 글자수를 초과합니다.");    
        qnaContent.focus();
        e.preventDefault();
        return;
    }

    if(qnaTitle.value.length>200){
        alert("작성 가능한 글자수를 초과합니다.");  
        qnaTitle.focus();
        e.preventDefault();
        return;
    }


    submitForm();

})


/* 이메일 유효성 검사 */
function checkId(qnaEmail){
    const exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

        if(exptext.test(qnaEmail)==false){
            //이메일 형식이 알파벳+숫자@알파벳+숫자.알파벳+숫자 형식이 아닐경우			
            return false;
        }

        return true;
    
}



/* 글자수 제한 */

function checkLength(maxLength) {
    
    if(maxLength==30){
        
        let qnaTitleLength = document.getElementById('qnaTitleLength');
        let currentLength = qnaTitle.value.length;

        qnaTitleLength.innerText = currentLength;
    
        if (currentLength > maxLength) {
            qnaTitleLength.style.color = 'red';
        } else {
            qnaTitleLength.style.color = '';
        }
        
        return;
    }
    
    if(maxLength==1000){
        let qnaContentLength = document.getElementById('qnaContentLength');
        let currentLength = qnaContent.value.length;
        
        qnaContentLength.innerText = currentLength;
    
        if (currentLength > maxLength) {
            qnaContentLength.style.color = 'red';
        } else {
            qnaContentLength.style.color = '';
        }
        
        return;

    }



}

