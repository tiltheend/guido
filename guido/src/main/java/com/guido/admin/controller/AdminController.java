package com.guido.admin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.guido.admin.model.service.AdminService;

@Controller
@SessionAttributes({"loginMember"})
@RequestMapping("/admin")
public class AdminController {
	
	
	@Autowired
	private AdminService service;
	
	@GetMapping("/eventList")
	public String eventList() {
		return "admin/eventList";
	}
	
	@GetMapping("/touristManagement")
	public String touristManagement () {
		return "admin/touristManagement";
	}
	
	@GetMapping("/guideManagement")
	public String guideManagement() {
		return "admin/guideManagement";
	}
	
	@GetMapping("/guideApprovalRequest")
	public String guideApprovalRequest() {
		return "admin/guideApprovalRequest";
	}
	
	@GetMapping("/productManagement")
	public String productManagement() {
		return "admin/productManagement";
	}
	
	@GetMapping("/settlementManagement")
	public String settlementManagement() {
		return "admin/settlementManagement";
	}
	
	@GetMapping("/qna")
	public String qna() {
		return "admin/qna";
	}
	
	@GetMapping("/writeEvent")
	public String writeEvent() {
		return "admin/writeEvent";
	}
	
	@GetMapping("/writeAnswer")
	public String writeAnswer() {
		return "admin/writeAnswer";
	}
	
	@GetMapping("/eventDetail")
	public String eventDetail() {
		return "admin/eventDetail";
	}
}