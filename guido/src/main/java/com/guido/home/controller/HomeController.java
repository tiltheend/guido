package com.guido.home.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.guido.common.model.dto.Product;
import com.guido.home.model.service.HomeService;


/*@SessionAttributes({"loginUser"})*/
@RequestMapping("/common")
@Controller
public class HomeController {
	
	@Autowired
	private HomeService service;
	
	
	// 메인 페이지 이동 + 상품 목록 조회
	@GetMapping("/index")
	public String mainPage(Model model) {

		// 상품 목록 조회
		List<Product> productList = service.selectProductList();

		// 인기 여행지 목록 조회
		List<Product> popularProductList = service.selectPopularProductList();
		
		// 슈퍼가이드 상품 목록 조회
		List<Product> superProductList = service.selectSuperProductList();
		
		// 추천 상품 목록 조회
		List<Product> recommProductList = service.selectRecommProductList();
		
		
		model.addAttribute("productList", productList);
		model.addAttribute("popularProductList", popularProductList);
		model.addAttribute("superProductList", superProductList);
		model.addAttribute("recommProductList", recommProductList);
		
//		System.out.println(productList);
		
		return "common/index";
	}
	
	
	
	// 검색상품 목록 조회
//	@GetMapping("/index/{themeCode}")
//	public String selectProductList(@PathVariable("themeCode") int themeCode,
//			Model model) {
//		
//		// 상품 목록 조회 서비스 
//		List<Product> productList = service.selectProductList(themeCode);
//		System.out.println(productList);
//		
//		model.addAttribute("productList", productList);
//
//		return "home/searchList";
//	}

}
