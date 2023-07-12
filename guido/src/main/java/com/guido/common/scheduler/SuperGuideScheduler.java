package com.guido.common.scheduler;

import java.text.ParseException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.guido.admin.model.service.AdminService;

// 매일 정각 12시에 조건에 맞는 가이드를 슈퍼가이드로 설정 
// 조건에 맞지 않는 가이드를 슈퍼가이드에서 일반가이드로 설정
@Component
public class SuperGuideScheduler {
	
	@Autowired
	private AdminService service;
	
	@Scheduled(cron = "0 0 12 * * ?")
	public void updateSuperGuide() throws ParseException {
		System.out.println("슈퍼가이드 스케줄러 동작.");
		System.out.println(service.updateSuperGuide()+"명의 유저가 슈퍼 가이드가 되었습니다.");
		System.out.println(service.updateGeneralGuide()+"명의 유저가 일반 가이드로 강등 되었습니다.");
	}
}
