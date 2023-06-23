package com.guido.admin.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.guido.admin.model.service.AdminService;
import com.guido.common.model.dto.Event;

@Controller
@SessionAttributes({"loginMember"})
@RequestMapping("/admin")
public class AdminController {
	@Autowired
	private AdminService service;
	
	@GetMapping("/eventList")
	public String eventList(Model model
			,@RequestParam(value="cp", defaultValue="1")int cp) {
		model.addAttribute("map", service.selectEventList(cp));
		model.addAttribute("pageName","eventList");
		return "admin/eventList";
	}
	
	@GetMapping("/touristManagement")
	public String touristManagement (Model model
			,@RequestParam(value="cp", defaultValue="1")int cp) {
		model.addAttribute("map", service.selectTouristList(cp));
		model.addAttribute("pageName","touristManagement");
		return "admin/touristManagement";
	}
	
	@GetMapping("/guideManagement")
	public String guideManagement(Model model
			,@RequestParam(value="cp", defaultValue="1")int cp) {
		model.addAttribute("map",service.selectGuideList(cp));
		model.addAttribute("pageName","guideManagement");
		return "admin/guideManagement";
	}
	
	@GetMapping("/guideApprovalRequest")
	public String guideApprovalRequest(Model model) {
		model.addAttribute("pageName","guideApprovalRequest");
		return "admin/guideApprovalRequest";
	}
	
	@GetMapping("/productManagement")
	public String productManagement(Model model) {
		model.addAttribute("pageName","productManagement");
		return "admin/productManagement";
	}
	
	@GetMapping("/settlementManagement")
	public String settlementManagement(Model model) {
		model.addAttribute("pageName","settlementManagement");
		return "admin/settlementManagement";
	}
	
	@GetMapping("/qna")
	public String qna(Model model) {
		model.addAttribute("pageName","qna");
		return "admin/qna";
	}
	
	@GetMapping("/writeEvent")
	public String writeEvent(Model model) {
		return "admin/writeEvent";
	}
	
	@GetMapping("/writeAnswer")
	public String writeAnswer(Model model) {
		return "admin/writeAnswer";
	}
	
	@GetMapping("/eventDetail")
	public String eventDetail(Model model) {
		return "admin/eventDetail";
	}
	
	@GetMapping("/eventDetail/{eventNo}")
	public String eventDetail(@PathVariable("eventNo") int eventNo,
			Model model,
			RedirectAttributes ra) {
		model.addAttribute("event",service.selectEvent(eventNo));
		
		return "admin/eventDetail";
	}
	
	@PostMapping("/eventWrite")
	public String eventWrite(Event event
			, List<MultipartFile> files
			, RedirectAttributes ra
			) throws IllegalStateException, IOException  {
		String message = null;
		// 0번째 파일이 없다면(썸네일이 없다면)
		if(files.get(0).getSize() <= 0) {
			message = "썸네일을 등록하지 않아, 이벤트 작성에 실패하였습니다.";
		} else {
			int result = service.eventWrite(event,files);
			if(result > 0) {
				message = "이벤트 등록 성공";
			} else {
				message = "이벤트 등록 실패";
			}
		}
		ra.addFlashAttribute("message",message);
		return "redirect:eventList";
	}
}