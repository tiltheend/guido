package com.guido.product.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.guido.common.model.dto.File;
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

}
