package com.guido.product.model.dao;


import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

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

	
	// 관심상품 등록 여부 체크
	int selectWishCheck(Map<String, Integer> map);


	// 관심 상품 등록
	int insertProductWish(Map<String, Integer> map);

	
	// 관심 상품 해제
	int deleteProductWish(Map<String, Integer> map);

	// 인기 상품 랜덤 조회
	List<Product> selectPopularList();

	
	// 추천 상품 조회 - 가이드 언어 일치하는 상품 랜덤으로
	List<Product> selectRecommendList(int userNo);

	// 얼굴 인증 사진 업데이트
	int updateFaceImg(User loginUser);
	
}