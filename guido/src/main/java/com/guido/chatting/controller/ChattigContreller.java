package com.guido.chatting.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;

import com.guido.chatting.model.dto.ChattingRoom;
import com.guido.chatting.model.dto.Message;
import com.guido.chatting.model.service.ChattingService;
import com.guido.common.model.dto.User;

@SessionAttributes({"loginUser"})
@Controller
public class ChattigContreller {
    
    @Autowired
    private ChattingService service;
    
    // 채팅 페이지
    @GetMapping("/chatting")
    public String chatting(
    		@SessionAttribute("loginUser") User loginUser , Model model) {
    	
        List<ChattingRoom> roomList = service.selectRoomList(loginUser.getUserNo());
        model.addAttribute("roomList", roomList);
        return "/profile/chatting/chatting";
    }
    
    // 채팅 상대 검색
    @GetMapping(value="/chatting/selectTarget", produces="application/json; charset=UTF-8")
    @ResponseBody
    public List<User> selectTarget(String query, @SessionAttribute("loginUser") User loginUser){
    	Map<String, Object> map = new HashMap<>();
    	map.put("userNo", loginUser.getUserNo());
    	map.put("query", query);
    	return service.selectTarget(map);
    }
    
    // 채팅방 입장(없으면 생성)
    @GetMapping("/chatting/enter")
    @ResponseBody
    public int chattingEnter(int targetNo, @SessionAttribute("loginUser") User loginUser) {
     
        Map<String, Integer> map = new HashMap<String, Integer>();
        
        map.put("targetNo", targetNo);
        map.put("loginUserNo", loginUser.getUserNo());
        
        int chattingNo = service.checkChattingNo(map);
        
        if(chattingNo == 0) {
            chattingNo = service.createChattingRoom(map);
        }
        
        return chattingNo;
    }
    
    // 채팅방 목록 조회
    @GetMapping(value="/chatting/roomList", produces="application/json; charset=UTF-8")
    @ResponseBody
    public List<ChattingRoom> selectRoomList(@SessionAttribute("loginUser") User loginUser) {
    	return service.selectRoomList(loginUser.getUserNo());
    }
    
    
    // 채팅 읽음 표시
    @PutMapping("/chatting/updateReadFlag")
    @ResponseBody
    public int updateReadFlag(@RequestBody Map<String, Object> paramMap) {
        return service.updateReadFlag(paramMap);
    }
    
    @GetMapping(value="/chatting/selectMessage", produces="application/json; charset=UTF-8")
    @ResponseBody
    public List<Message> selectMessageList(@RequestParam Map<String, Object> paramMap) {
        return service.selectMessageList(paramMap);
    }
    
    // 이미지 
    @PostMapping("chatting/uploadImage")
    @ResponseBody
    public String uploadImage(@RequestBody MultipartFile image) throws IllegalStateException, IOException {
    	return service.uploadImage(image);
    }

    
    
}
