package com.guido.myPage.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.guido.common.model.dto.User;
import com.guido.myPage.model.dao.MyPageMapper;

@Service
public class MyPageServiceImpl implements MyPageService{
	
	@Autowired
	private MyPageMapper mapper;
	@Autowired
	private BCryptPasswordEncoder bcrypt;
	
	// 이름 수정 
	@Override
	public int nameEdit(User inputUser) {
		return mapper.nameEdit(inputUser);
	}
	
	
	// 기존 비번 확인
	@Override
	public int checkOriginPw(User user, String originPw) {
		
			// 로그인 유저 디비 비번 조회
			String pw = mapper.selectPw(user);
			
			if(bcrypt.matches(originPw, pw)) return 1; // 맞으면 1 반환
			else return 0;
	}
	
	// 비번 수정
	@Override
	public int pwEdit(User user, String newPw) {
		user.setUserPassword(bcrypt.encode(newPw));
		return mapper.pwEdit(user);
	}

}
