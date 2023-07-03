package com.guido.user.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.guido.user.model.service.EmailService;

@Controller
@RequestMapping("/sendEmail")
public class EmailController {
	
	@Autowired
	private EmailService service;
	
	// 비번을 잊어버리셨나요? - 임시 비번 보내기
	@GetMapping("/tempPw")
	@ResponseBody
	public int sendTempPw(String email) {
		return service.sendTempPw(email);
	}
	
	// 회원가입 시 메일 인증번호 발송
	@GetMapping("/authEmail")
	@ResponseBody
	public int authEmail(String email) {
		return service.authEmail(email);
	}
	
	// 이메일 인증번호 확인
	@GetMapping("/checkAuthKey")
	@ResponseBody
	public int checkAuthKey(@RequestParam Map<String, Object> authMap) {
		System.out.println(authMap);
		return service.checkAuthKey(authMap);
	}
	
	

}
