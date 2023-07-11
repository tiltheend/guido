package com.guido.myPage.model.service;

import com.guido.common.model.dto.User;

public interface MyPageService {

	// 이름 수정 
	int nameEdit(User inputUser);

	// 기존 비번 확인
	int checkOriginPw(User user, String originPw);

	// 비번 수정
	int pwEdit(User user, String newPw);

	// 전화번호 수정 
	int telEdit(User user);

	// 비상 연락처 변경 
	int emergencyContactEdit(User user);

	// 여권 번호 변경 
	int passportEdit(User user);

	// 주사용 언어 변경
	int primaryLanguageEdit(User user);

}
