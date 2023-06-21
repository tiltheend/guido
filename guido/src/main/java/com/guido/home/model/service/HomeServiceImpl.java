package com.guido.home.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.guido.home.model.dao.HomeMapper;

@Service
public class HomeServiceImpl implements HomeService {
	
	@Autowired
	private HomeMapper mapper;

	// themeTypeList 조회
	@Override
	public List<Map<String, Object>> selectThemeTypeList() {
		return mapper.selectThemeTypeList();
	}

}
