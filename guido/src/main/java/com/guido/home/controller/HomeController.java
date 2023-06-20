package com.guido.home.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.guido.home.model.service.HomeService;

@Controller
public class HomeController {
	
	@Autowired
	private HomeService service;

}
