package com.guido.qna.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.guido.qna.model.dao.QnaMapper;

@Service
public class QnaServiceImpl implements QnaService{
	
	@Autowired
	private QnaMapper mapper;
	

}
