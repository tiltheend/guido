package com.guido.product.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.guido.common.model.dto.Product;
import com.guido.product.model.dao.ProductDetailMapper;

@Service
public class ProductDetailServiceImpl implements ProductDetailService{
	
	@Autowired
	private ProductDetailMapper mapper;

	
	// 상품 상세 조회
	@Override
	public Product selectProduct(int productNo) {
		return mapper.selectProduct(productNo);
	}

}
