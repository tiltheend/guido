package com.guido.qna.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;

import com.guido.common.model.dto.QNA;
import com.guido.common.model.dto.User;
import com.guido.qna.model.service.QnaService;

@Controller
@RequestMapping("/qna")
@SessionAttributes("{loginUser}")
public class QnaController {
	
	@Autowired
	private QnaService service;
	
	
	// QNA 작성 페이지로 이동
	@GetMapping("/write")
	private String writeQna() {
		return "qna/qnaWrite";
	}
	
	
	// QNA 작성
	@PostMapping("/insertQna")
	@ResponseBody
	private int insertQna(@RequestParam(value="attach_files", required=false) List<MultipartFile> files, 
			QNA qna, @SessionAttribute(value="loginUser", required=false) User loginUser) throws IllegalStateException, IOException{
		
		if(loginUser==null)
			qna.setUserNo(0);
		else
			qna.setUserNo(loginUser.getUserNo());
		
	
		int result = service.insertQna(qna, files);
		
		
		if(result>0)
			return result;
		
		return 0;
	}
	
	
}
