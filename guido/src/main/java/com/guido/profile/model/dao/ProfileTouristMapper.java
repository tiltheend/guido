package com.guido.profile.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.guido.common.model.dto.Reservation;
import com.guido.common.model.dto.Review;
import com.guido.common.model.dto.User;

@Mapper
public interface ProfileTouristMapper {

	// 가이드인지 판매자인지 체크 ( userType: 1 == G / 0 == T)
	int userTypeCheck(int userNo);

	// 회원 정보 가져오기 (이메일, 이름, 프로필 이미지)
	User userInfo(int userNo);

	// 프로필 이미지 수정
	int updateProfile(User user);

	// 구매 내역 가져오기 (상품 번호, 썸네일)
	List<Reservation> reservationList(int userNo);

	// 구매 수 카운트
	int reservationCount(int userNo);

	// 리뷰 내역 가져오기
	List<Review> reviewList(int userNo);

	// 리뷰 수 카운트
	int reviewCount(int userNo);

	

}
