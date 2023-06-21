package com.guido.product.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.guido.product.model.dto.Product;
import com.guido.product.model.service.ProductDetailService;

@Controller
@RequestMapping("/productDetail")
public class ProductDetailController {
	
	@Autowired
	private ProductDetailService service;
	
	
	// 상품 상세 조회
	@GetMapping("/product/{productNo}")
	public String selectProductDetail(@PathVariable("productNo") int productNo, Model model) {
		
		Product product = service.selectProduct(productNo);
		
		model.addAttribute("product", product);
		
		return "productDetail/productDetail";
	}
	
	
}
