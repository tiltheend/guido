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
   
   private int fileNo;
   private int productNo;
   private int eventNo;
   private int qnaNo;
   private int fileOrder;
   private String filePath;
}