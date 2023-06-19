package com.guido.common.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.util.unit.DataSize;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import jakarta.servlet.MultipartConfigElement;

@Configuration
@PropertySource("classpath:/config.properties")
public class FileUploadConfig implements WebMvcConfigurer {

	
	// 파일을 하드에 저장하기 전 임시로 가지고 있을 메모리 용량
	@Value("${spring.servlet.multipart.file-size-threshold}")
	private long fileSizeThreshold;
	
	// 파일 1개 크기 제한
	@Value("${spring.servlet.multipart.max-file-size}")
	private long maxFileSize;
	
	// 요청당 파일 크기 제한
	@Value("${spring.servlet.multipart.max-request-size}")
	private long maxRequestSize;
	
	
	@Bean	// 개발자가 수동으로 bean 등록(생성은 개발자, 관리는 Spring)
	public  MultipartConfigElement configElement() {
		
		MultipartConfigFactory factory = new MultipartConfigFactory();
		
		factory.setFileSizeThreshold(DataSize.ofBytes(fileSizeThreshold));
		factory.setMaxFileSize(DataSize.ofBytes(maxFileSize));
		factory.setMaxRequestSize(DataSize.ofBytes(maxRequestSize));
		
		return factory.createMultipartConfig();
	}
	
	
	@Bean
	public MultipartResolver multipartResolver() {
		// MultipartResolver : 파일은 파일로, 텍스트는 텍스트로 자동 구분
		
		return new StandardServletMultipartResolver();
	}


	// 웹에서 사용하는 자원을 다루는 방법을 설정
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		
		//  /images/ 로 시작되는 요청
		String webPath = "/images/**";
		
		// 실제로 자원이 저장되어 있는 로컬 경로
		String resourcePath = "file:///C:/uploadImages/";
		
		// 	/images/ 로 시작하는 요청이 오면 C:/uploadImages/ 와 연결
		registry.addResourceHandler(webPath).addResourceLocations(resourcePath);
		//-> 업로드 하면 엑박 뜨는 문제가 해결됨
		
	}
	
	
	
	

	
	
	
	
}
