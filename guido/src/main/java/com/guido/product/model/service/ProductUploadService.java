package com.guido.product.model.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.guido.common.model.dto.Product;

public interface ProductUploadService {

	int uploadProduct(Product product, List<MultipartFile> productImages);

}
