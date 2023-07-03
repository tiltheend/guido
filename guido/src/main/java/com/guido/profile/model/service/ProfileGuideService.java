package com.guido.profile.model.service;

import com.guido.common.model.dto.PR;
import com.guido.common.model.dto.User;

public interface ProfileGuideService {
	
	/** 특정 상품 작성자 정보 조회
	 * @param userNo
	 * @return guide
	 */
	User selectGuideInfo(int userNo);


	/** 자기소개 조회
	 * @param userNo
	 * @return pr
	 */
	PR selectPR(int userNo);
	
}
