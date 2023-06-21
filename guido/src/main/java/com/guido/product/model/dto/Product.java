package com.guido.product.model.dto;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class Product {
	
	private int productNo;						// 상품 번호
	private String productName;			// 상품명
	private int productPackage;			// 상품 패키지(1.당일 N. N박N-1일)
	private String productContent; 		// 상품 상세 내용
	private int productPrice;					// 상품 가격
	private String productAddPrice;	// 추가 비용
	private int maxTourist;						// 최대 인원
	private int minTourist;						// 최소 인원
	
	private int userNo;								// 작성 회원 번호
	private int regionCode; 					// 지역 분류 코드
	private int themeCode; 					// 테마 코드
	private String productState;			// 상품 상태 (N:정상, B:블라인드, D:삭제)
	private String createDate;				// 작성 일자
	private String guideLanguage;		// 가이드 지원 언어
	private int viewCount;						// 조회수
	
	
	private List<TourCourse> tourCourse;
	
}
