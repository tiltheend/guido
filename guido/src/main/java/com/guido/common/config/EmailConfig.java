package com.guido.common.config;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

//@PropertySource : 특정 properties 파일의 내용을 이용하겠다는 어노테이션

@Configuration
@PropertySource("classpath:/config.properties")
public class EmailConfig {

	//	@Value : properties 파일에서 키가 일치하는 부분의 value를 얻어와 대입
	@Value("${spring.mail.username}")
	private String userName;
	
	@Value("${spring.mail.password}")
	private String password;
	
	
	@Bean
	public JavaMailSender javaMailSender() {
		JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
		
		// 메일 관련 설정
		mailSender.setUsername(userName);
		mailSender.setPassword(password);
		
		mailSender.setHost("smtp.gmail.com");
		mailSender.setPort(587);
		
		Properties prop = new Properties();
		
		prop.setProperty("mail.transport.protocol", "smtp");
		prop.setProperty("mail.smtp.auth", "true");
		prop.setProperty("mail.smtp.starttls.enable", "true");
		prop.setProperty("mail.debug", "true");
		prop.setProperty("mail.smtp.ssl.trust","smtp.gmail.com");
		prop.setProperty("mail.smtp.ssl.protocols","TLSv1.2");
		
		mailSender.setJavaMailProperties(prop);

		
		return mailSender;		// 반환된 객체가 bean으로 등록됨
	}
}
