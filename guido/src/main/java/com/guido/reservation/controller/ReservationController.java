package com.guido.reservation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.guido.common.model.dto.Product;
import com.guido.common.utility.Util;
import com.guido.product.model.service.ProductDetailService;
import com.guido.reservation.model.service.ReservationService;

@Controller
@RequestMapping("/reservation")
@SessionAttributes("{loginUser}")
public class ReservationController {

	@Autowired
	private ReservationService service;

	@Autowired
	private ProductDetailService productService;
	
	@GetMapping("/reservationform/{productNo}")
	public String reserve(@PathVariable("productNo") int productNo, 
			@RequestParam(value="guests", required=false, defaultValue="1") int guests, 
			@RequestParam(value="date", required=false) String date, 
			@RequestParam(value="option", required=false, defaultValue="-1") int optionNo, Model model) {
		
		
		
		// 예약 일자 존재 X
		if(date.equals("")) {
			return "common/main";
		}
		
		
		// 예약 일자가 예약 가능 일자 범위 밖일 경우
//		Map<String, Object> map = new HashMap<>();
//		map.put("productDate", date);
//		map.put("productNo", productNo);
//		
//		int inRange = service.selectDateInRange(map);
//		
//		if(inRange==0)
//			return "redirect:/productDetail/product/" + productNo;
		
					
		Product product = productService.selectProduct(productNo);
		
		
		// 당일 여행 상품이면서 옵션(시간대)를 선택하지 않았을 때
		if(product.getProductPackage()==1 && optionNo==-1) {
			return "redirect:/productDetail/product/" + productNo;
		}
		
		
		// guests 값이 없거나 최대 지정 인원 수보다 많거나 최소 지정 인원 수보다 적으면 최소값으로 설정
		if(guests <= 0 || guests>product.getMaxTourist() || guests<product.getMinTourist()){
			guests = product.getMinTourist();
		}
		
		
		String mainCourse = service.selectMainCourseName(productNo);
		
		
		model.addAttribute("guestCount", guests);
		model.addAttribute("product", product);
		model.addAttribute("reservationDate", date);
		model.addAttribute("mainCourse", mainCourse);
		
//		System.out.println(Util.createReservationNo());
		
		
		return "reservation/reservationForm";
	}
	
}
