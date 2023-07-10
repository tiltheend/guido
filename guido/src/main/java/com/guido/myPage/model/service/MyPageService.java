package com.guido.myPage.model.service;

import com.guido.common.model.dto.User;

public interface MyPageService {

	// 이름 수정 
	int nameEdit(User inputUser);

	// 기존 비번 확인
	int checkOriginPw(User user, String originPw);

	// 비번 수정
	int pwEdit(User user, String newPw);

}
