package com.guido.common.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class File {
   
   private int fileNo;		// 파일 번호
   private int productNo;	// 상품 번호
   private int eventNo;		// 이벤트 번호
   private int qnaNo;		// 문의사항 번호
   private int fileOrder;	// 파일 순서
   private String filePath;	// 파일 경로
}