package com.guido.user.model.service;

import java.util.Map;

import com.guido.common.model.dto.QNA;

public interface EmailService {

	// 임시 비번 보내기
	int sendTempPw(String email);
	
	String createAuthKey();
	
	String createTempPw();

	// 회원가입-인증 번호 보내기
	int authEmail(String email);

	// 인증 번호 확인
	int checkAuthKey(Map<String, Object> authMap);

	// 답변 이메일
	String sendAnswer(QNA qna);
}
