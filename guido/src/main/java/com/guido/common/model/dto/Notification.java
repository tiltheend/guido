package com.guido.common.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class Notification {

	private int notificationNo;  // 알림 번호
	private int receiverNo; // 받은 회원 번호
	private int senderNo; // 보낸 회원 번호
	private String notificationContent; // 알림 내용
	private String createDt; // 보낸 시간
	private String notificationURL; // 연결링크
	private String notificationType; // 타입
	
	private String userName;
	private int productNo;
	private String productName;
}
