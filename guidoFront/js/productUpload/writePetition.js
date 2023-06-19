let currentPage = 0; // 현재 페이지 0으로 설정
const prevBtn = document.getElementById('prevBtn'); // 이전 버튼
const nextBtn = document.getElementById('nextBtn'); // 다음 버튼
const sbmtBtn = document.getElementById('submitBtn'); // 제출 버튼
const pages = document.getElementsByClassName('page'); // 페이지 배열
const progressBar = document.querySelector('.wp-progress'); // 프로그레스 바
const btnContainer = document.getElementById('btnContainer');

const updatePage = () => {
  progressBar.style.width = ((currentPage + 1) / pages.length) * 100 + '%';
  for (let i = 0; i < pages.length; i++)
    if (i == currentPage) pages[i].classList.add('current');
    else pages[i].classList.remove('current');
  if (currentPage == 0) prevBtn.style.display = 'none';
  else prevBtn.style.display = 'block';
  if (currentPage == pages.length - 1) {
    nextBtn.style.display = 'none';
    sbmtBtn.style.display = 'block';
    btnContainer.style.width = '960px';
    btnContainer.classList.add('sticky');
  } else {
    nextBtn.style.display = 'block';
    sbmtBtn.style.display = 'none';
    btnContainer.style.width = '600px';
  }

  if (currentPage == 1) {
    categorySelectCheck();
  } else if (currentPage == 2) {
    titleCharCheck();
    inputTitle.focus();
  } else if (currentPage == 3) {
    checkContentsLength(content);
  } else if (currentPage == 5) {
    previewPageUpdate();
  } else {
    nextBtn.disabled = false;
  }
};
// 이전 버튼 클릭 시 currentPage 감소 후 페이지 업데이트
prevBtn.addEventListener('click', () => {
  if (currentPage > 0) currentPage--;
  updatePage();
});
// 다음 버튼 클릭 시 currentPage 증가 후 페이지 업데이트
nextBtn.addEventListener('click', () => {
  if (currentPage < pages.length) currentPage++;
  updatePage();
});

updatePage();

/*********************************** page1 ********************************/
const scopeItems = document.querySelectorAll('.scope-item'); // 범위 목록
const page1Tip = document.querySelector('#page1Tip'); // 페이지1 팁

scopeItems.forEach((item) => {
  item.addEventListener('click', (e) => {
    scopeItems.forEach((item) => {
      item.classList.remove('selected-item');
    });
    item.classList.add('selected-item');
    if (e.target == scopeItems[0]) page1Tip.style.display = 'flex';
    else page1Tip.style.display = 'none';
  });
});
/**************************************************************************/

/*********************************** page2 ********************************/

/* 직접 입력 checked인 경우 directInputContainer 보이기 */
const directInputContainer = document.getElementById('directInputContainer');
const directInputCheckBox = document.getElementById('directInputCheckbox');
directInputCheckBox.addEventListener('change', () => {
  if (directInputCheckBox.checked) {
    directInputContainer.classList.remove('hidden');
  } else {
    directInputContainer.classList.add('hidden');
  }
});
/* 선택 또는 직접 입력한 카테고리가 1개 이상, 5개 이하 일때만 다음 버튼 활성화 */
// 함수 정의
const categoryItems = document.querySelectorAll('[name="categoryItems"]');
const categorySelectCheck = () => {
  let count = 0;
  // 기본 카테고리 확인
  categoryItems.forEach((categoryItem) => {
    if (categoryItem.checked) {
      count++;
    }
  });
  // 직접 입력 선택된 경우
  if (directInputCheckBox.checked) {
    const directItems = document.querySelectorAll(
      '[name="directInputCategory"]'
    );
    directItems.forEach((directItem) => {
      count++;
    });
  }
  if (count < 1 || count > 5) {
    nextBtn.disabled = true;
  } else {
    nextBtn.disabled = false;
  }
};
// 카테고리 아이템에 셀렉트체크 추가
categoryItems.forEach((categoryItem) => {
  categoryItem.addEventListener('change', () => {
    categorySelectCheck();
  });
});
// 직접 입력에 셀렉트체크 추가
directInputCheckBox.addEventListener('change', () => {
  categorySelectCheck();
});

// 직접 입력하는 창 또는 버튼에 이벤트 리스너 추가
const categoryInput = document.getElementById('categoryInput');
const directInputItemContainer = document.getElementById(
  'directInputItemContainer'
);
const categoryInputEvent = () => {
  if (isCategoryAlreadyAdded(categoryInput.value)) {
    alert('이미 선택된 주제입니다.');
    return;
  }

  if (categoryInput.value.trim().length > 0) {
    const item = document.createElement('label');
    item.classList.add('direct-input-item', 'category-item');
    item.addEventListener('click', (e) => {
      e.target.remove();
      categorySelectCheck();
    });
    item.innerHTML = `
      <input type="hidden" name="directInputCategory" value="${categoryInput.value}">
      ${categoryInput.value}
      <span class="pointer-events-none">X</span>
    `;
    directInputItemContainer.append(item);
    categorySelectCheck();
    categoryInput.value = '';
  }
};
const categoryInputBtn = document.getElementById('categoryInputBtn');
categoryInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    categoryInputEvent();
  }
});
categoryInputBtn.addEventListener('click', categoryInputEvent);
const isCategoryAlreadyAdded = (value) => {
  const existingItems =
    directInputItemContainer.querySelectorAll('.direct-input-item');
  for (let i = 0; i < existingItems.length; i++) {
    const itemValue = existingItems[i].querySelector(
      'input[name="directInputCategory"]'
    ).value;
    if (itemValue === value) {
      return true;
    }
  }
  return false;
};

/**************************************************************************/

/*********************************** page3 ********************************/
const inputTitle = document.getElementById('inputTitle'); // 제목 input
const titleCountContainer = document.getElementById('titleCountContainer'); // 제목 글자 수 카운트컨테이너
const titleCharCount = document.getElementById('titleCharCount'); // 제목 글자 수 표시 div
// 타이틀 입력에 따른 다음 버튼 활성화/비활성화
const titleCharCheck = () => {
  const remainingChars = inputTitle.value.length;
  titleCharCount.textContent = String(remainingChars);
  if (remainingChars > 90) {
    titleCountContainer.classList.add('red');
    nextBtn.disabled = true;
  } else if (remainingChars == 0) {
    nextBtn.disabled = true;
  } else {
    titleCountContainer.classList.remove('red');
    nextBtn.disabled = false;
  }
};
inputTitle.addEventListener('input', titleCharCheck);
/**************************************************************************/

/*********************************** page4 ********************************/
let content = '';
$(document).ready(() => {
  //에디터 설정
  $('#summernote').summernote({
    height: 500, // 에디터 높이
    minHeight: null, // 최소 높이
    maxHeight: null, // 최대 높이
    focus: true, // 에디터 로딩후 포커스를 맞출지 여부
    lang: 'ko-KR', // 한글 설정
    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'underline', 'clear']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['table', ['table']],
      ['insert', ['link', 'picture']],
    ],
    callbacks: {
      onChange: function (contents, $editable) {
        //텍스트 글자수
        content = contents;
        checkContentsLength();
      },
      onImageUpload: function (files) {
        for (let i = 0; i < files.length; i++)
          uploadSummernoteImageFile(files[i], this);
      },
      onPaste: function (e) {
        var clipboardData = e.originalEvent.clipboardData;
        if (
          clipboardData &&
          clipboardData.items &&
          clipboardData.items.length
        ) {
          var item = clipboardData.items[0];
          if (item.kind === 'file' && item.type.indexOf('image/') !== -1) {
            e.preventDefault();
          }
        }
      },
    },
  });
});
// 내용이 있는 지 체크
const checkContentsLength = () => {
  let str = f_SkipTags_html(content).trim();
  if (str == '') nextBtn.disabled = true;
  else nextBtn.disabled = false;
};

// ajax로 이미지 업로드
const uploadSummernoteImageFile = (file, editor) => {
  data = new FormData();
  data.append('file', file);
  $.ajax({
    data: data,
    type: 'POST',
    url: '/uploadSummernoteImageFile',
    contentType: false,
    processData: false,
    success: (data) => {
      $(editor).summernote('insertImage', data.url);
    },
  });
};

//에디터 내용 텍스트 제거
const f_SkipTags_html = (input, allowed) => {
  // 허용할 태그는 다음과 같이 소문자로 넘겨받습니다. (<a><b><c>)
  allowed = (
    ((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []
  ).join('');
  var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
    commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
  return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
    return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
  });
};
/**************************************************************************/

/*********************************** page4 ********************************/

const noImgContainers = document.querySelectorAll('.no-img-container');
const imgContainers = document.querySelectorAll('.img-container');
const deleteImages = document.querySelectorAll('.delete-image');
const previewImages = document.querySelectorAll('.preview-image');
const inputImage = document.getElementById('inputImage');
const imgContainerHiddenToggle = () => {
  noImgContainers.forEach((noImgContainer) => {
    noImgContainer.classList.toggle('hidden');
  });
  imgContainers.forEach((imgContainer) => {
    imgContainer.classList.toggle('hidden');
  });
};
deleteImages.forEach((deleteImage) => {
  deleteImage.addEventListener('click', () => {
    inputImage.value = '';
    imgContainerHiddenToggle();
  });
});
inputImage.addEventListener('change', (e) => {
  const file = e.target.files[0]; // 선택된 파일의 데이터
  if (file != undefined) {
    // 파일이 선택되었을 때
    const reader = new FileReader(); // 파일을 읽는 객체
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      // 파일을 다 읽은 후 수행
      previewImages[0].setAttribute('src', e.target.result);
      previewImages[1].setAttribute('src', e.target.result);
    };
  } else {
    // 파일 선택 후 취소 되었을 때
    previewImages[0].removeAttribute('src');
    previewImages[1].removeAttribute('src');
  }
  imgContainerHiddenToggle();
});

/**************************************************************************/

const previewTitle = document.getElementById('previewTitle');
const previewContent = document.getElementById('previewContent');
const summernote = $('#summernote');
const submitContent = document.getElementById('summernote');

const previewPageUpdate = () => {
  previewTitle.innerText = inputTitle.value;
  submitContent.value = summernote.summernote('code');
  previewContent.innerHTML = submitContent.value;
};
