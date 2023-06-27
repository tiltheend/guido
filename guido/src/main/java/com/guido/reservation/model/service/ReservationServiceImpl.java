package com.guido.reservation.model.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.guido.reservation.model.dao.ReservationMapper;

@Service
public class ReservationServiceImpl implements ReservationService{
	
	@Autowired
	private ReservationMapper mapper;

	// 예약 가능한 일정(날짜)인지 확인 (1: 가능, 0: 불가능)
	@Override
	public int selectDateInRange(Map<String, Object> map) {
		return mapper.selectDateInRange(map);
	}

	
	// 상품의 메인 코스명
	@Override
	public String selectMainCourseName(Integer productNo) {
		return mapper.selectMainCourseName(productNo);
	}
}
