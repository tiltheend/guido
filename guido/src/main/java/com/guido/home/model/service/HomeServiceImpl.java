package com.guido.home.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.guido.common.model.dto.Event;
import com.guido.common.model.dto.Product;
import com.guido.home.model.dao.HomeMapper;

@Service
public class HomeServiceImpl implements HomeService {
	
	@Autowired
	private HomeMapper mapper;

	// 테마 종류 조회
	@Override
	public List<Map<String, Object>> selectThemeTypeList() {
		return mapper.selectThemeTypeList();
	}
	
	
	// 상품 목록 조회
	@Override
	public List<Product> selectProductList(int userNo) {
		return mapper.selectProductList(userNo);
	}

	// 인기 여행지 목록 조회
	@Override
	public List<Product> selectPopularProductList(int userNo) {
		return mapper.selectPopularProductList(userNo);
	}

	// 슈퍼가이드 상품 목록 조회
	@Override
	public List<Product> selectSuperProductList(int userNo) {
		return mapper.selectSuperProductList(userNo);
	}

	// 추천 상품 목록 조회
	@Override
	public List<Product> selectRecommProductList(int userNo) {
		return mapper.selectRecommProductList(userNo);
	}


	// 테마검색 상품목록 조회
	@Override
	public List<Product> selectThemeProdList(int themeCode) {
		return mapper.selectThemeProdList(themeCode);
	}

	
	// 검색 페이지
	@Override
	public List<Product> selectSearchResult(Map<String, Object> map) {
		return mapper.selectSearchResult(map);
	}

	// 위치 검색 시 드롭박스 리스트 조회
	@Override
	public List<String> locationSearch(String location) {
		return mapper.locationSearch(location);
	}

	// 검색 페이지 내에서 테마 검색 상품 목록 조회 
	@Override
	public List<Product> selectSearchThemeProdList(Map<String, Object> map) {
		return mapper.selectSearchThemeProdList(map);
	}

	
	// 관심상품 등록
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int updateWish(Map<String, Integer> paramMap) {
		
		int result = 0;
		
		// 관심상품 등록 X
		if(paramMap.get("check") == 0) {
			result = mapper.insertMainWish(paramMap);
			
		// 관심상품 등록 O
		} else {
			result = mapper.deleteMainWish(paramMap);
		}
		
		return result;
	}

	
	// 관심상품 등록 여부 체크
//	@Override
//	public int selectWishListCheck(Map<String, Object> map) {
//		return mapper.selectWishListCheck(map);
//	}

	// 관심상품 등록 여부 체크
//	@Override
//	public List<Product> mainWishCheck(int userNo) {
//		return mapper.mainWishCheck(userNo);
//	}



	// 메인 슬라이드 이벤트 배너 조회
	@Override
	public List<Event> selectEventBannerList() {
		return mapper.selectEventBannerList();
	}


	// 전체 상품 목록 조회
	@Override
	public List<Product> selectProductAll(int userNo) {
		return mapper.selectProductAll(userNo);
	}

	// 인기 상품 목록 조회
	@Override
	public List<Product> selectPopularProductAll(int userNo) {
		return mapper.selectPopularProductAll(userNo);
	}

	// 슈퍼가이드 상품 목록 조회
	@Override
	public List<Product> selectSuperProductAll(int userNo) {
		return mapper.selectSuperProductAll(userNo);
	}

	// 추천 상품 목록 조회
	@Override
	public List<Product> selectRecommProductAll(int userNo) {
		return mapper.selectRecommProductAll(userNo);
	}



}
