package com.guido.home.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.guido.common.model.dto.Notification;
import com.guido.common.model.dto.User;
import com.guido.home.model.service.AlarmService;

@SessionAttributes({"loginUser"})
@RequestMapping("/alarm")
@Controller
public class AlarmController {

	@Autowired
	private AlarmService service;
	
	// 최근 알람 10개 조회
	@GetMapping(value="/send", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public List<Notification> alarmList(@SessionAttribute("loginUser") User loginUser){
		List<Notification> alarmList = service.selectAlarmList(loginUser.getUserNo());
		
		// System.out.println("알림리스트 : " + alarmList);
		return alarmList;
	}
}
