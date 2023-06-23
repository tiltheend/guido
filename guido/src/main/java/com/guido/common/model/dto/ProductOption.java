package com.guido.common.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class ProductOption {
	
	private int optionNo;			// 옵션 번호
	private int productNo;		// 상품 번호(당일 투어의 경우에만)
	private String optionName;		// 옵션 명(시간 00:00)
	private int optionRestCount; 	// 남은 개수
}
