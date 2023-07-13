/* 특정 상품 조회 */
SELECT PRODUCT_NO, PRODUCT_NAME, PRODUCT_PACKAGE, PRODUCT_CONTENT, PRODUCT_PRICE,
PRODUCT_ADD_PRICE, PRODUCT_MIN_TOURIST, PRODUCT_MAX_TOURIST, USER_NO,
THEME_CODE, PRODUCT_STATE, CREATE_DT, GUIDE_LANGUAGE, VIEW_COUNT, REGION_NAME, THEME_NAME, 
	(SELECT NVL(TO_CHAR(AVG(REVIEW_STARS), 'FM9.09'), '0.0') 
		FROM "REVIEW" 
		JOIN "PRODUCT" USING(PRODUCT_NO)
		WHERE PRODUCT_NO = 18) PRODUCT_RATING,
		
	(SELECT COUNT(*) FROM "REVIEW"
	WHERE PRODUCT_NO = 18) REVIEW_COUNT,
	
	(SELECT AVG(REVIEW_STARS)*20 REVIEW_STARS
		FROM "REVIEW" 
		JOIN "PRODUCT" USING(PRODUCT_NO)
		WHERE PRODUCT_NO = 18) REVIEW_PERCENTAGE
	
FROM "PRODUCT" P
JOIN "THEME" USING(THEME_CODE)
WHERE PRODUCT_NO = 18;

SELECT COUNT(*) FROM "REVIEW"
WHERE PRODUCT_NO = 15;

/* 특정 상품 리뷰 평균 조회 */
SELECT NVL(TO_CHAR(AVG(REVIEW_STARS), 'FM9.09'), '0.0') 
FROM "REVIEW" 
JOIN "PRODUCT" USING(PRODUCT_NO)
WHERE PRODUCT_NO = 18;

SELECT * FROM PRODUCT;


/* 특정 상품 리뷰 목록 조회 */
SELECT REVIEW_NO, R.USER_NO USER_NO, REVIEW_MESSAGE, REVIEW_STARS*20 REVIEW_STARS,
		REVIEW_DEL_FL, PRODUCT_NO, TO_CHAR(R.CREATE_DT, 'YYYY-MM-DD') CREATE_DT, PROFILE_IMG, USER_NAME 
FROM "REVIEW" R
JOIN "USER" U ON(R.USER_NO = U.USER_NO)
WHERE U.USER_STATE = 'N'
AND R.PRODUCT_NO = 4;

SELECT * FROM "USER";
SELECT * FROM "GUIDE";

/* 특정 상품 작성자 정보 조회 */
SELECT USER_NAME, PROFILE_IMG, CREATE_DT, LANGUAGE_SKILL, SUPER_GUIDE_FL
FROM "USER"
JOIN "GUIDE" USING(USER_NO)
WHERE USER_NO = 17;


SELECT * FROM PRODUCT WHERE PRODUCT_NO = 15;

/* 특정 상품 이미지 목록 조회 */
SELECT * FROM "FILE"
WHERE PRODUCT_NO = 15
ORDER BY FILE_ORDER;


/* 특정 가이드 작성된 후기 개수 */
SELECT COUNT(*)
FROM "REVIEW" R
JOIN "PRODUCT" P USING(PRODUCT_NO)
WHERE P.USER_NO = 23;

/* 특정 가이드 전체 평점 */
SELECT ROUND(AVG(REVIEW_STARS), 2) STARS_AVERAGE
FROM "REVIEW" R
JOIN "PRODUCT" P USING(PRODUCT_NO)
WHERE P.USER_NO = 23;


/* 가이드 프로필 정보 조회 */
SELECT (SELECT COUNT(*)
		FROM "REVIEW" R
		JOIN "PRODUCT" P USING(PRODUCT_NO)
		WHERE P.USER_NO = 23) REVIEW_COUNT, 
		(SELECT SUM(REVIEW_STARS)/COUNT(*)
		FROM "REVIEW" R
		JOIN "PRODUCT" P USING(PRODUCT_NO)
		WHERE P.USER_NO = 23) STARS_AVERAGE,
	
		<![CDATA[
	    CASE
	        WHEN SYSDATE - CREATE_DT < 30 THEN FLOOR(SYSDATE - CREATE_DT) || ',일'
	        WHEN SYSDATE - CREATE_DT < 365 THEN FLOOR((SYSDATE - CREATE_DT) / 30) || ',개월'
	        ELSE FLOOR((SYSDATE - CREATE_DT) / 365) || ',년'
	    END CAREER_DT
     	]]>
FROM "USER"
WHERE USER_NO = 23;


/* 특정 상품 작성자 정보 조회 + 가이드 프로필 정보 조회 */
SELECT USER_NAME, PROFILE_IMG, CREATE_DT, LANGUAGE_SKILL, SUPER_GUIDE_FL,
		(SELECT COUNT(*)
				FROM "REVIEW" R
				JOIN "PRODUCT" P USING(PRODUCT_NO)
				WHERE P.USER_NO = 23) REVIEW_COUNT, 
		(SELECT   
		NVL(TO_CHAR(AVG(REVIEW_STARS), 'FM9.09'), '0.0')
		FROM "REVIEW" R
		JOIN "PRODUCT" P USING(PRODUCT_NO)
		WHERE P.USER_NO = 6) STARS_AVERAGE,
		
	    CASE
	        WHEN SYSDATE - CREATE_DT < 30 THEN FLOOR(SYSDATE - CREATE_DT) || ',일'
	        WHEN SYSDATE - CREATE_DT < 365 THEN FLOOR((SYSDATE - CREATE_DT) / 30) || ',개월'
	        ELSE FLOOR((SYSDATE - CREATE_DT) / 365) || ',년'
	    END CAREER_DT
     	
FROM "USER"
JOIN "GUIDE" USING(USER_NO)
WHERE USER_NO = 17;


/* 별점 소수점으로 통일 */
SELECT   
NVL(TO_CHAR(AVG(REVIEW_STARS), 'FM9.09'), '0.0')
FROM "REVIEW" R
JOIN "PRODUCT" P USING(PRODUCT_NO)
WHERE P.USER_NO = 6;


SELECT * FROM TOUR_COURSE;

SELECT COUNT(*) 
FROM WISHLIST
WHERE USER_NO = 18
AND PRODUCT_NO = 15;


/* 관심 상품 등록 수 조회 */
SELECT PRODUCT_NO, COUNT(USER_NO) AS WISH_COUNT
FROM WISHLIST
GROUP BY PRODUCT_NO
ORDER BY WISH_COUNT DESC;


/* 예약 가능한 일정(날짜)인지 확인 */
SELECT COUNT(*) FROM "PRODUCT_DT"
WHERE PRODUCT_NO = 18
AND PRODUCT_DT = '2023-07-05'
AND PRODUCT_DT_AVAILABILITY = 'Y';


/* 선택한 옵션 정보 조회 */
SELECT * FROM PRODUCT_OPTION
WHERE OPTION_NO = 3;




/* 인기상품 랜덤으로 조회 */
SELECT * FROM "PRODUCT"
WHERE PRODUCT_NO IN(
	SELECT PRODUCT_NO
	FROM (
		  SELECT USER_NO, PRODUCT_NO, COUNT(*)
		  FROM "WISHLIST"
		  GROUP BY USER_NO, PRODUCT_NO
		  ORDER BY COUNT(*) DESC
		)
	WHERE ROWNUM <= 10
	ORDER BY DBMS_RANDOM.VALUE
	FETCH FIRST 4 ROWS ONLY
);


-- 인기상품 랜덤 조회 상위 10개 중 랜덤 4개 조회
SELECT * FROM "PRODUCT"
WHERE PRODUCT_STATE = 'N'
AND PRODUCT_NO IN (
		SELECT PRODUCT_NO 
		FROM(SELECT PRODUCT_NO, COUNT(USER_NO) WISH_COUNT 
			FROM "WISHLIST"
			GROUP BY PRODUCT_NO
			ORDER BY WISH_COUNT DESC)
)AND ROWNUM <= 10
ORDER BY DBMS_RANDOM.VALUE
FETCH FIRST 4 ROWS ONLY;




/* 추천 상품 조회 - 가이드 언어 일치하는 상품 랜덤으로 4개 */
SELECT PRODUCT_NO, PRODUCT_NAME
FROM (SELECT *
	  FROM "PRODUCT"
	  WHERE GUIDE_LANGUAGE = (
		SELECT PRIMARY_LANGUAGE 
		FROM "TOURIST" 
		WHERE USER_NO = 4 AND PRODUCT_STATE = 'N')
	  ORDER BY DBMS_RANDOM.VALUE)
WHERE ROWNUM <= 4;

SELECT * FROM "PRODUCT"
WHERE PRODUCT_STATE = 'D';


-- 예약 내역 조회
SELECT R.USER_NO, RESERVATION_NO, R.PRODUCT_NO, R.CREATE_DT, RESERVATION_STATE, 
PAYMENT_METHOD, GUEST_COUNT, R.PRODUCT_DT_NO, OPTION_NO, REQUEST_CONTENT, ORDER_NUMBER, TOTAL_PRICE,
USER_NAME, USER_TEL,TO_CHAR(PRODUCT_DT, 'YYYY-MM-DD') PRODUCT_DT, OPTION_NAME
FROM "RESERVATION" R
JOIN "USER" U ON(R.USER_NO=U.USER_NO)
JOIN "PRODUCT_DT" PD ON(R.PRODUCT_DT_NO= PD.PRODUCT_DT_NO) 
JOIN "PRODUCT_OPTION" USING(OPTION_NO) 
WHERE ORDER_NUMBER = '20230705-542802';


SELECT * FROM RESERVATION
WHERE ORDER_NUMBER = '20230705-542802';

SELECT * FROM RESERVATION;

-- 예약 옵션 추가
UPDATE "RESERVATION"
SET OPTION_NO = 21
WHERE RESERVATION_NO = 15;


-- 상품 옵션 여분 업데이트
UPDATE "PRODUCT_OPTION"
SET OPTION_REST = OPTION_REST - 1
WHERE OPTION_NO = 21;

SELECT * FROM "PRODUCT";
SELECT * FROM "PRODUCT_OPTION";


-- 1박의 경우 예약 완료 시 구매 가능 옵션(시간대) 수량 업데이트
UPDATE "PRODUCT_OPTION"
SET OPTION_REST = OPTION_REST-1
WHERE OPTION_NO = 21;

-- N박의 경우 예약 완료 시 구매 가능 일정(날짜) 업데이트
UPDATE "PRODUCT_DT"
SET PRODUCT_DT_AVAILABILITY = 'N'
WHERE PRODUCT_DT_NO = #{productDateNo};


SELECT * FROM PRODUCT_DT;


-- 1박인 경우 if(productPackage==1)
SELECT COUNT(*) FROM PRODUCT_DT
LEFT JOIN PRODUCT_OPTION USING(PRODUCT_NO)
WHERE PRODUCT_DT_AVAILABILITY = 'Y'
AND OPTION_NO = 20
AND OPTION_REST >= 10;


SELECT COUNT(*) FROM PRODUCT_DT
LEFT JOIN PRODUCT_OPTION USING(PRODUCT_NO)
WHERE PRODUCT_DT_AVAILABILITY = 'Y'
AND OPTION_NO = #{optionNo}
AND OPTION_REST >= #{guestCount};

-- 1박 이상인 경우 if(productPackage>=1)
SELECT COUNT(*) FROM PRODUCT_DT
WHERE PRODUCT_DT_AVAILABILITY = 'Y'
AND PRODUCT_DT_NO = 50;

SELECT COUNT(*) FROM PRODUCT_DT
WHERE PRODUCT_DT_AVAILABILITY = 'Y'
AND PRODUCT_DT_NO = #{productDateNo};


-- 얼굴 인증 사진 업데이트
UPDATE TOURIST
SET FACE_IMG = #{faceImg}
WHERE USER_NO = #{userNo};


SELECT * FROM PRODUCT_OPTION;


SELECT * FROM RESERVATION;

-- 특정 상품 예약 가능 날짜(일정) 조회
SELECT * FROM "PRODUCT_DT"
WHERE PRODUCT_NO = 16
AND PRODUCT_DT_AVAILABILITY = 'Y';


-- 캘린더 날짜 불러오기
SELECT PRODUCT_DT_NO, PRODUCT_NO, TO_CHAR(PRODUCT_DT, 'YYYY-MM-DD') PRODUCT_DT, PRODUCT_DT_AVAILABILITY  
FROM "PRODUCT_DT"
WHERE PRODUCT_NO = 16
AND PRODUCT_DT_AVAILABILITY = 'Y'
AND EXTRACT(YEAR FROM PRODUCT_DT) = 2023
AND EXTRACT (MONTH FROM PRODUCT_DT) = 8;

DELETE 
FROM PRODUCT_DT
WHERE PRODUCT_DT_NO = 25;


SELECT * FROM PRODUCT_OPTION;

SELECT * FROM PRODUCT_DT
LEFT JOIN PRODUCT USING(PRODUCT_NO)
WHERE PRODUCT_PACKAGE = 1;



SELECT * FROM "PRODUCT_DT"
JOIN PRODUCT USING(PRODUCT_NO);

SELECT * FROM PRODUCT_OPTION;

SELECT * FROM PRODUCT_DT;

SELECT * FROM RESERVATION;


SELECT * FROM PRODUCT_OPTION WHERE PRODUCT_NO = 16;

INSERT INTO PRODUCT_OPTION (OPTION_NO, OPTION_NAME, OPTION_REST, PRODUCT_NO, PRODUCT_DT_NO)
VALUES(SEQ_OPTION_NO.NEXTVAL, '옵션=시간대', 상품의 PRODUCT_MAX_TOURIST 컬럼 값, 상품 번호,  PRODUCT_DT 테이블의 번호=날짜,일정);


-- 날짜 선택 시 옵션 불러오기
SELECT OPTION_NO, OPTION_NAME, OPTION_REST, PO.PRODUCT_NO, PRODUCT_DT_NO 
FROM "PRODUCT_OPTION" PO
LEFT JOIN "PRODUCT_DT" PD USING(PRODUCT_DT_NO)
WHERE PO.PRODUCT_NO = 19
AND PRODUCT_DT = '2023-06-23'
ORDER BY OPTION_NAME;

SELECT * FROM TOURIST;

SELECT * FROM PRODUCT_OPTION
WHERE OPTION_NO = 92;


/* 특정 상품 메인코스 조회 */
SELECT COURSE_NAME FROM TOUR_COURSE 
WHERE PRODUCT_NO = 18
AND BOSS_COURSE_FL = 'Y';

SELECT * FROM RESERVATION
WHERE RESERVATION_NO  = 10;



/* 예약 조회 */
SELECT R.USER_NO, RESERVATION_NO, R.PRODUCT_NO, R.CREATE_DT, RESERVATION_STATE, 
PAYMENT_METHOD, GUEST_COUNT, R.PRODUCT_DT_NO, R.OPTION_NO, REQUEST_CONTENT, ORDER_NUMBER, TOTAL_PRICE,
USER_NAME, USER_TEL, TO_CHAR(PRODUCT_DT, 'YYYY-MM-DD') PRODUCT_DT, IMP_UID, CANCEL_REASON, OPTION_NAME
FROM "RESERVATION" R
JOIN "USER" U ON (R.USER_NO = U.USER_NO)
JOIN "PRODUCT_DT" PD ON (R.PRODUCT_DT_NO = PD.PRODUCT_DT_NO)
LEFT JOIN "PRODUCT_OPTION" PO ON (R.OPTION_NO = PO.OPTION_NO)
WHERE RESERVATION_NO = 10 AND (R.OPTION_NO IS NULL OR PO.OPTION_NO IS NOT NULL);


SELECT * FROM RESERVATION
JOIN PRODUCT USING(PRODUCT_NO)
WHERE PRODUCT_PACKAGE > 1;

SELECT * FROM PRODUCT_DT
WHERE PRODUCT_DT = '2023-07-05';

SELECT * FROM PRODUCT_DT
WHERE PRODUCT_NO = 21;

SELECT * FROM PRODUCT
WHERE PRODUCT_NO = 21;


SELECT * FROM TOUR_COURSE 
WHERE PRODUCT_NO = 19;

UPDATE TOUR_COURSE 
SET LATITUDE = '35.1585232170784',
LONGITUDE = '129.159854668484'
WHERE COURSE_NO = 48;

SELECT * FROM TOUR_COURSE;
ALTER TABLE TOUR_COURSE  ADD NEW_LATITUDE NUMBER(38, 20);

UPDATE TOUR_COURSE SET NEW_LATITUDE = LATITUDE;

ALTER TABLE TOUR_COURSE DROP COLUMN LATITUDE;
ALTER TABLE TOUR_COURSE DROP COLUMN LONGITUDE;
ALTER TABLE TOUR_COURSE RENAME COLUMN NEW_LONGITUDE TO LONGITUDE;
ALTER TABLE TOUR_COURSE RENAME COLUMN NEW_LATITUDE TO LATITUDE;


SELECT * FROM TOUR_COURSE;

SELECT * FROM RESERVATION
JOIN PRODUCT USING(PRODUCT_NO);


SELECT RESERVATION_NO, R.PRODUCT_NO PRODUCT_NO, R.USER_NO USER_NO, P.USER_NO GUIDE_NO, R.CREATE_DT CREATE_DT, RESERVATION_STATE, PAYMENT_METHOD, GUEST_COUNT, PRODUCT_DT_NO, OPTION_NO,
REQUEST_CONTENT, ORDER_NUMBER, TOTAL_PRICE, IMP_UID, CANCEL_REASON FROM "RESERVATION" R
LEFT JOIN "PRODUCT" P ON(R.PRODUCT_NO = P.PRODUCT_NO);

		SELECT R.USER_NO, P.USER_NO GUIDE_NO, RESERVATION_NO, R.PRODUCT_NO, R.CREATE_DT, RESERVATION_STATE, 
		PAYMENT_METHOD, GUEST_COUNT, R.PRODUCT_DT_NO, R.OPTION_NO, OPTION_NAME, REQUEST_CONTENT, ORDER_NUMBER, TOTAL_PRICE,
		USER_NAME, USER_TEL,TO_CHAR(PRODUCT_DT, 'YYYY-MM-DD') PRODUCT_DT, OPTION_NAME, IMP_UID, CANCEL_REASON,
		(SELECT FACE_IMG FROM "TOURIST" WHERE USER_NO = R.USER_NO) FACE_IMG,
		(SELECT PRIMARY_LANGUAGE FROM "TOURIST" WHERE USER_NO = R.USER_NO) PRIMARY_LANGUAGE, P.PRODUCT_NAME,
		(SELECT FILE_PATH FROM "FILE" WHERE PRODUCT_NO = P.PRODUCT_NO AND FILE_ORDER = 1) THUMB_NAIL, 
		(SELECT EMERGENCY_CONTACT FROM "TOURIST" WHERE USER_NO = R.USER_NO) EMERGENCY_CONTACT
		FROM "RESERVATION" R
		JOIN "USER" U ON(R.USER_NO=U.USER_NO)
		JOIN "PRODUCT_DT" PD ON(R.PRODUCT_DT_NO= PD.PRODUCT_DT_NO)
		JOIN "PRODUCT" P ON (P.PRODUCT_NO = R.PRODUCT_NO)
		LEFT JOIN "PRODUCT_OPTION" PO ON(R.OPTION_NO=PO.OPTION_NO)
	    WHERE RESERVATION_NO = 18;
	   
	  


SELECT FILE_PATH FROM "FILE"
WHERE PRODUCT_NO  = 18
ORDER BY FILE_ORDER;



SELECT COUNT(*) FROM "PRODUCT_OPTION"
WHERE PRODUCT_DT_NO = 36
AND OPTION_REST > 0;

SELECT * FROM "PRODUCT_DT"
WHERE PRODUCT_DT_NO = 36;


-- 특정 상품 일정 구매 가능하도록 업데이트
UPDATE "PRODUCT_DT"
SET PRODUCT_DT_AVAILABILITY = 'Y'
WHERE PRODUCT_DT_NO = 36;

-- PRODUCT_DT의 모든 일정 조회 후 PRODUCT_DT_AVAILABILITY가 하나라도 'Y' 인 경우
SELECT COUNT(*) FROM "PRODUCT_DT"
WHERE PRODUCT_NO = 19
AND PRODUCT_DT_AVAILABILITY = 'Y';

SELECT * FROM "PRODUCT_DT"
WHERE PRODUCT_DT < SYSDATE;

SELECT * FROM PRODUCT_DT;

UPDATE PRODUCT_DT 
SET PRODUCT_DT_AVAILABILITY = 'N'
WHERE PRODUCT_DT_NO IN (SELECT PRODUCT_DT_NO FROM RESERVATION
LEFT JOIN PRODUCT USING(PRODUCT_NO)
WHERE PRODUCT_PACKAGE != 1);


SELECT COUNT(*) FROM "PRODUCT_DT"
WHERE PRODUCT_NO = 273
AND PRODUCT_DT_AVAILABILITY = 'Y';

SELECT * FROM "PRODUCT"
JOIN PRODUCT_DT USING(PRODUCT_NO)
WHERE PRODUCT_DT_AVAILABILITY = 'N';

SELECT * FROM PRODUCT_DT;

UPDATE PRODUCT
SET PRODUCT_STATE = 'E'
WHERE PRODUCT_NO IN (266, 267,18, 19, 21, 22);

SELECT * FROM "USER"
WHERE USER_NO = 5;

INSERT INTO "QNA"
VALUES(SEQ_QNA_NO.NEXTVAL, #{qnaEmail}, DEFAULT, DEFAULT, #{userNo}, #{qnaTitle}, #{qnaContent}, NULL, DEFAULT);

SELECT * FROM "QNA";
SELECT * FROM "FILE" 
WHERE QNA_NO = 35;

DELETE FROM "FILE"
WHERE QNA_NO IN (33, 34);
DELETE FROM "QNA"
WHERE QNA_NO IN (33, 34);
COMMIT;

SELECT * FROM "USER"
WHERE USER_NO = 15;
SELECT * FROM "FILE";
SELECT * FROM "QNA";

SELECT * FROM "PRODUCT"
WHERE USER_NO = 15;

SELECT * FROM PRODUCT_DT 
WHERE PRODUCT_NO = 13;

SELECT * FROM NOTIFICATION
WHERE NOTIFICATION_NO = 234;
SELECT * FROM PRODUCT
WHERE PRODUCT_NO = 313;

SELECT USER_NO, USER_EMAIL, USER_STATE, LANGUAGE_SKILL, ACTIVITY_AREA FROM "USER"
JOIN GUIDE  USING(USER_NO);

SELECT * FROM PRODUCT 
WHERE USER_NO = 17;


SELECT * FROM "USER"
WHERE USER_NO = 19;
SELECT * FROM TOURIST
WHERE USER_NO = 18;

SELECT * FROM "USER";

