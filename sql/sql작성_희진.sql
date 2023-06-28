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

SELECT PRODUCT_ADD_PRICE FROM PRODUCT;

SELECT * FROM "USER";
SELECT * FROM PRODUCT_OPTION;
SELECT * FROM PRODUCT;

SELECT COURSE_NAME FROM TOUR_COURSE
WHERE PRODUCT_NO = 13
AND BOSS_COURSE_FL = 'Y';


UPDATE TOURIST
SET COUNTRY_CODE = 'JP'
WHERE USER_NO = 19;


SELECT * FROM TOUR_COURSE
WHERE PRODUCT_NO = 90;


SELECT * FROM "PRODUCT";

 