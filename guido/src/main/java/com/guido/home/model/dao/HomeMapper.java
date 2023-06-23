package com.guido.home.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.guido.common.model.dto.Product;

@Mapper
public interface HomeMapper {

	// 테마 종류 조회
	List<Map<String, Object>> selectThemeTypeList();

	

	// 상품 목록 조회
	List<Product> selectProductList();

	// 인기 여행지 목록 조회
	List<Product> selectPopularProductList();

	// 슈퍼가이드 상품 목록 조회
	List<Product> selectSuperProductList();

	// 추천 상품 목록 조회
	List<Product> selectRecommProductList();


	
	// 테마 검색 상품 목록 조회
	List<Product> selectThemeProdList(int themeCode);
	
	


}
