package com.guido.user.model.dao;

import org.apache.ibatis.annotations.Mapper;

import com.guido.common.model.dto.User;

@Mapper
public interface UserMapper {

	// 로그인
	User login(User inputUser);

}
