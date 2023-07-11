package com.guido.reservation.model.dao;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.guido.common.model.dto.ProductDate;
import com.guido.common.model.dto.ProductOption;
import com.guido.common.model.dto.Reservation;
import com.guido.common.model.dto.User;

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
	Reservation selectReservation(Map map);

	// 예약 취소
	int reservationCancel(Reservation reservation);

	// 예약 가능한 상품인지 확인 - 1박의 경우
	int checkAvailable(Reservation reservation);

	// 예약 가능한 상품인지 확인 - 1박 이상의 경우
	int checkAvailable2(Reservation reservation);

	// 예약 가능 수량 업데이트 (구매 후)
	int updateAvailability(Reservation reservation);

	// 예약 가능 수량 업데이트 (취소 후)
	int updateDateOrOption(Reservation reservation);

	// 예약 날짜(일정) 정보 조회
	ProductDate selectReservationDate(Map<String, Object> map);

	// 비상 연락처 업데이트
	void updateEmergencyContact(User loginUser);

	// 모든 남은 옵션(시간대 조회)
	int selectCountCanReserveOption(Reservation reservation);

	// 특정 상품의 모든 일정(날짜) 구매 가능 수량 조회
	int selectCountCanReserveDate(Reservation reservation);

	// 특정 상품 판매중으로 변경
	void updateProductAvailability(Reservation reservation);

	// 특정 상품 판매 종료로 변경
	int updateProductUnavailable(Reservation reservation);
	

}
