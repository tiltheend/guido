package com.guido.product.model.dao;


import org.apache.ibatis.annotations.Mapper;

import com.guido.common.model.dto.Product;

@Mapper
public interface ProductDetailMapper {

	// 상품 상세 조회
	Product selectProduct(int productNo);
	
}
