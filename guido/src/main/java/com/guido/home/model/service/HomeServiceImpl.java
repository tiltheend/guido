package com.guido.home.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
	public List<Product> selectProductList() {
		return mapper.selectProductList();
	}

	// 인기 여행지 목록 조회
	@Override
	public List<Product> selectPopularProductList() {
		return mapper.selectPopularProductList();
	}

	// 슈퍼가이드 상품 목록 조회
	@Override
	public List<Product> selectSuperProductList() {
		return mapper.selectSuperProductList();
	}

	// 추천 상품 목록 조회
	@Override
	public List<Product> selectRecommProductList() {
		return mapper.selectRecommProductList();
	}



	// 테마 검색 상품 목록 조회
	@Override
	public List<Product> selectThemeProdList(int themeCode) {
		return mapper.selectThemeProdList(themeCode);
	}



	
	
	
	// 검색 페이지
	@Override
	public List<Product> selectSearchResult(Map<String, Object> map) {
		return mapper.selectSearchResult(map);
	}

	// 헤더 위치 검색
	@Override
	public List<Product> locationSearch(String location) {
		return mapper.locationSearch(location);
	}



	


}
