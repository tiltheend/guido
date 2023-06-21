package com.guido.common.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class WishList {
	
	private int wishListNo;
	private int userNo;
	private int productNo;
	private String wishDt;
}
