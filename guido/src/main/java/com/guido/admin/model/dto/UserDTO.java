package com.guido.admin.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
	// 공통
	private int userNo; // 번호
	private String userEmail; // 이메일(아이디)
	private String userPassword; // 비밀번호
	private String userName; // 이름
	private String userTel; // 전화번호
	private String profileImage; // 프로필 이미지
	private String createDate; // 가입일
	private String userType; // 타입(G: 가이드, T: 여행객, M: 관리자)
	private String userState; // 상태(Y: 미승인(가이드), N: 정상, B: 블락, D: 탈퇴)

	// 투어리스트
	private String passportNo; // 여권 번호
	private String primaryLanguage; // 주 사용 언어
	private String emergencyContact; // 비상 연락처
	private String faceImg; // 얼굴 인증 사진

	// 가이드
	private String languageSkill; // 구사 가능 언어
	private String activityArea; // 활동지역
	private String confirmationNo; // 확인증 번호
	private String superGuideFl; // 슈퍼가이드 여부(N: 일반가이드, Y: 슈퍼가이드)
	private PRDTO pr; // 가이드 자기소개
}
