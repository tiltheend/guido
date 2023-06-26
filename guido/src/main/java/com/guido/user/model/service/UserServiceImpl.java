package com.guido.user.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.guido.common.model.dto.User;
import com.guido.user.model.dao.UserMapper;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserMapper mapper;
	@Autowired
	private BCryptPasswordEncoder bcrypt;
	
	@Override
	public User login(User inputUser) {
		// 암호화 확인
//		System.out.println("암호화 확인 : " + bcrypt.encode(inputUser.getUserPassword()));
		
		User loginUser = mapper.login(inputUser); // 조회해서
		
//		if(loginUser != null) { // 일치하는 회원 있으면
//			if(bcrypt.matches(inputUser.getUserPassword(), loginUser.getUserPassword())) {
//				loginUser.setUserPassword(null); // 보안 위해 로그인된 비번 정보 제거
//			} else {
//				loginUser = null; // 로그인 실패
//			}
//		}
			
		//bcrypt 전 테스트
		if(loginUser != null) {
			if(!(inputUser.getUserPassword().equals(loginUser.getUserPassword()))) loginUser = null; // 비번 틀리면 로그인 실패!
		}
			
		return loginUser;
	}

}
