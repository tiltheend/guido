package com.guido.myPage.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.guido.common.model.dto.User;
import com.guido.myPage.model.dao.MyPageMapper;

@Service
public class MyPageServiceImpl implements MyPageService{
	
	@Autowired
	private MyPageMapper mapper;
	@Autowired
	private BCryptPasswordEncoder bcrypt;
	
	// 이름 수정 
	@Transactional(rollbackFor = { Exception.class })
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
	@Transactional(rollbackFor = { Exception.class })
	@Override
	public int pwEdit(User user, String newPw) {
		user.setUserPassword(bcrypt.encode(newPw));
		return mapper.pwEdit(user);
	}
	
	// 전화번호 수정
	@Transactional(rollbackFor = { Exception.class })
	@Override
	public int telEdit(User user) {
		
		int result1 = mapper.telEdit(user);
		int result2= mapper.countryCodeEdit(user);
		
		if((result1>0)&&(result2>0)) { // 둘 다 성공 해야만 함
			return 1; // 성공
		}else { // 둘 중 하나라도 실패 시
			return 0;
		}
	}
	
	// 비상 연락처 저장 
	@Transactional(rollbackFor = { Exception.class })
	@Override
	public int emergencyContactEdit(User user) {
		
			return mapper.updateEmergencyContact(user);
			
	}
	
	
	// 여권 번호 저장 
	@Transactional(rollbackFor = { Exception.class })
	@Override
	public int passportEdit(User user) {
		
		return mapper.passportEdit(user);
		
	}
	
	// 주사용 언어 저장 
	@Transactional(rollbackFor = { Exception.class })
	@Override
	public int primaryLanguageEdit(User user) {
		
		return mapper.primaryLanguageEdit(user);
		
	}
	
	
	
	

}
