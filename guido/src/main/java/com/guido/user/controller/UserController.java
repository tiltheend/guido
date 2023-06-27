package com.guido.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import com.guido.common.model.dto.User;
import com.guido.user.model.service.UserService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@RequestMapping("/user")
@SessionAttributes({"loginUser"})
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
	
	//--------------------------------
	
	// 임시 내정보수정 페이지 이동
	// 가이드 
	@GetMapping("/myPage/editInfo/guide")
	public String editMyPageGuide() {
		return "myPage/myInfoGuide";
	}
	// 투어리스트 
	@GetMapping("/myPage/editInfo/tourist")
	public String editMyPageTourist() {
		return "myPage/myInfoTourist";
	}
	
	//----------------
	
	// 로그인
	@ResponseBody
	@PostMapping("/login")
	public RedirectView login(User inputUser, Model model // loginUser Session scopes
			, RedirectAttributes ra // 로그인 실패 시 redirect할 때 alert message
			, @RequestHeader(value="referer") String referer // 로그인 실패 시 이전 주소(로그인x 메인)
			, @RequestParam(value="rememberId", required=false) String rememberId // 아이디 저장
			, HttpServletResponse resp // 쿠키 전달용 (서버->클라이언트)
			, @RequestParam(name = "redirect", required = false) String redirectUrl // 이용 중인 페이지에서 로그인 시도
			) {
		
		User loginUser = service.login(inputUser);
		
		RedirectView path;
				
		if(loginUser != null) { // 로그인 성공
			
			// 그냥 메인-로그인 페이지 로그인 시 메인으로
			if(redirectUrl == null) {
				path = new RedirectView("/");
				ra.addFlashAttribute("message", "즐거운 여행되세요!");
			// 이용 중 페이지에서 로그인 성공 시 그 페이지 리다이렉트
			}else {
				path = new RedirectView(redirectUrl);
			}
//			 cookie (아이디 기억하기 체크)
			Cookie cookie =new Cookie("rememberId", loginUser.getUserEmail());
			
			if(rememberId != null)  cookie.setMaxAge(60*60*24*30); // 한달 유지
			else cookie.setMaxAge(0);
			
			cookie.setPath("/");
			resp.addCookie(cookie); // 클라이언트에 쿠키 전달
			
			model.addAttribute("loginUser", loginUser);
			
		}else { // 로그인 실패
			
			path = new RedirectView(referer);  
			ra.addFlashAttribute("message", "아이디 또는 비밀번호가 일치하지 않습니다.");
			
		}
		return path;
	}
	
	// 로그아웃
	@GetMapping("/logout")
	public String logout(SessionStatus status, HttpSession session) {
		status.setComplete();
		return "redirect:/";
	}
	
	

}
