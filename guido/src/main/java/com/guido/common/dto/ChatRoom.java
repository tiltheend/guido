package com.guido.common.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ChatRoom {

	private int chatRoomNo;
	private String createDt;
	private int productNo;
	private int userNo;
}
