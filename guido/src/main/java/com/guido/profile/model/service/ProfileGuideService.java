package com.guido.profile.model.service;

import java.util.List;

import com.guido.common.model.dto.PR;
import com.guido.common.model.dto.Product;
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


	/** 가이드 리뷰 조회
	 * @param userNo
	 * @return
	 */
	List<Review> guideReivewList(int userNo);


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



}
