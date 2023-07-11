package com.guido.common.model.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class ProductDate {
	
	private int productDateNo;		// 상품 일정 번호
	private int productNo;			// 상품 번호
	private String productDate;		// 날짜
	private String availability;	// 구매 가능 여부
	
}
