package com.guido.reservation.model.dao;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.guido.common.model.dto.ProductOption;
import com.guido.common.model.dto.Reservation;

@Mapper
public interface ReservationMapper {

	// 예약 가능한 일정(날짜)인지 확인 (1: 가능, 0: 불가능)
	int selectDateInRange(Map<String, Object> map);

	// 상품의 메인 코스명
	String selectMainCourseName(Integer productNo);

	// 상품의 옵션 조회
	ProductOption selectProductOption(int optionNo);

	// 예약 데이터 추가
	int insertReservation(Reservation reservation);

	// 예약 확인
	Reservation selectReservation(String orderNumber);
	

}
