let currentPage = 0; // 현재 페이지 0으로 설정
const prevBtn = document.querySelector('.back-btn'); // 이전 버튼
const nextBtn = document.querySelector('.next-btn'); // 다음 버튼
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
  } else {
    nextBtn.style.display = 'block';
  }

  // if (currentPage == 1) {
  //   categorySelectCheck();
  // } else if (currentPage == 2) {
  //   titleCharCheck();
  //   inputTitle.focus();
  // } else if (currentPage == 3) {
  //   checkContentsLength(content);
  // } else if (currentPage == 5) {
  //   previewPageUpdate();
  // } else {
  //   nextBtn.disabled = false;
  // }
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

var selectedElement = null;

function changeBackgroundColor(element) {
  if (selectedElement) {
    selectedElement.style.backgroundColor = '';
    selectedElement.style.borderColor = '';
  }

  if (selectedElement === element) {
    selectedElement = null; // 같은 요소를 다시 클릭하면 선택 취소
  } else {
    selectedElement = element;
    element.style.backgroundColor = 'rgb(185, 215, 218)';
    element.style.borderColor = 'rgb(59, 119, 124)';
  }
}
