package com.guido.product.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.guido.product.model.service.ProductUploadService;

@Controller
@SessionAttributes({"loginUser"})
@RequestMapping("/product")
public class ProductUploadController {

	@Autowired
	private ProductUploadService service;
	
	@GetMapping("/upload")
	public String productUpload(
//							 Product product
//							 ,@SessionAttribute("loginMember") User loginMember
//							 ,@RequestParam(value="productImages", required=true) List<MultipartFile> productImages
//							 , RedirectAttributes ra
							 ) throws IllegalStateException, IOException, Exception{
		
		
//		product.setUserNo(loginMember.getUserNo());
//		
//		int result = service.uploadProduct(product, productImages);
//		
//		String path = "redirect:/";
		
		return "productUpload/productUpload";
	}
}
