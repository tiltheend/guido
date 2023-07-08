package com.guido.profile.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.guido.common.model.dto.PR;
import com.guido.common.model.dto.Product;
import com.guido.common.model.dto.Reservation;
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
	
	// 가이드 상품 목록 더보기 (3개씩)
	@Override
	public List<Product> guideProductMore(Map<String, Integer> request) {
		return mapper.guideProductMore(request);
	}

	// 가이드 상품 수 카운트
	@Override
	public int productCount(int userNo) {
		return mapper.productCount(userNo);
	}


	// 가이드 리뷰 조회
	@Override
	public List<Review> guideReivewList(int userNo) {
		return mapper.guideReivewList(userNo);
	}
	

	// 가이드 리뷰 수 카운트
	@Override
	public int reviewCount(int userNo) {
		return mapper.reviewCount(userNo);
	}
	
	// 가이드 리뷰 목록 더보기 (3개씩)
	@Override
	public List<Review> guideReviewMore(Map<String, Integer> request) {
		return mapper.guideReviewMore(request);
	}

	// 리뷰 리플 달기
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int reviewReply(Review review) {
		return mapper.reviewReply(review);
	}

	// 리뷰 리플 수정
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int reviewReplyEdit(Review review) {
		return mapper.reviewReplyEdit(review);
	}

	// 리뷰 리플 삭제
	@Override
	public int reviewReplyDel(int reviewNo) {
		return mapper.reviewReplyDel(reviewNo);
	}

	// 예약 개수 세기
	@Override
	public int reservarionCount(int userNo) {
		return mapper.reservarionCount(userNo);
	}


	// 가이드 예약 리스트 (구매자들 예약 확인용)
	@Override
	public List<Reservation> GuideReservationList(int userNo) {
		return mapper.GuideReservationList(userNo);
	}
	
	// 가이드 예약 리스트 (3개씩 더보기)
	@Override
	public List<Reservation> guideMoreReservationList(int userNo) {
		return mapper.guideMoreReservationList(userNo);
	}

	

	
}
