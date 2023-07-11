package com.guido.home.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.guido.common.model.dto.Notification;

@Mapper
public interface AlarmMapper {

	// 알림 받는 회원 번호
	int selectUserNo(int productNo);

	// 알림 삽입
	int insertAlarm(Notification notice);

	// 최근 알람 10개 조회
	List<Notification> selectAlarmList(int userNo);

}
