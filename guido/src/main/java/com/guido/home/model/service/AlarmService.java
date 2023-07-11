package com.guido.home.model.service;

import java.util.List;

import com.guido.common.model.dto.Notification;

public interface AlarmService {

	// 알림 받는 회원 번호
	int selectUserNo(int productNo);

	// 알림 삽입
	int insertAlarm(Notification notice);

	// 최근 알람 10개 조회
	List<Notification> selectAlarmList(int userNo);

}
