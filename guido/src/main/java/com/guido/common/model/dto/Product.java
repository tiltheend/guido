package com.guido.common.model.dto;

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
	
	private int productNo;				// 상품 번호
	private String productName;			// 상품명
	private int productPackage;			// 상품 패키지(1.당일 N. N박N-1일)
	private int tourDuration;			// 1Day 투어 진행시간
	private String productContent; 		// 상품 상세 내용
	private int productPrice;			// 상품 가격
	private String productAddPrice;		// 추가 비용
	private int maxTourist;				// 최대 인원
	private int minTourist;				// 최소 인원
	
	private int userNo;					// 작성 회원 번호
	private int themeCode; 				// 테마 코드
	private String productState;		// 상품 상태 (N:정상, B:블라인드, D:삭제)
	private String createDate;			// 작성 일자
	private String guideLanguage;		// 가이드 지원 언어
	private int viewCount;				// 조회수
	
	private String regionName;			// 지역명
	private String themeName;			// 테마명
	
	private String reviewStars;			// 리뷰 평점
	
	private List<TourCourse> tourCourse;	// 여행 코스
	private User user;		// 작성자
	private List<File> imageList;			// 이미지 리스트
	private List<ProductOption> optionList;		// 옵션 리스트(당일 투어의 경우)
	 
	private String productRating;		// 평균 별점
	private int reviewCount;		// 리뷰 개수
	private int reviewPercentage;		// 리뷰 퍼센테이지
}
