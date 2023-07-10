package com.guido.home.websocket;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.guido.common.model.dto.Notification;
import com.guido.common.model.dto.User;
import com.guido.home.model.service.AlarmService;

import jakarta.servlet.http.HttpSession;

@SessionAttributes({"loginUser"})
@Component
public class AlarmWebsocketHandler extends TextWebSocketHandler{
	
	 private Logger logger = LoggerFactory.getLogger(AlarmWebsocketHandler.class);
	 
	 @Autowired
	 private AlarmService service;

    // WebSocketSession : 클라이언트 - 서버간 전이중통신을 담당하는 객체 (JDBC Connection과 유사)
    // 클라이언트의  최초 웹소켓 요청 시 생성
    private Set<WebSocketSession> sessions  = Collections.synchronizedSet(new HashSet<WebSocketSession>());
    // synchronizedSet : 동기화된 Set 반환(HashSet은 기본적으로 비동기)
    // -> 멀티스레드 환경에서 하나의 컬렉션에 여러 스레드가 접근하여 의도치 않은 문제가 발생되지 않게 하기 위해
    //    동기화를 진행하여 스레드가 여러 순서대로 한 컬렉션에 순서대로 접근할 수 있게 변경.
    
    // afterConnectionEstablished - 클라이언트와 연결이 완료되고, 통신할 준비가 되면 실행. 
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // 연결 요청이 접수되면 해당 클라이언트와 통신을 담당하는 WebSocketSession 객체가 전달되어져 옴.
        // 이를 필드에 선언해준sessions에 저장
        sessions.add(session);
    
        //logger.info("{}연결됨", session.getId());
//      System.out.println(session.getId() + "연결됨");
    }
    
    
    
    //handlerTextMessage - 클라이언트로부터 텍스트 메세지를 받았을때 실행
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        
        // 전달받은 내용은 JSON 형태의 String
        logger.info("전달받은 내용 : " + message.getPayload());
        
        // Jackson에서 제공하는 객체
        // JSON String -> VO Object
        ObjectMapper objectMapper = new ObjectMapper();
        
        Notification notice = objectMapper.readValue(message.getPayload(), Notification.class);
        // Message 객체 확인
        // System.out.println("객체 확인 : " + notice); 
        
        // DB 삽입 서비스 호출
        
        
        // 알람 받는 사람 번호 
        int userNo = 0;
        String noticeContent = null;

        
        switch(notice.getNotificationType()) {
        
        case "R" : // 리뷰 등록 알람
        	
        	userNo = service.selectUserNo(notice.getProductNo());
        	
        	noticeContent = "'" + notice.getProductName() + "' 상품에 리뷰가 작성되었습니다.";
        	
        	notice.setReceiverNo(userNo); // 알림 받는 회원 번호
        	notice.setNotificationContent(noticeContent);
        	notice.setSenderNo(notice.getSenderNo()); 
        	notice.setProductNo(notice.getProductNo());
        	
        	System.out.println("리뷰등록 : " + notice);
        	
        	break;
        	
        	
        case "L" : // 관심상품 등록 알람
        
        	userNo = service.selectUserNo(notice.getProductNo());
        	
        	noticeContent = "'" + notice.getProductName() + "' 상품이 관심상품으로 등록되었습니다.";
        	
        	notice.setReceiverNo(userNo); // 알림 받는 회원 번호
        	notice.setNotificationContent(noticeContent);
        	notice.setSenderNo(notice.getSenderNo());
        	notice.setProductNo(notice.getProductNo());
        	
        	// System.out.println("관심상품 : " + notice);
        	
        	break;
        }
        
        
        int result = service.insertAlarm(notice);
        
        if(result > 0) {
        	
        	for(WebSocketSession s : sessions) {
        		
        		HttpSession temp = (HttpSession)s.getAttributes().get("session");
       		
        		int loginUserNo = ((User)temp.getAttribute("loginUser")).getUserNo();
        		
    			if(loginUserNo == userNo) {
    				// System.out.println("받는 사람 "+ userNo);
    				s.sendMessage(new TextMessage(new Gson().toJson(notice)));
					break;
    			}
        		
        	}
        }
    }
    
    
    
    // afterConnectionClosed - 클라이언트와 연결이 종료되면 실행된다.
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session);
        //logger.info("{}연결끊김",session.getId());
    }
}
