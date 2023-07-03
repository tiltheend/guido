package com.guido.product.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.guido.common.model.dto.PR;
import com.guido.common.model.dto.Product;
import com.guido.common.model.dto.Review;
import com.guido.common.model.dto.User;
import com.guido.product.model.dao.ProductDetailMapper;

@Service
public class ProductDetailServiceImpl implements ProductDetailService{
	
	@Autowired
	private ProductDetailMapper mapper;

	
	// 상품 상세 조회
	@Override
	public Product selectProduct(int productNo) {
		return mapper.selectProduct(productNo);
	}


	// 특정 상품 리뷰 목록 조회
	@Override
	public List<Review> selectReviewList(int productNo) {
		return mapper.selectReviewList(productNo);
	}


	// 특정 상품 작성자 정보 조회
	@Override
	public User selectGuideInfo(int userNo) {
		return mapper.selectGuideInfo(userNo);
	}


	// 자기소개 조회
	@Override
	public PR selectPR(int userNo) {
		return mapper.selectPR(userNo);
	}


	// 특정 상품 옵션 목록 조회
	@Override
	public List<String> selectOptionList(int productNo) {
		return mapper.selectOptionList(productNo);
	}


	// 관심 상품 등록 여부 체크
	@Override
	public int selectWishCheck(Map<String, Integer> map) {
		return mapper.selectWishCheck(map);
	}


	// 관심 상품 등록 처리
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int updateWish(Map<String, Integer> map) {
	
		int result = 0;
		
		// 관심상품 등록 X
		if(map.get("check")==0)
			result = mapper.insertProductWish(map);
		else
			result = mapper.deleteProductWish(map);
		
		return result;
	}


	// 인기 상품 랜덤 조회
	@Override
	public List<Product> selectPopularList() {
		return mapper.selectPopularList();
	}


	// 추천 상품 조회 - 가이드 언어 일치하는 상품 랜덤으로
	@Override
	public List<Product> selectRecommendList(int userNo) {
		return mapper.selectRecommendList(userNo);
	}

}