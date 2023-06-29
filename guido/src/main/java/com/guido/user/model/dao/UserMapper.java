package com.guido.user.model.dao;

import org.apache.ibatis.annotations.Mapper;

import com.guido.common.model.dto.User;

@Mapper
public interface UserMapper {

	// 로그인
	User login(User inputUser);

	// 구글 로그인 - 가입된 회원인지 확인
	User checkGoogleSignedup(String googleEmail);
	
	// 

}
