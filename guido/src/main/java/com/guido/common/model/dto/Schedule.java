package com.guido.common.model.dto;

import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class Schedule {

	// 일정 시작 날짜
//    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
//    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "GMT+9")
    private LocalDateTime productDateStart;
 
    // 일정 끝 날짜
//    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
//    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "GMT+9")
    private LocalDateTime productDateEnd;
    

    // ProductDate
    private String productName;			// 상품명
    private int productPackage;			// 상품 패키지(1.당일 N. N박N-1일)
    private int tourDuration;			// 1Day 투어 진행시간
    
	// Product
	private int productDateNo;		// 상품 일정 번호
	private int productNo;			// 상품 번호
	private String productDate;		// 날짜
	private int userNo;			// 여행객 번호
	
	
	// ProductOption (당일 투어)
	private int optionNo;			// 옵션 번호
	private String optionName;		// 옵션 명(시간 00:00)
	

	
}
