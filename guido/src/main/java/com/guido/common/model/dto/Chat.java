package com.guido.common.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class Chat {
	
	private int chatNo;
	private String readOrNot;
	private String chatMessage;
	private String chatSendDt;
	private int chatRoomNo;
	private int userNo;
}
