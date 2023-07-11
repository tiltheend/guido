package com.guido.user.model.service;

import com.guido.common.model.dto.User;

public interface UserService {

	User login(User inputUser);

	// 회원가입
	int signUp(User inputUser);

}
