package com.guido.user.model.dao;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.guido.common.model.dto.User;

@Mapper
public interface EmailMapper {

	int changeTempPw(Map<String, String> map);

	// 임시 비번 보내기
	int sendTempPw(String email);

	// 임시 비번 요청한 유저 조회
	String selectUser(String email);

	// 회원가입-인증 번호 보내기
	int authEmail(String email);

	// 인증 번호 디비에 저장
	int updateAuthKey(Map<String, String> map); // 재전송 시 덮어 씌우기
	int insertAuthKey(Map<String, String> map); // 첫 전송 시

	// 인증 번호 확인 
	int checkAuthKey(Map<String, Object> authMap);



	

}
