package com.guido.user.model.exception;

public class UserSignupException extends RuntimeException{
	
	public UserSignupException() {
		super("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
	}

}
