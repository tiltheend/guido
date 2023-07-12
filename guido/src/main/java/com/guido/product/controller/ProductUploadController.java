package com.guido.product.controller;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.guido.common.model.dto.Product;
import com.guido.common.model.dto.TourTheme;
import com.guido.common.model.dto.User;
import com.guido.product.model.service.ProductDetailService;
import com.guido.product.model.service.ProductUploadService;

@Controller
@SessionAttributes({"loginUser"})
//@RequestMapping("/product")
public class ProductUploadController {
	

	@Autowired
	private ProductUploadService service;
	
	@Autowired // 여행상품 수정 시 상세조회 서비스 호출용 의존성 주입~!
	private ProductDetailService productDetailService;
	
	@Value("${kakao.map.apikey2}")
	private String apiKey2;
	
	@GetMapping("/upload")
	public String productUpload(Model model
//							 Product product
							 ,@SessionAttribute("loginUser") User loginUser
//							 ,@RequestParam(value="images", required=true) List<MultipartFile> productImages
							 , RedirectAttributes ra
							 ) throws IllegalStateException, IOException, Exception{
		
		
		List<TourTheme> tourTheme = service.selectTourTheme();
//		System.out.println(loginUser.getUserType());
//		System.out.println(loginUser.getUserType().getClass().getSimpleName());
			model.addAttribute("apiKey2", apiKey2);
			model.addAttribute("tourTheme", tourTheme);
			System.out.println("tourTheme" + tourTheme);
//			System.out.println(loginUser.getLanguageSkill());
			
			String path = "redirect:";
			String message = null;
			
			if(loginUser.getProfileImage() == null ) {
				
				message = "프로필 이미지 등록 후 상품 등록이 가능합니다.";
				path += "/profile/" + loginUser.getUserNo();
				
			}else if(loginUser.getUserType().equals("T")){
				
				message = "가이드로 로그인 후 이용해주세요.";
				path += "/user/loginPage";
			}
			
			else {
				
				return "productUpload/test";
			}
			ra.addFlashAttribute("message", message);
			return path;
		
	}	
	
	
		//상품 등록
		@PostMapping("/upload")
		public String productUpload(
							 Product product
							 ,@SessionAttribute("loginUser") User loginUser
							 ,@RequestParam(value="images", required=true) List<MultipartFile> images
							 , RedirectAttributes ra
							 , @RequestParam(value="productAddNotes", required=false) List<String> additionalList
							 , @RequestParam(value="tourCourse2", required = true) String tourCourse2
							 , @RequestParam(value="productOption", required = true) String productOption
							 ) throws IllegalStateException, IOException, Exception{
	
//			List<TourCourse> tourCourse = new Gson().fromJson(tourCourse2, new TypeToken<List<TourCourse>>() {}.getType());
			
//			System.out.println(tourCourse + tourCourse2);
			
			System.out.println(productOption);
	
		
				
	//		*로그인한 유저 번호 -> product에 세팅	
			product.setUserNo(loginUser.getUserNo());
			product.setGuideLanguage(loginUser.getLanguageSkill());
			
			
			if(additionalList != null) {
			   product.setProductAddNotes(String.join("^^^", additionalList));
			}
				
			int productNo = service.productUpload(product, images, tourCourse2, productOption);
		
//		System.out.println(product);
//	        String[] arr = str.split(",");
//	        
//	        for (String item : arr) {
//	        	additionalList.add(item.trim());
//	        }
//		
        System.out.println(additionalList);
        System.out.println(productOption);
        
        
		String message = null;
		String path = "redirect:";
		
		if(productNo > 0) {
			System.out.println(product);
			message = "상품이 등록 되었습니다.";
			path += "/productDetail/product/" + productNo;
			
		}else {
			message = "상품 등록 실패,";
			path += "/common/home";
		}
		
		ra.addFlashAttribute("message", message);
		
		return path;
	}
		
		
		//여행 상품 수정 화면 전환
		@GetMapping("/productDetail/product/{productNo}/edit")
		public String productEdit(
				@PathVariable("productNo") int productNo
				,@SessionAttribute("loginUser") User loginUser
				,RedirectAttributes ra
				,Model model) {
	
			
			Product product = productDetailService.selectProduct(productNo);
			
			String message = null;
			String path = "";
			
			
			//투어 테마 호출
			List<TourTheme> tourTheme = service.selectTourTheme();
			List<String> addNotesList = null;
			
			if(product.getProductAddNotes()!=null) {
			
				addNotesList = Arrays.asList(product.getProductAddNotes().split("\\^\\^\\^"));
				
			}
			model.addAttribute("apiKey2", apiKey2);
			model.addAttribute("product", product);
			model.addAttribute("addNotesList", addNotesList);
			model.addAttribute("tourTheme", tourTheme);
			
		
			
			if(loginUser.getUserNo() == product.getUserNo()) {
				
				message = "수정페이지로 이동합니다.";
				path += "productUpload/editTest";
				
			}else {
				message = "비정상적인 접근입니다.";
				path += "redirect:/common/home";
			}
			
			ra.addFlashAttribute("message", message);
			
			return path;
		}
		
			

			
		
			
		
		// 여행상품 수정
		@PostMapping("/productDetail/product/{productNo}/edit")
		public String productEdit(
				Product product
				,@RequestParam(value="deleteList", required=false) String deleteList
				,@RequestParam(value="images", required=false) List<MultipartFile> images
				,@RequestParam(value="productAddPrice", required=false) List<String> additionalList
				,@RequestParam(value="tourCourse2", required = true) String tourCourse2
//				,@RequestParam(value="deleteTourCourseList", required=false) String tourCourseDeleteList 
				,@PathVariable("productNo") int productNo
				,RedirectAttributes ra)throws IllegalStateException, IOException{
	
				product.setProductAddNotes(String.join("^^^", additionalList));
				product.setProductNo(productNo);
	
				int rowCount = service.productEdit(product,images,deleteList, tourCourse2);
				
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

		
		@GetMapping("/productDetail/product/{productNo}/delete")
		public String productDelete(
						@SessionAttribute User loginUser
						,@PathVariable("productNo") int productNo
						
						,RedirectAttributes ra
						) {
			
			
			int result = service.productDelete(productNo);
			
			String path = "redirect:";
			String message = null;
			if(result > 0) {
				
				message = "삭제 되었습니다.";
				path += "/common/home";
			}else {
				message = "삭제 실패";
				path += "/productDetail/product/" + productNo;
			}

			ra.addFlashAttribute("message", message);
			
			return path;
		}

		
	
}