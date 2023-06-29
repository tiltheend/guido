package com.guido.user.model.service;

import com.guido.common.model.dto.User;

public interface GoogleLoginService {

	// 구글 로그인 - 가입된 회원인지 확인
	User checkGoogleSignedup(String email);

	// 첫번째 시도
//	void googleLogin(String code);

}
