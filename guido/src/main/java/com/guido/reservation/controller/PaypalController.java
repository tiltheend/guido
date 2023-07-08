//package com.guido.reservation.controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//
//import com.guido.common.config.PaypalConfig;
//import com.guido.reservation.model.service.PaypalService;
//import com.paypal.api.payments.Amount;
//import com.paypal.api.payments.Links;
//import com.paypal.api.payments.Payment;
//import com.paypal.api.payments.Refund;
//import com.paypal.api.payments.RefundRequest;
//import com.paypal.api.payments.Sale;
//import com.paypal.base.rest.PayPalRESTException;
//
//@Controller
//public class PaypalController {
//	
//	@Autowired
//	PaypalService service;
//	
//	@Autowired
//	PaypalConfig paypalConfig;
//	
//	public static final String SUCCESS_URL = "paypal/success";
//	public static final String CANCEL_URL = "paypal/cancel";
//	
//	@GetMapping("/paypal")
//	public String home() {
//		return "paypal/paypal_form";
//	}
//	
//	@PostMapping("/paypal/submit")
//	public String payment() {
//		try {
//			Payment payment = service.createPayment(
//					4.00, 		// 가격
//					"USD", 		// 기준 통화	
//					"paypal", 
//					"sale", 		
//					"payment description", 			// 상품명
//					"http://localhost/" + CANCEL_URL, 
//					"http://localhost/" + SUCCESS_URL);
//			
//			for(Links link : payment.getLinks()) {
//				if(link.getRel().equals("approval_url")) {
//					return "redirect:" + link.getHref();
//				}
//			}
//			
//		}catch(PayPalRESTException e) {
//			e.printStackTrace();
//		}
//		
//		return "redirect:/";
//	}
//	
//	@GetMapping(value = CANCEL_URL)
//	public String cancelPay() {
//		return "paypal/cancel";
//	}
//	
//	@GetMapping(value = SUCCESS_URL)
//	public String successPay(@RequestParam("paymentId") String paymentId, 
//			@RequestParam("PayerID") String payerId) {
//		
//		try {
//			Payment payment = service.executePayment(paymentId, payerId);
//			System.out.println(payment.toJSON());
//			if(payment.getState().equals("approved")) {
//				return "paypal/success";
//			}
//		}catch(PayPalRESTException e) {
//			System.out.println(e.getMessage());
//		}
//		
//		return "redirect:/";
//	}
//	
//	@GetMapping("/paypal/refund")
//	public String refund() {
//		
//		try {
//			Amount amount = new Amount();
//			amount.setTotal("4.00");
//			amount.setCurrency("USD");
//			
//			String id = "{sale_id}";
//			Sale sale = new Sale();
//			sale.setId(id);
//			
//			RefundRequest refund = new RefundRequest();
//			refund.setAmount(amount);
//			
//			Refund returnRefund = sale.refund(paypalConfig.apiContext(), refund);
//			System.out.println(returnRefund);
//		}catch(PayPalRESTException e) {
//			System.out.println(e.getMessage());
//		}
//		
//		return "paypal/paypal_form";
//	}
//	
//	
//}
