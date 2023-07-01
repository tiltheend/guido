package com.guido.product.controller;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.guido.common.model.dto.Product;
import com.guido.common.model.dto.TourTheme;
import com.guido.product.model.service.ProductDetailService;
import com.guido.product.model.service.ProductUploadService;

@Controller
//@SessionAttributes({"loginUser"})
//@RequestMapping("/product")
public class ProductUploadController {

	@Autowired
	private ProductUploadService service;
	
	@Autowired // 여행상품 수정 시 상세조회 서비스 호출용 의존성 주입~!
	private ProductDetailService productDetailService;
	
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
							 , @RequestParam(value="productAddPrice", required=false) List<String> additionalList
							 ) throws IllegalStateException, IOException, Exception{
		
			
			
//		*로그인한 유저 번호 -> product에 세팅	
//		product.setUserNo(loginMember.getUserNo());
		
		
		product.setProductAddNotes(String.join("^^^", additionalList));
			
		int productNo = service.productUpload(product,images);
	
		System.out.println(product);
//	        String[] arr = str.split(",");
//	        
//	        for (String item : arr) {
//	        	additionalList.add(item.trim());
//	        }
//		
//        System.out.println(additionalList);
        
		String message = null;
		String path = "redirect:";
		
		if(productNo > 0) {
			message = "상품이 등록 되었습니다.";
			path += "/productDetail/" + "product/" + productNo;
		}else {
			message = "상품 등록 실패,";
			path += "/upload";
		}
		
		ra.addFlashAttribute("message", message);
		
		return path;
	}
		
		
		//여행 상품 수정 화면 전환
		@GetMapping("/productDetail/product/{productNo}/edit")
		public String productEdit(
				@PathVariable("productNo") int productNo
				,Model model) {
			
			
			
			Product product = productDetailService.selectProduct(productNo);
			List<TourTheme> tourTheme = service.selectTourTheme();
			
			List<String> addNotesList = null;
			
			if(product.getProductAddNotes()!=null) {
			
				addNotesList = Arrays.asList(product.getProductAddNotes().split("\\^\\^\\^"));
				
			}
			
			model.addAttribute("product", product);
			model.addAttribute("addNotesList", addNotesList);
			model.addAttribute("tourTheme", tourTheme);
			
//			System.out.println(product.getImageList().get(0).getFilePath());
//			System.out.println(product.getProductAddPrice());
			
			// 구분자로 문자열 나누기(addNotes)
		
			System.out.println(product);

			
			return "productUpload/productEdit2";
		}
		
		// 여행상품 수정
		@PostMapping("/productDetail/product/{productNo}/edit")
		public String productEdit(
				Product product
				,@RequestParam(value="deleteList", required=false) String deleteList
				,@RequestParam(value="images", required=false) List<MultipartFile> images
				,@RequestParam(value="productAddPrice", required=false) List<String> additionalList
				,@PathVariable("productNo") int productNo
				,RedirectAttributes ra)throws IllegalStateException, IOException{
	
				product.setProductAddNotes(String.join("^^^", additionalList));
				product.setProductNo(productNo);
	
				int rowCount = service.productEdit(product,images,deleteList);
				
				String message = null;
				String path = "redirect:";
				
				if(rowCount > 0) {
					message = "상품이 수정 되었습니다.";
					path += "/productDetail/product/" + productNo;
				}else {
					message = "상품 수정 실패,";
					path += "/productDetail/product/" + productNo + "/edit";
				}
				
				ra.addFlashAttribute("message", message);
				
				return path;
		}

		
	
}