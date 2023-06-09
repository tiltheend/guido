package com.guido.home.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.guido.common.model.dto.Notification;
import com.guido.home.model.dao.AlarmMapper;

@Service
public class AlarmServiceImpl implements AlarmService{
	
	@Autowired
	private AlarmMapper mapper;

	// 알림 받는 회원 번호
	@Override
	public int selectUserNo(int productNo) {
		return mapper.selectUserNo(productNo);
	}

	// 알림 삽입
	@Override
	public int insertAlarm(Notification notice) {
		return mapper.insertAlarm(notice);
	}

	// 최근 알람 10개 조회
	@Override
	public List<Notification> selectAlarmList(int userNo) {
		return mapper.selectAlarmList(userNo);
	}

}
