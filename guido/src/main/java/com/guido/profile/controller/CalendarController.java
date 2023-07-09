package com.guido.profile.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.guido.common.model.dto.Schedule;
import com.guido.common.model.dto.User;
import com.guido.profile.model.service.CalendarService;

@SessionAttributes("{loginUser}")
@Controller
@RequestMapping("/fullCalendar")
public class CalendarController {

	// private static final Logger log = LoggerFactory.getLogger(CalendarController.class);
    
	@Autowired
    private CalendarService service;
 
	@GetMapping("/sellerScheduleList")
	@ResponseBody
	public List<Map<String, Object>> sellerScheduleList(@SessionAttribute("loginUser") User loginUser) {
	    int userNo = loginUser.getUserNo();

	    List<Map<String, Object>> scheduleList = new ArrayList<>();

	    // 판매자 일정 조회
	    List<Schedule> sellerScheduleList = service.sellerScheduleList(userNo);

	    for (Schedule s : sellerScheduleList) {
	        Map<String, Object> schedule = new HashMap<>();

	        System.out.println(s.getProductName());
	        System.out.println(s.getProductPackage());
	        System.out.println(s.getProductDateStart());
	        System.out.println(s.getProductDateEnd());

	        schedule.put("title", s.getProductName());
	        schedule.put("start", s.getProductDateStart());
	        // 종료일이 1 빼고 출력 되는 이슈가 있어서 종료일이 원래 종료일보다 하루 빠르게 출력 시켜놓음 (mapper)
	        schedule.put("end", s.getProductDateEnd());
	        
	        if(s.getProductPackage()>1) {
	        	schedule.put("color", "#B1D8DA");
	        	schedule.put("textColor", "#000000");
	        } else {
	        	schedule.put("color", "#FFE69A");
	        	schedule.put("textColor", "#000000");
//	        	schedule.put("color", "#0F4957");
//	        	schedule.put("textColor", "#ffffff");
	        }

	        scheduleList.add(schedule);
	    }

	    return scheduleList;
	}

    	
 
}
