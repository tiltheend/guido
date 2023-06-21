package com.guido.reservation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.guido.reservation.model.service.ReservationService;

@Controller
public class ReservationController {

	@Autowired
	private ReservationService service;
	
}
