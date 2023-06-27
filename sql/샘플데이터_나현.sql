-- (나현) 샘플 데이터 2개씩 넣어주세요!! 주석 처리 된 거는 나중에 넣어도 됨!! 

----------------------------------------------------------------------------------

-- 회원 (구매자 판매자 공통)
SELECT USER_NO, USER_EMAIL, USER_PASSWORD, USER_NAME, USER_TEL, PROFILE_IMG, CREATE_DT, USER_TYPE, USER_STATE
FROM "USER";

INSERT INTO "USER"
(USER_NO, USER_EMAIL, USER_PASSWORD, USER_NAME, USER_TEL, PROFILE_IMG, CREATE_DT, USER_TYPE, USER_STATE)
VALUES(SEQ_USER_NO.NEXTVAL, 'guide20@gmail.com', 'pass20', '이나봉', '01022223333', '/images/profile', SYSDATE	, 'G', 'N');

INSERT INTO "USER"
(USER_NO, USER_EMAIL, USER_PASSWORD, USER_NAME, USER_TEL, PROFILE_IMG, CREATE_DT, USER_TYPE, USER_STATE)
VALUES(SEQ_USER_NO.NEXTVAL, 'guide24@gmail.com', 'pass24', '나옹신', '01077237777', '/images/profile', SYSDATE	, 'G', 'N');

INSERT INTO "USER"
(USER_NO, USER_EMAIL, USER_PASSWORD, USER_NAME, USER_TEL, PROFILE_IMG, CREATE_DT, USER_TYPE, USER_STATE)
VALUES(SEQ_USER_NO.NEXTVAL, 'tourist25@gmail.com', 'pass25','martin moore', '01011116789', '/images/profile', SYSDATE	, 'T', 'N');

INSERT INTO "USER"
(USER_NO, USER_EMAIL, USER_PASSWORD, USER_NAME, USER_TEL, PROFILE_IMG, CREATE_DT, USER_TYPE, USER_STATE)
VALUES(SEQ_USER_NO.NEXTVAL, 'tourist26@gmail.com', 'pass26','sam thompson', '01039499222', '/images/profile', SYSDATE	, 'T', 'N');
-- 만든 유저 번호로 생성하기 가이드 2명 / 판매자 2명

-- 프로필 이미지
UPDATE "USER"
SET PROFILE_IMG='';
--WHERE USER_NO=0;

UPDATE "USER"
SET PROFILE_IMG='/images/userProfile/sample25.jpg'
WHERE USER_NO=25
;

UPDATE "USER"
SET USER_NAME='Nishimura Honoka'
WHERE USER_NO=25;

COMMIT;


-- 회원(여행객) 아이디 : tourist01 통일해주기~~
SELECT USER_NO, PASSPORT_NO, PRIMARY_LANGUAGE, EMERGENCY_CONTACT, FACE_IMG
FROM TOURIST;

-- 25번 여행객 
INSERT INTO TOURIST
(USER_NO, PASSPORT_NO, PRIMARY_LANGUAGE, EMERGENCY_CONTACT, FACE_IMG)
VALUES(25, 'M99402903', 'Japanese', '01033329494', null);

-- 26번 여행객 
INSERT INTO TOURIST
(USER_NO, PASSPORT_NO, PRIMARY_LANGUAGE, EMERGENCY_CONTACT, FACE_IMG)
VALUES(26, 'M12395959', 'French', null, '/images/face');

-- 회원(가이드) 아이디 : guide 통일해주기~~
SELECT USER_NO, LANGUAGE_SKILL, ACTIVITY_AREA, CONFIRMATION_NO, SUPER_GUIDE_FL
FROM GUIDE;

-- 23 가이드 (닉네임은 20)
INSERT INTO GUIDE
(USER_NO, LANGUAGE_SKILL, ACTIVITY_AREA, CONFIRMATION_NO, SUPER_GUIDE_FL)
VALUES(23, 'Japanese', '여수', 'A22223456', 'N'	);

-- 24 가이드
INSERT INTO GUIDE
(USER_NO, LANGUAGE_SKILL, ACTIVITY_AREA, CONFIRMATION_NO, SUPER_GUIDE_FL)
VALUES(24, 'Japanese', '제주', 'A67891111', 'Y'	);

COMMIT;
----------------------------------------------------------------------------------

-- 자기소개 (판매자)
SELECT USER_NO, BIRTH_YEAR, JOB, PETS, HOBBY, SUB_LANG, ABROAD_EXPERIENCE, MBTI, STRENGTH, FAVORITE_SONG, TMI, MAJOR, DOPAMINE, USELESS_TALENT, CAP_LIST
FROM PR;

INSERT INTO PR
(USER_NO, BIRTH_YEAR, JOB, PETS, HOBBY, SUB_LANG, ABROAD_EXPERIENCE, MBTI, STRENGTH, FAVORITE_SONG, TMI, MAJOR, DOPAMINE, USELESS_TALENT, CAP_LIST)
VALUES(23, 1988, 'guide', NULL , 'cook', 'English', 'studying at university in Japan', 'ENFP', 'a cheerful disposition', 'Country Roads','I like seafood.', 'Tourism', 'take a photo', 'sing', 'It will give you a wonderful experience.');

INSERT INTO PR
(USER_NO, BIRTH_YEAR, JOB, PETS, HOBBY, SUB_LANG, ABROAD_EXPERIENCE, MBTI, STRENGTH, FAVORITE_SONG, TMI, MAJOR, DOPAMINE, USELESS_TALENT, CAP_LIST)
VALUES(24, 1991, 'photographer', NULL , 'Photo Retouching', 'English',null, null, null, 'Bohemian Rhapsody', null, 'photograph', 'Watching movies', 'cook', null);
-- 다 넣을 필요 없고 4개 이상 넣기~~

-- 관심 지역 (구매자)
SELECT FAVORITE_REGION_NO, REGION_CODE, USER_NO
FROM FAVORITE_REGION;

INSERT INTO FAVORITE_REGION
(FAVORITE_REGION_NO, REGION_CODE, USER_NO)
VALUES(SEQ_FAVORITE_REGION_NO.NEXTVAL, 6, 25);

INSERT INTO FAVORITE_REGION
(FAVORITE_REGION_NO, REGION_CODE, USER_NO)
VALUES(SEQ_FAVORITE_REGION_NO.NEXTVAL, 1, 26);


-- 관심 상품 (구매자)
SELECT WISHLIST_NO, USER_NO, PRODUCT_NO, WISH_DT
FROM WISHLIST;

INSERT INTO WISHLIST
(WISHLIST_NO, USER_NO, PRODUCT_NO, WISH_DT)
VALUES(SEQ_WISHLIST_NO.NEXTVAL, 26, 22, SYSDATE);

COMMIT;

DELETE FROM WISHLIST
WHERE WISHLIST_NO=9;

----------------------------------------------------------------------------------
SELECT THEME_CODE, THEME_NAME, THEME_IMG
FROM THEME;

-- 상품 (4개씩 넣어주세요~~)
SELECT PRODUCT_NO, PRODUCT_NAME, PRODUCT_PACKAGE, PRODUCT_CONTENT, PRODUCT_PRICE, PRODUCT_ADD_PRICE, PRODUCT_MIN_TOURIST, PRODUCT_MAX_TOURIST, USER_NO, THEME_CODE, PRODUCT_STATE, CREATE_DT, GUIDE_LANGUAGE, VIEW_COUNT, REGION_NAME, TOUR_DURATION
FROM PRODUCT;


DELETE FROM PRODUCT
WHERE PRODUCT_NO=20;


-- 18번 여수 23번 가이드 
INSERT INTO PRODUCT
(PRODUCT_NO, PRODUCT_NAME, PRODUCT_PACKAGE, PRODUCT_CONTENT, PRODUCT_PRICE, PRODUCT_ADD_PRICE, PRODUCT_MIN_TOURIST, PRODUCT_MAX_TOURIST, USER_NO, REGION_CODE, THEME_CODE, PRODUCT_STATE, CREATE_DT, GUIDE_LANGUAGE, VIEW_COUNT)
VALUES(SEQ_PRODUCT_NO.NEXTVAL, '여수로 떠나는 바다 여행', 2, '여수 아쿠아리움을 방문하고 크리스탈 케이블카를 타며 바다의 전망을 구경한다.', 50000 ,NULL , 5, 20, 23, 15 , 1, 'N', SYSDATE	, 'Japanese', 0	);

INSERT INTO "PRODUCT_OPTION" VALUES(SEQ_OPTION_NO.NEXTVAL, '12:00', 20, 18);
INSERT INTO "PRODUCT_OPTION" VALUES(옵션 번호, 시간, 최대 인원 수, 상품 번호);

INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 18, 1, '/images/product/product_18_image_1.jpg');

INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 18, 2, '/images/product/product_18_image_2.jpg');

INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 18, 3, '/images/product/product_18_image_3.jpg');

INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 18, 4, '/images/product/product_18_image_4.jpg');

INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 18, 5, '/images/product/product_18_image_5.jpg');

INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 18, 6, '/images/product/product_18_image_6.jpg');

UPDATE PRODUCT SET TOUR_DURATION = 5 WHERE PRODUCT_NO = 18;



-- 상품 일정
INSERT INTO PRODUCT_DT
(PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT) -- 32
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 18, '2023-06-22');



INSERT INTO PRODUCT_DT
(PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT) -- 33
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 18, '2023-06-23');

INSERT INTO PRODUCT_DT
(PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT) -- 34
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 18, '2023-07-01');

INSERT INTO PRODUCT_DT
(PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT) -- 35
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 18, '2023-07-06');

-- 예약
SELECT PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT
FROM PRODUCT_DT;

INSERT INTO RESERVATION
(RESERVATION_NO, PRODUCT_NO, USER_NO, CREATE_DT, RESERVATION_STATE, PAYMENT_METHOD, GUEST_COUNT, PRODUCT_DT_NO)
VALUES(SEQ_RESERVATION_NO.NEXTVAL, 18, 25, SYSDATE , 'Y', 'C', 3, 32);

-- 19번 부산 23번 가이드 
INSERT INTO PRODUCT
(PRODUCT_NO, PRODUCT_NAME, PRODUCT_PACKAGE, PRODUCT_CONTENT, PRODUCT_PRICE, PRODUCT_ADD_PRICE, PRODUCT_MIN_TOURIST, PRODUCT_MAX_TOURIST, USER_NO, REGION_CODE, THEME_CODE, PRODUCT_STATE, CREATE_DT, GUIDE_LANGUAGE, VIEW_COUNT)
VALUES(SEQ_PRODUCT_NO.NEXTVAL, '부산 더베이, 해운대 바다와 해산물 여행', 2, '부산 더베이에서 기념 사진을 촬영 후 해운대 바다를 산책하고 해산물을 먹는 여행', 70000 ,'2000' , 4, 30, 23, 7 , 1, 'N', SYSDATE	, 'Japanese', 0	);

INSERT INTO "PRODUCT_OPTION" VALUES(SEQ_OPTION_NO.NEXTVAL, '13:00', 30, 19);
INSERT INTO "PRODUCT_OPTION" VALUES(옵션 번호, 시간, 최대 인원 수, 상품 번호);

INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 19, 1, '/images/product/product_19_image_1.png');

INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 19, 2, '/images/product/product_19_image_2.png');

INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 19, 3, '/images/product/product_19_image_3.png');

INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 19, 4, '/images/product/product_19_image_4.png');

INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 19, 5, '/images/product/product_19_image_5.png');

INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 19, 6, '/images/product/product_19_image_6.png');

UPDATE PRODUCT SET TOUR_DURATION = 5 WHERE PRODUCT_NO = 19;
-- 상품 일정
INSERT INTO PRODUCT_DT
(PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT) -- 36
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 19, '2023-06-23');

INSERT INTO PRODUCT_DT
(PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT) -- 37
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 19, '2023-07-01');

INSERT INTO PRODUCT_DT
(PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT) -- 38
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 19, '2023-07-05');

INSERT INTO PRODUCT_DT
(PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT) -- 39
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 19, '2023-07-14');

INSERT INTO RESERVATION
(RESERVATION_NO, PRODUCT_NO, USER_NO, CREATE_DT, RESERVATION_STATE, PAYMENT_METHOD, GUEST_COUNT, PRODUCT_DT_NO)
VALUES(SEQ_RESERVATION_NO.NEXTVAL, 19, 25, SYSDATE , 'Y', 'C', 5, 36);

-- 21번 제 24번 가이드 
INSERT INTO PRODUCT
(PRODUCT_NO, PRODUCT_NAME, PRODUCT_PACKAGE, PRODUCT_CONTENT, PRODUCT_PRICE, PRODUCT_ADD_PRICE, PRODUCT_MIN_TOURIST, PRODUCT_MAX_TOURIST, USER_NO, REGION_CODE, THEME_CODE, PRODUCT_STATE, CREATE_DT, GUIDE_LANGUAGE, VIEW_COUNT)
VALUES(SEQ_PRODUCT_NO.NEXTVAL, '제주 김녕에서 평화로운 바다와 동굴 체험', 4, '제주 동문 시장에서 점심을 먹은 뒤 김녕 해수욕장에서 해수욕을 즐긴 후 편히 쉰 후 다음 날에는 만장굴 구경', 80000 ,'5000' , 4, 20, 24, 8 , 8, 'N', SYSDATE	, 'Japanese', 0	);

INSERT INTO "PRODUCT_OPTION" VALUES(SEQ_OPTION_NO.NEXTVAL, '09:00', 20, 21);
INSERT INTO "PRODUCT_OPTION" VALUES(옵션 번호, 시간, 최대 인원 수, 상품 번호);

INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 21, 1, '/images/product/product_21_image_1.jpg');

INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 21, 2, '/images/product/product_21_image_2.jpg');

INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 21, 3, '/images/product/product_21_image_3.jpg');

INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 21, 4, '/images/product/product_21_image_4.jpg');

INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 21, 5, '/images/product/product_21_image_5.jpg');

INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 21, 6, '/images/product/product_21_image_6.jpg');

INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 21, 7, '/images/product/product_21_image_7.jpg');

INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 21, 8, '/images/product/product_21_image_8.jpg');

UPDATE PRODUCT SET TOUR_DURATION = 10 WHERE PRODUCT_NO = 21;
-- 상품 일정
INSERT INTO PRODUCT_DT
(PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT) -- 40
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 21, '2023-06-23');

INSERT INTO PRODUCT_DT
(PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT) -- 41
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 21, '2023-06-25');

INSERT INTO PRODUCT_DT
(PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT) -- 42
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 21, '2023-06-29');

INSERT INTO PRODUCT_DT
(PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT) -- 43
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 21, '2023-07-05');

INSERT INTO RESERVATION
(RESERVATION_NO, PRODUCT_NO, USER_NO, CREATE_DT, RESERVATION_STATE, PAYMENT_METHOD, GUEST_COUNT, PRODUCT_DT_NO)
VALUES(SEQ_RESERVATION_NO.NEXTVAL, 21, 25, SYSDATE , 'Y', 'P', 10, 40);




-- 22번 제 24번 가이드 
INSERT INTO PRODUCT
(PRODUCT_NO, PRODUCT_NAME, PRODUCT_PACKAGE, PRODUCT_CONTENT, PRODUCT_PRICE, PRODUCT_ADD_PRICE, PRODUCT_MIN_TOURIST, PRODUCT_MAX_TOURIST, USER_NO, REGION_CODE, THEME_CODE, PRODUCT_STATE, CREATE_DT, GUIDE_LANGUAGE, VIEW_COUNT)
VALUES(SEQ_PRODUCT_NO.NEXTVAL, '제주 대관령에서 양떼 목장과 체험형 투어', 4, '대관령에서 귀여운 동물들과 먹이 주기 체험 후 감귤 농장 따기 체험', 60000 ,null , 1, 20, 24, 8 , 6, 'N', SYSDATE	, 'Japanese', 0	);

INSERT INTO "PRODUCT_OPTION" VALUES(SEQ_OPTION_NO.NEXTVAL, '14:00', 20, 22);
INSERT INTO "PRODUCT_OPTION" VALUES(옵션 번호, 시간, 최대 인원 수, 상품 번호);

INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 22, 1, '/images/product/product_22_image_1.jpg');

INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 22, 2, '/images/product/product_22_image_2.jpg');

INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 22, 3, '/images/product/product_22_image_3.jpg');

INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 22, 4, '/images/product/product_22_image_4.jpg');

INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 22, 5, '/images/product/product_22_image_5.jpg');

UPDATE PRODUCT SET TOUR_DURATION = 4 WHERE PRODUCT_NO = 22;
-- 상품 일정
INSERT INTO PRODUCT_DT
(PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT) -- 44
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 22, '2023-06-27');

INSERT INTO PRODUCT_DT
(PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT) -- 45
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 22, '2023-06-28');

INSERT INTO PRODUCT_DT
(PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT) -- 46
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 22, '2023-07-14');

INSERT INTO PRODUCT_DT
(PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT) -- 47
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 22, '2023-07-26');

INSERT INTO RESERVATION
(RESERVATION_NO, PRODUCT_NO, USER_NO, CREATE_DT, RESERVATION_STATE, PAYMENT_METHOD, GUEST_COUNT, PRODUCT_DT_NO)
VALUES(SEQ_RESERVATION_NO.NEXTVAL, 22, 25, SYSDATE , 'Y', 'C', 12, 44);

UPDATE PRODUCT SET REGION_NAME = '제주' 
WHERE PRODUCT_NO = 22
;

COMMIT;

-- 예약
SELECT RESERVATION_NO, PRODUCT_NO, USER_NO, CREATE_DT, RESERVATION_STATE, PAYMENT_METHOD, GUEST_COUNT, PRODUCT_DT_NO
FROM RESERVATION
WHERE USER_NO = 25;

INSERT INTO RESERVATION
(RESERVATION_NO, PRODUCT_NO, USER_NO, CREATE_DT, RESERVATION_STATE, PAYMENT_METHOD, GUEST_COUNT, PRODUCT_DT_NO)
VALUES(SEQ_RESERVATION_NO.NEXTVAL, 0, 0, SYSDATE , 'Y', '', 0, 0);

INSERT INTO RESERVATION
(RESERVATION_NO, PRODUCT_NO, USER_NO, CREATE_DT, RESERVATION_STATE, PAYMENT_METHOD, GUEST_COUNT, PRODUCT_DT_NO)
VALUES(SEQ_RESERVATION_NO.NEXTVAL, 14, 25, SYSDATE , 'D', 'C', 4, 15);

INSERT INTO RESERVATION
(RESERVATION_NO, PRODUCT_NO, USER_NO, CREATE_DT, RESERVATION_STATE, PAYMENT_METHOD, GUEST_COUNT, PRODUCT_DT_NO)
VALUES(SEQ_RESERVATION_NO.NEXTVAL, 16, 25, SYSDATE , 'D', 'C', 4, 22);

INSERT INTO RESERVATION
(RESERVATION_NO, PRODUCT_NO, USER_NO, CREATE_DT, RESERVATION_STATE, PAYMENT_METHOD, GUEST_COUNT, PRODUCT_DT_NO)
VALUES(SEQ_RESERVATION_NO.NEXTVAL, 13, 25, SYSDATE , 'D', 'C', 4, 5);

UPDATE RESERVATION
SET RESERVATION_STATE='D'
WHERE RESERVATION_NO=5;


-- 리뷰
SELECT REVIEW_NO, USER_NO, REVIEW_MESSAGE, REVIEW_STARS, REVIEW_DEL_FL, PRODUCT_NO, CREATE_DT
FROM REVIEW
WHERE USER_NO =25;

DELETE FROM REVIEW
WHERE REVIEW_NO=17;


SELECT *FROM REVIEW;

ALTER TABLE REVIEW
ADD REVIEW_REPLY VARCHAR2(600) NULL;

COMMENT ON COLUMN "REVIEW"."REVIEW_REPLY" IS '리뷰 답글';

ALTER TABLE REVIEW
ADD REVIEW_REPLY_DEL_FL CHAR(1) DEFAULT 'N' NOT NULL CONSTRAINT REVIEW_REPLY_DEL_FL_CHECK CHECK(REVIEW_REPLY_DEL_FL IN ('Y', 'N'));

COMMIT;


-- 리뷰 글자 수 수정
ALTER TABLE REVIEW
MODIFY REVIEW_MESSAGE VARCHAR2(1500);

-- 18번 리뷰 
INSERT INTO REVIEW
(REVIEW_NO, USER_NO, REVIEW_MESSAGE, REVIEW_STARS, REVIEW_DEL_FL, PRODUCT_NO, CREATE_DT) -- 14
VALUES(SEQ_REVIEW_NO.NEXTVAL, 25, '그녀는 훌륭한 가이드였고, 항상 도움을 주고 질문에 답할 준비가 되어 있었습니다. 서울은 아름다운 도시입니다! 백퍼센트 추천!!그녀는 훌륭한 가이드였고, 항상 도움을 주고 질문에 답할 준비가 되어 있었습니다. 서울은 아름다운 도시입니다! 백퍼센트 추천!!그녀는 훌륭한 가이드였고, 항상 도움을 주고 질문에 답할 준비가 되어 있었습니다. 서울은 아름다운 도시입니다! 백퍼센트 추천!!그녀는 훌륭한 가이드였고, 항상 도움을 주고 질문에 답할 준비가 되어 있었습니다. 서울은 아름다운 도시입니다! 백퍼센트 추천!!그녀는 훌륭한 가이드였고, 항상 도움을 주고 질문에 답할 준비가 되어 있었습니다. 서울은 아름다운 도시입니다! 백퍼센트 추천!!', 4.5, 'N'	, 18, SYSDATE);

UPDATE REVIEW
SET REVIEW_REPLY='안녕하세요~ 좋은 후기 감사합니당!!안녕하세요~ 좋은 후기 감사합니당!!안녕하세요~ 좋은 후기 감사합니당!!안녕하세요~ 좋은 후기 감사합니당!! 안녕하세요~ 좋은 후기 감사합니당!!안녕하세요~ 좋은 후기 감사합니당!!안녕하세요~ 좋은 후기 감사합니당!!안녕하세요~ 좋은 후기 감사합니당!! 안녕하세요~ 좋은 후기 감사합니당!!안녕하세요~ 좋은 후기 감사합니당'
WHERE REVIEW_NO=14;

INSERT INTO REVIEW
(REVIEW_NO, USER_NO, REVIEW_MESSAGE, REVIEW_STARS, REVIEW_DEL_FL, PRODUCT_NO, CREATE_DT)
VALUES(SEQ_REVIEW_NO.NEXTVAL, 25, '대박 리뷰~~', 5, 'N', 18, SYSDATE);

-- 19번 리뷰 
INSERT INTO REVIEW
(REVIEW_NO, USER_NO, REVIEW_MESSAGE, REVIEW_STARS, REVIEW_DEL_FL, PRODUCT_NO, CREATE_DT) -- 15
VALUES(SEQ_REVIEW_NO.NEXTVAL, 25, '즐거운 여행이였습니다. 한국에 또 오고 싶어요~', 5, 'N'	, 19, SYSDATE);

UPDATE REVIEW
SET REVIEW_REPLY='안녕하세요~ 좋은 후기 감사합니당!!'
WHERE REVIEW_NO=15;

INSERT INTO REVIEW
(REVIEW_NO, USER_NO, REVIEW_MESSAGE, REVIEW_STARS, REVIEW_DEL_FL, PRODUCT_NO, CREATE_DT)
VALUES(SEQ_REVIEW_NO.NEXTVAL, 25, 'nice bb', 5, 'N'	, 19, SYSDATE);

-- 21번 리뷰 
INSERT INTO REVIEW
(REVIEW_NO, USER_NO, REVIEW_MESSAGE, REVIEW_STARS, REVIEW_DEL_FL, PRODUCT_NO, CREATE_DT)
VALUES(SEQ_REVIEW_NO.NEXTVAL, 25, '가이드가 너무 친절했습니다. 여행 코스도 완벽했어요.', 5, 'N'	, 21, SYSDATE);

-- 22번 리뷰 
INSERT INTO REVIEW
(REVIEW_NO, USER_NO, REVIEW_MESSAGE, REVIEW_STARS, REVIEW_DEL_FL, PRODUCT_NO, CREATE_DT)
VALUES(SEQ_REVIEW_NO.NEXTVAL, 25, '조금 언어적인 소통이 힘들었어요. 하지만 여행은 즐거웠습니다.', 3, 'N'	, 22, SYSDATE);

COMMIT;

UPDATE REVIEW
SET REVIEW_STARS=3.5
WHERE REVIEW_NO=15;


-- 지역
SELECT REGION_CODE, REGION_NAME
FROM REGION;

INSERT INTO REGION
(REGION_CODE, REGION_NAME)
VALUES(SEQ_REGION_CODE.NEXTVAL, 'Yeosu');


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

-- 1박 상품 옵션
SELECT OPTION_NO, OPTION_NAME, OPTION_REST, PRODUCT_NO
FROM PRODUCT_OPTION;

INSERT INTO "PRODUCT_OPTION" VALUES(SEQ_OPTION_NO.NEXTVAL, '16:00', 20, 18);
INSERT INTO "PRODUCT_OPTION" VALUES(옵션 번호, 시간, 최대 인원 수, 상품 번호);


-------- 나현 샘플 데이터 끝 -----------

SELECT COURSE_NO, PRODUCT_NO, COURSE_NAME, COURSE_ORDER, LATITUDE, LONGITUDE, BOSS_COURSE_FL
FROM TOUR_COURSE;

