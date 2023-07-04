package com.guido.profile.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.guido.common.model.dto.PR;
import com.guido.common.model.dto.Product;
import com.guido.common.model.dto.Review;
import com.guido.common.model.dto.User;
import com.guido.profile.model.dao.ProfileGuideMapper;

@Service
public class ProfileGuideServiceImpl implements ProfileGuideService{

	@Autowired
	private ProfileGuideMapper mapper;
	
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

	// 가이드 상품 목록
	@Override
	public List<Product> guideProductList(int userNo) {
		return mapper.guideProductList(userNo);
	}

	// 가이드 리뷰 조회
	@Override
	public List<Review> guideReivewList(int userNo) {
		return mapper.guideReivewList(userNo);
	}

	
}
