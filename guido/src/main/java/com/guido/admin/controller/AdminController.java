package com.guido.admin.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.guido.admin.model.service.AdminService;
import com.guido.common.model.dto.Event;
import com.guido.common.model.dto.QNA;

import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServletRequest;

@Controller
@SessionAttributes({ "loginMember" })
@RequestMapping("/admin")
public class AdminController {
	@Autowired
	private AdminService service;

	@GetMapping("/{pageName}")
	public String listPage(@PathVariable("pageName") String pageName, Model model,
			@RequestParam(value = "cp", defaultValue = "1") int cp,
			@RequestParam Map<String, Object> paramMap) {
		System.out.println(paramMap);
		paramMap.put("pageName", pageName);
		
		
		List<String> pageNameList =
				List.of("eventList","touristManagement","guideManagement","guideApprovalRequest",
						"productManagement","","qna","settlementManagement");
		if(!pageNameList.contains(pageName))
			return "redirect:/";
		
		Map<String,Object> data = new HashMap<>();
		
		
		model.addAttribute("map", service.selectList(paramMap, cp));
		model.addAttribute("pageName", pageName);

		return "admin/" + pageName;
	}

	@GetMapping("/writeEvent")
	public String writeEvent(Model model) {
		model.addAttribute("map", service.sideMenuCount());
		return "admin/writeEvent";
	}

	@PostMapping("/writeEvent")
	public String writeEvent(Event event, List<MultipartFile> files, RedirectAttributes ra)
			throws IllegalStateException, IOException {
		String message = null;
		// 0번째 파일이 없다면(썸네일이 없다면)
		if (files.get(0).getSize() <= 0) {
			message = "썸네일을 등록하지 않아, 이벤트 작성에 실패하였습니다.";
		} else {
			int result = service.writeEvent(event, files);
			if (result > 0) {
				message = "이벤트 등록 성공";
			} else {
				message = "이벤트 등록 실패";
			}
		}
		ra.addFlashAttribute("message", message);
		return "redirect:eventList";
	}

	@GetMapping("/writeAnswer/{qnaNo}")
	public String writeAnswer(@PathVariable("qnaNo") int qnaNo, Model model) {
		model.addAttribute("qna", service.selectQNA(qnaNo));
		
		model.addAttribute("map", service.sideMenuCount());

		return "admin/writeAnswer";
	}
	
	@PostMapping("/writeAnswer")
	public String writeAnswer(QNA qna, Model model,  RedirectAttributes ra) {
		int result = service.writeAnswer(qna);
		
		return "redirect:/admin/qna";
	}
	
	@PostMapping("/setMainBanner")
	@ResponseBody
	public ResponseEntity<String> setMainBanner(@RequestBody Map<String,Object> data,
			HttpServletRequest request) {
		int result = service.setMainBanner(data);
		if(result > 0) {
			ServletContext application = request.getServletContext();
			application.setAttribute("mainEventList", service.selectMainEventList());
			
			return ResponseEntity.ok("");
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("실패");
		}
	}
	
	@PostMapping("/eventBlind")
	@ResponseBody
	public ResponseEntity<String> eventBlind(@RequestBody List<Integer> eventNoList,
			HttpServletRequest request) {
		int result = service.eventBlind(eventNoList);
		if(result == eventNoList.size()) {
			ServletContext application = request.getServletContext();
			application.setAttribute("mainEventList", service.selectMainEventList());
			return ResponseEntity.ok("");
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("실패");
		}
	}
	
	@PostMapping("/eventBlindCancel")
	@ResponseBody
	public ResponseEntity<String> eventBlindCancel(@RequestBody List<Integer> eventNoList) {
		int result = service.eventBlindCancel(eventNoList);
		if(result == eventNoList.size()) {
			return ResponseEntity.ok("");
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("실패");
		}
	}
	@PostMapping("/productBlind")
	@ResponseBody
	public ResponseEntity<String> productBlind(@RequestBody List<Integer> productNoList) {
		int result = service.productBlind(productNoList);
		if(result == productNoList.size()) {
			return ResponseEntity.ok("");
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("실패");
		}
	}
	
	@PostMapping("/productBlindCancel")
	@ResponseBody
	public ResponseEntity<String> productBlindCancel(@RequestBody List<Integer> productNoList) {
		int result = service.productBlindCancel(productNoList);
		if(result == productNoList.size()) {
			return ResponseEntity.ok("");
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("실패");
		}
	}
	
	@PostMapping("/setUserState")
	@ResponseBody
	public ResponseEntity<String> setUserState(@RequestBody Map<String,Object> map){
		System.out.println(map);
		int result = service.setUserState(map);
		if(result == ((List)map.get("userNoList")).size()) {
			return ResponseEntity.ok("");
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("실패");
		}
	}
}