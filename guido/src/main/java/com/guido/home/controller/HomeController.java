package com.guido.home.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.guido.home.model.service.HomeService;

/*@SessionAttributes({"loginUser"})*/
@RequestMapping("/common")
@Controller
public class HomeController {
	
	@Autowired
	private HomeService service;
	
	// 메인 페이지 이동
	@GetMapping("/index")
	public String mainPage() {

		return "common/index";
	}
	
	// 상품 목록 조회
	@GetMapping("/index/{themeCode}")
	public String selectProductList(@PathVariable("themeCode") int themeCode) {
		
		System.out.println("themeCode: " + themeCode);
		
		return "/";
	}

}
