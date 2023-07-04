package com.guido.reservation.model.service;

import java.io.IOException;
import java.util.Map;

import com.guido.common.model.dto.ProductOption;

public interface ReservationService {

	
	/** 예약 가능한 일정(날짜)인지 확인 (1: 가능, 0: 불가능)
	 * @param map
	 * @return inRange
	 */
	int selectDateInRange(Map<String, Object> map);

	
	
	/** 상품의 메인 코스명
	 * @param productNo
	 * @return mainCourse
	 */
	String selectMainCourseName(Integer productNo);



	/** 예약하려는 상품의 옵션 조회
	 * @param optionNo
	 * @return option
	 */
	ProductOption selectProductOption(int optionNo);
	
	
	/** 아임포트 API 키와 SECRET키로 토큰 생성
	 * @return
	 * @throws IOException
	 */
	String getToken() throws IOException;
	
	
	
	/** 결제 정보
	 * @param imp_uid
	 * @param access_token
	 * @return
	 * @throws IOException 
	 */
	int paymentInfo(String imp_uid, String access_token) throws IOException;
	
	
	/** 결제 취소
	 * @param access_token
	 * @param imp_uid
	 * @param amount
	 * @param reason
	 * @throws IOException 
	 */
	public void paymentCancel(String access_token, String imp_uid, String amount, String reason) throws IOException;

}
