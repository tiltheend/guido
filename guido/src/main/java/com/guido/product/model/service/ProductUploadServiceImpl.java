package com.guido.product.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.guido.product.model.dao.ProductUploadMapper;

@Service
public class ProductUploadServiceImpl implements ProductUploadService{

	@Autowired
	private ProductUploadMapper mapper;
}
