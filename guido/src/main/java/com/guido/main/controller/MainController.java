package com.guido.main.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class MainController {

	@RequestMapping("/")		
	public String mainForward(Model model) {
		
		return "common/main";
	}
	
	
	@GetMapping("/loginError")
	public String loginError(RedirectAttributes ra) {
		
		return "redirect:/user/loginPage";
	}
}
