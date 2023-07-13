package com.guido.common.config;

import java.util.Arrays;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.guido.common.filter.AdminFilter;
import com.guido.common.filter.LoginFilter;

@Configuration
public class FilterConfig {
	
	   @Bean
	   public FilterRegistrationBean<LoginFilter> loginFilter(){
	      
	      FilterRegistrationBean<LoginFilter> resiRegistrationBean = new FilterRegistrationBean<LoginFilter>();
	      
	      resiRegistrationBean.setFilter(new LoginFilter());
	      
	      String[] url = {"/reservation/*", "/profile/touristReservation", "/profile/touristWishList", "/profile/guideReservationSchedule" , 
						"/profile/guideReservation", "/upload","/user/myPage/editInfo/*","/edit/*","/chatting", "/chatting/*"};	// 필터링 하고 싶은 경로

	      resiRegistrationBean.setUrlPatterns(Arrays.asList(url)); // url 패턴 여러 개 지정
	      resiRegistrationBean.setName("loginFilter"); // 이름
	      resiRegistrationBean.setOrder(1); // 여러 필터가 있을 때 순서
	      return resiRegistrationBean;
	   }
	   @Bean
	   public FilterRegistrationBean<AdminFilter> adminFilter(){
		   
		   FilterRegistrationBean<AdminFilter> resiRegistrationBean = new FilterRegistrationBean<AdminFilter>();
		   
		   resiRegistrationBean.setFilter(new AdminFilter());
		   
		   String[] url = {"/admin/*"};	// 필터링 하고 싶은 경로
		   resiRegistrationBean.setUrlPatterns(Arrays.asList(url)); // url 패턴 여러 개 지정
		   resiRegistrationBean.setName("adminFilter"); // 이름
		   resiRegistrationBean.setOrder(2); // 여러 필터가 있을 때 순서
		   return resiRegistrationBean;
	   }
}