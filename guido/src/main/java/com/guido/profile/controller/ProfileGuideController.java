package com.guido.profile.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.guido.common.model.dto.Product;
import com.guido.common.model.dto.Reservation;
import com.guido.common.model.dto.Review;
import com.guido.common.model.dto.User;
import com.guido.profile.model.service.ProfileGuideService;
import com.guido.profile.model.service.ProfileTouristService;

@SessionAttributes("{loginUser}")
@RequestMapping("/profile")
@Controller
public class ProfileGuideController {
	
	@Autowired
	private ProfileTouristService Touristservice;
	
	@Autowired
	private ProfileGuideService service;
	
	// 가이드 페이지로 이동
	// 타입 검사 때문에 구매자 페이지 컨트롤러에 있음~~
	
	// 비동기로 가이드 판매 상품 목록 불러오기 (최신 3개)
	@ResponseBody
	@PostMapping(value="/guideProductList", produces="application/json; charset=UTF-8")
	public List<Product> guideProductList(@RequestBody int userNo){

		// 가이드 상품 목록
		List<Product> guideProductList = service.guideProductList(userNo);

		return guideProductList;
	}
	
	// 가이드 상품 목록 더보기 (3개씩)
	@ResponseBody
	@PostMapping(value="/guideProductMore", produces="application/json; charset=UTF-8")
	public List<Product> guideProductMore(@RequestBody Map<String, Integer> request){
			
		List<Product> guideProductMore = service.guideProductMore(request);
		
		return guideProductMore;
	}

	
	// 비동기로 가이드 리뷰 목록 불러오기 (최신 3개)
	@ResponseBody
	@PostMapping(value="/guideReivewList", produces="application/json; charset=UTF-8")
	public List<Review> guideReivewList(@RequestBody int userNo){

		List<Review> guideReivewList = service.guideReivewList(userNo);
		
		// 0.5 단위로 별점 바꾸기
		for(Review r : guideReivewList) {
			r.setReviewStarsDouble(r.getReviewStars()/20.0);
		}
		
		return guideReivewList;
	}
	
	// 가이드 리뷰 목록 더보기 (3개씩)
	@ResponseBody
	@PostMapping(value="/guideReviewMore", produces="application/json; charset=UTF-8")
	public List<Review> guideReviewMore(@RequestBody Map<String, Integer> request){
			
		List<Review> guideReviewMore = service.guideReviewMore(request);
		
		// 0.5 단위로 별점 바꾸기
		for(Review r : guideReviewMore) {
			r.setReviewStarsDouble(r.getReviewStars()/20.0);
		}
		
		return guideReviewMore;
	}
	
	
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
	@PostMapping("/reviewReplyDel")
	public int reviewReplyDel(@RequestBody int reviewNo){
		int result = service.reviewReplyDel(reviewNo);
		return result;
	}
	

	// 가이드 예약 일정 확인 페이지로 이동
	@GetMapping("/guideReservationSchedule")
	public String guideReservationSchedule(
			@SessionAttribute("loginUser") User loginUser,
			Model model) {
		
		int userNo= loginUser.getUserNo();
		
		// 회원 정보 가져오기 (이메일, 이름, 프로필 이미지, 유저 넘버)
		User user = Touristservice.userInfo(userNo);
		model.addAttribute("user", user);
		
		// 가이드 자기 소개
		User guide = service.selectGuideInfo(userNo);
		
		model.addAttribute("guide", guide);
		
		return "profile/sellerReservationSchedule";
	}
	
	// 가이드 예약 내역 페이지로 이동
	@GetMapping("/guideReservation")
	public String guideReservation(
			@SessionAttribute("loginUser") User loginUser,
			Model model) {
		
		int userNo= loginUser.getUserNo();
		
		// 회원 정보 가져오기 (이메일, 이름, 프로필 이미지, 유저 넘버)
		User user = Touristservice.userInfo(userNo);
		model.addAttribute("user", user);
		
		// 가이드 자기 소개
		User guide = service.selectGuideInfo(userNo);
		model.addAttribute("guide", guide);
		
		// 가이드 예약 리스트 (구매자들 예약 확인용)
		List<Reservation> GuideReservationList = service.GuideReservationList(userNo);
		model.addAttribute("GuideReservationList", GuideReservationList);
		
		// 0.5 단위로 별점 바꾸기
		for(Reservation r : GuideReservationList) {
			System.out.println(r);
		}
		
		// 예약 개수 세기
		int reservarionCount = service.reservarionCount(userNo);
		model.addAttribute("reservarionCount", reservarionCount);
		
		return "profile/sellerReservation";
	}
	
	// 가이드 예약 리스트 (비동기 조회)
	@ResponseBody
	@PostMapping(value="/guideReservationList", produces="application/json; charset=UTF-8")
	public List<Reservation> guideReservationList(@RequestBody int userNo){

		List<Reservation> guideReservationList = service.GuideReservationList(userNo);
		// int reservationCount = service.reservationCount(userNo);
		
		return guideReservationList;
	}
	
	// 가이드 예약 리스트 (3개씩 더보기)
	@ResponseBody
	@PostMapping(value="/guideMoreReservationList", produces="application/json; charset=UTF-8")
	public List<Reservation> guideMoreReservationList(@RequestBody int userNo){
		
		List<Reservation> guideMoreReservationList = service.guideMoreReservationList(userNo);
		
		return guideMoreReservationList;
	}
	


}
