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
	
	@GetMapping("/{pageName}")
	public String listPage(
			@PathVariable("pageName")String pageName,
			Model model,@RequestParam(value="cp", defaultValue="1")int cp) {
		
		model.addAttribute("map", service.selectList(pageName,cp));
		model.addAttribute("pageName",pageName);
		
		return "admin/"+pageName;
	}
	
	@GetMapping("/writeEvent")
	public String writeEvent(Model model) {
		return "admin/writeEvent";
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
	
	
	
	@GetMapping("/writeAnswer/{qnaNo}")
	public String writeAnswer(@PathVariable("qnaNo") int qnaNo,
			Model model) {
		model.addAttribute("qna",service.selectQNA(qnaNo));
		
		return "admin/writeAnswer";
	}
}