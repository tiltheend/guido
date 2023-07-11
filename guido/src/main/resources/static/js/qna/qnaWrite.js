
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

    var maxFileCnt = 3;   // 첨부파일 최대 개수
    var attFileCnt = document.querySelectorAll('.filebox').length;    // 기존 추가된 첨부파일 개수
    var remainFileCnt = maxFileCnt - attFileCnt;    // 추가로 첨부가능한 개수
    var curFileCnt = obj.files.length;  // 현재 선택된 첨부파일 개수

    // 첨부파일 개수 확인
    if (curFileCnt > remainFileCnt) {
        alert("첨부파일은 최대 " + maxFileCnt + "개 까지 첨부 가능합니다.");
    }

    for (var i = 0; i < Math.min(curFileCnt, remainFileCnt); i++) {

        const file = obj.files[i];

        const fileSize = getByteSize(file.size);

        // 첨부파일 검증
        if (validation(file)) {
            // 파일 배열에 담기
            var reader = new FileReader();
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
    const fileTypes = ['application/pdf', 'image/gif', 'image/jpeg', 'image/png', 'image/bmp', 'image/tif', 'application/haansofthwp', 'application/x-hwp'];
    if (obj.name.length > 100) {
        alert("파일명이 100자 이상인 파일은 제외되었습니다.");
        return false;
    } else if (obj.size > (100 * 1024 * 1024)) {
        alert("최대 파일 용량인 100MB를 초과한 파일은 제외되었습니다.");
        return false;
    } else if (obj.name.lastIndexOf('.') == -1) {
        alert("확장자가 없는 파일은 제외되었습니다.");
        return false;
    } else if (!fileTypes.includes(obj.type)) {
        alert("첨부가 불가능한 파일은 제외되었습니다.");
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
            formData.append("attach_file", filesArr[i]);
        }
    }

    $.ajax({
        method: 'POST',
        url: '/register',
        dataType: 'json',
        data: formData,
        async: true,
        timeout: 30000,
        cache: false,
        headers: {'cache-control': 'no-cache', 'pragma': 'no-cache'},
        success: function () {
            alert("파일업로드 성공");
        },
        error: function (xhr, desc, err) {
            alert('에러가 발생 하였습니다.');
            return;
        }
    })
}

const getByteSize = (size) => {
    const byteUnits = ["KB", "MB", "GB", "TB"];
  
    for (let i = 0; i < byteUnits.length; i++) {
      size = Math.floor(size / 1024);
  
      if (size < 1024) return size.toFixed(1) + byteUnits[i];
    }
  };
  
  console.log(getByteSize(1024)); // 1KB
  console.log(getByteSize(1024 ** 2)); // 1MB
  console.log(getByteSize(1024 ** 3)); // 1GB
  console.log(getByteSize(1024 ** 4)); // 1TB