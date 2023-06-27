package com.guido.home.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
	@GetMapping("/home")
	public String mainPage(Model model) {

		// 상품 목록 조회
		List<Product> productList = service.selectProductList();
		model.addAttribute("productList", productList);
		
		// 인기 여행지 목록 조회
		List<Product> popularProductList = service.selectPopularProductList();
		model.addAttribute("popularProductList", popularProductList);
		
		// 슈퍼가이드 상품 목록 조회
		List<Product> superProductList = service.selectSuperProductList();
		model.addAttribute("superProductList", superProductList);
		
		// 추천 상품 목록 조회
		List<Product> recommProductList = service.selectRecommProductList();
		model.addAttribute("recommProductList", recommProductList);
		
		return "common/index";
	}
	
	
	// 테마 검색 상품 목록 조회
	@GetMapping(value = "/index/{themeCode}", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public List<Product> selectThemeProdList(@PathVariable("themeCode") int themeCode) {
	    return service.selectThemeProdList(themeCode);
	}
	
	
	
	
	
	// 검색 페이지
	@GetMapping("/index")
	public String searchResult(Model model
							, @RequestParam(value="location", required=false) String location
							, @RequestParam(value="firstday", required=false) String firstday
							, @RequestParam(value="lastday", required=false) String lastday
							, @RequestParam(value="tourist", required=false) String tourist
							) {
		
		Map<String, Object> map = new HashMap<>();
		map.put("location", location);
		map.put("firstday", firstday);
		map.put("lastday", lastday);
		map.put("tourist", tourist);
		
		System.out.println(map);
		
		List<Product> searchResultList = service.selectSearchResult(map);
		
		System.out.println(searchResultList);
		
		model.addAttribute("searchResultList", searchResultList);
		
		return "common/searchResult";
	}
	
	
	// 테마 검색 상품 목록 조회
//	@GetMapping(value = "/searchResult/{themeCode}", produces = "application/json; charset=UTF-8")
//	@ResponseBody
//	public List<Product> selectSearchThemeProdList(@PathVariable("themeCode") int themeCode) {
//	    return service.selectThemeProdList(themeCode);
//	}
	
	
	
	
	
	
	
	
	
	
	
	

}
