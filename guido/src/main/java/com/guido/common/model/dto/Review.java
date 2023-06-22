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
	private int productNo;			// 상품 번호
	private String createDate;		// 작성일
	
	private String userName;		// 회원 이름
	private String profileImage;	// 프로필 이미지
}
