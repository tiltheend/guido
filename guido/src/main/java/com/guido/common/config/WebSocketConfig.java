package com.guido.common.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.guido.chatting.model.websocket.ChattingWebsocketHandler;
import com.guido.common.interceptor.AlarmHandshakeInterceptor;
import com.guido.common.interceptor.ChattingHandshakeIntercepter;
import com.guido.home.websocket.AlarmWebsocketHandler;

@Configuration
@EnableWebSocket
//@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketConfigurer{

	@Autowired
	private AlarmWebsocketHandler alarmWebsocketHandler;
	
	@Autowired
	private ChattingWebsocketHandler chattingWebsocketHandler;
	
//	private HandshakeInterceptor handshakeInterceptor;
	@Autowired
	private AlarmHandshakeInterceptor alarmHandshakeInterceptor;
	
	@Autowired
	private ChattingHandshakeIntercepter chattingHandshakeIntercepter;
	
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		
							// 얘가 처리			// 어떤 주소로 요청이 왔을 때
												// js에 알람으로 주소 매핑
		registry.addHandler(alarmWebsocketHandler, "/alarm")
						.addInterceptors(alarmHandshakeInterceptor)
						.setAllowedOriginPatterns("http://localhost/", "http://127.0.0.1")
						.withSockJS();
		
		registry.addHandler(chattingWebsocketHandler, "/chattingSock")
		.addInterceptors(chattingHandshakeIntercepter)
		.setAllowedOriginPatterns("http://localhost/") // 나중에 배포하면 그 주소 추가해주면 됨
		.withSockJS(); // 웹소켓을 지원하지 않으면 지원하겠다.
	}
}
