-- 테마
INSERT INTO "THEME" VALUES(SEQ_THEME_CODE.NEXTVAL, '힐링 투어', '/images/theme/healing.png');
INSERT INTO "THEME" VALUES(SEQ_THEME_CODE.NEXTVAL, 'k-pop 투어', '/images/theme/kpop.png');
INSERT INTO "THEME" VALUES(SEQ_THEME_CODE.NEXTVAL, '궁 투어', '/images/theme/gyeongbokgung.png');
INSERT INTO "THEME" VALUES(SEQ_THEME_CODE.NEXTVAL, '맛집 투어', '/images/theme/food.png');
INSERT INTO "THEME" VALUES(SEQ_THEME_CODE.NEXTVAL, '역사 투어', '/images/theme/history.png');
INSERT INTO "THEME" VALUES(SEQ_THEME_CODE.NEXTVAL, '에코 투어리즘', '/images/theme/eco.png');
INSERT INTO "THEME" VALUES(SEQ_THEME_CODE.NEXTVAL, '한복 체험', '/images/theme/hanbok.png');
INSERT INTO "THEME" VALUES(SEQ_THEME_CODE.NEXTVAL, '전통 시장 투어', '/images/theme/market.png');
INSERT INTO "THEME" VALUES(SEQ_THEME_CODE.NEXTVAL, '스키장 투어', '/images/theme/ski.png');
INSERT INTO "THEME" VALUES(SEQ_THEME_CODE.NEXTVAL, '서핑 투어', '/images/theme/surfing.png');
INSERT INTO "THEME" VALUES(SEQ_THEME_CODE.NEXTVAL, '한옥 투어', '/images/theme/hanok.png');


-- (이름) 샘플 데이터 2개씩 넣어주세요!! 주석 처리 된 거는 나중에 넣어도 됨!! 

----------------------------------------------------------------------------------

-- 회원 (구매자 판매자 공통) 5,6
SELECT USER_NO, USER_EMAIL, USER_PASSWORD, USER_NAME, USER_TEL, PROFILE_IMG, CREATE_DT, USER_TYPE, USER_STATE
FROM "USER";


-- 회원 (가이드)
INSERT INTO "USER"
(USER_NO, USER_EMAIL, USER_PASSWORD, USER_NAME, USER_TEL, PROFILE_IMG, CREATE_DT, USER_TYPE, USER_STATE)
VALUES(SEQ_USER_NO.NEXTVAL, 'guide05@gmail.com', 'pass05!', '차은우', '01082715213', '/static/images/profile/guide05.jpg', DEFAULT, 'G', 'N');

INSERT INTO "GUIDE"
(USER_NO, LANGUAGE_SKILL, ACTIVITY_AREA, CONFIRMATION_NO, SUPER_GUIDE_FL)
VALUES(SEQ_USER_NO.CURRVAL, 'English', '전주', 'A12830873712', 'N');


INSERT INTO "USER"
(USER_NO, USER_EMAIL, USER_PASSWORD, USER_NAME, USER_TEL, PROFILE_IMG, CREATE_DT, USER_TYPE, USER_STATE)
VALUES(SEQ_USER_NO.NEXTVAL, 'guide06@gmail.com', 'pass06!', '김도연', '01012852123', '/static/images/profile/guide06.jpg', DEFAULT, 'G', 'N');

INSERT INTO "GUIDE"
(USER_NO, LANGUAGE_SKILL, ACTIVITY_AREA, CONFIRMATION_NO, SUPER_GUIDE_FL)
VALUES(SEQ_USER_NO.CURRVAL, 'Chinese', '서울', 'A10291931928', 'N');



-- 회원(여행객) 아이디 : tourist01 통일해주기~~  5,6
SELECT USER_NO, PASSPORT_NO, PRIMARY_LANGUAGE, EMERGENCY_CONTACT, FACE_IMG
FROM TOURIST;

INSERT INTO "USER"
(USER_NO, USER_EMAIL, USER_PASSWORD, USER_NAME, USER_TEL, PROFILE_IMG, CREATE_DT, USER_TYPE, USER_STATE)
VALUES(SEQ_USER_NO.NEXTVAL, 'tourist05@gmail.com', 'pass05!', 'JOHN DOE', '070128389128', NULL, DEFAULT, 'T', 'N');


INSERT INTO "TOURIST"
(USER_NO, PASSPORT_NO, PRIMARY_LANGUAGE, EMERGENCY_CONTACT, FACE_IMG)
VALUES(SEQ_USER_NO.CURRVAL, 'M12380942', 'English', NULL, '/images/profile/tourist05.jpg');


INSERT INTO "USER"
(USER_NO, USER_EMAIL, USER_PASSWORD, USER_NAME, USER_TEL, PROFILE_IMG, CREATE_DT, USER_TYPE, USER_STATE)
VALUES(SEQ_USER_NO.NEXTVAL, 'tourist06@gmail.com', 'pass05!', 'TORIYAMA MEI', '070127467721', NULL, DEFAULT, 'T', 'N');


INSERT INTO "TOURIST"
(USER_NO, PASSPORT_NO, PRIMARY_LANGUAGE, EMERGENCY_CONTACT, FACE_IMG)
VALUES(SEQ_USER_NO.CURRVAL, 'M95871282', 'Japanese', NULL, '/images/profile/tourist06.jpg');


----------------------------------------------------------------------------------

-- 자기소개 (판매자)
SELECT USER_NO, BIRTH_YEAR, JOB, PETS, HOBBY, SUB_LANG, ABROAD_EXPERIENCE, MBTI, STRENGTH, FAVORITE_SONG, TMI, MAJOR, DOPAMINE, USELESS_TALENT, CAP_LIST
FROM PR;

INSERT INTO PR
(USER_NO, BIRTH_YEAR, JOB, PETS, HOBBY, SUB_LANG, ABROAD_EXPERIENCE, MBTI, STRENGTH, FAVORITE_SONG, TMI, MAJOR, DOPAMINE, USELESS_TALENT, CAP_LIST)
VALUES(15, 1997, '고등학생 수학 강사', '애교가 넘치고 장난기 많은 사모예드', '요리와 테니스', NULL, '중국과 이집트 프랑스 미국 독일 인도네시아', 'ESFJ', '한번 시작하면 쉽게 포기하지 않습니다', 'Travel - The Hunts', '오페라 하우스에서 춤을 췄습니다', NULL , NULL, '수탉을 완벽하게 모방할 수 있습니다', NULL);

INSERT INTO PR
(USER_NO, BIRTH_YEAR, JOB, PETS, HOBBY, SUB_LANG, ABROAD_EXPERIENCE, MBTI, STRENGTH, FAVORITE_SONG, TMI, MAJOR, DOPAMINE, USELESS_TALENT, CAP_LIST)
VALUES(17, 1999, '학생', '배고플 때만 집사를 찾는 검은 고양이와 함께 살아요', '사진 찍기', '프랑스어, 일본어, 영어', NULL, 'ENFP', '일과 감정을 분리할 줄 알아요', '방백 - 김여명', '최근 관심이 가는 연예인이 생겼어요', '컴퓨터공학과', NULL, NULL, NULL);
-- 다 넣을 필요 없고 4개 이상 넣기~~



-- 관심 지역 (구매자)
SELECT FAVORITE_REGION_NO, REGION_CODE, USER_NO
FROM FAVORITE_REGION;


INSERT INTO FAVORITE_REGION
(FAVORITE_REGION_NO, REGION_CODE, USER_NO)
VALUES(SEQ_FAVORITE_REGION_NO.NEXTVAL, 8, 18);

INSERT INTO FAVORITE_REGION
(FAVORITE_REGION_NO, REGION_CODE, USER_NO)
VALUES(SEQ_FAVORITE_REGION_NO.NEXTVAL, 1, 18);

INSERT INTO FAVORITE_REGION
(FAVORITE_REGION_NO, REGION_CODE, USER_NO)
VALUES(SEQ_FAVORITE_REGION_NO.NEXTVAL, 4, 19);

INSERT INTO FAVORITE_REGION
(FAVORITE_REGION_NO, REGION_CODE, USER_NO)
VALUES(SEQ_FAVORITE_REGION_NO.NEXTVAL, 6, 19);


SELECT * FROM TOUR_COURSE;

--------------------------------------------------------------------------------


-- 상품 (4개씩 넣어주세요~~)
SELECT PRODUCT_NO, PRODUCT_NAME, PRODUCT_PACKAGE, PRODUCT_CONTENT, PRODUCT_PRICE, PRODUCT_ADD_PRICE, PRODUCT_MIN_TOURIST, PRODUCT_MAX_TOURIST, USER_NO, REGION_CODE, THEME_CODE, PRODUCT_STATE, CREATE_DT, GUIDE_LANGUAGE, VIEW_COUNT
FROM PRODUCT;

INSERT INTO PRODUCT
(PRODUCT_NO, PRODUCT_NAME, PRODUCT_PACKAGE, PRODUCT_CONTENT, PRODUCT_PRICE, PRODUCT_ADD_PRICE, PRODUCT_MIN_TOURIST, PRODUCT_MAX_TOURIST, USER_NO, REGION_CODE, THEME_CODE, PRODUCT_STATE, CREATE_DT, GUIDE_LANGUAGE, VIEW_COUNT)
VALUES(SEQ_PRODUCT_NO.NEXTVAL, '한옥의 정취를 느낄 수 있는 전주 여행, 맛있는 음식에 여행의 기쁨은 두배!', 2, '경기전, 왕과의 산책'||CHR(10)|| '전주의 역사를 오롯이 체험하고 느낄 수 있는 한옥마을 야간문화행사는 관광객에게 환상의 밤을 제공한다고 보장한다. 비밀스러운 경기전 문턱을 넘어서면 조선의 왕을 현장에서 만나는 찬스를 얻을 수 있다. 첫 번째 하마비 옆에서 세종대왕을 그리고 신비로운 대숲을 지나면 태종을 만나고 조선왕조실록을 보관하는 전주사고에서는 광해군을 만나게 된다. 문화와 역사가 살아 움직이는 밤을 따라가보면 진짜 태조의 어진이 있는 어진박물관을 거쳐, 수복청에 집결하게 되면 연회의 막이 오르면서 온갖 악기가 한데 어우러져 소리꾼들의 공연을 한바탕 신명나게 구경할 수 있다.'||CHR(10)||CHR(10)|| '완산공원 삼나무 숲' ||CHR(10)||
'동완산동에 자리한 나지막한 곤지산, 이곳은 역사의 숨결이 묻어난 곳이다. 조선 후기 천주교 신자들이 처형됐던 순교지이자 동학 농민군의 지도자 김개남 장군이 처형당한 슬픈 역사를 보듬어 주기라도 하듯 사시사철 푸른 숲을 품고 있다. 깎아지른 절벽과 울창한 숲의 빛깔이 푸르스름하여 초록바위라 불리는 바위 언덕에서 쐬는 바람이 여름의 낭만과 정취를 느끼게 한다. 달맞이 동산으로 안내하는 계단을 오르면 전주 시내 절경이 한눈에 펼쳐지는데 이 맛에 오르길 잘했다는 생각이 절로 든다. 이어지는 길 따라 나타나는 짙고 푸른 장관의 완산공원 삼나무숲. 곧게 뻗은 삼나무숲에서 사부작사부작 걷다 보면 물씬 풍겨 오는 풀, 흙 등의 숲 향기와 삼나무 특유의 청량감 넘치는 향이 어우러져 절로 깊은 숨을 들이마시게 된다.'||CHR(10)||CHR(10)||'덕진공원' ||CHR(10)||
'전주 시내 중심에 위치한 덕진공원은 전주 시민들에게 있어 하나쯤의 사연을 간직한 추억의 장소이다. 특히 덕진공원이 안고 있는 드넓은 호수인 덕진호에는 해마다 7월이면 연꽃이 흐드러지게 피어나 전국의 여행객들과 사진작가에게 큰 인기를 얻고 있다. 전주 8경 중 하나로 손꼽히는 덕진채련(德津採蓮)과 함께 덕진공원의 3분의 2를 차지하고 있는 연못인 덕진호에서 펼쳐지는 음악분수도 덕진공원의 빼놓을 수 없는 관람사항이 되었다.'||CHR(10)||CHR(10)||'국내 최초 유네스코 음식창의도시! 한정식의 고장!'||CHR(10)||
'뿌리 깊은 전주 음식의 발달 과정을 짚어보면 전국 어느 도시를 가나 맛집으로 소문난 음식점의 상호에 ‘전주’라는 지명이 붙은 사례가 유난히 많은 것이 결코 우연이 아니란 것을 짐작게 한다. 음식 앞에도 전주비빔밥, 전주콩나물국밥, 전주한정식, 전주막걸리 등 ‘전주’라는 상징적 단어가 붙어야 더욱 맛깔스럽다. 여기에 전라도의 손맛과 훈훈한 인심까지 더해져 전주 음식은 한층 게미(전라도 방언·음식 속에 녹아 있는 독특한 맛)를 더한다. 이외에도 다양한 한국적인 음식을 맛볼 수 있는 코스가 준비되어 있으니 직접 경험해보시는 걸 추천드립니다.' ||CHR(10)||CHR(10)||
'다양한 볼거리로 전주시민들의 추억을 담고 있는 덕진공원'||CHR(10)||'연꽃향기가 가득한 덕진공원에는 신석정, 이철균, 백양촌 시인의 시비가 둘러 서 있다. 지역 현대문학의 개척자이자 전북문학사를 빛냈던 문인들을 추모할 수 있는 전주 문학의 성지 이기도 하다. 덕진공원이야말로 전주 시민들의 낭만이 고스란히 담긴 곳이라 할 수 있다.', 
300000, 13000, 5, 10, 15, 11, 4, 'N', SYSDATE, 'English', 0);



INSERT INTO PRODUCT
(PRODUCT_NO, PRODUCT_NAME, PRODUCT_PACKAGE, PRODUCT_CONTENT, PRODUCT_PRICE, PRODUCT_ADD_PRICE, PRODUCT_MIN_TOURIST, PRODUCT_MAX_TOURIST, USER_NO, REGION_CODE, THEME_CODE, PRODUCT_STATE, CREATE_DT, GUIDE_LANGUAGE, VIEW_COUNT)
VALUES(SEQ_PRODUCT_NO.NEXTVAL, '방탄소년단의 숨결을 느끼는 서울의 핫플레이스', 2, TO_CLOB('희망찬 일출을 함께 보던 그곳, 아차산'||CHR(10)||'V LIVE 달려라 방탄 에서 멤버 RM과 뷔가 벌칙 수행으로 일출 등산을 했던 아차산. 푸르스름하게 물들어 가는 하늘을 바라보며 생각에 잠긴 두 사람의 모습은 보는 이들의 마음까지도 평온함을 느끼게 해주었다. 서울 광진구에 위치한 아차산은 높이 295.7m로 가파르지 않은 산행지로 인기가 많다. 서울 시내가 내려다보이는 시원한 전망이 등산객들의 눈길과 마음을 사로잡는다. 가볍지만 든든한 도시락을 준비해 아차산 나들이를 가보자. 언제든 자연이 주는 평화로움과 매력적인 도시 서울의 모습을 만끽할 수 있다. 또한 아차산에서 도보로 30분, 자가용으로 7분 남짓 떨어진 곳에 아차산 생태공원이 위치해 있다. 서울시에서 조성한 이 생태공원은 자생식물원, 나비정원, 습지원을 비롯하여 소나무 숲, 생태관찰로 등 다양한 자연과 체험공간을 접할 수 있어 함께 둘러보기에 좋다.'||CHR(10)||CHR(10)||
'방탄소년단의 앨범 자켓 속 그곳, 신촌 아이존팝¶ 이곳은 히트곡 DNA가 수록된 방탄소년단의 정규 3집 Love Yourself 앨범 재킷 촬영을 한 프리미엄 게임 라운지. 방탄소년단 특유의 중독성 있고 톡톡 튀는 음악이 에너지 넘치는 아이존 팝의 분위기와 잘 어울린다. 앨범 재킷 속 멤버 지민이 농구공을 들고 앉아 있던 농구대와 정국이 앉아 있던 펌프 등 멤버들의 자취를 따라 그들의 손길과 온기를 느껴보자. 시간제로 운영하는 이 게임 라운지는 코인노래방, 두더지 잡기, 총 게임, 철권 등의 다양한 게임 시설이 있어 오감을 자극하기에 충분하다. 또한 이용자들의 편의를 위해 짐을 보관해주는 라커도 있어 게임을 마음껏 즐길 수 있다.'||CHR(10)||CHR(10)||
'낭만과 즐거움이 가득한 곳, 반포한강공원과 달빛무지개분수'||CHR(10)||' Life in Seoul에서 방탄소년단이 치킨파티를 하는 그곳은 바로 반포한강공원이다. 서울 사람들은 먹고 싶은 게 생기면 공원을 식당으로 만든다는 RM의 이야기처럼, 배달 치킨을 시켜서 풀밭 위의 식사를 즐겨보는 건 어떨까? 게다가 반포한강공원에서는 다양한 먹거리와 핸드메이드 상품, 각종 공연을 즐길 수 있는 서울 밤도깨비 야시장이 열리기도 한다. 시원하게 흐르는 강줄기를 보며 맛과 멋, 흥을 즐기기에 더없이 좋은 장소다.해가 지고 어둠이 내리면 반포대교 위에서 무지개빛 분수가 쏟아진다. 반포한강공원의 ‘달빛무지개분수’는 기네스북에도 등재된 총 1,140m의 세계 최장 분수로 배경음악과 조명에 맞춘 화려한 분수쇼를 자랑한다.')||CHR(10)||CHR(10)|| 
TO_CLOB('방탄소년단의 힘의 원천, 유정식당¶ 유정식당은 방탄소년단이 신인 시절 방송에서 추천한 맛집이다. 같은 건물에 있는 연습실에서 연습을 마치면 원기 보충을 위해 유정식당에서 든든한 한 끼를 채웠다. 현재까지도 가끔 유정식당에서 그들을 봤다는 목격담이 이어진다. 유정식당은 지리산 토종 흑돼지를 전문으로 하는 곳으로 방탄소년단 멤버들이 주로 먹었던 흑돼지고추장오겹살과 돌솥비빔밥이 이 집의 인기 메뉴.'||CHR(10)||CHR(10)||
'서울 중심에 우뚝 선 조선 600년 왕실 문화의 진수, 경복궁' ||CHR(10)||'방탄소년단은 9월 29일부터 미국 NBC 지미 팰런 쇼의 스페셜 주간기획 BTS 위크를 통해 5일간 매일 다른 퍼포먼스와 스페셜 코너, 인터뷰로 다채로운 매력을 뽐냈다. 그 가운데 한복을 재해석한 무대 의상을 입고 경복궁 근정전 앞에서 아이돌(IDOL) 무대를, 경회루에서는 소우주(Mikrokosmos) 무대를 선보였다. 아름다운 공연무대가 된 경복궁의 풍경은 방탄소년단의 퍼포먼스와 어우러지며 한국 문화재의 미학과 감성을 전세계에 각인시키는 계기가 되었다. 경복궁은 조선 제일의 법궁으로서 1395년 태조 이성계가 처음 창건했다. 광화문-흥례문-근정문-근정전-사정전-강녕전-교태전을 잇는 중심부가 궁궐의 핵심 공간이며, 기하학적 질서에 따라 대칭적으로 건축되었다. 중심부를 제외한 건축물들은 비대칭적으로 배치되어 변화와 통일의 아름다움을 함께 갖춘 왕실 문화의 진수를 엿볼 수 있다.')||CHR(10)||CHR(10)||
TO_CLOB('2020년 11월 10일, 방탄소년단은 <시즌그리팅 2021> 프리뷰를 공개했다. 공개된 사진과 영상 속에서 그들은 1970~80년대 여심을 설레게 했을 것 같은 꽃미남 비주얼로 시선을 사로잡았다. 이와 더불어 눈길을 끈 것이 그들의 패션과 촬영지. 품이 넓은 셔츠와 뿔테안경, 나팔바지 등 추억을 소환하는 패션 아이템과 빈티지한 멋을 풍기는 촬영지가 조화를 이루어 완벽한 레트로 콘셉트를 구현했다. 프리뷰 공개 이후 방탄소년단의 촬영지로 알려진 을지로 일대는 새로운 아미투어의 명소로서 화제를 모으고 있다.' ||CHR(10)||CHR(10)||
'일상의 스트레스를 날려버리는 곳,우리당구장' ||CHR(10)|| '멤버 석진이 안정된 자세로 큐대를 이리저리 돌리며 당구를 치던 곳. 예고 영상으로 화제가 된 후부터 당구장 입구에 방탄소년단 사진을 붙여놓았다. 오래된 외관과 간판이 레트로 분위기의 을지로와 잘 어울린다. 그러나 내부로 들어서면 최신식 시설로 깔끔하게 꾸며놓았다. 최근에는 소문 듣고 찾아오는 아미들의 출몰이 잦아 사진 찍기 좋게 밝은 조명까지 설치해 놓았다고. 방탄소년단 멤버들과 같은 자세로 창가에서 인증샷도 찍고, 게임도 즐겨보자. 경쾌한 타구음에 일상의 스트레스가 확 풀린다. 당구대 간의 거리가 넓어 여유롭고 쾌적한 분위기에서 게임을 즐길 수 있다.'||CHR(10)||CHR(10)||
'푹신한 소파에서 즐기는 달콤쌉싸름한 쌍화차의 맛,을지다방' ||CHR(10)|| '멤버들이 쌍화차를 마시며 여유로운 한때를 즐긴 곳은 을지다방. 가게 안을 가득 메운 주황색 가죽 소파 등 투박하면서도 옛날 느낌이 물씬 나는 오래된 다방이다. 방탄소년단이 앉았던 창가 자리는 인기가 높아 현재 포토존으로 만들어져 있다. 독특한 향취와 감성으로 사랑받는 힙지로의 자존심으로도 불린다.')||CHR(10)||CHR(10)||
TO_CLOB('골목 안에 숨겨진 30여년 전통의 소문난 맛집,전주집' ||CHR(10)|| '지민이 사진을 촬영한 곳은 커다란 아치형 네온사인 간판이 인상적인 전주집 입구. 이곳은 원래부터 맛집으로 유명한데, 대표 메뉴는 냉동 목삼겹살. 두툼하게 썬 고기를 콩나물과 부추무침, 새송이버섯과 함께 넣고 볶듯이 구우면 돼지고기의 고소한 지방성분이 이들 재료에 스며들어 맛과 향을 드높인다. 남은 재료를 이용한 볶음밥도 놓칠 수 없는 별미. 입구에서 지민처럼 힙한 인증샷도 찍고, 식도락도 즐겨보자.' ||CHR(10)||CHR(10)||
'반만 년 역사·문화의 빛과 그림자 그 안과 밖, 국립중앙박물관' ||CHR(10)||'2020년 6월 유튜브는 가상졸업식 Dear Class of 2020을 주최하고 생중계했다.BTS는 국내 인사 중 유일하게 연사로 나서 12분가량의 영상으로 축사를 전했다. 해당 영상의 촬영 장소는 국립중앙박물관. 7멤버가 자신의 이야기를 나눈 곳은 1층 로비이며, 퍼포먼스를 펼친 곳은 야외 열린마당이다. 총 6개관과 50개의 실로 구성된 상설전시관은 12,044점의 유물을 순회 전시하며, 수시로 특별전시회도 볼 수 있다. 우리 건축의 중심공간인 대청마루를 상징하는 열린마당은 모두에게 개방된 공간으로서 전시실이나 공연장 등 모든 박물관 시설을 이용하는 시작점이다. 또한 호수를 중심으로 꽃과 나무가 어우러진 정원은 산책과 휴식을 즐기기에도 좋다.')
, 400000, null, 4, 15, 17, 1, 2, 'N', SYSDATE, 'Chinese', 0);



INSERT INTO PRODUCT
(PRODUCT_NO, PRODUCT_NAME, PRODUCT_PACKAGE, PRODUCT_CONTENT, PRODUCT_PRICE, PRODUCT_ADD_PRICE, PRODUCT_MIN_TOURIST, PRODUCT_MAX_TOURIST, USER_NO, REGION_CODE, THEME_CODE, PRODUCT_STATE, CREATE_DT, GUIDE_LANGUAGE, VIEW_COUNT)
VALUES(SEQ_PRODUCT_NO.NEXTVAL, '배낭을 둘러메고 서울을 누벼보자. 대도시에서 즐길 수 있는 자연과 문화의 복합적인 경험!', 3,
TO_CLOB('DAY1'||CHR(10)||CHR(10)||'경의선 숲길'||CHR(10)||
'버려진 철길에서 도심을 가로지르는 시민들의 문화 산책로로, 기존의 공원형태를 벗어나 누구나 쉽게 이용할 수 있는 시민들의 휴식공간이다. 근처에 여러 상점들과 음식점들이 줄지어 있어 함께 즐길 수 있다.'||CHR(10)||CHR(10)||
'DAY 2'||CHR(10)||CHR(10)||'창덕궁 후원 - 북촌 - 인사동 - 서대문형무소 - 명동 - N서울타워'||CHR(10)|| '창덕궁'||CHR(10)||
'유네스코 세계유산으로도 지정된 조선시대의 정원으로, 계절마다 각기 다른 아름다움을 볼 수 있는 대한민국의 전통과 자연이 어우려져 있는 공간.'||CHR(10)||CHR(10)||'북촌'||CHR(10)||
'한국의 전통가옥인 한옥들이 줄지어 있는 거리로, 한옥마을 공방에서는 전통공예 체험도 가능하다.'||CHR(10)||CHR(10)||'인사동'||CHR(10)||
'장인이 운영하는 공예품점과 전통 화랑, 갤러리가 있는 가장 한국적인 제품들을 만나볼 수 있는 곳. 외국인 관광객의 대표적인 한국 기념품 구매 장소.')||CHR(10)||CHR(10)
|| TO_CLOB('서대문형무소'||CHR(10)||'과거 감옥과 구치소 시설을 개조하여 복원 된 역사관이다. 대한민국 독립운동의 역사를 압축적으로 보여주는 공간이다.'||CHR(10)||CHR(10)||'명동'||CHR(10)||
'백화점과 면세점, 다양한 글로벌 브랜드와 스트리트 푸드까지 종합적으로 모여 있는 서울 중심의 최대 쇼핑지역.'||CHR(10)||CHR(10)||'N서울타워'||CHR(10)||
'서울관광 명소 1위로 꼽힌 바 있는 서울의 상징이자, 멋진 전망대 뷰와 함께 연인들의 사랑의 자물쇠가 걸려있는 로맨틱한 장소.'||CHR(10)||CHR(10)||'DAY 3'||CHR(10)||CHR(10)||
'전쟁기념관/용산공원 - 이촌 한강공원'||CHR(10)||CHR(10)||'전쟁기념관'||CHR(10)||
'6.25 전쟁의 역사적인 모습과 당시 사용되었던 무기들도 함께 전시되어, 전쟁의 극한상황을 다양하게 체험토록 한다.'||CHR(10)||CHR(10)|| '이촌 한강공원' ||CHR(10)||
'갈대,억새,코스모스를 철따라 즐길 수 있는 산책과 조깅코스로도 자주 이용되는 공원으로서, 테니스나 농구와 같은 각종 여가 및 레포츠 공간으로도 유용하게 활용 할 수 있다.')
, 500000, null, 3, 10, 17, 1, 5, 'N', SYSDATE, 'Chinese', 0);



INSERT INTO PRODUCT
(PRODUCT_NO, PRODUCT_NAME, PRODUCT_PACKAGE, PRODUCT_CONTENT, PRODUCT_PRICE, PRODUCT_ADD_PRICE, PRODUCT_MIN_TOURIST, PRODUCT_MAX_TOURIST, USER_NO, REGION_CODE, THEME_CODE, PRODUCT_STATE, CREATE_DT, GUIDE_LANGUAGE, VIEW_COUNT)
VALUES(SEQ_PRODUCT_NO.NEXTVAL, '대도시 서울에서 만나는 여유로운 힐링의 시간', 1, '오전'||CHR(10)|| '서울숲 & 서울숲 카페거리'||CHR(10)||CHR(10)||'서울숲'||CHR(10)||
'서울숲은 문화예술공원, 체험학습원, 생태숲, 습지생태원이라는 네가지 특색있는 공간으로 구성되어 있으며 한강과 가깝고 다양한 문화여가를 즐길 수 있는 공간이다.'||CHR(10)||CHR(10)||'서울숲 카페거리'||CHR(10)||
'서울의 다양한 문화여가를 즐길 수 있는 공간과 함께 여러가지 테마의 카페들이 줄지어 있는 서울숲 카페거리에서 차 한잔의 여유도 함께 즐겨보자.'||CHR(10)||CHR(10)||'오후'||CHR(10)||
'성곽길 하이킹 코스 - 야외활동 후 꿀맛 식사'||CHR(10)||CHR(10)||'성곽길 하이킹 코스'||CHR(10)||'옛 한양도성 둘레길를 통해 서울 도심에서 출발하여 서울 시가지가 한눈에 보이는 자연경관과 함께 하이킹을 즐겨보자.'||CHR(10)||CHR(10)||
'야외활동 후 꿀맛 식사'||CHR(10)||'서울에서도 야외활동을 충분히 즐길 수 있다! 다양한 문화여가를 즐기고 난 후 맛있는 식사를 즐겨보자.'||CHR(10)||CHR(10)||
'서울 한양도성(성곽길) 백악 구간'||CHR(10)||'서울 궁이 있는 구 도심지역을 둘러싼 서울 성곽을 따라 산책할 수 있는 하이킹 코스'||CHR(10)||
'이용방법 : 혜화문에서 출발, 창의문까지 하이킹 구간은 4.7km / 약 3시간 소요. 4호선 한성대입구역 5번 출구 도보 5분 혜화문까지 이동'||CHR(10)||CHR(10)||
'한강공원 야외 스포츠 (한강몽땅축제 : 매년 7~8월 중)'||CHR(10)||'수영, 요트, 카누, 윈드서핑 등 다양한 수상 스포츠와 하이킹 등을 즐길 수 있음. 여름 한달 동안 다양한 이벤트가 진행되는 한강몽땅축제 행사도 참고'
, 120000, null, 1, 5, 17, 1, 6, 'N', SYSDATE, 'Chinese', 0);


SELECT * FROM PRODUCT;
SELECT * FROM THEME;



-- 여행 코스
SELECT COURSE_NO, PRODUCT_NO, COURSE_NAME, COURSE_ORDER, LATITUDE, LONGITUDE, BOSS_COURSE_FL
FROM TOUR_COURSE;

INSERT INTO TOUR_COURSE
(COURSE_NO, PRODUCT_NO, COURSE_NAME, COURSE_ORDER, LATITUDE, LONGITUDE, BOSS_COURSE_FL)
VALUES(SEQ_TOURCOURSE_NO.NEXTVAL, 13, '경기전', 1, '36.35711332955899', '127.2353850011326', 'Y');

INSERT INTO TOUR_COURSE
(COURSE_NO, PRODUCT_NO, COURSE_NAME, COURSE_ORDER, LATITUDE, LONGITUDE, BOSS_COURSE_FL)
VALUES(SEQ_TOURCOURSE_NO.NEXTVAL, 13, '다문', 2, '37.3913220616871', '127.077349896612', 'N');

INSERT INTO TOUR_COURSE
(COURSE_NO, PRODUCT_NO, COURSE_NAME, COURSE_ORDER, LATITUDE, LONGITUDE, BOSS_COURSE_FL)
VALUES(SEQ_TOURCOURSE_NO.NEXTVAL, 13, '홍시궁', 3, '35.8317575624088', '127.160558072393', 'N');

INSERT INTO TOUR_COURSE
(COURSE_NO, PRODUCT_NO, COURSE_NAME, COURSE_ORDER, LATITUDE, LONGITUDE, BOSS_COURSE_FL)
VALUES(SEQ_TOURCOURSE_NO.NEXTVAL, 13, '완산공원 삼나무 숲', 4, '35.7991821539645', '127.120705712154', 'N');

INSERT INTO TOUR_COURSE
(COURSE_NO, PRODUCT_NO, COURSE_NAME, COURSE_ORDER, LATITUDE, LONGITUDE, BOSS_COURSE_FL)
VALUES(SEQ_TOURCOURSE_NO.NEXTVAL, 13, '덕진공원', 5, '35.8483429898877', '127.12177201806', 'N');



INSERT INTO TOUR_COURSE
(COURSE_NO, PRODUCT_NO, COURSE_NAME, COURSE_ORDER, LATITUDE, LONGITUDE, BOSS_COURSE_FL)
VALUES(SEQ_TOURCOURSE_NO.NEXTVAL, 14, '아차산', 1, '37.5539729668844', '127.0916686046', 'Y');

INSERT INTO TOUR_COURSE
(COURSE_NO, PRODUCT_NO, COURSE_NAME, COURSE_ORDER, LATITUDE, LONGITUDE, BOSS_COURSE_FL)
VALUES(SEQ_TOURCOURSE_NO.NEXTVAL, 14, '원조 할아버지 순두부', 2, '37.55405750063962', '127.09416187008681', 'N');

INSERT INTO TOUR_COURSE
(COURSE_NO, PRODUCT_NO, COURSE_NAME, COURSE_ORDER, LATITUDE, LONGITUDE, BOSS_COURSE_FL)
VALUES(SEQ_TOURCOURSE_NO.NEXTVAL, 14, '반포한강공원', 3, '37.5103054527946', '126.997138439264', 'N');

INSERT INTO TOUR_COURSE
(COURSE_NO, PRODUCT_NO, COURSE_NAME, COURSE_ORDER, LATITUDE, LONGITUDE, BOSS_COURSE_FL)
VALUES(SEQ_TOURCOURSE_NO.NEXTVAL, 14, '유정식당', 4, '37.7522770556709', '128.898091242095', 'N');

INSERT INTO TOUR_COURSE
(COURSE_NO, PRODUCT_NO, COURSE_NAME, COURSE_ORDER, LATITUDE, LONGITUDE, BOSS_COURSE_FL)
VALUES(SEQ_TOURCOURSE_NO.NEXTVAL, 14, '경복궁', 5, '37.5704885930781', '126.984727580316', 'N');

INSERT INTO TOUR_COURSE
(COURSE_NO, PRODUCT_NO, COURSE_NAME, COURSE_ORDER, LATITUDE, LONGITUDE, BOSS_COURSE_FL)
VALUES(SEQ_TOURCOURSE_NO.NEXTVAL, 14, '국립중앙박물관', 6, '37.5240810715914', '126.980196169411', 'N');

INSERT INTO TOUR_COURSE
(COURSE_NO, PRODUCT_NO, COURSE_NAME, COURSE_ORDER, LATITUDE, LONGITUDE, BOSS_COURSE_FL)
VALUES(SEQ_TOURCOURSE_NO.NEXTVAL, 14, '전주집', 7, '37.572825842181', '127.025352193775', 'N');

INSERT INTO TOUR_COURSE
(COURSE_NO, PRODUCT_NO, COURSE_NAME, COURSE_ORDER, LATITUDE, LONGITUDE, BOSS_COURSE_FL)
VALUES(SEQ_TOURCOURSE_NO.NEXTVAL, 14, '우리당구장', 8, '37.031794528688', '127.100817526759', 'N');

INSERT INTO TOUR_COURSE
(COURSE_NO, PRODUCT_NO, COURSE_NAME, COURSE_ORDER, LATITUDE, LONGITUDE, BOSS_COURSE_FL)
VALUES(SEQ_TOURCOURSE_NO.NEXTVAL, 14, '을지다방', 9, '37.6358935231331', '127.071180008487', 'N');



INSERT INTO TOUR_COURSE
(COURSE_NO, PRODUCT_NO, COURSE_NAME, COURSE_ORDER, LATITUDE, LONGITUDE, BOSS_COURSE_FL)
VALUES(SEQ_TOURCOURSE_NO.NEXTVAL, 15, '경의선 숲길', 1, '37.5583672766801', '126.925148752214', 'N');

INSERT INTO TOUR_COURSE
(COURSE_NO, PRODUCT_NO, COURSE_NAME, COURSE_ORDER, LATITUDE, LONGITUDE, BOSS_COURSE_FL)
VALUES(SEQ_TOURCOURSE_NO.NEXTVAL, 15, '창덕궁 후원', 2, '37.5795389611989', '126.992958349553', 'N');

INSERT INTO TOUR_COURSE
(COURSE_NO, PRODUCT_NO, COURSE_NAME, COURSE_ORDER, LATITUDE, LONGITUDE, BOSS_COURSE_FL)
VALUES(SEQ_TOURCOURSE_NO.NEXTVAL, 15, '북촌', 3, '33.5507286438229', '126.694479760986', 'N');

INSERT INTO TOUR_COURSE
(COURSE_NO, PRODUCT_NO, COURSE_NAME, COURSE_ORDER, LATITUDE, LONGITUDE, BOSS_COURSE_FL)
VALUES(SEQ_TOURCOURSE_NO.NEXTVAL, 15, '인사동', 4, '37.5721176231793', '126.984967228656', 'N');

INSERT INTO TOUR_COURSE
(COURSE_NO, PRODUCT_NO, COURSE_NAME, COURSE_ORDER, LATITUDE, LONGITUDE, BOSS_COURSE_FL)
VALUES(SEQ_TOURCOURSE_NO.NEXTVAL, 15, '서대문형무소', 5, '37.57372971375865', '126.95919103325315', 'Y');

INSERT INTO TOUR_COURSE
(COURSE_NO, PRODUCT_NO, COURSE_NAME, COURSE_ORDER, LATITUDE, LONGITUDE, BOSS_COURSE_FL)
VALUES(SEQ_TOURCOURSE_NO.NEXTVAL, 15, '명동', 6, '37.5672054937212', '126.985756026237', 'N');

INSERT INTO TOUR_COURSE
(COURSE_NO, PRODUCT_NO, COURSE_NAME, COURSE_ORDER, LATITUDE, LONGITUDE, BOSS_COURSE_FL)
VALUES(SEQ_TOURCOURSE_NO.NEXTVAL, 15, 'N서울타워', 7, '37.5586222390269', '126.973280900075', 'N');

INSERT INTO TOUR_COURSE
(COURSE_NO, PRODUCT_NO, COURSE_NAME, COURSE_ORDER, LATITUDE, LONGITUDE, BOSS_COURSE_FL)
VALUES(SEQ_TOURCOURSE_NO.NEXTVAL, 15, '전쟁기념관', 8, '37.53705493234822', '126.97709933944753', 'N');

INSERT INTO TOUR_COURSE
(COURSE_NO, PRODUCT_NO, COURSE_NAME, COURSE_ORDER, LATITUDE, LONGITUDE, BOSS_COURSE_FL)
VALUES(SEQ_TOURCOURSE_NO.NEXTVAL, 15, '이촌 한강공원', 9, '37.517600828186', '126.970465366388', 'N');



INSERT INTO TOUR_COURSE
(COURSE_NO, PRODUCT_NO, COURSE_NAME, COURSE_ORDER, LATITUDE, LONGITUDE, BOSS_COURSE_FL)
VALUES(SEQ_TOURCOURSE_NO.NEXTVAL, 16, '서울숲 ', 1, '37.5414277019142', '127.039209487238', 'Y');

INSERT INTO TOUR_COURSE
(COURSE_NO, PRODUCT_NO, COURSE_NAME, COURSE_ORDER, LATITUDE, LONGITUDE, BOSS_COURSE_FL)
VALUES(SEQ_TOURCOURSE_NO.NEXTVAL, 16, '서울숲 카페거리', 2, '37.5414277019142', '127.039209487238', 'N');

INSERT INTO TOUR_COURSE
(COURSE_NO, PRODUCT_NO, COURSE_NAME, COURSE_ORDER, LATITUDE, LONGITUDE, BOSS_COURSE_FL)
VALUES(SEQ_TOURCOURSE_NO.NEXTVAL, 16, '한양도성 성곽길', 3, '37.593727176178135', '126.98599555231849', 'N');

INSERT INTO TOUR_COURSE
(COURSE_NO, PRODUCT_NO, COURSE_NAME, COURSE_ORDER, LATITUDE, LONGITUDE, BOSS_COURSE_FL)
VALUES(SEQ_TOURCOURSE_NO.NEXTVAL, 16, '혜화 도담', 4, '37.5844152026508', '127.029753479384', 'N');

INSERT INTO TOUR_COURSE
(COURSE_NO, PRODUCT_NO, COURSE_NAME, COURSE_ORDER, LATITUDE, LONGITUDE, BOSS_COURSE_FL)
VALUES(SEQ_TOURCOURSE_NO.NEXTVAL, 16, '한강공원', 5, '37.5747929847542', '127.1366038433', 'N');



-- 상품 일정(옵션) (판매자)
SELECT PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT
FROM PRODUCT_DT;

INSERT INTO PRODUCT_DT
(PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT)
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 13, '2023-07-01');
INSERT INTO PRODUCT_DT
(PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT)
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 13, '2023-07-08');
INSERT INTO PRODUCT_DT
(PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT)
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 13, '2023-07-13');
INSERT INTO PRODUCT_DT
(PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT)
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 13, '2023-07-20');
INSERT INTO PRODUCT_DT
(PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT)
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 13, '2023-07-16');
INSERT INTO PRODUCT_DT
(PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT)
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 13, '2023-07-23');
INSERT INTO PRODUCT_DT
(PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT)
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 13, '2023-07-27');



INSERT INTO PRODUCT_DT
(PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT)
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 14, '2023-07-15');

INSERT INTO PRODUCT_DT
(PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT)
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 14, '2023-07-19');

INSERT INTO PRODUCT_DT
(PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT)
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 14, '2023-07-23');

INSERT INTO PRODUCT_DT
(PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT)
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 14, '2023-07-28');

INSERT INTO PRODUCT_DT
(PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT)
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 14, '2023-08-03');

INSERT INTO PRODUCT_DT
(PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT)
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 14, '2023-08-09');

INSERT INTO PRODUCT_DT
(PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT)
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 14, '2023-08-14');

INSERT INTO PRODUCT_DT
(PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT)
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 14, '2023-08-20');




INSERT INTO PRODUCT_DT
(PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT)
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 15, '2023-');



INSERT INTO PRODUCT_DT
(PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT)
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 16, '2023-07-14');

INSERT INTO PRODUCT_DT
(PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT)
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 16, '2023-07-26');

INSERT INTO PRODUCT_DT
(PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT)
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 16, '2023-08-01');

INSERT INTO PRODUCT_DT
(PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT)
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 16, '2023-08-02');

INSERT INTO PRODUCT_DT
(PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT)
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 16, '2023-08-12');

INSERT INTO PRODUCT_DT
(PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT)
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 16, '2023-08-18');

INSERT INTO PRODUCT_DT
(PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT)
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 16, '2023-08-23');

INSERT INTO PRODUCT_DT
(PRODUCT_DT_NO, PRODUCT_NO, PRODUCT_DT)
VALUES(SEQ_PRODUCT_DT_NO.NEXTVAL, 16, '2023-08-24');




-- 예약
SELECT RESERVATION_NO, PRODUCT_NO, USER_NO, CREATE_DT, RESERVATION_STATE, PAYMENT_METHOD, GUEST_COUNT, PRODUCT_DT_NO 
FROM RESERVATION;

DELETE FROM RESERVATION;


INSERT INTO RESERVATION
(RESERVATION_NO, PRODUCT_NO, USER_NO, CREATE_DT, RESERVATION_STATE, PAYMENT_METHOD, GUEST_COUNT, PRODUCT_DT_NO)
VALUES(SEQ_RESERVATION_NO.NEXTVAL, 10, 18, SYSDATE, 'Y', 'P', 6, );

INSERT INTO RESERVATION
(RESERVATION_NO, PRODUCT_NO, USER_NO, CREATE_DT, RESERVATION_STATE, PAYMENT_METHOD, GUEST_COUNT, PRODUCT_DT_NO)
VALUES(SEQ_RESERVATION_NO.NEXTVAL, 11, 18, SYSDATE, 'Y', 'P', 6, );



-- 리뷰
SELECT REVIEW_NO, USER_NO, REVIEW_MESSAGE, REVIEW_STARS, REVIEW_DEL_FL, PRODUCT_NO, CREATE_DT
FROM REVIEW;

INSERT INTO REVIEW
(REVIEW_NO, USER_NO, REVIEW_MESSAGE, REVIEW_STARS, REVIEW_DEL_FL, PRODUCT_NO, CREATE_DT)
VALUES(SEQ_REVIEW_NO.NEXTVAL, 0, '', 0, 'N'	, 0, SYSDATE);

SELECT * FROM TOUR_COURSE;

-- 관심 상품 (구매자)
SELECT WISHLIST_NO, USER_NO, PRODUCT_NO, WISH_DT
FROM WISHLIST;

INSERT INTO WISHLIST
(WISHLIST_NO, USER_NO, PRODUCT_NO, WISH_DT)
VALUES(SEQ_WISHLIST_NO.NEXTVAL, 18, 18, SYSDATE);

INSERT INTO WISHLIST
(WISHLIST_NO, USER_NO, PRODUCT_NO, WISH_DT)
VALUES(SEQ_WISHLIST_NO.NEXTVAL, 18, 16, DEFAULT);

INSERT INTO WISHLIST
(WISHLIST_NO, USER_NO, PRODUCT_NO, WISH_DT)
VALUES(SEQ_WISHLIST_NO.NEXTVAL, 18, 14, DEFAULT);


INSERT INTO WISHLIST
(WISHLIST_NO, USER_NO, PRODUCT_NO, WISH_DT)
VALUES(SEQ_WISHLIST_NO.NEXTVAL, 18, 15, SYSDATE);

SELECT * FROM PRODUCT;

-- 파일 (상품이미지 임의로 해도됨니다~~)
SELECT FILE_NO, PRODUCT_NO, FILE_ORDER, FILE_PATH
FROM "FILE";

INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, EVENT_NO, QNA_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 15, NULL, NULL, 1, '/images/product/product15_image_1');
INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, EVENT_NO, QNA_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 15, NULL, NULL, 2, '/images/product/product15_image_2');
INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, EVENT_NO, QNA_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 15, NULL, NULL, 3, '/images/product/product15_image_3');
INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, EVENT_NO, QNA_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 15, NULL, NULL, 4, '/images/product/product15_image_4');
INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, EVENT_NO, QNA_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 15, NULL, NULL, 5, '/images/product/product15_image_5');
INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, EVENT_NO, QNA_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 15, NULL, NULL, 6, '/images/product/product15_image_6');
INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, EVENT_NO, QNA_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 15, NULL, NULL, 7, '/images/product/product15_image_7');
INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, EVENT_NO, QNA_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 15, NULL, NULL, 8, '/images/product/product15_image_8');
INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, EVENT_NO, QNA_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 15, NULL, NULL, 9, '/images/product/product15_image_9');



INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, EVENT_NO, QNA_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 13, NULL, NULL, 1, '/images/product/product13_image_1.jpg');
INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, EVENT_NO, QNA_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 13, NULL, NULL, 2, '/images/product/product13_image_2.jpg');
INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, EVENT_NO, QNA_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 13, NULL, NULL, 3, '/images/product/product13_image_3.jpg');
INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, EVENT_NO, QNA_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 13, NULL, NULL, 4, '/images/product/product13_image_4.jpg');
INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, EVENT_NO, QNA_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 13, NULL, NULL, 5, '/images/product/product13_image_5.jpg');
INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, EVENT_NO, QNA_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 13, NULL, NULL, 6, '/images/product/product13_image_6.jpg');


INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, EVENT_NO, QNA_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 14, NULL, NULL, 1, '/images/product/product14_image_1.jpg');
INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, EVENT_NO, QNA_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 14, NULL, NULL, 2, '/images/product/product14_image_2.jpg');
INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, EVENT_NO, QNA_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 14, NULL, NULL, 3, '/images/product/product14_image_3.jpg');
INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, EVENT_NO, QNA_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 14, NULL, NULL, 4, '/images/product/product14_image_4.jpg');
INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, EVENT_NO, QNA_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 14, NULL, NULL, 5, '/images/product/product14_image_5.jpg');
INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, EVENT_NO, QNA_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 14, NULL, NULL, 6, '/images/product/product14_image_6.png');
INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, EVENT_NO, QNA_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 14, NULL, NULL, 7, '/images/product/product14_image_7.jpg');
INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, EVENT_NO, QNA_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 14, NULL, NULL, 8, '/images/product/product14_image_8.jpg');
INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, EVENT_NO, QNA_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 14, NULL, NULL, 9, '/images/product/product14_image_9.jpg');


INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, EVENT_NO, QNA_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 16, NULL, NULL, 1, '/images/product/product16_image_1.jpg');
INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, EVENT_NO, QNA_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 16, NULL, NULL, 2, '/images/product/product16_image_2.png');
INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, EVENT_NO, QNA_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 16, NULL, NULL, 3, '/images/product/product16_image_3.jpg');
INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, EVENT_NO, QNA_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 16, NULL, NULL, 4, '/images/product/product16_image_4.jpg');
INSERT INTO "FILE"
(FILE_NO, PRODUCT_NO, EVENT_NO, QNA_NO, FILE_ORDER, FILE_PATH)
VALUES(SEQ_FILE_NO.NEXTVAL, 16, NULL, NULL, 5, '/images/product/product16_image_5.jpg');


SELECT * FROM "FILE";


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





