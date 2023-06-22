package com.guido.common.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class Reservation {
	
	private int reservationNo;
	private int productNo;
	private int userNo;
	private String createDate;
	private String reservationState;
	private String paymentMethod;
	private int guestCount;
	private int productDateNo;
	
	private String thumbnail; // 썸네일

}
