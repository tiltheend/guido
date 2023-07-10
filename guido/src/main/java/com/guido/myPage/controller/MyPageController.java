package com.guido.myPage.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.guido.common.model.dto.User;
import com.guido.myPage.model.service.MyPageService;

@RestController
@RequestMapping("/edit")
public class MyPageController {
	
	@Autowired
	private MyPageService service;
	
	@PostMapping("/name")
	public int nameEdit(@RequestBody String changeName, @SessionAttribute("loginUser") User loginUser) {

		// changeName = "성 이름", 양쪽 " 제거해주기
		String name = changeName.replace("\"","");
		
		User editUser = new User();
		// session의 loginUser userNo set
		editUser.setUserNo(loginUser.getUserNo());
		// 변경할 이름 set
		editUser.setUserName(name);
		
		return service.nameEdit(editUser);
	}
	
	@PostMapping("/checkOriginPw")
	public int checkOriginPw(@RequestBody String inputOriginPw, @SessionAttribute("loginUser") User user) {
		String originPw = inputOriginPw.replace("\"","");
		return service.checkOriginPw(user,originPw);
		
	}
	
	@PostMapping("/password")
	public int pwEdit(@RequestBody String pw, @SessionAttribute("loginUser") User user) {
		String newPw = pw.replace("\"","");
		return service.pwEdit(user, newPw);
	}
	
	
	
	
	

}
