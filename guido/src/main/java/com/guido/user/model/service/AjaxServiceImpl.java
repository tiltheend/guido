package com.guido.user.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.guido.user.model.dao.AjaxMapper;

@Service
public class AjaxServiceImpl implements AjaxService{
	
	@Autowired
	private AjaxMapper mapper;

	// 이메일 중복 검사 
	@Override
	public int checkEmail(String email) {
		return mapper.checkEmail(email);
	}
	
	

}
