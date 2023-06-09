package com.guido.user.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.guido.common.model.dto.User;
import com.guido.user.model.dao.UserMapper;
import com.guido.user.model.exception.UserSignupException;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserMapper mapper;
	@Autowired
	private BCryptPasswordEncoder bcrypt;
	
	// 로그인
	@Override
	public User login(User inputUser) {
		// 암호화 확인
		System.out.println("암호화 확인 : " + bcrypt.encode(inputUser.getUserPassword()));
		
		User loginUser = mapper.login(inputUser); // 조회해서
		
		if(loginUser != null) { // 일치하는 회원 있으면
			if(bcrypt.matches(inputUser.getUserPassword(), loginUser.getUserPassword())) {
				loginUser.setUserPassword(null); // 보안 위해 로그인된 비번 정보 제거
			} else {
				loginUser = null; // 로그인 실패
			}
		}
			
		//bcrypt 전 테스트
//		if(loginUser != null) {
//			if(!(inputUser.getUserPassword().equals(loginUser.getUserPassword()))) loginUser = null; // 비번 틀리면 로그인 실패!
//		}
			
		return loginUser;
	}

	// 회원가입
	@Transactional(rollbackFor = { Exception.class })
	@Override
	public int signUp(User inputUser) {
		
		// BCrypt
		String encPw = bcrypt.encode(inputUser.getUserPassword());
		inputUser.setUserPassword(encPw);
		
		
		int result = mapper.signUp(inputUser); // USER 테이블 insert
		
		if(result>0) { // 성공하면
			int inputUserNo = mapper.signUpUserNo(inputUser); // userNo 가져와서 (select)
			
			inputUser.setUserNo(inputUserNo); // userNo set 하고 
			
			if(inputUser.getUserType().equals("T")) { // TOURIST 테이블 insert
				int TouristInsert = mapper.insertTourist(inputUser); 
				if(TouristInsert==0) { // TOURIST 테이블 insert 실패 하면 commit 되지 않도록 강제 오류 발생
					throw new UserSignupException();
				}
			}
			if(inputUser.getUserType().equals("G")) { // GUIDE 테이블 insert
				int GuideInsert = mapper.insertGuide(inputUser); 
				if(GuideInsert==0) { // GUIDE 테이블 insert 실패 하면 commit 되지 않도록 강제 오류 발생
					throw new UserSignupException();
				}
			}
		}else { // 실패하면 실패 
			result = 0;
		}
		
		return result;
	}
	

}
