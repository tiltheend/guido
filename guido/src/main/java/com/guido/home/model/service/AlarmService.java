package com.guido.home.model.service;

import com.guido.common.model.dto.Notification;

public interface AlarmService {

	// 알림 받는 회원 번호
	int selectUserNo(int productNo);

	// 알림 삽입
	int insertAlarm(Notification notice);

}
