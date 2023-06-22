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
	
	

	// 검색상품 목록 조회
//	@Override
//	public List<Product> selectProductList(int themeCode) {
		
		// 1. 특정 테마의 삭제되지 않은 상품 수 조회
//		int listCount = mapper.getListCount(themeCode);
		
		// 2. 특정 테마의 게시글 목록 조회
//		List<Product> productList = mapper.selectProductList(themeCode);
		
//		return null;
//	}



}
