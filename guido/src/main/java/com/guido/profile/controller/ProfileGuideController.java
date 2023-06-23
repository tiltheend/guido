package com.guido.profile.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/profile")
@Controller
public class ProfileGuideController {
	
	// 가이드 페이지로 이동
	@GetMapping("/mypage/G")
	public String mypageGuide() {
		return "profile/sellerProfile";
	}
	
	// 가이드 예약 일정 확인 페이지로 이동
	@GetMapping("/guideReservationSchedule")
	public String guideReservationSchedule() {
		return "profile/sellerReservationSchedule";
	}
	
	// 가이드 예약 내역 페이지로 이동
	@GetMapping("/guideReservation")
	public String guideReservation() {
		return "profile/sellerReservation";
	}
	


}
