
-- 회원 (구매자 판매자 공통) 5,6
SELECT USER_NO, USER_EMAIL, USER_PASSWORD, USER_NAME, USER_TEL, PROFILE_IMG, CREATE_DT, USER_TYPE, USER_STATE
FROM "USER";

SELECT * FROM GUIDE;
-- 회원 (가이드)
INSERT INTO "USER"
(USER_NO, USER_EMAIL, USER_PASSWORD, USER_NAME, USER_TEL, PROFILE_IMG, CREATE_DT, USER_TYPE, USER_STATE)
VALUES(SEQ_USER_NO.NEXTVAL, 'guide09@gmail.com', 'pass09!', '이지은', '01009090900', '/static/images/profile/guide09.png', DEFAULT, 'G', 'N');

INSERT INTO "GUIDE"
(USER_NO, LANGUAGE_SKILL, ACTIVITY_AREA, CONFIRMATION_NO, SUPER_GUIDE_FL)
VALUES(SEQ_USER_NO.CURRVAL, 'English', '서울', 'HRD-20230531122740-73855', 'Y');


INSERT INTO "USER"
(USER_NO, USER_EMAIL, USER_PASSWORD, USER_NAME, USER_TEL, PROFILE_IMG, CREATE_DT, USER_TYPE, USER_STATE)
VALUES(SEQ_USER_NO.NEXTVAL, 'guide10@gmail.com', 'pass10!', '안지영', '01010101000', '/static/images/profile/guide10.png', DEFAULT, 'G', 'N');

INSERT INTO "GUIDE"
(USER_NO, LANGUAGE_SKILL, ACTIVITY_AREA, CONFIRMATION_NO, SUPER_GUIDE_FL)
VALUES(SEQ_USER_NO.CURRVAL, 'Chinese', '영주', 'HRD-20230531122740-73856', 'N');


-- 회원(여행객) 아이디 : tourist01 통일해주기~~  5,6
SELECT USER_NO, PASSPORT_NO, PRIMARY_LANGUAGE, EMERGENCY_CONTACT, FACE_IMG
FROM TOURIST;

SELECT * FROM TOURIST T ;

INSERT INTO "USER"
(USER_NO, USER_EMAIL, USER_PASSWORD, USER_NAME, USER_TEL, PROFILE_IMG, CREATE_DT, USER_TYPE, USER_STATE)
VALUES(SEQ_USER_NO.NEXTVAL, 'tourist09@gmail.com', 'pass09!', 'Sam Okyere', '01009090909', '/images/profile/tourist09.png', DEFAULT, 'T', 'N');


INSERT INTO "TOURIST"
(USER_NO, PASSPORT_NO, PRIMARY_LANGUAGE, EMERGENCY_CONTACT, FACE_IMG)
VALUES(SEQ_USER_NO.CURRVAL, 'M123A4567', 'English', NULL, '/images/profile/tourist09.png');


INSERT INTO "USER"
(USER_NO, USER_EMAIL, USER_PASSWORD, USER_NAME, USER_TEL, PROFILE_IMG, CREATE_DT, USER_TYPE, USER_STATE)
VALUES(SEQ_USER_NO.NEXTVAL, 'tourist10@gmail.com', 'pass10!', 'Sam Hamington', '01010101010', '/images/profile/tourist10.png', DEFAULT, 'T', 'N');


INSERT INTO "TOURIST"
(USER_NO, PASSPORT_NO, PRIMARY_LANGUAGE, EMERGENCY_CONTACT, FACE_IMG)
VALUES(SEQ_USER_NO.CURRVAL, 'M12345678', 'Japanese', NULL, '/images/profile/tourist10.png');







COMMIT;



INSERT INTO PRODUCT VALUES(
SEQ_PRODUCT_NO.NEXTVAL, '블라인드테스트', 1, '블라인드테스트', 1000, NULL, 10, 20, 9, 7, 'B', SYSDATE, 'English', 0, '서울', 0
);
SELECT * FROM PRODUCT;
COMMIT;
DELETE FROM PRODUCT WHERE PRODUCT_NO = 77;

--------------------------------------------------------------------------------

-- 상품 (4개씩 넣어주세요~~)
SELECT PRODUCT_NO, PRODUCT_NAME, PRODUCT_PACKAGE, PRODUCT_CONTENT, PRODUCT_PRICE, PRODUCT_ADD_PRICE, PRODUCT_MIN_TOURIST, PRODUCT_MAX_TOURIST, USER_NO, REGION_CODE, THEME_CODE, PRODUCT_STATE, CREATE_DT, GUIDE_LANGUAGE, VIEW_COUNT
FROM PRODUCT;

SELECT * FROM PRODUCT;
COMMIT;

UPDATE PRODUCT SET TOUR_DURATION = 8 WHERE PRODUCT_NO IN (25,26,27,28);

INSERT INTO PRODUCT
(PRODUCT_NO, PRODUCT_NAME, PRODUCT_PACKAGE, PRODUCT_CONTENT, PRODUCT_PRICE, PRODUCT_ADD_PRICE, PRODUCT_MIN_TOURIST, PRODUCT_MAX_TOURIST, USER_NO, REGION_CODE, THEME_CODE, PRODUCT_STATE, CREATE_DT, GUIDE_LANGUAGE, VIEW_COUNT)
VALUES(SEQ_PRODUCT_NO.NEXTVAL, '', 0, '', 0, '', 0, 0, 0, 0, 0, 'N'	, SYSDATE	, '', 0	);

INSERT INTO PRODUCT
(PRODUCT_NO, PRODUCT_NAME, PRODUCT_PACKAGE, PRODUCT_CONTENT, PRODUCT_PRICE, PRODUCT_ADD_PRICE, PRODUCT_MIN_TOURIST, PRODUCT_MAX_TOURIST, USER_NO, REGION_CODE, THEME_CODE, PRODUCT_STATE, CREATE_DT, GUIDE_LANGUAGE, VIEW_COUNT)
VALUES(SEQ_PRODUCT_NO.NEXTVAL, '점점 빠져드는 문경 당일여행(점촌점빵길, 김룡사, 고모산성, 문경새재)', 1,
'김룡사 - 경북 문경시 산북면 김룡리,운달산 자락 태고의 수림 속에 1400여년의 불맥을 이어온 김룡사(金龍寺)가 자리잡고 있다. 이 절은 신라 진평왕 10년(588년)에 운달조사(雲達祖師)가 창건하여 운봉사(雲峯寺)라 불리었으며,그후 사세를 확장해가다 인조 21년(1643년) 실화(失火)로 모두 소실되어 인조 27년(1649년)에 다시 옛 모습을 되찾았다.
고모산성 - 문경시 마성면 신현리 고모산(姑母山)에 있는 포곡식 산성이다. 출토 유물로 보아 470년경에 처음 축조한 것으로 짐작되며, 이후 여러 차례 증축과 개축을 반복하였다. 경북팔경 중의 하나인 진남교반(鎭南橋畔)을 사이에 두고 어룡산(魚龍山)과 마주보고 있는 천연 요새이다.
문경새재 - 백두대간의 조령산을 넘는 이 재는 예로부터 한강과 낙동강유역을 잇는 영남대로상의 가장 높고 험한 고개로 사회 ,문화, 경제의 유통과 국방상의 요충지였다. 새재는 『새도 날아서 넘기 힘든 고개』, 옛 문헌에 초점(草岾)이라고도 하여 『풀(억새)이 우거진 고개』 또는 하늘재와 이우리재 사이의 『새(사이)』, 새로 된 고개의 『새(新)재』등의 뜻이라고도 한다. 임진왜란 뒤에 이곳에 3개(주흘관, 조곡관, 조령관)의 관문(사적 제147호)을 설치하여 국방의 요새로 삼았다. 이곳은 자연경관이 빼어나고 유서 깊은 유적과 설화. 민요 등으로 이름 높은 곳이다. 이곳에는 나그네의 숙소인 원터, 신구 경상도관찰사가 관인을 주고받았다는 교귀정터 만이 남아 있는 것을 1999년 중창하였고 옛날에 산불을 막기 위하여 세워진 한글 표석 산불됴심비(지방문화재자료 제226호)가 남아 있다.',
25900, null, 5, 20, 28, '문경', 5, 'N', SYSDATE	, 'Chinese', 0	);

INSERT INTO PRODUCT
(PRODUCT_NO, PRODUCT_NAME, PRODUCT_PACKAGE, PRODUCT_CONTENT, PRODUCT_PRICE, PRODUCT_ADD_PRICE, PRODUCT_MIN_TOURIST, PRODUCT_MAX_TOURIST, USER_NO, REGION_CODE, THEME_CODE, PRODUCT_STATE, CREATE_DT, GUIDE_LANGUAGE, VIEW_COUNT)
VALUES(SEQ_PRODUCT_NO.NEXTVAL, '느리게 걷는 영주, 당일치기 힐링여행 코스', 1,
'선비의 고장으로 잘 알려진 경상북도 영주시는 영주동을 중심으로 중앙선·경북선·영동선 철도가 통과하는 소백권과 태백권 교통의 중심지입니다. 단양, 안동, 예천, 영월 등과 접해있어서 다른 도시와 묶어서 여행을 다녀오기도 좋지만, 하루 종일 영주시를 느리게 걸으며 둘러보는 것도 아주 매력적이지요.',
19900,
'희방사 입장료: 어린이 600원, 청소년 및 군경 1000원, 성인 2000원&&소수서원 입장료 : 어른 3000원, 청소년 및 군인 2000원, 어린이 1000원&&부석사 입장료 : 어린이 800원, 청소년 및 군경 1000원, 성인 1200원',
1, 5, 28, '영주', 5, 'N', SYSDATE, 'Chinese', 0	);
INSERT INTO PRODUCT
(PRODUCT_NO, PRODUCT_NAME, PRODUCT_PACKAGE, PRODUCT_CONTENT, PRODUCT_PRICE, PRODUCT_ADD_PRICE, PRODUCT_MIN_TOURIST, PRODUCT_MAX_TOURIST, USER_NO, REGION_CODE, THEME_CODE, PRODUCT_STATE, CREATE_DT, GUIDE_LANGUAGE, VIEW_COUNT)
VALUES(SEQ_PRODUCT_NO.NEXTVAL, '[남한산성]붉게 물드는 하늘을 감상하는 노을 명소', 1,
'남한산성은 삼국시대부터 천연의 요새로 중요한 역할을 하던 곳입니다. 이곳의 노을 포인트는 국청사 성벽을 따라 2분 정도 올라가면 있는 서문 전망대인데요. 성벽에서 내려다보면 탁 트인 서울 시내와 성남시를 한눈에 조망할 수 있습니다. 서울에 내려앉는 붉은 노을을 감상할 수 있는 이곳에서 저녁 산책을 즐겨보세요.',
30000,
'[남한산성행궁]성인(만 19세~만 64세) 2,000원 / 청소년(만 7세~만 18세) 1,000원 / 만 6세 이하, 만 65세 이상 무료',
5, 10, 27, '서울', 1, 'N', SYSDATE, 'English', 0	);
INSERT INTO PRODUCT
(PRODUCT_NO, PRODUCT_NAME, PRODUCT_PACKAGE, PRODUCT_CONTENT, PRODUCT_PRICE, PRODUCT_ADD_PRICE, PRODUCT_MIN_TOURIST, PRODUCT_MAX_TOURIST, USER_NO, REGION_CODE, THEME_CODE, PRODUCT_STATE, CREATE_DT, GUIDE_LANGUAGE, VIEW_COUNT)
VALUES(SEQ_PRODUCT_NO.NEXTVAL, '아이유와 함께하는 서울 숲 나들이', 1,
'편안한 마음으로 한국 여행을 계획해보세요!

여행 계획에서 번거로움을 덜어드리겠습니다. 혼자 여행하든, 가족, 사랑하는 사람, 대규모 그룹이든, 저는 여러분의 한국 여행을 성공으로 만들기 위한 지식과 전문성을 갖추고 있습니다.

29개국에서 경험이 풍부한 노련한 여행자로서, 저예산 여행에서부터 럭셔리 휴가까지 모든 것을 보고 했습니다. 수년간 여행을 계획한 후, 다른 사람들이 여행 계획을 세우는 데 기쁨을 느끼고, 이를 서비스로 바꾸기로 결정했습니다.

저를 가이드로 활용하면 시간과 비용을 절약할 수 있는 맞춤형 여행 계획을 세울 수 있습니다. 일생일대의 여행을 즐기실 수 있도록 일대일로 도와드립니다.',
99000,
null,
1, 1, 27, '서울', 1, 'N', SYSDATE, 'English', 0);

SELECT * FROM REGION R ;

SELECT * FROM THEME T ;

COMMIT;


-- 예약
SELECT RESERVATION_NO, PRODUCT_NO, USER_NO, CREATE_DT, RESERVATION_STATE, PAYMENT_METHOD, GUEST_COUNT, RESERVATION_DT
FROM RESERVATION;

INSERT INTO RESERVATION
(RESERVATION_NO, PRODUCT_NO, USER_NO, CREATE_DT, RESERVATION_STATE, PAYMENT_METHOD, GUEST_COUNT, RESERVATION_DT)
VALUES(SEQ_RESERVATION_NO.NEXTVAL, 0, 0, SYSDATE, 'Y', '', 0, '');

-- 리뷰
SELECT REVIEW_NO, USER_NO, REVIEW_MESSAGE, REVIEW_STARS, REVIEW_DEL_FL, PRODUCT_NO, CREATE_DT
FROM REVIEW;

INSERT INTO REVIEW
(REVIEW_NO, USER_NO, REVIEW_MESSAGE, REVIEW_STARS, REVIEW_DEL_FL, PRODUCT_NO, CREATE_DT)
VALUES(SEQ_REVIEW_NO.NEXTVAL, 29, 'If you go to an uninhabited island, Choco Pie is sold for 1,200 won.
But every time I dream of Snow White and the eight dwarfs living happily ever after.
HOT, Happiness, Tokyo Olympics, everything is complicated
I hope there is no damage from this typhoon.
This is a really, really important issue.', 5, 'N', 27, SYSDATE);
INSERT INTO REVIEW
(REVIEW_NO, USER_NO, REVIEW_MESSAGE, REVIEW_STARS, REVIEW_DEL_FL, PRODUCT_NO, CREATE_DT)
VALUES(SEQ_REVIEW_NO.NEXTVAL, 30, 'A lot of people came on this trip.
Minsu, Seongcheol, and Myungsoo all had so much fun, and I was with you until the end
I really wanted to be with all of you, but the manhole cover is right, I suddenly remembered that.
Glutinous rice donuts. They are sold at Paris Baguette. What if Baskin Robbins had 44 flavors?
In the same place as Home Alone, Kevin was alone.
Clouds in clouds, cotton candy Everland. thank you', 5, 'N', 28, SYSDATE);

COMMIT;
INSERT INTO REVIEW
(REVIEW_NO, USER_NO, REVIEW_MESSAGE, REVIEW_STARS, REVIEW_DEL_FL, PRODUCT_NO, CREATE_DT)
VALUES(SEQ_REVIEW_NO.NEXTVAL, 0, '', 0, 'N'	, 0, SYSDATE);

SELECT * FROM "USER" u ;

SELECT * FROM PRODUCT P ;



-- 관심 상품 (구매자)
SELECT WISHLIST_NO, USER_NO, PRODUCT_NO, WISH_DT
FROM WISHLIST;

INSERT INTO WISHLIST
(WISHLIST_NO, USER_NO, PRODUCT_NO, WISH_DT)
VALUES(SEQ_WISHLIST_NO.NEXTVAL, 0, 0, SYSDATE);


-- 여행 코스
SELECT COURSE_NO, PRODUCT_NO, COURSE_NAME, COURSE_ORDER, LATITUDE, LONGITUDE, BOSS_COURSE_FL
FROM TOUR_COURSE;

INSERT INTO TOUR_COURSE
(COURSE_NO, PRODUCT_NO, COURSE_NAME, COURSE_ORDER, LATITUDE, LONGITUDE, BOSS_COURSE_FL)
VALUES(SEQ_TOURCOURSE_NO.NEXTVAL, 0, '', 0, '', '', 'N');

-- 파일 (상품이미지 임의로 해도됨니다~~)
SELECT FILE_NO, PRODUCT_NO, FILE_ORDER, FILE_PATH
FROM "FILE";

INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 28, 1, '/images/product/product28_image1');
INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 28, 2, '/images/product/product28_image2');
INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 28, 3, '/images/product/product28_image3');
INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 28, 4, '/images/product/product28_image4');
INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 28, 5, '/images/product/product28_image5');
INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 28, 6, '/images/product/product28_image6');

SELECT * FROM PRODUCT;
SELECT * FROM "FILE";

-- 상품 일정(옵션) (판매자)
SELECT PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT
FROM PRODUCT_DT;

INSERT INTO PRODUCT_DT
(PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT)
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 0, '');

