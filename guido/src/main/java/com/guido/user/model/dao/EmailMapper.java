package com.guido.user.model.dao;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.guido.common.model.dto.User;

@Mapper
public interface EmailMapper {

	int changeTempPw(Map<String, String> map);

	int sendTempPw(String email);

	// 임시 비번 요청한 유저 조회
	String selectUser(String email);



	

}
