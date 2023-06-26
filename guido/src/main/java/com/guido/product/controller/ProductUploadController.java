package com.guido.product.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.guido.common.model.dto.Product;
import com.guido.common.model.dto.TourTheme;
import com.guido.product.model.service.ProductUploadService;

@Controller
//@SessionAttributes({"loginUser"})
@RequestMapping("/product")
public class ProductUploadController {

	@Autowired
	private ProductUploadService service;
	
	@GetMapping("/upload")
	public String productUpload(Model model
//							 Product product
//							 ,@SessionAttribute("loginMember") User loginMember
//							 ,@RequestParam(value="images", required=true) List<MultipartFile> productImages
//							 , RedirectAttributes ra
							 ) throws IllegalStateException, IOException, Exception{
		
		List<TourTheme> tourTheme = service.selectTourTheme();
		
	
			model.addAttribute("tourTheme", tourTheme);
			System.out.println("tourTheme" + tourTheme);
			
			return "productUpload/productUpload";
		
	}	
	
	
		//상품 등록
		@PostMapping("/upload")
		public String productUpload(
							 Product product
//							 ,@SessionAttribute("loginMember") User loginMember
							 ,@RequestParam(value="images", required=true) List<MultipartFile> images
							 , RedirectAttributes ra
							 ) throws IllegalStateException, IOException, Exception{
		
			
			
//		*로그인한 유저 번호 -> product에 세팅	
//		product.setUserNo(loginMember.getUserNo());
		   
//		int productNo = service.productUpload(product, productImages);
		int productNo = service.productUpload(product,images);
		
		String message = null;
		String path = "redirect:";
		
		if(productNo > 0) {
			message = "상품이 등록 되었습니다.";
			path += "/productDetail/" + "product/" + productNo;
		}else {
			message = "상품 등록 실패,";
			path += "upload";
		}
		
		ra.addFlashAttribute("message", message);
		
		return path;
	}
		
		
	
}