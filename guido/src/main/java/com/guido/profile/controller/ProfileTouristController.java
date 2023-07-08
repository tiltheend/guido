package com.guido.profile.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.guido.common.model.dto.PR;
import com.guido.common.model.dto.Product;
import com.guido.common.model.dto.Reservation;
import com.guido.common.model.dto.Review;
import com.guido.common.model.dto.User;
import com.guido.profile.model.service.ProfileGuideService;
import com.guido.profile.model.service.ProfileTouristService;


@SessionAttributes("{loginUser}")
@RequestMapping("/profile")
@Controller
public class ProfileTouristController {
	
	@Autowired
	private ProfileTouristService service;
	
	@Autowired
	private ProfileGuideService GuideService;
	
	// 프로필 조회
	@GetMapping("/{userNo:[0-9]+}")
	public String mypageTourist(
			@PathVariable("userNo") int userNo,
			Model model
			) {
		
		String path;
		// 가이드인지 판매자인지 체크 ( userType: 1 == G / 0 == T)
		int userType = service.userTypeCheck(userNo);
		
		// 회원 정보 가져오기 (이메일, 이름, 프로필 이미지, 유저 넘버)
		User user = service.userInfo(userNo);
		
		if(userType == 1) { // 가이드 일 경우
			path="profile/sellerProfile";
			
			model.addAttribute("user", user);
			
//			System.out.println(user.getUserName()+" 가이드 프로필");
			
			// 가이드 자기 소개
			User guide = GuideService.selectGuideInfo(userNo);
			PR pr = GuideService.selectPR(userNo);
			
			model.addAttribute("guide", guide);
			model.addAttribute("pr", pr);
			
			// 가이드 상품 목록
			List<Product> guideProductList = GuideService.guideProductList(userNo);
			model.addAttribute("guideProductList", guideProductList);
			
			// 가이드 상품 수 카운트
			int productCount = GuideService.productCount(userNo);
			model.addAttribute("productCount", productCount);
			
			// 가이드 리뷰 조회
			List<Review> guideReivewList = GuideService.guideReivewList(userNo);
			
			// 0.5 단위로 별점 바꾸기
			for(Review r : guideReivewList) {
				r.setReviewStarsDouble(r.getReviewStars()/20.0);
			}
			
			model.addAttribute("guideReivewList", guideReivewList);
			
			// 가이드 리뷰 수 카운트
			int reviewCount = GuideService.reviewCount(userNo);
			model.addAttribute("reviewCount", reviewCount);

			
		} else if(userType == 0) { // 여행객 일 경우
			path="profile/buyerProfile";
			
			model.addAttribute("user", user);
			
			
			// 구매 내역 가져오기 (상품 번호, 썸네일)
			List<Reservation> reservationList = service.reservationList(userNo);
			model.addAttribute("reservationList", reservationList);
			
			// 내가 쓴 리뷰 내역 가져오기
			List<Review> reviewList = service.reviewList(userNo);
			
			// 0.5 단위로 별점 바꾸기
			for(Review r : reviewList) {
				r.setReviewStarsDouble(r.getReviewStars()/20.0);
			}
			
			model.addAttribute("reviewList", reviewList);
			
			// 리뷰 수 카운트
			int reviewCount = service.reviewCount(userNo);
			model.addAttribute("reviewCount", reviewCount);
			
			// 리뷰 안쓴 목록 가져오기 (상품 번호, 상품 제목)
			List<Review> addReviewList = service.addReviewList(userNo);
			
			model.addAttribute("addReviewList", addReviewList);
			
			
		} else {
			path="common/main";
			System.out.println("혹시 관리자?");
		}
		
		return path;
		
	}
	
	// 프로필 이미지 수정
	@PostMapping("/profileEdit")
	public String updateProfile(
			@RequestParam("profileImage") MultipartFile profileImage, // 업로드 파일
			RedirectAttributes ra,
			@SessionAttribute("loginUser") User loginUser
			) throws IllegalStateException, IOException {

		int userNo= loginUser.getUserNo();
		
		// 프로필 이미지 수정 서비스 호출
		int result = service.updateProfile(profileImage, userNo);
		
		String message = null;
		if(result>0) message = "프로필 이미지가 변경 되었습니다.";
		else		 message = "프로필 변경 실패";
		
		ra.addFlashAttribute("message",message);
		
		return "redirect:/profile/"+userNo;
	}
	
	// 구매자 프로필 자신이 쓴 리뷰 목록 더보기 (3개씩)
	@ResponseBody
	@PostMapping(value="/myReviewMore", produces="application/json; charset=UTF-8")
	public List<Review> myReviewMore(@RequestBody Map<String, Integer> request){
			
		List<Review> moreReviewList = service.myReviewMore(request);
		
		// 0.5 단위로 별점 바꾸기
		for(Review r : moreReviewList) {
			r.setReviewStarsDouble(r.getReviewStars()/20.0);
		}
		
		return moreReviewList;
	}
	
	// 리뷰 작성
	@ResponseBody
	@PostMapping(value="/addReview",produces="application/json")
	public int addReview(@RequestBody Review review,
			@SessionAttribute("loginUser") User loginUser){

		review.setUserNo(loginUser.getUserNo());
	
		int result = service.addReview(review);
		
		return result;
		
	}
	
	// 비동기로 리뷰 목록 불러오기 (최신 3개)
	@ResponseBody
	@PostMapping(value="/newReviewList", produces="application/json; charset=UTF-8")
	public List<Review> newReviewList(@RequestBody int userNo){

		List<Review> newReviewList = service.reviewList(userNo);
		int reviewCount = service.reviewCount(userNo);
		for(Review r : newReviewList) {
			r.setReviewCount(reviewCount);
			// 0.5 단위로 별점 바꾸기
			r.setReviewStarsDouble(r.getReviewStars()/20.0);
		}
		
		return newReviewList;
	}
	
	// 리뷰 삭제
	@ResponseBody
	@PostMapping(value="/reviewDel",produces="application/json; charset=UTF-8")
	public int reviewDel(@RequestBody int productNo,
			@SessionAttribute("loginUser") User loginUser){

		Review review = new Review();
		review.setUserNo(loginUser.getUserNo());
		review.setProductNo(productNo);
		
		int result = service.reviewDel(review);
		
		return result;
		
	}
	
	// 리뷰 수정
	@ResponseBody
	@PostMapping(value="/reviewEdit",produces="application/json; charset=UTF-8")
	public int reviewEdit(@RequestBody Review review,
			@SessionAttribute("loginUser") User loginUser){

		review.setUserNo(loginUser.getUserNo());
		
		int result = service.reviewEdit(review);

		return result;
	}
	
	// 투어리스트 예약 관리 페이지로 이동
	@GetMapping("/touristReservation")
	public String touristReservation(
			@SessionAttribute("loginUser") User loginUser,
			Model model) {
		
		int userNo= loginUser.getUserNo();
		
		// 회원 정보 가져오기 (이메일, 이름, 프로필 이미지, 유저 넘버)
		User user = service.userInfo(userNo);
		model.addAttribute("user", user);
		
		// 구매 내역 가져오기 (자세한)
		// (예약 번호, 회원 번호 (예약), 주문 처리 상태 (Y: 예약 완료, N: 예약 취소, D: 구매확정)
		// 선택한 상품 일정 번호, 썸네일, 상품 날짜, 상품명
		// + 추가 예정 : 예약 번호 + 상품가격
		
		 List<Reservation> reservationList = service.myReservation(userNo);
		 model.addAttribute("reservationList", reservationList);
		 
		// 구매 수 카운트
		 int reservationCount = service.reservationCount(userNo);
		 model.addAttribute("reservationCount", reservationCount);
		 
		 // System.out.println(reservationList);
		
		return "profile/buyerReservation";
	}
	
	// 구매자 예약 목록 더보기 (3개씩)
	@ResponseBody
	@PostMapping(value="/myReservationMore", produces="application/json; charset=UTF-8")
	public List<Reservation> myReservationMore(@RequestBody int startReservationNum,
			@SessionAttribute("loginUser") User loginUser){
			
		Map<String, Integer> map = new HashMap<>();
		
		map.put("startReservationNum", startReservationNum);
		map.put("userNo",loginUser.getUserNo());
		
		List<Reservation> moreReservationMore = service.myReservationMore(map);
		return moreReservationMore;
	}
	
	// 비동기로 예약 목록 불러오기 (최신 3개)
	@ResponseBody
	@PostMapping(value="/newReservationList", produces="application/json; charset=UTF-8")
	public List<Reservation> newReservationList(@RequestBody int userNo){

		List<Reservation> newReservationList = service.myReservation(userNo);
		// int reservationCount = service.reservationCount(userNo);
		
		return newReservationList;
	}
	
	// 투어리스트 위시 리스트로 이동
	@GetMapping("/touristWishList")
	public String touristWhisList(
			@SessionAttribute("loginUser") User loginUser,
			Model model) {
		
		int userNo= loginUser.getUserNo();
		
		// 회원 정보 가져오기 (이메일, 이름, 프로필 이미지, 유저 넘버)
		User user = service.userInfo(userNo);
		model.addAttribute("user", user);
		
		// 위시리스트 가져오기
		// 상품 이름, 상품 가격, 지역 이름, 패키지 박수(1박이면 total, 2박 이상이면 /per), 별점
		// productName, productPrice, regionName, productPackage(상품 패키지(1.당일 N. N박N-1일)), reviewStars
		
		List<Product> myWishList = service.myWishList(userNo);
		
		for(Product p : myWishList) { // 위시리스트
			p.setWishOrNot(1);
		}
		
		model.addAttribute("myWishList", myWishList);
		
		return "profile/buyerWishList";
	}
	
	
	// 관심상품 등록 처리
	@PostMapping("/updateWish")
	@ResponseBody
	public int updateWish(@RequestBody Map<String, Integer> map) {
		
		return service.updateWish(map);
	}
	
	
}
