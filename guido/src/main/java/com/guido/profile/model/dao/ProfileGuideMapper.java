package com.guido.profile.model.dao;

import org.apache.ibatis.annotations.Mapper;

import com.guido.common.model.dto.PR;
import com.guido.common.model.dto.User;

@Mapper
public interface ProfileGuideMapper {

	// 특정 상품 작성자 정보 조회
	User selectGuideInfo(int userNo);

	// 자기소개 조회
	PR selectPR(int userNo);
}
