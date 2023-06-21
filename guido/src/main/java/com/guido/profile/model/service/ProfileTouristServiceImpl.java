package com.guido.profile.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.guido.common.model.dto.User;
import com.guido.profile.model.dao.ProfileTouristMapper;

@Service
public class ProfileTouristServiceImpl implements ProfileTouristService{

	@Autowired
	private ProfileTouristMapper mapper;
	
	// 가이드인지 판매자인지 체크 ( userType: 1 == G / 0 == T)
	@Override
	public int userTypeCheck(int memberNo) {
		return mapper.userTypeCheck(memberNo);
	}

	// 회원 정보 가져오기 (이메일, 이름, 프로필 이미지)
	@Override
	public User userInfo(int memberNo) {
		return mapper.userInfo(memberNo);
	}
	
	
	
}
