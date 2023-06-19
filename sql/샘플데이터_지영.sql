-- 지영
-- 회원 (공통)
-- 관리
INSERT INTO "USER"
VALUES(SEQ_USER_NO.NEXTVAL, 'manager00@gmail.com', 'pass00', '최한결', '01000000000', '/images/profile', SYSDATE, 'M', 'N');
--공통_가이드
INSERT INTO "USER"
VALUES(SEQ_USER_NO.NEXTVAL, 'guide01@gmail.com', 'pass01', '김삼순', '01011111111', '/images/profile', SYSDATE, 'G', 'N');
INSERT INTO "USER"
VALUES(SEQ_USER_NO.NEXTVAL, 'guide02@gmail.com', 'pass02', '김이순', '01022222222', '/images/profile', SYSDATE, 'G', 'N');
-- 공통_여행객
INSERT INTO "USER"
VALUES(SEQ_USER_NO.NEXTVAL, 'tourist03@gmail.com', 'pass03', '이삼순', '01033334444', '/images/profile', SYSDATE, 'T', 'N');
INSERT INTO "USER"
VALUES(SEQ_USER_NO.NEXTVAL, 'tourist04@gmail.com', 'pass04', '박사순', '01044443333', '/images/profile', SYSDATE, 'T', 'N');
COMMIT;

-- 여행객 아이디  
INSERT INTO TOURIST
VALUES(4, '12345678910', 'English', '01011112222', '/images/face');
INSERT INTO TOURIST
VALUES(5, '10987654321', 'Spanish', '01022203330', 'images/face');
-- 가이드 아이디
INSERT INTO GUIDE
VALUES(6, 'English', '대전', 'A99988877763', 'N');
INSERT INTO GUIDE
VALUES(3, 'French', '서울', 'A88337744495', 'Y');

-- PR
INSERT INTO PR
(USER_NO, BIRTH_YEAR, JOB, PETS, HOBBY, SUB_LANG, ABROAD_EXPERIENCE, MBTI, STRENGTH, FAVORITE_SONG, TMI, MAJOR, DOPAMINE, USELESS_TALENT, CAP_LIST)
VALUES(6, 1998, 'college student', NULL, 'watching Netflix', 'I can also speak French and Chinese', NULL, 'INFJ',
NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO PR
VALUES(3, 1988, 'guide', 'cat name is Mimyo', NULL, 'English', 'I lived in France for 3 years', NULL,
'I am confident in making you smile all day', 'BTS-Fire', NULL, NULL, NULL, NULL, NULL);

-- 지역 코드
INSERT INTO REGION VALUES(SEQ_REGION_CODE.NEXTVAL, '서울');
INSERT INTO REGION VALUES(SEQ_REGION_CODE.NEXTVAL, '인천');
INSERT INTO REGION VALUES(SEQ_REGION_CODE.NEXTVAL, '대전');
INSERT INTO REGION VALUES(SEQ_REGION_CODE.NEXTVAL, '대구');
INSERT INTO REGION VALUES(SEQ_REGION_CODE.NEXTVAL, '울산');
INSERT INTO REGION VALUES(SEQ_REGION_CODE.NEXTVAL, '광주');
INSERT INTO REGION VALUES(SEQ_REGION_CODE.NEXTVAL, '부산');
INSERT INTO REGION VALUES(SEQ_REGION_CODE.NEXTVAL, '제주');
INSERT INTO REGION VALUES(SEQ_REGION_CODE.NEXTVAL, '울릉도');
INSERT INTO REGION VALUES(SEQ_REGION_CODE.NEXTVAL, '독도');
INSERT INTO REGION VALUES(SEQ_REGION_CODE.NEXTVAL, '전주');
INSERT INTO REGION VALUES(SEQ_REGION_CODE.NEXTVAL, '경주');
INSERT INTO REGION VALUES(SEQ_REGION_CODE.NEXTVAL, '담양');
INSERT INTO REGION VALUES(SEQ_REGION_CODE.NEXTVAL, '평창');

COMMIT;

-- PRODUCT 4개
--서울 야시장
INSERT INTO PRODUCT
VALUES(SEQ_PRODUCT_NO.NEXTVAL, '밤에 즐기는 광장시장 먹거리 투어', 1, '유명한 야시장을 둘러보고 풍부한 역사에 대해 배우며 문화적 발견의 여정을 떠나보세요. 그 후, 제가 개인적으로 가장 좋아하는 장소로 안내해 드리겠습니다. 이곳에서 정통 한국 요리와 음료를 맛보실 수 있습니다.',
100000, NULL, 1, 4, 6, 1, 4, 'N', SYSDATE, 'English', default);
--제주 스냅
INSERT INTO PRODUCT
VALUES(SEQ_PRODUCT_NO.NEXTVAL, '제주도 푸른밤 달과 함께 하는 야경 스냅 Jeju Night Snap', 1, 
'바람이 부는날엔 숲속으로,
별이 쏟아지는 날엔 들판으로,
달빛이 부신 날엔 오름으로..
멋진 음악이 함께 한다면 꿈만 같은 제주도의 푸른밤을 만끽 할 수 있을거에요.',
40000, 5000, 2, 4, 6, 8, 1, 'N', SYSDATE, 'English', default);
--서울 메이크업
INSERT INTO PRODUCT
VALUES(SEQ_PRODUCT_NO.NEXTVAL, '개인 스튜디오에서 K-뷰티 메이크업 클래스 Time to Glow up', 1, '전 세계 사람들은 한국 여성이 특히 아름다움에 관심이 있다는 것을 잘 알고 있습니다. 맞나요??
K-뷰티 스타일로 한국 메이크업 아티스트와 함께 피부를 멋지고 젊게 만드는 법을 배워보세요.',
120000, NULL, 1, 2, 3, 1, 1, 'N', SYSDATE, 'Japanese', default);
--부산 서핑
INSERT INTO PRODUCT
VALUES(SEQ_PRODUCT_NO.NEXTVAL, '서핑의 도시 부산 송정에서 서핑 체험', 1, '예약한 강습 시간까지 송정해변에 위치한 서프로드 서핑샵에 모입니다.
물에 들어가기전 에 서핑에 대한 안전수칙과 영상교육을 받고, 환복 후 전문 코치와 함께 바다에 나가 직접 파도를 타며 서핑을 즐깁니다.',
65000, NULL, 1, 8, 3, 7, 10, 'N', SYSDATE, 'English&Korean', default);

-- 관심 지역 (구매자)
INSERT INTO FAVORITE_REGION
VALUES(SEQ_FAVORITE_REGION_NO.NEXTVAL, 1, 4);
INSERT INTO FAVORITE_REGION
VALUES(SEQ_FAVORITE_REGION_NO.NEXTVAL, 2, 5);
-- 관심 상품 (구매자)
INSERT INTO WISHLIST
VALUES(SEQ_WISHLIST_NO.NEXTVAL, 4, 3, SYSDATE);
INSERT INTO WISHLIST
VALUES(SEQ_WISHLIST_NO.NEXTVAL, 5, 2, SYSDATE);

-- 예약
INSERT INTO RESERVATION
VALUES(SEQ_RESERVATION_NO.NEXTVAL, 2, 4, SYSDATE, 'Y', 'C', 2, 3);
INSERT INTO RESERVATION
VALUES(SEQ_RESERVATION_NO.NEXTVAL, 4, 5, SYSDATE, 'Y', 'P', 3, 2);

COMMIT;

-- 리뷰
INSERT INTO REVIEW
VALUES(SEQ_REVIEW_NO.NEXTVAL, 4, 'Korean market food is insanely delicious. It''s not expensive at all and I''m satisfied completely!!!
', 4.5, 'N'	, 2, SYSDATE);
INSERT INTO REVIEW
VALUES(SEQ_REVIEW_NO.NEXTVAL, 5, 'It was suddenly raining, and when I told my guide ''I want to proceed with the filming'', I was very surprised that they changed the course accordingly.
I have now changed all of my profiles to pictures from that day.', 5, 'N', 4, SYSDATE);

-- 여행 코스
INSERT INTO TOUR_COURSE
VALUES(SEQ_TOURCOURSE_NO.NEXTVAL, 2, '광장시장', 1, '37.5700398', '126.9996036', 'Y');
INSERT INTO TOUR_COURSE
VALUES(SEQ_TOURCOURSE_NO.NEXTVAL, 4, '1100 고지', 4, '33.3576194', '126.4630564', 'Y');
INSERT INTO TOUR_COURSE
VALUES(SEQ_TOURCOURSE_NO.NEXTVAL, 4, '천지연 폭포', 3, '33.246944', '126.554417', 'N');
INSERT INTO TOUR_COURSE
VALUES(SEQ_TOURCOURSE_NO.NEXTVAL, 4, '새연교', 2, '33.2372277', '126.5598598', 'N');
INSERT INTO TOUR_COURSE
VALUES(SEQ_TOURCOURSE_NO.NEXTVAL, 4, '제지기오름', 1, '33.241926', '126.60974', 'N');	

-- 파일
INSERT INTO "FILE"
VALUES(SEQ_FILE_NO.NEXTVAL, 2, 1, '/images/file');
INSERT INTO "FILE"
VALUES(SEQ_FILE_NO.NEXTVAL, 2, 2, '/images/file');

-- 상품 일정(옵션) (판매자)
INSERT INTO PRODUCT_DT
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 2, '2023/06/30');
INSERT INTO PRODUCT_DT
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 2, '2023/07/15');
INSERT INTO PRODUCT_DT
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 2, '2023/07/30');

COMMIT;
