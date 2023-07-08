package com.guido.reservation.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.guido.common.model.dto.Product;
import com.guido.common.model.dto.ProductDate;
import com.guido.common.model.dto.ProductOption;
import com.guido.common.model.dto.Reservation;
import com.guido.common.model.dto.User;
import com.guido.product.model.service.ProductDetailService;
import com.guido.reservation.model.service.ReservationService;

@Controller
@RequestMapping("/reservation")
@SessionAttributes("{loginUser}")
@PropertySource("classpath:/config.properties")
public class ReservationController {

	@Autowired
	private ReservationService service;

	@Autowired
	private ProductDetailService productService;
	
	
	@Value("${portone.imp.code}")
	private String impCode;
	
	@Value("${portone.pg.mid}")
	private String pgMid;
	
	@Value("${paypal.client.app}")
	private String clientID;
	

	
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
		Map<String, Object> map = new HashMap<>();
		map.put("productDate", date);
		map.put("productNo", productNo);
		
		int inRange = service.selectDateInRange(map);
		
		if(inRange==0)
			return "redirect:/productDetail/product/" + productNo;
		
					
		Product product = productService.selectProduct(productNo);
		ProductDate reservationDate = service.selectReservationDate(map);
		
		
		// 당일 여행 상품이면서 옵션(시간대)를 선택하지 않았을 때
		if(product.getProductPackage()==1 && optionNo==-1) {
			return "redirect:/productDetail/product/" + productNo;
		}
		
		
		// guests 값이 없거나 최대 지정 인원 수보다 많거나 최소 지정 인원 수보다 적으면 최소값으로 설정
		if(guests <= 0 || guests>product.getMaxTourist() || guests<product.getMinTourist()){
			guests = product.getMinTourist();
		}
		
		
		String mainCourse = service.selectMainCourseName(productNo);
		ProductOption option = null;
		
		if(optionNo!=-1)
			option = service.selectProductOption(optionNo);
		
		model.addAttribute("guestCount", guests);
		model.addAttribute("product", product);
		model.addAttribute("reservationDate", reservationDate);
		model.addAttribute("mainCourse", mainCourse);
		model.addAttribute("selectedTime", option);
		model.addAttribute("impCode", impCode);
		model.addAttribute("pgMid", pgMid);
		model.addAttribute("clientID", clientID);
		
		
		return "reservation/reservationForm";
	}
	
	

	// 카드 결제 성공 후
	@PostMapping("/payment/complete")
	public ResponseEntity<String> liquidate(@RequestBody Reservation reservation, @RequestParam("emergencyContact") String emergencyContact,
			@SessionAttribute("loginUser") User loginUser) throws IOException {
		
		// 아임포트 API 키와 SECRET키로 토큰을 생성
		String token = service.getToken();
		
		// 결제 완료된 금액
		int amount = service.paymentInfo(reservation.getImpUid(), token);
		
	    
		try {
			
			// 실제 계산되어야 할 가격
			int orderPriceCheck = -1;
			
			Product product = productService.selectProduct(reservation.getProductNo());
			
			if(product.getProductPackage()==1) {
				orderPriceCheck = product.getProductPrice()*reservation.getGuestCount();
			}else {
				orderPriceCheck = product.getProductPrice();
			}
			
			
			// 결제 완료된 금액과 실제 계산되어야 할 금액이 다를경우 결제 취소
			if(amount != orderPriceCheck + orderPriceCheck*0.1) {
				service.paymentCancel(token, reservation.getImpUid(), amount, "결제 금액 오류");
				return new ResponseEntity<String>("결제 금액 오류, 결제 취소", HttpStatus.BAD_REQUEST);
			}
			
			
			reservation.setProductPackage(product.getProductPackage());
			
			
			int result = service.insertReservation(reservation);
			
			if(result>0) {
				loginUser.setEmergencyContact(emergencyContact);
				service.updateEmergencyContact(loginUser);
				return new ResponseEntity<String>("성공", HttpStatus.OK);
			}

			else if(result==0)
				return new ResponseEntity<String>("주문 오류", HttpStatus.BAD_REQUEST);
			
			else {
				service.paymentCancel(token, reservation.getImpUid(), amount, "주문 가능한 수량 초과");
				return new ResponseEntity<String>("주문 가능한 수량을 초과합니다", HttpStatus.BAD_REQUEST);
			}
				
			
			
		}catch(Exception e) {
			
			 // 4. 결제에러 시 결제 취소
			service.paymentCancel(token, reservation.getImpUid(), amount, "결제 에러");
			 return new ResponseEntity<String>("결제 에러", HttpStatus.BAD_REQUEST);
		}
			
	}
	
	
	// 예약 상품 확인
	@GetMapping("/reservation_info")
	public String getReservationInfo(@RequestParam(value="reservation_no", required=false) String reservationNo,
			Model model, @SessionAttribute("loginUser") User loginUser) {
		
		Reservation reservation = null;
		String orderNumber = null;
		
		Map<String, Object> map = new HashMap<>();
		
		map.put("orderNumber", orderNumber);
		map.put("reservationNo", reservationNo);
		
		
		 if(reservationNo!=null)
			 reservation = service.selectReservation(map);
		 
		 if(reservation==null)
			 return "redirect:/";
		 
		 
		 Product product = productService.selectProduct(reservation.getProductNo());
		 
		 if(reservation.getUserNo()!=loginUser.getUserNo())
			 return "redirect:/";
		 
		 int orderPrice = 0;
		 
		 if(product.getProductPackage()==1)
			 orderPrice = reservation.getGuestCount()*product.getProductPrice();
		 else
			 orderPrice = product.getProductPrice();
		 
		 int extraFee = (int) (orderPrice * 0.1);
		 
		 model.addAttribute("reservation", reservation);
		 model.addAttribute("product", product);
		 model.addAttribute("orderPrice", orderPrice);
		 model.addAttribute("extraFee", extraFee);
		 
	     return "reservation/reservationDetails";
	     
	}
	
	
	// 결제완료 후 예약 정보 확인
	 @GetMapping("/order_result")
	    public String getOrderResult(@RequestParam(value="order_id", required=false) String orderNumber, 
	    		Model model, @SessionAttribute("loginUser") User loginUser) {
		 
		 	Reservation reservation = null;
			String reservationNo = null;
			
			Map<String, Object> map = new HashMap<>();
			
			map.put("orderNumber", orderNumber);
			map.put("reservationNo", reservationNo);
			
		 
		 if(orderNumber!=null)
			 reservation = service.selectReservation(map);
		 
		 if(reservation==null)
			 return "redirect:/";
		 
		 
		 Product product = productService.selectProduct(reservation.getProductNo());
		 
		 if(reservation.getUserNo()!=loginUser.getUserNo())
			 return "redirect:/";
		 
		 int orderPrice = 0;
		 
		 if(product.getProductPackage()==1)
			 orderPrice = reservation.getGuestCount()*product.getProductPrice();
		 else
			 orderPrice = product.getProductPrice();
		 
		 int extraFee = (int) (orderPrice * 0.1);
		 
		 model.addAttribute("reservation", reservation);
		 model.addAttribute("product", product);
		 model.addAttribute("orderPrice", orderPrice);
		 model.addAttribute("extraFee", extraFee);
		 
	     return "reservation/reservationCheck";
	   }
	 
	 
	 
	 // 주문 취소
	 @PostMapping("/cancel")
	 public String cancelReservation(Reservation reservation) throws IOException {

		 service.reservationCancel(reservation);
		 
		 return "redirect:/reservation/order_result?order_id=" + reservation.getOrderNumber();
	 }
}
	

