package com.guido.home.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.guido.common.model.dto.Event;
import com.guido.common.model.dto.Product;

@Mapper
public interface HomeMapper {

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


	
	// 테마 검색 상품 목록 조회
	List<Product> selectThemeProdList(int themeCode);



	// 검색 페이지
	// 삭제되지 않고 검색 조건 일치하는 상품 수
//	int getSearchListCount(String location, String firstday, String lastday, int tourist);

	List<Product> selectSearchResult(Map<String, Object> map);

	// 위치 검색 시 드롭박스 리스트 조회
	List<String> locationSearch(String location);

	// 검색 페이지 테마 검색 상품 목록 조회  
	List<Product> selectSearchThemeProdList(int themeCode);


	
	// 관심상품 등록 여부 체크
	int selectWishListCheck(Map<String, Object> map);
	
	// 관심상품 등록
	int insertMainWish(Map<String, Integer> paramMap);

	// 관심상품 해제
	int deleteMainWish(Map<String, Integer> paramMap);


	// 관심상품
	List<Product> mainWishCheck(int userNo);



	// 메인 슬라이드 이벤트 배너 조회
	List<Event> selectEventBannerList();











	
	


}
