package com.guido.product.model.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.guido.common.model.dto.PR;
import com.guido.common.model.dto.Product;
import com.guido.common.model.dto.ProductDate;
import com.guido.common.model.dto.ProductOption;
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


	/** 인기상품 랜덤으로 조회 
	 * @return recommendList
	 */
	List<Product> selectPopularList();


	/** 추천 상품 조회 - 가이드 언어 일치하는 상품 랜덤으로
	 * @param userNo
	 * @return recommendList
	 */
	List<Product> selectRecommendList(int userNo);


	/** 얼굴 인증 사진 업로드
	 * @param loginUser
	 * @param faceImg
	 * @return result
	 */
	int updateFaceImg(User loginUser, MultipartFile faceImg) throws IllegalStateException, IOException;


	/** 캘린더 날짜 불러오기
	 * @param map
	 * @return productDateList
	 */
	List<ProductDate> selectCalendarDates(Map<String, Object> map);


	/** 날짜 선택 시 옵션 불러오기
	 * @param map
	 * @return optionInfo
	 */
	List<ProductOption> getOptionInfo(Map<String, Object> map);



}