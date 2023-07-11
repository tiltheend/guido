package com.guido.qna.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.guido.qna.model.service.QnaService;

@Controller
@RequestMapping("/qna")
public class QnaController {
	
	@Autowired
	private QnaService service;
	
	
	@GetMapping("/write")
	private String writeQna() {
		return "qna/qnaWrite";
	}
	
	
}
