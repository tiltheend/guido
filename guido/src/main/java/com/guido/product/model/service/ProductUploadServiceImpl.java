package com.guido.product.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.guido.common.model.dto.Product;
import com.guido.product.model.dao.ProductUploadMapper;

@Service
public class ProductUploadServiceImpl implements ProductUploadService{

	@Autowired
	private ProductUploadMapper mapper;

	@Override
	public int uploadProduct(Product product, List<MultipartFile> productImages) {
		// TODO Auto-generated method stub
		return 0;
	}
	
	
	
	
}
