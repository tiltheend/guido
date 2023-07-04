package com.guido.admin.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import com.guido.common.model.dto.Event;
import com.guido.common.model.dto.File;
import com.guido.common.model.dto.QNA;

@Mapper
public interface AdminMapper {
	int insertEvent(Event event);

	int insertFileList(List<File> uploadList);

	int getListCount(Map<String, Object> paramMap);

	List<Object> selectList(Map<String, Object> paramMap, RowBounds rowBounds);

	QNA selectQNA(int qnaNo);

	int writeAnswer(QNA qna);

	int approveGuide(List<Integer> userNoList);

	List<Map<String,String>> selectMainEventList();

	int deleteMainBanner(Object order);
	
	int setMainBanner(Map<String, Object> data);

	int eventBlind(List<Integer> eventNoList);

	int eventBlindCancel(List<Integer> eventNoList);
}