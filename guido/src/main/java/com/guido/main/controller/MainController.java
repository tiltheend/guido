package com.guido.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.guido.common.model.dto.Event;
import com.guido.common.model.dto.Product;
import com.guido.common.model.dto.User;
import com.guido.home.model.service.HomeService;

@SessionAttributes("{loginUser}")
@Controller
public class MainController {

	@Autowired
	private HomeService service;
	
	// 메인 페이지 이동 + 상품 목록 조회
	@GetMapping("/")		
	public String mainPage(Model model
			, @SessionAttribute(value="loginUser", required=false) User loginUser) {

		int userNo = 0;
		
		if(loginUser != null) {
		userNo = loginUser.getUserNo();
		}
		
		// 상품 목록 조회
		List<Product> productList = service.selectProductList(userNo);
		model.addAttribute("productList", productList);
		
		// 인기 여행지 목록 조회
		List<Product> popularProductList = service.selectPopularProductList(userNo);
		model.addAttribute("popularProductList", popularProductList);
		
		// 슈퍼가이드 상품 목록 조회
		List<Product> superProductList = service.selectSuperProductList(userNo);
		model.addAttribute("superProductList", superProductList);
		
		// 추천 상품 목록 조회
		List<Product> recommProductList = service.selectRecommProductList(userNo);
		model.addAttribute("recommProductList", recommProductList);
		
		// 메인 슬라이드 이벤트 배너 조회
		List<Event> eventBannerList = service.selectEventBannerList();
		model.addAttribute("eventBannerList", eventBannerList);
		
		return "common/main";
	}
	
	
	@GetMapping("/loginError")
	public String loginError(RedirectAttributes ra) {
		
		return "redirect:/user/loginPage";
	}
}
