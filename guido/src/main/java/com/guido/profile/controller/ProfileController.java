package com.guido.profile.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/profile")
@Controller
public class ProfileController {
	
	@GetMapping("/mypage")
	public String mypage() {
		return "profile/buyerProfile";
//		return "profile/sellerProfile";
	}
	
}
