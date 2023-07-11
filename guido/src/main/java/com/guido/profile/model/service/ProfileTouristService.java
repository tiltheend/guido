package com.guido.profile.model.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.guido.common.model.dto.Product;
import com.guido.common.model.dto.Reservation;
import com.guido.common.model.dto.Review;
import com.guido.common.model.dto.User;

public interface ProfileTouristService {
	
	/** 가이드인지 판매자인지 체크 ( userType: 1 == G / 0 == T)
	 * @param userNo
	 * @return
	 */
	int userTypeCheck(int userNo);

	/** 회원 정보 가져오기 (이메일, 이름, 프로필 이미지, 유저 넘버)
	 * @param userNo
	 * @return
	 */
	User userInfo(int userNo);

	/** 프로필 이미지 수정
	 * @param profileImage
	 * @param userNo
	 * @return
	 */
	int updateProfile(MultipartFile profileImage, int userNo) throws IllegalStateException, IOException;

	/** 구매 내역 가져오기 (상품 번호, 썸네일)
	 * @param userNo
	 * @return
	 */
	List<Reservation> reservationList(int userNo);

	/** 구매 수 카운트
	 * @param userNo
	 * @return
	 */
	int reservationCount(int userNo);

	/** 내가 쓴 리뷰 내역 가져오기
	 * @param userNo
	 * @return
	 */
	List<Review> reviewList(int userNo);

	/** 리뷰 수 카운트
	 * @param userNo
	 * @return
	 */
	int reviewCount(int userNo);

	/** 구매자 프로필 자신이 쓴 리뷰 목록 더보기 (3개씩)
	 * @param request
	 * @return
	 */
	List<Review> myReviewMore(Map<String, Integer> request);

	/** 리뷰 안쓴 목록 가져오기
	 * @param userNo
	 * @return
	 */
	List<Review> addReviewList(int userNo);

	/** 리뷰 작성
	 * @param review
	 * @return
	 */
	int addReview(Review review);

	/** 리뷰 삭제
	 * @param review
	 * @return
	 */
	int reviewDel(Review review);

	/** 리뷰 수정
	 * @param review
	 * @return
	 */
	int reviewEdit(Review review);

	/** 구매 내역 가져오기 (자세한)
	 * @param userNo
	 * @return
	 */
	List<Reservation> myReservation(int userNo);

	/** 구매자 예약 목록 더보기 (3개씩)
	 * @param map
	 * @return
	 */
	List<Reservation> myReservationMore(Map<String, Integer> map);

	/** 위시리스트 가져오기
	 * @param userNo
	 * @return
	 */
	List<Product> myWishList(int userNo);


	/** 관심 상품 등록 여부 체크
	 * @param map
	 * @return wishOrNot
	 */
	int selectWishCheck(Map<String, Integer> map);


	/** 관심 상품 등록 처리
	 * @param map
	 * @return
	 */
	int updateWish(Map<String, Integer> map);



}
