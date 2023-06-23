package com.guido.admin.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import com.guido.common.model.dto.Event;
import com.guido.common.model.dto.File;
import com.guido.common.model.dto.User;

@Mapper
public interface AdminMapper {

	List<Event> selectEventList(Object object, RowBounds rowBounds);

	Event selectEvent(int eventNo);

	int insertEvent(Event event);

	int insertFileList(List<File> uploadList);

	int getListCount(String table);

	int getUserListCount(String type);

	List<User> selectUserList(String string, RowBounds rowBounds);

	List<User> selectTouristList(String string, RowBounds rowBounds);

	List<User> selectGuideList(String String, RowBounds rowBounds);
}