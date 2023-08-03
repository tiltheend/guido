package com.guido.product.controller;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.ResponseEntity;
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
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.google.gson.Gson;
import com.guido.common.model.dto.PR;
import com.guido.common.model.dto.Product;
import com.guido.common.model.dto.ProductDate;
import com.guido.common.model.dto.ProductOption;
import com.guido.common.model.dto.Review;
import com.guido.common.model.dto.User;
import com.guido.product.model.service.ProductDetailService;

@Controller
@RequestMapping("/productDetail")
@SessionAttributes("{loginUser}")
@PropertySource("classpath:/config.properties")
public class ProductDetailController {
	
	@Autowired
	private ProductDetailService service;
	
	
	@Value("${kakao.map.apikey}")
	private String apiKey;
	
	@Value("${tourapi.festival.key}")
	private String festivalApikey;
	
	
	// 상품 상세 조회
	@GetMapping("/product/{productNo}")
	public String selectProductDetail(@PathVariable("productNo") int productNo,
			@RequestParam(value="guest", required=false, defaultValue="1") int guestCount ,  Model model,
			@SessionAttribute(value="loginUser", required=false) User loginUser) {
		
		
		Product product = service.selectProduct(productNo);
		
		if(product==null)
			return "error/404";
		
		if(product.getProductState().equals("D"))
			return "error/404";
		
		
		User guide = service.selectGuideInfo(product.getUserNo());
		PR pr = service.selectPR(product.getUserNo());
		List<Review> reviewList = service.selectReviewList(productNo);
		List<Product> recommendList = null;
		List<ProductDate> allProductDateList = service.selectAllProductDateList(productNo);
		
		
		// 비로그인 유저 => 인기 상품 랜덤 조회 (상위 10개 중 랜덤 4개 조회)
		if(loginUser==null)
			recommendList = service.selectPopularList();
		else {
			
			// 여행객의 경우 => 가이드 언어 일치하는 상품 랜덤으로 4개 조회
			if(loginUser.getUserType().equals("T"))
				recommendList = service.selectRecommendList(loginUser.getUserNo());
			// 가이드 or 관리자의 경우 => 인기 상품 랜덤 조회 (상위 10개 중 랜덤 4개 조회)
			else
				recommendList = service.selectPopularList();
				
			// (조회 데이터가 4개 이하라면) 인기상품 랜덤 조회
			if(recommendList.size()<4)
				recommendList = service.selectPopularList();
		}
		

		// 구분자로 문자열 쪼개기
		List<String> addNotesList = null;
		
		if(product.getProductAddNotes()!=null) {
			addNotesList = Arrays.asList(product.getProductAddNotes().split("\\^\\^\\^"));
		}
		
		int wishOrNot = -1;		// 관심 등록
		
		if(loginUser!=null) {
			
			Map<String, Integer> map = new HashMap<>();
			map.put("productNo", productNo);
			
			map.put("userNo", loginUser.getUserNo());
			
			wishOrNot = service.selectWishCheck(map);
		}
		
		
		int eachCost = 0;		// 1박 or 	1박 이상
		
		if(product.getProductPackage()!=1)
			eachCost = (product.getProductPrice()/guestCount);
		
			
		model.addAttribute("product", product);
		model.addAttribute("guide", guide);
		model.addAttribute("pr", pr);
		model.addAttribute("guestCount", guestCount);
		model.addAttribute("reviewList", reviewList);
		model.addAttribute("eachCost", eachCost);
		model.addAttribute("wishOrNot", wishOrNot);
		model.addAttribute("addNotesList", addNotesList);
		model.addAttribute("allProductDateList", allProductDateList);
		model.addAttribute("apiKey", apiKey);
		model.addAttribute("festivalApikey", festivalApikey);
		model.addAttribute("recommendList", recommendList);
		
		
		return "productDetail/productDetail";
	}
	
	
	// 관심상품 등록 처리
	@PostMapping("/updateWish")
	@ResponseBody
	public int updateWish(@RequestBody Map<String, Integer> map) {
		return service.updateWish(map);
	}
	
	
	// 얼굴 인증 사진 업로드
	@PostMapping("/faceImageUpload")
	public String faceImageUpload(@RequestParam("faceImg") MultipartFile faceImg,
			int productNo, @SessionAttribute(value="loginUser", required=false) User loginUser,
			RedirectAttributes ra ) throws IllegalStateException, IOException {
		
		int result = service.updateFaceImg(loginUser, faceImg);
		
		if(result<1) 
			ra.addFlashAttribute("message", "이미지 업로드 실패");
		
		return "redirect:product/" + productNo; 
			
	}
	
	
	// 캘린더 날짜 불러오기
	@GetMapping("/calendarDates")
	@ResponseBody
	public List<ProductDate> selectProductDateList(@RequestParam("year") int year, 
			@RequestParam("month") int month, @RequestParam("productNo") int productNo){
		
		Map<String, Object> map = new HashMap<>();
		map.put("year", year);
		map.put("month", month);
		map.put("productNo", productNo);
		
		return service.selectCalendarDates(map);
	}
	
	
	// 날짜 선택 시 옵션 불러오기
	@GetMapping("/getOptionInfo")
	@ResponseBody
	public List<ProductOption> selectOptionList(@RequestParam("productDate") String productDate, @RequestParam("productNo") int productNo){
		
		Map<String, Object> map = new HashMap<>();
		map.put("productDate", productDate);
		map.put("productNo", productNo);
		
		return service.getOptionInfo(map);
	}
	
	
}







