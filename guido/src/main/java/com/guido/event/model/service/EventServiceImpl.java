package com.guido.event.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.guido.common.model.dto.Event;
import com.guido.event.model.dao.EventMapper;

@Service
public class EventServiceImpl implements EventService {

	@Autowired
	EventMapper mapper;

	// 이벤트 디테일 페이지
	@Override
	public Event selectEvent(int eventNo) {
		// 이벤트 번호로 이벤트 셀렉트
		Event event = mapper.selectEvent(eventNo);
		// 0번 인덱스는 썸네일이므로 삭제.
		if (!event.getFileList().isEmpty())
			event.getFileList().remove(0);
		return event;
	}
}
