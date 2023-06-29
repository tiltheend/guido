package com.guido.user.model.dao;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface EmailMapper {

	int changeTempPw(Map<String, String> map);

	int sendTempPw(String email);



	

}
