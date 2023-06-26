package com.guido.home.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

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
	
	// 테마 검색 상품 목록 조회
	@GetMapping(value = "/index/{themeCode}", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public List<Product> selectThemeProdList(@PathVariable("themeCode") int themeCode) {
	    return service.selectThemeProdList(themeCode);
	}
	
	
	
	
	
	// 검색 페이지 이동
	@GetMapping("/searchResult")
	public String searchResult(Model model) {
		
		// 상품 목록 조회
		List<Product> productList = service.selectProductAll();
		model.addAttribute("productList", productList);
		return "common/searchResult";
	}
	
	// 테마 검색 상품 목록 조회
	@GetMapping(value = "/searchResult/{themeCode}", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public List<Product> selectSearchThemeProdList(@PathVariable("themeCode") int themeCode) {
	    return service.selectThemeProdList(themeCode);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
