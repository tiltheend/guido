package com.guido.profile.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.guido.common.model.dto.Reservation;
import com.guido.common.model.dto.Review;
import com.guido.common.model.dto.User;
import com.guido.profile.model.service.ProfileTouristService;

import jakarta.servlet.http.HttpSession;

@RequestMapping("/profile")
@Controller
public class ProfileTouristController {
	
	@Autowired
	private ProfileTouristService service;
	
	// 마이 페이지로 이동
	@GetMapping("/*")
//	@GetMapping("/{memberNo:[0-9]+}")
	public String mypageTourist(
//			@PathVariable("memberNo") int memberNo,
			Model model
			) {
		
//		System.out.println(memberNo);
		
		String path;
		// 가이드인지 판매자인지 체크 ( userType: 1 == G / 0 == T)
		int userType = service.userTypeCheck(25);
		
		// 회원 정보 가져오기 (이메일, 이름, 프로필 이미지)
		User user = service.userInfo(25);
		
		if(userType == 1) { // 가이드 일 경우
			path="profile/sellerProfile";
			
			model.addAttribute("user", user);
			System.out.println(user.getUserName()+" 가이드 프로필");
			
			
		} else if(userType == 0) { // 여행객 일 경우
			path="profile/buyerProfile";
			
			model.addAttribute("user", user);
			System.out.println(user.getUserName()+" 여행객 프로필");
			
			// 구매 내역 가져오기 (상품 번호, 썸네일)
			List<Reservation> reservationList = service.reservationList(25);
			model.addAttribute("reservationList", reservationList);
			
			// 구매 수 카운트
//			int reservationCount = service.reservationCount(25);
//			model.addAttribute("reservationCount", reservationCount);
			
			// 나의 리뷰 내역 가져오기
			List<Review> reviewList = service.reviewList(25);
			
			// 0.5 단위로 별점 바꾸기
			for(Review r : reviewList) {
				System.out.println("너 리뷰스타"+r.getReviewStars());
//				double realStar = r.getReviewStars()/20.0;
				r.setReviewStarsDouble(r.getReviewStars()/20.0);
				System.out.println(r.getReviewStarsDouble());
			}
			
			model.addAttribute("reviewList", reviewList);
			
			// 리뷰 수 카운트
			int reviewCount = service.reviewCount(25);
			model.addAttribute("reviewCount", reviewCount);
			
		} else {
			path="common/main";
			System.out.println("혹시 관리자?");
		}
		
		return path;
		
	}
	
	// 프로필 이미지 수정
	@PostMapping("/profileEdit")
	public String updateProfile(
			@RequestParam("profileImage") MultipartFile profileImage // 업로드 파일
			, RedirectAttributes ra
			) throws IllegalStateException, IOException {

		// 프로필 이미지 수정 서비스 호출
		int result = service.updateProfile(profileImage, 25);
		
		String message = null;
		if(result>0) message = "프로필 이미지가 변경 되었습니다.";
		else		 message = "프로필 변경 실패";
		
		ra.addFlashAttribute("message",message);
		

		return "redirect:buyerProfile";
	}
	
	// 투어리스트 예약 관리 페이지로 이동
	@GetMapping("/touristReservation")
	public String touristReservation() {
		return "profile/buyerReservation";
	}
	
	// 투어리스트 위시 리스트로 이동
	@GetMapping("/touristWishList")
	public String touristWhisList() {
		return "profile/buyerWishList";
	}
	
}