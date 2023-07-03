package com.guido.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.guido.common.interceptor.MainEventInterceptor;
import com.guido.common.interceptor.ThemeTypeInterceptor;

@Configuration
public class InterceptorConfig implements WebMvcConfigurer{

	
	@Bean
	public ThemeTypeInterceptor themeTypeInterceptor() {
		return new ThemeTypeInterceptor();
	}
	@Bean
	public MainEventInterceptor mainEventInterceptor() {
		return new MainEventInterceptor();
	}

	/* 
	 * @Bean public interceptor클래스명 메소드명() { 
	 * return new interceptor클래스명(); }
	 */

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		
		registry.addInterceptor(themeTypeInterceptor())
		.addPathPatterns("/**")   // 가로챌 경로 지정(여러개 작성 시 콤마로 구분)
		.excludePathPatterns("/css/**", "/image/**", "/js/**");  // 가로채지 않을 경로

		registry.addInterceptor(mainEventInterceptor())
		.addPathPatterns("/**")   // 가로챌 경로 지정(여러개 작성 시 콤마로 구분)
		.excludePathPatterns("/css/**", "/image/**", "/js/**");  // 가로채지 않을 경로
		// Bean으로 등록된 BoardTypeInterceptor를 얻어와 인터셉터로 등록
//		registry.addInterceptor(interceptor메소드명())
//		.addPathPatterns("/**")   // 가로챌 경로 지정(여러개 작성 시 콤마로 구분)
//		.excludePathPatterns("/css/**", "/image/**", "/js/**");  // 가로채지 않을 경로
		
		

	}
	
	
}
