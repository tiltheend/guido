package com.guido.profile.model.service;

import java.util.List;
import java.util.Map;

import com.guido.common.model.dto.PR;
import com.guido.common.model.dto.Product;
import com.guido.common.model.dto.Reservation;
import com.guido.common.model.dto.Review;
import com.guido.common.model.dto.User;

public interface ProfileGuideService {
	
	/** 특정 상품 작성자 정보 조회
	 * @param userNo
	 * @return guide
	 */
	User selectGuideInfo(int userNo);


	/** 자기소개 조회
	 * @param userNo
	 * @return pr
	 */
	PR selectPR(int userNo);


	/** 가이드 상품 목록
	 * @param userNo
	 * @return
	 */
	List<Product> guideProductList(int userNo);

	/** 가이드 상품 목록 더보기 (3개씩)
	 * @param request
	 * @return
	 */
	List<Product> guideProductMore(Map<String, Integer> request);

	/** 가이드 리뷰 조회
	 * @param userNo
	 * @return
	 */
	List<Review> guideReivewList(int userNo);


	/** 가이드 리뷰 목록 더보기 (3개씩)
	 * @param request
	 * @return
	 */
	List<Review> guideReviewMore(Map<String, Integer> request);


	/** 리뷰 리플 달기
	 * @param review
	 * @return
	 */
	int reviewReply(Review review);
	
	
	/** 리뷰 리플 수정
	 * @param review
	 * @return
	 */
	int reviewReplyEdit(Review review);


	/** 리뷰 리플 삭제
	 * @param replyNo
	 * @return
	 */
	int reviewReplyDel(int reviewNo);


	/** 가이드 리뷰 수 카운트
	 * @param userNo
	 * @return
	 */
	int reviewCount(int userNo);


	/** 가이드 상품 수 카운트
	 * @param userNo
	 * @return
	 */
	int productCount(int userNo);

	/** 예약 개수 세기
	 * @param userNo
	 * @return
	 */
	int reservarionCount(int userNo);

	/** 가이드 예약 리스트 (구매자들 예약 확인용)
	 * @param userNo
	 * @return
	 */
	List<Reservation> GuideReservationList(int userNo);


	/** 가이드 예약 리스트 (3개씩 더보기)
	 * @param request
	 * @return
	 */
	List<Reservation> guideMoreReservationList(Map<String, Integer> request);


	/** 자기 소개 수정하기
	 * @param pr
	 * @return
	 */
	int prEdit(PR pr);


	/** pr 있는 지 체크
	 * @param userNo
	 * @return
	 */
	int prCheck(int userNo);


	/** 자기 소개 삽입
	 * @param pr
	 * @return
	 */
	int prInsert(PR pr);






}
