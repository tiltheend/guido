package com.guido.product.model.dao;


import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.guido.common.model.dto.File;
import com.guido.common.model.dto.PR;
import com.guido.common.model.dto.Product;
import com.guido.common.model.dto.Review;
import com.guido.common.model.dto.User;

@Mapper
public interface ProductDetailMapper {

	// 상품 상세 조회
	Product selectProduct(int productNo);

	// 특정 상품 리뷰 목록 조회
	List<Review> selectReviewList(int productNo);

	// 특정 상품 작성자 정보 조회
	User selectGuideInfo(int userNo);

	// 자기소개 조회
	PR selectPR(int userNo);

	// 특정 상품 옵션 목록 조회
	List<String> selectOptionList(int productNo);
	
}
