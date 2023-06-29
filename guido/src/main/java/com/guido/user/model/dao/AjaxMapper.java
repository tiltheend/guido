package com.guido.user.model.dao;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AjaxMapper {

	// 이메일 중복 검사
	int checkEmail(String email);

}
