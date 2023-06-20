package com.guido.reservation.model.dto;

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

}
