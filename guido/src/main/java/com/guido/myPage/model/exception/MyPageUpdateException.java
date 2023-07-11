package com.guido.myPage.model.exception;

public class MyPageUpdateException extends RuntimeException{
	
	public MyPageUpdateException() {
		super("전화번호 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
	}

}
