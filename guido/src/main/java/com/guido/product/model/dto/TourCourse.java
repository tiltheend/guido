package com.guido.product.model.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
public class TourCourse {
	
	private int courseNo;					// 여행지 번호
	private int productNo;					// 상품 번호
	private String courseName;		// 여행지 키워드
	private int courseOrder;				// 여행지 순서
	private String latitude;					// 여행지 좌표 - 위도
	private String longitude;				// 여행지 좌표 - 경도
	private String bossCourseFL;		// 대표 코스 여부 (Y: 대표, N: 나머지)
}
