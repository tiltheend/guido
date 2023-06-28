package com.guido.admin.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import com.guido.common.model.dto.Event;
import com.guido.common.model.dto.File;
import com.guido.common.model.dto.Product;
import com.guido.common.model.dto.QNA;
import com.guido.common.model.dto.User;

@Mapper
public interface AdminMapper {


	int insertEvent(Event event);

	int insertFileList(List<File> uploadList);

	int getListCount(String pageName);

	List<Object> selectList(String pageName, RowBounds rowBounds);

	Event selectEvent(int eventNo);

	QNA selectQNA(int qnaNo);
}