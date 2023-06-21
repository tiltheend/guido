package com.guido.profile.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.guido.common.model.dto.User;
import com.guido.profile.model.service.ProfileTouristService;

@RequestMapping("/profile")
@Controller
public class ProfileTouristController {
	
	@Autowired
	private ProfileTouristService service;
	
	// 마이 페이지로 이동
	@GetMapping("/*")
//	@GetMapping("/{memberNo:[0-9]+}")
	public String mypageTourist(
//			@PathVariable("memberNo") int memberNo,
			Model model
			) {
		
//		System.out.println(memberNo);
		
		String path;
		// 가이드인지 판매자인지 체크 ( userType: 1 == G / 0 == T)
		int userType = service.userTypeCheck(25);
		
		// 회원 정보 가져오기 (이메일, 이름, 프로필 이미지)
		User user = service.userInfo(25);
		
		if(userType == 1) { // 가이드 일 경우
			path="profile/sellerProfile";
			
			model.addAttribute("user", user);
			System.out.println(user.getUserName()+" 가이드 프로필");
			
		} else if(userType == 0) { // 여행객 일 경우
			path="profile/buyerProfile";
			
			model.addAttribute("user", user);
			System.out.println(user.getUserName()+" 여행객 프로필");
			
		} else {
			path="/";
			System.out.println("혹시 관리자?");
		}
		
		return path;
		
	}
	
	// 투어리스트 예약 관리 페이지로 이동
	@GetMapping("/touristReservation")
	public String touristReservation() {
		return "profile/buyerReservation";
	}
	
	// 투어리스트 위시 리스트로 이동
	@GetMapping("/touristWishList")
	public String touristWhisList() {
		return "profile/buyerWishList";
	}
	
}
