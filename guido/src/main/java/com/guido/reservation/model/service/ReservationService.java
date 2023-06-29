package com.guido.reservation.model.service;

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

}
