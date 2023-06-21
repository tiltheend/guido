package com.guido.product.model.service;

import com.guido.product.model.dto.Product;

public interface ProductDetailService {

	/** 상품 상세 조회
	 * @param productNo
	 * @return product
	 */
	Product selectProduct(int productNo);

}
