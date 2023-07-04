-- 상품
CREATE TABLE "PRODUCT" (
	"PRODUCT_NO"	NUMBER		NOT NULL,
	"PRODUCT_NAME"	VARCHAR2(255)		NOT NULL,
	"PRODUCT_PACKAGE"	NUMBER		NOT NULL,
	"PRODUCT_CONTENT"	CLOB		NOT NULL,
	"PRODUCT_PRICE"	NUMBER		NOT NULL,
	"PRODUCT_ADD_PRICE"	VARCHAR2(1000)		NULL,
	"PRODUCT_MIN_TOURIST"	NUMBER		NOT NULL,
	"PRODUCT_MAX_TOURIST"	NUMBER		NOT NULL,
	"USER_NO"	NUMBER		NOT NULL,
	"REGION_NAME" VARCHAR2(100) NOT NULL,
	"THEME_CODE"	NUMBER		NOT NULL,
	"PRODUCT_STATE"	CHAR(1)	DEFAULT 'N'	NOT NULL CONSTRAINT PRODUCT_STATE_CHK CHECK(PRODUCT_STATE IN('N','B','D')),
	"CREATE_DT"	DATE	DEFAULT SYSDATE	NOT NULL,
	"GUIDE_LANGUAGE"	VARCHAR2(20)		NOT NULL,
	"VIEW_COUNT"	NUMBER	DEFAULT 0	NOT NULL,
	"TOUR_DURATION" NUMBER NULL
);

COMMENT ON COLUMN "PRODUCT"."PRODUCT_NO" IS '상품 번호(SEQ_PRODUCT_NO)';

COMMENT ON COLUMN "PRODUCT"."PRODUCT_NAME" IS '상품명';

COMMENT ON COLUMN "PRODUCT"."PRODUCT_PACKAGE" IS '상품 패키지(1. 당일, N. N-1박 N일)';

COMMENT ON COLUMN "PRODUCT"."PRODUCT_CONTENT" IS '상품 상세 내용';

COMMENT ON COLUMN "PRODUCT"."PRODUCT_PRICE" IS '상품 가격';

COMMENT ON COLUMN "PRODUCT"."PRODUCT_ADD_PRICE" IS '추가비용';

COMMENT ON COLUMN "PRODUCT"."PRODUCT_MIN_TOURIST" IS '최소 인원';

COMMENT ON COLUMN "PRODUCT"."PRODUCT_MAX_TOURIST" IS '최대 인원';

COMMENT ON COLUMN "PRODUCT"."USER_NO" IS '작성 회원 번호(SEQ_USER_NO)';

COMMENT ON COLUMN "PRODUCT"."THEME_CODE" IS '테마 코드(SEQ_THEME_CODE)';

COMMENT ON COLUMN "PRODUCT"."PRODUCT_STATE" IS '게시글 상태 (N: 정상, B : 블라인드, D: 삭제)';

COMMENT ON COLUMN "PRODUCT"."CREATE_DT" IS '작성 일자';

COMMENT ON COLUMN "PRODUCT"."GUIDE_LANGUAGE" IS '가이드 지원 언어';

COMMENT ON COLUMN "PRODUCT"."VIEW_COUNT" IS '조회수';

COMMENT ON COLUMN "PRODUCT"."REGION_NAME" IS '지역명';

COMMENT ON COLUMN "PRODUCT"."TOUR_DURATION" IS '1Day투어 진행 시간';



SELECT * FROM PRODUCT;


-- 알림
CREATE TABLE "NOTIFICATION" (
	"NOTIFICATION_NO"	NUMBER		NOT NULL,
	"RECEIVER_NO"	NUMBER		NOT NULL,
	"SENDER_NO"	NUMBER		NOT NULL,
	"NOTIFICATION_CONTENT"	VARCHAR2(1000)		NOT NULL,
	"CREATE_DT"	DATE		NOT NULL,
	"NOTIFICATION_URL"	VARCHAR2(100)		NULL,
	"NOTIFICATION_TYPE"	CHAR(1)		NOT NULL CONSTRAINT NOTIFICATION_TYPE_CHK CHECK(NOTIFICATION_TYPE IN('C','L','O', 'R'))
);

COMMENT ON COLUMN "NOTIFICATION"."NOTIFICATION_NO" IS '알림 번호(SEQ_NOTICE_NO)';

COMMENT ON COLUMN "NOTIFICATION"."RECEIVER_NO" IS '회원 번호(SEQ_USER_NO)';

COMMENT ON COLUMN "NOTIFICATION"."SENDER_NO" IS '회원 번호(SEQ_USER_NO)';

COMMENT ON COLUMN "NOTIFICATION"."NOTIFICATION_CONTENT" IS '알림 내용';

COMMENT ON COLUMN "NOTIFICATION"."CREATE_DT" IS '알림 생성 시간';

COMMENT ON COLUMN "NOTIFICATION"."NOTIFICATION_URL" IS '연결 주소';

COMMENT ON COLUMN "NOTIFICATION"."NOTIFICATION_TYPE" IS '알림 유형 (C:채팅, L: 관심상품등록, O: 예약, R: 후기)';


-- 1:1 문의
CREATE TABLE "QNA" (
	"QNA_NO"	NUMBER		NOT NULL,
	"QNA_EMAIL"	VARCHAR2(255)		NOT NULL,
	"QNA_TITLE"	VARCHAR2(300)		NOT NULL,
	"QNA_CONTENT"	VARCHAR2(3000)		NOT NULL,
	"QNA_DATE"	VARCHAR2(100)	DEFAULT SYSDATE	NOT NULL,
	"QNA_DEL_FL"	CHAR(1)	DEFAULT 'N'	NOT NULL CONSTRAINT QNA_DEL_FL_CHK CHECK(QNA_DEL_FL IN('N','Y')),
	"QNA_CHECK_FL"	CHAR(1)	DEFAULT 'N'	NOT NULL CONSTRAINT QNA_CHECK_FL_CHK CHECK(QNA_CHECK_FL IN('N','Y')),
	"USER_NO"	NUMBER		NULL,
	"QNA_ANSWER"	VARCHAR2(3000)	NULL
);

COMMENT ON COLUMN "QNA"."QNA_NO" IS '문의사항 번호(SEQ_QNA_NO)';

COMMENT ON COLUMN "QNA"."QNA_EMAIL" IS '문의 작성자 이메일 (회원 : 가입한 이메일 / 비회원 : 입력한 이메일)';

COMMENT ON COLUMN "QNA"."QNA_TITLE" IS '문의제목';

COMMENT ON COLUMN "QNA"."QNA_CONTENT" IS '문의 내용';

COMMENT ON COLUMN "QNA"."QNA_DATE" IS '문의  날짜';

COMMENT ON COLUMN "QNA"."QNA_DEL_FL" IS '문의 삭제 여부 (N: 미삭제, Y:삭제)';

COMMENT ON COLUMN "QNA"."QNA_CHECK_FL" IS '문의 처리 여부 (N: 미처리, Y: 처리완료)';

COMMENT ON COLUMN "QNA"."USER_NO" IS '회원 번호(SEQ_USER_NO)';

COMMENT ON COLUMN "QNA"."QNA_ANSWER" IS '문의 답변';



-- 관심 상품
CREATE TABLE "WISHLIST" (
	"WISHLIST_NO"	NUMBER		NOT NULL,
	"USER_NO"	NUMBER		NOT NULL,
	"PRODUCT_NO"	NUMBER		NOT NULL,
	"WISH_DT"	DATE	DEFAULT SYSDATE	NOT NULL
);

COMMENT ON COLUMN "WISHLIST"."WISHLIST_NO" IS '관심상품 번호(SEQ_WISHLIST_NO)';

COMMENT ON COLUMN "WISHLIST"."USER_NO" IS '회원 번호(SEQ_USER_NO)';

COMMENT ON COLUMN "WISHLIST"."PRODUCT_NO" IS '상품 번호(SEQ_PRODUCT_NO)';

COMMENT ON COLUMN "WISHLIST"."WISH_DT" IS '관심 상품 등록 날짜';



-- 예약
CREATE TABLE "RESERVATION" (
	"RESERVATION_NO"	NUMBER		NOT NULL,
	"PRODUCT_NO"	NUMBER		NOT NULL,
	"USER_NO"	NUMBER		NOT NULL,
	"CREATE_DT"	DATE	DEFAULT SYSDATE	NOT NULL,
	"RESERVATION_STATE"	CHAR(1)	DEFAULT 'Y'	NOT NULL CONSTRAINT RESERVATION_STATE_CHK CHECK(RESERVATION_STATE IN('N','Y', 'D')),
	"PAYMENT_METHOD"	CHAR(1)		NOT NULL CONSTRAINT PAYMENT_METHOD_CHK CHECK(PAYMENT_METHOD IN('C','P')),
	"GUEST_COUNT"	NUMBER		NOT NULL,
	"RESERVATION_DT"	VARCHAR2(50)		NOT NULL,
	"OPTION_NO"	NUMBER,
	"REQUEST_CONTENT"	VARCHAR2(600)		NULL,
	"ORDER_NUMBER"	CHAR(15)		NOT NULL,
	"TOTAL_PRICE"	NUMBER NOT NULL
);

COMMENT ON COLUMN "RESERVATION"."RESERVATION_NO" IS '예약 번호(SEQ_RESERVATION_NO)';

COMMENT ON COLUMN "RESERVATION"."PRODUCT_NO" IS '상품 번호(SEQ_PRODUCT_NO)';

COMMENT ON COLUMN "RESERVATION"."USER_NO" IS '회원 번호(SEQ_USER_NO)';

COMMENT ON COLUMN "RESERVATION"."CREATE_DT" IS '예약(주문) 일자';

COMMENT ON COLUMN "RESERVATION"."RESERVATION_STATE" IS '주문 처리 상태 (Y: 에약 완료, N: 예약 취소, D: 구매확정완료)';

COMMENT ON COLUMN "RESERVATION"."PAYMENT_METHOD" IS '결제수단 (C: 신용카드, P:페이팔)';

COMMENT ON COLUMN "RESERVATION"."GUEST_COUNT" IS '인원 수';

COMMENT ON COLUMN "RESERVATION"."RESERVATION_DT" IS '선택한 상품 일정 옵션';

COMMENT ON COLUMN "RESERVATION"."OPTION_NO" IS '선택한 옵션(시간) 번호(SEQ_OPTION_NO)';

COMMENT ON COLUMN "RESERVATION"."REQUEST_CONTENT" IS '예약 시 요청 사항';

COMMENT ON COLUMN "RESERVATION"."ORDER_NUMBER" IS '주문 번호 (날짜-랜덤6자리숫자)';

COMMENT ON COLUMN "RESERVATION"."TOTAL_PRICE" IS '총 주문 금액';

-- 리뷰
CREATE TABLE "REVIEW" (
	"REVIEW_NO"	NUMBER		NOT NULL,
	"USER_NO"	NUMBER		NOT NULL,
	"REVIEW_MESSAGE"	VARCHAR2(600)		NOT NULL,
	"REVIEW_STARS"	NUMBER		NOT NULL,
	"REVIEW_DEL_FL"	CHAR(1)	DEFAULT 'N'	NOT NULL CONSTRAINT REVIEW_DEL_FL_CHK CHECK(REVIEW_DEL_FL IN('N','Y')),
	"PRODUCT_NO"	NUMBER		NOT NULL,
	"CREATE_DT"	DATE	DEFAULT SYSDATE	NOT NULL
);

COMMENT ON COLUMN "REVIEW"."REVIEW_NO" IS '리뷰 번호(SEQ_REVIEW_NO)';

COMMENT ON COLUMN "REVIEW"."USER_NO" IS '작성 회원 번호(SEQ_USER_NO)';

COMMENT ON COLUMN "REVIEW"."REVIEW_MESSAGE" IS '리뷰 메세지';

COMMENT ON COLUMN "REVIEW"."REVIEW_STARS" IS '별점(0~10 => 1당 0.5.점씩 총 5점)';

COMMENT ON COLUMN "REVIEW"."REVIEW_DEL_FL" IS '리뷰 삭제 여부(N: 삭제X,  Y: 삭제O)';

COMMENT ON COLUMN "REVIEW"."PRODUCT_NO" IS '상품 번호(SEQ_PRODUCT_NO)';

COMMENT ON COLUMN "REVIEW"."CREATE_DT" IS '리뷰 작성 일자';



-- 이벤트
DROP TABLE "EVENT";

CREATE TABLE "EVENT" (
	"EVENT_NO"	NUMBER		NOT NULL,
	"EVENT_NAME"	VARCHAR2(255)		NOT NULL,
	"EVENT_CONTENT"	VARCHAR2(3000)		NOT NULL,
	"EVENT_END_DT"	DATE		NOT NULL,
	"CREATE_DT"	DATE		NOT NULL,
	"EVENT_STATE"	CHAR(1)	DEFAULT 'N'	NOT NULL,
	"BG_COLOR"	VARCHAR2(20)		NULL,
	"MAIN_BANNER_ORDER"	NUMBER		NULL
);

COMMENT ON COLUMN "EVENT"."EVENT_NO" IS '이벤트 번호(SEQ_EVENT_NO)';

COMMENT ON COLUMN "EVENT"."EVENT_NAME" IS '이벤트명';

COMMENT ON COLUMN "EVENT"."EVENT_CONTENT" IS '이벤트 상세 내용';

COMMENT ON COLUMN "EVENT"."EVENT_END_DT" IS '이벤트 종료 기간';

COMMENT ON COLUMN "EVENT"."CREATE_DT" IS '이벤트 작성 일자';

COMMENT ON COLUMN "EVENT"."EVENT_STATE" IS '이벤트 상태(N:일반, B:블라인드, D:삭제)';

COMMENT ON COLUMN "EVENT"."BG_COLOR" IS '메인 배너에 사용되는 썸네일 배경색';

COMMENT ON COLUMN "EVENT"."MAIN_BANNER_ORDER" IS '메인배너에 표시되는 순서(NULL이면 표시안됨)';



-- 채팅
CREATE TABLE "CHAT" (
	"CHAT_NO"	NUMBER		NOT NULL,
	"READ_OR_NOT"	CHAR(1)	DEFAULT 'N'	NOT NULL CONSTRAINT READ_OR_NOT_CHK CHECK(READ_OR_NOT IN('N','Y')),
	"CHAT_MESSAGE"	VARCHAR2(500)		NOT NULL,
	"CHAT_SEND_DT"	DATE	DEFAULT SYSDATE	NOT NULL,
	"CHATROOM_NO"	NUMBER		NOT NULL,
	"USER_NO"	NUMBER		NOT NULL
);

COMMENT ON COLUMN "CHAT"."CHAT_NO" IS '채팅 메세지 번호(SEQ_CHAT_NO)';

COMMENT ON COLUMN "CHAT"."READ_OR_NOT" IS '채팅 메세지 읽음 여부 (N: 읽지 않음, Y: 읽음)';

COMMENT ON COLUMN "CHAT"."CHAT_MESSAGE" IS '채팅 메세지';

COMMENT ON COLUMN "CHAT"."CHAT_SEND_DT" IS '메세지 전송 날짜';

COMMENT ON COLUMN "CHAT"."CHATROOM_NO" IS '채팅방 번호(SEQ_CHATROOM_NO)';

COMMENT ON COLUMN "CHAT"."USER_NO" IS '회원 번호(SEQ_USER_NO)';



-- 회원(여행객)
CREATE TABLE "TOURIST" (
	"USER_NO"	NUMBER		NOT NULL,
	"PASSPORT_NO"	VARCHAR2(150)		NULL,
	"PRIMARY_LANGUAGE"	VARCHAR2(20)		NOT NULL,
	"EMERGENCY_CONTACT"	VARCHAR2(30)		NULL,
	"FACE_IMG"	VARCHAR2(100)		NULL,
	"COUNTRY_CODE"	CHAR(2)		NULL
);

COMMENT ON COLUMN "TOURIST"."USER_NO" IS '회원 번호(SEQ_USER_NO)';

COMMENT ON COLUMN "TOURIST"."PASSPORT_NO" IS '여권 번호';

COMMENT ON COLUMN "TOURIST"."PRIMARY_LANGUAGE" IS '주 사용 언어';

COMMENT ON COLUMN "TOURIST"."EMERGENCY_CONTACT" IS '비상 연락망';

COMMENT ON COLUMN "TOURIST"."FACE_IMG" IS '얼굴 인증 사진';

COMMENT ON COLUMN "TOURIST"."COUNTRY_CODE" IS '국가 코드';


-- 회원(가이드)
CREATE TABLE "GUIDE" (
	"USER_NO"	NUMBER		NOT NULL,
	"LANGUAGE_SKILL"	VARCHAR2(100)		NOT NULL,
	"ACTIVITY_AREA"	VARCHAR2(100)		NULL,
	"CONFIRMATION_NO"	VARCHAR2(100)		NOT NULL,
	"SUPER_GUIDE_FL"	CHAR(1)	DEFAULT 'N'	NOT NULL CONSTRAINT SUPER_GUIDE_FL_CHK CHECK(SUPER_GUIDE_FL IN('N','Y'))
);

COMMENT ON COLUMN "GUIDE"."USER_NO" IS '회원 번호(SEQ_USER_NO)';

COMMENT ON COLUMN "GUIDE"."LANGUAGE_SKILL" IS '구사 가능 언어';

COMMENT ON COLUMN "GUIDE"."ACTIVITY_AREA" IS '활동 지역 (최대 3곳)';

COMMENT ON COLUMN "GUIDE"."CONFIRMATION_NO" IS '자격증 확인서 번호';

COMMENT ON COLUMN "GUIDE"."SUPER_GUIDE_FL" IS '슈퍼 가이드 여부(N: 일반가이드, Y: 슈퍼가이드)';


-- 테마
CREATE TABLE "THEME" (
	"THEME_CODE"	NUMBER		NOT NULL,
	"THEME_NAME"	VARCHAR2(100)		NOT NULL
);

COMMENT ON COLUMN "THEME"."THEME_CODE" IS '테마 코드(SEQ_THEME_CODE)';

COMMENT ON COLUMN "THEME"."THEME_NAME" IS '테마명';


-- 여행 코스
CREATE TABLE "TOUR_COURSE" (
	"COURSE_NO"	NUMBER		NOT NULL,
	"PRODUCT_NO"	NUMBER		NOT NULL,
	"COURSE_NAME"	VARCHAR2(100)		NOT NULL,
	"COURSE_ORDER"	NUMBER		NOT NULL,
	"LATITUDE"	NUMBER		NOT NULL,
	"LONGITUDE"	NUMBER		NOT NULL,
	"BOSS_COURSE_FL"	CHAR(1)	DEFAULT 'N'	NOT NULL CONSTRAINT BOSS_COURSE_FL_CHK CHECK(BOSS_COURSE_FL IN('N','Y'))
);

COMMENT ON COLUMN "TOUR_COURSE"."COURSE_NO" IS '여행지 번호(SEQ_TOURCOURSE_NO)';

COMMENT ON COLUMN "TOUR_COURSE"."PRODUCT_NO" IS '상품 번호(SEQ_PRODUCT_NO)';

COMMENT ON COLUMN "TOUR_COURSE"."COURSE_NAME" IS '여행지 키워드';

COMMENT ON COLUMN "TOUR_COURSE"."COURSE_ORDER" IS '여행지 순서';

COMMENT ON COLUMN "TOUR_COURSE"."LATITUDE" IS '여행지 좌표 - 위도';

COMMENT ON COLUMN "TOUR_COURSE"."LONGITUDE" IS '여행지 좌표 - 경도';

COMMENT ON COLUMN "TOUR_COURSE"."BOSS_COURSE_FL" IS '대표 코스 여부(Y: 대표, N:나머지)';


-- 파일

CREATE TABLE "FILE" (
	"FILE_NO"	NUMBER		NOT NULL,
	"PRODUCT_NO"	NUMBER		NULL,
	"EVENT_NO"	NUMBER		NULL,
	"QNA_NO"	NUMBER		NULL,
	"FILE_ORDER"	NUMBER		NOT NULL,
	"FILE_PATH"	VARCHAR2(500)		NOT NULL
);

COMMENT ON COLUMN "FILE"."FILE_NO" IS '파일 번호(SEQ_FILE_NO)';

COMMENT ON COLUMN "FILE"."PRODUCT_NO" IS '상품 번호(SEQ_PRODUCT_NO)';

COMMENT ON COLUMN "FILE"."EVENT_NO" IS '이벤트 번호(SEQ_EVENT_NO)';

COMMENT ON COLUMN "FILE"."QNA_NO" IS '문의사항 번호(SEQ_QNA_NO)';

COMMENT ON COLUMN "FILE"."FILE_ORDER" IS '파일 순서';

COMMENT ON COLUMN "FILE"."FILE_PATH" IS '파일 경로';



-- 채팅룸
CREATE TABLE "CHATROOM" (
	"CHATROOM_NO"	NUMBER		NOT NULL,
	"CREATE_DT"	DATE	DEFAULT SYSDATE	NOT NULL,
	"PRODUCT_NO"	NUMBER		NOT NULL,
	"USER_NO"	NUMBER		NOT NULL
);

COMMENT ON COLUMN "CHATROOM"."CHATROOM_NO" IS '채팅방 번호(SEQ_CHATROOM_NO)';

COMMENT ON COLUMN "CHATROOM"."CREATE_DT" IS '채팅방 생성 일자';

COMMENT ON COLUMN "CHATROOM"."PRODUCT_NO" IS '상품 번호(SEQ_PRODUCT_NO)';

COMMENT ON COLUMN "CHATROOM"."USER_NO" IS '회원 번호(SEQ_USER_NO)';



-- 회원
CREATE TABLE "USER" (
	"USER_NO"	NUMBER		NOT NULL,
	"USER_EMAIL"	VARCHAR2(255)		NOT NULL,
	"USER_PASSWORD"	VARCHAR2(100)		NOT NULL,
	"USER_NAME"	NVARCHAR2(30)		NOT NULL,
	"USER_TEL"	VARCHAR2(20)		NOT NULL,
	"PROFILE_IMG"	VARCHAR2(100)		NULL,
	"CREATE_DT"	DATE	DEFAULT SYSDATE	NOT NULL,
	"USER_TYPE"	CHAR(1)		NOT NULL CONSTRAINT USER_TYPE_CHK CHECK(USER_TYPE IN('G','T', 'M')),
	"USER_STATE"	CHAR(1)		NOT NULL CONSTRAINT USER_STATE_CHK CHECK(USER_STATE IN('Y','N','B','D'))
);

COMMENT ON COLUMN "USER"."USER_NO" IS '회원 번호(SEQ_USER_NO)';

COMMENT ON COLUMN "USER"."USER_EMAIL" IS '회원 이메일';

COMMENT ON COLUMN "USER"."USER_PASSWORD" IS '회원 비밀번호';

COMMENT ON COLUMN "USER"."USER_NAME" IS '회원 이름';

COMMENT ON COLUMN "USER"."USER_TEL" IS '연락처';

COMMENT ON COLUMN "USER"."PROFILE_IMG" IS '프로필 이미지';

COMMENT ON COLUMN "USER"."CREATE_DT" IS '가입 일자';

COMMENT ON COLUMN "USER"."USER_TYPE" IS '회원 유형 (G: 가이드, T: 여행객, M:관리자)';

COMMENT ON COLUMN "USER"."USER_STATE" IS '회원 상태 (Y: 미승인, N: 정상, B: 블락 D: 탈퇴)';



-- 자기소개
CREATE TABLE "PR" (
	"USER_NO"	NUMBER		NOT NULL,
	"BIRTH_YEAR"	NUMBER		NULL,
	"JOB"	VARCHAR2(60)		NULL,
	"PETS"	VARCHAR2(60)		NULL,
	"HOBBY"	VARCHAR2(60)		NULL,
	"SUB_LANG"	VARCHAR2(60)		NULL,
	"ABROAD_EXPERIENCE"	VARCHAR2(600)		NULL,
	"MBTI"	VARCHAR2(20)		NULL,
	"STRENGTH"	VARCHAR2(500)		NULL,
	"FAVORITE_SONG"	VARCHAR2(500)		NULL,
	"TMI"	VARCHAR2(600)		NULL,
	"MAJOR"	VARCHAR2(100)		NULL,
	"DOPAMINE"	VARCHAR2(600)		NULL,
	"USELESS_TALENT"	VARCHAR2(500)		NULL,
	"CAP_LIST"	VARCHAR2(600)		NULL
);

COMMENT ON COLUMN "PR"."USER_NO" IS '회원 번호(SEQ_USER_NO)';

COMMENT ON COLUMN "PR"."BIRTH_YEAR" IS '태어난 연도';

COMMENT ON COLUMN "PR"."JOB" IS '직업';

COMMENT ON COLUMN "PR"."PETS" IS '반려동물';

COMMENT ON COLUMN "PR"."HOBBY" IS '취미';

COMMENT ON COLUMN "PR"."SUB_LANG" IS '구사 언어';

COMMENT ON COLUMN "PR"."ABROAD_EXPERIENCE" IS '해외거주경험';

COMMENT ON COLUMN "PR"."MBTI" IS 'MBTI';

COMMENT ON COLUMN "PR"."STRENGTH" IS '강점';

COMMENT ON COLUMN "PR"."FAVORITE_SONG" IS '좋아하는 노래';

COMMENT ON COLUMN "PR"."TMI" IS 'Too Much Information';

COMMENT ON COLUMN "PR"."MAJOR" IS '전공';

COMMENT ON COLUMN "PR"."DOPAMINE" IS '요즘 나의 도파민';

COMMENT ON COLUMN "PR"."USELESS_TALENT" IS '쓸모 없는 재능';

COMMENT ON COLUMN "PR"."CAP_LIST" IS '가이드로서의 역량';



-- 상품 일정
CREATE TABLE "PRODUCT_DT" (
	"PRODUCT_DT_NO"	NUMBER		NOT NULL,
	"PRODUCT_NO"	NUMBER		NOT NULL,
	"PRODUCT_DT"	DATE		NOT NULL,
	"PRODUCT_DT_AVAILABILITY"	CHAR(1)	DEFAULT 'Y'	NOT NULL CHECK(PRODUCT_DT_AVAILABILITY IN('Y','N'))
);

COMMENT ON COLUMN "PRODUCT_DT"."PRODUCT_DT_NO" IS '상품 일정 번호(SEQ_PRODUCT_DT_NO)';

COMMENT ON COLUMN "PRODUCT_DT"."PRODUCT_NO" IS '상품 번호(SEQ_PRODUCT_NO)';

COMMENT ON COLUMN "PRODUCT_DT"."PRODUCT_DT" IS '날짜';

COMMENT ON COLUMN "PRODUCT_DT"."PRODUCT_DT_AVAILABILITY" IS '구매 가능 여부(Y: 가능, N:불가능)';


-- 관심 지역
CREATE TABLE "FAVORITE_REGION" (
	"FAVORITE_REGION_NO"	NUMBER		NOT NULL,
	"REGION_NAME" VARCHAR2(100) NOT NULL,
	"USER_NO"	NUMBER		NOT NULL
);

COMMENT ON COLUMN "FAVORITE_REGION"."FAVORITE_REGION_NO" IS '관심지역 번호(SEQ_FAVORITE_REGION_NO)';

COMMENT ON COLUMN "FAVORITE_REGION"."REGION_NAME" IS '관심 지역명';

COMMENT ON COLUMN "FAVORITE_REGION"."USER_NO" IS '회원 번호(SEQ_USER_NO)';




-- 상품 옵션(1박 투어의 경우에만)
CREATE TABLE "PRODUCT_OPTION" (
	"OPTION_NO"	NUMBER		NOT NULL,
	"OPTION_NAME"	VARCHAR2(100)		NOT NULL,
	"OPTION_REST"	NUMBER		NOT NULL,
	"PRODUCT_NO"	NUMBER		NOT NULL
);

COMMENT ON COLUMN "PRODUCT_OPTION"."OPTION_NO" IS '옵션 번호(SEQ_OPTION_NO)';

COMMENT ON COLUMN "PRODUCT_OPTION"."PRODUCT_NO" IS '상품 번호(SEQ_PRODUCT_NO)';

COMMENT ON COLUMN "PRODUCT_OPTION"."OPTION_NAME" IS '상품 옵션명(시간)';

COMMENT ON COLUMN "PRODUCT_OPTION"."OPTION_REST" IS '상품 구매 가능 옵션 개수';



-- 기본키
ALTER TABLE "PRODUCT" ADD CONSTRAINT "PK_PRODUCT" PRIMARY KEY (
	"PRODUCT_NO"
);

ALTER TABLE "NOTIFICATION" ADD CONSTRAINT "PK_NOTIFICATION" PRIMARY KEY (
	"NOTIFICATION_NO"
);

ALTER TABLE "QNA" ADD CONSTRAINT "PK_QNA" PRIMARY KEY (
	"QNA_NO"
);

ALTER TABLE "WISHLIST" ADD CONSTRAINT "PK_WISHLIST" PRIMARY KEY (
	"WISHLIST_NO"
);

ALTER TABLE "RESERVATION" ADD CONSTRAINT "PK_RESERVATION" PRIMARY KEY (
	"RESERVATION_NO"
);

ALTER TABLE "REVIEW" ADD CONSTRAINT "PK_REVIEW" PRIMARY KEY (
	"REVIEW_NO"
);

ALTER TABLE "EVENT" ADD CONSTRAINT "PK_EVENT" PRIMARY KEY (
	"EVENT_NO"
);

ALTER TABLE "CHAT" ADD CONSTRAINT "PK_CHAT" PRIMARY KEY (
	"CHAT_NO"
);


ALTER TABLE "TOURIST" ADD CONSTRAINT "PK_TOURIST" PRIMARY KEY (
	"USER_NO"
);

ALTER TABLE "GUIDE" ADD CONSTRAINT "PK_GUIDE" PRIMARY KEY (
	"USER_NO"
);

ALTER TABLE "THEME" ADD CONSTRAINT "PK_THEME" PRIMARY KEY (
	"THEME_CODE"
);

ALTER TABLE "TOUR_COURSE" ADD CONSTRAINT "PK_TOUR_COURSE" PRIMARY KEY (
	"COURSE_NO"
);

ALTER TABLE "FILE" ADD CONSTRAINT "PK_FILE" PRIMARY KEY (
	"FILE_NO"
);

ALTER TABLE "CHATROOM" ADD CONSTRAINT "PK_CHATROOM" PRIMARY KEY (
	"CHATROOM_NO"
);

ALTER TABLE "USER" ADD CONSTRAINT "PK_USER" PRIMARY KEY (
	"USER_NO"
);

ALTER TABLE "PR" ADD CONSTRAINT "PK_PR" PRIMARY KEY (
	"USER_NO"
);

ALTER TABLE "PRODUCT_DT" ADD CONSTRAINT "PK_PRODUCT_DT" PRIMARY KEY (
	"PRODUCT_DT_NO"
);

ALTER TABLE "FAVORITE_REGION" ADD CONSTRAINT "PK_FAVORITE_REGION" PRIMARY KEY (
	"FAVORITE_REGION_NO"
);


ALTER TABLE "PRODUCT_OPTION" ADD CONSTRAINT "PK_PRODUCT_OPTION" PRIMARY KEY (
	"OPTION_NO"
);





-- 외래키

ALTER TABLE "PRODUCT" ADD CONSTRAINT "FK_USER_TO_PRODUCT_1" FOREIGN KEY (
	"USER_NO"
)
REFERENCES "USER" (
	"USER_NO"
);



ALTER TABLE "PRODUCT" ADD CONSTRAINT "FK_THEME_TO_PRODUCT_1" FOREIGN KEY (
	"THEME_CODE"
)
REFERENCES "THEME" (
	"THEME_CODE"
);

ALTER TABLE "NOTIFICATION" ADD CONSTRAINT "FK_USER_TO_NOTIFICATION_1" FOREIGN KEY (
	"RECEIVER_NO"
)
REFERENCES "USER" (
	"USER_NO"
);

ALTER TABLE "QNA" ADD CONSTRAINT "FK_USER_TO_QNA_1" FOREIGN KEY (
	"USER_NO"
)
REFERENCES "USER" (
	"USER_NO"
);

ALTER TABLE "WISHLIST" ADD CONSTRAINT "FK_USER_TO_WISHLIST_1" FOREIGN KEY (
	"USER_NO"
)
REFERENCES "USER" (
	"USER_NO"
);

ALTER TABLE "WISHLIST" ADD CONSTRAINT "FK_PRODUCT_TO_WISHLIST_1" FOREIGN KEY (
	"PRODUCT_NO"
)
REFERENCES "PRODUCT" (
	"PRODUCT_NO"
);

ALTER TABLE "RESERVATION" ADD CONSTRAINT "FK_PRODUCT_TO_RESERVATION_1" FOREIGN KEY (
	"PRODUCT_NO"
)
REFERENCES "PRODUCT" (
	"PRODUCT_NO"
);

ALTER TABLE "RESERVATION" ADD CONSTRAINT "FK_USER_TO_RESERVATION_1" FOREIGN KEY (
	"USER_NO"
)
REFERENCES "USER" (
	"USER_NO"
);

ALTER TABLE "RESERVATION" ADD CONSTRAINT "FK_PRODUCT_OPTION_TO_RESERVATION_1" FOREIGN KEY (
	"OPTION_NO"
)
REFERENCES "PRODUCT_OPTION" (
	"OPTION_NO"
);


ALTER TABLE "REVIEW" ADD CONSTRAINT "FK_USER_TO_REVIEW_1" FOREIGN KEY (
	"USER_NO"
)
REFERENCES "USER" (
	"USER_NO"
);

ALTER TABLE "REVIEW" ADD CONSTRAINT "FK_PRODUCT_TO_REVIEW_1" FOREIGN KEY (
	"PRODUCT_NO"
)
REFERENCES "PRODUCT" (
	"PRODUCT_NO"
);

ALTER TABLE "CHAT" ADD CONSTRAINT "FK_CHATROOM_TO_CHAT_1" FOREIGN KEY (
	"CHATROOM_NO"
)
REFERENCES "CHATROOM" (
	"CHATROOM_NO"
);

ALTER TABLE "CHAT" ADD CONSTRAINT "FK_USER_TO_CHAT_1" FOREIGN KEY (
	"USER_NO"
)
REFERENCES "USER" (
	"USER_NO"
);

ALTER TABLE "TOURIST" ADD CONSTRAINT "FK_USER_TO_TOURIST_1" FOREIGN KEY (
	"USER_NO"
)
REFERENCES "USER" (
	"USER_NO"
);

ALTER TABLE "GUIDE" ADD CONSTRAINT "FK_USER_TO_GUIDE_1" FOREIGN KEY (
	"USER_NO"
)
REFERENCES "USER" (
	"USER_NO"
);

ALTER TABLE "TOUR_COURSE" ADD CONSTRAINT "FK_PRODUCT_TO_TOUR_COURSE_1" FOREIGN KEY (
	"PRODUCT_NO"
)
REFERENCES "PRODUCT" (
	"PRODUCT_NO"
);

ALTER TABLE "FILE" ADD CONSTRAINT "FK_PRODUCT_TO_FILE_1" FOREIGN KEY (
	"PRODUCT_NO"
)
REFERENCES "PRODUCT" (
	"PRODUCT_NO"
);


ALTER TABLE "FILE" ADD CONSTRAINT "FK_EVENT_TO_FILE_1" FOREIGN KEY (
	"EVENT_NO"
)
REFERENCES "EVENT" (
	"EVENT_NO"
);

ALTER TABLE "FILE" ADD CONSTRAINT "FK_QNA_TO_FILE_1" FOREIGN KEY (
	"QNA_NO"
)
REFERENCES "QNA" (
	"QNA_NO"
);


ALTER TABLE "CHATROOM" ADD CONSTRAINT "FK_PRODUCT_TO_CHATROOM_1" FOREIGN KEY (
	"PRODUCT_NO"
)
REFERENCES "PRODUCT" (
	"PRODUCT_NO"
);

ALTER TABLE "CHATROOM" ADD CONSTRAINT "FK_USER_TO_CHATROOM_1" FOREIGN KEY (
	"USER_NO"
)
REFERENCES "USER" (
	"USER_NO"
);

ALTER TABLE "PR" ADD CONSTRAINT "FK_GUIDE_TO_PR_1" FOREIGN KEY (
	"USER_NO"
)
REFERENCES "GUIDE" (
	"USER_NO"
);

ALTER TABLE "PRODUCT_DT" ADD CONSTRAINT "FK_PRODUCT_TO_PRODUCT_DT_1" FOREIGN KEY (
	"PRODUCT_NO"
)
REFERENCES "PRODUCT" (
	"PRODUCT_NO"
);


ALTER TABLE "FAVORITE_REGION" ADD CONSTRAINT "FK_TOURIST_TO_FAVORITE_REGION_1" FOREIGN KEY (
	"USER_NO"
)
REFERENCES "TOURIST" (
	"USER_NO"
);

ALTER TABLE "PRODUCT_OPTION" ADD CONSTRAINT "FK_PRODUCT_TO_PRODUCT_OPTION_1" FOREIGN KEY (
	"PRODUCT_NO"
)
REFERENCES "PRODUCT" (
	"PRODUCT_NO"
);


-- 시퀀스

CREATE SEQUENCE SEQ_PRODUCT_NO NOCACHE; -- 상품 번호
CREATE SEQUENCE SEQ_NOTICE_NO NOCACHE; -- 알림 번호
CREATE SEQUENCE SEQ_QNA_NO NOCACHE; -- 문의사항 번호
CREATE SEQUENCE SEQ_QNA_IMG_NO NOCACHE; -- 문의사항 이미지 번호
CREATE SEQUENCE SEQ_WISHLIST_NO NOCACHE; -- 관심상품 번호
CREATE SEQUENCE SEQ_RESERVATION_NO NOCACHE; -- 예약 번호
CREATE SEQUENCE SEQ_REVIEW_NO NOCACHE; -- 리뷰 번호
CREATE SEQUENCE SEQ_EVENT_NO NOCACHE; -- 이벤트 번호
CREATE SEQUENCE SEQ_CHAT_NO NOCACHE; -- 채팅 메세지 번호
CREATE SEQUENCE SEQ_USER_NO NOCACHE; -- 회원 번호
CREATE SEQUENCE SEQ_THEME_CODE NOCACHE; -- 테마코드
CREATE SEQUENCE SEQ_TOURCOURSE_NO NOCACHE; -- 여행 코스 번호
CREATE SEQUENCE SEQ_FILE_NO NOCACHE; -- 파일 번호
CREATE SEQUENCE SEQ_CHATROOM_NO NOCACHE; -- 채팅방 번호
CREATE SEQUENCE SEQ_PRODUCT_DT_NO NOCACHE; -- 상품 일정 번호
CREATE SEQUENCE SEQ_FAVORITE_REGION_NO NOCACHE; -- 관심지역 번호
CREATE SEQUENCE SEQ_OPTION_NO NOCACHE; -- 상품 옵션 번호


-- 유니크

ALTER TABLE EVENT
ADD CONSTRAINT UNIQUE_MAIN_BANNER_ORDER UNIQUE (MAIN_BANNER_ORDER);

-- 컬럼 추가 양식
-- ALTER TABLE "TOURIST" ADD "COUNTRY_CODE" CHAR(2);
ALTER TABLE "RESERVATION" ADD "TOTAL_PRICE"	NUMBER;

SELECT * FROM RESERVATION;

INSERT INTO "RESERVATION"
VALUES(SEQ_RESERVATION_NO.NEXTVAL, #{productNo}, #{userNo}, SYSDATE, 'Y', #{paymentMethod}, #{guestCount}, 3, NULL, #{requestContent}, #{orderNumber}, #{totalPrice});


SELECT * FROM PRODUCT_DT
WHERE PRODUCT_NO = 16;

SELECT * FROM PRODUCT
WHERE PRODUCT_NO = 16;


