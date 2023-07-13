package com.guido.event.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.guido.common.model.dto.Event;
import com.guido.event.model.service.EventService;

@Controller
@RequestMapping("/event")
public class EventController {
	
	@Autowired
	EventService service;
	
	@GetMapping("/events")
	public String eventList() {
//		model.addAttribute("event",service.selectEvent(eventNo));
		return "event/eventList";
	}
	
	@GetMapping("/eventDetail/{eventNo}")
	public String eventDetail(@PathVariable("eventNo") int eventNo,
			Model model) {
		model.addAttribute("event",service.selectEvent(eventNo));
		return "event/eventDetail";
	}
}
