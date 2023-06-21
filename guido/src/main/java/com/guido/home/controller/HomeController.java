package com.guido.home.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.guido.home.model.service.HomeService;

@SessionAttributes({"loginUser"})
@RequestMapping("/")
@Controller
public class HomeController {
	
	@Autowired
	private HomeService service;
	
	// 상품 목록 조회
//	@GetMapping
//	public String selectProductList() {
//		return null;
//	}

}
