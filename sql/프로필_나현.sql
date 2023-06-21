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