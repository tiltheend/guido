package com.guido.admin.model.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.guido.common.model.dto.Event;
import com.guido.common.model.dto.QNA;

public interface AdminService {
	int writeEvent(Event event, List<MultipartFile> files) throws IllegalStateException, IOException;

	Map<String, Object> selectList(Map<String, Object> paramMap, int cp);

	QNA selectQNA(int qnaNo);

	int writeAnswer(QNA qna);

	int approveGuide(List<Integer> userNoList);

	List<Map<String,String>> selectMainEventList();

	int setMainBanner(Map<String, Object> data);

	int eventBlind(List<Integer> eventNoList);

	int eventBlindCancel(List<Integer> eventNoList);
}