package com.guido.home.controller;

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

import com.guido.common.model.dto.Event;
import com.guido.common.model.dto.Product;
import com.guido.common.model.dto.User;
import com.guido.home.model.service.HomeService;


@SessionAttributes({"loginUser"})
@RequestMapping("/common")
@Controller
public class HomeController {
	
	@Autowired
	private HomeService service;

//	// 메인 페이지 이동 + 상품 목록 조회
//	@GetMapping("/home")
//	public String mainPage(Model model
//						, @SessionAttribute(value="loginUser", required=false) User loginUser) {
//
//		int userNo = 0;
//		
//		if(loginUser != null) {
//			userNo = loginUser.getUserNo();
//		}
//		
//		// 상품 목록 조회
//		List<Product> productList = service.selectProductList(userNo);
//		model.addAttribute("productList", productList);
//		
//		// 인기 여행지 목록 조회
//		List<Product> popularProductList = service.selectPopularProductList(userNo);
//		model.addAttribute("popularProductList", popularProductList);
//		
//		// 슈퍼가이드 상품 목록 조회
//		List<Product> superProductList = service.selectSuperProductList(userNo);
//		model.addAttribute("superProductList", superProductList);
//		
//		// 추천 상품 목록 조회
//		List<Product> recommProductList = service.selectRecommProductList(userNo);
//		model.addAttribute("recommProductList", recommProductList);
//		
//		// 메인 슬라이드 이벤트 배너 조회
//		List<Event> eventBannerList = service.selectEventBannerList();
//		model.addAttribute("eventBannerList", eventBannerList);
//		
//		return "common/index";
//	}
	
	
	// 테마검색 상품목록 조회
	@GetMapping(value = "/home/{themeCode}", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public List<Product> selectThemeProdList(@PathVariable("themeCode") int themeCode
			, @SessionAttribute(value="loginUser", required=false) User loginUser) {
		
		Map<String, Integer> map = new HashMap<>();
		
		map.put("themeCode", themeCode);
		if(loginUser != null) {			
			map.put("userNo", loginUser.getUserNo());						
		}

		List<Product> themeList = service.selectThemeProdList(map);
		
	    return themeList;
	}
	
	
	// 전체 상품 목록 조회
	@GetMapping("/products")
	public String productList(Model model
			, @SessionAttribute(value="loginUser", required=false) User loginUser) {
		
		int userNo = 0;
		
		if(loginUser != null) {
			userNo = loginUser.getUserNo();
		}
		
		List<Product> productAll = service.selectProductAll(userNo);
		model.addAttribute("productAll", productAll); 
		
		// System.out.println("productAll" + productAll);
		
		return "common/productList";
	}
	
	
	// 인기 상품 목록 조회
	@GetMapping("/popular_products")
	public String popularProductList(Model model
			, @SessionAttribute(value="loginUser", required=false) User loginUser) {
		
		int userNo = 0;
		
		if(loginUser != null) {
			userNo = loginUser.getUserNo();
		}
		
		List<Product> popularProductAll = service.selectPopularProductAll(userNo);
		model.addAttribute("popularProductAll", popularProductAll);
		
		// System.out.println("popularProductAll" + popularProductAll);
		
		return "common/popularList";
	}
	
	
	// 슈퍼가이드 상품 목록 조회
	@GetMapping("/superguide_products")
	public String superguideProductList(Model model
			, @SessionAttribute(value="loginUser", required=false) User loginUser) {
		
		int userNo = 0;
		
		if(loginUser != null) {
			userNo = loginUser.getUserNo();
		}
		
		List<Product> superProductAll = service.selectSuperProductAll(userNo);
		model.addAttribute("superProductAll", superProductAll);
		
		// System.out.println("superProductAll" + superProductAll);
		
		return "common/superList";
	}
	
	
	// 추천 상품 목록 조회
	@GetMapping("/recommendation_products")
	public String recommendationProductList(Model model
			, @SessionAttribute(value="loginUser", required=false) User loginUser) {
		
		int userNo = 0;
		
		if(loginUser != null) {
			userNo = loginUser.getUserNo();
		}
		
		List<Product> recommProductAll = service.selectRecommProductAll(userNo);
		model.addAttribute("recommProductAll", recommProductAll);
		
		// System.out.println("recommProductAll" + recommProductAll);
		
		return "common/recommList";
	}
	
	
	// 검색 페이지
	@GetMapping("/index")
	public String searchResult(Model model
							, @SessionAttribute(value="loginUser", required=false) User loginUser
							, @RequestParam(value="location", required=false) String location
							, @RequestParam(value="firstday", required=false) String firstday
							, @RequestParam(value="lastday", required=false) String lastday
							, @RequestParam(value="tourist", required=false) String tourist
							) {
		
		int userNo = 0;
		
		if(loginUser != null) {
			userNo = loginUser.getUserNo();
		}
		
		Map<String, Object> map = new HashMap<>();
		map.put("userNo", userNo);
		map.put("location", location);
		map.put("firstday", firstday);
		map.put("lastday", lastday);
		map.put("tourist", tourist);
//		System.out.println("map : " + map);
		
		List<Product> searchResultList = service.selectSearchResult(map);
//		System.out.println("searchResultList : " + searchResultList);
		
		String term = null;
		if(firstday!=""&&lastday!=""&&firstday.equals(lastday)) term = "same";
		if(!firstday.equals(lastday)) term = firstday + " ~ " + lastday;
		
		model.addAttribute("searchResultList", searchResultList);
		model.addAttribute("location", location);
		model.addAttribute("term", term);
		model.addAttribute("tourist", tourist);
		
		model.addAttribute("map", map);
		
		return "common/searchResult";
	}
	
	
	// 위치 검색 시 드롭박스 리스트 조회
	@GetMapping(value="/locationSearch", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public List<String> locationSearch(@RequestParam(value="location", required=false) String location){
		return service.locationSearch(location);
	}
	
	
	// 검색페이지 내에서 테마검색 상품목록 조회
	@PostMapping(value="/searchResult", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public List<Product> selectSearchThemeProdList(@RequestBody Map<String, Object> map) {
	    return service.selectSearchThemeProdList(map);
//		System.out.println(map);
//		List<Product> a = service.selectSearchThemeProdList(map);
//		System.out.println(a);
//	    return a;
	}
	
	
	// 관심상품 등록
	@PostMapping("/updateWishList")
	@ResponseBody
	public int updateWish(@RequestBody Map<String, Integer> paramMap) {
		return service.updateWish(paramMap);
		// {"senderNo":11,"productNo":"16","productName":"대도시 서울에서 만나는 여유로운 힐링의 시간","notificationType":"L"}
	}
	

}
