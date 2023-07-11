package com.guido.profile.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.guido.common.model.dto.PR;
import com.guido.common.model.dto.Product;
import com.guido.common.model.dto.Reservation;
import com.guido.common.model.dto.Review;
import com.guido.common.model.dto.User;

@Mapper
public interface ProfileGuideMapper {

	// 특정 상품 작성자 정보 조회
	User selectGuideInfo(int userNo);

	// 자기소개 조회
	PR selectPR(int userNo);

	// 가이드 상품 목록
	List<Product> guideProductList(int userNo);
	
	// 가이드 상품 목록 더보기 (3개씩)
	List<Product> guideProductMore(Map<String, Integer> request);
	
	// 가이드 상품 수 카운트
	int productCount(int userNo);
	
	// 가이드 리뷰 수 카운트
	int reviewCount(int userNo);	

	// 가이드 리뷰 조회
	List<Review> guideReivewList(int userNo);

	// 가이드 리뷰 목록 더보기 (3개씩)
	List<Review> guideReviewMore(Map<String, Integer> request);

	// 리뷰 리플 달기
	int reviewReply(Review review);
	
	// 리뷰 리플 수정
	int reviewReplyEdit(Review review);

	// 리뷰 리플 삭제
	int reviewReplyDel(int reviewNo);

	// 예약 개수 세기
	int reservarionCount(int userNo);
	
	// 가이드 예약 리스트 (구매자들 예약 확인용)
	List<Reservation> GuideReservationList(int userNo);

	// 가이드 예약 리스트 (3개씩 더보기)
	List<Reservation> guideMoreReservationList(int userNo);

	// 자기 소개 수정하기
	int prEdit(PR pr);

	// pr 있는 지 체크
	int prCheck(int userNo);

	// 자기 소개 삽입
	int prInsert(PR pr);
	





	

	

	
}
