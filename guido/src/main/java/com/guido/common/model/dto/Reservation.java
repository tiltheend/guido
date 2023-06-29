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
	
	private int reservationNo;			// 예약 번호
	private int productNo;				// 상품 번호
	private int userNo;				// 회원 번호 (예약한)
	private String createDate;			// 예약 일자 (예약 성립된 시간)
	
	private String reservationState;	// 주문 처리 상태 (Y: 에약 완료, N: 예약 취소, D: 구매확정완료)
	private String paymentMethod;		// 결제 수단(C: 신용카드, P:페이팔)
	private int guestCount;			// 인원 수
	private int productDateNo;			// 선택한 상품 일정 번호
	private int optionNo;		// 선택한 옵션 번호
	
	// --------------- 테이블 끝!
	
	private String thumbnail; // 썸네일 (파일 오더 1번)

}
