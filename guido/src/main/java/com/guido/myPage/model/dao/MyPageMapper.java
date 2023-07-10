package com.guido.myPage.model.dao;

import org.apache.ibatis.annotations.Mapper;

import com.guido.common.model.dto.User;

@Mapper
public interface MyPageMapper {

	// 이름 수정 
	int nameEdit(User inputUser);

	// 기존 비번 확인
	String selectPw(User user);

	// 비번 수정
	int pwEdit(User user);

}
