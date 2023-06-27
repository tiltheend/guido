package com.guido.common.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class Review {
	private int reviewNo;			// 리뷰 번호
	private int userNo;				// 리뷰 작성 회원 번호
	private String reviewMessage;	// 리뷰 상세 내용
	private int reviewStars;		// 리뷰 별점
	private String reviewDeleteFL;	// 리뷰 삭제 여부
	s
	private String createDate;		// 작성일

	// --------------- 테이블 끝!
	
	private String userName;			// 회원 이름
	private String profileImage;		// 프로필 이미지
	
	private String productName;		// 상품명
	private String productDtNo;		// 상품 일정 번호
	private String reviewReply;		// 리뷰 답글
	private double reviewStarsDouble;		// 리뷰 별점 (0.5 단위)
	

}
