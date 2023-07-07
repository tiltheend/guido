-- ****** 투어리스트 / 가이드 프로필 이동 ******

-- 가이드인지 판매자인지 체크 ( userType: 1 == G / 0 == T)
-- 23 / 24 가이드 G
-- 25 / 26 여행객 T
SELECT COUNT(*) 
FROM "USER"
WHERE USER_NO = 25
AND USER_TYPE = 'G'
;

-- 회원 정보 가져오기 (이메일, 이름, 프로필 이미지)
SELECT USER_EMAIL, USER_NAME, PROFILE_IMG
FROM "USER"
WHERE USER_NO = 25
;

-- 프로필 변경
UPDATE "USER"
SET PROFILE_IMG='/images/userProfile/sample25.jpg';
WHERE USER_NO=25
;



-- 구매 내역 조회
SELECT FILE_NO, PRODUCT_NO, FILE_ORDER, FILE_PATH
FROM "FILE";

SELECT RESERVATION_NO, PRODUCT_NO, USER_NO, CREATE_DT, RESERVATION_STATE, PAYMENT_METHOD, GUEST_COUNT, PRODUCT_DT_NO
FROM RESERVATION;

SELECT PRODUCT_NO, FILE_PATH
FROM "FILE"
JOIN RESERVATION USING (PRODUCT_NO)
WHERE USER_NO = 25
AND FILE_ORDER = 1
;

-- 구매 내역 카운트
SELECT COUNT(PRODUCT_NO)
FROM RESERVATION
WHERE USER_NO = 25
;

-- 나의 리뷰 내역 조회
SELECT REVIEW_NO, REVIEW_MESSAGE, REVIEW_STARS REVIEW_STARS_DOUBLE
	  	, TO_CHAR(R.CREATE_DT, 'YYYY/MM/DD') CREATE_DT, PROFILE_IMG, USER_NAME
	   , PRODUCT_NAME, REVIEW_REPLY, PRODUCT_NO
FROM "REVIEW" R
JOIN "USER" U ON(R.USER_NO = U.USER_NO)
JOIN "PRODUCT" USING (PRODUCT_NO)
WHERE U.USER_STATE = 'N'
AND U.USER_NO = 25
AND REVIEW_DEL_FL = 'N'
AND REVIEW_REPLY_DEL_FL = 'N'
ORDER BY 1 DESC
;



COMMIT;

ROLLBACK;
-- 리뷰 수 카운트
SELECT COUNT(*)
FROM REVIEW
WHERE USER_NO = 25
AND REVIEW_REPLY_DEL_FL ='N'
;

-- 구매자 프로필 자신이 쓴 리뷰 목록 더보기 (3개씩)
SELECT * FROM(
	SELECT ROW_NUMBER() OVER (ORDER BY REVIEW_NO DESC) AS NUM
			,REVIEW_NO, REVIEW_MESSAGE, REVIEW_STARS REVIEW_STARS_DOUBLE
		  	, TO_CHAR(R.CREATE_DT, 'YYYY/MM/DD') CREATE_DT, PROFILE_IMG, USER_NAME
		   , PRODUCT_NAME, REVIEW_REPLY, PRODUCT_NO
	FROM "REVIEW" R
	JOIN "USER" U ON(R.USER_NO = U.USER_NO)
	JOIN "PRODUCT" USING (PRODUCT_NO)
	WHERE U.USER_STATE = 'N'
	AND U.USER_NO = 25
	AND REVIEW_DEL_FL = 'N'
	AND REVIEW_REPLY_DEL_FL = 'N'
	)
	WHERE NUM > 3
	ORDER BY NUM
	;

SELECT R.PRODUCT_NO, R.USER_NO, PRODUCT_DT_NO, PRODUCT_NAME
FROM RESERVATION R
JOIN PRODUCT P ON (R.PRODUCT_NO=P.PRODUCT_NO)
WHERE R.USER_NO = 25;
	
-- 리뷰 안쓴 목록 가져오기
SELECT R.PRODUCT_NO, R.USER_NO, PRODUCT_DT_NO, PRODUCT_NAME, RV.REVIEW_MESSAGE 
FROM RESERVATION R
JOIN PRODUCT P ON (R.PRODUCT_NO=P.PRODUCT_NO)
LEFT JOIN "REVIEW" RV ON (R.PRODUCT_NO = RV.PRODUCT_NO)
WHERE R.USER_NO = 25
AND R.RESERVATION_STATE = 'D'
AND RV.REVIEW_MESSAGE IS NULL 
ORDER BY R.CREATE_DT DESC 
;

SELECT RS.PRODUCT_NO, RS.PRODUCT_NAME, RS.PRODUCT_DT_NO, 
    (SELECT R.REVIEW_MESSAGE
    FROM REVIEW R
    WHERE R.PRODUCT_NO = RS.PRODUCT_NO
    AND R.USER_NO = 25
    AND R.REVIEW_MESSAGE IS NULL) AS REVIEW_MESSAGE
FROM RESERVATION RS
JOIN "PRODUCT" P ON RS.PRODUCT_NO = P.PRODUCT_NO
LEFT JOIN "REVIEW" R ON P.PRODUCT_NO = R.PRODUCT_NO
WHERE RS.USER_NO = 25
AND RS.RESERVATION_STATE = 'D'
AND R.REVIEW_NO IS NULL
ORDER BY RS.PRODUCT_NO DESC
;

-- 리뷰 등록

INSERT INTO REVIEW
(REVIEW_NO, USER_NO, REVIEW_MESSAGE, REVIEW_STARS, REVIEW_DEL_FL, PRODUCT_NO, CREATE_DT)
VALUES(SEQ_REVIEW_NO.NEXTVAL, 25, 'nice bb', 5, 'N'	, 14, SYSDATE);

-- 리뷰 삭제
DELETE FROM REVIEW
WHERE PRODUCT_NO =0
AND USER_NO =25
;

-- 리뷰 수정
UPDATE REVIEW
SET REVIEW_MESSAGE='수정쓰?', REVIEW_STARS=4.5
WHERE PRODUCT_NO= 19
AND USER_NO = 25
;

COMMIT;


-- 예약 조회 
-- 0. 상품 썸네일 : PRODUCT_NO으로 조회 해서 FILE에서 조회 해오기 (완)
-- 1. 생성 예정 : 예약 번호
-- 2. 주문처리 : 예약 테이블 (RESERVATION_STATE)
-- 3. 날짜 : PRODUCT_DT_NO으로 상품 조회 후 PRODUCT_DT 가져오기
-- 4. 상품 이름 : PRODUCT_NO으로 상품 조회 후 PRODUCT_NAME 가져오기
-- 5. 상품 가격 : 추가 예정
SELECT RESERVATION_NO, R.PRODUCT_NO, R.USER_NO, RESERVATION_STATE, R.PRODUCT_DT_NO,
    (SELECT FILE_PATH FROM "FILE" F 
    WHERE F.PRODUCT_NO = R.PRODUCT_NO
    AND F.FILE_ORDER = 1) AS FILE_PATH,
    (SELECT PD.PRODUCT_DT FROM PRODUCT_DT PD
    WHERE PD.PRODUCT_DT_NO = R.PRODUCT_DT_NO) AS PRODUCT_DT,
    (SELECT P.PRODUCT_NAME FROM PRODUCT P
    WHERE P.PRODUCT_NO = R.PRODUCT_NO) AS PRODUCT_NAME
FROM RESERVATION R
WHERE R.USER_NO = 25
ORDER BY PRODUCT_DT DESC
FETCH FIRST 3 ROWS ONLY
;

SELECT RESERVATION_NO, PRODUCT_NO, USER_NO, CREATE_DT, RESERVATION_STATE, PAYMENT_METHOD, GUEST_COUNT, PRODUCT_DT_NO, OPTION_NO, REQUEST_CONTENT, ORDER_NUMBER, TOTAL_PRICE, IMP_UID, CANCEL_REASON
FROM RESERVATION
WHERE USER_NO =25;

UPDATE RESERVATION
SET RESERVATION_STATE='D'
WHERE RESERVATION_NO=10;

COMMIT;

SELECT R.RESERVATION_NO, R.PRODUCT_NO, R.USER_NO, R.RESERVATION_STATE,
  R.PRODUCT_DT_NO, F.FILE_PATH, PD.PRODUCT_DT, P.PRODUCT_NAME
FROM RESERVATION R
  LEFT JOIN (SELECT PRODUCT_NO, FILE_PATH, FILE_ORDER,
    ROW_NUMBER() OVER (PARTITION BY PRODUCT_NO ORDER BY FILE_ORDER) AS RN
    FROM "FILE") F ON F.PRODUCT_NO = R.PRODUCT_NO AND F.RN = 1
  JOIN PRODUCT_DT PD ON PD.PRODUCT_DT_NO = R.PRODUCT_DT_NO
  JOIN PRODUCT P ON P.PRODUCT_NO = R.PRODUCT_NO
WHERE R.USER_NO = 25
ORDER BY PD.PRODUCT_DT DESC
FETCH FIRST 3 ROWS ONLY
;

SELECT PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT, PRODUCT_DT_AVAILABILITY
FROM PRODUCT_DT;

SELECT PRODUCT_NO, PRODUCT_NAME, PRODUCT_PACKAGE, PRODUCT_CONTENT, PRODUCT_PRICE, PRODUCT_ADD_PRICE, PRODUCT_MIN_TOURIST, PRODUCT_MAX_TOURIST, USER_NO, THEME_CODE, PRODUCT_STATE, CREATE_DT, GUIDE_LANGUAGE, VIEW_COUNT, REGION_NAME, TOUR_DURATION
FROM PRODUCT;

SELECT OPTION_NO, OPTION_NAME, OPTION_REST, PRODUCT_NO
FROM PRODUCT_OPTION;



-- 예약 수 카운트
SELECT COUNT(*)
FROM RESERVATION
WHERE USER_NO = 25
;

-- 구매자 예약 목록 더보기 (3개씩)
SELECT * FROM(
	SELECT ROW_NUMBER() OVER (ORDER BY PD.PRODUCT_DT DESC) AS NUM,
		RESERVATION_NO, R.PRODUCT_NO, R.USER_NO, RESERVATION_STATE, R.PRODUCT_DT_NO,
	    (SELECT FILE_PATH FROM "FILE" F 
	    WHERE F.PRODUCT_NO = R.PRODUCT_NO
	    AND F.FILE_ORDER = 1) AS FILE_PATH,
	    (SELECT PD.PRODUCT_DT FROM PRODUCT_DT PD
	    WHERE PD.PRODUCT_DT_NO = R.PRODUCT_DT_NO) AS PRODUCT_DT,
	    (SELECT P.PRODUCT_NAME FROM PRODUCT P
	    WHERE P.PRODUCT_NO = R.PRODUCT_NO) AS PRODUCT_NAME
	FROM RESERVATION R
	JOIN PRODUCT_DT PD ON (PD.PRODUCT_DT_NO = R.PRODUCT_DT_NO)
	WHERE R.USER_NO = 25
	ORDER BY PRODUCT_DT DESC
	)
	WHERE NUM > 3
	ORDER BY NUM
;

SELECT * FROM (
  SELECT
    ROW_NUMBER() OVER (ORDER BY PD.PRODUCT_DT DESC) AS NUM,
    R.RESERVATION_NO, R.PRODUCT_NO, R.USER_NO,
    R.RESERVATION_STATE, R.PRODUCT_DT_NO,
    F.FILE_PATH, TO_CHAR(PD.PRODUCT_DT, 'YYYY-MM-DD') PRODUCT_DT, P.PRODUCT_NAME
  FROM
    RESERVATION R
    JOIN PRODUCT_DT PD ON PD.PRODUCT_DT_NO = R.PRODUCT_DT_NO
    JOIN PRODUCT P ON P.PRODUCT_NO = R.PRODUCT_NO
    LEFT JOIN (
      SELECT PRODUCT_NO, FILE_PATH, FILE_ORDER,
        ROW_NUMBER() OVER (PARTITION BY PRODUCT_NO ORDER BY FILE_ORDER) AS RN
      FROM "FILE"
    ) F ON F.PRODUCT_NO = R.PRODUCT_NO AND F.RN = 1
  WHERE R.USER_NO = 25
  ORDER BY PD.PRODUCT_DT DESC
)
WHERE NUM > 3
ORDER BY NUM
;
  

-- 구매자 위시리스트 조회
-- 상품 이름, 상품 가격, 지역 이름, 패키지 박수(1박이면 total, 2박 이상이면 /per), 별점
-- productName, productPrice, regionName, productPackage(상품 패키지(1.당일 N. N박N-1일)), reviewStars
SELECT WISHLIST_NO, W.PRODUCT_NO, 
	(SELECT PRODUCT_NAME FROM PRODUCT P
	WHERE P.PRODUCT_NO = W.PRODUCT_NO) PRODUCT_NAME,
	(SELECT PRODUCT_PRICE FROM PRODUCT P
	WHERE P.PRODUCT_NO = W.PRODUCT_NO) PRODUCT_PRICE,
	(SELECT REGION_NAME FROM PRODUCT P
	WHERE P.PRODUCT_NO = W.PRODUCT_NO) REGION_NAME,
	(SELECT PRODUCT_PACKAGE FROM PRODUCT P
	WHERE P.PRODUCT_NO = W.PRODUCT_NO) PRODUCT_PACKAGE,
    (SELECT NVL(TO_CHAR(AVG(REVIEW_STARS), 'FM9.09'), '0.0') FROM REVIEW
	WHERE PRODUCT_NO = W.PRODUCT_NO) AS REVIEW_STARS,
	(SELECT PRODUCT_STATE FROM PRODUCT P
	WHERE P.PRODUCT_NO = W.PRODUCT_NO AND PRODUCT_STATE='N') PRODUCT_STATE
FROM WISHLIST W
WHERE W.USER_NO = 25
ORDER BY WISH_DT DESC
;

COMMIT;

SELECT USER_NO, BIRTH_YEAR, JOB, PETS, HOBBY, SUB_LANG, ABROAD_EXPERIENCE, MBTI, STRENGTH, FAVORITE_SONG, TMI, MAJOR, DOPAMINE, USELESS_TALENT, CAP_LIST
FROM PR;

-- 가이드 (자기소개)
SELECT USER_NAME, PROFILE_IMG, CREATE_DT, LANGUAGE_SKILL, SUPER_GUIDE_FL,
	(SELECT COUNT(*) FROM "REVIEW" R
	JOIN "PRODUCT" P USING(PRODUCT_NO)
	WHERE P.USER_NO = 23) REVIEW_COUNT, 
	(SELECT   
		NVL(TO_CHAR(AVG(REVIEW_STARS), 'FM9.09'), '0.0')
		FROM "REVIEW" R
		JOIN "PRODUCT" P USING(PRODUCT_NO)
		WHERE P.USER_NO = 23) STARS_AVERAGE
FROM "USER"
JOIN "GUIDE" USING(USER_NO)
WHERE USER_NO = 23
;

-- 가이드 판매 상품 조회
SELECT PRODUCT_NO, PRODUCT_NAME, PRODUCT_PACKAGE, PRODUCT_CONTENT, PRODUCT_PRICE, PRODUCT_ADD_PRICE, PRODUCT_MIN_TOURIST, PRODUCT_MAX_TOURIST, USER_NO, THEME_CODE, PRODUCT_STATE, CREATE_DT, GUIDE_LANGUAGE, VIEW_COUNT, REGION_NAME, TOUR_DURATION
FROM PRODUCT
WHERE USER_NO = 9;


SELECT PRODUCT_NO, PRODUCT_NAME, PRODUCT_PACKAGE, 
		PRODUCT_PRICE, GUIDE_LANGUAGE, REGION_NAME, NVL(TOUR_DURATION, 0) TOUR_DURATION,
	    (SELECT FILE_PATH FROM "FILE" F 
	    WHERE F.PRODUCT_NO = PRODUCT.PRODUCT_NO
	    AND F.FILE_ORDER = 1) AS THUMBNAIL
FROM PRODUCT
WHERE USER_NO = 9
AND PRODUCT_STATE = 'N'
ORDER BY CREATE_DT DESC
;
SELECT COUNT(*) 
FROM PRODUCT
WHERE USER_NO = 9
AND PRODUCT_STATE = 'N'
;

SELECT PRODUCT_DT_NO, TO_CHAR(PRODUCT_DT, 'YYYY-MM-DD') PRODUCT_DT
FROM PRODUCT_DT
WHERE PRODUCT_NO = 19
AND PRODUCT_DT_AVAILABILITY = 'Y'
ORDER BY PRODUCT_DT
;

SELECT * FROM "TOUR_COURSE"
WHERE PRODUCT_NO = 19
ORDER BY COURSE_ORDER
;

SELECT COURSE_NO, PRODUCT_NO, COURSE_NAME, COURSE_ORDER, BOSS_COURSE_FL
FROM TOUR_COURSE
;

-- 가이드 리뷰 조회
SELECT REVIEW_NO, REVIEW_MESSAGE, REVIEW_STARS
	  	, TO_CHAR(R.CREATE_DT, 'YYYY/MM/DD') CREATE_DT, PROFILE_IMG, USER_NAME
	   , PRODUCT_NAME, REVIEW_REPLY, PRODUCT_NO
FROM "REVIEW" R
JOIN "USER" U ON(R.USER_NO = U.USER_NO)
JOIN "PRODUCT" P USING (PRODUCT_NO)
WHERE U.USER_STATE = 'N'
AND P.USER_NO = 23
AND REVIEW_DEL_FL = 'N'
AND REVIEW_REPLY_DEL_FL = 'N'
ORDER BY 1 DESC
;

-- 가이드 리뷰 수 카운트
SELECT COUNT(*)  FROM "REVIEW" R
JOIN "PRODUCT" P USING(PRODUCT_NO)
WHERE P.USER_NO = 23
;



UPDATE REVIEW
SET REVIEW_REPLY='안녕하세요~ 좋은 후기 감사합니당!!안녕하세요~ 좋은 후기 감사합니당!!안녕하세요~ 좋은 후기 감사합니당!!안녕하세요~ 좋은 후기 감사합니당!! 안녕하세요~ 좋은 후기 감사합니당!!안녕하세요~ 좋은 후기 감사합니당!!안녕하세요~ 좋은 후기 감사합니당!!안녕하세요~ 좋은 후기 감사합니당!! 안녕하세요~ 좋은 후기 감사합니당!!안녕하세요~ 좋은 후기 감사합니당'
WHERE REVIEW_NO=14;

-- 가이드 리뷰 달기
-- 가이드 리뷰 답글 수정
UPDATE REVIEW
SET REVIEW_REPLY= '웅??'
WHERE REVIEW_NO=14
;

-- 가이드 리뷰 답글 삭제
UPDATE REVIEW
SET REVIEW_REPLY= ''
WHERE REVIEW_NO=14
;

SELECT REVIEW_NO, REVIEW_MESSAGE, REVIEW_STARS, REVIEW_DEL_FL, PRODUCT_NO, CREATE_DT, REVIEW_REPLY, REVIEW_REPLY_DEL_FL
FROM REVIEW
;
DELETE FROM REVIEW
WHERE REVIEW_NO=9;


COMMIT;

-- 가이드 리뷰 목록 더보기 (3개씩)
SELECT * FROM(
	SELECT ROW_NUMBER() OVER (ORDER BY REVIEW_NO DESC) AS NUM
			,REVIEW_NO, REVIEW_MESSAGE, REVIEW_STARS*20 REVIEW_STARS
		  	, TO_CHAR(R.CREATE_DT, 'YYYY/MM/DD') CREATE_DT, PROFILE_IMG, USER_NAME
		   , PRODUCT_NAME, REVIEW_REPLY, PRODUCT_NO
		FROM "REVIEW" R
		JOIN "USER" U ON(R.USER_NO = U.USER_NO)
		JOIN "PRODUCT" P USING (PRODUCT_NO)
		WHERE U.USER_STATE = 'N'
		AND P.USER_NO = 23
		AND REVIEW_DEL_FL = 'N'
		AND REVIEW_REPLY_DEL_FL = 'N'
		ORDER BY 1 DESC
	)
	WHERE NUM > 3
	ORDER BY NUM
	;


-- 가이드 상품 목록 더보기(3개씩)
SELECT * FROM(
	SELECT ROW_NUMBER() OVER (ORDER BY PRODUCT_NO DESC) AS NUM,
		PRODUCT_NO, PRODUCT_NAME, PRODUCT_PACKAGE, 
				PRODUCT_PRICE, GUIDE_LANGUAGE, REGION_NAME, NVL(TOUR_DURATION, 0) TOUR_DURATION,
			    (SELECT FILE_PATH FROM "FILE" F 
			    WHERE F.PRODUCT_NO = PRODUCT.PRODUCT_NO
			    AND F.FILE_ORDER = 1) AS THUMBNAIL
		FROM PRODUCT
		WHERE USER_NO = 9
		AND PRODUCT_STATE = 'N'
		ORDER BY CREATE_DT DESC
	)
	WHERE NUM > 3
	ORDER BY NUM
;

-- TO_CHAR(PRODUCT_DT, 'YYYY"년 "MM"월 "DD"일"') PRODUCT_DT,
-- 가이드 예약 리스트
SELECT RESERVATION_NO, R.PRODUCT_NO,  P.PRODUCT_NAME, P.PRODUCT_PACKAGE, 
		TO_CHAR(PRODUCT_DT, 'YYYY-MM-DD') PRODUCT_DT, P.TOUR_DURATION, 
		R.USER_NO, U.USER_NAME,
		RESERVATION_STATE, GUEST_COUNT, PO.OPTION_NAME,
		T.PRIMARY_LANGUAGE , T.FACE_IMG,
	   (SELECT FILE_PATH FROM "FILE" F 
	    WHERE F.PRODUCT_NO = R.PRODUCT_NO
	    AND F.FILE_ORDER = 1) AS THUMBNAIL
FROM RESERVATION R
RIGHT JOIN "USER" U ON (R.USER_NO = U.USER_NO)
RIGHT JOIN "TOURIST" T ON (R.USER_NO = T.USER_NO)
RIGHT JOIN "PRODUCT" P ON (P.PRODUCT_NO = R.PRODUCT_NO)
RIGHT JOIN "PRODUCT_DT" USING (PRODUCT_DT_NO)
RIGHT JOIN "PRODUCT_OPTION" PO USING (OPTION_NO)
WHERE  P.USER_NO = 23
ORDER BY RESERVATION_NO DESC
;

SELECT REVIEW_NO, REVIEW_MESSAGE, REVIEW_STARS
	  	, TO_CHAR(R.CREATE_DT, 'YYYY/MM/DD') CREATE_DT, PROFILE_IMG, USER_NAME
	   , PRODUCT_NAME, REVIEW_REPLY, PRODUCT_NO,

FROM "REVIEW" R
JOIN "USER" U ON(R.USER_NO = U.USER_NO)
JOIN "PRODUCT" P USING (PRODUCT_NO)
WHERE U.USER_STATE = 'N'
AND P.USER_NO = 23
AND REVIEW_DEL_FL = 'N'
AND REVIEW_REPLY_DEL_FL = 'N'
ORDER BY 1 DESC
;

SELECT RESERVATION_NO, PRODUCT_NO, USER_NO, CREATE_DT, RESERVATION_STATE, PAYMENT_METHOD, GUEST_COUNT, PRODUCT_DT_NO, OPTION_NO
FROM RESERVATION;

UPDATE RESERVATION
SET OPTION_NO=30
WHERE RESERVATION_NO=5;

COMMIT;

SELECT USER_NO, PASSPORT_NO, PRIMARY_LANGUAGE, EMERGENCY_CONTACT, FACE_IMG, COUNTRY_CODE
FROM TOURIST;


