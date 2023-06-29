package com.guido.user.model.service;

public interface AjaxService {

	/** 이메일 중복 검사 (비번 찾기 / 회원가입)
	 * @param email
	 * @return
	 */
	int checkEmail(String email);

}
