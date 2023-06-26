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
	   , PRODUCT_NAME, REVIEW_REPLY
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
		   , PRODUCT_NAME, REVIEW_REPLY
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