package com.guido.common.model.dto;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class Event {
	int eventNo;
	String eventName;
	String eventContent;
	String eventEndDt;
	String createDt;
	String state;
	String bgColor;
	int mainBannerOrder;
	
	List<File> fileList;
}