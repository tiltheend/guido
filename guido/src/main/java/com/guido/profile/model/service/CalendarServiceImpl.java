package com.guido.profile.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.guido.common.model.dto.Schedule;
import com.guido.profile.model.dao.CalendarMapper;

@Service
public class CalendarServiceImpl implements CalendarService{

	@Autowired
	private CalendarMapper mapper;	
	
	// 판매자 일정 조회
	@Override
	public List<Schedule> sellerScheduleList(int userNo) {
		return mapper.sellerScheduleList(userNo);
	}

	
}
