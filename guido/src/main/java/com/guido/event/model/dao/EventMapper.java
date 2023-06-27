package com.guido.event.model.dao;

import org.apache.ibatis.annotations.Mapper;

import com.guido.common.model.dto.Event;

@Mapper
public interface EventMapper {
	Event selectEvent(int eventNo);
}
