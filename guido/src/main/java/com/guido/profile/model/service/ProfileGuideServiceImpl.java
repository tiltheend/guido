package com.guido.profile.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.guido.common.model.dto.PR;
import com.guido.common.model.dto.User;
import com.guido.profile.model.dao.ProfileGuideMapper;

@Service
public class ProfileGuideServiceImpl implements ProfileGuideService{

	@Autowired
	private ProfileGuideMapper mapper;
	
	// 특정 상품 작성자 정보 조회
	@Override
	public User selectGuideInfo(int userNo) {
		return mapper.selectGuideInfo(userNo);
	}


	// 자기소개 조회
	@Override
	public PR selectPR(int userNo) {
		return mapper.selectPR(userNo);
	}

	
}
