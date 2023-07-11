package com.guido.common.interceptor;

import java.util.Map;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import jakarta.servlet.http.HttpSession;

@Component
public class ChattingHandshakeIntercepter implements HandshakeInterceptor{

	// WebSocketHandler가 동작하기 전
	@Override
	public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
			Map<String, Object> attributes) throws Exception {
		
		if(request instanceof ServerHttpRequest) { // ServerHttpRequest (부모) ServerHttpRequest (자식)
			
			ServletServerHttpRequest servletRequest = (ServletServerHttpRequest)request;
			
			// 웹소켓 접속한 클라이언트의 세션을 얻어옴
			HttpSession session = servletRequest.getServletRequest().getSession();
			
			// Map<String, Object> attributes
			// -> WebSocketHandler의 WebSocketSession에 담을 내용(값)을 세팅하는 Map
			
			attributes.put("session", session);
			
		}
		
		return true; // true 가로챈 걸 집어넣을 수 있음
	}

	
	
	
	@Override
	public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
			Exception exception) {
		
	}
	
	
}
