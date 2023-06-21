package com.guido.home.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.guido.home.model.dao.HomeMapper;

@Service
public class HomeServiceImpl implements HomeService {
	
	@Autowired
	private HomeMapper mapper;

}
