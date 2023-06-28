package com.guido.product.controller;

import java.util.Arrays;
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

import com.guido.common.model.dto.PR;
import com.guido.common.model.dto.Product;
import com.guido.common.model.dto.Review;
import com.guido.common.model.dto.User;
import com.guido.product.model.service.ProductDetailService;

@Controller
@RequestMapping("/productDetail")
@SessionAttributes("{loginUser}")
public class ProductDetailController {
	
	@Autowired
	private ProductDetailService service;
	
	
	// 상품 상세 조회
	@GetMapping("/product/{productNo}")
	public String selectProductDetail(@PathVariable("productNo") int productNo,
			@RequestParam(value="guest", required=false, defaultValue="1") int guestCount ,  Model model,
			@SessionAttribute(value="loginUser", required=false) User loginUser) {
		
		
		Product product = service.selectProduct(productNo);
		User guide = service.selectGuideInfo(product.getUserNo());
		PR pr = service.selectPR(product.getUserNo());
		List<Review> reviewList = service.selectReviewList(productNo);
		
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
	
		
		return "productDetail/productDetail";
	}
	
	
	// 관심상품 등록 처리
	@PostMapping("/updateWish")
	@ResponseBody
	public int updateWish(@RequestBody Map<String, Integer> map) {
		return service.updateWish(map);
	}
	
	
}
