package com.guido.profile.model.service;

import java.util.List;

import com.guido.common.model.dto.Schedule;

public interface CalendarService {


	// 판매자 일정 조회
	List<Schedule> sellerScheduleList(int userNo);
	// ArrayList<Schedule> sellerScheduleList(int userNo);

}
