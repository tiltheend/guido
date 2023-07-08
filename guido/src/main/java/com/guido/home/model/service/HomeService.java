package com.guido.home.model.service;

import java.util.List;
import java.util.Map;

import com.guido.common.model.dto.Event;
import com.guido.common.model.dto.Product;

public interface HomeService {

	// 테마 종류 조회
	List<Map<String, Object>> selectThemeTypeList();

	
	// 상품 목록 조회
	List<Product> selectProductList(int userNo);

	// 인기 여행지 목록 조회
	List<Product> selectPopularProductList(int userNo);

	// 슈퍼가이드 상품 목록 조회
	List<Product> selectSuperProductList(int userNo);

	// 추천 상품 목록 조회
	List<Product> selectRecommProductList(int userNo);
	

	// 테마검색 상품목록 조회
	List<Product> selectThemeProdList(int themeCode);

	
	// 검색 페이지
	List<Product> selectSearchResult(Map<String, Object> map);

	// 위치 검색 시 드롭박스 리스트 조회
	List<String> locationSearch(String location);

	// 검색 페이지 내에서 테마 검색 상품 목록 조회 
	List<Product> selectSearchThemeProdList(Map<String, Object> map);

	
	// 관심상품 등록
	int updateWish(Map<String, Integer> paramMap);
	
	// 관심상품 등록 여부 체크
//	int selectWishListCheck(Map<String, Object> map);

	// 관심상품 등록 여부 체크
//	List<Product> mainWishCheck(int userNo);


	// 메인 슬라이드 이벤트 배너 조회
	List<Event> selectEventBannerList();


}
