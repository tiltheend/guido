package com.guido.product.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.guido.common.model.dto.Product;
import com.guido.common.model.dto.User;
import com.guido.product.model.service.ProductUploadService;

@Controller
@SessionAttributes({"loginUser"})
@RequestMapping("/productUpload")
public class ProductUploadController {

	@Autowired
	private ProductUploadService service;
	
	@PostMapping
	public String productUpload(
							 Product product
							 ,@SessionAttribute("loginMember") User loginMember
							 ,@RequestParam(value="productImages", required=true) List<MultipartFile> productImages
							 , RedirectAttributes ra
							 ) throws IllegalStateException, IOException, Exception{
		
		
		product.setUserNo(loginMember.getUserNo());
		
		int result = service.uploadProduct(product, productImages);
		
		String path = "redirect:/";
		
		return path;
	}
}
