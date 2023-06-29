package com.guido.user.model.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.guido.common.model.dto.User;
import com.guido.user.model.dao.EmailMapper;

import jakarta.mail.Message;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl implements EmailService{
	
	@Autowired
	private EmailMapper mapper;
	
	@Autowired
	private JavaMailSender mailSender;
	
	private String fromEmail = "seojy1259@gmail.com";
	private String fromUsername = "guido";

	// 인증 번호 만들기
	@Override
	public String createAuthKey() {
		String key = "";
		for(int i=0 ; i< 6 ; i++) {
			int sel1 = (int)(Math.random() * 3); // 0:숫자 / 1,2:영어
			if(sel1 == 0) {
				int num = (int)(Math.random() * 10); // 0~9
				key += num;
			}else {
				char ch = (char)(Math.random() * 26 + 65); // A~Z
				int sel2 = (int)(Math.random() * 2); // 0:소문자 / 1:대문자
				if(sel2 == 0) {
					ch = (char)(ch + ('a' - 'A')); // 대문자로 변경
				}
				key += ch;
			}
		}
		return key;
	}
	
	// 임시 비밀번호 만들기
	@Override
	public String createTempPw() {
		String key = "";
		for(int i=0 ; i< 10 ; i++) {
			int sel1 = (int)(Math.random() * 3); // 0:숫자 / 1,2:영어
			if(sel1 == 0) {
				int num = (int)(Math.random() * 10); // 0~9
				key += num;
			}else {
				char ch = (char)(Math.random() * 26 + 65); // A~Z
				int sel2 = (int)(Math.random() * 2); // 0:소문자 / 1:대문자
				if(sel2 == 0) {
					ch = (char)(ch + ('a' - 'A')); // 대문자로 변경
				}
				key += ch;
			}
		}
		return key;
	}

	// 임시 비번 보내기
	@Transactional
	@Override
	public int sendTempPw(String email) {
		// 임시 비번 생성 
		String tempPw = createTempPw();
		
		// 임시 비번 요청한 유저 name
		String user = mapper.selectUser(email);
		System.out.println(user);
		
		try {
			// 인증 메일
			MimeMessage mail = mailSender.createMimeMessage();
			// 제목
			String subject = "[guido] 임시 비밀번호가 생성되었습니다."; 
			// 문자 인코딩
			String charset = "UTF-8";
			// 메일 내용
			String mailContent = 
					
					
					"<table style='border-spacing:10px;width:100%;border:2px solid #1c797d;border-radius:15px;box-shadow:2px 2px 2px #c5c5c5;padding:10px'>" + 
						"<tr><td><img src='https://github.com/tiltheend/guido/blob/main/guido/src/main/resources/static/images/signUp/guido.png'></td></tr>" +
				        "<tr><td >" + user + "님, 안녕하세요?</td></tr>" + 
				        "<tr><td>요청하신 임시 비밀번호를 발급했습니다.</td></tr>" +
				        "<tr><td></td></tr>" +
				        "<tr><td>임시 비밀번호 : </td></tr>" +
				        "<tr><td style='color:#1c797d;font-weight:bold;font-size:20px'>"+ tempPw +"</td></tr>" +
				        "<tr><td></td></tr>" +
				        "<tr><td>임시 비밀번호로 로그인 후, 개인 정보 보호를 위해 반드시 비밀번호를 변경해주세요!</td></tr>" +
				        "<tr><td></td></tr>" +
				        "<tr><td>감사합니다.</td></tr>" +
				        "<tr><td></td></tr>" +
				        "<tr><td style='border-bottom:#c5c5c5 1px solid'>가이두 드림</td></tr>" +
				        "<tr><td></td></tr>" +
				        "<tr><td><img src='https://github.com/tiltheend/guido/blob/main/guido/src/main/resources/static/images/signUp/guidoCompany.jpeg'></td></tr>" +

	   			    "</table>";
					
				// 송신자(보내는 사람) 지정
				mail.setFrom(new InternetAddress(fromEmail, fromUsername));
				// 수신자(받는사람) 지정
				mail.addRecipient(Message.RecipientType.TO, new InternetAddress(email));
				// 이메일 제목 세팅
				mail.setSubject(subject, charset);
				// 내용 세팅
				mail.setText(mailContent, charset, "html"); //"html" 추가 시 HTML 태그가 해석됨
				// 메일 보내기
				mailSender.send(mail);
				
		} catch (Exception e) {
			e.printStackTrace();
			return 0; // 임시 비번 메일 전송 실패
		}
			Map<String, String> map = new HashMap<String, String>();
			map.put("tempPw", tempPw);
			map.put("email", email);
			
			System.out.println(map); // 임시 비번 확인
			
			int result = mapper.changeTempPw(map);
			
			return result;
	}
	
	
	
	
	
	
}
