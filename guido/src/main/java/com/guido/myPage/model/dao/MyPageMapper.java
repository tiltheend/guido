package com.guido.myPage.model.dao;

import org.apache.ibatis.annotations.Mapper;

import com.guido.common.model.dto.User;

@Mapper
public interface MyPageMapper {

	// 이름 수정 
	int nameEdit(User inputUser);

	// 기존 비번 확인
	String selectPw(User user);

	// 비번 수정
	int pwEdit(User user);

	// 전화번호 수정
	int telEdit(User user);

	// 국가코드 수정 (투어리스트만)
	int countryCodeEdit(User user);

	// 비상 연락처 수정
	int updateEmergencyContact(User user);

	// 여권 번호 수정
	int passportEdit(User user);

	
	// 주사용 언어 수정
	int primaryLanguageEdit(User user);

	// 구사 가능 언어 수정 
	int languageSkillEdit(User user);
	
	// 회원 탈퇴
	int secession(User user);

	

}
