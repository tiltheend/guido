package com.guido.user.model.service;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import com.guido.common.model.dto.QNA;
import com.guido.user.model.dao.EmailMapper;

import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.ServletContext;

@Service
public class EmailServiceImpl implements EmailService{
	
	@Autowired
	private SpringTemplateEngine templateEngine;
	
	@Autowired
	private EmailMapper mapper;
	
	@Autowired
	ServletContext servletContext;
	
	// 메일 보내기 위해
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
		//System.out.println(user);
		
		try {
			// 인증 메일
			MimeMessage mail = mailSender.createMimeMessage();
			// 제목
			String subject = "[guido] 임시 비밀번호 발급"; 
			// 문자 인코딩
			String charset = "UTF-8";
			// 메일 내용
			String mailContent = 
					
					"<table style='border-spacing:10px;width:100%'>" + 
						"<tr><td><img src='https://i.imgur.com/pQWCBfL.png'></td></tr>" +
						"<tr><td style='padding-left:20px'></td></tr>" +
				        "<tr><td style='padding-left:20px'>" + user + "님, 안녕하세요? Guido 입니다.</td></tr>" + 
				        "<tr><td style='padding-left:20px'>요청하신 임시 비밀번호를 발급했습니다.</td></tr>" +
				        "<tr><td style='padding-left:20px'></td></tr>" +
				        "<tr><td style='padding-left:20px'>임시 비밀번호 : </td></tr>" +
				        "<tr><td style='color:#1c797d;font-weight:bold;font-size:20px;padding-left:20px'>"+ tempPw +"</td></tr>" +
				        "<tr><td style='padding-left:20px'></td></tr>" +
				        "<tr><td style='padding-left:20px'>임시 비밀번호로 로그인 후, 개인 정보 보호를 위해 반드시 비밀번호를 변경해주세요!</td></tr>" +
				        "<tr><td style='padding-left:20px'></td></tr>" +
				        "<tr><td style='padding-left:20px'>감사합니다.</td></tr>" +
				        "<tr><td style='padding-left:20px'>가이두 드림</td></tr>" +
				        "<tr><td style='padding-left:20px'></td></tr>" +
				        "<tr><td style='padding-left:20px'><img src='https://i.imgur.com/PcUN2ne.png'></td></tr>" +
				        "<tr><td style='padding-left:20px'></td></tr>" +
				        "<tr><td><img src='https://i.imgur.com/lpqS2eL.png'></td></tr>" +
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

	// 회원가입-인증 번호 보내기
	@Transactional
	@Override
	public int authEmail(String email) {
		
		// 인증 번호 생성
		String authKey = createAuthKey();
		
		// 인증 번호 발송
		try {
			MimeMessage mail = mailSender.createMimeMessage();
			
			String subject = "[guido] 이메일 인증 번호 발급";
			String charset = "UTF-8";
			String mailContent = 
					"<table style='border-spacing:10px;width:100%'>" + 
							"<tr><td><img src='https://i.imgur.com/pQWCBfL.png'></td></tr>" +
							"<tr><td style='padding-left:140px'><img src='https://i.imgur.com/Wrrbdp7.png'></td></tr>" +
							"<tr><td style='padding-left:20px'></td></tr>" +
					        "<tr><td style='padding-left:20px'>안녕하세요!</td></tr>" + 
					        "<tr><td style='padding-left:20px'>Guido를 이용해주셔서 진심으로 감사드립니다.</td></tr>" + 
					        "<tr><td style='padding-left:20px'>아래 인증 번호 이용해 회원 가입 절차를 완료해주세요.</td></tr>" +
					        "<tr><td style='padding-left:20px'></td></tr>" +
					        "<tr><td style='padding-left:20px'>인증 번호 : </td></tr>" +
					        "<tr><td style='color:#1c797d;font-weight:bold;font-size:20px;padding-left:20px'>"+ authKey +"</td></tr>" +
					        "<tr><td style='padding-left:20px'></td></tr>" +
//					        "<tr><td style='padding-left:20px'>해당 인증 번호의 유효 시간은 10분입니다.</td></tr>" +
//					        "<tr><td style='padding-left:20px'>10분 내 인증하지 못하셨다면 '인증 번호 전송' 버튼을 다시 눌러주세요.</td></tr>" +
//					        "<tr><td style='padding-left:20px'></td></tr>" +
					        "<tr><td style='padding-left:20px'>감사합니다.</td></tr>" +
					        "<tr><td style='padding-left:20px'>가이두 드림</td></tr>" +
					        "<tr><td style='padding-left:20px'></td></tr>" +
					        "<tr><td style='padding-left:20px'><img src='https://i.imgur.com/PcUN2ne.png'></td></tr>" +
					        "<tr><td style='padding-left:20px'></td></tr>" +
					        "<tr><td><img src='https://i.imgur.com/lpqS2eL.png'></td></tr>" +
		   			    "</table>";
			
			mail.setFrom(new InternetAddress(fromEmail, fromUsername));
			mail.addRecipient(Message.RecipientType.TO, new InternetAddress(email));
			mail.setSubject(subject, charset);
			mail.setText(mailContent, charset, "html");
			mailSender.send(mail);
			
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		Map<String,String> map = new HashMap<String, String>();
		map.put("authKey", authKey);
		map.put("email", email);
		
		System.out.println(map);
		
		int result = mapper.updateAuthKey(map);
		
		if(result == 0) {
			result = mapper.insertAuthKey(map);
		}
		
		return result;
	}
	
	
	@Override
	public int checkAuthKey(Map<String, Object> authMap) {
		return mapper.checkAuthKey(authMap);
	}
	
	
	@Override
	public String sendAnswer(QNA qna) {
		String subject = "[guido] "+ qna.getQnaTitle() +"문의에 대한 답변";
		String charset = "UTF-8";
		String sendEmail = qna.getQnaEmail();
		MimeMessage mail = mailSender.createMimeMessage();
        try {
			MimeMessageHelper mailHelper = new MimeMessageHelper(mail, true, charset);
			Context context = new Context();
			context.setVariable("qna", qna);
			mailHelper.setSubject(subject);
			mailHelper.setFrom(fromEmail);
			mailHelper.setTo(sendEmail);
			String html = templateEngine.process("admin/answer",context);
			mailHelper.setText(html,true);
//			String filePath = "C:\\guidoImages\\qnaImage\\";
			
			String filePath = "/Users/jy_green/Desktop/project/guidoImages/qnaImage/";
			
			for(int i=0; i<qna.getFileList().size(); i++) {
				String arr[] = qna.getFileList().get(i).getFilePath().split("/");
				String realPath = filePath+arr[arr.length-1];
				FileSystemResource file = new FileSystemResource(new File(realPath));
				mailHelper.addInline(qna.getFileList().get(i).getFilePath(), file);
			}
			
			mailSender.send(mail);
			return "성공";
			
		} catch (MessagingException e) {
			e.printStackTrace();
			return "실패";
		}
	}
}
