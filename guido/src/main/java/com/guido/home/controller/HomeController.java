package com.guido.home.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.guido.home.model.service.HomeService;

@SessionAttributes({"loginUser"})
@RequestMapping("/common")
@Controller
public class HomeController {
	
	@Autowired
	private HomeService service;
	
	// 상품 목록 조회
	@GetMapping("/index")
	public String selectProductList(/* @PathVariable("themeCode") int themeCode */) {
		
		/* System.out.println("themeCode: " + themeCode); */
		
		return null;
	}

}
