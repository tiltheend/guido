# Guido
가이드의 개별적인 능력과 특성에 주안점을 두는 여행 패키지 구매 서비스

🔗 http://guido.world/


![메인화면](https://github.com/tiltheend/guido/assets/101131054/5f2ae6ce-34ad-4321-a0fd-7a3cda38a2eb)
<br></br>
<br></br>

# 💡 프로젝트 소개
인바운드 여행(외국+내국인의 국내 관광) 진흥을 위해 여행객과 가이드를 매칭시켜 개성 있고 다양한 국내 여행 경험을 제공합니다.                                                                                
기존의 여행사 패키지 상품과는 달리 개인의 취향과 여행 스타일에 맞는 가이드의 맞춤형 여행 경험을 제공하여 만족도를 높이고 한국 관광의 브랜드 가치 상승에 기여하는 목적을 가집니다.
이로써 가이드들은 자신의 특성과 경쟁력을 살려 여행객을 모객할 수 있고 여행객들은 다양한 선택지 내에서 품질이 향상된 여행 가이드 서비스를 즐길 수 있습니다.
<br></br>
<br></br>

# 📅 개발 기간
- 2023.06.01 ~ 2023.07.13
<br></br>
<br></br>

# ⚙ 개발 환경
<div align="center">
  <img src="https://img.shields.io/badge/Java 17-2C2255?style=for-the-badge&logo=Eclipse IDE&logoColor=white"/>
  <img src="https://img.shields.io/badge/Sring Boot 3.1.0-6DB33F?style=for-the-badge&logo=SpringBoot&logoColor=white"/>
  <img src="https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=Oracle&logoColor=white"/>
  <img src="https://img.shields.io/badge/Gradle-02303A?style=for-the-badge&logo=Gradle&logoColor=white"/>
  <img src="https://img.shields.io/badge/Thymeleaf-005F0F?style=for-the-badge&logo=Thymeleaf&logoColor=white"/>
  <br>

  <img src="https://img.shields.io/badge/MyBatis-DB7093?style=for-the-badge&logo=MyBatis&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"/>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"/>
</div>

<br></br>
<br></br>

# 🛠 설계 기능

**HOME**
- 테마 카테고리별 상품 조회
- 관심상품 등록 기준으로 인기 여행지 상품 조회
- 슈퍼가이드 등록 상품 조회
- 관심지역 기반으로 추천 상품 조회
- 헤더 검색을 통해 조건에 맞는 상품 조회
- 관심상품 등록, 리뷰 등록, 예약 완료 시 알림
- 메인 페이지 관심상품 등록
<br></br>

**LOGIN / SIGNUP**
- 유저 타입(판매자/구매자)별 회원 가입 (유효성 검사)
- 구글 로그인
- 일반 로그인
- 임시 비밀번호 발급 (이메일 전송)
- 쿠키 생성으로 아이디 기억하기 (30일 유지)
- 로그아웃
- 회원 탈퇴
<br></br>

**USER**
1) 구매자
- 마이페이지 (다른 유저가 보는 프로필) : 프로필 변경, 구매목록 조회, 리뷰 작성 수정 삭제
- 구매자 결제 내역 리스트 조회
- 구매자 위시리스트 조회, 좋아요
- 구매자 정보 수정 (유효성 검사)

2) 판매자
- 마이페이지 (다른 유저가 보는 프로필) : 프로필 변경, 자기 소개 등록, 수정, 리뷰 답글 달기, 판매 상품 조회
- 판매자 예약 일정 확인 페이지  : 구매자들 일정 캘린더에 표시
- 판매자 상품에 대한 예약 정보 리스트 조회
- 판매자 정보 수정 (유효성 검사)
<br></br>

**MANAGER**
- 이벤트 작성
- 이벤트 관리
- 메인 배너 설정
- 회원 관리 - 상태별 조회, 블락 탈퇴 해제 등 처리
- 가이드 가입 승인 처리
- 가이드 상품 관리 - 조회 및 블라인드 처리
- 슈퍼 가이드 승급 및 강등 처리
- 정산 관리 내역 확인
- 1:1 문의 조회, 답변 처리 및 이메일 전송
<br></br>

**PRODUCT**
- 상품 등록
- 관심 상품 등록/삭제
- 상품 삭제 및 수정
- 상품 상세 정보 확인
- 투어 일정 확인
- 상품 리뷰 확인
- 예약 날짜/시간/게스트 수 설정
- 예약 및 결제 진행
- 관심 상품 등록/삭제
- 사용자의 주사용언어를 기반으로 상품 추천
- 등록된 관심 수를 기반으로 인기 상품 추천
<br></br>

**CHATTING**
- 예약 완료되면 예약 정보 전송
- 가이드와 여행객 간의 채팅 (이미지 전송)
<br></br>
