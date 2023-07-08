-- 계정 정보 확인
SELECT "USER_PASSWORD" FROM "USER" WHERE "USER_EMAIL" = 'tourist04@gmail.com' AND "USER_STATE" = 'N';

UPDATE "USER" SET "USER_STATE" = 'N' WHERE "USER_EMAIL" = 'tourist04@gmail.com' ;

COMMIT;


--비번들
SELECT "USER_EMAIL", "USER_PASSWORD" FROM "USER";

-- 투어리스트 회원가입(이메일,비번,이름,전화번호,비상연락처,여권번호,주사용언어)
-- 버려 
DECLARE temp_no NUMBER;
BEGIN
  SELECT SEQ_USER_NO.NEXTVAL INTO temp_no FROM DUAL;
  INSERT INTO "USER" VALUES (temp_no, 'test00@gmail.com', 'pass00', 'name', '00001111', NULL, SYSDATE, 'T', 'N');
  INSERT INTO "TOURIST" VALUES (temp_no, 'passport','English','emergency_contact',NULL, 'ko');
END;
--
DELETE FROM "GUIDE" WHERE USER_NO = 46;
DELETE FROM "TOURIST" WHERE USER_NO = 45;
DELETE FROM "USER" WHERE USER_NO = 46;

