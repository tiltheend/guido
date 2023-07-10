const $text = document.querySelector('.text');
const $text2 = document.querySelector('.text2');
const $text3 = document.querySelector('.text3');
const $text4 = document.querySelector('.text4');
const $text5 = document.querySelector('.text5');
const $text6 = document.querySelector('.text6');
const $text7 = document.querySelector('.text7');
const $text8 = document.querySelector('.text8');
const $text9 = document.querySelector('.text9');
const $text10 = document.querySelector('.text10');
const $text11 = document.querySelector('.text11');
const loginName = document.querySelector('#loginName').innerText;
// const loginUserName = /*[[${session.loginUser.userName}]]*/ [];

console.log(loginName);
// const $text5 = document.querySelector('.text5');
// 글자 모음
const letters = [loginName + ' 가이드님, 환영합니다'];
const letters2 = ['이제 가이드 하실 지역을 선택해주세요!'];
const letters3 = ['여행 테마를 선택해주세요!'];
const letters4 = ['이제 요금을 설정하세요.'];
const letters5 = ['여행 기본 정보를 입력해주세요.'];
const letters6 = ['여행 코스는 어디인가요?'];
const letters7 = [loginName + '가이드님 여행만의 매력을 돋보이게 하세요!'];
const letters8 = ['이제 ' + loginName + ' 가이드님 여행의 이름을 지어주세요.'];
const letters9 = ['여행 일정과 여행 상품에 대한 설명을 작성해주세요.'];
const letters10 = ['판매하실 여행 상품의 '];
const letters11 = ['여행 일정과 여행 상품에 대한 설명을 작성해주세요.'];
// const letters5 = ['여행 코스는 어디인가요?'];
// 글자 입력 속도
const speed = 50;
let i = 0;

// 타이핑 효과
const typing = async () => {
  const letter = letters[i].split('');

  while (letter.length) {
    await wait(speed);
    $text.innerHTML += letter.shift();
  }

  // 잠시 대기
  await wait(1000);

  // 지우는 효과
};

const typing2 = async () => {
  const letter2 = letters2[i].split('');

  while (letter2.length) {
    await wait(speed);
    $text2.innerHTML += letter2.shift();
  }

  // 잠시 대기
  await wait(800);

  // 지우는 효과
};
const typing3 = async () => {
  const letter3 = letters3[i].split('');

  while (letter3.length) {
    await wait(speed);
    $text3.innerHTML += letter3.shift();
  }

  await wait(1000);
};
const typing4 = async () => {
  const letter4 = letters4[i].split('');

  while (letter4.length) {
    await wait(speed);
    $text4.innerHTML += letter4.shift();
  }

  await wait(1000);
};
const typing5 = async () => {
  const letter5 = letters5[i].split('');

  while (letter5.length) {
    await wait(speed);
    $text5.innerHTML += letter5.shift();
  }

  await wait(1000);
};
const typing6 = async () => {
  const letter6 = letters6[i].split('');

  while (letter6.length) {
    await wait(speed);
    $text6.innerHTML += letter6.shift();
  }

  await wait(1000);
};
const typing7 = async () => {
  const letter7 = letters7[i].split('');

  while (letter7.length) {
    await wait(speed);
    $text7.innerHTML += letter7.shift();
  }

  await wait(1000);
};
const typing8 = async () => {
  const letter8 = letters8[i].split('');

  while (letter8.length) {
    await wait(speed);
    $text8.innerHTML += letter8.shift();
  }

  await wait(1000);
};
const typing9 = async () => {
  const letter9 = letters9[i].split('');

  while (letter9.length) {
    await wait(speed);
    $text9.innerHTML += letter9.shift();
  }

  await wait(1000);
};

// 딜레이 기능 ( 마이크로초 )
function wait(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

// 초기 실행
setTimeout(typing, 1000);
setTimeout(typing2, 1000);
setTimeout(typing3, 1000);
setTimeout(typing4, 1000);
setTimeout(typing5, 1000);
setTimeout(typing6, 1000);
setTimeout(typing7, 1000);
setTimeout(typing8, 1000);
setTimeout(typing9, 1000);
// setTimeout(typing5, 1000);
