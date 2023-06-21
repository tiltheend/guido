package com.guido.admin.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.guido.admin.model.dao.AdminMapper;

@Service
public class AdminServiceImpl implements AdminService {
	
	@Autowired
	private AdminMapper mapper;
	
	

}
