package com.guido.myPage.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;

import com.guido.common.model.dto.User;
import com.guido.myPage.model.service.MyPageService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/edit")
@SessionAttributes({"loginUser"})
public class MyPageController {
	
	@Autowired
	private MyPageService service;
	
	// 이름 변경
	@PostMapping("/name")
	public User nameEdit(@RequestBody String changeName, @SessionAttribute("loginUser") User loginUser) {

		// changeName = "성 이름", 양쪽 " 제거해주기
		String name = changeName.replace("\"","");
		
		User editUser = new User();
		// session의 loginUser userNo set
		editUser.setUserNo(loginUser.getUserNo());
		// 변경할 이름 set
		editUser.setUserName(name);
		
		int result = service.nameEdit(editUser);
		
		if(result>0) { // 성공하면
			
			// session 이름도 변경
			loginUser.setUserName(name);
			return loginUser;
		}else { // 실패하면
			return null;
			
		}
	}
	
	// 기존 비번 확인
	@PostMapping("/checkOriginPw")
	public int checkOriginPw(@RequestBody String inputOriginPw, @SessionAttribute("loginUser") User user) {
		String originPw = inputOriginPw.replace("\"","");
		return service.checkOriginPw(user,originPw);
		
	}
	
	// 비번 변경
	@PostMapping("/password")
	public int pwEdit(@RequestBody String pw, @SessionAttribute("loginUser") User user) {
		String newPw = pw.replace("\"","");
		return service.pwEdit(user, newPw);
	}
	
	// 전화번호 변경
	@PostMapping("/phone")
	public User telEdit(@RequestBody User editUser, @SessionAttribute("loginUser") User user) {
		
		String tel = editUser.getUserTel().replace("\"","");
		
		user.setUserTel(tel);
		user.setCountryCode(editUser.getCountryCode());
		
		int result = service.telEdit(user);
		
		if(result>0) return user;
		else return null;
		
	}
	
	// 비상 연락처 변경
	@PostMapping("/emergencyContact")
	public User emergencyContactEdit(@RequestBody String emergency, @SessionAttribute("loginUser") User user) {
		String emergencyContact = emergency.replace("\"","");
		
		user.setEmergencyContact(emergencyContact);
		
		int result =service.emergencyContactEdit(user);
		
		if(result>0) return user;
		else return null;
		
	}
	
	// 여권 번호 변경
	@PostMapping("/passport")
	public User passportEdit(@RequestBody String passport, @SessionAttribute("loginUser") User user) {
		
		String passportNo = passport.replace("\"","");
		
		user.setPassportNo(passportNo);
		
		int result =service.passportEdit(user);
		
		if(result>0) return user;
		else return null;
		
	}
	
	// 주사용 언어 변경
	@PostMapping("/primaryLanguage")
	public User primaryLanguageEdit(@RequestBody String language, @SessionAttribute("loginUser") User user) {
		
		String primaryLanguage = language.replace("\"","");
		
		user.setPrimaryLanguage(primaryLanguage);
		
		int result =service.primaryLanguageEdit(user);
		
		if(result>0) return user;
		else return null;
		
	}
	
	// 회원 탈퇴
	@PostMapping("/secession")
	public int secession(@RequestBody String chkPw, @SessionAttribute("loginUser") User user, SessionStatus status, HttpServletResponse resp) {
		
		String inputPw = chkPw.replace("\"","");
		
		int result = service.secession(inputPw, user);
		
		System.out.println(result);
		
		if(result==1) {
			status.setComplete();
			Cookie cookie = new Cookie("saved","");
			cookie.setMaxAge(0);
			cookie.setPath("/");
			resp.addCookie(cookie);
		}
		
		return result;
		
	}
	
	
	
	
	
	
	
	
	
	
	

}
