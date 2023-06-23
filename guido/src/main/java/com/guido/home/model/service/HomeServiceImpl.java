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
		
		// 1. 특정 테마의 삭제되지 않은 상품 수 조회
		int listCount = mapper.getListCount();
		
		// 2. 특정 테마의 게시글 목록 조회
		List<Product> productList = mapper.selectProductList();
		
		return productList;
	}

	// 인기 여행지 목록 조회
	@Override
	public List<Product> selectPopularProductList() {
		
		List<Product> popularProductList = mapper.selectPopularProductList();
		
		return popularProductList;
	}

	// 슈퍼가이드 상품 목록 조회
	@Override
	public List<Product> selectSuperProductList() {
		
		List<Product> superProductList = mapper.selectSuperProductList();
		
		return superProductList;
	}

	// 추천 상품 목록 조회
	@Override
	public List<Product> selectRecommProductList() {
		
		List<Product> recommProductList = mapper.selectRecommProductList();
		
		return recommProductList;
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
