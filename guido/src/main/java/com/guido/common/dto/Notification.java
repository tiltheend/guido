package com.guido.common.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class Notification {

	private int notificationNo;
	private int receiverNo;
	private int senderNo;
	private String notificationContent;
	private String createDt;
	private String notificationURL;
	private String notificationType;
}
