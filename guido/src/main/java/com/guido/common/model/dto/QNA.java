package com.guido.common.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class QNA {
	
	private int qnaNo;
	private String qnaEmail;
	private String qnaTitle;
	private String qnaContent;
	private String qnaDeleteFL;
	private String qnaCheckFL;
	private int userNo;
	private String qnaAnswer;
	
}
