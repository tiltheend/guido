package com.guido.profile.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.guido.common.model.dto.Reservation;
import com.guido.common.model.dto.Review;
import com.guido.common.model.dto.User;

@Mapper
public interface ProfileTouristMapper {

	// 가이드인지 판매자인지 체크 ( userType: 1 == G / 0 == T)
	int userTypeCheck(int userNo);

	// 회원 정보 가져오기 (이메일, 이름, 프로필 이미지, 유저 넘버)
	User userInfo(int userNo);

	// 프로필 이미지 수정
	int updateProfile(User user);

	// 구매 내역 가져오기 (상품 번호, 썸네일)
	List<Reservation> reservationList(int userNo);

	// 구매 수 카운트
	int reservationCount(int userNo);

	// 내가 쓴 리뷰 내역 가져오기
	List<Review> reviewList(int userNo);

	// 리뷰 수 카운트
	int reviewCount(int userNo);

	// 구매자 프로필 자신이 쓴 리뷰 목록 더보기 (3개씩)
	List<Review> myReviewMore(Map<String, Integer> request);

	// 리뷰 안쓴 목록 가져오기
	List<Review> addReviewList(int userNo);

	// 리뷰 작성
	int addReview(Review review);

	// 리뷰 삭제
	int reviewDel(Review review);

	// 리뷰 수정
	int reviewEdit(Review review);

	// 구매 내역 가져오기 (자세한)
	List<Reservation> myReservation(int userNo);

	

}
