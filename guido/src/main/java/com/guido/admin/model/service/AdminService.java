package com.guido.admin.model.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.guido.common.model.dto.Event;
import com.guido.common.model.dto.QNA;

public interface AdminService {
	int eventWrite(Event event, List<MultipartFile> files) throws IllegalStateException, IOException;

	Map<String, Object> selectList(String pageName, int cp);

	QNA selectQNA(int qnaNo);
}