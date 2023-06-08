DELETE FROM "USER"
WHERE USER_NO=8;

SELECT * FROM THEME;



-- (이름) 샘플 데이터 2개씩 넣어주세요!! 주석 처리 된 거는 나중에 넣어도 됨!! 

----------------------------------------------------------------------------------

-- 회원 (구매자 판매자 공통)
-- 만든 유저 번호로 생성하기 가이드 2명 / 판매자 2명
SELECT USER_NO, USER_EMAIL, USER_PASSWORD, USER_NAME, USER_TEL, PROFILE_IMG, CREATE_DT, USER_TYPE, USER_STATE
FROM "USER";

INSERT INTO "USER"
(USER_NO, USER_EMAIL, USER_PASSWORD, USER_NAME, USER_TEL, PROFILE_IMG, CREATE_DT, USER_TYPE, USER_STATE)
VALUES(SEQ_USER_NO.NEXTVAL, 'guide07@gmail.com', 'pass07', '칠번가이드', '01012341234', '/images/profile', SYSDATE	, 'G', 'Y');

INSERT INTO "USER"
(USER_NO, USER_EMAIL, USER_PASSWORD, USER_NAME, USER_TEL, PROFILE_IMG, CREATE_DT, USER_TYPE, USER_STATE)
VALUES(SEQ_USER_NO.NEXTVAL, 'guide08@gmail.com', 'pass08', '팔번가이드', '01043214321', '/images/profile', SYSDATE	, 'G', 'N');

INSERT INTO "USER"
(USER_NO, USER_EMAIL, USER_PASSWORD, USER_NAME, USER_TEL, PROFILE_IMG, CREATE_DT, USER_TYPE, USER_STATE)
VALUES(SEQ_USER_NO.NEXTVAL, 'tourist07@gmail.com', 'pass07', '칠번여행객', '01012121212', '/images/profile', SYSDATE	, 'T', 'N');

INSERT INTO "USER"
(USER_NO, USER_EMAIL, USER_PASSWORD, USER_NAME, USER_TEL, PROFILE_IMG, CREATE_DT, USER_TYPE, USER_STATE)
VALUES(SEQ_USER_NO.NEXTVAL, 'tourist08@gmail.com', 'pass08', '팔번여행객', '01045454545', '/images/profile', SYSDATE	, 'T', 'N');

COMMIT;


-- 회원(여행객) 아이디 : tourist01 통일해주기~~
SELECT USER_NO, PASSPORT_NO, PRIMARY_LANGUAGE, EMERGENCY_CONTACT, FACE_IMG
FROM TOURIST;

INSERT INTO TOURIST
(USER_NO, PASSPORT_NO, PRIMARY_LANGUAGE, EMERGENCY_CONTACT, FACE_IMG)
VALUES(10, 'M12341234', 'english', '01012301230', '/images/face');

INSERT INTO TOURIST
(USER_NO, PASSPORT_NO, PRIMARY_LANGUAGE, EMERGENCY_CONTACT, FACE_IMG)
VALUES(11, 'M01230123', 'chinese', '01045644564', '/images/face');

-- 회원(가이드) 아이디 : guide01 통일해주기~~
SELECT USER_NO, LANGUAGE_SKILL, ACTIVITY_AREA, CONFIRMATION_NO, SUPER_GUIDE_FL
FROM GUIDE;

INSERT INTO GUIDE
(USER_NO, LANGUAGE_SKILL, ACTIVITY_AREA, CONFIRMATION_NO, SUPER_GUIDE_FL)
VALUES(8, 'English', '서울', 'A46461234', 'N'	);

INSERT INTO GUIDE
(USER_NO, LANGUAGE_SKILL, ACTIVITY_AREA, CONFIRMATION_NO, SUPER_GUIDE_FL)
VALUES(9, 'Spanish', '부산', 'A12345678', 'N'	);

COMMIT;

----------------------------------------------------------------------------------

-- 자기소개 (판매자)
SELECT USER_NO, BIRTH_YEAR, JOB, PETS, HOBBY, SUB_LANG, ABROAD_EXPERIENCE, MBTI, STRENGTH, FAVORITE_SONG, TMI, MAJOR, DOPAMINE, USELESS_TALENT, CAP_LIST
FROM PR;

INSERT INTO PR
(USER_NO, BIRTH_YEAR, JOB, PETS, HOBBY, SUB_LANG, ABROAD_EXPERIENCE, MBTI, STRENGTH, FAVORITE_SONG, TMI, MAJOR, DOPAMINE, USELESS_TALENT, CAP_LIST)
VALUES(8, 1997, 'YouTuber', 'DOGGY', 'Running', '', '', 'ENFP', '', 'Harry Styles - Watermelon Sugar', '', '', '', '', '');

INSERT INTO PR
(USER_NO, BIRTH_YEAR, JOB, PETS, HOBBY, SUB_LANG, ABROAD_EXPERIENCE, MBTI, STRENGTH, FAVORITE_SONG, TMI, MAJOR, DOPAMINE, USELESS_TALENT, CAP_LIST)
VALUES(9, 1968, 'CEO', 'Two Dogs and Two Cats', '', '', '', 'ESTJ', '', 'Bee Gees - How Deep Is Your Love', '', 'Management', '', '', '');

COMMIT;

-- 관심 지역 (구매자) !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
SELECT FAVORITE_REGION_NO, REGION_CODE, USER_NO
FROM FAVORITE_REGION;

INSERT INTO FAVORITE_REGION
(FAVORITE_REGION_NO, REGION_CODE, USER_NO)
VALUES(SEQ_FAVORITE_REGION_NO.NEXTVAL, 0, 0);

INSERT INTO FAVORITE_REGION
(FAVORITE_REGION_NO, REGION_CODE, USER_NO)
VALUES(SEQ_FAVORITE_REGION_NO.NEXTVAL, 0, 0);

-- 관심 상품 (구매자) !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
SELECT WISHLIST_NO, USER_NO, PRODUCT_NO, WISH_DT
FROM WISHLIST;

INSERT INTO WISHLIST
(WISHLIST_NO, USER_NO, PRODUCT_NO, WISH_DT)
VALUES(SEQ_WISHLIST_NO.NEXTVAL, 0, 0, SYSDATE	);

INSERT INTO WISHLIST
(WISHLIST_NO, USER_NO, PRODUCT_NO, WISH_DT)
VALUES(SEQ_WISHLIST_NO.NEXTVAL, 0, 0, SYSDATE	);

----------------------------------------------------------------------------------

-- 상품 (4개씩 넣어주세요~~)
SELECT PRODUCT_NO, PRODUCT_NAME, PRODUCT_PACKAGE, PRODUCT_CONTENT, PRODUCT_PRICE, PRODUCT_ADD_PRICE, PRODUCT_MIN_TOURIST, PRODUCT_MAX_TOURIST, USER_NO, REGION_CODE, THEME_CODE, PRODUCT_STATE, CREATE_DT, GUIDE_LANGUAGE, VIEW_COUNT
FROM PRODUCT;

INSERT INTO PRODUCT
(PRODUCT_NO, PRODUCT_NAME, PRODUCT_PACKAGE, PRODUCT_CONTENT, PRODUCT_PRICE, PRODUCT_ADD_PRICE, PRODUCT_MIN_TOURIST, PRODUCT_MAX_TOURIST, USER_NO, REGION_CODE, THEME_CODE, PRODUCT_STATE, CREATE_DT, GUIDE_LANGUAGE, VIEW_COUNT)
VALUES(SEQ_PRODUCT_NO.NEXTVAL, '아름다운 부산 바다에서 요트투어 즐기기', 1, '2021년식 프랑스 명품 BALI 43 요트와 프랑스 명품 Fountaine-Pajot lipari 41과 함께 부산의 랜드마크인 광안대교, 마린시티와 푸른 바다를 눈 앞에서 체험하고 즐길 수 있습니다.', 20000, '', 10, 20, 9, 7, 1, 'N'	, SYSDATE	, 'English&Spanish', 0	);

INSERT INTO PRODUCT
(PRODUCT_NO, PRODUCT_NAME, PRODUCT_PACKAGE, PRODUCT_CONTENT, PRODUCT_PRICE, PRODUCT_ADD_PRICE, PRODUCT_MIN_TOURIST, PRODUCT_MAX_TOURIST, USER_NO, REGION_CODE, THEME_CODE, PRODUCT_STATE, CREATE_DT, GUIDE_LANGUAGE, VIEW_COUNT)
VALUES(SEQ_PRODUCT_NO.NEXTVAL, '서울 성벽에서 즐기는 야간 하이킹 & 현지 음식 체험', 1, '혜화에 있는 언덕배기 공원인 낙산공원은 현지 대학생들에게 인기 있는 낭만적인 하이킹 장소입니다. 성벽에서 서울과 N서울타워의 아름다운 야경을 감상하고 하이킹 후 맛있는 현지 음식을 즐겨보세요!', 68000, '', 1, 5, 8, 1, 4, 'N'	, SYSDATE	, 'English', 0	);

INSERT INTO PRODUCT
(PRODUCT_NO, PRODUCT_NAME, PRODUCT_PACKAGE, PRODUCT_CONTENT, PRODUCT_PRICE, PRODUCT_ADD_PRICE, PRODUCT_MIN_TOURIST, PRODUCT_MAX_TOURIST, USER_NO, REGION_CODE, THEME_CODE, PRODUCT_STATE, CREATE_DT, GUIDE_LANGUAGE, VIEW_COUNT)
VALUES(SEQ_PRODUCT_NO.NEXTVAL, '취향따라 골라 즐기는 경복궁 한복 체험', 1, '간단한 한복과 악세서리에 대한 설명과 함께 한복 매니저의 도움을 받아 한복을 편하게 고르실 수 있습니다.', 18000, '', 5, 20, 8, 1, 3, 'N'	, SYSDATE	, 'English', 0	);

INSERT INTO PRODUCT
(PRODUCT_NO, PRODUCT_NAME, PRODUCT_PACKAGE, PRODUCT_CONTENT, PRODUCT_PRICE, PRODUCT_ADD_PRICE, PRODUCT_MIN_TOURIST, PRODUCT_MAX_TOURIST, USER_NO, REGION_CODE, THEME_CODE, PRODUCT_STATE, CREATE_DT, GUIDE_LANGUAGE, VIEW_COUNT)
VALUES(SEQ_PRODUCT_NO.NEXTVAL, '부산에서 놓칠 수 없는 즐길 거리', 1, '부산을 대표하는 해동용궁사와 감천문화마을을 가실 수 있습니다. 후인월 해안마을과 산복도로 전망대에서 부산의 풍경과 부산의 정취를 느낄 수 있는 전망대를 즐기실 수 있습니다.', 45000, '', 5, 10, 9, 7, 1, 'N'	, SYSDATE	, 'English&Spanish', 0	);

COMMIT;

-- 예약
SELECT RESERVATION_NO, PRODUCT_NO, USER_NO, CREATE_DT, RESERVATION_STATE, PAYMENT_METHOD, GUEST_COUNT, RESERVATION_DT
FROM RESERVATION;

INSERT INTO RESERVATION
(RESERVATION_NO, PRODUCT_NO, USER_NO, CREATE_DT, RESERVATION_STATE, PAYMENT_METHOD, GUEST_COUNT, RESERVATION_DT)
VALUES(SEQ_RESERVATION_NO.NEXTVAL, 0, 0, SYSDATE	, 'Y'	, '', 0, '');

-- 리뷰
SELECT REVIEW_NO, USER_NO, REVIEW_MESSAGE, REVIEW_STARS, REVIEW_DEL_FL, PRODUCT_NO, CREATE_DT
FROM REVIEW;

INSERT INTO REVIEW
(REVIEW_NO, USER_NO, REVIEW_MESSAGE, REVIEW_STARS, REVIEW_DEL_FL, PRODUCT_NO, CREATE_DT)
VALUES(SEQ_REVIEW_NO.NEXTVAL, 0, '', 0, 'N'	, 0, SYSDATE	);



-- 지역
SELECT REGION_CODE, REGION_NAME
FROM REGION;

INSERT INTO REGION
(REGION_CODE, REGION_NAME)
VALUES(SEQ_REGION_CODE.NEXTVAL, '');



-- 여행 코스
SELECT COURSE_NO, PRODUCT_NO, COURSE_NAME, COURSE_ORDER, LATITUDE, LONGITUDE, BOSS_COURSE_FL
FROM TOUR_COURSE;

INSERT INTO TOUR_COURSE
(COURSE_NO, PRODUCT_NO, COURSE_NAME, COURSE_ORDER, LATITUDE, LONGITUDE, BOSS_COURSE_FL)
VALUES(SEQ_TOURCOURSE_NO.NEXTVAL, 0, '', 0, '', '', 'N'	);

-- 파일 (상품이미지 임의로 해도됨니다~~)
SELECT FILE_NO, PRODUCT_NO, FILE_ORDER, FILE_PATH
FROM "FILE";

INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 0, 0, '');


-- 상품 일정(옵션) (판매자)
SELECT PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT
FROM PRODUCT_DT;

INSERT INTO PRODUCT_DT
(PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT)
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 0, '');

/*
-- 채팅
SELECT CHAT_NO, READ_OR_NOT, CHAT_MESSAGE, CHAT_SEND_DT, CHATROOM_NO, USER_NO
FROM CHAT;

INSERT INTO CHAT
(CHAT_NO, READ_OR_NOT, CHAT_MESSAGE, CHAT_SEND_DT, CHATROOM_NO, USER_NO)
VALUES(SEQ_CHAT_NO.NEXTVAL, 'N'	, '', SYSDATE	, 0, 0);


-- 채팅룸
SELECT CHATROOM_NO, CREATE_DT, PRODUCT_NO, USER_NO
FROM CHATROOM;

INSERT INTO CHATROOM
(CHATROOM_NO, CREATE_DT, PRODUCT_NO, USER_NO)
VALUES(SEQ_CHATROOM_NO.NEXTVAL, SYSDATE	, 0, 0);
*/

/*
-- 알림 (구매자 판매자 모두)
SELECT NOTIFICATION_NO, RECEIVER_NO, SENDER_NO, NOTIFICATION_CONTENT, CREATE_DT, NOTIFICATION_URL, NOTIFICATION_TYPE
FROM NOTIFICATION;

INSERT INTO NOTIFICATION
(NOTIFICATION_NO, RECEIVER_NO, SENDER_NO, NOTIFICATION_CONTENT, CREATE_DT, NOTIFICATION_URL, NOTIFICATION_TYPE)
VALUES(SEQ_NOTICE_NO.NEXTVAL, 0, 0, '', '', '', '');
*/

/*
-- 1:1 문의 (구매자 판매자 모두)
SELECT QNA_NO, QNA_EMAIL, QNA_TITLE, QNA_CONTENT, QNA_DATE, QNA_DEL_FL, QNA_CHECK_FL, USER_NO, QNA_ANSWER
FROM QNA;

INSERT INTO QNA
(QNA_NO, QNA_EMAIL, QNA_TITLE, QNA_CONTENT, QNA_DATE, QNA_DEL_FL, QNA_CHECK_FL, USER_NO, QNA_ANSWER)
VALUES(SEQ_QNA_NO.NEXTVAL, '', '', '', SYSDATE	, 'N'	, 'N'	, 0, '');

-- 1:1문의 이미지 (구매자 판매자 모두)
SELECT QNA_IMG_NO, QNA_NO, QNA_IMG
FROM QNA_IMG;

INSERT INTO QNA_IMG
(QNA_IMG_NO, QNA_NO, QNA_IMG)
VALUES(SEQ_QNA_IMG_NO.NEXTVAL, 0, '');

-- 이벤트
SELECT EVENT_NO, EVENT_NAME, EVENT_CONTENT, EVENT_END_DT, CREATE_DT, EVENT_IMG
FROM EVENT;

INSERT INTO EVENT
(EVENT_NO, EVENT_NAME, EVENT_CONTENT, EVENT_END_DT, CREATE_DT, EVENT_IMG)
VALUES(SEQ_EVENT_NO.NEXTVAL, '', '', '', '', '');

*/

/*
-- 테마 (이미 끝)
SELECT THEME_CODE, THEME_NAME
FROM THEME;

INSERT INTO THEME
(THEME_CODE, THEME_NAME)
VALUES(SEQ_THEME_CODE.NEXTVAL, '');
*/





