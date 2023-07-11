package com.guido.profile.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.guido.common.model.dto.Schedule;

@Mapper
public interface CalendarMapper {

	// 판매자 일정 조회
	public List<Schedule> sellerScheduleList(int userNo);

}
