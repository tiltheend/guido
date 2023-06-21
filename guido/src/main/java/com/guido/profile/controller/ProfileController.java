package com.guido.profile.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/profile")
@Controller
public class ProfileController {
	
	@GetMapping("/mypage/T")
	public String mypageTourist() {
		return "profile/buyerProfile";
	}
	@GetMapping("/mypage/G")
	public String mypageGuide() {
		return "profile/sellerProfile";
	}
	
}
