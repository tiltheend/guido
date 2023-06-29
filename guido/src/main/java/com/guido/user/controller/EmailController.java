package com.guido.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.guido.user.model.service.EmailService;

@Controller
@RequestMapping("/sendEmail")
public class EmailController {
	
	@Autowired
	private EmailService service;
	
	// 임시 비번 보내기
	@GetMapping("/tempPw")
	@ResponseBody
	public int sendTempPw(String email) {
		return service.sendTempPw(email);
	}
	
	

}
