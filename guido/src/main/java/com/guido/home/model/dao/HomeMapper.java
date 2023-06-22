package com.guido.home.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.guido.common.model.dto.Product;

@Mapper
public interface HomeMapper {

	// 테마 종류 조회
	List<Map<String, Object>> selectThemeTypeList();

	
	// 특정 테마의 삭제되지 않은 상품 수 조회
//	int getListCount();

	// 상품 목록 조회
	List<Product> selectProductList();

	// 인기 여행지 목록 조회
	List<Product> selectPopularProductList();

	// 슈퍼가이드 상품 목록 조회
	List<Product> selectSuperProductList();

	// 추천 상품 목록 조회
	List<Product> selectRecommProductList();
	
	
	// 특정 테마의 삭제되지 않은 상품 수 조회
//	int getListCount(int themeCode);

	// 특정 테마의 게시글 목록 조회
//	List<Product> selectProductList(int themeCode);

}
