package com.guido.product.model.service;

import java.util.List;
import java.util.Map;

import com.guido.common.model.dto.PR;
import com.guido.common.model.dto.Product;
import com.guido.common.model.dto.Review;
import com.guido.common.model.dto.User;

public interface ProductDetailService {

	/** 상품 상세 조회
	 * @param productNo
	 * @return product
	 */
	Product selectProduct(int productNo);

	
	/** 특정 상품 리뷰 목록 조회
	 * @param productNo
	 * @return reviewList
	 */
	List<Review> selectReviewList(int productNo);


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


	/** 특정 상품 옵션 목록 조회
	 * @param productNo
	 * @return optionList
	 */
	List<String> selectOptionList(int productNo);

	

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