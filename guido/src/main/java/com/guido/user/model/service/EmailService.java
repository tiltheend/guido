package com.guido.user.model.service;

public interface EmailService {

	int sendTempPw(String email);
	
	String createAuthKey();
	
	String createTempPw();

}
