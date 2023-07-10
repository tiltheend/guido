package com.guido.common.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class PR {
	// 가이드 자기소개
	
		private int userNo;
		private String birthYear;			// 출생연도
		private String job;					// 직업
		private String pets;				// 반려동물
		private String hobby;				// 취미
		private String subLang;				// 구사언어
		private String abroadExperience;	// 해외거주경험
		private String mbti;				// mbti
		private String strength;			// 강점
		private String favoriteSong;		// 좋아하는 노래
		private String tmi;					// TMI
		private String major;				// 전공
		private String dopamine;			// 요즘 나의 도파민
		private String uselessTalent;		// 쓸모 없는 재능
		private String capList;				// 가이드로서의 역량
		
		
}
