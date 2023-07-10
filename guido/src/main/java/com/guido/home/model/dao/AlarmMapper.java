package com.guido.home.model.dao;

import org.apache.ibatis.annotations.Mapper;

import com.guido.common.model.dto.Notification;

@Mapper
public interface AlarmMapper {

	// 알림 받는 회원 번호
	int selectUserNo(int productNo);

	// 알림 삽입
	int insertAlarm(Notification notice);

}
