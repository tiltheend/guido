package com.guido.admin.model.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.guido.common.model.dto.Event;

public interface AdminService {
	Map<String, Object> selectEventList(int cp);

	Event selectEvent(int eventNo);

	int eventWrite(Event event, List<MultipartFile> files) throws IllegalStateException, IOException;

	Map<String, Object> selectTouristList(int cp);

	Map<String, Object> selectGuideList(int cp);
}