package com.guido.profile.model.service;

import com.guido.common.model.dto.User;

public interface ProfileTouristService {
	
	/** 가이드인지 판매자인지 체크 ( userType: 1 == G / 0 == T)
	 * @param i
	 * @return
	 */
	int userTypeCheck(int memberNo);

	/** 회원 정보 가져오기 (이메일, 이름, 프로필 이미지)
	 * @param i
	 * @return
	 */
	User userInfo(int memberNo);

}
