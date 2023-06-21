package com.guido.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.guido.user.model.service.UserService;

@RequestMapping("/user")
@Controller
public class UserController {
	
	@Autowired
	private UserService service;
	
	// 로그인 페이지
	@GetMapping("/loginPage")
	public String moveLogin(){
		return "login/login";
	}
	
	// 회원가입 페이지
	@GetMapping("/signUp/chooseMemberType")
	public String signUpPage() {
		return "signUp/chooseMemberType";
	}
	
	// 로그인
	@PostMapping("/login")
	public String login() {
		
		
		return null;
	}
	

}
