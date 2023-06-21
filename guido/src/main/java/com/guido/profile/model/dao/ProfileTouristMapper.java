package com.guido.profile.model.dao;

import org.apache.ibatis.annotations.Mapper;

import com.guido.common.model.dto.User;

@Mapper
public interface ProfileTouristMapper {

	// 가이드인지 판매자인지 체크 ( userType: 1 == G / 0 == T)
	int userTypeCheck(int memberNo);

	// 회원 정보 가져오기 (이메일, 이름, 프로필 이미지)
	User userInfo(int memberNo);
	

}
