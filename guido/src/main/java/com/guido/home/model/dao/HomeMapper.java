package com.guido.home.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface HomeMapper {

	// themeTypeList 조회
	List<Map<String, Object>> selectThemeTypeList();

}
