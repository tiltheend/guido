package com.guido.profile.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.guido.common.model.dto.Review;
import com.guido.common.model.dto.User;
import com.guido.profile.model.service.ProfileGuideService;

@SessionAttributes("{loginUser}")
@RequestMapping("/profile")
@Controller
public class ProfileGuideController {
	
	@Autowired
	private ProfileGuideService service;
	
	// 가이드 페이지로 이동
//	@GetMapping("/mypage/G")
//	public String mypageGuide() {
//		return "profile/sellerProfile";
//	}
	
	// 리뷰 리플 달기
	@ResponseBody
	@PostMapping("/reviewReply")
	public int reviewReply(@RequestBody Review review){
		
		int result = service.reviewReply(review);
		return result;
	}
	
	// 리뷰 리플 수정
	@ResponseBody
	@PostMapping("/reviewReplyEdit")
	public int reviewReplyEdit(@RequestBody Review review){
		
		int result = service.reviewReplyEdit(review);
		return result;
	}
	
	// 리뷰 리플 삭제
	@ResponseBody
	@PostMapping(value = "/reviewReplyDel", produces="application/json; charset=UTF-8")
//	@PostMapping("/reviewReplyDel")
	public int reviewReplyDel(@RequestBody int reviewNo){
		int result = service.reviewReplyDel(reviewNo);
		return result;
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
